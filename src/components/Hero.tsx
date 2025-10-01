import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-worship.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Jovens adorando"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
      </div>

      {/* Glassmorphism Cards - Floating Elements */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-20 left-10 w-64 h-64 bg-gradient-fire/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-glow hidden lg:block"
        style={{ transform: "rotate(-15deg)" }}
      />
      
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-32 right-20 w-48 h-48 bg-primary/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-glow hidden lg:block"
        style={{ transform: "rotate(20deg)" }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Brutalist Title with Glassmorphism Container */}
          <div className="text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block relative"
            >
              <div className="absolute -inset-8 bg-gradient-fire/5 backdrop-blur-xl rounded-3xl border border-white/10" />
              <h1 className="font-display text-7xl md:text-9xl lg:text-[14rem] text-foreground leading-none tracking-tighter relative mix-blend-difference">
                INCENDS
              </h1>
            </motion.div>
          </div>

          {/* Glassmorphism Card with Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-background/40 backdrop-blur-xl rounded-3xl border border-white/20 p-8 md:p-12 shadow-glow">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="font-sans text-3xl md:text-5xl text-foreground font-bold mb-6 text-center uppercase tracking-tight"
              >
                Vamos Incendiar Juntos
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="font-sans text-lg md:text-xl text-muted-foreground text-center mb-8"
              >
                Um culto onde jovens encontram propósito, comunidade e transformação genuína através de Cristo
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button
                  size="lg"
                  onClick={() => window.location.href = "#contato"}
                  className="bg-gradient-fire hover:opacity-90 text-white font-sans font-bold text-lg px-8 py-6 shadow-glow uppercase tracking-wide"
                >
                  Quero fazer parte
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = "#ministerios"}
                  className="border-2 border-primary bg-background/50 backdrop-blur-sm text-primary hover:bg-primary hover:text-white font-sans font-bold text-lg px-8 py-6 uppercase tracking-wide"
                >
                  Conhecer ministérios
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#sobre"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
        >
          <span className="text-sm font-sans">Role para baixo</span>
          <ChevronDown className="w-6 h-6" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
