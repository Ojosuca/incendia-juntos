/**
 * SpeakersSection Component
 *
 * Seção principal dos preletores do Incendiados.
 * Grid responsivo com cards animados via GSAP/ScrollTrigger.
 */

import { useRef, useLayoutEffect } from "react";
import SpeakerCard from "./SpeakerCard";
import type { SpeakerData } from "./SpeakerCard";
import {
    initSpeakersSectionAnimations,
    cleanupSpeakersSectionAnimations,
} from "@/animations/speakersSection.gsap";
import "./SpeakersSection.css";

// Importar fotos dos preletores
import photoDenio from "@/assets/PreleitorIncendsDenio.webp";
import photoRibinha from "@/assets/PreleitorIncendsRibinha.webp";
import photoRodrigo from "@/assets/PreleitorIncendsRodrigo.webp";

/** Dados dos preletores */
const speakers: SpeakerData[] = [
    {
        name: "Dênio Lara Jr",
        role: "Pastor",
        shortDescription:
            "Conhecido nacionalmente por ministérios de ensino, avivamento e impacto espiritual.",
        fullDescription:
            "Pastor, conferencista e líder cristão dedicado à pregação da Palavra de Deus, Dênio Lara Jr é conhecido nacionalmente por ministérios de ensino, avivamento e impacto espiritual em igrejas e conferências no Brasil. Ele ministra em eventos e conferências com foco em crescimento na fé, vida de oração e compromisso com Cristo, influenciando comunidades cristãs com uma mensagem fundamentada nas Escrituras.",
        photo: photoDenio,
        instagram: "https://www.instagram.com/deniolarajr/",
    },
    {
        name: "Pr. Ribinha",
        role: "Pastor",
        shortDescription:
            "Pregador e líder evangélico com forte presença no meio cristão brasileiro.",
        fullDescription:
            "Pastor Ribinha é um pregador e líder evangélico envolvido no ministério pastoral e evangelístico, especialmente conhecido por suas ministrações em conferências, cultos e serviços de adoração, com ênfase na caminhada cristã prática e no relacionamento com Jesus. Ele tem forte presença no meio cristão e atua promovendo crescimento espiritual e ensino bíblico.",
        photo: photoRibinha,
        instagram: "https://www.instagram.com/pastorribinha/",
    },
    {
        name: "Rodrigo Arrais",
        role: "Pastor & Escritor",
        shortDescription:
            "Líder religioso, autor e pastor na Igreja Batista do Angelim em São Luís.",
        fullDescription:
            "Pastor Rodrigo Arrais é líder religioso, autor e pastor na Igreja Batista do Angelim em São Luís (Maranhão). Ele é também advogado e escritor, com atuação pastoral voltada a missões, evangelismo, discipulado e projetos sociais dentro e fora do Brasil. Sua caminhada conjuga serviço espiritual com compromisso comunitário.",
        photo: photoRodrigo,
        instagram: "https://www.instagram.com/rodrigoarrais/",
    },
];

/** SVG ícone de microfone */
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

const SpeakersSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = initSpeakersSectionAnimations({
            section: sectionRef.current,
            title: titleRef.current,
            subtitle: subtitleRef.current,
            grid: gridRef.current,
        });

        return () => {
            cleanupSpeakersSectionAnimations(ctx);
        };
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
                    VAMOS INCENDIAR JUNTOS?
                </h2>
                <p ref={subtitleRef} className="speakers-section__subtitle">
                    Conheça os pastores e ministros que Deus está usando para
                    incendiar vidas nesta conferência.
                </p>
            </div>

            {/* Grid de cards */}
            <div ref={gridRef} className="speakers-grid">
                {speakers.map((speaker) => (
                    <SpeakerCard key={speaker.name} speaker={speaker} />
                ))}
            </div>
        </section>
    );
};

export default SpeakersSection;
