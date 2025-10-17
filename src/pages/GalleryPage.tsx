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
    const lenis = new Lenis();
    
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
      <main className="min-h-screen w-full">
        <div className="relative flex h-[50vh] items-center justify-center">
          {/* Radial spotlight */}
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
              'bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/.2),transparent_50%)]',
              'blur-[60px]',
            )}
          />
          <div className="z-10 text-center px-4">
            <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider mb-4">
              Momentos que marcam
            </p>
            <h1 className="font-display text-6xl md:text-8xl text-foreground mb-6">
              GALERIA INCENDS
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Veja como Deus tem se movido entre nós através desses momentos eternizados
            </p>
          </div>
        </div>
        <ZoomParallax images={images} />
        <div className="h-[50vh] flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="text-center px-4">
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
              Vamos Incendiar Juntos
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
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
