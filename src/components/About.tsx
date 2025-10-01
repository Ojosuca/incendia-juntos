import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Users, Sparkles } from "lucide-react";
import communityImage from "@/assets/community.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Heart,
      title: "Transformação Genuína",
      description: "Viva uma experiência real com Cristo, sem máscaras, apenas verdade e amor.",
    },
    {
      icon: Users,
      title: "Comunidade Forte",
      description: "Conecte-se com jovens que compartilham a mesma paixão por Jesus.",
    },
    {
      icon: Sparkles,
      title: "Propósito e Chamado",
      description: "Descubra seu propósito e seja incendiado pelo Espírito Santo.",
    },
  ];

  return (
    <section id="sobre" ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <img
                src={communityImage}
                alt="Comunidade Incends"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-fire opacity-20 mix-blend-multiply" />
            </div>
            <motion.div
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-32 h-32 bg-primary rounded-full blur-3xl opacity-20"
            />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="text-primary font-sans font-semibold text-sm uppercase tracking-wider mb-4"
              >
                Vamos lá, Alguém
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="font-display text-5xl md:text-7xl text-foreground mb-6"
              >
                SOBRE NÓS
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="text-muted-foreground text-lg leading-relaxed"
              >
                O Incends é mais do que um culto de jovens. É um movimento de jovens apaixonados
                por Jesus, dispostos a abrir mão de si mesmos para viver o verdadeiro evangelho.
                Aqui, você não será apenas mais um na multidão - você terá uma família, um
                propósito e uma chama que nunca se apagará.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-fire flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-lg text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
