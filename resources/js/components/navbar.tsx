import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';

interface NavbarProps {
    canRegister?: boolean;
}

export default function Navbar({ canRegister = true }: NavbarProps) {
    const { auth, name } = usePage<SharedData>().props;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed right-0 left-0 z-50 mx-auto transition-all duration-300 ${
                isScrolled
                    ? 'top-4 w-[calc(100%-2rem)] max-w-6xl rounded-full border border-[#19140035] bg-white/80 shadow-lg backdrop-blur-md dark:border-[#3E3E3A] dark:bg-[#1a1a1a]/80'
                    : 'top-0 w-full border-b border-transparent bg-transparent'
            }`}
        >
            <div
                className={`mx-auto flex items-center justify-between transition-all duration-300 ${
                    isScrolled ? 'px-6 py-3' : 'px-6 py-5 lg:px-8'
                }`}
            >
                {/* Logo and Title - Left */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black dark:bg-white">
                        <span className="text-xl font-bold text-white dark:text-black">
                            B
                        </span>
                    </div>
                    <span className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                        {name || 'BardeLingo'}
                    </span>
                </div>

                {/* Navigation Links - Center */}
                <div className="hidden items-center gap-8 md:flex">
                    <a
                        href="#features"
                        className="text-sm font-medium text-[#1b1b18] transition-colors hover:text-gray-600 dark:text-[#EDEDEC] dark:hover:text-gray-400"
                    >
                        Features
                    </a>
                    <a
                        href="#contact"
                        className="text-sm font-medium text-[#1b1b18] transition-colors hover:text-gray-600 dark:text-[#EDEDEC] dark:hover:text-gray-400"
                    >
                        Contact
                    </a>
                </div>

                {/* Auth Buttons - Right */}
                <div className="flex items-center gap-3">
                    {auth.user ? (
                        <Link
                            href={dashboard()}
                            className="inline-block rounded-full border border-[#19140035] bg-white px-6 py-2 text-sm leading-normal font-medium text-[#1b1b18] transition-all hover:border-[#1915014a] hover:shadow-md dark:border-[#3E3E3A] dark:bg-[#1a1a1a] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="inline-block rounded-full border border-transparent px-6 py-2 text-sm leading-normal font-medium text-[#1b1b18] transition-all hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Login
                            </Link>
                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="inline-block rounded-full bg-black px-6 py-2 text-sm leading-normal font-medium text-white transition-all hover:shadow-lg dark:bg-white dark:text-black"
                                >
                                    Get Started
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
