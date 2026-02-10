'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Instagram, Youtube, ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LightRays from '@/components/LightRays';
import TubeLight from '@/components/ui/TubeLight';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const [currentYear, setCurrentYear] = useState(2026);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.from('.footer-brand-icons', {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            })
                .from('.footer-contact-cta', {
                    y: 50,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power3.out'
                }, '-=0.6')
                .from('.footer-tagline', {
                    y: 20,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.8')
                .from('.footer-bottom-row', {
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power2.out'
                }, '-=0.5');

            // 2. Sticky Pinning Effect (Footer locks at top)
            ScrollTrigger.create({
                trigger: footerRef.current,
                start: 'top top',
                pin: true,
                pinSpacing: false,
                anticipatePin: 1
            });

        }, footerRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            ref={footerRef}
            className="w-full min-h-screen pt-32 pb-12 px-6 md:px-12 relative z-[60] border-t border-white/5 flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: '#000000' }}
        >
            <TubeLight />
            {/* Light Rays Background - Refined Subtlety */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.45]">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={1.0}
                    lightSpread={0.5}
                    rayLength={3.5}
                    followMouse={true}
                    mouseInfluence={0.4}
                    noiseAmount={0.03}
                    distortion={0.08}
                    className="custom-rays"
                    pulsating={true}
                    fadeDistance={1.1}
                    saturation={1.1}
                />
            </div>
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

                {/* Brand Logo/Icons */}
                <div className="footer-brand-icons mb-12 flex items-center gap-6">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-300">
                        <Instagram size={28} strokeWidth={1.5} />
                    </a>
                    <div className="w-px h-6 bg-white/10" />
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-300">
                        <Youtube size={28} strokeWidth={1.5} />
                    </a>
                </div>

                {/* Main Contact CTA */}
                <div className="footer-contact-cta mb-20">
                    <div className="mb-4">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-[#d5dbe6]/40 font-bold" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>Vivek Chauhan</span>
                    </div>
                    <h2
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-none text-[#d5dbe6]"
                    >
                        <span style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>GET IN </span>
                        <span style={{ fontFamily: 'var(--font-cursive)', fontWeight: 300, textTransform: 'none', marginLeft: '-15px' }}>Touch</span>
                    </h2>
                    <Link
                        href="/contact"
                        className="text-lg md:text-xl text-gray-400 hover:text-white transition-colors duration-300 border-b border-gray-800 pb-2 lowercase tracking-wide"
                        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                    >
                        hello@afilmcraft.com
                    </Link>
                </div>

                <div className="footer-tagline mb-20">
                    <p className="text-xl md:text-2xl text-white/40" style={{ fontFamily: 'var(--font-cursive)', textTransform: 'none', letterSpacing: '4px' }}>
                        A Film Craft by Sonty
                    </p>
                </div>

                {/* Bottom Row */}
                <div className="footer-bottom-row w-full pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-[10px] md:text-xs text-[#d5dbe6]/30 uppercase tracking-widest order-2 md:order-1" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                        &copy; {currentYear} VIVEK CHAUHAN
                    </div>

                    {/* Scroll to Top */}
                    <button
                        onClick={scrollToTop}
                        className="group flex flex-col items-center gap-2 order-1 md:order-2"
                    >
                        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-white -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 group-hover:text-white transition-colors">
                            Scroll to Top
                        </span>
                    </button>

                    <div className="flex items-center gap-6 order-3">
                        <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                            Terms of Use
                        </Link>
                        <div className="text-sm text-zinc-600 ml-4" style={{ fontFamily: 'var(--font-cursive)', letterSpacing: '2px' }}>
                            Filmcraft by Sonty
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
