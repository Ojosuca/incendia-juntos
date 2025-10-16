import { AnimatedMarqueeHero } from "./ui/hero-3";
import heroImage from "@/assets/hero-worship.jpg";
import communityImage from "@/assets/community.jpg";
import fireTexture from "@/assets/fire-texture.jpg";

const Hero = () => {
  // Array de imagens do culto para o marquee
  const cultoImages = [
    heroImage,
    communityImage,
    fireTexture,
    heroImage,
    communityImage,
    fireTexture,
  ];

  return (
    <AnimatedMarqueeHero
      tagline="Vamos lá, Alguém"
      title="INCENDS"
      description="Um culto onde jovens encontram propósito, comunidade e transformação genuína através de Cristo. Vamos Incendiar Juntos!"
      ctaText="Quero fazer parte"
      ctaSecondary="Conhecer ministérios"
      onCtaClick={() => window.location.href = "#contato"}
      onCtaSecondaryClick={() => window.location.href = "#ministerios"}
      images={cultoImages}
    />
  );
};

export default Hero;
