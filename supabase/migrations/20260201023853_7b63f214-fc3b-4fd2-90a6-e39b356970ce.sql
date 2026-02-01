-- Tabela de cartas/letters
CREATE TABLE public.letters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de músicas/songs
CREATE TABLE public.songs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT,
  spotify_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de fotos/photos
CREATE TABLE public.photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Políticas de leitura pública para letters
CREATE POLICY "Leitura pública de letters"
ON public.letters
FOR SELECT
USING (true);

CREATE POLICY "Inserção pública de letters"
ON public.letters
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Atualização pública de letters"
ON public.letters
FOR UPDATE
USING (true);

CREATE POLICY "Deleção pública de letters"
ON public.letters
FOR DELETE
USING (true);

-- Políticas de leitura pública para songs
CREATE POLICY "Leitura pública de songs"
ON public.songs
FOR SELECT
USING (true);

CREATE POLICY "Inserção pública de songs"
ON public.songs
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Atualização pública de songs"
ON public.songs
FOR UPDATE
USING (true);

CREATE POLICY "Deleção pública de songs"
ON public.songs
FOR DELETE
USING (true);

-- Políticas de leitura pública para photos
CREATE POLICY "Leitura pública de photos"
ON public.photos
FOR SELECT
USING (true);

CREATE POLICY "Inserção pública de photos"
ON public.photos
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Atualização pública de photos"
ON public.photos
FOR UPDATE
USING (true);

CREATE POLICY "Deleção pública de photos"
ON public.photos
FOR DELETE
USING (true);