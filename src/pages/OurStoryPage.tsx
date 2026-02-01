import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Clock, Sparkles } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Input } from '@/components/ui/input';
import HeartIcon from '@/components/HeartIcon';

interface TimeCounter {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const OurStoryPage = () => {
  const [startDate, setStartDate] = useState<string>(() => {
    return localStorage.getItem('relationship_start_date') || '';
  });
  const [weddingDate, setWeddingDate] = useState<string>(() => {
    return localStorage.getItem('wedding_date') || '';
  });
  const [counter, setCounter] = useState<TimeCounter | null>(null);
  const [weddingCounter, setWeddingCounter] = useState<TimeCounter | null>(null);

  useEffect(() => {
    if (startDate) {
      localStorage.setItem('relationship_start_date', startDate);
    }
  }, [startDate]);

  useEffect(() => {
    if (weddingDate) {
      localStorage.setItem('wedding_date', weddingDate);
    }
  }, [weddingDate]);

  useEffect(() => {
    if (!startDate) return;

    const calculateTime = () => {
      const start = new Date(startDate);
      const now = new Date();
      
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      
      if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      
      if (months < 0) {
        years--;
        months += 12;
      }

      const diff = now.getTime() - start.getTime();
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setCounter({ years, months, days: totalDays, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  useEffect(() => {
    if (!weddingDate) {
      setWeddingCounter(null);
      return;
    }

    const calculateWeddingTime = () => {
      const wedding = new Date(weddingDate);
      const now = new Date();
      const diff = wedding.getTime() - now.getTime();

      if (diff <= 0) {
        setWeddingCounter(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setWeddingCounter({ years: 0, months: 0, days, hours, minutes, seconds });
    };

    calculateWeddingTime();
    const interval = setInterval(calculateWeddingTime, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

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

        {/* Relationship Start Date */}
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
          
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-secondary/50 max-w-xs"
          />

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

        {/* Wedding Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="romantic-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-accent" size={24} />
            <h2 className="font-display text-xl text-foreground">
              Nosso Casamento
            </h2>
          </div>

          <p className="text-muted-foreground mb-4">
            Estamos nos preparando para o dia mais especial das nossas vidas...
          </p>
          
          <Input
            type="date"
            value={weddingDate}
            onChange={(e) => setWeddingDate(e.target.value)}
            className="bg-secondary/50 max-w-xs"
          />

          {weddingCounter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <p className="text-muted-foreground mb-4 font-script text-xl">
                Faltam apenas...
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <CounterBox value={weddingCounter.days} label="dias" />
                <CounterBox value={weddingCounter.hours} label="horas" />
                <CounterBox value={weddingCounter.minutes} label="minutos" />
                <CounterBox value={weddingCounter.seconds} label="segundos" />
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 font-script text-2xl text-primary"
              >
                💍 Para sermos oficialmente um só! 💍
              </motion.p>
            </motion.div>
          )}

          {!weddingDate && (
            <div className="mt-6 text-center text-muted-foreground italic">
              <p>Defina a data do nosso grande dia...</p>
            </div>
          )}
        </motion.div>

        {/* Romantic Message */}
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
