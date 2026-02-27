/**
 * Speakers Section GSAP Animations
 *
 * - Clip-path reveal: cada card entra com inset(100% 0 0 0) → inset(0 0 0 0)
 * - Stagger: cascata de 0.15s entre cards
 * - Parallax: imagem se move mais devagar que o card
 * - Título: entrance com opacity + y + scale
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export interface SpeakersSectionAnimConfig {
    section: HTMLElement | null;
    title: HTMLElement | null;
    subtitle: HTMLElement | null;
    grid: HTMLElement | null;
}

/** Checks if user prefers reduced motion */
const prefersReducedMotion = (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Initialize speakers section animations
 */
export const initSpeakersSectionAnimations = (
    config: SpeakersSectionAnimConfig
): gsap.Context => {
    const ctx = gsap.context(() => {
        if (prefersReducedMotion()) return;

        // --- Title entrance ---
        if (config.title) {
            gsap.from(config.title, {
                opacity: 0,
                y: 60,
                scale: 0.95,
                scrollTrigger: {
                    trigger: config.title,
                    start: "top 85%",
                    end: "top 55%",
                    scrub: 1,
                },
            });
        }

        // --- Subtitle entrance ---
        if (config.subtitle) {
            gsap.from(config.subtitle, {
                opacity: 0,
                y: 30,
                scrollTrigger: {
                    trigger: config.subtitle,
                    start: "top 88%",
                    end: "top 65%",
                    scrub: 1,
                },
            });
        }

        // --- Speaker cards ---
        if (config.grid) {
            const cards = config.grid.querySelectorAll("[data-speaker-card]");

            // Clip-path reveal + stagger + opacity + y
            cards.forEach((card, index) => {
                const cardEl = card as HTMLElement;

                // Entry animation with clip-path
                gsap.fromTo(
                    cardEl,
                    {
                        clipPath: "inset(100% 0 0 0)",
                        opacity: 0,
                        y: 50,
                    },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: cardEl,
                            start: "top 90%",
                            end: "top 55%",
                            scrub: 1,
                        },
                        delay: index * 0.15, // Stagger effect when not scrubbing
                    }
                );

                // Parallax on the image inside each card
                const image = cardEl.querySelector(".speaker-card__image");
                if (image) {
                    gsap.fromTo(
                        image,
                        { y: -20 },
                        {
                            y: 20,
                            ease: "none",
                            scrollTrigger: {
                                trigger: cardEl,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        }
                    );
                }
            });
        }

        // --- Mobile optimizations ---
        const mm = gsap.matchMedia();

        mm.add("(max-width: 768px)", () => {
            if (config.title) {
                gsap.from(config.title, {
                    opacity: 0,
                    y: 40,
                    scale: 0.98,
                    scrollTrigger: {
                        trigger: config.title,
                        start: "top 88%",
                        end: "top 65%",
                        scrub: 0.5,
                    },
                });
            }

            // Reduce parallax intensity on mobile
            if (config.grid) {
                const cards = config.grid.querySelectorAll("[data-speaker-card]");
                cards.forEach((card) => {
                    const image = card.querySelector(".speaker-card__image");
                    if (image) {
                        gsap.fromTo(
                            image,
                            { y: -8 },
                            {
                                y: 8,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: true,
                                },
                            }
                        );
                    }
                });
            }
        });
    });

    return ctx;
};

/**
 * Cleanup speakers section animations
 */
export const cleanupSpeakersSectionAnimations = (ctx: gsap.Context) => {
    ctx.revert();
};
