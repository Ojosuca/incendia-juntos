import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "./ui/button";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: MapPin,
      label: "Endereço",
      value: "Conjunto Habitacional Angelim, 23 - Angelim, São Luis - MA",
      link: "https://maps.app.goo.gl/6noG45EM45tDMg736",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: "(11) 99999-9999",
      link: "https://wa.me/5511999999999",
    },
    {
      icon: Mail,
      label: "E-mail",
      value: "contato@incends.com.br",
      link: "mailto:contato@incends.com.br",
    },
  ];

  const socialMedia = [
    { icon: Instagram, link: "https://www.instagram.com/incendiadosmovement/", name: "@incendiadosmovement" },
    { icon: Facebook, link: "https://facebook.com/incends", name: "/incends" },
    { icon: Youtube, link: "https://youtube.com/incends", name: "/incends" },
  ];

  return (
    <section id="contato" ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
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
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.1 }}
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
                  </motion.a>
                );
              })}
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="pt-8 border-t border-border"
            >
              <h3 className="font-sans font-bold text-lg text-foreground mb-6">
                Redes Sociais
              </h3>
              <div className="flex gap-4">
                {socialMedia.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-gradient-fire flex items-center justify-center shadow-glow hover:shadow-xl transition-all"
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <Button
                size="lg"
                className="w-full bg-gradient-fire hover:opacity-90 text-white font-sans font-semibold text-lg"
                onClick={() => {
                  window.open("https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre o Incends.", "_blank");
                }}
              >
                Falar com a liderança
              </Button>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
