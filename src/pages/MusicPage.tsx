import { motion } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { SONGS } from '@/content/siteContent';

/**
 * Músicas fixas — vêm do código (siteContent.ts).
 * Suporta arquivos locais em /public/musicas/ ou links do Spotify.
 */
const MusicPage = () => {
  if (SONGS.length === 0) {
    return (
      <PageWrapper>
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Music size={40} className="mx-auto mb-4 text-primary" />
            <h1 className="font-display text-4xl">Nossas Músicas</h1>
            <p className="font-script text-2xl text-primary">
              A trilha sonora do nosso amor
            </p>
          </motion.div>
          <p className="text-center text-muted-foreground">
            Adicione músicas em <code className="text-sm bg-muted px-1 rounded">src/content/siteContent.ts</code> na lista <code className="text-sm bg-muted px-1 rounded">SONGS</code>.
          </p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container mx-auto max-w-4xl px-4">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Music size={40} className="mx-auto mb-4 text-primary" />
          <h1 className="font-display text-4xl">Nossas Músicas</h1>
          <p className="font-script text-2xl text-primary">
            A trilha sonora do nosso amor
          </p>
        </motion.div>

        {/* LISTA DE MÚSICAS */}
        <div className="space-y-6">
          {SONGS.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="romantic-card p-6"
            >
              {song.message && (
                <p className="font-script text-xl text-primary mb-4 text-center">
                  "{song.message}"
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">{song.title}</h3>

                <div className="flex items-center gap-3 flex-wrap">
                  {song.audioSrc && (
                    <audio
                      controls
                      className="h-10 min-w-[200px] max-w-full"
                      src={song.audioSrc}
                    >
                      Seu navegador não suporta áudio.
                    </audio>
                  )}
                  {song.spotifyUrl && (
                    <Button
                      variant="ghost"
                      onClick={() => window.open(song.spotifyUrl!, '_blank')}
                    >
                      <ExternalLink className="mr-2" />
                      Ouvir no Spotify
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default MusicPage;
