'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance Animation
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            // Animate noise texture
            gsap.to('.hero-noise-texture', {
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
            // Heading + Subtitle: SLOW movement (background feel)
            const heroTitle = containerRef.current?.querySelector('.hero-title');
            const heroSubtitle = containerRef.current?.querySelector('.hero-subtitle');
            if (heroTitle && heroSubtitle) {
                gsap.to([heroTitle, heroSubtitle], {
                    y: '-7vh',  // ✅ Doubled for 2x speed (1 scroll pixel = 2 translateY pixels)
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: document.documentElement,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,  // ✅ true = instant response (no lag/smoothing)
                        invalidateOnRefresh: true,
                    },
                });
            }

            // Navbar: SUPER FAST movement (foreground feel - 2x speed)
            if (navRef.current) {
                gsap.to(navRef.current, {
                    y: '-170vh',  // ✅ Doubled for 2x speed
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: document.documentElement,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,  // ✅ true = instant (no smoothing delay)
                        invalidateOnRefresh: true,
                    },
                });
            }

        }, containerRef);

        const videoObserver = new IntersectionObserver(
            ([entry]) => {
                if (videoRef.current) {
                    if (entry.isIntersecting) {
                        videoRef.current.play().catch(() => { });
                    } else {
                        videoRef.current.pause();
                    }
                }
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) videoObserver.observe(containerRef.current);

        return () => {
            ctx.revert();
            videoObserver.disconnect();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            id="hero"
            className="fixed top-0 left-0 right-0 h-screen w-full overflow-hidden  flex flex-col items-center justify-center z-0"
        >

            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <div className="absolute inset-0 bg-black/10 z-10" />

                {/* Animated Noise Texture Background */}
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
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="min-w-[100vw] h-full object-cover absolute left-1/2"
                    style={{ opacity: 0, filter: 'blur(20px)' }}
                >
                    <source src="/media/Web2.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="hero-text-group relative z-20 text-center w-full h-full pb-32 pt-[130px] px-4 flex flex-col justify-center items-center">
                <h1 className="hero-title relative z-10 text-[5.2rem] md:text-[6rem] font-bold text-white tracking-[14px] md:tracking-[12px] leading-[1.3] md:leading-[0.7] mb-2 flex flex-col md:block">
                    <span style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, }}>VIVEK</span><span className="ml-[-11px]" style={{ fontFamily: 'var(--font-cursive)', fontWeight: 300, textTransform: 'none', letterSpacing: '5px', }}>Singh</span>
                </h1>

                <div className="hero-subtitle relative z-20 flex flex-col md:flex-row items-center gap-2 mb-24">
                    <h2 className="hero-subtitle-left text-lg md:text-base font-light text-gray-300 tracking-[0.3em]">AFilmCraft</h2>
                    <span className="hero-subtitle-dash hidden md:inline text-gray-500">—</span>
                    <span className="hero-subtitle-right text-sm md:text-base text-gray-500 uppercase tracking-[0.1em]">By Sonty</span>
                </div>

                <nav
                    ref={navRef}
                    className="hero-nav relative self-center flex items-center justify-center overflow-hidden z-30"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                        width: '682px',
                        maxWidth: '95vw',
                        height: '76px',
                        padding: '23px 0px',
                        borderRadius: '13px',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(30px)',
                        boxShadow: 'rgba(4, 7, 13, 0.1) 0px 1px 100px 0px inset',
                        gap: '0px',
                        boxSizing: 'border-box'
                    }}
                >
                    <a href="#works" className="px-17 text-[#aba9aa99] hover:text-white transition-colors cursor-pointer no-underline" style={{ fontSize: '16px', fontFamily: 'Bricolage Grotesque' }}>Works</a>
                    <div className="w-0.5 h-7 bg-white/5" />
                    <Link href="/luts" className="px-30 text-[#aba9aa99] hover:text-white transition-colors no-underline" style={{ fontSize: '16px', fontFamily: 'Bricolage Grotesque' }}>LUTs</Link>
                    <div className="w-0.5 h-7 bg-white/5" />
                    <Link href="/contact" className="px-17 text-[#aba9aa99] hover:text-white transition-colors no-underline" style={{ fontSize: '16px', fontFamily: 'Bricolage Grotesque' }}>Contacts</Link>
                </nav>
            </div>
        </section>
    );
}