/**
 * SpeakersSection Component
 *
 * Carrossel interativo usando Embla (shadcn Carousel).
 * 6 cards revelados, loop infinito.
 * JS-driven tweening — zero CSS transitions no carrossel para evitar glitches.
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
import photoLucas from "@/assets/PreleitorIncendsLucas.webp";
import photoDavi from "@/assets/DaviFernades.webp";
import photoGiovana from "@/assets/Giovana.webp";

/** Array com os 6 cards */
const allSpeakers: SpeakerCardData[] = [
    {
        id: "denio",
        type: "normal",
        name: "Dênio Lara Jr",
        role: "Pastor",
        shortDescription: "Conhecido nacionalmente por ministérios de ensino, avivamento e impacto espiritual.",
        fullDescription:
            "Dênio Lara Jr é pastor e pregador apaixonado pela Palavra e por ver uma geração vivendo um cristianismo real e transformador. Com mensagens intensas, bíblicas e cheias de propósito, ele tem impactado igrejas por todo o Brasil, despertando jovens e adultos para uma vida mais profunda com Deus. Seu ministério carrega uma forte ênfase em avivamento, identidade em Cristo e compromisso com o chamado.",
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
            "Pastor Ribinha é um líder cristão apaixonado por ver vidas transformadas pelo evangelho de Jesus. Ele tem dedicado sua vida ao ministério, pregando com autenticidade e inspirando jovens e famílias a caminhar com fé e propósito. Com forte compromisso com a Palavra e experiência em ministérios de fé e adoração, o Pastor Ribamar é reconhecido por sua entrega em eventos, cultos e encontros que impactam corações para Deus.",
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
            "Pastor Rodrigo Arrais é um líder cristão, advogado e escritor que tem feito a diferença unindo fé, ação social e evangelismo. Como pastor na Igreja Batista do Angelim em São Luís, ele coordena projetos de missões, inspira jovens e comunidades a viverem com propósito e compartilha a Palavra com um coração apaixonado por Jesus. Rodrigo também já atuou à frente de iniciativas que ligam a fé à transformação da sociedade, mostrando que servir faz parte do chamado cristão.",
        photo: photoRodrigo,
        instagram: "https://www.instagram.com/rodrigoarrais/",
        instagramLabel: "@rodrigoarrais",
    },
    {
        id: "lucas",
        type: "normal",
        name: "Lucas Tertulino",
        role: "Pastor",
        shortDescription: "Pregador apaixonado por despertar uma geração para o fogo de Deus.",
        fullDescription:
            "O Pr. Lucas Tertulino é pastor cristocêntrico, dedicado ao ensino fiel das Escrituras e à formação espiritual da nova geração. Casado e pai de duas meninas, vive seu chamado ministerial também através da família, refletindo valores do Reino no dia a dia. Ele é líder do Ministério Incendiados, ministério de adolescentes da Igreja Batista do Angelim, marcado por uma geração apaixonada por Jesus, comprometida com identidade, santidade e propósito.",
        photo: photoLucas,
        instagram: "https://www.instagram.com/lucastertulino/",
        instagramLabel: "@lucastertulino",
    },
    {
        id: "davi",
        type: "normal",
        name: "Davi Silva",
        role: "Ministro de Louvor",
        shortDescription: "Ministro do evangelho dedicado a transformar vidas pelo poder da Palavra.",
        fullDescription:
            "Davi Silva é ministro de louvor, cantor e compositor, conhecido por conduzir a Igreja a momentos profundos de adoração e intimidade com Deus. Seu ministério é marcado por canções cristocêntricas e uma forte ênfase na presença do Espírito Santo.",
        photo: photoDavi,
        instagram: "https://www.instagram.com/davisilvaefamilia/",
        instagramLabel: "@davisilvaefamilia",
    },
    {
        id: "giovana",
        type: "normal",
        name: "Giovana Chartres",
        role: "Preletora",
        shortDescription: "Ministra apaixonada por despertar jovens para o propósito de Deus.",
        fullDescription:
            "Giovana Chartres é criadora de conteúdo cristão e ministra que tem impactado milhares de pessoas por meio de mensagens de fé, identidade e propósito em Cristo. Sua comunicação leve e profunda tem alcançado principalmente jovens e mulheres, fortalecendo vidas através da Palavra. Nesta conferência, teremos a alegria de recebê-la pela primeira vez no Nordeste, em um momento que promete marcar nossa geração com fé, esperança e transformação.",
        photo: photoGiovana,
        instagram: "https://www.instagram.com/giovanachartres/",
        instagramLabel: "@giovanachartres",
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

/* ======== Tweening constants ======== */
const TWEEN_SCALE_MIN = 0.88;
const TWEEN_SCALE_MAX = 1;
const TWEEN_OPACITY_MIN = 0.35;
const TWEEN_OPACITY_MAX = 1;
const TWEEN_BLUR_MAX = 2; // px

/**
 * Number in range helper — clamps value between 0 and 1.
 */
const numberInRange = (num: number, min: number, max: number): number =>
    Math.min(Math.max(num, min), max);

/**
 * Hook that applies continuous tween styles (scale, opacity, blur)
 * directly to slide DOM nodes on every Embla scroll tick.
 * This avoids CSS transitions that conflict with Embla's loop repositioning.
 */
const useTweenStyles = (api: CarouselApi | undefined) => {
    const tweenNodes = useRef<HTMLElement[]>([]);

    const setTweenNodes = useCallback(() => {
        if (!api) return;
        tweenNodes.current = api.slideNodes();
    }, [api]);

    const tweenStyles = useCallback(() => {
        if (!api) return;

        const engine = api.internalEngine();
        const scrollProgress = api.scrollProgress();
        const slidesInView = api.slidesInView();

        api.scrollSnapList().forEach((snapPosition, snapIndex) => {
            let diffToTarget = snapPosition - scrollProgress;

            // Handle loop wrapping — find the shortest distance
            const slidesInSnap = engine.slideRegistry[snapIndex];
            if (!slidesInSnap) return;

            slidesInSnap.forEach((slideIndex) => {
                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem) => {
                        const target = loopItem.target();
                        if (slideIndex === loopItem.index && target !== 0) {
                            const sign = Math.sign(target);
                            if (sign === -1) {
                                diffToTarget = snapPosition - (1 + scrollProgress);
                            }
                            if (sign === 1) {
                                diffToTarget = snapPosition + (1 - scrollProgress);
                            }
                        }
                    });
                }

                // Calculate distance factor (0 = centered, 1 = far away)
                const distance = Math.abs(diffToTarget);
                const tweenFactor = 1 - numberInRange(distance * 2, 0, 1);

                // Calculate tweened values
                const scale = numberInRange(
                    TWEEN_SCALE_MIN + tweenFactor * (TWEEN_SCALE_MAX - TWEEN_SCALE_MIN),
                    TWEEN_SCALE_MIN,
                    TWEEN_SCALE_MAX
                );
                const opacity = numberInRange(
                    TWEEN_OPACITY_MIN + tweenFactor * (TWEEN_OPACITY_MAX - TWEEN_OPACITY_MIN),
                    TWEEN_OPACITY_MIN,
                    TWEEN_OPACITY_MAX
                );
                const blur = numberInRange(
                    TWEEN_BLUR_MAX * (1 - tweenFactor),
                    0,
                    TWEEN_BLUR_MAX
                );

                const node = tweenNodes.current[slideIndex];
                if (!node) return;

                // Only apply styles to slides that are (or were recently) in view
                // to avoid touching offscreen elements
                if (slidesInView.indexOf(slideIndex) !== -1 || tweenFactor > 0.01) {
                    node.style.transform = `scale(${scale})`;
                    node.style.opacity = `${opacity}`;
                    node.style.filter = blur > 0.05 ? `blur(${blur}px)` : "none";
                }
            });
        });
    }, [api]);

    useEffect(() => {
        if (!api) return;

        setTweenNodes();
        tweenStyles();

        api.on("reInit", setTweenNodes);
        api.on("reInit", tweenStyles);
        api.on("scroll", tweenStyles);
        api.on("slideFocus", tweenStyles);

        return () => {
            api.off("reInit", setTweenNodes);
            api.off("reInit", tweenStyles);
            api.off("scroll", tweenStyles);
            api.off("slideFocus", tweenStyles);
        };
    }, [api, setTweenNodes, tweenStyles]);
};

const SLIDE_COUNT = allSpeakers.length; // 6 real speakers

/**
 * Doubled slides for seamless infinite looping.
 * Embla needs enough off-screen content to clone for smooth wrap-around.
 */
const duplicatedSpeakers = [...allSpeakers, ...allSpeakers];

const SpeakersSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const carouselWrapRef = useRef<HTMLDivElement>(null);

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    /* JS-driven tweening for smooth scale/opacity/blur */
    useTweenStyles(api);

    /* Atualizar índice ao mudar slide (para dots — mapeado aos 6 reais) */
    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap() % SLIDE_COUNT);
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
                        containScroll: false,
                    }}
                    setApi={setApi}
                    className="speakers-carousel"
                >
                    <CarouselContent className="speakers-carousel__content">
                        {duplicatedSpeakers.map((speaker, idx) => (
                            <CarouselItem
                                key={`${speaker.id}-${idx}`}
                                className="speakers-carousel__item"
                            >
                                <SpeakerCard
                                    data={speaker}
                                    isFocused={(idx % SLIDE_COUNT) === current}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* Navegação abaixo do carrossel — 6 dots reais */}
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


