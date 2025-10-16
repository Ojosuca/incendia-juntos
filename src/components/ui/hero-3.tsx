"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
const ActionButton = ({ 
  children, 
  variant = "primary",
  onClick 
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
      "px-8 py-3 rounded-full font-sans font-bold text-lg shadow-glow uppercase tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
      variant === "primary" 
        ? "bg-gradient-fire text-white hover:opacity-90 focus:ring-primary" 
        : "border-2 border-primary bg-background/50 backdrop-blur-sm text-primary hover:bg-primary hover:text-white focus:ring-primary"
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
  // Animation variants for the text content
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  // Duplicate images for a seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <section
      id="home"
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-background flex flex-col items-center justify-center text-center px-4 py-20",
        className
      )}
    >
      <div className="z-10 flex flex-col items-center max-w-6xl">
        {/* Tagline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="mb-6 inline-block rounded-full border-2 border-primary/30 bg-background/40 backdrop-blur-xl px-6 py-2 text-sm font-sans font-bold text-primary uppercase tracking-wider shadow-glow"
        >
          {tagline}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="font-display text-7xl md:text-9xl lg:text-[12rem] text-foreground leading-none tracking-tighter mb-8"
        >
          {typeof title === 'string' ? (
            title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={FADE_IN_ANIMATION_VARIANTS}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))
          ) : (
            title
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-3xl text-xl md:text-2xl text-muted-foreground font-sans"
        >
          {description}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <ActionButton variant="primary" onClick={onCtaClick}>
            {ctaText}
          </ActionButton>
          {ctaSecondary && (
            <ActionButton variant="secondary" onClick={onCtaSecondaryClick}>
              {ctaSecondary}
            </ActionButton>
          )}
        </motion.div>
      </div>

      {/* Animated Image Marquee */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 md:h-2/5 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
        <motion.div
          className="flex gap-4"
          animate={{
            x: ["-50%", "0%"],
            transition: {
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] h-48 md:h-64 flex-shrink-0"
              style={{
                rotate: `${(index % 2 === 0 ? -2 : 5)}deg`,
              }}
            >
              <img
                src={src}
                alt={`Imagem do culto ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl shadow-md border-2 border-white/10"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
