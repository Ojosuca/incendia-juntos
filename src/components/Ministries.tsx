import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Music, Sparkles, Video, Monitor, Heart, Users, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const Ministries = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const ministries = [
    {
      id: "louvor",
      name: "Louvor",
      icon: Music,
      description: "Lidere a adoração e conduza o povo à presença de Deus através da música.",
      details: "O ministério de louvor é a porta de entrada para a presença de Deus em nossos cultos. Aqui você desenvolverá suas habilidades musicais enquanto aprende a ser um verdadeiro adorador.",
      requirements: "Ter conhecimento musical básico, disposição para ensaios semanais e coração de adorador.",
    },
    {
      id: "danca",
      name: "Dança",
      icon: Sparkles,
      description: "Expresse adoração através de movimentos e coreografias que glorificam a Deus.",
      details: "Na dança profética, cada movimento é uma oração, cada gesto é adoração. Junte-se a nós para adorar com todo o seu ser.",
      requirements: "Disponibilidade para ensaios, dedicação e paixão por expressar adoração através do corpo.",
    },
    {
      id: "midia",
      name: "Mídia",
      icon: Video,
      description: "Capture momentos e conte histórias através de fotografia e vídeo.",
      details: "Cada culto tem momentos únicos que merecem ser registrados. Ajude-nos a documentar como Deus está se movendo em nossa geração.",
      requirements: "Conhecimento básico de fotografia/vídeo, equipamento próprio (desejável) e olhar criativo.",
    },
    {
      id: "multimidia",
      name: "Multimídia",
      icon: Monitor,
      description: "Opere projeção, iluminação e som para criar experiências impactantes.",
      details: "A tecnologia é uma ferramenta poderosa para amplificar a mensagem do evangelho. Seja parte da equipe que cria a atmosfera dos nossos cultos.",
      requirements: "Interesse em tecnologia, disponibilidade para treinamento e pontualidade nos cultos.",
    },
    {
      id: "intercessao",
      name: "Intercessão",
      icon: Heart,
      description: "Seja um guerreiro de oração que sustenta o ministério no mundo espiritual.",
      details: "Antes de cada culto, um time se reúne para orar e preparar o terreno espiritual. Sua oração faz a diferença.",
      requirements: "Vida de oração consistente, maturidade espiritual e compromisso com o ministério.",
    },
    {
      id: "acolhimento",
      name: "Acolhimento",
      icon: Users,
      description: "Receba as pessoas com amor e faça todos se sentirem em casa.",
      details: "Você será o primeiro sorriso que muitos verão ao chegarem. Seu papel é crucial para que todos se sintam bem-vindos e parte da família.",
      requirements: "Simpatia, pontualidade e coração para servir as pessoas.",
    },
  ];

  const handleCardClick = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section id="ministerios" ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
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
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-6">
            QUERO SER FAMÍLIA INCENDS
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Encontre seu lugar e use seus dons para transformar vidas. Todo mundo tem espaço aqui!
          </p>
        </motion.div>

        {/* Ministries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ministries.map((ministry, index) => {
            const Icon = ministry.icon;
            const isExpanded = expandedCard === ministry.id;

            return (
              <motion.div
                key={ministry.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all hover:shadow-glow border-border ${
                    isExpanded ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handleCardClick(ministry.id)}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 rounded-xl bg-gradient-fire flex items-center justify-center shadow-glow">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </div>

                    <div>
                      <h3 className="font-sans text-xl font-bold text-foreground mb-2">
                        {ministry.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {ministry.description}
                      </p>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{
                        height: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-border space-y-4">
                        <div>
                          <h4 className="font-sans font-semibold text-sm text-foreground mb-2">
                            Sobre o ministério:
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {ministry.details}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-sans font-semibold text-sm text-foreground mb-2">
                            Requisitos:
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {ministry.requirements}
                          </p>
                        </div>
                        <Button
                          className="w-full bg-gradient-fire hover:opacity-90 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              `https://wa.me/5511999999999?text=Olá! Tenho interesse em servir no ministério de ${ministry.name}.`,
                              "_blank"
                            );
                          }}
                        >
                          Quero Servir em {ministry.name}
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA for New Converts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="bg-gradient-fire rounded-2xl p-8 md:p-12 text-center shadow-glow"
        >
          <h3 className="font-display text-3xl md:text-5xl text-white mb-4">
            NOVO POR AQUI?
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Se você acabou de entregar sua vida a Jesus, queremos te ajudar a dar os primeiros passos nessa nova jornada!
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-sans font-bold text-lg px-8 py-6"
            onClick={() => {
              window.open(
                "https://wa.me/5511999999999?text=Olá! Sou novo convertido e gostaria de conhecer mais sobre o Incends.",
                "_blank"
              );
            }}
          >
            Encontrar Meu Lugar
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Ministries;
