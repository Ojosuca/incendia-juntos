import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import Countdown from "./Countdown";
import { Button } from "./ui/button";

const Events = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Próximo culto: exemplo de data (próxima sexta às 19h30)
  const getNextFriday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilFriday);
    nextFriday.setHours(19, 30, 0, 0);
    return nextFriday;
  };

  const upcomingEvents = [
    {
      title: "Culto de Jovens",
      date: "Toda Sexta",
      time: "19h30",
      location: "Igreja Principal",
      description: "Nosso encontro semanal de louvor, palavra e comunhão.",
    },
    {
      title: "Retiro Incends",
      date: "15-17 Nov",
      time: "Todo dia",
      location: "A definir",
      description: "Três dias intensos de busca, adoração e transformação.",
    },
    {
      title: "Noite de Adoração",
      date: "30 Nov",
      time: "20h00",
      location: "Auditório",
      description: "Uma noite dedicada à adoração profunda e intimidade com Deus.",
    },
  ];

  return (
    <section id="agenda" ref={ref} className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-sans font-semibold text-sm uppercase tracking-wider mb-4">
            Próximos Encontros
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-6">
            AGENDA
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Não perca os momentos que vão incendiar sua vida com o fogo do Espírito Santo
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="font-sans text-2xl font-bold text-foreground mb-2">
              Próximo Culto em:
            </h3>
          </div>
          <Countdown targetDate={getNextFriday()} />
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-glow transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-sans text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="w-12 h-12 rounded-xl bg-gradient-fire flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-4"
                >
                  Adicionar ao calendário
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
