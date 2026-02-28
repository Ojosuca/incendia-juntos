/**
 * Speakers Section GSAP Animations (lightweight)
 *
 * Apenas animação de entrada da seção:
 * - Título: fade + y
 * - Subtítulo: fade + y
 * - Carrossel: fade + scale + blur (single trigger, sem scrub)
 *
 * Toda a lógica do carrossel é delegada ao Embla.
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
    carousel: HTMLElement | null;
}

const prefersReducedMotion = (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const initSpeakersSectionAnimations = (
    config: SpeakersSectionAnimConfig
): gsap.Context => {
    const ctx = gsap.context(() => {
        if (prefersReducedMotion()) return;

        // Título
        if (config.title) {
            gsap.from(config.title, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: config.title,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });
        }

        // Subtítulo
        if (config.subtitle) {
            gsap.from(config.subtitle, {
                opacity: 0,
                y: 25,
                duration: 0.7,
                delay: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: config.subtitle,
                    start: "top 88%",
                    toggleActions: "play none none reverse",
                },
            });
        }

        // Carrossel inteiro: simples fade + scale
        if (config.carousel) {
            gsap.from(config.carousel, {
                opacity: 0,
                y: 30,
                scale: 0.96,
                duration: 0.8,
                delay: 0.25,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: config.carousel,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            });
        }
    });

    return ctx;
};

export const cleanupSpeakersSectionAnimations = (ctx: gsap.Context) => {
    ctx.revert();
};
