
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BookOpen, Clock, FileText, ClipboardList } from 'lucide-react';
import LessonExercise from '@/components/lesson-exercise';
import type { PageProps } from '@/types';

export default function ShowLesson({ lesson }: PageProps<{ lesson: any }>) {
    return (
        <AppLayout>
            <Head title={lesson.title} />
            <div className="w-full py-10 px-0 sm:px-4 md:px-8">
                <div className="w-full rounded-2xl p-8 shadow-xl border border-border transition-colors duration-300 bg-gradient-to-br from-white/90 to-gray-50 dark:from-muted dark:to-muted-foreground/10">
                    <div className="flex items-center gap-4 mb-6">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-3xl font-bold leading-tight mb-1">{lesson.title}</h1>
                            {lesson.module?.course?.title && (
                                <div className="text-xs text-muted-foreground font-medium">
                                    Course: {lesson.module.course.title}
                                </div>
                            )}
                        </div>
                    </div>
                    {lesson.description && (
                        <p className="mb-4 text-base text-muted-foreground italic">{lesson.description}</p>
                    )}
                    <div className="flex items-center gap-4 mb-6">
                        {lesson.duration_minutes && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                <Clock className="h-4 w-4" />
                                {lesson.duration_minutes} min
                            </span>
                        )}
                        {lesson.module?.title && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-secondary-foreground">
                                <FileText className="h-4 w-4" />
                                Module: {lesson.module.title}
                            </span>
                        )}
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
                            <FileText className="h-5 w-5 text-primary" />
                            Lesson Content
                        </h2>
                        {lesson.contents && lesson.contents.length > 0 ? (
                            <ul className="space-y-4">
                                {lesson.contents.map((content: any, idx: number) => (
                                    <li key={content.id} className="rounded-lg p-4 border border-border transition-colors duration-300 bg-gradient-to-br from-muted/60 to-white/80 dark:from-muted/80 dark:to-muted-foreground/10 hover:shadow-md">
                                        <div className="font-medium text-sm mb-1 text-muted-foreground">Section {idx + 1}</div>
                                        <div className="text-base text-foreground whitespace-pre-line">{content.content || 'Content item'}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground">No content available.</p>
                        )}
                    </div>

                    {lesson.exercises && lesson.exercises.length > 0 && (
                        <div className="mt-10">
                            <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
                                <ClipboardList className="h-5 w-5 text-primary" />
                                Exercises
                            </h2>
                            <div className="space-y-6">
                                {lesson.exercises.map((exercise: any) => (
                                    <LessonExercise key={exercise.id} exercise={exercise} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
