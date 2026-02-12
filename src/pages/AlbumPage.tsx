import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { MEMORIES } from '@/content/siteContent';

/**
 * Álbum fixo — fotos e vídeos vêm do código (siteContent.ts).
 * Adicione itens em MEMORIES e coloque arquivos em public/fotos/ e public/videos/.
 */
const AlbumPage = () => {
  const [selectedMemory, setSelectedMemory] = useState<(typeof MEMORIES)[0] | null>(null);

  if (MEMORIES.length === 0) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <ImageIcon className="text-primary" size={40} />
            </div>
            <h1 className="font-display text-4xl md:text-5xl mb-4">
              Álbum de Memórias
            </h1>
            <p className="font-script text-2xl text-primary">
              Momentos que guardamos no coração
            </p>
          </motion.div>
          <p className="text-center text-muted-foreground">
            Adicione fotos e vídeos em <code className="text-sm bg-muted px-1 rounded">src/content/siteContent.ts</code> na lista <code className="text-sm bg-muted px-1 rounded">MEMORIES</code> e coloque os arquivos em <code className="text-sm bg-muted px-1 rounded">public/fotos/</code> e <code className="text-sm bg-muted px-1 rounded">public/videos/</code>.
          </p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <ImageIcon className="text-primary" size={40} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl mb-4">
            Álbum de Memórias
          </h1>
          <p className="font-script text-2xl text-primary">
            Momentos que guardamos no coração
          </p>
        </motion.div>

        {/* Galeria */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {MEMORIES.map((memory) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedMemory(memory)}
            >
              {memory.type === 'image' ? (
                <img
                  src={memory.url}
                  alt={memory.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <video
                  src={memory.url}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  muted
                  preload="metadata"
                />
              )}
              {memory.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-white text-sm font-medium truncate">
                    {memory.caption}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedMemory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedMemory(null)}
            >
              <button
                className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full z-10"
                onClick={() => setSelectedMemory(null)}
                aria-label="Fechar"
              >
                <X size={32} />
              </button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-full max-h-[90vh] flex flex-col items-center"
              >
                {selectedMemory.type === 'image' ? (
                  <img
                    src={selectedMemory.url}
                    alt={selectedMemory.caption}
                    className="max-h-[90vh] rounded-lg object-contain"
                  />
                ) : (
                  <video
                    src={selectedMemory.url}
                    controls
                    autoPlay
                    className="max-h-[90vh] rounded-lg"
                  />
                )}
                {selectedMemory.caption && (
                  <p className="text-white mt-2 text-center font-script text-xl">
                    {selectedMemory.caption}
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
};

export default AlbumPage;
