<?php

namespace App\Http\Middleware;

use App\Models\Language;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();

        $sharedData = [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $user,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];

        // Pour les enseignants
        if ($user && $user->role === 'teacher') {
            $sharedData['courses'] = $user->taughtCourses()
                ->with(['modules.lessons'])
                ->orderBy('order', 'asc')
                ->get();

            $sharedData['languages'] = Language::where('is_active', true)
                ->orderBy('name')
                ->get(['id', 'name', 'code']);

            $sharedData['conversations'] = [
                'unreadCount' => \App\Models\Conversation::where('teacher_id', $user->id)
                    ->whereHas('messages', function ($query) use ($user) {
                        $query->where('is_read', false)
                            ->where('sender_id', '!=', $user->id);
                    })
                    ->count(),
            ];
        }

        // Pour les étudiants
        if ($user && $user->role === 'student') {
            $sharedData['enrolledCourses'] = $user->enrolledCourses()
                ->with(['modules.lessons']) // Crucial : on charge toute l'arborescence
                ->orderBy('courses.order', 'asc')
                ->get(['courses.*']); // On prend tout de courses pour éviter les bugs de relations

            $sharedData['conversations'] = [
                'unreadCount' => \App\Models\Conversation::where('student_id', $user->id)
                    ->whereHas('messages', function ($query) use ($user) {
                        $query->where('is_read', false)
                            ->where('sender_id', '!=', $user->id);
                    })
                    ->count(),
            ];
        }

        return $sharedData;
    }
}