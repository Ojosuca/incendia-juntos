import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Music2, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import fireTexture from "@/assets/fire-texture.jpg";

const Worship = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const recentMessages = [
    {
      title: "O Fogo que Transforma",
      speaker: "Pr. João Silva",
      date: "10 Nov 2024",
      type: "Pregação",
    },
    {
      title: "Incendiados por Cristo",
      speaker: "Ministério de Louvor",
      date: "03 Nov 2024",
      type: "Louvor",
    },
    {
      title: "Uma Geração Sem Máscaras",
      speaker: "Pr. Maria Santos",
      date: "27 Out 2024",
      type: "Pregação",
    },
  ];

  return (
    <section id="louvor" ref={ref} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <img src={fireTexture} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider mb-4">
            Adoração e Ensino
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-6">
            LOUVOR E PALAVRA
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experiências transformadoras através da adoração genuína e do ensino bíblico profundo
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Featured Video/Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-glow group">
              <div className="aspect-video bg-gradient-dark flex items-center justify-center">
                <div className="text-center space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-gradient-fire flex items-center justify-center mx-auto cursor-pointer shadow-glow"
                  >
                    <Play className="w-10 h-10 text-white ml-1" />
                  </motion.div>
                  <div>
                    <h3 className="font-sans font-bold text-xl text-foreground mb-2">
                      Último Culto
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Assista à gravação do nosso último encontro
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-fire flex items-center justify-center shadow-glow">
                <Music2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-xl text-foreground mb-2">
                  Louvor Autêntico
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nossa adoração não é apenas música - é um estilo de vida. Cada cântico é uma
                  declaração de rendição total a Cristo, conduzindo o povo à presença genuína de Deus.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-fire flex items-center justify-center shadow-glow">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-xl text-foreground mb-2">
                  Palavra que Transforma
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ensinamos a Palavra sem rodeios, sem máscaras, sem diluição. É a verdade do
                  evangelho aplicada à realidade da nossa geração, trazendo transformação genuína.
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-gradient-fire hover:opacity-90 text-white font-sans font-semibold w-full md:w-auto"
            >
              Ver todas as mensagens
            </Button>
          </motion.div>
        </div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-sans text-2xl font-bold text-foreground mb-8 text-center">
            Mensagens Recentes
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {recentMessages.map((message, index) => (
              <motion.div
                key={message.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-glow transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-gradient-fire text-white text-xs font-semibold rounded-full">
                    {message.type}
                  </span>
                  <Play className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 className="font-sans font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {message.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-1">
                  {message.speaker}
                </p>
                <p className="text-xs text-muted-foreground">
                  {message.date}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Worship;
