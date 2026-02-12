'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { BorderBeam } from '@/components/ui/BorderBeam';

gsap.registerPlugin(ScrollTrigger);



const brandLogos = [
    { name: "Canon", src: "https://upload.wikimedia.org/wikipedia/commons/0/07/Canon_logo.svg" },
    { name: "Sony", src: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Sony_logo.svg" },
    { name: "Google", src: "/logos/google.svg" },
    { name: "Amazon", src: "/logos/amazon.svg" },
    { name: "Apple", src: "/logos/apple.svg" },
    { name: "Meta", src: "/logos/meta.svg" },
    { name: "Red", src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Red_Digital_Cinema_logo.svg" },
    { name: "Arri", src: "https://upload.wikimedia.org/wikipedia/commons/1/18/ARRI_Logo.svg" },
    { name: "Netflix", src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Adobe", src: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg" }
];

export default function Mission() {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate noise texture - Retro TV Static Effect
            gsap.to('.mission-noise-texture', {
                duration: 0.05,
                repeat: -1,
                onRepeat: () => {
                    gsap.set('.mission-noise-texture', {
                        x: Math.random() * 20 - 10 + '%',
                        y: Math.random() * 10 - 5 + '%',
                    });
                },
                ease: "none",
            });

            // Shadow reveal animation on scroll
            gsap.fromTo(containerRef.current,
                {
                    // Initial state (Shadow invisible)
                    boxShadow: '1px 0px 0px 0px rgba(13, 12, 14, 0)',
                    WebkitBoxShadow: '1px 0px 0px 0px rgba(13, 12, 14, 0)'
                },
                {
                    // Final state (Aapka provided shadow)
                    boxShadow: '1px -12px 22px 25px #0d0c0eff',
                    WebkitBoxShadow: '1px -12px 22px 25px #0c0d0fff',
                    duration: 0.1,
                    borderTop: '1px solid #0d0c0e8c',

                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 99.9%", // Jab section screen mein enter kare
                        scrub: false,
                        toggleActions: "play none none reverse",      // Scroll speed ke saath shadow match karegi
                    }
                }
            );

            // Synchronized Line-by-Line Reveal
            const revealTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",  // Section thoda pehle shuru ho
                    end: "top 20%",    // Reveal ko jaldi khatam kiya
                    scrub: 1.2,        // Faster reaction to scroll
                }
            });

            // Har line ki images ko sequence mein reveal karenge
            revealTl.to('.mission-img-span', {
                width: 'clamp(180px, 26vw, 450px)',
                stagger: 0.2, // Decreased to make it snappier
                duration: 1.2, // Decreased duration
                ease: "power2.out"
            });

            // Marquee Animation
            const content = marqueeRef.current?.querySelector('.marquee-content');
            if (content && marqueeRef.current) {
                const clone = content.cloneNode(true) as HTMLElement;
                clone.classList.add('marquee-clone');
                marqueeRef.current.appendChild(clone);

                // Reverse Scroll Animation (Left to Right)
                const children = Array.from(marqueeRef.current.children);
                gsap.fromTo(children,
                    { xPercent: -100 },
                    {
                        xPercent: 0,
                        repeat: -1,
                        duration: 25,
                        ease: "linear",
                    }
                );
            }

            // Text Lines reveal on scroll with dramatic entrance
            gsap.from('.mission-text-line', {
                y: 250,
                x: -100,
                opacity: 0,
                rotateX: 50,
                transformOrigin: "top left",
                duration: 1.8,
                stagger: 0.15,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            });

            // TOP PARALLAX ONLY: 5x speed at the beginning, then normal scroll
            gsap.to(containerRef.current, {
                y: '-400px', // Reduced movement for 5x speed
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 90%',
                    end: 'top 50%',
                    scrub: true,
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Split content into lines for the reveal effect
    const lines = [
        ['I Capture', 'image-1', 'moments'],
        ['And turn ', 'image-2', 'them '],
        [' Into cinematic', 'image-3',],
        ['Stories', 'image-4', 'that'],
        ['image-5', 'Breathe.']
    ];

    const images = [
        "/media/Dramaticsmall_box.mp4",
        "/media/1small_box.mp4",
        "/media/Bgimgsmall_box.mp4",
        "/media/Dramaticsmall_box.mp4",
        "/media/New2.mp4"
    ];

    return (
        <section
            ref={containerRef}
            id="about"
            className="w-full pt-10 pb-[calc(40px+15vh)] px-6 md:px-12 flex flex-col justify-center items-center relative overflow-hidden z-50 mt-[100vh]"
            style={{
                background: 'radial-gradient(circle at center, #000002ff 0%, #0b0d11 100%)',
            }}
        >
            {/* Animated Noise Texture Background */}
            <div
                className="absolute mission-noise-texture"
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


            <div className="max-w-none w-full flex flex-col items-center gap-4 md:gap-8 relative z-10 select-none mb-4">
                {lines.map((line, lineIdx) => (
                    <div key={lineIdx} className="mission-text-line flex flex-wrap items-center justify-center gap-x-4 md:gap-x-12 gap-y-2">
                        {line.map((item, itemIdx) => {
                            if (item.startsWith('image')) {
                                const imgIdx = parseInt(item.split('-')[1]) - 1;
                                const mediaSrc = images[imgIdx];
                                const isVideo = mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.mov');

                                return (
                                    <div
                                        key={itemIdx}
                                        className="mission-img-span h-[80px] md:h-[160px] w-0 bg-white/10 rounded-lg overflow-hidden relative shadow-2xl"
                                        style={{ willChange: 'width' }}
                                    >
                                        <BorderBeam size={200} duration={4} colorTo="white" borderWidth={1} />
                                        {isVideo ? (
                                            <video
                                                src={mediaSrc}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                preload="metadata"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <Image
                                                src={mediaSrc}
                                                alt="Reveal"
                                                fill
                                                className="object-cover"
                                                sizes="300px"
                                                quality={80}
                                            />
                                        )}
                                    </div>
                                );
                            }
                            return (
                                <span
                                    key={itemIdx}
                                    className="text-[2.2rem] md:text-[5.3rem] lg:text-[5.5rem] font-bold tracking-tight text-[#d5dbe6] leading-[1.9]"
                                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                                >
                                    {item}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Trusted By Section - Integrated */}
            <div className="w-full relative z-10 mt-[160px] mb-[80px]">
                <div className="text-center mb-2">
                    <span className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase">
                        Trusted By
                    </span>
                </div>

                <div
                    ref={marqueeRef}
                    className="w-full relative flex whitespace-nowrap overflow-hidden"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 40%, black 60%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%, black 60%, transparent)',
                    }}
                >
                    <div className="marquee-content flex items-center space-x-24 md:space-x-48 px-8">
                        {brandLogos.map((brand, index) => (
                            <div key={index} className="flex-shrink-0 group">
                                <img
                                    src={brand.src}
                                    alt={brand.name}
                                    className="w-[80px] md:w-[110px] h-auto grayscale brightness-[0.4] opacity-80 group-hover:brightness-[0.8] group-hover:scale-110 transition-all duration-300 pointer-events-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
