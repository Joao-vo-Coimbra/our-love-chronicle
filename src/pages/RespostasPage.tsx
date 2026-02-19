import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { GOOGLE_RESPONSES_LINK } from '@/content/siteContent';

const RespostasPage = () => {
  const hasLink = Boolean(GOOGLE_RESPONSES_LINK?.trim());

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="text-primary" size={40} />
          </div>
          <h1 className="font-display text-4xl mb-2">Respostas</h1>
          <p className="font-script text-2xl text-primary mb-8">
            Suas respostas estão no Google
          </p>

          {hasLink ? (
            <Button
              size="lg"
              onClick={() => window.open(GOOGLE_RESPONSES_LINK, '_blank')}
              className="gap-2"
            >
              <ExternalLink size={20} />
              Ver respostas no Google Sheets
            </Button>
          ) : (
            <div className="romantic-card p-6 text-left space-y-3 text-muted-foreground">
              <p>Configure o link da planilha para abrir direto:</p>
              <p className="text-sm">
                No <code className="bg-muted px-1 rounded">siteContent.ts</code>, defina <code className="bg-muted px-1 rounded">GOOGLE_RESPONSES_LINK</code> com a URL da sua planilha do Google (a que fica vinculada ao formulário).
              </p>
              <p className="text-sm">
                Ou acesse seu Google Form → <strong>Respostas</strong> para ver as respostas.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default RespostasPage;
