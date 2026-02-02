import Hero from "@/components/ui/Hero";
import Mission from "@/components/ui/Mission";
import TrustedBy from "@/components/ui/TrustedBy";
import Works from "@/components/ui/Works";
import Luts from "@/components/ui/Luts";
import Contact from "@/components/ui/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-background-primary text-text-primary">
      <Hero />
      <Mission />
      <TrustedBy />
      <Works />
      <Luts />
      <Contact />
      <Footer />
    </main>
  );
}
