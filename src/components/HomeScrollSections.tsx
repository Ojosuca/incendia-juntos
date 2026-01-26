/**
 * Home Scroll Sections Component
 * 
 * Seções de scroll com animações inspiradas em Benjamin Jochims
 * Animações progressivas, suaves, com elementos entrando conforme scroll
 */

import { useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Users, Heart } from "lucide-react";
import { initHomeScrollSections, cleanupHomeScrollSections } from "@/animations/homeScrollSections.gsap";

const HomeScrollSections = () => {
    // Refs for GSAP animations
    const missionSectionRef = useRef<HTMLElement>(null);
    const missionTitleRef = useRef<HTMLHeadingElement>(null);
    const missionTextRef = useRef<HTMLDivElement>(null);

    const communitySectionRef = useRef<HTMLElement>(null);
    const communityTitleRef = useRef<HTMLHeadingElement>(null);
    const communityCardsRef = useRef<HTMLDivElement>(null);

    const ctaSectionRef = useRef<HTMLElement>(null);
    const ctaTitleRef = useRef<HTMLHeadingElement>(null);
    const ctaButtonRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = initHomeScrollSections({
            missionSection: missionSectionRef.current,
            missionTitle: missionTitleRef.current,
            missionText: missionTextRef.current,
            communitySection: communitySectionRef.current,
            communityTitle: communityTitleRef.current,
            communityCards: communityCardsRef.current,
            ctaSection: ctaSectionRef.current,
            ctaTitle: ctaTitleRef.current,
            ctaButton: ctaButtonRef.current,
        });

        return () => {
            cleanupHomeScrollSections(ctx);
        };
    }, []);

    return (
        <>
            {/* Mission/Vision Section */}
            <section
                ref={missionSectionRef}
                className="py-32 md:py-40 bg-background relative overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary opacity-5 blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary opacity-5 blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 mb-6">
                                <Flame className="w-6 h-6 text-primary" />
                                <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider">
                                    Nossa Missão
                                </p>
                            </div>
                            <h2
                                ref={missionTitleRef}
                                className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-8 leading-tight"
                            >
                                INCENDIADOS
                                <br />
                                PELO ESPÍRITO
                            </h2>
                        </div>

                        <div ref={missionTextRef} className="space-y-8">
                            <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed text-center">
                                Somos uma comunidade apaixonada por Deus, movida pelo fogo do Espírito Santo.
                                Nossa missão é levar a chama do evangelho a cada coração, transformando vidas
                                através do poder de Cristo.
                            </p>
                            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed text-center">
                                Acreditamos que cada pessoa foi criada para viver em plenitude, experimentando
                                o amor incondicional de Deus e compartilhando essa verdade com o mundo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Section */}
            <section
                ref={communitySectionRef}
                className="py-32 md:py-40 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden"
            >
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <Users className="w-6 h-6 text-primary" />
                            <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider">
                                Comunidade
                            </p>
                        </div>
                        <h2
                            ref={communityTitleRef}
                            className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-8 leading-tight"
                        >
                            JUNTOS SOMOS
                            <br />
                            MAIS FORTES
                        </h2>
                    </div>

                    <div ref={communityCardsRef} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Card 1 */}
                        <div
                            data-community-card
                            className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-xl bg-gradient-fire flex items-center justify-center shadow-glow mb-6">
                                <Flame className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-display text-3xl text-foreground mb-4">
                                ADORAÇÃO
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Cultos vibrantes onde o Espírito Santo se move livremente, transformando
                                corações através da adoração genuína.
                            </p>
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-300" />
                        </div>

                        {/* Card 2 */}
                        <div
                            data-community-card
                            className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-xl bg-gradient-fire flex items-center justify-center shadow-glow mb-6">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-display text-3xl text-foreground mb-4">
                                COMUNHÃO
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Relacionamentos verdadeiros construídos sobre o amor de Cristo, onde cada
                                pessoa é valorizada e acolhida.
                            </p>
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-colors duration-300" />
                        </div>

                        {/* Card 3 */}
                        <div
                            data-community-card
                            className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-xl bg-gradient-fire flex items-center justify-center shadow-glow mb-6">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-display text-3xl text-foreground mb-4">
                                SERVIÇO
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Oportunidades para servir e fazer a diferença, usando seus dons para
                                impactar vidas e glorificar a Deus.
                            </p>
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-300" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section
                ref={ctaSectionRef}
                className="py-32 md:py-40 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden"
            >
                {/* Decorative gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2
                            ref={ctaTitleRef}
                            className="font-display text-5xl md:text-7xl lg:text-9xl text-foreground mb-8 leading-tight"
                        >
                            VENHA FAZER
                            <br />
                            PARTE
                        </h2>
                        <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed mb-12 max-w-2xl mx-auto">
                            A chama espera por você. Junte-se a nós e experimente o poder transformador
                            do Espírito Santo em sua vida.
                        </p>
                        <div ref={ctaButtonRef}>
                            <Button
                                size="lg"
                                className="bg-gradient-fire hover:opacity-90 text-white font-sans font-bold text-lg px-12 py-8 shadow-glow text-xl"
                                onClick={() => window.open("https://ibangelim.com.br/", "_blank")}
                            >
                                Conheça Nossa Igreja
                                <ArrowRight className="ml-3 w-6 h-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomeScrollSections;
