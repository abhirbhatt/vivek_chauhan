'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance Animation - all elements fade in together
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Fade in heading and subtitle group
            tl.fromTo(
                '.hero-text-group',
                { opacity: 0 },
                { opacity: 1, duration: 1, delay: 0.5 }
            );

            // Parallax effect on video
            gsap.to(videoRef.current, {
                yPercent: 0, // Kinetic but Static (Reference Style)
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Parallax on heading and subtitle group
            gsap.to('.hero-text-group', {
                y: -200,  // Moves up moderately
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            // Parallax on nav bar
            gsap.to(navRef.current, {
                y: -400,  // Moves up fast
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center"
        >
            {/* Background Video */}
            <div className="fixed inset-0 z-0 select-none pointer-events-none">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-[50%_65%] opacity-80"
                >
                    <source
                        src="/media/website.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>

                {/* Grainy Texture Overlay */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-10"
                    style={{
                        backgroundImage: 'url(https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png)',
                        backgroundSize: '120px 120px',
                        backgroundRepeat: 'repeat',
                    }}
                />
            </div>

            {/* Content */}
            <div ref={textRef} className="relative z-20 text-center w-full h-full pb-32 pt-[130px] px-4 flex flex-col justify-center items-center">
                {/* Heading and Subtitle Container */}
                <div className="hero-text-group hero-text hero-heading mb-12 flex flex-col items-center">
                    <h1 className="text-[3rem] md:text-[3rem] lg:text-[3rem] font-bold text-white tracking-[10px] md:tracking-[20px] leading-[0.9] mb-8" style={{ fontFamily: '"Zalando Sans Expanded", sans-serif' }}>
                        FILIPPO<br />FORNER
                    </h1>

                    <div className="hero-subtitle flex flex-col items-center gap-2">
                        <h2 className="text-lg md:text-2xl font-light text-gray-300 tracking-wide">
                            VIDEOGRAPHER
                        </h2>
                        <span className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em]">
                            Available Worldwide
                        </span>
                    </div>
                </div>

                {/* Navigation Links - Inline with separators + Glassy Background */}
                <nav
                    ref={navRef}
                    className="hero-nav relative self-center flex items-center justify-center gap-12 overflow-hidden z-20"
                    style={{
                        backdropFilter: 'blur(30px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '13px',
                        width: '57vw',
                        height: 'min-content',
                        padding: '27px 0px',
                        boxShadow: 'rgba(4, 7, 13, 0.1) 0px 1px 100px inset',
                    }}
                >
                    <Link
                        href="#works"
                        className="text-sm md:text-base text-white/80 hover:text-white transition-colors font-light tracking-wide px-2"
                    >
                        Works
                    </Link>
                    <div className="w-px h-4 bg-white/20" />
                    <Link
                        href="/luts"
                        className="text-sm md:text-base text-white/80 hover:text-white transition-colors font-light tracking-wide px-2"
                    >
                        LUTs
                    </Link>
                    <div className="w-px h-4 bg-white/20" />
                    <Link
                        href="/contact"
                        className="text-sm md:text-base text-white/80 hover:text-white transition-colors font-light tracking-wide px-2"
                    >
                        Contacts
                    </Link>
                </nav>
            </div>



        </section>
    );
}
