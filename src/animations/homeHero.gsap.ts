/**
 * GSAP Animations for Home Hero Component
 * 
 * Migrated from Framer Motion to GSAP
 * Maintains exact same visual design and behavior
 */

import { gsap } from "gsap";

/**
 * Animation configuration interface
 */
interface HeroAnimationConfig {
  taglineRef: HTMLElement | null;
  titleRef: HTMLElement | null;
  titleWords: HTMLElement[];
  descriptionRef: HTMLElement | null;
  ctaRef: HTMLElement | null;
  marqueeRef: HTMLElement | null;
}

/**
 * Checks if user prefers reduced motion
 */
const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Initializes hero entrance animations
 * 
 * Animates:
 * - Tagline (fade in + slide up)
 * - Title words (staggered fade in + slide up)
 * - Description (fade in + slide up with delay)
 * - CTA buttons (fade in + slide up with delay)
 */
export const initHeroEntrance = (config: HeroAnimationConfig): gsap.Context => {
  const ctx = gsap.context(() => {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion()) {
      // Set final state immediately
      gsap.set([config.taglineRef, config.titleWords, config.descriptionRef, config.ctaRef].filter(Boolean), {
        opacity: 1,
        y: 0,
      });
      return;
    }

    // Set initial state (hidden)
    gsap.set([config.taglineRef, config.titleWords, config.descriptionRef, config.ctaRef].filter(Boolean), {
      opacity: 0,
      y: 10,
    });

    // Create timeline for coordinated animations
    // Matches Framer Motion timing: spring animation with stagger
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Tagline animation (starts immediately)
    if (config.taglineRef) {
      tl.to(config.taglineRef, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      });
    }

    // Title words staggered animation (overlaps with tagline)
    // Stagger of 0.1s per word matches Framer Motion
    if (config.titleWords.length > 0) {
      tl.to(config.titleWords, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.3");
    }

    // Description animation with 0.5s delay (matches Framer Motion)
    if (config.descriptionRef) {
      tl.to(config.descriptionRef, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, "+=0.5");
    }

    // CTA buttons animation with 0.6s delay (matches Framer Motion)
    if (config.ctaRef) {
      tl.to(config.ctaRef, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, "+=0.1");
    }
  });

  return ctx;
};

/**
 * Initializes infinite marquee animation for hero images
 * 
 * Animates horizontal scroll with seamless loop
 * Matches Framer Motion behavior: x: ["-50%", "0%"] with 40s duration
 */
export const initHeroMarquee = (marqueeRef: HTMLElement | null): gsap.Context => {
  const ctx = gsap.context(() => {
    if (!marqueeRef) return;

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion()) {
      gsap.set(marqueeRef, { x: "0%" });
      return;
    }

    // Set initial position to -50% (matches Framer Motion initial state)
    gsap.set(marqueeRef, { x: "-50%" });

    // Create infinite animation from -50% to 0%
    // This creates a seamless loop since images are duplicated
    gsap.to(marqueeRef, {
      x: "0%",
      duration: 40,
      ease: "none",
      repeat: -1,
    });
  });

  return ctx;
};

/**
 * Cleanup function for hero animations
 */
export const cleanupHeroAnimations = (ctx: gsap.Context) => {
  ctx.revert();
};
