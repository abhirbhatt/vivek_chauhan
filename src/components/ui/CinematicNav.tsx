'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CinematicNav() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Scroll detection for background blur effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Page load animation trigger
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const navLinks = [
        { name: 'WORKS', href: '#works' },
        { name: 'LUTS', href: '/luts' },
        { name: 'CONTACTS', href: '/contact' },
    ];

    return (
        <>
            {/* Main Navigation Bar */}
            <nav
                className={cn(
                    // Base positioning
                    'fixed top-0 left-0 right-0 z-[1000]',
                    // Height
                    'h-20 md:h-20',
                    // Transition for background
                    'transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
                    // Background state
                    isScrolled
                        ? 'bg-black/65 backdrop-blur-xl'
                        : 'bg-transparent',
                    // Page load animation
                    isLoaded
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-5'
                )}
                style={{
                    transitionProperty: 'background-color, backdrop-filter, opacity, transform',
                }}
            >
                <div className="container mx-auto h-full px-6 md:px-12 flex items-center justify-between">

                    {/* Logo / Brand Name */}
                    <Link
                        href="/"
                        className="text-[#d5dbe6] text-xl md:text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity duration-300"
                        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                    >
                        VIVEK SINGH
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="nav-link relative text-[14px] font-normal text-white tracking-tight overflow-hidden group"
                            >
                                {link.name}
                                {/* Animated underline */}
                                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform -translate-x-full transition-transform duration-[350ms] ease-out group-hover:translate-x-0" />
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Hamburger Menu */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-white focus:outline-none z-[1001] relative"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Fullscreen Menu Overlay */}
            <div
                className={cn(
                    'fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center',
                    'transition-opacity duration-500 md:hidden',
                    isMobileMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                )}
            >
                <div className="flex flex-col items-center gap-8">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                'mobile-menu-link text-3xl font-light text-white tracking-wide',
                                'transition-all duration-500',
                                isMobileMenuOpen
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-4'
                            )}
                            style={{
                                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
