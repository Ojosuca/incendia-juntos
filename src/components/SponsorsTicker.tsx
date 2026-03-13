/**
 * SponsorsTicker — Carrossel Bronze
 *
 * Barra horizontal com logos dos patrocinadores Bronze em loop infinito.
 * Usa GSAP para animação contínua (translateX).
 * Pausa ao hover. Fade nas bordas com mask-image.
 */

import { useRef, useLayoutEffect, useCallback } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import {
    patrocinadoresOuro,
    patrocinadoresPrata,
    patrocinadoresBronze,
} from "@/data/patrocinadores";

interface SponsorsTickerProps {
  onlyBronze?: boolean;
  hideButton?: boolean;
}

const SponsorsTicker = ({ onlyBronze = false, hideButton = false }: SponsorsTickerProps) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Medir a largura de uma "cópia" (metade do conteúdo duplicado)
        const singleWidth = track.scrollWidth / 2;

        // Animação infinita: mover exatamente uma cópia para a esquerda
        // Increased duration to 40s because there are more items now
        const tween = gsap.to(track, {
            x: -singleWidth,
            duration: 40,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize((x: number) => {
                    // Wrap para garantir loop perfeito
                    return parseFloat(x as unknown as string) % singleWidth;
                }),
            },
        });

        tweenRef.current = tween;

        return () => {
            tween.kill();
        };
    }, []);

    const handleMouseEnter = useCallback(() => {
        tweenRef.current?.pause();
    }, []);

    const handleMouseLeave = useCallback(() => {
        tweenRef.current?.resume();
    }, []);

    // Combinar patrocinadores de acordo com a prop
    const allSponsors = onlyBronze 
      ? [...patrocinadoresBronze]
      : [
          ...patrocinadoresOuro,
          ...patrocinadoresPrata,
          ...patrocinadoresBronze,
        ];

    // Se não há patrocinadores, não renderiza a seção
    if (allSponsors.length === 0) return null;

    // Duplicar lista para loop contínuo sem salto
    const items = [...allSponsors, ...allSponsors];

    return (
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 mb-10">
                <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider text-center flex items-center justify-center gap-2">
                    <Flame className="w-4 h-4 text-primary" />
                    Apoiadores da Conferência
                    <Flame className="w-4 h-4 text-primary" />
                </p>
            </div>

            {/* Ticker container com fade nas bordas */}
            <div
                className="relative overflow-hidden mb-12"
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Track — duplicado no DOM */}
                <div ref={trackRef} className="flex items-center gap-16 md:gap-24 w-max px-8">
                    {items.map((sponsor, index) => (
                        <div
                            key={`${sponsor.nome}-${index}`}
                            className="flex-shrink-0 flex items-center justify-center h-24 md:h-32"
                            title={sponsor.nome}
                        >
                            {sponsor.logo ? (
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.nome}
                                    className="h-16 md:h-24 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                                    loading="lazy"
                                />
                            ) : (
                                /* Placeholder quando logo não foi adicionada ainda */
                                <div className="h-16 md:h-24 w-32 md:w-48 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center">
                                    <span className="text-muted-foreground text-sm font-sans truncate px-4">
                                        {sponsor.nome}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Botão de chamada para ação */}
            {!hideButton && (
                <div className="container mx-auto px-4 text-center">
                    <Button
                        onClick={() => navigate("/patrocinadores")}
                        variant="outline"
                        className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-sans font-semibold group/btn rounded-full px-8"
                    >
                        Veja quais são nossos patrocinadores
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </div>
            )}
        </section>
    );
};

export default SponsorsTicker;
