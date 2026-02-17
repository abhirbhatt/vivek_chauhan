'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmartVideo from './SmartVideo';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: string;
    title: string;
    category: string;
    videoSrc: string;
    imageSrc: string;
    href: string;
}

const projects: Project[] = [
    {
        id: '01',
        title: 'NORDICA',
        category: 'Brand Film',
        videoSrc: 'https://videos.pexels.com/video-files/3752533/3752533-hd_1920_1080_25fps.mp4',
        imageSrc: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1000&auto=format&fit=crop',
        href: '/works/nordica'
    },
    {
        id: '02',
        title: 'RITZ CARLTON',
        category: 'Luxury Hotel',
        videoSrc: 'https://videos.pexels.com/video-files/3205917/3205917-hd_1920_1080_25fps.mp4',
        imageSrc: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
        href: '/works/ritz-carlton'
    },
    {
        id: '03',
        title: 'THE GREAT RIDE',
        category: 'Adventure',
        videoSrc: 'https://videos.pexels.com/video-files/4625515/4625515-hd_1920_1080_30fps.mp4',
        imageSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop',
        href: '/works/the-great-ride'
    },
    {
        id: '04',
        title: "WARSAW '25",
        category: 'Travel',
        videoSrc: 'https://videos.pexels.com/video-files/2869752/2869752-hd_1920_1080_24fps.mp4',
        imageSrc: 'https://images.unsplash.com/photo-1581791534721-e599df4417c7?q=80&w=1000&auto=format&fit=crop',
        href: '/works/warsaw'
    },
    {
        id: '05',
        title: 'DOLOMITES X ZOHO',
        category: 'Corporate',
        videoSrc: 'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4',
        imageSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop',
        href: '/works/dolomites'
    },
    {
        id: '06',
        title: "INDONESIA '24",
        category: 'Documentary',
        videoSrc: 'https://videos.pexels.com/video-files/5045479/5045479-hd_1920_1080_25fps.mp4',
        imageSrc: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop',
        href: '/works/indonesia-24'
    },
    {
        id: '07',
        title: 'SILENA, YOUR SOULFUL HOTEL',
        category: 'Hospitality',
        videoSrc: 'https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4',
        imageSrc: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000&auto=format&fit=crop',
        href: '/works/silena'
    }
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMouseEnter = () => {
        setIsPlaying(true);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => { });
        }
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <Link
            href={project.href}
            className="block group w-full"
            ref={cardRef}
        >
            <div
                className="relative aspect-[16/8.64] w-full overflow-hidden rounded-lg bg-zinc-900 mb-4 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className={cn(
                        "absolute inset-0 z-10 transition-opacity duration-500",
                        isPlaying ? "opacity-0" : "opacity-100"
                    )}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={project.imageSrc}
                            alt={`${project.title} - cinematography by Vivek Singh Chauhan Delhi`}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={80}
                        />
                    </div>
                </div>

                <SmartVideo
                    ref={videoRef}
                    src={project.videoSrc}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 z-20 transition-colors" />
            </div>

            <div className="flex justify-between items-end px-1 project-info opacity-0 translate-y-4">
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-gray-200 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-gray-500">{project.category}</p>
                </div>
                <span className="text-xs font-mono text-gray-600 border border-gray-800 rounded-full px-3 py-1">
                    {project.id}
                </span>
            </div>
        </Link>
    );
}

export default function Works() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<Element>('.project-card-container');

            ScrollTrigger.batch(cards, {
                onEnter: (batch: Element[]) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power3.out'
                    });

                    batch.forEach((card: any) => {
                        gsap.to(card.querySelectorAll('.project-info'), {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            delay: 0.3
                        });
                    });
                },
                start: 'top 85%',
                once: true
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="selected-works" className="w-full py-24 md:py-32 px-6 md:px-12 bg-background-primary z-10 relative overflow-hidden">


            {/* Visually Hidden H2 for SEO */}
            <h2 className="sr-only">Cinematic Wedding Films | Music Videos | Brand Commercials</h2>

            <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6 relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                    SELECTED<br />WORKS
                </h2>
                <p className="text-gray-500 text-sm md:text-base mt-4 md:mt-0 max-w-xs text-right">
                    A collection of cinematic moments and visual storytelling.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24 relative z-10">
                {projects.map((project, idx) => (
                    <div key={project.id} className="project-card-container opacity-0 translate-y-12">
                        <ProjectCard project={project} index={idx} />
                    </div>
                ))}
            </div>

            <div className="mt-24 flex justify-center relative z-10">
                <Link
                    href="/works"
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-transparent px-8 font-medium text-white transition-all duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                >
                    <span className="mr-2">View All Projects</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
            </div>
        </section>
    );
}
