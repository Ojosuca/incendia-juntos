/**
 * GSAP ScrollTrigger Animations for Home Page Sections
 * 
 * Migrated from Framer Motion whileInView to GSAP ScrollTrigger
 * Maintains exact same visual design and behavior
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Animation configuration interface
 */
interface ScrollAnimationConfig {
  sectionTitleRef: HTMLElement | null;
  sectionCards: HTMLElement[];
}

/**
 * Checks if user prefers reduced motion
 */
const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Initializes scroll-triggered animations for home page sections
 * 
 * Animates:
 * - Section title (fade in + slide up on scroll)
 * - Section cards (staggered fade in + slide up on scroll)
 */
export const initHomeScrollAnimations = (
  config: ScrollAnimationConfig
): gsap.Context => {
  const ctx = gsap.context(() => {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion()) {
      // Set final state immediately
      gsap.set([config.sectionTitleRef, config.sectionCards].flat().filter(Boolean), {
        opacity: 1,
        y: 0,
      });
      return;
    }

    // Set initial state (hidden)
    gsap.set([config.sectionTitleRef, config.sectionCards].flat().filter(Boolean), {
      opacity: 0,
      y: 20,
    });

    // Section title animation
    if (config.sectionTitleRef) {
      gsap.to(config.sectionTitleRef, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: config.sectionTitleRef,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });
    }

    // Section cards staggered animation
    if (config.sectionCards.length > 0) {
      gsap.to(config.sectionCards, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: config.sectionCards[0],
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });
    }
  });

  return ctx;
};

/**
 * Cleanup function for scroll animations
 */
export const cleanupHomeScrollAnimations = (ctx: gsap.Context) => {
  ctx.revert();
};
