import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import HeartIcon from '@/components/HeartIcon';

/** Data em que começamos a namorar — 29/10/2022 em horário local (evita virar 28/10 por UTC) */
const RELATIONSHIP_START_DATE = new Date(2022, 9, 29); // ano, mês (0 = jan), dia

interface TimeCounter {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const OurStoryPage = () => {
  const [counter, setCounter] = useState<TimeCounter | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(RELATIONSHIP_START_DATE.getTime());
      const now = new Date();
      const diff = now.getTime() - start.getTime();
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setCounter({ years: 0, months: 0, days: totalDays, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const CounterBox = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="romantic-card text-center flex-1 min-w-[80px]"
    >
      <span className="block font-display text-3xl md:text-4xl text-primary">
        {value}
      </span>
      <span className="text-muted-foreground text-sm">{label}</span>
    </motion.div>
  );

  /** Exibe 29/10/2022 (data em horário local) */
  const formattedStartDate = RELATIONSHIP_START_DATE.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="text-primary" size={40} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Nossa História
          </h1>
          <p className="font-script text-2xl text-primary">
            Cada segundo é precioso
          </p>
        </motion.div>

        {/* Quando tudo começou — data fixa 29/10/2022 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="romantic-card mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="text-primary" size={24} />
            <h2 className="font-display text-xl text-foreground">
              Quando tudo começou
            </h2>
          </div>

          <p className="text-muted-foreground mb-2">
            Começamos a namorar em <span className="font-semibold text-foreground">{formattedStartDate}</span>
          </p>

          {counter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
            >
              <p className="text-center text-muted-foreground mb-4 font-script text-xl">
                Juntos há...
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <CounterBox value={counter.days} label="dias" />
                <CounterBox value={counter.hours} label="horas" />
                <CounterBox value={counter.minutes} label="minutos" />
                <CounterBox value={counter.seconds} label="segundos" />
              </div>

              <div className="mt-6 text-center">
                <HeartIcon className="text-primary mx-auto animate-heart-beat" size={32} />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Para sempre — símbolo de infinito, sem data de casamento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="romantic-card text-center py-12"
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-display text-7xl md:text-8xl text-primary block mb-4 tracking-tighter"
            aria-hidden
          >
            ∞
          </motion.span>
          <HeartIcon className="text-primary mx-auto mb-4" size={28} />
          <p className="font-script text-xl text-muted-foreground italic">
            Sem data, sem fim
          </p>
        </motion.div>

        {/* Mensagem */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 p-6"
        >
          <p className="font-script text-2xl text-primary">
            "O tempo ao seu lado é o único que quero contar."
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default OurStoryPage;
