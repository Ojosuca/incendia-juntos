import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getGalleryEventBySlug } from "@/data/gallery";

const GalleryEventPage = () => {
  const { slug = "" } = useParams();
  const [index, setIndex] = useState<number | null>(null);

  const { data: event, isLoading, isError } = useQuery({
    queryKey: ["gallery-event", slug],
    queryFn: () => getGalleryEventBySlug(slug),
    enabled: Boolean(slug),
  });

  if (!isLoading && !isError && !event) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-24 md:py-28">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-primary uppercase text-sm tracking-wider font-semibold">
              {event?.year} · {event?.category}
            </p>
            <h1 className="font-display text-4xl md:text-6xl mt-2">
              {isLoading ? "Carregando álbum..." : event?.title}
            </h1>
          </div>
          <Button asChild variant="outline">
            <Link to="/galeria">Voltar para galeria</Link>
          </Button>
        </div>

        {isError && (
          <p className="text-destructive">Erro ao carregar o álbum selecionado.</p>
        )}

        {!isLoading && event && (
          <>
            <p className="text-muted-foreground max-w-3xl mb-10">{event.description}</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {event.photos.map((photo, photoIndex) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setIndex(photoIndex)}
                  className="overflow-hidden rounded-xl border border-border"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            <Dialog open={index !== null} onOpenChange={(open) => !open && setIndex(null)}>
              <DialogContent className="max-w-4xl p-2 overflow-hidden">
                <DialogTitle className="sr-only">Visualização da imagem</DialogTitle>
                <DialogDescription className="sr-only">
                  Foto ampliada do evento selecionado.
                </DialogDescription>
                {index !== null && (
                  <img
                    src={event.photos[index].src}
                    alt={event.photos[index].alt}
                    className="w-full max-h-[80vh] object-contain rounded-md"
                  />
                )}
              </DialogContent>
            </Dialog>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GalleryEventPage;
