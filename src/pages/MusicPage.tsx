import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, Plus, Trash2, ExternalLink } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';

interface Song {
  id: string;
  title: string;
  artist?: string;
  spotify_url: string;
}

const MusicPage = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    spotify_url: '',
  });

  // 🔹 BUSCAR MÚSICAS DO SUPABASE
  useEffect(() => {
    const fetchSongs = async () => {
      const { data } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setSongs(data);
      setLoading(false);
    };

    fetchSongs();
  }, []);

  // ➕ ADICIONAR MÚSICA
  const addSong = async () => {
    if (!newSong.title || !newSong.spotify_url) return;

    const { data } = await supabase
      .from('songs')
      .insert(newSong)
      .select()
      .single();

    if (data) {
      setSongs((prev) => [data, ...prev]);
      setNewSong({ title: '', artist: '', spotify_url: '' });
      setIsDialogOpen(false);
    }
  };

  // ❌ REMOVER
  const removeSong = async (id: string) => {
    await supabase.from('songs').delete().eq('id', id);
    setSongs((prev) => prev.filter((s) => s.id !== id));

    if (currentPlaying === id) {
      audioRef.current?.pause();
      setCurrentPlaying(null);
    }
  };

  // ▶️ PLAY
  const playSong = (song: Song) => {
    if (song.spotify_url.includes('spotify')) {
      window.open(song.spotify_url, '_blank');
      return;
    }

    if (currentPlaying === song.id) {
      audioRef.current?.pause();
      setCurrentPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = song.spotify_url;
        audioRef.current.play();
        setCurrentPlaying(song.id);
      }
    }
  };

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

        {/* ADD */}
        <div className="flex justify-center mb-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2" /> Adicionar música
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Música</DialogTitle>
              </DialogHeader>

              <Input
                placeholder="Nome da música"
                value={newSong.title}
                onChange={(e) =>
                  setNewSong({ ...newSong, title: e.target.value })
                }
              />

              <Input
                placeholder="Artista (opcional)"
                value={newSong.artist}
                onChange={(e) =>
                  setNewSong({ ...newSong, artist: e.target.value })
                }
              />

              <Textarea
                placeholder="Link Spotify ou MP3"
                value={newSong.spotify_url}
                onChange={(e) =>
                  setNewSong({ ...newSong, spotify_url: e.target.value })
                }
              />

              <Button onClick={addSong}>Salvar</Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* LISTA */}
        <div className="space-y-4">
          {songs.map((song) => (
            <div
              key={song.id}
              className="romantic-card flex items-center gap-4"
            >
              <button onClick={() => playSong(song)}>
                {song.spotify_url.includes('spotify') ? (
                  <ExternalLink />
                ) : currentPlaying === song.id ? (
                  <Pause />
                ) : (
                  <Play />
                )}
              </button>

              <div className="flex-grow">
                <h3>{song.title}</h3>
                {song.artist && (
                  <p className="text-sm text-muted-foreground">
                    {song.artist}
                  </p>
                )}
              </div>

              <button onClick={() => removeSong(song.id)}>
                <Trash2 />
              </button>
            </div>
          ))}
        </div>

        <audio ref={audioRef} onEnded={() => setCurrentPlaying(null)} />
      </div>
    </PageWrapper>
  );
};

export default MusicPage;
