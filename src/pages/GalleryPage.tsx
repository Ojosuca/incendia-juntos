import { LayoutGrid } from "@/components/ui/layout-grid";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/IMG_4144.jpg";
import communityImage from "@/assets/IMG_8221.jpg";
import fireTexture from "@/assets/IMG_9968.jpg";
import galleryWorship1 from "@/assets/INCENDS-57.jpg";
import galleryCommunity1 from "@/assets/IMG_8249.jpg";
import galleryWorshipBand from "@/assets/IMG_9968.jpg";
import galleryPrayer from "@/assets/IMG_9989.jpg";
import galleryYouth from "@/assets/INCENDS-73.jpg";
import gallerySpecialMoment from "@/assets/IMG_8221.jpg";
import galleryGathering from "@/assets/IMG_9999.jpg";

const GalleryPage = () => {
  const cards = [
    {
      id: 1,
      content: (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            Momento de Adoração
          </p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Unidos em louvor e adoração, experimentamos a presença de Deus de
            forma intensa.
          </p>
        </div>
      ),
      className: "md:col-span-2",
      thumbnail: heroImage,
    },
    {
      id: 2,
      content: (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            Comunidade Reunida
          </p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Juntos somos mais fortes. A comunidade Incends celebrando a fé.
          </p>
        </div>
      ),
      className: "col-span-1",
      thumbnail: galleryCommunity1,
    },
    {
      id: 3,
      content: (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            Banda de Louvor
          </p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Nossa banda ministra com excelência e paixão pelo Reino de Deus.
          </p>
        </div>
      ),
      className: "col-span-1",
      thumbnail: galleryWorshipBand,
    },
    {
      id: 4,
      content: (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            Momento de Oração
          </p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Juntos em oração, buscando a face de Deus com fervor e fé.
          </p>
        </div>
      ),
      className: "md:col-span-2",
      thumbnail: galleryPrayer,
    },
    {
      id: 5,
      content: (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            Juventude Incendiada
          </p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Uma geração apaixonada por Jesus, pronta para transformar o mundo.
          </p>
        </div>
      ),
      className: "col-span-1",
      thumbnail: galleryYouth,
    },
    {
      id: 6,
      content: (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            Momento Especial
          </p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Cada encontro é único e marcado pela presença do Espírito Santo.
          </p>
        </div>
      ),
      className: "col-span-1",
      thumbnail: gallerySpecialMoment,
    },
    {
      id: 7,
      content: (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            Unidos em Cristo
          </p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Em Cristo, encontramos nossa verdadeira identidade e propósito.
          </p>
        </div>
      ),
      className: "md:col-span-2",
      thumbnail: galleryGathering,
    },
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
              "pointer-events-none absolute top-0 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full",
              "bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/.3),transparent_60%)]",
              "blur-[80px]",
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
              Veja como Deus tem se movido entre nós através desses momentos
              eternizados
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground/60 text-sm animate-bounce">
              <span>Role para explorar</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="min-h-screen py-10 md:py-20 bg-background">
          <LayoutGrid cards={cards} />
        </div>
        <div className="h-screen flex items-center justify-center bg-background relative">
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-1/2 left-1/2 h-[100vmin] w-[100vmin] -translate-x-1/2 -translate-y-1/2 rounded-full",
              "bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/.2),transparent_60%)]",
              "blur-[80px]",
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
