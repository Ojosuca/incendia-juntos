import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getGalleryEvents } from "@/data/gallery";

const GalleryPage = () => {
  const { data: events = [], isLoading, isError } = useQuery({
    queryKey: ["gallery-events"],
    queryFn: getGalleryEvents,
  });

  const grouped = events.reduce<Record<string, typeof events>>((acc, event) => {
    const key = `${event.year}-${event.category}`;
    acc[key] = [...(acc[key] ?? []), event];
    return acc;
  }, {});

  const groupedEntries = Object.entries(grouped).sort(([a], [b]) =>
    b.localeCompare(a),
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-24 md:py-32">
        <header className="text-center mb-14">
          <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider mb-4">
            Memórias que edificam
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-foreground mb-6">
            Galeria Incends
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Acervos organizados por ano e categoria para facilitar crescimento da
            galeria.
          </p>
        </header>

        {isLoading && (
          <p className="text-center text-muted-foreground">Carregando eventos...</p>
        )}

        {isError && (
          <p className="text-center text-destructive">
            Não foi possível carregar a galeria neste momento.
          </p>
        )}

        <div className="space-y-12">
          {groupedEntries.map(([group, groupedEvents]) => {
            const [year, category] = group.split("-");
            return (
              <section key={group}>
                <div className="mb-6">
                  <h2 className="font-display text-3xl text-foreground">
                    {year} · {category}
                  </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {groupedEvents.map((event) => (
                    <article
                      key={event.slug}
                      className="rounded-2xl border border-border overflow-hidden bg-card"
                    >
                      <img
                        src={event.cover}
                        alt={event.title}
                        className="h-64 w-full object-cover"
                        loading="lazy"
                      />
                      <div className="p-6 space-y-4">
                        <h3 className="font-display text-2xl">{event.title}</h3>
                        <p className="text-muted-foreground">{event.description}</p>
                        <Button asChild>
                          <Link to={`/galeria/${event.slug}`}>Ver álbum</Link>
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
