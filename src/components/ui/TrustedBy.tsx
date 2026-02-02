'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

// Mock Logos (using text for now, or placeholders)
const brands = [
    "VOGUE", "NIKE", "ADIDAS", "SONY", "RED", "ARRI", "CANON", "NETFLIX", "HBO", "VICE"
];

export default function TrustedBy() {
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const content = marqueeRef.current?.querySelector('.marquee-content');

            if (content && marqueeRef.current) {
                // Clone content for seamless loop
                const clone = content.cloneNode(true) as HTMLElement;
                clone.classList.add('marquee-clone');
                marqueeRef.current.appendChild(clone);

                // Animate both original and clone
                const children = Array.from(marqueeRef.current.children);
                gsap.to(children, {
                    xPercent: -100,
                    repeat: -1,
                    duration: 30,
                    ease: "linear",
                });
            }

            // Retro TV Static / Noise Animation (Now properly scoped!)
            gsap.to('.noise-texture', {
                x: () => `${Math.random() * 10 - 5}%`,
                y: () => `${Math.random() * 10 - 5}%`,
                duration: 0.1,
                repeat: -1,
                repeatRefresh: true,
                ease: "none",
            });
        }, sectionRef); // Scope to sectionRef instad of marqueeRef

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-20 bg-black border-y border-white/5 overflow-hidden relative">
            {/* Animated Noise Texture Background - Retro TV Static style */}
            <div
                className="absolute noise-texture"
                style={{
                    backgroundImage: 'url(https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png)',
                    backgroundSize: '120px 120px',
                    backgroundRepeat: 'repeat',
                    position: 'absolute',
                    inset: '-200%',
                    width: '400%',
                    height: '400%',
                    opacity: 0.08,
                    willChange: 'transform',
                    // Initial transform handled by GSAP
                }}
            />

            {/* Blurry Blend at Top Border */}
            <div
                className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-20"
                style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, transparent 100%)',
                    filter: 'blur(50px)',
                    mixBlendMode: 'overlay', // Better blending
                }}
            />

            <div className="container mx-auto px-6 mb-8 text-center relative z-10">
                <span className="text-xs font-bold tracking-[0.3em] text-gray-600 uppercase">
                    Trusted By
                </span>
            </div>

            <div
                ref={marqueeRef}
                className="w-full relative flex whitespace-nowrap overflow-hidden z-10"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                }}
            >
                <div className="marquee-content flex items-center space-x-16 md:space-x-32 px-8">
                    {brands.map((brand, index) => (
                        <div
                            key={index}
                            className="text-3xl md:text-5xl font-bold text-transparent text-stroke-1 hover:text-white/80 transition-colors duration-500 cursor-default select-none opacity-40 hover:opacity-100"
                            style={{ WebkitTextStroke: '1px #444' }}
                        >
                            {brand}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
