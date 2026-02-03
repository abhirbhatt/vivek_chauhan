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

            // Parallax effect on video - moves faster for depth
            gsap.to(videoRef.current, {
                yPercent: -50, // Moves up faster than scroll
                ease: 'power1.inout',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Parallax on Text Group (Heading + Subtitle moving together)
            gsap.to('.hero-text-group', {
                y: '-95vh',
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Parallax on Nav Bar (Exact 2:1 Speed Ratio - 2px move per 1px scroll)
            gsap.to(navRef.current, {
                y: '-220vh',
                ease: 'power4.inOut',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });


        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="fixed top-0 left-0 right-0 h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center z-0"
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
                        src="/media/web.mov"
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
                <div className="hero-text-group hero-text hero-heading mb-32 flex flex-col items-center">
                    <h1 className="hero-title relative z-10 text-[4rem] md:text-[3rem] font-bold text-white tracking-[10px] md:tracking-[20px] leading-[1] mb-2 flex flex-col md:block">
                        <span style={{ fontFamily: '"Gloock", serif' }}>VIVEK</span><span className="md:ml-1" style={{ fontFamily: '"Great Vibes", cursive', fontWeight: 400, textTransform: 'none', letterSpacing: 'normal' }}>Singh</span>
                    </h1>

                    <div className="hero-subtitle relative z-20 flex flex-row items-center gap-2 ">
                        <h2 className="text-lg md:text-sm font-light text-gray-300 tracking-wide">
                            VIDEOGRAPHER
                        </h2>
                        <span className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.1em]">
                            Available Worldwide
                        </span>
                    </div>
                </div>

                {/* Navigation Links - Inline with separators + Glassy Background */}
                <nav
                    ref={navRef}
                    className="hero-nav relative self-center flex items-center justify-center gap-12 overflow-hidden z-30"
                    style={{
                        backdropFilter: 'blur(30px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.07)',
                        borderRadius: '13px',
                        width: '47vw',
                        height: 'min-content',
                        padding: '29px 0px',
                        boxShadow: 'rgba(51, 55, 63, 0.1) 0px 1px 100px inset',
                    }}
                >
                    <Link
                        href="#works"
                        className="text-sm md:text-base hover:text-white transition-colors font-light tracking-wide px-2"
                        style={{ color: '#aba9aa99' }}
                    >
                        Works
                    </Link>
                    <div className="w-px h-4" style={{ backgroundColor: '#aba9aa99', opacity: 0.2 }} />
                    <Link
                        href="/luts"
                        className="text-sm md:text-base hover:text-white transition-colors font-light tracking-wide px-2"
                        style={{ color: '#aba9aa99' }}
                    >
                        LUTs
                    </Link>
                    <div className="w-px h-4" style={{ backgroundColor: '#aba9aa99', opacity: 0.2 }} />
                    <Link
                        href="/contact"
                        className="text-sm md:text-base hover:text-white transition-colors font-light tracking-wide px-2"
                        style={{ color: '#aba9aa99' }}
                    >
                        Contacts
                    </Link>
                </nav>
            </div>

            {/* Bottom Blurry Fade Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-black/60 to-[#000000] z-20 pointer-events-none backdrop-blur-[2px]" />
        </section>
    );
}
