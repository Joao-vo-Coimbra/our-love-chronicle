import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Save, Lock } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import HeartIcon from '@/components/HeartIcon';
import { supabase } from '@/integrations/supabase/client';

/**
 * ✨ CARTA FIXA INICIAL
 * 👉 você pode escrever tudo aqui
 * 👉 isso só aparece se ainda NÃO existir carta no Supabase
 */
const INITIAL_LETTER = `
Meu amor,

Desde o dia em que nossas histórias se cruzaram, tudo ganhou um novo sentido.
Cada detalhe, cada conversa, cada silêncio compartilhado se transformou em lar.

Essa carta é para eternizar o que o tempo jamais deve apagar.
Que ela seja lida com o coração, hoje e sempre.

Com todo o meu amor. 💖
`;

const LetterPage = () => {
  const [letter, setLetter] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  // 🔹 BUSCAR CARTA DO SUPABASE (SEGURA)
  useEffect(() => {
    const fetchLetter = async () => {
      const { data, error } = await supabase
        .from('letters')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        // 📌 Carta já existe → trava
        setLetter(data[0].content);
        setIsLocked(true);
      } else {
        // 📌 Ainda não existe → usa a carta inicial
        setLetter(INITIAL_LETTER.trim());
        setIsLocked(false);
      }

      setLoading(false);
    };

    fetchLetter();
  }, []);

  // 🔒 SALVAR CARTA (UMA ÚNICA VEZ)
  const saveLetter = async () => {
    if (!letter.trim()) return;

    await supabase.from('letters').insert({
      content: letter,
    });

    setIsLocked(true);
    setSaved(true);
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="text-center py-20 text-muted-foreground">
          Carregando carta...
        </div>
      </PageWrapper>
    );
  }

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

        {/* Carta */}
        <div className="paper-texture rounded-lg shadow-romantic bg-card p-8 relative">
          {isLocked && (
            <div className="absolute top-4 right-4 flex items-center gap-1 text-muted-foreground">
              <Lock size={16} />
              <span className="text-sm">imutável</span>
            </div>
          )}

          {!isLocked ? (
            <>
              <Textarea
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
                className="min-h-[350px] font-script text-xl bg-transparent border-none resize-none"
              />

              <div className="flex justify-center mt-6">
                <Button onClick={saveLetter}>
                  <Save className="mr-2" size={18} />
                  Selar carta 💕
                </Button>
              </div>
            </>
          ) : (
            <div className="font-script text-xl whitespace-pre-wrap">
              {letter}
            </div>
          )}

          {saved && (
            <p className="text-center mt-4 text-primary">
              Carta guardada para sempre 💖
            </p>
          )}
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
