'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export default function PowerGradePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current, {
                opacity: 0,
                y: 30,
                duration: 1.5,
                ease: "power4.out",
                filter: "blur(10px)"
            });

            // Subtle rotation animation for the icon
            gsap.to(".coming-soon-icon", {
                rotate: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main
            ref={containerRef}
            className="min-h-screen w-full bg-[#000000] flex flex-col items-center justify-center text-white relative overflow-hidden"
        >
            {/* Back to Home Link */}
            <div className="absolute top-10 left-10 z-50">
                <Link
                    href="/"
                    className="group flex items-center gap-2 text-white/40 hover:text-white transition-all duration-300"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium tracking-widest uppercase">Back</span>
                </Link>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            <div ref={contentRef} className="relative z-10 flex flex-col items-center gap-8 text-center px-4">
                {/* Visual Icon */}
                <div className="coming-soon-icon relative w-24 h-24 mb-4">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-white/20">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                        <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                        <circle cx="50" cy="50" r="2" fill="currentColor" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2"
                        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                    >
                        Coming Soon
                    </h1>
                    <p className="text-white/40 text-sm md:text-base tracking-[0.4em] uppercase font-light">
                        Power Grade Experience • In Progress
                    </p>
                </div>

                {/* Decorative Line */}
                <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent mt-8" />
            </div>

            {/* Minimal Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: 'url(https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png)', backgroundSize: '100px' }} />
        </main>
    );
}
