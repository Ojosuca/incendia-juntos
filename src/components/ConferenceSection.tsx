/**
 * Conference Section Component
 * 
 * Seção dedicada ao evento Incends Conference
 * Estilo consistente com o site
 * Botão de inscrição para Sympla
 */

import { useRef, useLayoutEffect } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { initConferenceSection, cleanupConferenceSection } from "@/animations/conferenceSection.gsap";

const ConferenceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = initConferenceSection({
      section: sectionRef.current,
      content: contentRef.current,
    });

    return () => {
      cleanupConferenceSection(ctx);
    };
  }, []);

  // Link do Sympla (substituir pela URL real)
  const symplaUrl = "https://www.sympla.com.br/evento/conf-incends-26/3242784?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnzIhNIBSzK2ioFY4-mdY9ArpLVHAzNCKEogUOtCuLhRdE-R5fJgXS26oCXWk_aem_Fnv9_oyX4DAPwiPDSSJuKw&referrer=l.instagram.com&referrer=l.instagram.com";

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-fire opacity-5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div ref={contentRef} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider mb-4">
              Próximo Evento
            </p>
            <h2 className="font-display text-5xl md:text-7xl text-foreground mb-6">
              INCENDS CONFERENCE
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Três dias intensos de busca, adoração e transformação. Uma experiência que vai marcar sua vida para sempre.
            </p>
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-fire flex items-center justify-center shadow-glow mb-4 mx-auto">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-sans font-bold text-lg text-foreground mb-2">
                Data
              </h3>
              <p className="text-muted-foreground">
                12 a 14 de Março
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-fire flex items-center justify-center shadow-glow mb-4 mx-auto">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-sans font-bold text-lg text-foreground mb-2">
                Horário
              </h3>
              <p className="text-muted-foreground">
                A definir
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-fire flex items-center justify-center shadow-glow mb-4 mx-auto">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-sans font-bold text-lg text-foreground mb-2">
                Local
              </h3>
              <p className="text-muted-foreground">
                Auditório Aprisquinho
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 mb-8">
            <p className="text-muted-foreground text-lg leading-relaxed text-center">
              A Incends Conference é mais que um evento. É um encontro transformador onde o fogo do Espírito Santo
              se move de forma poderosa. Prepare-se para três dias de adoração intensa, palavra profética e
              experiências que vão marcar sua jornada com Cristo.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => window.open(symplaUrl, "_blank", "noopener,noreferrer")}
              className="bg-gradient-fire hover:opacity-90 text-white font-sans font-bold text-lg px-8 py-6 shadow-glow"
            >
              Inscreva-se no Sympla
              <Calendar className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceSection;
