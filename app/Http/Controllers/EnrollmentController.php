<?php

namespace App\Http\Controllers;

use App\Concerns\LogsInteractions;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    use LogsInteractions;

    public function enroll(Request $request, Course $course): RedirectResponse
    {
        $user = $request->user();
        // Attach only if not already enrolled
        if (! $user->enrolledCourses()->where('course_id', $course->id)->exists()) {
            $user->enrolledCourses()->attach($course->id, [
                'enrolled_at' => now(),
            ]);

            // Log course enrollment
            $this->logResourceAction('course', 'enrolled', $course->id, [
                'course_title' => $course->title,
                'course_language' => $course->language->name ?? null,
                'teacher_id' => $course->teacher_id,
                'module_count' => $course->modules()->count(),
            ]);
        } else {
            // Log re-enrollment attempt
            $this->logInteraction('Course Re-enrollment Attempt', [
                'course_id' => $course->id,
                'course_title' => $course->title,
                'already_enrolled' => true,
            ]);
        }

        return redirect()->route('dashboard')->with('success', 'You are now enrolled in this course!');
    }
}
