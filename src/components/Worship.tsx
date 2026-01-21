import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Music2, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import fireTexture from "@/assets/fire-texture.webp";

const Worship = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const recentMessages = [
    {
      title: "O Fogo que Transforma",
      speaker: "Pr. Lucas",
      date: "10 Nov 2025",
      type: "Pregação",
    },
    {
      title: "Incendiados por Cristo",
      speaker: "Incends Music",
      date: "03 Nov 2025",
      type: "Louvor",
    },
    {
      title: "Uma Geração Sem Máscaras",
      speaker: "Pr. Lucas",
      date: "27 Out 2025",
      type: "Pregação",
    },
  ];

  return (
    <section
      id="louvor"
      ref={ref}
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src={fireTexture} 
          alt="" 
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
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
            A adoração não termina no amém. Reviva os louvores que tocaram no seu coração e reflita na palavra que transforma vidas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Left: Spotify Playlist Embed */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-8 shadow-glow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-fire flex items-center justify-center shadow-glow">
                  <Music2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-2xl text-foreground">
                    Louvores dos Cultos
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Playlist oficial no Spotify
                  </p>
                </div>
              </div>

              {/* Spotify Embed - Substitui a playlist simulada */}
              <div className="mb-6">
                <iframe 
                  src="https://open.spotify.com/embed/playlist/5GnTuspwbfBtDIb8cQxY7y?utm_source=generator&theme=0"
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                ></iframe>
              </div>

              <Button
                size="lg"
                onClick={() =>
                  window.open("https://open.spotify.com/playlist/5GnTuspwbfBtDIb8cQxY7y?si=fOiLqeRwS8e8hJNDk2-dWw&pi=hbhbJMf-RMy1s", "_blank")
                }
                className="w-full bg-gradient-fire hover:opacity-90 text-white font-sans font-bold"
              >
                Seguir no Spotify
              </Button>
            </div>
          </motion.div>

          {/* Right: Message Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-xl border-2 border-border rounded-3xl p-8 shadow-glow h-full">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-8 h-8 text-primary" />
                <h3 className="font-sans font-bold text-2xl text-foreground">
                  Última Mensagem
                </h3>
              </div>

              <div className="space-y-6">
                {/* Pregador */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                    Pregador
                  </p>
                  <p className="text-lg font-sans font-bold text-foreground">
                    Pr. Lucas  
                  </p>
                </div>

                {/* Tema */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                    Tema
                  </p>
                  <p className="text-xl font-display text-foreground uppercase tracking-tight">
                    O Fogo que Transforma
                  </p>
                </div>

                {/* Palavra Base */}
                <div className="bg-gradient-fire/10 rounded-2xl p-4 border border-primary/20">
                  <p className="text-xs uppercase tracking-wider text-primary mb-2 font-semibold">
                    Palavra Base
                  </p>
                  <p className="text-sm font-sans text-foreground italic">
                    "E eu rogarei ao Pai, e ele vos dará outro Consolador, para
                    que fique convosco para sempre"
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 font-semibold">
                    João 14:16
                  </p>
                </div>

                {/* Reflexão */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                    Reflexão
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Deus está chamando nossa geração para ser incendiada pelo
                    Espírito Santo. Não podemos viver uma vida morna, precisamos
                    abraçar o fogo transformador que queima tudo que não é de
                    Deus e acende uma paixão genuína por Cristo.
                  </p>
                </div>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white font-sans font-semibold"
                >
                  Assistir Mensagem
                </Button>
              </div>
            </div>
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
                <p className="text-xs text-muted-foreground">{message.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Worship;