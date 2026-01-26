/**
 * Home Scroll Sections GSAP Animations
 * 
 * Animações de scroll inspiradas em Benjamin Jochims
 * - Scroll natural (não hijacked)
 * - Animações progressivas com ScrollTrigger
 * - Elementos entrando com opacity + translateY
 * - Leve deslocamento horizontal em alguns elementos
 * - Sensação de continuidade entre seções
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface HomeScrollSectionsConfig {
    missionSection: HTMLElement | null;
    missionTitle: HTMLElement | null;
    missionText: HTMLElement | null;
    communitySection: HTMLElement | null;
    communityTitle: HTMLElement | null;
    communityCards: HTMLElement | null;
    ctaSection: HTMLElement | null;
    ctaTitle: HTMLElement | null;
    ctaButton: HTMLElement | null;
}

/**
 * Checks if user prefers reduced motion
 */
const prefersReducedMotion = (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Initializes scroll animations for home sections
 * 
 * Animation philosophy (Benjamin Jochims style):
 * - Natural scroll, no hijacking
 * - Progressive entrance with opacity + y
 * - Subtle horizontal displacement
 * - Scrub for smooth feel
 * - Each section has its own trigger
 */
export const initHomeScrollSections = (
    config: HomeScrollSectionsConfig
): gsap.Context => {
    const ctx = gsap.context(() => {
        // Skip animation if user prefers reduced motion
        if (prefersReducedMotion()) {
            return;
        }

        // Mission Section Animations
        if (config.missionTitle) {
            gsap.from(config.missionTitle, {
                opacity: 0,
                y: 60,
                x: -20, // Subtle horizontal displacement
                scrollTrigger: {
                    trigger: config.missionTitle,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 1,
                },
            });
        }

        if (config.missionText) {
            gsap.from(config.missionText, {
                opacity: 0,
                y: 40,
                scrollTrigger: {
                    trigger: config.missionText,
                    start: "top 85%",
                    end: "top 60%",
                    scrub: 1,
                },
            });
        }

        // Community Section Animations
        if (config.communityTitle) {
            gsap.from(config.communityTitle, {
                opacity: 0,
                y: 60,
                x: 20, // Opposite horizontal displacement for variety
                scrollTrigger: {
                    trigger: config.communityTitle,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 1,
                },
            });
        }

        // Community Cards - Sequential entrance
        if (config.communityCards) {
            const cards = config.communityCards.querySelectorAll("[data-community-card]");

            cards.forEach((card, index) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    x: index % 2 === 0 ? -15 : 15, // Alternate horizontal displacement
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "top 60%",
                        scrub: 1,
                    },
                });
            });
        }

        // CTA Section Animations
        if (config.ctaTitle) {
            gsap.from(config.ctaTitle, {
                opacity: 0,
                y: 80,
                scale: 0.95, // Subtle scale for impact
                scrollTrigger: {
                    trigger: config.ctaTitle,
                    start: "top 80%",
                    end: "top 45%",
                    scrub: 1,
                },
            });
        }

        if (config.ctaButton) {
            gsap.from(config.ctaButton, {
                opacity: 0,
                y: 30,
                scrollTrigger: {
                    trigger: config.ctaButton,
                    start: "top 90%",
                    end: "top 70%",
                    scrub: 1,
                },
            });
        }

        // Mobile optimizations
        const mm = gsap.matchMedia();

        mm.add("(max-width: 768px)", () => {
            // Reduce horizontal displacement on mobile
            if (config.missionTitle) {
                gsap.from(config.missionTitle, {
                    opacity: 0,
                    y: 40,
                    x: 0, // No horizontal displacement on mobile
                    scrollTrigger: {
                        trigger: config.missionTitle,
                        start: "top 85%",
                        end: "top 60%",
                        scrub: 0.5,
                    },
                });
            }

            if (config.communityTitle) {
                gsap.from(config.communityTitle, {
                    opacity: 0,
                    y: 40,
                    x: 0,
                    scrollTrigger: {
                        trigger: config.communityTitle,
                        start: "top 85%",
                        end: "top 60%",
                        scrub: 0.5,
                    },
                });
            }

            if (config.ctaTitle) {
                gsap.from(config.ctaTitle, {
                    opacity: 0,
                    y: 50,
                    scale: 0.98,
                    scrollTrigger: {
                        trigger: config.ctaTitle,
                        start: "top 85%",
                        end: "top 55%",
                        scrub: 0.5,
                    },
                });
            }

            // Cards on mobile - less displacement
            if (config.communityCards) {
                const cards = config.communityCards.querySelectorAll("[data-community-card]");

                cards.forEach((card) => {
                    gsap.from(card, {
                        opacity: 0,
                        y: 30,
                        x: 0,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            end: "top 70%",
                            scrub: 0.5,
                        },
                    });
                });
            }
        });
    });

    return ctx;
};

/**
 * Cleanup function for home scroll sections animations
 */
export const cleanupHomeScrollSections = (ctx: gsap.Context) => {
    ctx.revert();
};
