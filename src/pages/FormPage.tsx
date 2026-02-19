import { motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { GOOGLE_FORM_EMBED_URL } from '@/content/siteContent';

const FormPage = () => {
  const hasForm = Boolean(GOOGLE_FORM_EMBED_URL?.trim());

  if (!hasForm) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <ClipboardList className="text-primary" size={40} />
            </div>
            <h1 className="font-display text-4xl mb-2">Questionário</h1>
            <p className="font-script text-2xl text-primary mb-6">
              Formulário via Google Forms
            </p>

            <div className="romantic-card p-6 text-left space-y-4 text-muted-foreground">
              <p>Para ativar o questionário:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Acesse <a href="https://forms.google.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">forms.google.com</a></li>
                <li>Crie um formulário com suas perguntas (ex: &quot;Podemos nos encontrar?&quot;)</li>
                <li>Clique em <strong>Enviar</strong> → ícone <strong>&lt;/&gt;</strong> (incorporar)</li>
                <li>Copie o <strong>src</strong> do iframe (URL que começa com docs.google.com)</li>
                <li>Cole em <code className="bg-muted px-1 rounded text-xs">src/content/siteContent.ts</code> em <code className="bg-muted px-1 rounded text-xs">GOOGLE_FORM_EMBED_URL</code></li>
              </ol>
            </div>
          </motion.div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <ClipboardList className="text-primary" size={32} />
          </div>
          <h1 className="font-display text-3xl text-center">Questionário</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="romantic-card overflow-hidden p-0"
        >
          <iframe
            src={GOOGLE_FORM_EMBED_URL}
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Formulário"
            className="min-h-[500px] w-full"
          >
            Carregando…
          </iframe>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default FormPage;
