/**
 * SpeakerCard Component
 *
 * Card individual com flip 3D.
 * - Normal: foto + overlay hover + verso com bio/Instagram.
 * - Misterioso: pura CSS (sem imagem), mensagem pulsante + dica no verso.
 */

import { useState, useCallback } from "react";

/* ========== Tipos ========== */

export interface NormalSpeakerData {
    id: string;
    type: "normal";
    name: string;
    role: string;
    shortDescription: string;
    fullDescription: string;
    photo: string;
    instagram: string;
    instagramLabel: string;
}

export interface MysterySpeakerData {
    id: string;
    type: "mystery";
    frontMessage: string;
    backHint: string;
}

export type SpeakerCardData = NormalSpeakerData | MysterySpeakerData;

interface SpeakerCardProps {
    data: SpeakerCardData;
    isFocused?: boolean;
}

/* ========== SVGs inline ========== */

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
            fill="currentColor"
        />
    </svg>
);

const FlipIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="M6 6l12 12" />
    </svg>
);

/* ========== Componente ========== */

const SpeakerCard = ({ data, isFocused = true }: SpeakerCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = useCallback(() => {
        setIsFlipped((prev) => !prev);
    }, []);

    const handleSocialClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);

    const focusClass = isFocused ? "speaker-card--focused" : "speaker-card--unfocused";

    /* ── Card Misterioso ── */
    if (data.type === "mystery") {
        return (
            <div
                className={`speaker-card speaker-card--mystery ${focusClass}${isFlipped ? " speaker-card--flipped" : ""}`}
                data-speaker-card
                onClick={toggleFlip}
                role="button"
                tabIndex={0}
                aria-label="Card misterioso — clique para ver dica"
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleFlip();
                    }
                }}
            >
                <div className="speaker-card__inner">
                    {/* FRONT */}
                    <div className="speaker-card__front speaker-card__front--mystery">
                        <div className="speaker-card__mystery-bg" />
                        <div className="speaker-card__mystery-overlay">
                            <div className="speaker-card__mystery-pulse">
                                <span className="speaker-card__mystery-qmark">?</span>
                            </div>
                            <p className="speaker-card__mystery-text">{data.frontMessage}</p>
                        </div>
                        <div className="speaker-card__flip-hint" aria-hidden="true">
                            <FlipIcon />
                        </div>
                    </div>

                    {/* BACK */}
                    <div className="speaker-card__back speaker-card__back--mystery">
                        <div
                            className="speaker-card__back-flip-hint"
                            aria-label="Voltar"
                            role="button"
                            tabIndex={0}
                            onClick={(e) => { e.stopPropagation(); toggleFlip(); }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.stopPropagation(); e.preventDefault(); toggleFlip();
                                }
                            }}
                        >
                            <CloseIcon />
                        </div>
                        <div className="speaker-card__mystery-back-content">
                            <div className="speaker-card__mystery-back-icon">
                                <span>?</span>
                            </div>
                            <p className="speaker-card__mystery-back-hint">{data.backHint}</p>
                            <p className="speaker-card__mystery-back-soon">Revelação em breve...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* ── Card Normal ── */
    return (
        <div
            className={`speaker-card ${focusClass}${isFlipped ? " speaker-card--flipped" : ""}`}
            data-speaker-card
            onClick={toggleFlip}
            role="button"
            tabIndex={0}
            aria-label={`Ver mais sobre ${data.name}`}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFlip();
                }
            }}
        >
            <div className="speaker-card__inner">
                {/* FRONT */}
                <div className="speaker-card__front">
                    <div className="speaker-card__image-wrapper">
                        <img
                            className="speaker-card__image"
                            src={data.photo}
                            alt={`Foto de ${data.name}`}
                            loading="lazy"
                            draggable={false}
                        />
                    </div>
                    <div className="speaker-card__flip-hint" aria-hidden="true">
                        <FlipIcon />
                    </div>
                    <div className="speaker-card__overlay">
                        <p className="speaker-card__name">{data.name}</p>
                        <p className="speaker-card__role">{data.role}</p>
                        <p className="speaker-card__desc-short">{data.shortDescription}</p>
                    </div>
                </div>

                {/* BACK */}
                <div className="speaker-card__back">
                    <div
                        className="speaker-card__back-flip-hint"
                        aria-label="Voltar"
                        role="button"
                        tabIndex={0}
                        onClick={(e) => { e.stopPropagation(); toggleFlip(); }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.stopPropagation(); e.preventDefault(); toggleFlip();
                            }
                        }}
                    >
                        <CloseIcon />
                    </div>
                    <div className="speaker-card__back-header">
                        <img className="speaker-card__back-avatar" src={data.photo} alt={data.name} loading="lazy" />
                        <div>
                            <p className="speaker-card__back-name">{data.name}</p>
                            <p className="speaker-card__back-role">{data.role}</p>
                        </div>
                    </div>
                    <p className="speaker-card__back-desc">{data.fullDescription}</p>
                    <a
                        href={data.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="speaker-card__social-btn"
                        aria-label={`Instagram de ${data.name}`}
                        onClick={handleSocialClick}
                    >
                        <InstagramIcon />
                        {data.instagramLabel}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SpeakerCard;
