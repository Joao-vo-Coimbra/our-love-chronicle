import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Plus, Trash2, X, Play } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import HeartIcon from '@/components/HeartIcon';

interface Memory {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
}

const STORAGE_KEY = 'our-love-memories';

const AlbumPage = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMemory, setNewMemory] = useState({ url: '', caption: '' });
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* 🔹 CARREGA MEMÓRIAS SALVAS */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setMemories(JSON.parse(saved));
    }
  }, []);

  /* 🔹 SALVA SEMPRE QUE ALTERAR */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  }, [memories]);

  const addMemoryFromUrl = () => {
    if (!newMemory.url) return;

    const isVideo =
      newMemory.url.includes('youtube') ||
      newMemory.url.includes('vimeo') ||
      newMemory.url.endsWith('.mp4') ||
      newMemory.url.endsWith('.webm');

    setMemories((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: isVideo ? 'video' : 'image',
        url: newMemory.url,
        caption: newMemory.caption,
      },
    ]);

    setNewMemory({ url: '', caption: '' });
    setIsAddDialogOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        const isVideo = file.type.startsWith('video/');

        setMemories((prev) => [
          ...prev,
          {
            id: Date.now().toString() + Math.random(),
            type: isVideo ? 'video' : 'image',
            url,
            caption: file.name.replace(/\.[^/.]+$/, ''),
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

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

        {/* Controles */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />

          <Button onClick={() => fileInputRef.current?.click()}>
            <Plus className="mr-2" size={18} />
            Enviar Fotos/Vídeos
          </Button>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2" size={18} />
                Adicionar por Link
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Memória</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <Input
                  placeholder="URL da imagem ou vídeo"
                  value={newMemory.url}
                  onChange={(e) =>
                    setNewMemory({ ...newMemory, url: e.target.value })
                  }
                />
                <Input
                  placeholder="Legenda (opcional)"
                  value={newMemory.caption}
                  onChange={(e) =>
                    setNewMemory({ ...newMemory, caption: e.target.value })
                  }
                />
                <Button onClick={addMemoryFromUrl} className="w-full">
                  <HeartIcon className="mr-2" size={18} />
                  Adicionar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Galeria */}
        {memories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {memories.map((memory) => (
              <div
                key={memory.id}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedMemory(memory)}
              >
                {memory.type === 'image' ? (
                  <img
                    src={memory.url}
                    alt={memory.caption}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={memory.url}
                    className="w-full h-full object-cover"
                    muted
                  />
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMemory(memory.id);
                  }}
                  className="absolute top-2 right-2 p-2 bg-black/60 text-white rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            Nosso álbum está esperando...
          </p>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedMemory && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedMemory(null)}
            >
              <button className="absolute top-4 right-4 text-white">
                <X size={32} />
              </button>

              {selectedMemory.type === 'image' ? (
                <img
                  src={selectedMemory.url}
                  className="max-h-[90vh] rounded-lg"
                />
              ) : (
                <video
                  src={selectedMemory.url}
                  controls
                  autoPlay
                  className="max-h-[90vh] rounded-lg"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
};

export default AlbumPage;
