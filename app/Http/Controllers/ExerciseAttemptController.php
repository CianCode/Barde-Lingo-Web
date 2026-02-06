<?php

namespace App\Http\Controllers;

use App\Concerns\LogsInteractions;
use App\Models\Exercise;
use App\Models\ExerciseAttempt;
use App\Models\LessonProgress;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ExerciseAttemptController extends Controller
{
    use LogsInteractions;

    public function submit(Request $request, Exercise $exercise): RedirectResponse
    {
        $user = auth()->user();

        if (! $user || $user->role !== 'student') {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'answers' => 'required|array',
        ]);

        // Calculate score
        $totalQuestions = $exercise->questions()->count();
        $correctAnswers = 0;

        foreach ($exercise->questions as $question) {
            $userAnswer = $validated['answers'][$question->id] ?? null;
            $correctOption = $question->options()->where('is_correct', true)->first();

            if ($correctOption && $userAnswer == $correctOption->id) {
                $correctAnswers++;
            }
        }

        $score = $totalQuestions > 0 ? ($correctAnswers / $totalQuestions) * 100 : 0;
        $isPassed = $score >= $exercise->passing_score;

        // Get current attempt number
        $attemptNumber = $exercise->attempts()
            ->where('user_id', $user->id)
            ->max('attempt_number') ?? 0;

        // Create exercise attempt
        $attempt = ExerciseAttempt::create([
            'user_id' => $user->id,
            'exercise_id' => $exercise->id,
            'score' => $score,
            'max_score' => 100,
            'is_passed' => $isPassed,
            'answers' => $validated['answers'],
            'attempt_number' => $attemptNumber + 1,
        ]);

        // Update lesson progress
        $lessonProgress = LessonProgress::firstOrCreate(
            [
                'user_id' => $user->id,
                'lesson_id' => $exercise->lesson_id,
            ],
            [
                'is_completed' => false,
                'attempts' => 0,
                'views' => 0,
            ]
        );

        // Increment attempts
        $lessonProgress->increment('attempts');

        // Update best score and completion status
        if ($lessonProgress->best_score === null || $score > $lessonProgress->best_score) {
            $lessonProgress->best_score = $score;
        }

        if ($isPassed && ! $lessonProgress->is_completed) {
            $lessonProgress->update([
                'is_completed' => true,
                'completed_at' => now(),
            ]);
        }

        $lessonProgress->save();

        // Log the exercise attempt
        $this->logExerciseAttempt($exercise->id, $isPassed, [
            'score' => $score,
            'max_score' => 100,
            'correct_answers' => $correctAnswers,
            'total_questions' => $totalQuestions,
            'attempt_number' => $attempt->attempt_number,
            'lesson_id' => $exercise->lesson_id,
            'exercise_type' => $exercise->type,
            'time_spent' => request()->input('time_spent'),
        ]);

        // Log lesson progress if completed
        if ($isPassed && $lessonProgress->is_completed && $lessonProgress->wasChanged('is_completed')) {
            $this->logLessonProgress($exercise->lesson_id, 'completed', [
                'final_score' => $lessonProgress->best_score,
                'total_attempts' => $lessonProgress->attempts,
                'total_views' => $lessonProgress->views,
            ]);
        }

        return back()->with('exerciseResult', [
            'success' => true,
            'attempt' => $attempt,
            'score' => $score,
            'isPassed' => $isPassed,
            'correctAnswers' => $correctAnswers,
            'totalQuestions' => $totalQuestions,
            'attemptNumber' => $attempt->attempt_number,
            'lessonProgress' => $lessonProgress,
            'userAnswers' => $validated['answers'],
        ]);
    }
}
