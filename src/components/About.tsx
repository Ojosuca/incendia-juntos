import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Users, Sparkles } from "lucide-react";
import communityImage from "@/assets/IMG_5092.webp";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Heart,
      title: "Transformação Genuína",
      description:
        "Viva uma experiência real com Cristo, sem máscaras, apenas verdade e amor.",
    },
    {
      icon: Users,
      title: "Comunidade Forte",
      description:
        "Aqui, você é parte viva do Corpo de Cristo — encontra família, propósito e uma chama que nada apaga.",
    },
    {
      icon: Sparkles,
      title: "Propósito e Chamado",
      description:
        "Descubra seu propósito e seja incendiado pelo Espírito Santo.",
    },
  ];

  return (
    <section
      id="sobre"
      ref={ref}
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-fire opacity-5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider mb-4">
            Vamos lá, Alguém
          </p>
          <h2 className="font-display text-6xl md:text-8xl text-foreground mb-6 tracking-tight">
            SOBRE NÓS
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Image with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-fire opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
              <div className="relative rounded-3xl overflow-hidden border-4 border-white/10">
                <img
                  src={communityImage}
                  alt="Comunidade Incends"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                O Incendiados é o cumprimento da promessa. "Derramarei do meu Espírito sobre toda a carne..." Somos a geração profetizada por Joel, jovens e adolescentes incendiados pelo Espírito Santo, que renunciam a si mesmos para viver não uma religião, mas o derramamento poderoso do evangelho de Cristo.
              </p>
            </div>

            <div className="bg-gradient-fire/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
              <p className="text-foreground text-lg leading-relaxed font-semibold">
                Aqui, você não será apenas mais um na multidão - você terá uma
                família, um propósito e uma chama que nunca se apagará.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-fire opacity-0 group-hover:opacity-10 blur-xl transition-opacity" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 h-full hover:border-primary/50 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-fire flex items-center justify-center shadow-glow mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-sans font-bold text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
