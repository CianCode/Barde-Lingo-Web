#!/usr/bin/env php
<?php

/**
 * Generate test logs to demonstrate the logging system
 *
 * Run this with: php generate_test_logs.php
 */

// Simulate database query logs
file_put_contents('storage/logs/queries-' . date('Y-m-d') . '.log', json_encode([
    'message' => 'Database Query',
    'level' => 'debug',
    'context' => [
        'sql' => 'select * from courses where language_id = ? and is_published = ?',
        'bindings' => [1, true],
        'time' => 23.45,
        'connection' => 'mysql',
        'user_id' => 1,
        'ip' => '192.168.1.100',
        'url' => 'https://bardelingo.be/courses',
        'method' => 'GET',
    ],
    'time' => date('c'),
]) . "\n", FILE_APPEND);

file_put_contents('storage/logs/queries-' . date('Y-m-d') . '.log', json_encode([
    'message' => 'Database Query',
    'level' => 'debug',
    'context' => [
        'sql' => 'select * from lessons where module_id = ? order by order asc',
        'bindings' => [5],
        'time' => 15.23,
        'connection' => 'mysql',
        'user_id' => 2,
        'ip' => '192.168.1.101',
        'url' => 'https://bardelingo.be/modules/5',
        'method' => 'GET',
    ],
    'time' => date('c'),
]) . "\n", FILE_APPEND);

file_put_contents('storage/logs/queries-' . date('Y-m-d') . '.log', json_encode([
    'message' => 'Database Query',
    'level' => 'debug',
    'context' => [
        'sql' => 'update lesson_progress set is_completed = ?, completed_at = ? where user_id = ? and lesson_id = ?',
        'bindings' => [true, date('Y-m-d H:i:s'), 1, 10],
        'time' => 8.67,
        'connection' => 'mysql',
        'user_id' => 1,
        'ip' => '192.168.1.100',
        'url' => 'https://bardelingo.be/exercises/15/submit',
        'method' => 'POST',
    ],
    'time' => date('c'),
]) . "\n", FILE_APPEND);

// Simulate navigation logs
file_put_contents('storage/logs/navigation-' . date('Y-m-d') . '.log', json_encode([
    'message' => 'Page Visit',
    'level' => 'info',
    'context' => [
        'url' => 'https://bardelingo.be/dashboard',
        'path' => 'dashboard',
        'method' => 'GET',
        'component' => 'dashboard',
        'user_id' => 1,
        'user_email' => 'student@example.com',
        'ip' => '192.168.1.100',
        'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'referer' => 'https://bardelingo.be/login',
        'session_id' => 'abc123xyz',
    ],
    'time' => date('c'),
]) . "\n", FILE_APPEND);

file_put_contents('storage/logs/navigation-' . date('Y-m-d') . '.log', json_encode([
    'message' => 'Page Visit',
    'level' => 'info',
    'context' => [
        'url' => 'https://bardelingo.be/courses/3',
        'path' => 'courses/3',
        'method' => 'GET',
        'component' => 'courses/show',
        'user_id' => 1,
        'user_email' => 'student@example.com',
        'ip' => '192.168.1.100',
        'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'referer' => 'https://bardelingo.be/dashboard',
        'session_id' => 'abc123xyz',
    ],
    'time' => date('c'),
]) . "\n", FILE_APPEND);

file_put_contents('storage/logs/navigation-' . date('Y-m-d') . '.log', json_encode([
    'message' => 'Page Visit',
    'level' => 'info',
    'context' => [
        'url' => 'https://bardelingo.be/lessons/10',
        'path' => 'lessons/10',
        'method' => 'GET',
        'component' => 'lessons/show',
        'user_id' => 1,
        'user_email' => 'student@example.com',
        'ip' => '192.168.1.100',
        'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'referer' => 'https://bardelingo.be/courses/3',
        'session_id' => 'abc123xyz',
    ],
    'time' => date('c'),
]) . "\n", FILE_APPEND);

// Simulate interaction logs
file_put_contents('storage/logs/interactions-' . date('Y-m-d') . '.log', json_encode([
    'message' => 'Course Re-enrollment Attempt',
    'level' => 'info',
    'context' => [
        'user_id' => 1,
        'user_email' => 'student@example.com',
        'ip' => '192.168.1.100',
        'url' => 'https://bardelingo.be/enroll/3',
        'method' => 'POST',
        'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'session_id' => 'abc123xyz',
        'course_id' => 3,
        'course_title' => 'Spanish for Beginners',
        'already_enrolled' => true,
    ],
    'time' => date('c'),
]) . "\n", FILE_APPEND);

file_put_contents('storage/logs/interactions-' . date('Y-m-d') . '.log', json_encode([
    'message' => 'Lesson Viewed',
    'level' => 'info',
    'context' => [
        'user_id' => 1,
        'user_email' => 'student@example.com',
        'ip' => '192.168.1.100',
        'url' => 'https://bardelingo.be/lessons/10',
        'method' => 'GET',
        'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'session_id' => 'abc123xyz',
        'lesson_id' => 10,
        'lesson_title' => 'Basic Greetings',
        'module_id' => 5,
        'course_id' => 3,
        'view_count' => 2,
        'is_completed' => false,
        'has_exercises' => true,
    ],
    'time' => date('c'),
]) . "\n", FILE_APPEND);

