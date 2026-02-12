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
            tl.set(videoRef.current, { scale: 1.2, opacity: 0 });
            tl.set('.hero-title span', { y: 100, opacity: 0, filter: 'blur(20px)' });
            tl.set('.hero-subtitle', { y: 30, opacity: 0 });
            tl.set(navRef.current, { y: 60, opacity: 0 });

            // 1. Video zoom-out and fade-in
            tl.to(videoRef.current, {
                opacity: 0.8,
                scale: 1.1,
                duration: 2.5,
                ease: 'power2.out'
            }, 0);

            // 2. Name stagger reveal
            tl.to('.hero-title span', {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.8,
                stagger: 0.2,
                ease: 'expo.out'
            }, 0.5);

            // 3. Subtitle reveal
            tl.to('.hero-subtitle', {
                y: 0,
                opacity: 1,
                duration: 1.2,
            }, 1.2);

            // 4. Nav bar reveal
            tl.to(navRef.current, {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: 'power3.out'
            }, 1.4);

            // 🚀 PARALLAX EFFECTS — 2x FASTER SPEED
            // Heading + Subtitle: SLOW movement (background feel)
            const heroTitle = containerRef.current?.querySelector('.hero-title');
            const heroSubtitle = containerRef.current?.querySelector('.hero-subtitle');
            if (heroTitle && heroSubtitle) {
                gsap.to([heroTitle, heroSubtitle], {
                    y: '-80vh',  // ✅ Doubled for 2x speed (1 scroll pixel = 2 translateY pixels)
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
                    y: '-280vh',  // ✅ Doubled for 2x speed
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
                    className="w-full h-full object-cover object-[50%_65%]"
                    style={{ transform: 'translateZ(0)', opacity: 1 }}
                >
                    <source src="/media/Web2.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="hero-text-group relative z-20 text-center w-full h-full pb-32 pt-[130px] px-4 flex flex-col justify-center items-center">
                <h1 className="hero-title relative z-10 text-[5.2rem] md:text-[6rem] font-bold text-white tracking-[14px] md:tracking-[12px] leading-[1.3] md:leading-[0.7] mb-2 flex flex-col md:block">
                    <span style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, }}>VIVEK</span><span className="ml-[-11px]" style={{ fontFamily: 'var(--font-cursive)', fontWeight: 300, textTransform: 'none', letterSpacing: '5px', }}>Singh</span>
                </h1>

                <div className="hero-subtitle relative z-20 flex flex-col md:flex-row items-center gap-2 mb-24">
                    <h2 className="text-lg md:text-base font-light text-gray-300 tracking-[0.3em]">AFilmCraft</h2>
                    <span className="hidden md:inline text-gray-500">—</span>
                    <span className="text-sm md:text-base text-gray-500 uppercase tracking-[0.1em]">By Sonty</span>
                </div>

                <nav
                    ref={navRef}
                    className="hero-nav relative self-center flex items-center justify-center gap-5 md:gap-12 overflow-hidden z-30"
                    style={{
                        backdropFilter: 'blur(30px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.07)',
                        borderRadius: '15px',
                        width: 'auto',
                        padding: '30px 90px',
                        boxShadow: 'rgba(51, 55, 63, 0.1) 0px 1px 100px inset',
                    }}
                >
                    <a href="#works" className="text-[#aba9aa99] hover:text-white transition-colors cursor-pointer no-underline">Works</a>
                    <div className="w-0.5 h-7 rounded-[10px] bg-white/5" />
                    <Link href="/luts" className="text-[#aba9aa99] hover:text-white transition-colors no-underline">LUTs</Link>
                    <div className="w-0.5 h-7 rounded-[10px]  bg-white/5" />
                    <Link href="/contact" className="text-[#aba9aa99] hover:text-white transition-colors no-underline">Contacts</Link>
                </nav>
            </div>
        </section>
    );
}