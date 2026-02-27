/**
 * SpeakerCard Component
 *
 * Card individual de preletor com flip 3D.
 * Frente: foto com overlay hover (nome, cargo, descrição curta).
 * Verso: bio completa + botão de rede social (Instagram).
 */

import { useState, useCallback } from "react";

/** Dados do preletor */
export interface SpeakerData {
    name: string;
    role: string;
    shortDescription: string;
    fullDescription: string;
    photo: string;
    instagram: string;
}

interface SpeakerCardProps {
    speaker: SpeakerData;
}

/** SVG inline do ícone de Instagram */
const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
            fill="currentColor"
        />
    </svg>
);

/** SVG ícone de "virar" (RotateCw) */
const FlipIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
    </svg>
);

/** SVG ícone de "voltar" (X) */
const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="M6 6l12 12" />
    </svg>
);

const SpeakerCard = ({ speaker }: SpeakerCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = useCallback(() => {
        setIsFlipped((prev) => !prev);
    }, []);

    /** Impede que o clique no botão do Instagram propague e vire o card de volta */
    const handleSocialClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);

    return (
        <div
            className={`speaker-card${isFlipped ? " speaker-card--flipped" : ""}`}
            data-speaker-card
            onClick={toggleFlip}
            role="button"
            tabIndex={0}
            aria-label={`Ver mais sobre ${speaker.name}`}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFlip();
                }
            }}
        >
            <div className="speaker-card__inner">
                {/* === FRONT === */}
                <div className="speaker-card__front">
                    <div className="speaker-card__image-wrapper">
                        <img
                            className="speaker-card__image"
                            src={speaker.photo}
                            alt={`Foto de ${speaker.name}`}
                            loading="lazy"
                            draggable={false}
                        />
                    </div>

                    {/* Flip hint button */}
                    <div className="speaker-card__flip-hint" aria-hidden="true">
                        <FlipIcon />
                    </div>

                    {/* Hover overlay */}
                    <div className="speaker-card__overlay">
                        <p className="speaker-card__name">{speaker.name}</p>
                        <p className="speaker-card__role">{speaker.role}</p>
                        <p className="speaker-card__desc-short">{speaker.shortDescription}</p>
                    </div>
                </div>

                {/* === BACK === */}
                <div className="speaker-card__back">
                    {/* Close / flip back */}
                    <div
                        className="speaker-card__back-flip-hint"
                        aria-label="Voltar"
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFlip();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.stopPropagation();
                                e.preventDefault();
                                toggleFlip();
                            }
                        }}
                    >
                        <CloseIcon />
                    </div>

                    {/* Header with mini avatar */}
                    <div className="speaker-card__back-header">
                        <img
                            className="speaker-card__back-avatar"
                            src={speaker.photo}
                            alt={speaker.name}
                            loading="lazy"
                        />
                        <div>
                            <p className="speaker-card__back-name">{speaker.name}</p>
                            <p className="speaker-card__back-role">{speaker.role}</p>
                        </div>
                    </div>

                    {/* Full description */}
                    <p className="speaker-card__back-desc">{speaker.fullDescription}</p>

                    {/* Instagram button */}
                    <a
                        href={speaker.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="speaker-card__social-btn"
                        aria-label={`Instagram de ${speaker.name}`}
                        onClick={handleSocialClick}
                    >
                        <InstagramIcon />
                        Seguir no Instagram
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SpeakerCard;
