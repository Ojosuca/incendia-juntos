import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/CONF-INCENDS-26.webp";

interface PortalHeroProps {
  className?: string;
}

const PortalHero = ({ className }: PortalHeroProps) => {
  return (
    <section
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for better text/button visibility if needed, though user wanted the image itself */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-24 md:pb-32">

        {/* Subscription Button */}
        <Button
          size="lg"
          className="bg-gradient-fire hover:opacity-90 text-white font-sans font-bold text-lg px-8 py-6 shadow-glow transform hover:scale-105 transition-all duration-300 animate-pulse-subtle"
          onClick={() => {
            window.open("https://www.sympla.com.br/evento/conf-incends-26/3242784?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnzIhNIBSzK2ioFY4-mdY9ArpLVHAzNCKEogUOtCuLhRdE-R5fJgXS26oCXWk_aem_Fnv9_oyX4DAPwiPDSSJuKw&referrer=l.instagram.com&referrer=l.instagram.com", "_blank");
          }}
        >
          INSCREVA-SE AQUI
          <ArrowRight className="ml-3 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default PortalHero;
