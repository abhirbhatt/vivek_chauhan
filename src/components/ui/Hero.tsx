'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmartVideo from './SmartVideo';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        let noiseAnimation: gsap.core.Tween | null = null;

        const startNoiseAnimation = () => {
            if (!noiseAnimation) {
                noiseAnimation = gsap.to('.hero-noise-texture', {
                    duration: 0.05,
                    repeat: -1,
                    onRepeat: () => {
                        gsap.set('.hero-noise-texture', {
                            x: Math.random() * 20 - 10 + '%',
                            y: Math.random() * 10 - 5 + '%',
                        });
                    },
                    ease: "none",
                });
            } else {
                noiseAnimation.play();
            }
        };

        const stopNoiseAnimation = () => {
            noiseAnimation?.pause();
        };

        const ctx = gsap.context(() => {
            // Entrance Animation
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            // Set initial states
            tl.set(videoRef.current, { xPercent: -50, scale: 1.1, opacity: 0, filter: 'blur(20px)' });
            tl.set('.hero-title span', { y: 100, opacity: 0, filter: 'blur(20px)' });
            tl.set('.hero-subtitle-left', { x: -50, opacity: 0, filter: 'blur(10px)' });
            tl.set('.hero-subtitle-right', { x: 50, opacity: 0, filter: 'blur(10px)' });
            tl.set('.hero-subtitle-dash', { opacity: 0, scale: 0.5 });
            tl.set(navRef.current, { y: 150, opacity: 0, filter: 'blur(30px)' });

            // 1. Video zoom-out and fade-in - Reveals FIRST
            tl.to(videoRef.current, {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                xPercent: -50,
                duration: 2.8,
                ease: 'power2.inOut'
            }, 0);

            // 2. Name reveal - Starts once video is nearly clear
            tl.to('.hero-title span', {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 2.5,
                stagger: 0.08,
                ease: 'expo.out'
            }, 1.8);

            // 3. Subtitle reveal - Sequential after name starts
            tl.to('.hero-subtitle-left', {
                x: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 2.4,
                ease: 'power4.out'
            }, 2.2)
                .to('.hero-subtitle-right', {
                    x: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 2.4,
                    ease: 'power4.out'
                }, 2.2)
                .to('.hero-subtitle-dash', {
                    opacity: 1,
                    scale: 1,
                    duration: 2.0,
                    ease: 'power2.out'
                }, 2.5);

            // 4. Nav bar reveal - Dramatic Slide Up last
            tl.to(navRef.current, {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 2.2,
                ease: 'expo.out'
            }, 2.8);


            // 🚀 PARALLAX EFFECTS — 2x FASTER SPEED
            const heroTitle = containerRef.current?.querySelector('.hero-title');
            const heroSubtitle = containerRef.current?.querySelector('.hero-subtitle');
            if (heroTitle && heroSubtitle) {
                gsap.to([heroTitle, heroSubtitle], {
                    y: '-7vh',
                    ease: 'power3.in',
                    scrollTrigger: {
                        trigger: document.documentElement,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                });
            }

            if (navRef.current) {
                gsap.to(navRef.current, {
                    y: '-170vh',
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: document.documentElement,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                });
            }

            // 🚀 PERFORMANCE CONTROL — Pause everything when not visible
            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    videoRef.current?.play().catch(() => { });
                    startNoiseAnimation();
                } else {
                    videoRef.current?.pause();
                    stopNoiseAnimation();
                }
            }, { threshold: 0.01 });

            if (containerRef.current) observer.observe(containerRef.current);

        }, containerRef);

        return () => {
            observer?.disconnect();
            stopNoiseAnimation();
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            id="hero"
            className="fixed top-0 left-0 right-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center z-0"
        >
            <h1 className="sr-only">Vivek Singh Chauhan - Cinematographer & Filmmaker in Delhi NCR</h1>

            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <div className="absolute inset-0 bg-black/30 z-10" />

                <div
                    className="absolute hero-noise-texture z-20"
                    style={{
                        backgroundImage: 'url(https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png)',
                        backgroundSize: '140px 140px',
                        backgroundRepeat: 'repeat',
                        position: 'absolute',
                        inset: '-180%',
                        width: '600%',
                        height: '600%',
                        opacity: 0.05,
                        willChange: 'transform',
                        transform: 'translateX(0%) translateY(10%)',
                        mixBlendMode: 'normal',
                        pointerEvents: 'none',
                        filter: 'contrast(150%) brightness(80%)',
                    }}
                />
                <SmartVideo
                    ref={videoRef}
                    src="/media/Web2.mp4"
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="min-w-[100vw] h-full object-cover absolute left-1/2"
                    style={{ opacity: 0, filter: 'blur(20px)' }}
                />
            </div>

            <div className="hero-text-group relative z-20 text-center w-full h-full pb-32 pt-24 md:pt-[130px] px-4 flex flex-col justify-center items-center" style={{ willChange: 'transform' }}>
                <h1 className="hero-title relative z-10 text-[3.8rem] md:text-[5.5rem] lg:text-[6rem] font-bold text-white tracking-[6px] md:tracking-[10px] lg:tracking-[12px] leading-[1.1] md:leading-[0.7] mb-2 flex flex-col md:block">
                    <span style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 900, }}>VIVEK</span><span className="ml-[-6px] md:ml-[-11px] tracking-[2px] md:tracking-[5px]" style={{ fontFamily: 'var(--font-cursive)', fontWeight: 300, textTransform: 'none' }}>Singh</span>
                </h1>

                <div className="hero-subtitle relative z-20 flex flex-col md:flex-row items-center gap-2 mb-16 md:mb-24">
                    <h2 className="hero-subtitle-left text-sm md:text-base font-light text-gray-300 tracking-[0.2em] md:tracking-[0.3em]">AFilmCraft</h2>
                    <span className="hero-subtitle-dash hidden md:inline text-gray-500">—</span>
                    <span className="hero-subtitle-right text-xs md:text-base text-gray-500 uppercase tracking-[0.1em]">By Sonty</span>
                </div>

                <nav
                    ref={navRef}
                    className="hero-nav relative self-center flex items-center justify-center z-30 w-[90vw] md:w-[720px] max-w-full h-auto md:h-[76px] py-4 md:py-[23px] px-2 md:px-[10px] rounded-[10px] md:rounded-[13px] bg-white/10 md:bg-white/15 backdrop-blur-[20px] md:backdrop-blur-[30px] shadow-[inset_0_1px_100px_0_rgba(4,7,13,0.1)] gap-1 md:gap-0"
                    style={{ boxSizing: 'border-box' }}
                >
                    <a href="#works" className="flex-1 md:flex-none px-4 md:px-17 text-[#aba9aa99] hover:text-white transition-colors cursor-pointer no-underline text-sm md:text-base" style={{ fontFamily: 'Bricolage Grotesque' }}>Works</a>
                    <div className="w-px h-5 md:h-7 bg-white/5" />
                    <Link href="/color-grade" className="flex-1 md:flex-none px-4 md:px-20 text-[#aba9aa99] hover:text-white transition-colors no-underline whitespace-nowrap text-sm md:text-base" style={{ fontFamily: 'Bricolage Grotesque' }}>Power Grade</Link>
                    <div className="w-px h-5 md:h-7 bg-white/5" />
                    <Link href="/contact" className="flex-1 md:flex-none px-4 md:px-17 text-[#aba9aa99] hover:text-white transition-colors no-underline text-sm md:text-base" style={{ fontFamily: 'Bricolage Grotesque' }}>Contacts</Link>
                </nav>
            </div>
        </section>
    );
}