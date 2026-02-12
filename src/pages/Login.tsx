import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import HeartIcon from '@/components/HeartIcon';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(password)) {
      navigate('/home');
    } else {
      setError('Hmm, essa não é a senha certa... Mas não desista do nosso amor! 💕');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  const loveMessages = [
    'Cada momento com você é especial...',
    'Nosso amor é eterno...',
    'Juntos para sempre...',
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/20"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: '110%',
              rotate: Math.random() * 360 
            }}
            animate={{ 
              y: '-10%',
              rotate: Math.random() * 360 + 180
            }}
            transition={{ 
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear'
            }}
          >
            <Heart size={Math.random() * 30 + 20} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="romantic-card w-full max-w-md relative z-10"
      >
        {/* Heart decoration at top */}
        <div className="flex justify-center -mt-12 mb-6">
          <div className="bg-primary p-4 rounded-full shadow-romantic">
            <HeartIcon className="text-primary-foreground" size={40} animate />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
            Bem-vindo(a)
          </h1>
          <p className="font-script text-2xl text-primary">
            ao nosso cantinho especial
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Digite a senha do nosso amor..."
                className="pl-10 h-12 text-center text-lg bg-secondary/50 border-border focus:border-primary focus:ring-primary"
              />
            </div>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm text-primary font-medium"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <Button
            type="submit"
            className="w-full h-12 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-romantic transition-all duration-300 hover:shadow-lg"
          >
            <Heart className="mr-2" size={20} />
            Entrar
          </Button>
        </form>

        <motion.p
          key={Math.floor(Date.now() / 5000)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center text-sm text-muted-foreground font-script text-lg"
        >
          {loveMessages[Math.floor(Math.random() * loveMessages.length)]}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
