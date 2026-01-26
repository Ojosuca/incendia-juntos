/**
 * Conference Section GSAP Animation
 * 
 * Subtle scroll-triggered animation
 * Fade + translate on scroll
 * No pin, no exaggeration
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ConferenceSectionConfig {
  section: HTMLElement | null;
  content: HTMLElement | null;
}

/**
 * Checks if user prefers reduced motion
 */
const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Initializes conference section animation
 * 
 * Subtle fade + translate on scroll
 */
export const initConferenceSection = (
  config: ConferenceSectionConfig
): gsap.Context => {
  const ctx = gsap.context(() => {
    if (!config.section || !config.content) return;

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion()) {
      gsap.set(config.content, {
        opacity: 1,
        y: 0,
      });
      return;
    }

    // Set initial state
    gsap.set(config.content, {
      opacity: 0,
      y: 30,
    });

    // Animate on scroll
    gsap.to(config.content, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: config.section,
        start: "top 75%",
        end: "top 50%",
        toggleActions: "play none none none",
      },
    });
  });

  return ctx;
};

/**
 * Cleanup function for conference section animations
 */
export const cleanupConferenceSection = (ctx: gsap.Context) => {
  ctx.revert();
};
