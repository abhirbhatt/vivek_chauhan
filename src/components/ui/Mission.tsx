'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Mission() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Individual ScrollTriggers for each line's image - matching your provided code's logic
            gsap.utils.toArray<HTMLElement>('.mission-text-line').forEach((line) => {
                const imgSpan = line.querySelector('.mission-img-span');
                if (imgSpan) {
                    gsap.to(imgSpan, {
                        width: 'clamp(120px, 20vw, 450px)',
                        ease: "none",
                        scrollTrigger: {
                            trigger: line,
                            start: "top 90%",
                            end: "top 40%",
                            scrub: 1.5, // Smooth response to scroll
                        }
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Split content into lines for the reveal effect
    const lines = [
        ['I Capture', 'image-1', 'moments'],
        ['And turn ', 'image-2', 'them '],
        [' Into', 'image-3', 'cinematic'],
        ['Stories', 'image-4', 'that'],
        ['image-5', 'Breathe.']
    ];

    const images = [
        "/media/Dramaticsmall_box.mp4",
        "/media/1small_box.mp4",
        "/media/Bgimgsmall_box.mp4",
        "/media/Dramaticsmall_box.mp4",
        "/media/Video Project 1.mp4"
    ];

    return (
        <section
            ref={containerRef}
            id="about"
            className="w-full pt-32 pb-32 px-6 md:px-12 flex flex-col justify-center items-center relative overflow-hidden z-50"
            style={{
                background: 'radial-gradient(circle at center, #000002ff 0%, #0b0d11 100%)',
                boxShadow: '1px -12px 22px 25px #0d0c0eff, 1px 12px 22px 25px #0d0c0eff',
                WebkitBoxShadow: '1px -12px 22px 25px #0c0d0fff, 1px 12px 22px 25px #0c0d0fff',
                borderTop: '1px solid #0d0c0e8c',
                borderBottom: '1px solid #0d0c0e8c'
            }}
        >
            {/* Visually Hidden H2 for SEO */}
            <h2 className="sr-only">Professional Cinematography, Videography, Editing & Color Grading Services by Vivek Singh Chauhan</h2>
            {/* STATIC Noise Texture Background (No Performance-Heavy Animation) */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: 'url(https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png)',
                    backgroundSize: '140px 140px',
                    backgroundRepeat: 'repeat',
                    opacity: 0.05,
                    mixBlendMode: 'normal',
                    filter: 'contrast(150%) brightness(80%)',
                }}
            />


            <div className="max-w-none w-full flex flex-col items-center gap-2 md:gap-8 relative z-10 select-none mb-4">
                {lines.map((line, lineIdx) => (
                    <div key={lineIdx} className="mission-text-line flex flex-wrap items-center justify-center gap-x-3 md:gap-x-12 gap-y-1">
                        {line.map((item, itemIdx) => {
                            if (item.startsWith('image')) {
                                const imgIdx = parseInt(item.split('-')[1]) - 1;
                                const mediaSrc = images[imgIdx];
                                const isVideo = mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.mov');

                                return (
                                    <div
                                        key={itemIdx}
                                        className="mission-img-span h-[50px] md:h-[154px] w-0 bg-white/10 rounded-lg overflow-hidden relative shadow-2xl mx-1 md:mx-0"
                                        style={{ willChange: 'width' }}
                                    >
                                        {isVideo ? (
                                            <MissionVideo src={mediaSrc} />
                                        ) : (
                                            <Image
                                                src={mediaSrc}
                                                alt="Cinematic filmmaking by Vivek Singh Chauhan"
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
                                    className="text-[3.4rem] sm:text-[2.2rem] md:text-[5.3rem] lg:text-[5.5rem] font-bold tracking-tight text-[#d5dbe6] leading-tight md:leading-[1.9]"
                                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                                >
                                    {item}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>

        </section>
    );
}

function MissionVideo({ src }: { src: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                video.play().catch(() => { });
            } else {
                video.pause();
            }
        }, { threshold: 0.1 });

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <video
            ref={videoRef}
            src={src}
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
        />
    );
}
