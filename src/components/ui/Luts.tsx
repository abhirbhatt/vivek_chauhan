'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Luts() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Content Slide In
            gsap.fromTo(
                contentRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    }
                }
            );

            // Video Fade In
            gsap.fromTo(
                videoRef.current,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    delay: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="services"
            className="w-full py-24 md:py-32 px-6 md:px-12 bg-background-primary border-t border-white/5"
        >
            <div className="flex flex-col-reverse md:flex-row md:items-center gap-12 md:gap-20">

                {/* Text Content */}
                <div ref={contentRef} className="w-full md:w-5/12 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                            LUT PACK V1
                        </h2>
                        <h3 className="text-xl md:text-2xl text-gray-400 font-light">
                            Free now. Free forever.
                        </h3>
                        <p className="text-gray-500 leading-relaxed max-w-sm">
                            Professional color grading preset used in my commercial works.
                            Designed for LOG footage to give a clean, cinematic Teal & Orange look.
                        </p>
                    </div>

                    <Link
                        href="#"
                        className="inline-block px-8 py-4 border border-white text-white font-medium hover:bg-white hover:text-black transition-all duration-300"
                    >
                        DOWNLOAD NOW
                    </Link>
                </div>

                {/* Video Preview */}
                <div ref={videoRef} className="w-full md:w-7/12">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-zinc-900 border border-white/10 group">
                        <div className="absolute inset-0 bg-black/20 z-10" />
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                            poster="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop"
                        >
                            <source
                                src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4"
                                type="video/mp4"
                            />
                        </video>

                        {/* Badge */}
                        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-white border border-white/20">
                            FREE ASSET
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
