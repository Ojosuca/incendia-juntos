import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GalleryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-grow w-full overflow-x-hidden flex items-center justify-center relative">
        {/* Spotlight background */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full",
            "bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/.15),transparent_60%)]",
            "blur-[80px]",
          )}
        />

        <div className="z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-primary font-sans font-semibold text-sm md:text-base uppercase tracking-wider mb-4 md:mb-6">
            Em construção
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-4 md:mb-6 leading-tight">
            GALERIA INCENDS
          </h1>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10">
            Essa página funcionará em breve. Estamos preparando os melhores momentos
            para compartilhar com você!
          </p>

          <Button
            size="lg"
            variant="default"
            onClick={() => navigate("/")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans font-semibold group rounded-full px-8 py-6 text-base"
          >
            <ArrowLeft className="mr-3 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Retornar para a página inicial
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GalleryPage;
