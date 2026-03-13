/**
 * Página de Patrocinadores — /patrocinadores
 *
 * Hero + Seção Ouro (cards grandes) + Seção Prata (cards menores)
 * Animações de entrada com GSAP ScrollTrigger
 */

import { useRef, useLayoutEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SponsorsTicker from "@/components/SponsorsTicker";
import { Button } from "@/components/ui/button";
import { Instagram, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    patrocinadoresOuro,
    patrocinadoresPrata,
} from "@/data/patrocinadores";
import {
    initPatrocinadoresAnimations,
    cleanupPatrocinadoresAnimations,
} from "@/animations/patrocinadores.gsap";

const PatrocinadoresPage = () => {
    const heroContentRef = useRef<HTMLDivElement>(null);
    const ouroSectionRef = useRef<HTMLDivElement>(null);
    const prataSectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ouroCards: HTMLElement[] = [];
        if (ouroSectionRef.current) {
            ouroSectionRef.current
                .querySelectorAll("[data-ouro-card]")
                .forEach((el) => ouroCards.push(el as HTMLElement));
        }

        const prataCards: HTMLElement[] = [];
        if (prataSectionRef.current) {
            prataSectionRef.current
                .querySelectorAll("[data-prata-card]")
                .forEach((el) => prataCards.push(el as HTMLElement));
        }

        const ctx = initPatrocinadoresAnimations({
            heroContent: heroContentRef.current,
            ouroSection: ouroSectionRef.current,
            ouroCards,
            prataSection: prataSectionRef.current,
            prataCards,
        });

        return () => {
            cleanupPatrocinadoresAnimations(ctx);
        };
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navigation />

            <main className="flex-grow w-full overflow-x-hidden">
                {/* ── Hero ── */}
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
                    {/* Spotlight background */}
                    <div
                        aria-hidden="true"
                        className={cn(
                            "pointer-events-none absolute top-1/2 left-1/2 h-[100vmin] w-[100vmin] -translate-x-1/2 -translate-y-1/2 rounded-full",
                            "bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/.12),transparent_60%)]",
                            "blur-[80px]"
                        )}
                    />

                    <div
                        ref={heroContentRef}
                        className="container mx-auto px-4 relative z-10 text-center"
                    >
                        <p className="text-primary font-sans font-semibold text-sm md:text-base uppercase tracking-wider mb-4 md:mb-6">
                            Parceiros da Conferência
                        </p>
                        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-4 md:mb-6 leading-tight">
                            NOSSOS PATROCINADORES
                        </h1>
                        <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
                            Empresas e pessoas que acreditam na visão e tornam a Incends Conference possível.
                        </p>
                    </div>
                </section>

                {/* ── Seção Parceiros Principais ── */}
                <section className="py-16 md:py-24 bg-background relative">
                    <div className="container mx-auto px-4">
                        {/* Generic banner for main sponsors */}
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 rounded-xl bg-gradient-fire flex items-center justify-center shadow-lg">
                                <Flame className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="font-display text-3xl md:text-4xl text-foreground">
                                PARCEIROS
                            </h2>
                            <div className="flex-1 h-px bg-border ml-4" />
                        </div>

                        <div
                            ref={ouroSectionRef}
                            className={cn(
                                "grid gap-8",
                                patrocinadoresOuro.length === 1
                                    ? "grid-cols-1 max-w-2xl mx-auto"
                                    : "grid-cols-1 md:grid-cols-2"
                            )}
                        >
                            {patrocinadoresOuro.map((sponsor, index) => (
                                <div
                                    key={`ouro-${index}`}
                                    data-ouro-card
                                    className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 p-8 md:p-10 transition-all duration-300 hover:shadow-glow"
                                >
                                    {/* Decorative glow */}
                                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />

                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        {/* Logo */}
                                        <div className="w-full max-w-[200px] h-28 md:h-36 flex items-center justify-center mb-6">
                                            {sponsor.logo ? (
                                                <img
                                                    src={sponsor.logo}
                                                    alt={sponsor.nome}
                                                    className="max-h-full max-w-full object-contain"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full rounded-xl bg-muted/50 border border-border flex items-center justify-center">
                                                    <span className="text-muted-foreground font-sans text-sm">
                                                        Logo
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">
                                            {sponsor.nome.toUpperCase()}
                                        </h3>
                                        <p className="text-muted-foreground font-sans leading-relaxed mb-6 max-w-md">
                                            {sponsor.descricao}
                                        </p>

                                        {/* Instagram CTA */}
                                        <Button
                                            onClick={() =>
                                                window.open(
                                                    sponsor.instagram,
                                                    "_blank",
                                                    "noopener,noreferrer"
                                                )
                                            }
                                            className="bg-gradient-fire hover:opacity-90 text-white font-sans font-semibold shadow-glow group/btn"
                                        >
                                            <Instagram className="mr-2 w-4 h-4" />
                                            Ver Instagram
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-px bg-border my-16" />

                        <div
                            ref={prataSectionRef}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {patrocinadoresPrata.map((sponsor, index) => (
                                <div
                                    key={`prata-${index}`}
                                    data-prata-card
                                    className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 p-6 md:p-8 transition-all duration-300 hover:shadow-card"
                                >
                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        {/* Logo */}
                                        <div className="w-full max-w-[140px] h-20 md:h-24 flex items-center justify-center mb-5">
                                            {sponsor.logo ? (
                                                <img
                                                    src={sponsor.logo}
                                                    alt={sponsor.nome}
                                                    className="max-h-full max-w-full object-contain"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full rounded-lg bg-muted/50 border border-border flex items-center justify-center">
                                                    <span className="text-muted-foreground font-sans text-xs">
                                                        Logo
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">
                                            {sponsor.nome.toUpperCase()}
                                        </h3>
                                        <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-5">
                                            {sponsor.descricao}
                                        </p>

                                        {/* Instagram CTA */}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                window.open(
                                                    sponsor.instagram,
                                                    "_blank",
                                                    "noopener,noreferrer"
                                                )
                                            }
                                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-sans font-semibold group/btn"
                                        >
                                            <Instagram className="mr-2 w-4 h-4" />
                                            Instagram
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Carrossel de Bronze ── */}
                <div className="border-t border-border mt-8">
                    <SponsorsTicker onlyBronze={true} hideButton={true} />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PatrocinadoresPage;
