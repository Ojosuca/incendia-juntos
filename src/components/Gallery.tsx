import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import heroImage from "@/assets/IMG_4144.webp";
import communityImage from "@/assets/IMG_8221.webp";
import fireTexture from "@/assets/img-9968.webp";
import incends57 from "@/assets/INCENDS-57.webp";

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Optimized animation props
  const animationProps = useMemo(() => ({
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: prefersReducedMotion ? 0 : 0.4 },
  }), [isInView, prefersReducedMotion]);

  const cardAnimationProps = useMemo(() => (index: number) => ({
    initial: prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 },
    animate: isInView ? { opacity: 1, scale: 1 } : {},
    transition: {
      duration: prefersReducedMotion ? 0 : 0.3,
      delay: prefersReducedMotion ? 0 : Math.min(index * 0.05, 0.15)
    },
  }), [isInView, prefersReducedMotion]);

  // Placeholder images (reusing generated ones for demo)
  const images = [
    {
      src: heroImage,
      alt: "Momento de adoração",
      span: "md:col-span-2 md:row-span-2",
    },
    { src: communityImage, alt: "Comunidade reunida", span: "" },
    { src: fireTexture, alt: "Atmosfera de fogo", span: "" },
    { src: heroImage, alt: "Louvor intenso", span: "md:col-span-2" },
    { src: communityImage, alt: "Juventude incendiada", span: "" },
    { src: fireTexture, alt: "Momento especial", span: "" },
  ];

  return (
    <section id="galeria" ref={ref} className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          {...animationProps}
          className="text-center mb-16"
        >
          <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider mb-4">
            Momentos que marcam
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-6">
            GALERIA
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Veja como Deus tem se movido entre nós e os momentos que eternizamos
            juntos
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {images.map((image, index) => (
            <motion.div
              key={index}
              {...cardAnimationProps(index)}
              className={`relative group overflow-hidden rounded-2xl ${image.span}`}
            >
              <div className="aspect-square w-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <p className="text-white font-sans text-sm font-medium">
                    {image.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          {...animationProps}
          className="text-center"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-sans font-semibold group"
          >
            Ver galeria completa
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
