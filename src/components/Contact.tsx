import { useRef, useLayoutEffect } from "react";
import { MapPin, Users, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import { initContactAnimations, cleanupContactAnimations } from "@/animations/contact.gsap";

const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = initContactAnimations({
      container: containerRef.current,
      header: headerRef.current,
      cardsContainer: cardsContainerRef.current,
      mapContainer: mapContainerRef.current,
      ctaButton: ctaButtonRef.current,
    });

    return () => cleanupContactAnimations(ctx);
  }, []);

  const contactInfo = [
    {
      icon: MapPin,
      label: "Endereço",
      value: "Conjunto Habitacional Angelim, 23 - Angelim, São Luis - MA",
      link: "https://maps.app.goo.gl/6noG45EM45tDMg736",
    },
    {
      icon: Users,
      label: "Comunidade",
      value: "Participe da comunidade incends",
      link: "https://chat.whatsapp.com/IjJiXcA37E0CHGiUo5qkIl?mode=gi_t",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@incendiadosmovement",
      link: "https://www.instagram.com/incendiadosmovement/",
    },
  ];

  return (
    <section id="contato" ref={containerRef} className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16"
        >
          <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider mb-4">
            Fale conosco
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-6">
            CONTATO
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tem alguma dúvida ou quer saber mais sobre nós? Entre em contato!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div ref={cardsContainerRef} className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-contact-card
                    className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:shadow-glow transition-all group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-fire flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold text-foreground mb-1">
                        {item.label}
                      </h3>
                      <p className="text-muted-foreground group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* CTA Button */}
            <div ref={ctaButtonRef}>
              <Button
                size="lg"
                className="w-full bg-gradient-fire hover:opacity-90 text-white font-sans font-semibold text-lg"
                onClick={() => {
                  window.open("https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre o Incends.", "_blank");
                }}
              >
                Falar com a liderança
              </Button>
            </div>
          </div>

          {/* Map */}
          <div
            ref={mapContainerRef}
            className="h-[500px] rounded-2xl overflow-hidden shadow-card"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3985.9185449990046!2d-44.23616519116772!3d-2.5334727974342637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7f691c598a50bfd%3A0xe98d989a0d37851a!2sIgreja%20Batista%20do%20Angelim!5e0!3m2!1spt-BR!2sbr!4v1761244304124!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Incends"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
