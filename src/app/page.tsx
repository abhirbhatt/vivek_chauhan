'use client';

import dynamic from 'next/dynamic';
import Hero from "@/components/ui/Hero";

const Mission = dynamic(() => import("@/components/ui/Mission"), { ssr: false });
const VideoGallery = dynamic(() => import("@/components/ui/VideoGallery"), { ssr: false });
const Contact = dynamic(() => import("@/components/ui/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/ui/Footer"), { ssr: false });

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-background-primary text-text-primary">
      <Hero />
      <div className="mt-[100vh]">
        <Mission />
        <VideoGallery />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
