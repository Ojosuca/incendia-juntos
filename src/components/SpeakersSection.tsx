/**
 * SpeakersSection Component
 *
 * Carrossel interativo usando Embla (shadcn Carousel).
 * 6 cards (3 normais + 3 misteriosos), loop infinito.
 * Leve e fluido — zero GSAP no carrossel, somente CSS transitions.
 */

import { useRef, useLayoutEffect, useState, useCallback, useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import SpeakerCard from "./SpeakerCard";
import type { SpeakerCardData } from "./SpeakerCard";
import {
    initSpeakersSectionAnimations,
    cleanupSpeakersSectionAnimations,
} from "@/animations/speakersSection.gsap";
import "./SpeakersSection.css";

// Fotos dos preletores
import photoDenio from "@/assets/PreleitorIncendsDenio.webp";
import photoRibinha from "@/assets/PreleitorIncendsRibinha.webp";
import photoRodrigo from "@/assets/PreleitorIncendsRodrigo.webp";

/** Array com os 6 cards */
const allSpeakers: SpeakerCardData[] = [
    {
        id: "denio",
        type: "normal",
        name: "Dênio Lara Jr",
        role: "Pastor",
        shortDescription: "Conhecido nacionalmente por ministérios de ensino, avivamento e impacto espiritual.",
        fullDescription:
            "Pastor, conferencista e líder cristão dedicado à pregação da Palavra de Deus, Dênio Lara Jr é conhecido nacionalmente por ministérios de ensino, avivamento e impacto espiritual em igrejas e conferências no Brasil. Ele ministra em eventos e conferências com foco em crescimento na fé, vida de oração e compromisso com Cristo, influenciando comunidades cristãs com uma mensagem fundamentada nas Escrituras.",
        photo: photoDenio,
        instagram: "https://www.instagram.com/deniolarajr/",
        instagramLabel: "@deniolarajr",
    },
    {
        id: "ribinha",
        type: "normal",
        name: "Pr. Ribinha",
        role: "Pastor",
        shortDescription: "Pregador e líder evangélico com forte presença no meio cristão brasileiro.",
        fullDescription:
            "Pastor Ribinha é um pregador e líder evangélico envolvido no ministério pastoral e evangelístico, especialmente conhecido por suas ministrações em conferências, cultos e serviços de adoração, com ênfase na caminhada cristã prática e no relacionamento com Jesus. Ele tem forte presença no meio cristão e atua promovendo crescimento espiritual e ensino bíblico.",
        photo: photoRibinha,
        instagram: "https://www.instagram.com/pastorribinha/",
        instagramLabel: "@pastorribinha",
    },
    {
        id: "rodrigo",
        type: "normal",
        name: "Rodrigo Arrais",
        role: "Pastor & Escritor",
        shortDescription: "Líder religioso, autor e pastor na Igreja Batista do Angelim em São Luís.",
        fullDescription:
            "Pastor Rodrigo Arrais é líder religioso, autor e pastor na Igreja Batista do Angelim em São Luís (Maranhão). Ele é também advogado e escritor, com atuação pastoral voltada a missões, evangelismo, discipulado e projetos sociais dentro e fora do Brasil. Sua caminhada conjuga serviço espiritual com compromisso comunitário.",
        photo: photoRodrigo,
        instagram: "https://www.instagram.com/rodrigoarrais/",
        instagramLabel: "@rodrigoarrais",
    },
    {
        id: "mystery1",
        type: "mystery",
        frontMessage: "???",
        backHint: "Dica: Não é o pastor Lucas",
    },
    {
        id: "mystery2",
        type: "mystery",
        frontMessage: "???",
        backHint: "Dica: O pastor não deixou eu dar spoiler",
    },
    {
        id: "mystery3",
        type: "mystery",
        frontMessage: "???",
        backHint: "Dica: Ainda não tá podendo falar",
    },
];

/** SVG ícone microfone */
const MicIcon = () => (
    <svg
        className="speakers-section__label-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
);

/** Setas SVG */
const ChevronLeft = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
    </svg>
);

const ChevronRight = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
    </svg>
);

const SpeakersSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const carouselWrapRef = useRef<HTMLDivElement>(null);

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    /* Atualizar índice ao mudar slide */
    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };

        onSelect();
        api.on("select", onSelect);
        return () => { api.off("select", onSelect); };
    }, [api]);

    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);

    /* GSAP - apenas animação de entrada (fade + scale + blur) */
    useLayoutEffect(() => {
        const ctx = initSpeakersSectionAnimations({
            section: sectionRef.current,
            title: titleRef.current,
            subtitle: subtitleRef.current,
            carousel: carouselWrapRef.current,
        });

        return () => { cleanupSpeakersSectionAnimations(ctx); };
    }, []);

    return (
        <section ref={sectionRef} className="speakers-section">
            {/* Decorative blurs */}
            <div className="speakers-section__deco-1" />
            <div className="speakers-section__deco-2" />

            {/* Header */}
            <div className="speakers-section__header">
                <div className="speakers-section__label">
                    <MicIcon />
                    <span className="speakers-section__label-text">Preletores</span>
                </div>
                <h2 ref={titleRef} className="speakers-section__title">
                    CONVIDADOS
                </h2>
                <p ref={subtitleRef} className="speakers-section__subtitle">
                    Conheça os pastores e ministros que Deus está usando para
                    incendiar vidas nesta conferência.
                </p>
            </div>

            {/* Carrossel via Embla/shadcn */}
            <div ref={carouselWrapRef} className="speakers-carousel-wrap">
                <Carousel
                    opts={{
                        align: "center",
                        loop: true,
                        skipSnaps: false,
                        dragFree: false,
                    }}
                    setApi={setApi}
                    className="speakers-carousel"
                >
                    <CarouselContent className="speakers-carousel__content">
                        {allSpeakers.map((speaker, idx) => (
                            <CarouselItem
                                key={speaker.id}
                                className={`speakers-carousel__item ${idx === current
                                    ? "speakers-carousel__item--active"
                                    : "speakers-carousel__item--inactive"
                                    }`}
                            >
                                <SpeakerCard
                                    data={speaker}
                                    isFocused={idx === current}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* Navegação abaixo do carrossel */}
                <div className="speakers-carousel__nav">
                    <button
                        className="speakers-carousel__arrow"
                        onClick={scrollPrev}
                        aria-label="Palestrante anterior"
                    >
                        <ChevronLeft />
                    </button>

                    <div className="speakers-carousel__dots">
                        {allSpeakers.map((s, i) => (
                            <button
                                key={s.id}
                                className={`speakers-carousel__dot ${i === current ? "speakers-carousel__dot--active" : ""
                                    }`}
                                onClick={() => api?.scrollTo(i)}
                                aria-label={`Ir para slide ${i + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        className="speakers-carousel__arrow"
                        onClick={scrollNext}
                        aria-label="Próximo palestrante"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SpeakersSection;
