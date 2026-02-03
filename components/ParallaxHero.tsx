'use client';

import { useEffect, useState } from 'react';

export default function ParallaxHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-purple-900" />
        
        {/* Heading - moves VERY slowly up */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `translateY(-${scrollY * 0.15}px)` }}
        >
          <h1 className="text-6xl font-bold text-white">Your Name</h1>
        </div>
        
        {/* Black bar - moves faster up, catches the heading */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-black"
          style={{ transform: `translateY(-${scrollY * 0.5}px)` }}
        />
      </div>
    </div>
  );
}