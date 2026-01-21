import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExpandableCard } from "./ui/expandable-card";
import { Button } from "./ui/button";
import heroImage from "@/assets/IMG_8221.webp";
import communityImage from "@/assets/IMG_7796.webp";
import galleryWorship1 from "@/assets/IMG_0283.webp";
import galleryWorshipBand from "@/assets/IMG_2116.webp";
import galleryPrayer from "@/assets/123a3049.webp";
import galleryYouth from "@/assets/IMG_3708.webp";

const Ministries = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const ministries = [
    {
      id: "louvor",
      name: "Incendiados Music",
      image: galleryWorshipBand,
      description: "Ministério de Adoração",
      shortDescription:
        "Lidere a adoração e conduza o povo à presença de Deus através da música.",
      details:
        "O ministério de louvor é a porta de entrada para a presença de Deus em nossos cultos. Aqui você desenvolverá suas habilidades musicais enquanto aprende a ser um verdadeiro adorador.",
      requirements:
        "Ter conhecimento musical básico, disposição para ensaios semanais e coração de adorador.",
    },
    {
      id: "danca",
      name: "Incendiados Dance",
      image: heroImage,
      description: "Ministério de Dança Profética",
      shortDescription:
        "Expresse adoração através de movimentos e coreografias que glorificam a Deus.",
      details:
        "Na dança profética, cada movimento é uma oração, cada gesto é adoração. Junte-se a nós para adorar com todo o seu ser.",
      requirements:
        "Disponibilidade para ensaios, dedicação e paixão por expressar adoração através do corpo.",
    },
    {
      id: "midia",
      name: "Mídia",
      image: communityImage,
      description: "Ministério de Comunicação",
      shortDescription:
        "Capture momentos e conte histórias através de fotografia e vídeo.",
      details:
        "Cada culto tem momentos únicos que merecem ser registrados. Ajude-nos a documentar como Deus está se movendo em nossa geração.",
      requirements:
        "Conhecimento básico de fotografia/vídeo, equipamento próprio (desejável) e olhar criativo.",
    },
    {
      id: "multimidia",
      name: "Multimídia",
      image: galleryWorship1,
      description: "Ministério de Multimídia",
      shortDescription:
        "Opere projeção e iluminação para criar experiências impactantes.",
      details:
        "A tecnologia é uma ferramenta poderosa para amplificar a mensagem do evangelho. Seja parte da equipe que cria a atmosfera dos nossos cultos.",
      requirements:
        "Interesse em tecnologia, disponibilidade para treinamento e pontualidade nos cultos.",
    },
    {
      id: "intercessao",
      name: "Técnica",
      image: galleryPrayer,
      description: "Ministério da Técnica",
      shortDescription:
        "Seja um operador de som para criar uma experiência sonora digna ao culto ao nosso Deus",
      details:
        "Antes, durante e depois de cada culto, o ministério é responsável por toda sonoplastia do culto.",
      requirements:
        "Conhecimento básico ou desejo de aprender sonoplastia, disponibilidade para treinamentos e pontualidade nos cultos.",
    },
    {
      id: "acolhimento",
      name: "Acolhimento",
      image: galleryYouth,
      description: "Ministério de Recepção",
      shortDescription:
        "Receba as pessoas com amor e faça todos se sentirem em casa.",
      details:
        "Você será o primeiro sorriso que muitos verão ao chegarem. Seu papel é crucial para que todos se sintam bem-vindos e parte da família.",
      requirements: "Simpatia, pontualidade e coração para servir as pessoas.",
    },
  ];

  return (
    <section
      id="ministerios"
      ref={ref}
      className="py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider mb-4">
            Vamos lá, Alguém?
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-6">
            Venha servir conosco
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Deus te deu um dom único para fazer a diferença. Encontre seu lugar e veja como usar sua voz, sua criatividade e sua energia no ministério
          </p>
        </motion.div>

        {/* Ministries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ministries.map((ministry, index) => (
            <motion.div
              key={ministry.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <ExpandableCard
                title={ministry.name}
                src={ministry.image}
                description={ministry.description}
                classNameExpanded="[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-medium"
              >
                <h4>Sobre o Ministério</h4>
                <p>{ministry.details}</p>

                <h4>Requisitos Espirituais</h4>
                <p>
                  Compromisso com Cristo, vida de oração, frequência nos cultos
                </p>

                <h4>Requisitos Técnicos</h4>
                <p>{ministry.requirements}</p>

                <Button
                  className="w-full bg-gradient-fire hover:opacity-90 text-white font-sans font-bold uppercase tracking-wide mt-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    const message = encodeURIComponent(
                      `Olá! Tenho interesse em servir no ministério de ${ministry.name}.`,
                    );
                    window.open(
                      `https://wa.me/5511999999999?text=${message}`,
                      "_blank",
                    );
                  }}
                >
                  Quero Servir em {ministry.name}
                </Button>
              </ExpandableCard>
            </motion.div>
          ))}
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
            Se você acabou de entregar sua vida a Jesus, queremos te ajudar a
            dar os primeiros passos nessa nova jornada!
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-sans font-bold text-lg px-8 py-6"
            onClick={() => {
              const message = encodeURIComponent(
                "Olá! Sou novo convertido e gostaria de conhecer mais sobre o Incends.",
              );
              window.open(
                `https://wa.me/5511999999999?text=${message}`,
                "_blank",
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
