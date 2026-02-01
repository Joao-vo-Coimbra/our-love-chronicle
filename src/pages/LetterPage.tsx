import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Save, Plus, Trash2, Lock } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import HeartIcon from '@/components/HeartIcon';

interface Note {
  id: string;
  content: string;
  createdAt: string;
}

const LETTER_KEY = 'love_letter_main_locked';
const NOTES_KEY = 'love_letter_notes';

const LetterPage = () => {
  /* 💌 CARTA PRINCIPAL (IMUTÁVEL) */
  const [letter, setLetter] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  /* 📝 BLOCO DE NOTAS */
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  /* 🔹 CARREGAR DADOS */
  useEffect(() => {
    const savedLetter = localStorage.getItem(LETTER_KEY);
    const savedNotes = localStorage.getItem(NOTES_KEY);

    if (savedLetter) {
      setLetter(savedLetter);
      setIsLocked(true);
    }

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  /* 🔒 SALVAR CARTA E BLOQUEAR */
  const saveLetter = () => {
    if (!letter.trim()) return;

    localStorage.setItem(LETTER_KEY, letter);
    setIsLocked(true);
    setIsSaved(true);

    setTimeout(() => setIsSaved(false), 2000);
  };

  /* 🔹 SALVAR NOTAS */
  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!newNote.trim()) return;

    setNotes((prev) => [
      {
        id: Date.now().toString(),
        content: newNote,
        createdAt: new Date().toLocaleDateString('pt-BR'),
      },
      ...prev,
    ]);

    setNewNote('');
  };

  const removeNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

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

        {/* 💌 CARTA PRINCIPAL */}
        <div className="paper-texture rounded-lg shadow-romantic bg-card p-8 mb-10 relative">
          {/* Ícone de bloqueio */}
          {isLocked && (
            <div className="absolute top-4 right-4 flex items-center gap-1 text-muted-foreground">
              <Lock size={16} />
              <span className="text-sm">imutável</span>
            </div>
          )}

          {!isLocked ? (
            <Textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              placeholder="Escreva aqui sua carta principal. Depois de salva, ela não poderá ser alterada."
              className="min-h-[320px] font-script text-xl bg-transparent border-none resize-none"
            />
          ) : (
            <div className="font-script text-xl whitespace-pre-wrap">
              {letter}
            </div>
          )}

          {!isLocked && (
            <div className="flex justify-center mt-6">
              <Button onClick={saveLetter}>
                <Save className="mr-2" size={18} />
                {isSaved ? 'Carta selada 💕' : 'Salvar e selar carta'}
              </Button>
            </div>
          )}
        </div>

        {/* 📝 BLOCO DE NOTAS */}
        <div className="mb-6">
          <h2 className="font-display text-3xl text-center mb-4">
            Anotações & Pensamentos
          </h2>

          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Aqui você pode escrever livremente..."
            className="mb-4"
          />

          <Button onClick={addNote} className="w-full">
            <Plus className="mr-2" size={18} />
            Adicionar anotação
          </Button>
        </div>

        <div className="space-y-4">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-xl bg-card shadow-soft"
            >
              <p className="whitespace-pre-wrap">{note.content}</p>
              <div className="flex justify-between text-sm text-muted-foreground mt-4">
                <span>{note.createdAt}</span>
                <button
                  onClick={() => removeNote(note.id)}
                  className="flex items-center gap-1 text-destructive"
                >
                  <Trash2 size={14} />
                  apagar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default LetterPage;
