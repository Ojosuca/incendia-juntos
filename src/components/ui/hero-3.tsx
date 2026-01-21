"use client";

import React, { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { initHeroEntrance, initHeroMarquee, cleanupHeroAnimations } from "@/animations/homeHero.gsap";
import { OptimizedImage } from "./optimized-image";

// Props interface for the component
interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  ctaSecondary?: string;
  onCtaClick?: () => void;
  onCtaSecondaryClick?: () => void;
  images: string[];
  className?: string;
}

// Reusable Button component styled like in the image
// Keeps Framer Motion for microinteractions (hover/tap)
const ActionButton = ({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      "w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 rounded-full font-sans font-bold text-base md:text-lg shadow-glow uppercase tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
      variant === "primary"
        ? "bg-gradient-fire text-white hover:opacity-90 focus:ring-primary"
        : "border-2 border-primary bg-background/50 backdrop-blur-sm text-primary hover:bg-primary hover:text-white focus:ring-primary",
    )}
  >
    {children}
  </motion.button>
);

// The main hero component
export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  ctaSecondary,
  onCtaClick,
  onCtaSecondaryClick,
  images,
  className,
}) => {
  // Refs for GSAP animations
  const taglineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Duplicate images for a seamless loop
  const duplicatedImages = [...images, ...images];

  // Check if title is a string to split into words
  const titleIsString = typeof title === "string";
  const titleWords = titleIsString ? title.split(" ") : [];

  // Initialize GSAP animations
  useLayoutEffect(() => {
    // Get all title word elements
    const titleWordElements: HTMLElement[] = [];
    if (titleRef.current && titleIsString) {
      const spans = titleRef.current.querySelectorAll("span");
      spans.forEach((span) => titleWordElements.push(span));
    }

    // Initialize entrance animations
    const entranceCtx = initHeroEntrance({
      taglineRef: taglineRef.current,
      titleRef: titleRef.current,
      titleWords: titleWordElements,
      descriptionRef: descriptionRef.current,
      ctaRef: ctaRef.current,
      marqueeRef: marqueeRef.current,
    });

    // Initialize marquee animation
    const marqueeCtx = initHeroMarquee(marqueeRef.current);

    // Cleanup on unmount
    return () => {
      cleanupHeroAnimations(entranceCtx);
      cleanupHeroAnimations(marqueeCtx);
    };
  }, [titleIsString]);

  return (
    <section
      id="home"
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-background flex flex-col items-center justify-center text-center px-4 py-20",
        className,
      )}
    >
      <div className="z-10 flex flex-col items-center max-w-6xl w-full">
        {/* Tagline */}
        <div
          ref={taglineRef}
          className="hero-entrance-initial mb-4 md:mb-6 inline-block rounded-full border-2 border-primary/30 bg-background/40 backdrop-blur-xl px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm font-sans font-bold text-primary uppercase tracking-wider shadow-glow"
        >
          {tagline}
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] text-foreground leading-none tracking-tighter mb-6 md:mb-8"
        >
          {titleIsString
            ? titleWords.map((word, i) => (
                <span
                  key={i}
                  className="hero-entrance-initial inline-block"
                >
                  {word}&nbsp;
                </span>
              ))
            : title}
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="hero-entrance-initial mt-4 md:mt-6 max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-sans px-4"
        >
          {description}
        </p>

        {/* Call to Action Buttons */}
        <div
          ref={ctaRef}
          className="hero-entrance-initial mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full px-4"
        >
          <ActionButton variant="primary" onClick={onCtaClick}>
            {ctaText}
          </ActionButton>
          {ctaSecondary && (
            <ActionButton variant="secondary" onClick={onCtaSecondaryClick}>
              {ctaSecondary}
            </ActionButton>
          )}
        </div>
      </div>

      {/* Animated Image Marquee */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 sm:h-1/3 md:h-2/5 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
        <div
          ref={marqueeRef}
          className="flex gap-2 sm:gap-3 md:gap-4"
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] h-32 sm:h-40 md:h-48 lg:h-64 flex-shrink-0"
              style={{
                rotate: `${index % 2 === 0 ? -2 : 5}deg`,
              }}
            >
              <OptimizedImage
                src={src}
                alt={`Imagem do culto ${index + 1}`}
                priority={index < 3} // Load first 3 images immediately
                className="w-full h-full object-cover rounded-lg sm:rounded-xl md:rounded-2xl shadow-md border-2 border-white/10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
