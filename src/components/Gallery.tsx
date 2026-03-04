import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  // Optimized animation props
  const animationProps = useMemo(() => ({
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: prefersReducedMotion ? 0 : 0.4 },
  }), [isInView, prefersReducedMotion]);

  return (
    <section id="galeria" ref={ref} className="py-24 md:py-32 bg-muted/30 min-h-[60vh] flex flex-col justify-center">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          {...animationProps}
          className="text-center"
        >
          <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider mb-4">
            Em construção
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-6">
            NOSSA GALERIA
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-aut o mb-12">
            Essa página funcionará em breve. Estamos preparando a página
            para compartilhar com você!
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            variant="default"
            onClick={() => navigate("/")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans font-semibold group"
          >
            <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Retornar para a página inicial
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
