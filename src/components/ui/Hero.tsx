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

            // Signature reveal
            tl.fromTo('.hero-signature',
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
                0.4
            );

            tl.to('.hero-signature [class^="signature-path"]', {
                clipPath: 'inset(0 0% 0 0)',
                duration: 2,
                stagger: 0.4,
                ease: 'expo.inOut'
            }, 0.5);

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

            // PARALLAX EFFECTS - RESTORED TO THE "DIFFICULT TO SET" PERFECT VALUES (-95vh / -220vh)
            // PRRECISE 0.6x PARALLAX LOGIC
            // Since Hero is fixed, we link movement to the first 100vh of global scroll
            gsap.to('.hero-text-group', {
                y: '-60vh', // Exactly 0.6 units for every 1 unit of scroll height (100vh)
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body', // Reference the actual scrollable space
                    start: 'top top',
                    end: '100% top', // Lasts for the entire first screen
                    scrub: 1.5,      // Smooth scrubbing for weight
                    invalidateOnRefresh: true,
                },
            });

            // // navbar 
            // const nav = navRef.current;
            // if (nav) {
            //     gsap.to(nav, {
            //         y: '-220vh',
            //         ease: 'power3.in', // Fast snappy speed
            //         scrollTrigger: {
            //             trigger: '#about', // Mission Section
            //             start: 'top center',
            //             end: 'bottom top',
            //             scrub: 1,
            //             invalidateOnRefresh: true,
            //         },
            //     });
            // }

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
            {/* Signature SVG */}
            <div className="hero-signature fixed top-2 left-[-22px] z-[9999] pointer-events-none select-none">
                <svg className="w-32 md:w-46 h-auto" viewBox="0 0 800 540" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 288, 65)">
                        <g fill="#ece1e1ff">
                            <g transform="translate(1.506211, 227.94978)">
                                <path className="signature-path" fill="#FFFFFF" style={{ clipPath: 'inset(0 100% 0 0)' }} d="M 117.34375 41.53125 C 116.582031 43.050781 115.628906 44.765625 114.484375 46.671875 C 113.335938 48.578125 111.75 49.53125 109.71875 49.53125 C 107.6875 49.53125 106.289062 48.765625 105.53125 47.234375 C 104.769531 45.710938 104.390625 44.066406 104.390625 42.296875 C 104.390625 41.023438 104.515625 39.878906 104.765625 38.859375 C 105.023438 37.847656 105.28125 36.707031 105.53125 35.4375 C 108.320312 16.632812 110.289062 -2.351562 111.4375 -21.53125 C 112.582031 -40.707031 113.15625 -59.816406 113.15625 -78.859375 C 113.15625 -82.671875 113.023438 -88.320312 112.765625 -95.8125 C 112.515625 -103.3125 111.625 -110.804688 110.09375 -118.296875 C 108.570312 -125.785156 106.222656 -132.257812 103.046875 -137.71875 C 99.878906 -143.1875 95.375 -145.921875 89.53125 -145.921875 C 82.414062 -145.921875 75.554688 -143.953125 68.953125 -140.015625 C 62.347656 -136.078125 56.125 -130.929688 50.28125 -124.578125 C 44.445312 -118.234375 39.113281 -110.992188 34.28125 -102.859375 C 29.457031 -94.734375 25.332031 -86.414062 21.90625 -77.90625 C 18.476562 -69.394531 15.8125 -61.203125 13.90625 -53.328125 C 12 -45.460938 11.046875 -38.484375 11.046875 -32.390625 C 11.046875 -23.753906 12.757812 -17.398438 16.1875 -13.328125 C 19.613281 -9.265625 25.394531 -6.21875 33.53125 -4.1875 C 34.539062 -3.9375 35.300781 -3.742188 35.8125 -3.609375 C 36.320312 -3.484375 36.578125 -2.789062 36.578125 -1.53125 C 36.578125 -0.257812 36.066406 0.5 35.046875 0.75 C 34.035156 1.007812 33.148438 1.140625 32.390625 1.140625 C 30.859375 1.140625 29.140625 0.757812 27.234375 0 C 25.335938 -0.757812 23.753906 -1.394531 22.484375 -1.90625 C 15.367188 -5.457031 10.539062 -9.898438 8 -15.234375 C 5.457031 -20.566406 4.1875 -27.046875 4.1875 -34.671875 C 4.1875 -41.273438 5.265625 -48.703125 7.421875 -56.953125 C 9.585938 -65.210938 12.570312 -73.53125 16.375 -81.90625 C 20.1875 -90.289062 24.695312 -98.546875 29.90625 -106.671875 C 35.113281 -114.796875 40.890625 -121.96875 47.234375 -128.1875 C 53.585938 -134.414062 60.320312 -139.4375 67.4375 -143.25 C 74.550781 -147.0625 81.789062 -148.96875 89.15625 -148.96875 C 97.28125 -148.96875 103.5 -146.300781 107.8125 -140.96875 C 112.132812 -135.632812 115.3125 -129.21875 117.34375 -121.71875 C 119.375 -114.226562 120.578125 -106.421875 120.953125 -98.296875 C 121.335938 -90.171875 121.53125 -83.3125 121.53125 -77.71875 C 121.53125 -57.90625 120.382812 -38.285156 118.09375 -18.859375 C 115.8125 0.566406 113.65625 20.1875 111.625 40 C 117.21875 32.632812 122.613281 25.207031 127.8125 17.71875 C 133.019531 10.226562 138.289062 2.671875 143.625 -4.953125 L 164.578125 -35.4375 C 169.910156 -43.050781 175.242188 -50.601562 180.578125 -58.09375 C 185.921875 -65.59375 191.257812 -73.023438 196.59375 -80.390625 C 205.988281 -93.335938 214.429688 -106.285156 221.921875 -119.234375 C 229.410156 -132.191406 236.332031 -145.910156 242.6875 -160.390625 C 243.195312 -161.148438 243.640625 -161.972656 244.015625 -162.859375 C 244.398438 -163.753906 245.226562 -164.203125 246.5 -164.203125 C 247.769531 -164.203125 248.65625 -163.566406 249.15625 -162.296875 C 249.664062 -161.023438 249.921875 -159.882812 249.921875 -158.875 C 243.066406 -141.09375 234.492188 -124.265625 224.203125 -108.390625 C 213.921875 -92.515625 203.191406 -76.832031 192.015625 -61.34375 C 185.921875 -52.707031 179.507812 -44.257812 172.78125 -36 C 166.050781 -27.75 159.445312 -19.429688 152.96875 -11.046875 C 146.488281 -2.660156 140.203125 5.910156 134.109375 14.671875 C 128.015625 23.429688 122.425781 32.382812 117.34375 41.53125 Z M 117.34375 41.53125 " />
                            </g>
                            <g transform="translate(240.753184, 227.94978)">
                                <path className="signature-path-2" fill="#FFFFFF" style={{ clipPath: 'inset(0 100% 0 0)' }} d="M 14.859375 31.625 C 14.609375 33.144531 14.035156 35.875 13.140625 39.8125 C 12.253906 43.75 11.238281 47.8125 10.09375 52 C 8.945312 56.195312 7.800781 59.878906 6.65625 63.046875 C 5.519531 66.222656 4.570312 67.8125 3.8125 67.8125 C 2.03125 67.8125 1.140625 66.921875 1.140625 65.140625 C 1.140625 59.304688 1.898438 52.894531 3.421875 45.90625 C 4.953125 38.925781 6.734375 31.75 8.765625 24.375 C 10.796875 17.007812 12.890625 9.769531 15.046875 2.65625 C 17.203125 -4.445312 19.046875 -10.921875 20.578125 -16.765625 C 19.046875 -16.765625 17.707031 -17.332031 16.5625 -18.46875 C 15.425781 -19.613281 14.859375 -20.953125 14.859375 -22.484375 C 14.859375 -25.015625 16.128906 -26.976562 18.671875 -28.375 C 21.210938 -29.78125 23.367188 -30.988281 25.140625 -32 C 27.171875 -38.863281 29.898438 -47.753906 33.328125 -58.671875 C 36.765625 -69.585938 40.195312 -80.757812 43.625 -92.1875 C 47.050781 -103.625 50.035156 -114.613281 52.578125 -125.15625 C 55.117188 -135.695312 56.390625 -144.015625 56.390625 -150.109375 C 56.390625 -151.890625 56.132812 -154.046875 55.625 -156.578125 C 55.113281 -159.117188 53.585938 -160.390625 51.046875 -160.390625 C 45.210938 -160.390625 39.941406 -158.925781 35.234375 -156 C 30.535156 -153.082031 26.410156 -149.847656 22.859375 -146.296875 C 19.304688 -142.742188 16.382812 -139.503906 14.09375 -136.578125 C 11.8125 -133.660156 10.160156 -132.203125 9.140625 -132.203125 C 8.628906 -132.203125 8.25 -132.582031 8 -133.34375 C 7.75 -134.101562 7.625 -134.738281 7.625 -135.25 C 7.625 -138.039062 9.335938 -141.148438 12.765625 -144.578125 C 16.191406 -148.015625 20.316406 -151.128906 25.140625 -153.921875 C 29.972656 -156.710938 34.800781 -159.0625 39.625 -160.96875 C 44.445312 -162.875 48.128906 -163.828125 50.671875 -163.828125 C 52.953125 -163.828125 54.789062 -163.253906 56.1875 -162.109375 C 57.59375 -160.960938 58.613281 -159.5 59.25 -157.71875 C 59.882812 -155.945312 60.328125 -154.046875 60.578125 -152.015625 C 60.828125 -149.984375 60.953125 -148.078125 60.953125 -146.296875 C 60.953125 -138.679688 59.9375 -129.984375 57.90625 -120.203125 C 55.875 -110.421875 53.394531 -100.515625 50.46875 -90.484375 C 47.550781 -80.453125 44.441406 -70.609375 41.140625 -60.953125 C 37.835938 -51.304688 34.921875 -42.671875 32.390625 -35.046875 C 34.921875 -36.828125 39.363281 -40.191406 45.71875 -45.140625 C 52.070312 -50.097656 59.3125 -55.8125 67.4375 -62.28125 C 75.5625 -68.757812 84.128906 -75.617188 93.140625 -82.859375 C 102.160156 -90.097656 110.414062 -96.703125 117.90625 -102.671875 C 125.40625 -108.640625 131.757812 -113.59375 136.96875 -117.53125 C 142.175781 -121.46875 145.03125 -123.4375 145.53125 -123.4375 C 146.800781 -123.4375 147.4375 -122.675781 147.4375 -121.15625 C 147.4375 -120.132812 146.863281 -119.179688 145.71875 -118.296875 C 144.582031 -117.410156 143.757812 -116.710938 143.25 -116.203125 C 129.53125 -106.546875 116.257812 -96.445312 103.4375 -85.90625 C 90.613281 -75.363281 77.722656 -64.757812 64.765625 -54.09375 C 59.179688 -49.78125 53.722656 -45.460938 48.390625 -41.140625 C 43.054688 -36.828125 37.46875 -32.507812 31.625 -28.1875 L 29.328125 -20.1875 C 31.109375 -19.6875 34.09375 -18.546875 38.28125 -16.765625 C 42.476562 -14.984375 47.242188 -12.882812 52.578125 -10.46875 C 57.910156 -8.0625 63.429688 -5.457031 69.140625 -2.65625 C 74.859375 0.132812 80.066406 2.925781 84.765625 5.71875 C 89.460938 8.507812 93.332031 11.175781 96.375 13.71875 C 99.425781 16.257812 100.953125 18.414062 100.953125 20.1875 C 100.953125 21.71875 99.9375 22.484375 97.90625 22.484375 L 97.53125 22.09375 C 86.351562 12.695312 75.492188 5.015625 64.953125 -0.953125 C 54.410156 -6.921875 42.285156 -11.9375 28.578125 -16 C 26.035156 -8.125 23.617188 -0.25 21.328125 7.625 C 19.046875 15.5 16.890625 23.5 14.859375 31.625 Z M 14.859375 31.625 " />
                            </g>
                        </g>
                    </g>
                </svg>
            </div>

            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <div className="absolute inset-0 bg-black/40 z-10" />

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
