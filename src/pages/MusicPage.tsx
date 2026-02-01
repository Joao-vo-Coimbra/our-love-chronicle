import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, Plus, Trash2, Heart, ExternalLink } from 'lucide-react';
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

interface Song {
  id: string;
  name: string;
  meaning: string;
  type: 'spotify' | 'file';
  url: string;
}

const MusicPage = () => {
  // 🔐 CARREGA DO LOCALSTORAGE AO ABRIR
  const [songs, setSongs] = useState<Song[]>(() => {
    const saved = localStorage.getItem('songs');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: '1',
            name: 'Perfect - Ed Sheeran',
            meaning: 'Nossa música... perfeita como nosso amor.',
            type: 'spotify',
            url: 'https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v',
          },
        ];
  });

  // 💾 SALVA NO LOCALSTORAGE SEMPRE QUE MUDAR
  useEffect(() => {
    localStorage.setItem('songs', JSON.stringify(songs));
  }, [songs]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSong, setNewSong] = useState({ name: '', meaning: '', url: '' });
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const addSong = () => {
    if (!newSong.name || !newSong.url) return;

    const isSpotify = newSong.url.includes('spotify');

    setSongs([
      ...songs,
      {
        id: Date.now().toString(),
        name: newSong.name,
        meaning: newSong.meaning,
        type: isSpotify ? 'spotify' : 'file',
        url: newSong.url,
      },
    ]);

    setNewSong({ name: '', meaning: '', url: '' });
    setIsDialogOpen(false);
  };

  const removeSong = (id: string) => {
    setSongs(songs.filter((song) => song.id !== id));

    if (currentPlaying === id) {
      setCurrentPlaying(null);
      audioRef.current?.pause();
    }
  };

  const togglePlay = (song: Song) => {
    if (song.type === 'spotify') {
      window.open(song.url, '_blank');
      return;
    }

    if (currentPlaying === song.id) {
      audioRef.current?.pause();
      setCurrentPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = song.url;
        audioRef.current.play();
      }
      setCurrentPlaying(song.id);
    }
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Music className="text-primary" size={40} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Nossas Músicas
          </h1>
          <p className="font-script text-2xl text-primary">
            A trilha sonora do nosso amor
          </p>
        </motion.div>

        {/* Add Song */}
        <div className="flex justify-center mb-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="mr-2" size={20} />
                Adicionar Música
              </Button>
            </DialogTrigger>

            <DialogContent className="romantic-card">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-center">
                  Nova Música Especial
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <Input
                  placeholder="Nome da música"
                  value={newSong.name}
                  onChange={(e) => setNewSong({ ...newSong, name: e.target.value })}
                />

                <Input
                  placeholder="Link Spotify ou MP3"
                  value={newSong.url}
                  onChange={(e) => setNewSong({ ...newSong, url: e.target.value })}
                />

                <Textarea
                  placeholder="Por que essa música é especial?"
                  value={newSong.meaning}
                  onChange={(e) =>
                    setNewSong({ ...newSong, meaning: e.target.value })
                  }
                />

                <Button onClick={addSong} className="w-full">
                  <Heart className="mr-2" size={18} />
                  Adicionar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Songs */}
        <div className="space-y-4">
          {songs.map((song) => (
            <div key={song.id} className="romantic-card flex items-start gap-4">
              <button
                onClick={() => togglePlay(song)}
                className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center"
              >
                {song.type === 'spotify' ? (
                  <ExternalLink />
                ) : currentPlaying === song.id ? (
                  <Pause />
                ) : (
                  <Play />
                )}
              </button>

              <div className="flex-grow">
                <h3 className="font-display">{song.name}</h3>
                {song.meaning && (
                  <p className="text-sm italic text-muted-foreground">
                    "{song.meaning}"
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
