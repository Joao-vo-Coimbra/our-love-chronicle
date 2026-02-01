import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Music, Heart, Mail, Image, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import HeartIcon from './HeartIcon';

const navItems = [
  { path: '/home', label: 'Início', icon: Home },
  { path: '/musicas', label: 'Músicas', icon: Music },
  { path: '/nossa-historia', label: 'Nossa História', icon: Heart },
  { path: '/carta', label: 'Carta', icon: Mail },
  { path: '/album', label: 'Memórias', icon: Image },
];

const Navigation = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50 shadow-soft">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2">
            <HeartIcon className="text-primary" size={28} animate />
            <span className="font-script text-2xl text-primary">Nosso Amor</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <span className={`flex items-center gap-2 text-sm font-medium ${
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}>
                    <Icon size={18} />
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            
            <button
              onClick={logout}
              className="ml-4 p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50 shadow-soft">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2">
            <HeartIcon className="text-primary" size={24} animate />
            <span className="font-script text-xl text-primary">Nosso Amor</span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/50 bg-card"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 border-b border-border/30 ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-foreground'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            <button
              onClick={() => { logout(); setIsOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 w-full text-destructive"
            >
              <LogOut size={20} />
              <span className="font-medium">Sair</span>
            </button>
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
