'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Mission() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!textRef.current) return;

            // Split text into words
            const split = new SplitText(textRef.current, {
                type: 'words',
                wordsClass: 'word'
            });

            // Animate words sequentially
            gsap.fromTo(
                split.words,
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                        end: 'bottom 25%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Animate noise texture - Retro TV Static Effect
            gsap.to('.noise-texture', {
                x: () => `${Math.random() * 10 - 5}%`,
                y: () => `${Math.random() * 10 - 5}%`,
                duration: 0.1,
                repeat: -1,
                repeatRefresh: true,
                ease: "none",
            });

            // Animate blur border particles - EXACT 6:1 Speed Ratio
            // Movement (-600vh) / Scroll Distance (100vh) = 6x Speed
            gsap.to('.blur-border-main', {
                y: '-600vh',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom', // When Mission top enters bottom
                    end: 'top top',      // Until Mission top reaches top (exactly 100vh scroll)
                    scrub: 0.1,          // Reduced lag for more precision
                }
            });

            gsap.to('.blur-particle-1', {
                y: '-600vh',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 0.1,
                }
            });

            gsap.to('.blur-particle-2', {
                y: '-600vh',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 0.1,
                }
            });

            gsap.to('.blur-particle-3', {
                y: '-600vh',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 0.1,
                }
            });

            gsap.to('.blur-particle-4', {
                y: '-600vh',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 0.1,
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full py-32 md:py-48 px-6 md:px-12 flex justify-center items-center relative overflow-hidden z-50 mt-[100vh]"
            style={{
                background: 'radial-gradient(circle at center, #0F121E 0%, #020408 100%)'
            }}
        >
            {/* Animated Noise Texture Background */}
            <div
                className="absolute noise-texture"
                style={{
                    backgroundImage: 'url(https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png)',
                    backgroundSize: '60px 60px',
                    backgroundRepeat: 'repeat',
                    position: 'absolute',
                    inset: '-200%',
                    width: '400%',
                    height: '400%',
                    opacity: 0.08,
                    willChange: 'transform',
                    transform: 'translateX(-10%) translateY(10%)',
                }}
            />

            {/* Blurry Top Border Effect */}
            <div className="blur-border-container absolute top-0 left-0 right-0 h-32 overflow-hidden pointer-events-none z-50">
                {/* Main blur gradient */}
                <div
                    className="blur-border-main absolute top-0 left-0 right-0 h-24"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, transparent 100%)',
                        filter: 'blur(60px)',
                        transform: 'translateY(-50%)',
                    }}
                />

                {/* Organic blur particles/sprinkles */}
                <div className="blur-particle blur-particle-1 absolute rounded-full mix-blend-screen"
                    style={{
                        width: '120px',
                        height: '80px',
                        background: 'radial-gradient(circle, rgba(180, 200, 255,0.2) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        top: '-20px',
                        left: '10%',
                    }}
                />
                <div className="blur-particle blur-particle-2 absolute rounded-full mix-blend-screen"
                    style={{
                        width: '150px',
                        height: '100px',
                        background: 'radial-gradient(ellipse, rgba(180, 200, 255,0.15) 0%, transparent 70%)',
                        filter: 'blur(50px)',
                        top: '-30px',
                        left: '35%',
                    }}
                />
                <div className="blur-particle blur-particle-3 absolute rounded-full mix-blend-screen"
                    style={{
                        width: '100px',
                        height: '90px',
                        background: 'radial-gradient(circle, rgba(180, 200, 255,0.25) 0%, transparent 70%)',
                        filter: 'blur(35px)',
                        top: '-15px',
                        right: '20%',
                    }}
                />
                <div className="blur-particle blur-particle-4 absolute rounded-full mix-blend-screen"
                    style={{
                        width: '130px',
                        height: '70px',
                        background: 'radial-gradient(ellipse, rgba(180, 200, 255,0.15) 0%, transparent 70%)',
                        filter: 'blur(55px)',
                        top: '-25px',
                    }}
                />
            </div>

            <div className="max-w-5xl text-center relative z-10">
                <p
                    ref={textRef}
                    className="text-3xl md:text-5xl lg:text-[4rem] font-bold leading-tight md:leading-[1.1] text-text-primary"
                    style={{ willChange: 'transform, opacity', fontFamily: '"Satisfy", cursive' }}
                >
                    We believe storytelling lives in details, in timing and in silence. That's why we shape emotion through every frame.
                </p>
            </div>
        </section>
    );
}
