import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/audicaoincendsweb1.webp";
import mobileHeroBg from "@/assets/audicaoincendsmobile1.webp";

interface PortalHeroProps {
  className?: string;
}

const AUDITION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfqCZBhTViTOHyIgHqLbwOh9zrVIhfo9uhI-z5v-9BNaO2ANw/viewform";

const PortalHero = ({ className }: PortalHeroProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
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
      className={`relative w-full min-h-screen flex flex-col items-center justify-start md:justify-center bg-background overflow-hidden ${className || ""}`}
      style={{ paddingTop: "clamp(4.5rem, 8vh, 7rem)" }}
    >
      {/* Ambient glow behind the card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 1 - scrollProgress * 0.5 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Banner Card Container */}
      <div
        className="relative z-10 w-full md:max-w-fit max-w-5xl mx-auto px-4 md:px-8"
        style={{
          transform: `translateY(${scrollProgress * -40}px) scale(${1 - scrollProgress * 0.05})`,
          opacity: 1 - scrollProgress * 0.4,
        }}
      >
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
          {/* Desktop Banner */}
          <img
            src={heroBg}
            alt="Audições Banda Incendiados — Instrumentistas e Cantores"
            className="hidden md:block w-auto max-h-[65vh] object-cover"
            loading="eager"
          />
          {/* Mobile Banner */}
          <img
            src={mobileHeroBg}
            alt="Audições Banda Incendiados — Instrumentistas e Cantores"
            className="block md:hidden w-full h-auto object-cover"
            loading="eager"
          />

          {/* Subtle inner vignette for depth */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />

          {/* Hover glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* CTA below the card */}
      <div
        className="relative z-10 mt-4 md:mt-10 flex flex-col items-center gap-2 md:gap-4"
        style={{
          opacity: typeof window !== "undefined" && window.innerWidth >= 768 ? 1 - scrollProgress * 1.5 : 1,
          transform: typeof window !== "undefined" && window.innerWidth >= 768 ? `translateY(${scrollProgress * -20}px)` : "none",
        }}
      >
        <p className="text-muted-foreground text-xs md:text-base font-sans uppercase tracking-[0.15em] md:tracking-[0.25em] text-center hero-text-reveal">
          Inscrições até 01/04<span className="hidden md:inline"> · </span><br className="md:hidden" />Audições 07 de Abril
        </p>

        <Button
          size="lg"
          className="bg-gradient-fire hover:opacity-90 text-white font-sans font-bold text-sm md:text-lg px-8 py-5 md:px-10 md:py-7 rounded-full cta-glow-pulse transform hover:scale-105 transition-transform duration-200 hero-cta-reveal"
          onClick={() => window.open(AUDITION_FORM_URL, "_blank")}
        >
          INSCREVA-SE NA AUDIÇÃO
          <ArrowRight className="ml-3 w-5 h-5" />
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center pointer-events-none"
        style={{ opacity: 1 - scrollProgress * 3 }}
      >
        <div className="flex flex-col items-center gap-1">
          <ChevronDown className="w-6 h-6 text-muted-foreground/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default PortalHero;
