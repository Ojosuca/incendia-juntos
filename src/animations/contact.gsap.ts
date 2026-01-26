/**
 * Contact Section GSAP Animations
 * 
 * Animações para a seção de contato seguindo a identidade visual do site.
 * - Elementos entrando com suavidade (fade in + slide up)
 * - Stagger para os cards de contato
 * - Slide in lateral para o mapa
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ContactAnimationsConfig {
    container: HTMLElement | null;
    header: HTMLElement | null;
    cardsContainer: HTMLElement | null;
    mapContainer: HTMLElement | null;
    ctaButton: HTMLElement | null;
}

/**
 * Checks if user prefers reduced motion
 */
const prefersReducedMotion = (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const initContactAnimations = (
    config: ContactAnimationsConfig
): gsap.Context => {
    const ctx = gsap.context(() => {
        if (prefersReducedMotion()) return;

        // Header Animations
        if (config.header) {
            gsap.from(config.header.children, {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: config.header,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        }

        // Contact Cards - No Animation (Removed by request)
        if (config.cardsContainer) {
            // Animation removed to ensure visibility
        }

        // Map Slide In Animation
        if (config.mapContainer) {
            gsap.from(config.mapContainer, {
                opacity: 0,
                x: 30,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: config.mapContainer,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        }

        // CTA Button Animation
        if (config.ctaButton) {
            gsap.from(config.ctaButton, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.2, // Reduced delay
                ease: "power3.out",
                scrollTrigger: {
                    trigger: config.ctaButton,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            });
        }
    });

    return ctx;
};

export const cleanupContactAnimations = (ctx: gsap.Context) => {
    ctx.revert();
};
