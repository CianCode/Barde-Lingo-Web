import { Head, router, usePage } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Languages,
    BookOpen,
    HeadphonesIcon,
    Target,
    MessageCircle,
    BarChart3,
    Gamepad2,
    Smartphone,
    Award,
    Users,
    GraduationCap,
    TrendingUp,
    Globe,
} from 'lucide-react';

export default function Welcome({
    canRegister = true,
    courses = [],
}: {
    canRegister?: boolean;
    courses?: Course[];
}) {
    const { role } = usePage().props as any;

    return (
        <>
            <Head title="Welcome to BardeLingo">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <AnimatedNavbar canRegister={canRegister} />

            <div className="min-h-screen bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                {/* Hero Section */}
                <section
                    ref={heroRef}
                    className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20 lg:px-8"
                >
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-900/10" />
                        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-900/10" />
                    </div>

                    <div className="mx-auto max-w-5xl text-center">
                        <h1 className="hero-title mb-6 text-6xl font-bold leading-tight lg:text-8xl">
                            Master Any{' '}
                            <span className="text-purple-600 dark:text-purple-400">
                                Language
                            </span>
                            <br />
                            With Confidence
                        </h1>
                        <p className="hero-subtitle mx-auto mb-12 max-w-2xl text-lg text-gray-600 lg:text-xl dark:text-gray-400">
                            Join thousands of learners mastering new languages through
                            interactive courses, real-world practice, and personalized
                            learning paths.
                        </p>
                        <div className="hero-buttons mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="rounded-full bg-purple-600 px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                                onClick={() => router.visit('/register')}
                            >
                                Start Learning Free
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full border-2 px-8 py-6 text-base font-semibold hover:scale-105 transition-all"
                                onClick={() => {
                                    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Browse Courses
                            </Button>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            <div className="hero-features rounded-2xl border border-gray-200 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
                                <div className="mb-2 flex justify-center">
                                    <Languages className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">10+</div>
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Languages Available
                                </div>
                            </div>
                            <div className="hero-features rounded-2xl border border-gray-200 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
                                <div className="mb-2 flex justify-center">
                                    <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">100+</div>
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Interactive Lessons
                                </div>
                            </div>
                            <div className="hero-features rounded-2xl border border-gray-200 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
                                <div className="mb-2 flex justify-center">
                                    <HeadphonesIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400">24/7</div>
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Learning Support
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Courses Browser Section */}
                {role === 'student' && (
                    <section className="px-6 py-12 lg:px-8">
                        <div className="mx-auto max-w-4xl">
                            <h2 className="mb-6 text-3xl font-bold text-center">
                                Browse Courses
                            </h2>
                            {courses.length > 0 ? (
                                <div className="grid gap-6 md:grid-cols-2">
                                    {courses.map((course) => (
                                        <div
                                            key={course.id}
                                            className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-neutral-900 shadow-sm"
                                        >
                                            <h3 className="text-xl font-semibold mb-2">
                                                {course.title}
                                            </h3>
                                            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                                                {course.description || 'No description'}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                                                <span>Level: {course.level || 'N/A'}</span>
                                                <span
                                                    className={
                                                        course.is_published
                                                            ? 'text-green-600 dark:text-green-400'
                                                            : 'text-red-600 dark:text-red-400'
                                                    }
                                                >
                                                    {course.is_published
                                                        ? 'Publié'
                                                        : 'Non publié'}
                                                </span>
                                            </div>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="rounded-full px-6 py-2 text-sm font-medium">
                                                        Start Course
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Confirmer
                                                            l'inscription
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Êtes-vous sûr de
                                                            vouloir commencer
                                                            le cours «{' '}
                                                            {course.title} » ?
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter className="flex flex-col gap-2 items-center">
                                                        <Button
                                                            onClick={() => {
                                                                router.post(
                                                                    `/courses/${course.id}/enroll`,
                                                                    {},
                                                                    {
                                                                        onSuccess: () =>
                                                                            router.visit(
                                                                                '/dashboard'
                                                                            ),
                                                                    }
                                                                );
                                                            }}
                                                            className="w-56 max-w-full"
                                                        >
                                                            Oui, commencer le cours
                                                        </Button>
                                                        <DialogClose asChild>
                                                            <Button
                                                                variant="outline"
                                                                className="w-56 max-w-full"
                                                            >
                                                                Annuler
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground">
                                    No courses available at the moment.
                                </p>
                            )}
                        </div>
                    </section>
                )}

                {/* Stats Section */}
                <section ref={statsRef} id="about" className="scroll-mt-20 px-6 py-20 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-8 md:grid-cols-4">
                            <div className="stat-item text-center">
                                <div className="mb-3 flex justify-center">
                                    <Users className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="mb-2 text-5xl font-bold text-purple-600 dark:text-purple-400">
                                    10K+
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">Active Learners</div>
                            </div>
                            <div className="stat-item text-center">
                                <div className="mb-3 flex justify-center">
                                    <GraduationCap className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="mb-2 text-5xl font-bold text-blue-600 dark:text-blue-400">
                                    50+
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">Expert Teachers</div>
                            </div>
                            <div className="stat-item text-center">
                                <div className="mb-3 flex justify-center">
                                    <TrendingUp className="h-10 w-10 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="mb-2 text-5xl font-bold text-green-600 dark:text-green-400">
                                    95%
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
                            </div>
                            <div className="stat-item text-center">
                                <div className="mb-3 flex justify-center">
                                    <Globe className="h-10 w-10 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div className="mb-2 text-5xl font-bold text-orange-600 dark:text-orange-400">
                                    100+
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">Countries</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-20 lg:px-8">
                    <div className="mx-auto max-w-4xl rounded-3xl bg-purple-600 p-12 text-center text-white dark:bg-purple-700">
                        <h2 className="mb-4 text-4xl font-bold lg:text-5xl">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="mb-8 text-lg opacity-90">
                            Join thousands of learners and start mastering a new language today
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="rounded-full px-8 py-6 text-base font-semibold hover:scale-105 transition-all"
                                onClick={() => router.visit('/register')}
                            >
                                Get Started Free
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full border-2 border-white bg-transparent px-8 py-6 text-base font-semibold text-white hover:bg-white hover:text-purple-600 hover:scale-105 transition-all"
                                onClick={() => router.visit('/login')}
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-gray-50 px-6 py-12 dark:border-gray-800 dark:bg-gray-900/50">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-8 md:grid-cols-4">
                            <div className="col-span-2 md:col-span-1">
                                <div className="mb-4 flex items-center gap-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                                        <span className="text-xl font-bold text-white">B</span>
                                    </div>
                                    <span className="text-xl font-semibold">BardeLingo</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Making language learning accessible, fun, and effective for everyone.
                                </p>
                            </div>
                            <div>
                                <h4 className="mb-4 font-semibold">Product</h4>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li>
                                        <a href="#features" className="hover:text-purple-600 transition-colors dark:hover:text-purple-400">
                                            Features
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#courses" className="hover:text-purple-600 transition-colors dark:hover:text-purple-400">
                                            Courses
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-purple-600 transition-colors dark:hover:text-purple-400">
                                            Pricing
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-4 font-semibold">Company</h4>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li>
                                        <a href="#about" className="hover:text-purple-600 transition-colors dark:hover:text-purple-400">
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-purple-600 transition-colors dark:hover:text-purple-400">
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-purple-600 transition-colors dark:hover:text-purple-400">
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-4 font-semibold">Legal</h4>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li>
                                        <a href="#" className="hover:text-purple-600 transition-colors dark:hover:text-purple-400">
                                            Privacy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-purple-600 transition-colors dark:hover:text-purple-400">
                                            Terms
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
                            <p>© {new Date().getFullYear()} BardeLingo. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
