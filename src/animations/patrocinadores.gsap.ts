/**
 * Patrocinadores Page GSAP Animations
 *
 * ScrollTrigger-based entrance animations:
 * - Cards Ouro: individual fadeUp
 * - Cards Prata: staggered fadeUp in group
 *
 * Follows the same pattern as conferenceSection.gsap.ts
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

interface PatrocinadoresAnimConfig {
    heroContent: HTMLElement | null;
    ouroSection: HTMLElement | null;
    ouroCards: HTMLElement[];
    prataSection: HTMLElement | null;
    prataCards: HTMLElement[];
}

export const initPatrocinadoresAnimations = (
    config: PatrocinadoresAnimConfig
): gsap.Context => {
    const ctx = gsap.context(() => {
        if (prefersReducedMotion()) {
            // Set everything visible immediately
            if (config.heroContent) gsap.set(config.heroContent, { opacity: 1, y: 0 });
            config.ouroCards.forEach((card) => gsap.set(card, { opacity: 1, y: 0 }));
            config.prataCards.forEach((card) => gsap.set(card, { opacity: 1, y: 0 }));
            return;
        }

        // ── Hero content ──
        if (config.heroContent) {
            gsap.set(config.heroContent, { opacity: 0, y: 30 });
            gsap.to(config.heroContent, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2,
            });
        }

        // ── Ouro cards — individual fadeUp ──
        if (config.ouroCards.length > 0) {
            config.ouroCards.forEach((card) => {
                gsap.set(card, { opacity: 0, y: 40 });
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "top 60%",
                        toggleActions: "play none none none",
                    },
                });
            });
        }

        // ── Prata cards — stagger in group ──
        if (config.prataCards.length > 0 && config.prataSection) {
            gsap.set(config.prataCards, { opacity: 0, y: 30 });
            gsap.to(config.prataCards, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: config.prataSection,
                    start: "top 80%",
                    end: "top 50%",
                    toggleActions: "play none none none",
                },
            });
        }
    });

    return ctx;
};

export const cleanupPatrocinadoresAnimations = (ctx: gsap.Context) => {
    ctx.revert();
};
