<?php

namespace App\Concerns;

use Illuminate\Support\Facades\Log;

trait LogsInteractions
{
    /**
     * Log a user interaction.
     */
    protected function logInteraction(string $action, array $data = []): void
    {
        Log::channel('interactions')->info($action, array_merge([
            'user_id' => auth()->id(),
            'user_email' => auth()->user()?->email,
            'ip' => request()->ip(),
            'url' => request()->fullUrl(),
            'method' => request()->method(),
            'user_agent' => request()->userAgent(),
            'session_id' => request()->session()->getId(),
        ], $data));
    }

    /**
     * Log a form submission.
     */
    protected function logFormSubmission(string $formName, array $data = []): void
    {
        $this->logInteraction('Form Submitted', array_merge([
            'form_name' => $formName,
        ], $data));
    }

    /**
     * Log a resource action (create, update, delete).
     */
    protected function logResourceAction(string $resource, string $action, mixed $id = null, array $data = []): void
    {
        $this->logInteraction('Resource Action', array_merge([
            'resource' => $resource,
            'action' => $action,
            'resource_id' => $id,
        ], $data));
    }

    /**
     * Log a feature usage.
     */
    protected function logFeatureUsage(string $feature, array $data = []): void
    {
        $this->logInteraction('Feature Used', array_merge([
            'feature' => $feature,
        ], $data));
    }

    /**
     * Log an exercise attempt.
     */
    protected function logExerciseAttempt(int $exerciseId, bool $correct, array $data = []): void
    {
        $this->logInteraction('Exercise Attempted', array_merge([
            'exercise_id' => $exerciseId,
            'correct' => $correct,
        ], $data));
    }

    /**
     * Log a lesson completion.
     */
    protected function logLessonProgress(int $lessonId, string $status, array $data = []): void
    {
        $this->logInteraction('Lesson Progress', array_merge([
            'lesson_id' => $lessonId,
            'status' => $status,
        ], $data));
    }
}
