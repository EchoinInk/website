import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export function AtmosphericCursor() {
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const lastUpdateTime = useRef(0);
  const throttleMs = 16; // ~60fps throttle

  const x = useSpring(mouseX, { damping: 48, stiffness: 95, mass: 1.6 });
  const y = useSpring(mouseY, { damping: 48, stiffness: 95, mass: 1.6 });

  useEffect(() => {
    if (prefersReduced) return;
    
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastUpdateTime.current < throttleMs) return;
      lastUpdateTime.current = now;
      
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY, prefersReduced]);

  // Pause cursor tracking when page is hidden (tab switch)
  useEffect(() => {
    const onVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };
    
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  if (prefersReduced || !isPageVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed pointer-events-none z-[9998] hidden md:block"
      style={{
        left: x,
        top: y,
        translateX: '-50%',
        translateY: '-50%',
        width: 'clamp(380px, 36vw, 620px)',
        height: 'clamp(380px, 36vw, 620px)',
        background:
          'radial-gradient(circle, rgb(var(--ei-violet-rgb) / var(--ei-cursor-violet-opacity, 0.062)) 0%, rgb(var(--ei-halo-blue-rgb) / var(--ei-cursor-blue-opacity, 0.032)) 42%, transparent 70%)',
        filter: 'blur(40px)',
        mixBlendMode: 'var(--ei-cursor-blend-mode, screen)' as never,
      }}
    />
  );
}
