import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface Song {
  id: string;
  title: string;
  spotify_url: string;
  message: string;
}

const MusicPage = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 BUSCAR MÚSICAS DO SUPABASE
  useEffect(() => {
    const fetchSongs = async () => {
      const { data } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: true });

      if (data) setSongs(data);
      setLoading(false);
    };

    fetchSongs();
  }, []);

  if (loading) {
    return (
      <PageWrapper>
        <div className="text-center py-20 text-muted-foreground">
          Carregando músicas...
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
          {songs.map((song) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="romantic-card p-6"
            >
              <p className="font-script text-xl text-primary mb-4 text-center">
                “{song.message}”
              </p>

              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">{song.title}</h3>

                <Button
                  variant="ghost"
                  onClick={() =>
                    window.open(song.spotify_url, '_blank')
                  }
                >
                  <ExternalLink className="mr-2" />
                  Ouvir
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default MusicPage;
