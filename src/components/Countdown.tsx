import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <div className="relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-32 bg-gradient-fire opacity-5 blur-3xl" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-fire opacity-0 group-hover:opacity-20 blur-xl transition-opacity rounded-3xl" />

            {/* Card with Glassmorphism */}
            <div className="relative bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-xl border-2 border-border group-hover:border-primary/50 rounded-3xl overflow-hidden shadow-glow transition-all">
              {/* Inner Glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-fire opacity-50" />

              <div className="p-6 md:p-8 text-center">
                {/* Value Display */}
                <motion.div
                  key={unit.value}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="relative"
                >
                  <div className="font-display text-6xl md:text-8xl bg-gradient-fire bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                    {unit.value.toString().padStart(2, "0")}
                  </div>

                  {/* Separator Line */}
                  <div className="w-12 h-1 bg-gradient-fire mx-auto mb-3 rounded-full" />

                  {/* Label */}
                  <div className="text-muted-foreground font-sans text-xs md:text-sm uppercase tracking-widest font-bold">
                    {unit.label}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
