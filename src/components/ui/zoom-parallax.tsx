"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  // Posições responsivas para cada imagem
  const positions = [
    "top-0 left-0",
    "top-[-10vh] sm:top-[-20vh] md:top-[-30vh] left-[2vw] sm:left-[5vw]",
    "top-[5vh] sm:top-0 md:top-[-10vh] left-[-15vw] sm:left-[-20vw] md:left-[-25vw]",
    "top-[10vh] sm:top-[5vh] md:top-0 left-[15vw] sm:left-[20vw] md:left-[27.5vw]",
    "top-[25vh] sm:top-[27.5vh] left-[2vw] sm:left-[5vw]",
    "top-[25vh] sm:top-[27.5vh] left-[-15vw] sm:left-[-20vw] md:left-[-22.5vw]",
    "top-[20vh] sm:top-[22.5vh] left-[15vw] sm:left-[20vw] md:left-[25vw]",
  ];

  const sizes = [
    "h-[20vh] w-[30vw] sm:h-[22vh] sm:w-[28vw] md:h-[25vh] md:w-[25vw]",
    "h-[25vh] w-[40vw] sm:h-[28vh] sm:w-[38vw] md:h-[30vh] md:w-[35vw]",
    "h-[35vh] w-[25vw] sm:h-[40vh] sm:w-[22vw] md:h-[45vh] md:w-[20vw]",
    "h-[20vh] w-[30vw] sm:h-[23vh] sm:w-[27vw] md:h-[25vh] md:w-[25vw]",
    "h-[20vh] w-[25vw] sm:h-[22vh] sm:w-[22vw] md:h-[25vh] md:w-[20vw]",
    "h-[20vh] w-[35vw] sm:h-[23vh] sm:w-[32vw] md:h-[25vh] md:w-[30vw]",
    "h-[12vh] w-[18vw] sm:h-[13vh] sm:w-[17vw] md:h-[15vh] md:w-[15vw]",
  ];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];
          const position = positions[index % positions.length];
          const size = sizes[index % sizes.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute flex items-center justify-center ${position}`}
            >
              <div className={`relative ${size}`}>
                <img
                  src={src || "/placeholder.svg"}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover rounded-lg md:rounded-xl shadow-2xl border-2 border-white/10"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
