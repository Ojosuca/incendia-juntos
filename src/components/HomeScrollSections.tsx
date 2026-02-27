/**
 * Home Scroll Sections Component
 *
 * Seções de scroll com animações inspiradas em Benjamin Jochims
 * Agora contém: SpeakersSection (Preletores) + CTA
 */

import { useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { initHomeScrollSections, cleanupHomeScrollSections } from "@/animations/homeScrollSections.gsap";
import SpeakersSection from "./SpeakersSection";

const HomeScrollSections = () => {
    // Refs for CTA section GSAP animations
    const ctaSectionRef = useRef<HTMLElement>(null);
    const ctaTitleRef = useRef<HTMLHeadingElement>(null);
    const ctaButtonRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = initHomeScrollSections({
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
            {/* Speakers Section (Preletores) */}
            <SpeakersSection />

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
