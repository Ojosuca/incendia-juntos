import { useEffect } from "react";
import Lenis from '@studio-freight/lenis';
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-worship.jpg";
import communityImage from "@/assets/community.jpg";
import fireTexture from "@/assets/fire-texture.jpg";

const GalleryPage = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const images = [
    { src: heroImage, alt: "Momento de adoração" },
    { src: communityImage, alt: "Comunidade reunida" },
    { src: fireTexture, alt: "Atmosfera de fogo" },
    { src: heroImage, alt: "Louvor intenso" },
    { src: communityImage, alt: "Juventude incendiada" },
    { src: fireTexture, alt: "Momento especial" },
    { src: heroImage, alt: "Unidos em Cristo" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="min-h-screen w-full overflow-x-hidden">
        <div className="relative flex h-screen items-center justify-center bg-background">
          {/* Radial spotlight */}
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute top-0 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
              'bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/.3),transparent_60%)]',
              'blur-[80px]',
            )}
          />
          <div className="z-10 text-center px-4">
            <p className="text-primary font-sans font-semibold text-sm md:text-base uppercase tracking-wider mb-4 md:mb-6">
              Momentos que marcam
            </p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-4 md:mb-6">
              GALERIA INCENDS
            </h1>
            <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8">
              Veja como Deus tem se movido entre nós através desses momentos eternizados
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground/60 text-sm animate-bounce">
              <span>Role para explorar</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
        <ZoomParallax images={images} />
        <div className="h-screen flex items-center justify-center bg-background relative">
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute top-1/2 left-1/2 h-[100vmin] w-[100vmin] -translate-x-1/2 -translate-y-1/2 rounded-full',
              'bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/.2),transparent_60%)]',
              'blur-[80px]',
            )}
          />
          <div className="text-center px-4 z-10">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-4 md:mb-6">
              Vamos Incendiar Juntos
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl mb-8">
              Faça parte dessa história
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
