import Hero from "@/components/ui/Hero";
import Mission from "@/components/ui/Mission";
import VideoGallery from "@/components/ui/VideoGallery";

import Contact from "@/components/ui/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-background-primary text-text-primary">
      <Hero />
      <Mission />

      <VideoGallery />

      <Contact />
      <Footer />
    </main>
  );
}
