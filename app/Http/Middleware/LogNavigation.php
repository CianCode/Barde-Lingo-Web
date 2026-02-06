<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class LogNavigation
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only log successful Inertia page loads
        if ($response->isSuccessful() && $request->header('X-Inertia')) {
            Log::channel('navigation')->info('Page Visit', [
                'url' => $request->fullUrl(),
                'path' => $request->path(),
                'method' => $request->method(),
                'component' => $response->headers->get('X-Inertia-Location') ?? $request->path(),
                'user_id' => auth()->id(),
                'user_email' => auth()->user()?->email,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'referer' => $request->header('referer'),
                'session_id' => $request->session()->getId(),
            ]);
        }

        return $response;
    }
}
