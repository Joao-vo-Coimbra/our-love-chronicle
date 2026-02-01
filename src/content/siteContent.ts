/**
 * Conteúdo fixo do site — tudo que você escrever aqui fica no código
 * e aparece igual em qualquer navegador/dispositivo.
 *
 * Edite este arquivo para:
 * - Carta: altere o texto em LETTER_CONTENT
 * - Músicas: adicione/edite itens em SONGS (arquivos em /public/musicas/ ou links Spotify)
 * - Fotos e vídeos: adicione itens em MEMORIES (arquivos em /public/fotos/ e /public/videos/ ou URLs)
 */

/** Carta imutável — edite o texto abaixo e ele será exibido sempre igual no site */
export const LETTER_CONTENT = `
Isa,

Mesmo não estando mais juntos, eu ainda te amo. Confio plenamente nos propósitos e nos planos que Deus tem para as nossas vidas.

Peço perdão pelas minhas falhas, pelas vezes em que não falei com você quando deveria, pelo silêncio quando a presença era necessária e por tudo o que aconteceu. Saiba que meu amor por você permanece, e assim será para sempre.

Eu sinto falta de nós. Sinto falta do que fomos e fico triste pelo que deixei de fazer por você. Reconheço hoje atitudes, palavras e gestos que poderiam ter sido diferentes. Tenho mudado tudo em mim — não por promessa vazia, mas por consciência e amadurecimento — para que, se um dia você quiser voltar, seja tratada exatamente como merece e como a Bíblia ensina que eu devo cuidar de você. Acredite, eu posso fazer tudo diferente.

Estou sempre em oração pela sua vida. Diante de Deus, eu disse que cuidaria de você. Diante do bispo, eu disse que cuidaria de você. Prometi aos seus pais que cuidaria de você e prometi a mim mesmo que cuidaria de você — e assim continuarei fazendo, mesmo à distância.

Não sei como você está hoje, mas espero, de coração, que esteja bem. Oro todos os dias para que Deus cuide de você, te guarde e te fortaleça.

Esta carta não é um pedido para que retornemos. É apenas uma forma de te dizer o que ainda existe dentro de mim. Se um dia quiser conversar, estarei disposto. Mas, acima de tudo, preciso que você saiba que, dia após dia, continuo orando por você e por nós.

Um dia foi dito que nossa relação foi selada por Deus. Por isso, deixo contigo essa lembrança do que fomos e do que ainda carrego no coração.

Eu te amo muito, Isa.

João Coimbra
`.trim();

/** Músicas: use audioSrc para arquivo local (em public/musicas/) ou spotifyUrl para link do Spotify */
export interface SongItem {
  id: string;
  title: string;
  /** Mensagem/legenda que aparece acima da música */
  message?: string;
  /** Caminho para arquivo em public/musicas/ (ex: "/musicas/minha-musica.mp3") */
  audioSrc?: string;
  /** Link do Spotify para abrir em nova aba */
  spotifyUrl?: string;
}

export const SONGS: SongItem[] = [
  { id: '1', title: 'Perdição', message: 'Com você eu aprendi a ganhar', spotifyUrl: 'https://open.spotify.com/intl-pt/track/0xcdw2bWgJ4lrt3qZJrZ1o?si=e6498b240dba4085' },
  { id: '2', title: 'Minha preferida', message: 'Essa é aquela que eu escuto e lembro de nós', spotifyUrl: 'https://open.spotify.com/intl-pt/track/68cPbG7hJnwDW9nPX1uQcX?si=6f08ae1d7057468e' },
  { id: '3', title: 'Os anjos Cantam', message: 'Nosso amor é cantado', spotifyUrl: 'https://open.spotify.com/intl-pt/track/6ccKu0LwJzOhLAxBwP2PTk?si=de7cac603a234093' },
  { id: '4', title: 'Que sorte a nossa', message: 'O amor bateu na nossa porta', spotifyUrl: 'https://open.spotify.com/intl-pt/track/44pllb9f5QwcrD2kKc0gS0?si=55e38a1185e34210' },
  { id: '5', title: 'Flor e o Beija-Flor', message: 'Parece nosso começo cantado', spotifyUrl: 'https://open.spotify.com/intl-pt/track/0ni9SLDejii0CgTyYug5Lg?si=b5c67834ab944b24' },
  { id: '6', title: 'Como é que a gente fica', message: 'Me diga, como a gente fica', spotifyUrl: 'https://open.spotify.com/intl-pt/track/0zxWyvrKyz031tFfBnkYLr?si=617d7c0a6dbd4f1b' },
  { id: '7', title: 'Sinto sua falta', message: 'Ainda existe amor', spotifyUrl: 'https://open.spotify.com/intl-pt/track/3eWHUE5D5R19q7BvOX7NSJ?si=d921948795854bec' },
  { id: '8', title: 'Domingo de manhã', message: 'Eu prefiro estar sempre contigo', spotifyUrl: 'https://open.spotify.com/intl-pt/track/68dIzxiTmEvV7zPsymunKG?si=436ffa38eb3149b9' },
  { id: '9', title: 'Aquela Pessoa', message: 'Você é a minha pessoa', spotifyUrl: 'https://open.spotify.com/intl-pt/track/5asabafNzfAzjUecDvuNES?si=48e4dd4dcb3845d9' },
  { id: '10', title: 'Sua Musica', message: 'Essa só vem você em mente', spotifyUrl: 'https://open.spotify.com/intl-pt/track/6z0tuMuY0SGUbgsuihzf09?si=67024f60c1b74488' },
  { id: '11', title: 'Coisa de quem ama', message: 'Te amei, amo e sempre vou amar', spotifyUrl: 'https://open.spotify.com/intl-pt/track/5dVOLNVIIj9czz7k3czuWS?si=edce0c0e7cb0412e' },
  { id: '12', title: 'Tudo que você quiser', message: 'Tudo que você quiser estou disposto a dar', spotifyUrl: 'https://open.spotify.com/intl-pt/track/4JSROzfWqKccwZ68DX1aJe?si=82b5159acc614b34' },
];

/** Memórias: fotos e vídeos. Use url como caminho (ex: "/fotos/1.jpg") ou URL externa */
export interface MemoryItem {
  id: string;
  type: 'image' | 'video';
  /** Caminho em public (ex: "/fotos/foto.jpg", "/videos/video.mp4") ou URL completa */
  url: string;
  caption: string;
}

export const MEMORIES: MemoryItem[] = [
  // Exemplos — coloque suas fotos em public/fotos/ e vídeos em public/videos/
  // { id: '1', type: 'image', url: '/fotos/nossa-foto.jpg', caption: 'Nosso momento' },
  // { id: '2', type: 'video', url: '/videos/viagem.mp4', caption: 'Viagem juntos' },
];
