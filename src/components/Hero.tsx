import { AnimatedMarqueeHero } from "./ui/hero-3";
import heroImage from "@/assets/IMG_2116.webp";
import communityImage from "@/assets/IMG_4361.webp";
import fireTexture from "@/assets/IMG_8249.webp";
import { useNavigate } from "react-router-dom";
import { useImagePreload } from "@/hooks/use-image-preload";

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

  // Preload apenas as primeiras 3 imagens críticas (as outras carregam lazy)
  useImagePreload([heroImage, communityImage, fireTexture]);

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
      description="Não somos um culto comum. Somos o lugar onde o fogo de Deus transforma vidas e desperta uma geração uma fé, uma chama."
      ctaText="Quero fazer parte"
      ctaSecondary="Conhecer ministérios"
      onCtaClick={handleCtaClick}
      onCtaSecondaryClick={handleCtaSecondaryClick}
      images={cultoImages}
    />
  );
};

export default Hero;