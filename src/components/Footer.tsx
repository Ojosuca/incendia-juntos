import { Flame, Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-dark border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-8 h-8 text-primary" />
              <span className="font-display text-2xl text-foreground">
                INCENDS
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Culto de jovens comprometido em incendiar uma geração com o fogo
              do Espírito Santo.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans font-bold text-foreground mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {["Sobre", "Agenda", "Ministérios", "Galeria", "Contato"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* as redes Social do footer */}
          <div>
            <h3 className="font-sans font-bold text-foreground mb-4">
              Redes Sociais
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/incendiadosmovement/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-gradient-fire flex items-center justify-center transition-all group"
              >
                <Instagram className="w-5 h-5 text-foreground group-hover:text-white" />
              </a>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Incends. Vamos Incendiar Juntos.
            </p>
            <p className="text-muted-foreground text-sm">
              Desenvolvido com 🔥 para a glória de Deus
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
