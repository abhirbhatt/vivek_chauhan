'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: string;
    title: string;
    videoSrc: string;
    imageSrc: string;
    href: string;
}

const projects: Project[] = [
    {
        id: '01',
        title: 'Dramatic Essence',
        videoSrc: '/assets/DRAMATIC(1)high.mp4',
        imageSrc: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&h=600&fit=crop',
        href: '/works/dramatic-essence'
    },
    {
        id: '02',
        title: 'Cinematic Journey',
        videoSrc: '/media/Video Project 1.mp4',
        imageSrc: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
        href: '/works/cinematic-journey'
    },
    {
        id: '03',
        title: 'Visual Story',
        videoSrc: '/assets/videos/Chek.mp4',
        imageSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        href: '/works/visual-story'
    },
    {
        id: '04',
        title: "Experimental Mood",
        videoSrc: '/media/Web2.mp4',
        imageSrc: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&h=600&fit=crop',
        href: '/works/experimental-mood'
    },
    {
        id: '05',
        title: 'Atmospheric Moments',
        videoSrc: '/media/1.mp4',
        imageSrc: 'https://images.unsplash.com/photo-1492691523567-6170d0275df1?w=800&h=600&fit=crop',
        href: '/works/atmospheric-moments'
    }
];

function VideoRow({ project }: { project: Project }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoRef.current?.play().catch(() => { });
                    } else {
                        videoRef.current?.pause();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <div className="group relative w-full aspect-[21/7.48] md:aspect-[21/5.95] overflow-hidden bg-[#000]">
            {/* Video Player - Performance Optimized */}
            <video
                ref={videoRef}
                src={project.videoSrc}
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    imageRendering: '-webkit-optimize-contrast',
                    transform: 'translateZ(0)',
                    padding: 0,
                    margin: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 1,
                    // Ensure the first video is definitely wide enough
                    scale: project.id === '01' ? 1.05 : 1
                }}
            />

            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[5]" />

            {/* Content Overlay (Split Top/Bottom) */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 z-10 pointer-events-none">
                {/* Top Section: Title */}
                <div className="mt-[3px]">
                    <h3 className="font-bold text-white tracking-tight uppercase leading-none" style={{ fontSize: '1.75rem', fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                        {project.title}
                    </h3>
                </div>

                {/* Bottom Section: View Project */}
                <div className="mb-1">
                    <Link
                        href={project.href}
                        className="flex items-center gap-3 pointer-events-auto group"
                    >
                        <span className="text-xs font-mono text-white/40 border border-white/20 rounded-full px-3 py-1">
                            {project.id}
                        </span>
                        <p className="text-xs md:text-sm font-medium text-white/70 tracking-[0.2em] transition-all group-hover:text-white">
                            VIEW PROJECT —
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function VideoGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Internal Parallax removed to keep content stable inside the movable wrapper
            /*
            gsap.fromTo(containerRef.current,
                { y: 100 },
                {
                    y: -100,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5,
                    }
                }
            );
            */
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="works"
            className="w-full flex flex-col relative z-50 overflow-hidden"
            style={{ backgroundColor: '#000000', margin: 0, padding: 0 }}
        >
            {/* Movable Wrapper for independent positioning */}
            <div className="gallery-movable-wrapper w-full pt-[-129px]">
                <div ref={containerRef} className="w-full flex flex-col">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="relative"
                            style={{ zIndex: projects.length - index }}
                        >
                            <VideoRow project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
