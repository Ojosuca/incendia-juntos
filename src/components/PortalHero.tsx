import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/CONF-INCENDS-26.webp";

interface PortalHeroProps {
  className?: string;
}

const PortalHero = ({ className }: PortalHeroProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Unique scroll effect: reveal/fade based on scroll
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        // Calculate scroll progress (0 to 1) within hero section
        const progress = Math.min(scrollY / (windowHeight * 0.7), 1);
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-screen overflow-hidden ${className || ""}`}
    >
      {/* Background Image with Unique Reveal Animation */}
      <div
        className="absolute inset-0 w-full h-full hero-reveal will-change-transform"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // Show complete image, centered
          backgroundPosition: "center center",
          // Unique scroll effect: subtle scale down as user scrolls
          transform: `scale(${1 + scrollProgress * 0.1})`,
          opacity: 1 - scrollProgress * 0.3,
        }}
      >
        {/* Gradient Overlay - Bottom fade to background */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Vignette effect for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Content Container - Properly centered */}
      <div
        className="relative z-10 w-full h-full flex flex-col items-center justify-end px-4"
        style={{
          paddingBottom: "clamp(6rem, 15vh, 10rem)",
        }}
      >
        {/* Tagline */}
        <p
          className="text-white/90 text-sm md:text-base font-sans uppercase tracking-[0.3em] mb-4 hero-text-reveal"
          style={{
            opacity: 1 - scrollProgress * 2,
            transform: `translateY(${scrollProgress * -20}px)`,
          }}
        >
          Conferência Incends 2026
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className="bg-gradient-fire hover:opacity-90 text-white font-sans font-bold text-base md:text-lg px-10 py-7 rounded-full cta-glow-pulse transform hover:scale-105 transition-transform duration-200 hero-cta-reveal"
          style={{
            opacity: 1 - scrollProgress * 1.5,
            transform: `translateY(${scrollProgress * -30}px) scale(${1 - scrollProgress * 0.1})`,
          }}
          onClick={() => {
            window.open("https://www.sympla.com.br/evento/conf-incends-26/3242784?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnzIhNIBSzK2ioFY4-mdY9ArpLVHAzNCKEogUOtCuLhRdE-R5fJgXS26oCXWk_aem_Fnv9_oyX4DAPwiPDSSJuKw&referrer=l.instagram.com&referrer=l.instagram.com", "_blank");
          }}
        >
          INSCREVA-SE AQUI
          <ArrowRight className="ml-3 w-5 h-5" />
        </Button>
      </div>

      {/* Scroll Indicator - Fixed at bottom center */}
      <div
        className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none"
        style={{
          opacity: 1 - scrollProgress * 3,
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <ChevronDown className="w-6 h-6 text-white/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default PortalHero;
