import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Navigation from './Navigation';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const PageWrapper = ({ children, className = '' }: PageWrapperProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`pt-20 md:pt-24 pb-8 ${className}`}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default PageWrapper;
