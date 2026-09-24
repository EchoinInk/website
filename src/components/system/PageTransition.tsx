import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

// Cinematic page transition with atmospheric dissolve
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  // Small delay to ensure smooth transition feel
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isReady ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className="relative"
      transition={{ 
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: 'opacity' }}
    >
      {/* Atmospheric loading overlay - dissolves as page arrives */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ 
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1 
        }}
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{ 
          background: 'var(--ei-color-background-canvas)',
          willChange: 'opacity',
        }}
      />
      {children}
    </motion.div>
  );
}

// Suspense fallback for lazy-loaded sections
export function SectionLoading() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-full py-32 flex items-center justify-center"
    >
      {/* Atmospheric placeholder - no spinner */}
      <div 
        className="w-32 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--ei-theme-border), transparent)',
        }}
      />
    </motion.div>
  );
}

// Image loading placeholder
export function ImageLoading() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, var(--ei-theme-surface-elevated) 0%, var(--ei-theme-surface) 100%)',
      }}
    />
  );
}
