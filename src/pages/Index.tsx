import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  Calendar,
  Music,
  Heart,
  Camera,
  MapPin,
} from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem("hasSeenLoading");

    if (hasSeenLoading) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("hasSeenLoading", "true");
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  const sections = [
    {
      icon: Users,
      title: "Sobre Nós",
      description: "Conheça nossa história, propósito e valores que nos movem",
      path: "/sobre",
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: Calendar,
      title: "Eventos",
      description: "Fique por dentro dos próximos cultos e encontros especiais",
      path: "/eventos",
      gradient: "from-orange-500/20 to-orange-500/5",
    },
    {
      icon: Music,
      title: "Louvor e Palavra",
      description: "Ouça nossas playlists e reflita sobre as últimas mensagens",
      path: "/louvor",
      gradient: "from-red-500/20 to-red-500/5",
    },
    {
      icon: Heart,
      title: "Ministérios",
      description: "Descubra como você pode servir e fazer a diferença",
      path: "/ministerios",
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: Camera,
      title: "Galeria",
      description: "Reviva os momentos que Deus tem marcado em nossa jornada",
      path: "/galeria",
      gradient: "from-orange-500/20 to-orange-500/5",
    },
    {
      icon: MapPin,
      title: "Contato",
      description: "Entre em contato conosco e encontre nossa localização",
      path: "/contato",
      gradient: "from-red-500/20 to-red-500/5",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />

        {/* Sections Grid */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider mb-4">
                Explore
              </p>
              <h2 className="font-display text-5xl md:text-7xl text-foreground mb-6">
                DESCUBRA MAIS
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Navegue pelas diferentes áreas e conheça tudo sobre o Incendiados
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.path}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group w-full"
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${section.gradient} backdrop-blur-sm border border-border/50 p-6 md:p-8 h-full transition-all duration-300 hover:shadow-glow hover:border-primary/50`}
                    >
                      <div className="relative z-10">
                        <div className="mb-6 inline-flex p-4 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-display text-3xl text-foreground mb-4">
                          {section.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 font-sans">
                          {section.description}
                        </p>
                        <Button
                          onClick={() => navigate(section.path)}
                          variant="outline"
                          className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-sans font-semibold group/btn"
                        >
                          Ver mais
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>

                      {/* Decorative element */}
                      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-300" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
