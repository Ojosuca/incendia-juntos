/**
 * Portal Hero GSAP Animation
 * 
 * Simula entrada através da TV com diferentes velocidades de zoom por camada
 * Scroll controla a animação (scrub)
 * Pin por ~1.5-2 viewports
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PortalHeroConfig {
  container: HTMLElement | null;
  background: HTMLElement | null;
  tvWrapper: HTMLElement | null;
  tvFrame: HTMLElement | null;
  tvScreen: HTMLElement | null;
  tvGlow: HTMLElement | null;
  screenContent: HTMLElement | null;
  flameIcon: HTMLElement | null;
  dateDisplay: HTMLElement | null;
}

/**
 * Checks if user prefers reduced motion
 */
const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Initializes portal hero animation
 * 
 * Animation behavior:
 * - Background: parallax lento, leve blur
 * - TV Wrapper: centralizado, leve recuo
 * - TV Frame: recua e desaparece
 * - TV Glow: aumenta e suaviza
 * - TV Screen: zoom agressivo, vira viewport
 * - Screen Content: fade out durante zoom
 * - Pin for ~1.5-2 viewports
 * - Scrub controlled by scroll
 */
export const initPortalHero = (config: PortalHeroConfig): gsap.Context => {
  const ctx = gsap.context(() => {
    if (!config.container || !config.background || !config.tvWrapper ||
      !config.tvFrame || !config.tvScreen || !config.tvGlow) {
      return;
    }

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion()) {
      // Set final state immediately
      gsap.set(config.background, { opacity: 0 });
      gsap.set(config.tvWrapper, { opacity: 0 });
      gsap.set(config.tvFrame, { opacity: 0, scale: 0.8 });
      gsap.set(config.tvGlow, { opacity: 0 });
      gsap.set(config.tvScreen, { scale: 4, opacity: 1 });
      return;
    }

    // Set initial states
    gsap.set(config.background, {
      scale: 1,
      opacity: 1,
    });

    gsap.set(config.tvWrapper, {
      scale: 1,
      opacity: 1,
    });

    gsap.set(config.tvFrame, {
      scale: 1,
      opacity: 1,
    });

    gsap.set(config.tvGlow, {
      scale: 1,
      opacity: 0.4,
    });

    gsap.set(config.tvScreen, {
      scale: 1,
      opacity: 1,
    });

    if (config.screenContent) {
      gsap.set(config.screenContent, {
        opacity: 1,
      });
    }

    // Set initial states for lateral elements
    if (config.flameIcon) {
      gsap.set(config.flameIcon, {
        opacity: 1,
        x: 0,
      });
    }

    if (config.dateDisplay) {
      gsap.set(config.dateDisplay, {
        opacity: 1,
        x: 0,
      });
    }

    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: config.container,
        start: "top top",
        end: "+=200%", // Pin for ~2 viewports
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Background: parallax lento
    tl.to(
      config.background,
      {
        scale: 1.1,
        opacity: 0.5,
        duration: 1,
        ease: "power2.out",
      },
      0
    );

    // TV Wrapper: leve recuo
    tl.to(
      config.tvWrapper,
      {
        scale: 0.95,
        duration: 0.4,
        ease: "power2.out",
      },
      0
    );

    // TV Frame: recua e desaparece
    tl.to(
      config.tvFrame,
      {
        scale: 0.85,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      },
      0.2
    );

    // TV Glow: aumenta e suaviza
    tl.to(
      config.tvGlow,
      {
        scale: 1.5,
        opacity: 0.6,
        duration: 0.5,
        ease: "power2.out",
      },
      0
    );

    // Depois glow desaparece
    tl.to(
      config.tvGlow,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      0.5
    );

    // TV Screen: zoom agressivo, vira viewport
    tl.to(
      config.tvScreen,
      {
        scale: 5,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
      },
      0.3
    );

    // Screen Content: fade out durante zoom
    if (config.screenContent) {
      tl.to(
        config.screenContent,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        },
        0.4
      );
    }

    // Flame Icon: fade out and move left
    if (config.flameIcon) {
      tl.to(
        config.flameIcon,
        {
          opacity: 0,
          x: -50,
          duration: 0.5,
          ease: "power2.in",
        },
        0.3
      );
    }

    // Date Display: fade out and move right
    if (config.dateDisplay) {
      tl.to(
        config.dateDisplay,
        {
          opacity: 0,
          x: 50,
          duration: 0.5,
          ease: "power2.in",
        },
        0.3
      );
    }

    // Mobile optimization
    const mm = gsap.matchMedia();

    mm.add("(max-width: 768px)", () => {
      // Less zoom, faster transition on mobile
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: config.container,
          start: "top top",
          end: "+=150%", // Shorter pin on mobile
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      mobileTl.to(config.background, {
        scale: 1.05,
        opacity: 0.5,
        duration: 1,
      }, 0);

      mobileTl.to(config.tvWrapper, {
        scale: 0.98,
        duration: 0.4,
      }, 0);

      mobileTl.to(config.tvFrame, {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
      }, 0.1);

      mobileTl.to(config.tvGlow, {
        scale: 1.3,
        opacity: 0.5,
        duration: 0.4,
      }, 0);

      mobileTl.to(config.tvGlow, {
        opacity: 0,
        duration: 0.2,
      }, 0.4);

      mobileTl.to(config.tvScreen, {
        scale: 3,
        opacity: 1,
        duration: 1,
      }, 0.2);

      if (config.screenContent) {
        mobileTl.to(config.screenContent, {
          opacity: 0,
          duration: 0.3,
        }, 0.3);
      }
    });
  });

  return ctx;
};

/**
 * Cleanup function for portal hero animations
 */
export const cleanupPortalHero = (ctx: gsap.Context) => {
  ctx.revert();
};

