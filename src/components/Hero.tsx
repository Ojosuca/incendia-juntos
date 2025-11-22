import { AnimatedMarqueeHero } from "./ui/hero-3";
import heroImage from "@/assets/IMG_2116.jpg";
import communityImage from "@/assets/IMG_4361.jpg";
import fireTexture from "@/assets/IMG_8249.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  // Array de imagens do culto para o marquee
  const cultoImages = [
    heroImage,
    communityImage,
    fireTexture,
    heroImage,
    communityImage,
    fireTexture,
  ];

  // Funções de navegação
  const handleCtaClick = () => {
    navigate("/contato");
  };

  const handleCtaSecondaryClick = () => {
    navigate("/ministerios");
  };

  return (
    <AnimatedMarqueeHero
      tagline="Vamos Incendiar Juntos?"
      title="INCENDIADOS"
      description="Não somos um culto comum. Somos o lugar onde o fogo de Deus transforma vidas e desperta uma geração — uma fé, uma chama."
      ctaText="Quero fazer parte"
      ctaSecondary="Conhecer ministérios"
      onCtaClick={handleCtaClick}
      onCtaSecondaryClick={handleCtaSecondaryClick}
      images={cultoImages}
    />
  );
};

export default Hero;