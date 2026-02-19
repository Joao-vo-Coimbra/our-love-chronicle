import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import HeartIcon from '@/components/HeartIcon';

const promises = [
  'Eu lutarei até o fim por nós',
  'Eu esperarei por você',
  'O novo início virá para sempre',
  'Eu te amo além dessa vida',
  'Cuidarei de você assim como manda a Bíblia',
  'Farei de tudo pra realizar cada sonho seu',
  'Sou seu fã incondicional',
];

const PedidoPage = () => {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="text-primary" size={40} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl mb-2">Pedido</h1>
        </motion.div>

        {/* Símbolo de infinito */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-display text-8xl md:text-9xl text-primary block tracking-tighter" aria-hidden>
            ∞
          </span>
        </motion.div>

        {/* Promessas */}
        <div className="space-y-4">
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="romantic-card p-6 text-center"
            >
              <div className="flex items-center justify-center gap-3">
                <HeartIcon className="text-primary flex-shrink-0" size={24} />
                <p className="font-script text-xl md:text-2xl text-foreground">
                  {promise}
                </p>
                <HeartIcon className="text-primary flex-shrink-0" size={24} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mensagem final */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 p-6"
        >
          <p className="font-script text-2xl md:text-3xl text-primary italic">
            "Para sempre, sem data, sem fim."
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default PedidoPage;
