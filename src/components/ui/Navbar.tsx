'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        // Initial Animation
        gsap.fromTo(
            '.nav-item',
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Works', href: '#works' },
        { name: 'Services', href: '#services' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
                    isScrolled
                        ? 'bg-background-primary/90 backdrop-blur-md py-4 border-b border-white/5'
                        : 'bg-transparent py-8'
                )}
            >
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="nav-item text-white text-xl md:text-2xl font-bold tracking-tight z-50 relative">
                        FILIPPO FORNER
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="nav-item relative text-sm font-medium text-white/80 hover:text-white transition-colors group overflow-hidden"
                            >
                                {link.name}
                                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="nav-item md:hidden text-white focus:outline-none z-50 relative"
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    'fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 transition-opacity duration-500',
                    isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-2xl font-light text-white tracking-wide hover:text-gray-300 transition-colors"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </>
    );
}
