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
        videoSrc: '/media/1.mp4',
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
        <div className="group relative w-full aspect-[21/7.8] md:aspect-[21/6.2] overflow-hidden bg-[#000]">
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
                    willChange: 'transform',
                    opacity: 0.9
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

    return (
        <section
            ref={sectionRef}
            id="works"
            className="w-full flex flex-col relative z-50 -mt-[31vh]"
            style={{ backgroundColor: '#000000' }}
        >
            {projects.map((project) => (
                <VideoRow key={project.id} project={project} />
            ))}
        </section>
    );
}
