import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import Countdown from "./Countdown";
import { Button } from "./ui/button";

// Importe as imagens dos banners (ajuste os caminhos conforme necessário)
import cultoBanner from "../assets/img-9999.webp";
import conferenciaBanner from "../assets/CONF-INCENDS-26.webp";
import acampamentoBanner from "../assets/EMBREVEON.webp";

const Events = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Função para adicionar ao calendário
  const addToCalendar = (event: any) => {
    if (event.date === "A Definir" || event.time === "A definir") {
      alert("Em breve teremos mais informações sobre este evento. Aguarde!");
      return;
    }

    let startDate: Date;

    // Calcula a data de início baseada no tipo de evento
    if (event.date === "Todo Sábado") {
      const now = new Date();
      const daysUntilSaturday = (6 - now.getDay() + 7) % 7;
      startDate = new Date(now);
      startDate.setDate(now.getDate() + daysUntilSaturday);
      startDate.setHours(18, 0, 0, 0);
    } else if (event.date === "12-14 Mar" || event.date === "12-14 Nov") {
      // Conferência - assumindo início no dia 12 às 19h
      startDate = new Date(2026, 2, 12, 19, 0, 0); // Março é mês 2 (0-indexed)
    } else {
      startDate = new Date();
    }

    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // +2 horas

    // Tenta detectar o dispositivo para oferecer a melhor experiência
    const isAppleDevice = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

    if (isAppleDevice) {
      // Para dispositivos Apple, oferece download do arquivo ICS
      generateAndDownloadICS(event, startDate, endDate);
    } else {
      // Para outros dispositivos, abre Google Calendar (mais universal)
      openGoogleCalendar(event, startDate, endDate);
    }
  };

  // Função para gerar e baixar arquivo ICS
  const generateAndDownloadICS = (event: any, startDate: Date, endDate: Date) => {
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
UID:${Math.random().toString(36).substring(2)}@incendiados
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Função para abrir Google Calendar
  const openGoogleCalendar = (event: any, startDate: Date, endDate: Date) => {
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
      details: event.description,
      location: event.location,
    });

    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
  };

  const upcomingEvents = [
    {
      title: "Culto Incendiados",
      date: "Todo Sábado",
      time: "18h00",
      location: "Igreja Batista do Angelim",
      description: "Nosso encontro semanal de louvor, palavra e comunhão.",
      image: cultoBanner,
      hasDefinedSchedule: true,
    },
    {
      title: "Conferência Incendiados",
      date: "12-14 Mar",
      time: "19h30",
      location: "Auditório Aprisquinho",
      description: "Três dias intensos de busca, adoração e transformação.",
      image: conferenciaBanner,
      hasDefinedSchedule: true,
    },
    {
      title: "Acampamento Incendiados",
      date: "A Definir",
      time: "A Definir",
      location: "A Definir",
      description: "Um fim de semana de retiro espiritual e crescimento na fé.",
      image: acampamentoBanner,
      hasDefinedSchedule: false,
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
          <Countdown />
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all group"
            >
              {/* Banner Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="p-6 space-y-4">
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
                  onClick={() => addToCalendar(event)}
                >
                  {event.hasDefinedSchedule ? "Adicionar ao calendário" : "Em breve"}
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