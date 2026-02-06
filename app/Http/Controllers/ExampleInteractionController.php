<?php

namespace App\Http\Controllers;

use App\Concerns\LogsInteractions;
use Illuminate\Http\Request;

/**
 * Example controller showing how to use interaction logging.
 *
 * To use the LogsInteractions trait in any controller:
 * 1. Add "use LogsInteractions;" in your controller class
 * 2. Call the logging methods: $this->logInteraction(), $this->logFormSubmission(), etc.
 */
class ExampleInteractionController extends Controller
{
    use LogsInteractions;

    public function store(Request $request)
    {
        // Example: Log a form submission
        $this->logFormSubmission('lesson_completion', [
            'lesson_id' => $request->input('lesson_id'),
            'score' => $request->input('score'),
        ]);

        // Example: Log a resource action
        $this->logResourceAction('lesson', 'create', $lesson->id, [
            'title' => $lesson->title,
        ]);

        // Example: Log feature usage
        $this->logFeatureUsage('vocabulary_flashcards', [
            'card_count' => 10,
        ]);

        // Example: Log exercise attempt
        $this->logExerciseAttempt($exerciseId, $isCorrect, [
            'attempt_number' => 3,
            'time_taken' => 45, // seconds
        ]);

        // Example: Log lesson progress
        $this->logLessonProgress($lessonId, 'completed', [
            'completion_percentage' => 100,
        ]);

        // Generic interaction logging
        $this->logInteraction('Custom Action', [
            'custom_field' => 'custom_value',
        ]);
    }
}
