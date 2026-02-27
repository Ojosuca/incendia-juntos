/**
 * Home Scroll Sections GSAP Animations
 *
 * Animações de scroll para a seção CTA.
 * As seções Mission e Community foram removidas;
 * os preletores agora têm seu próprio arquivo de animações (speakersSection.gsap.ts).
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface HomeScrollSectionsConfig {
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
 * Initializes scroll animations for CTA section
 */
export const initHomeScrollSections = (
    config: HomeScrollSectionsConfig
): gsap.Context => {
    const ctx = gsap.context(() => {
        if (prefersReducedMotion()) {
            return;
        }

        // CTA Section Animations
        if (config.ctaTitle) {
            gsap.from(config.ctaTitle, {
                opacity: 0,
                y: 80,
                scale: 0.95,
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
