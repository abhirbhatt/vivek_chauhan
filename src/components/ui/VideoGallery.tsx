'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from './ScrollFloat';
import SmartVideo from './SmartVideo';



gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: string;
    title: string;
    videoSrc: string;
    mobileSrc?: string;
    imageSrc: string;
    href: string;
}

const projects: Project[] = [
    {
        id: '01',
        title: 'Dramatic Essence',
        videoSrc: '/assets/DRAMATIC(1)high.mp4',
        mobileSrc: '/media/Dramaticsmall_box.mp4',
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
        mobileSrc: '/media/1small_box.mp4',
        imageSrc: 'https://images.unsplash.com/photo-1492691523567-6170d0275df1?w=800&h=600&fit=crop',
        href: '/works/atmospheric-moments'
    }
];

function VideoRow({ project }: { project: Project }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // 🔹 Video Play/Pause Intersection Logic
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(() => { });
                        }
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.01 }
        );

        observer.observe(video);

        // 🔹 Subtle Smooth Parallax for the Video
        const ctx = gsap.context(() => {
            gsap.fromTo(video,
                { yPercent: -8 },
                {
                    yPercent: 8,
                    ease: "none",
                    scrollTrigger: {
                        trigger: video,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2,
                    }
                }
            );
        });

        return () => {
            observer.unobserve(video);
            video.pause();
            ctx.revert();
        };
    }, []);

    return (
        <div className="group relative w-full aspect-[22/16] md:aspect-[21/5.95] overflow-hidden bg-black">
            {/* Video Player - Performance Optimized */}
            <SmartVideo
                ref={videoRef}
                src={project.videoSrc}
                mobileSrc={project.mobileSrc}
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    imageRendering: '-webkit-optimize-contrast',
                    transform: 'translateZ(0)',
                    padding: 0,
                    margin: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 1,
                    scale: project.id === '01' ? 1.05 : 1
                }}
            />

            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[5]" />

            {/* Content Overlay (Split Top/Bottom) */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 z-10 pointer-events-none">
                {/* Top Section: Title */}
                <div className="mt-[3px]">
                    <h3 className="text-1xl md:text-[31px] font-bold text-white tracking-wider uppercase leading-none mt-5" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                        {project.title}
                    </h3>
                </div>

                {/* Bottom Section: Space reserved */}
                <div className="mb-1">
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
            className="w-full flex  flex-col relative z-50 overflow-hidden"
            style={{ backgroundColor: '#131212ff', margin: 0, padding: 0 }}
        >
            <div className="w-full flex items-center justify-center min-h-[6vh] md:min-h-[40vh] pt-14 pb-0 md:py-12">
                <ScrollFloat
                    animationDuration={1}
                    ease='back.inOut(2)'
                    scrollStart='bottom 95%'
                    scrollEnd='center 40%'
                    stagger={0.04}
                    textClassName="text-[2.2rem] md:text-[6rem] lg:text-[7.8rem] font-black text-[#d5dbe6] tracking-tight leading-none"
                    containerClassName="font-sans"
                >
                    Captured Moments
                </ScrollFloat>
            </div>

            {/* Movable Wrapper for independent positioning */}
            <div className="gallery-movable-wrapper w-full">
                <div ref={containerRef} className="w-full flex flex-col gap-0">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="relative -mt-[1px] md:mt-0 first:mt-0"
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
