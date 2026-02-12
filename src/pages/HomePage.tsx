import { motion } from 'framer-motion';
import PageWrapper from '@/components/PageWrapper';
import HeartIcon from '@/components/HeartIcon';
import coupleHero from '@/assets/couple-hero.jpg';

const HomePage = () => {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-romantic mb-12"
        >
          <div className="aspect-video md:aspect-[21/9] relative">
            <img
              src={coupleHero}
              alt="Nosso amor"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            
            {/* Romantic quote overlay */}
            <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-12 px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center"
              >
                <HeartIcon 
                  className="text-primary mx-auto mb-4" 
                  size={40} 
                  animate 
                />
                <h1 className="font-script text-3xl md:text-5xl lg:text-6xl text-white drop-shadow-lg mb-2">
                  Eu te amo
                </h1>
                <p className="font-display text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
                  Sinto sua falta todos os dias e meu coração é seu, para sempre.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Left Card */}
          <div className="romantic-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <HeartIcon className="text-primary" size={32} />
            </div>
            <h2 className="font-display text-2xl text-foreground mb-3">
              Nosso Amor
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Cada dia ao seu lado é uma nova página da nossa história. 
              Você é meu sonho realizado, minha paz, meu lar.
            </p>
          </div>

          {/* Right Card */}
          <div className="romantic-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full gold-shimmer flex items-center justify-center">
              <span className="font-script text-2xl text-accent-foreground">∞</span>
            </div>
            <h2 className="font-display text-2xl text-foreground mb-3">
              Para Sempre
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Não importa a distância ou o tempo, nosso amor 
              é eterno. Estamos nos preparando para um futuro juntos.
            </p>
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mt-12 p-8"
        >
          <blockquote className="font-script text-2xl md:text-3xl text-primary italic">
            "Amar você é o melhor de mim."
          </blockquote>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-border" />
            <HeartIcon className="text-primary" size={16} />
            <div className="h-px w-12 bg-border" />
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