file_put_contents('storage/logs/interactions-' . date('Y-m-d') . '.log', json_encode([
    'message' => 'Exercise Attempted',
    'level' => 'info',
    'context' => [
        'user_id' => 1,
        'user_email' => 'student@example.com',
        'ip' => '192.168.1.100',
        'url' => 'https://bardelingo.be/exercises/15/submit',
        'method' => 'POST',
        'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'session_id' => 'abc123xyz',
        'exercise_id' => 15,
        'correct' => true,
        'score' => 85,
        'max_score' => 100,
        'correct_answers' => 17,
        'total_questions' => 20,
        'attempt_number' => 2,
        'lesson_id' => 10,
        'exercise_type' => 'multiple_choice',
        'time_spent' => 180,
    ],
    'time' => date('c'),
]) . "\n", FILE_APPEND);

file_put_contents('storage/logs/interactions-' . date('Y-m-d') . '.log', json_encode([
    'message' => 'Lesson Progress',
    'level' => 'info',
    'context' => [
        'user_id' => 1,
        'user_email' => 'student@example.com',
        'ip' => '192.168.1.100',
        'url' => 'https://bardelingo.be/exercises/15/submit',
        'method' => 'POST',
        'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'session_id' => 'abc123xyz',
        'lesson_id' => 10,
        'status' => 'completed',
        'final_score' => 85,
        'total_attempts' => 2,
        'total_views' => 2,
    ],
    'time' => date('c'),
]) . "\n", FILE_APPEND);

file_put_contents('storage/logs/interactions-' . date('Y-m-d') . '.log', json_encode([
    'message' => 'Message Sent',
    'level' => 'info',
    'context' => [
        'user_id' => 1,
        'user_email' => 'student@example.com',
        'ip' => '192.168.1.100',
        'url' => 'https://bardelingo.be/conversations/7/messages',
        'method' => 'POST',
        'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'session_id' => 'abc123xyz',
        'conversation_id' => 7,
        'message_id' => 42,
        'message_length' => 87,
        'recipient_id' => 5,
        'recipient_role' => 'teacher',
    ],
    'time' => date('c'),
]) . "\n", FILE_APPEND);

file_put_contents('storage/logs/interactions-' . date('Y-m-d') . '.log', json_encode([
    'message' => 'Feature Used',
    'level' => 'info',
    'context' => [
        'user_id' => 1,
        'user_email' => 'student@example.com',
        'ip' => '192.168.1.100',
        'url' => 'https://bardelingo.be/conversations/7/messages',
        'method' => 'POST',
        'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'session_id' => 'abc123xyz',
        'feature' => 'chat_messaging',
        'conversation_id' => 7,
        'user_role' => 'student',
    ],
    'time' => date('c'),
]) . "\n", FILE_APPEND);

// Simulate another student
file_put_contents('storage/logs/interactions-' . date('Y-m-d') . '.log', json_encode([
    'message' => 'Resource Action',
    'level' => 'info',
    'context' => [
        'user_id' => 2,
        'user_email' => 'jane@example.com',
        'ip' => '192.168.1.101',
        'url' => 'https://bardelingo.be/enroll/4',
        'method' => 'POST',
        'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'session_id' => 'def456uvw',
        'resource' => 'course',
        'action' => 'enrolled',
        'resource_id' => 4,
        'course_title' => 'French Intermediate',
        'course_language' => 'French',
        'teacher_id' => 6,
        'module_count' => 8,
    ],
    'time' => date('c'),
]) . "\n", FILE_APPEND);

file_put_contents('storage/logs/interactions-' . date('Y-m-d') . '.log', json_encode([
    'message' => 'Exercise Attempted',
    'level' => 'info',
    'context' => [
        'user_id' => 2,
        'user_email' => 'jane@example.com',
        'ip' => '192.168.1.101',
        'url' => 'https://bardelingo.be/exercises/22/submit',
        'method' => 'POST',
        'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'session_id' => 'def456uvw',
        'exercise_id' => 22,
        'correct' => false,
        'score' => 65,
        'max_score' => 100,
        'correct_answers' => 13,
        'total_questions' => 20,
        'attempt_number' => 1,
        'lesson_id' => 18,
        'exercise_type' => 'fill_in_blank',
        'time_spent' => 240,
    ],
    'time' => date('c'),
]) . "\n", FILE_APPEND);

echo "✅ Test logs generated successfully!\n\n";
echo "Generated logs:\n";
echo "- storage/logs/queries-" . date('Y-m-d') . ".log (3 query logs)\n";
echo "- storage/logs/navigation-" . date('Y-m-d') . ".log (3 navigation logs)\n";
echo "- storage/logs/interactions-" . date('Y-m-d') . ".log (8 interaction logs)\n\n";
echo "These logs will be collected by Alloy and sent to Loki.\n";
echo "Wait a few seconds, then check Grafana for the new logs!\n";
