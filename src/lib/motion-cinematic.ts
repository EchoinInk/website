import { type Variants } from 'framer-motion';

export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;
const EASE_SOFT = [0.4, 0, 0.2, 1] as const;
export const EASE_LUXURY = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  instant: 0.16,
  fast: 0.3,
  normal: 0.55,
  slow: 0.8,
  slower: 1.1,
  ambient: 8,
  breath: 12,
} as const;

export const VIEWPORT = {
  tight: { once: true, margin: '-50px' },
  normal: { once: true, margin: '-100px' },
  loose: { once: true, margin: '-150px' },
  generous: { once: true, margin: '-200px' },
} as const;

export const STAGGER: Record<string, number> = {
  tight: 0.06,
  normal: 0.09,
  loose: 0.14,
  cinematic: 0.18,
} as const;

export const fadeSoft: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE_CINEMATIC } },
};

export const driftUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE_SOFT } },
};

export const staggerContainer = (stagger = STAGGER.normal, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DURATION.slower, ease: EASE_LUXURY },
  },
};

export const blurEmergence: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(12px)', scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: DURATION.slower, ease: EASE_LUXURY },
  },
};

export const dissolveReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow * 1.5, ease: EASE_SOFT } },
};
