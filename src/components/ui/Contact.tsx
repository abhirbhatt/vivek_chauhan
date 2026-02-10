'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Silk from '@/components/Silk';
import { BorderBeam } from '@/components/ui/BorderBeam';
import TubeLight from '@/components/ui/TubeLight';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial Entrance Animation (Triggers as it scrolls into view)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            });

            tl.fromTo(
                '.contact-part-1',
                { y: 250, x: -150, opacity: 0, filter: 'blur(20px)' },
                {
                    y: 0,
                    x: 0,
                    opacity: 0.8,
                    filter: 'blur(0px)',
                    duration: 1.5,
                    ease: 'expo.out'
                }
            )
                .fromTo(
                    '.contact-part-2',
                    { y: 200, x: 150, opacity: 0, filter: 'blur(25px)' },
                    {
                        y: 0,
                        x: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 1.6,
                        ease: 'expo.out'
                    },
                    '-=1.2'
                )
                .fromTo(
                    buttonRef.current,
                    { y: 150, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'expo.out'
                    },
                    '-=1.0'
                )
                .fromTo(
                    '.contact-tagline',
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'expo.out'
                    },
                    '-=1.0'
                );

            // 3. Multi-layered Parallax Scrub (Starts ONLY after section sticks)
            gsap.to('.contact-part-1', {
                y: '-100px',
                ease: 'none',
                overwrite: 'auto',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    immediateRender: false
                }
            });

            gsap.to('.contact-part-2', {
                y: '-200px',
                ease: 'none',
                overwrite: 'auto',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    immediateRender: false
                }
            });

            gsap.to(buttonRef.current, {
                y: '-280px',
                ease: 'none',
                overwrite: 'auto',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    immediateRender: false
                }
            });

            gsap.to('.contact-tagline', {
                y: '-340px',
                ease: 'none',
                overwrite: 'auto',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    immediateRender: false
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            id="contact"
            className="w-full min-h-screen pt-10 pb-32 md:pb-48 px-6 flex flex-col items-center justify-start text-center overflow-hidden relative z-50"
            style={{ backgroundColor: '#000000' }}
        >
            <TubeLight />
            <BorderBeam size={400} duration={12} delay={0} colorTo="white" />

            {/* Silk Background */}
            <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
                <Silk
                    speed={1.5}
                    scale={0.6}
                    color="#634f7a"
                    noiseIntensity={0.6}
                    rotation={0}
                />
            </div>
            <div className="contact-content-wrapper relative z-10 w-full flex flex-col items-center mt-4">
                <h2
                    ref={headingRef}
                    className="relative text-white tracking-tighter mb-12 max-w-7xl flex flex-col gap-4 md:gap-7"
                >
                    <span className="contact-part-1 block text-[1.25rem] md:text-[2rem] lg:text-[2.25rem] tracking-tight font-bold text-[#d5dbe6]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                        LET'S CREATE YOUR
                    </span>
                    <span className="contact-part-2 block text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] tracking-widest" style={{ fontFamily: 'var(--font-cursive)', fontWeight: 400, textTransform: 'none' }}>
                        Next Masterpiece
                    </span>
                </h2>

                <div ref={buttonRef} className="relative mt-20">
                    <Link
                        href="/contact"
                        className="group relative inline-flex items-center justify-center px-10 py-6 text-xl bg-white text-black rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        <span className="relative z-10 font-bold tracking-tight mr-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>Book an Appointment</span>
                        <ArrowRight className="relative z-10 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                        <div className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out -z-0" />
                    </Link>
                </div>

                <div className="contact-tagline mt-12 text-white/70 text-xl md:text-2xl relative" style={{ fontFamily: 'var(--font-cursive)', letterSpacing: '2px' }}>
                    Available for freelance & collaborations
                </div>
            </div>
        </section>
    );
}
