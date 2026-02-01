import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import HeartIcon from '@/components/HeartIcon';
import { LETTER_CONTENT } from '@/content/siteContent';

/**
 * Carta imutável — o texto vem direto do código (siteContent.ts).
 * Não depende de banco nem do navegador; aparece igual em qualquer lugar.
 */
const LetterPage = () => {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="text-primary" size={40} />
          </div>
          <h1 className="font-display text-4xl mb-2">Carta Aberta</h1>
          <p className="font-script text-2xl text-primary">
            Palavras seladas no coração
          </p>
        </motion.div>

        {/* Carta (sempre fixa, vinda do código) */}
        <div className="paper-texture rounded-lg shadow-romantic bg-card p-8 relative">
          <div className="absolute top-4 right-4 flex items-center gap-1 text-muted-foreground">
            <Lock size={16} />
            <span className="text-sm">imutável</span>
          </div>

          <div className="font-script text-xl whitespace-pre-wrap">
            {LETTER_CONTENT}
          </div>
        </div>

        {/* Decorativo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-12"
        >
          <HeartIcon className="mx-auto text-primary mb-4" size={36} />
          <p className="font-script text-xl text-muted-foreground italic">
            "O que é verdadeiro, o tempo não apaga."
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default LetterPage;
