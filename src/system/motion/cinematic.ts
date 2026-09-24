// ═══════════════════════════════════════════════════════════════
// Echo in Ink — Cinematic Motion System
// Centralized, reusable motion tokens and variants.
// GPU-friendly only. Opacity + transform focused.
// Ambient, calm, emotionally restrained.
// ═══════════════════════════════════════════════════════════════

import { type Transition, type Variants } from 'framer-motion';

// ── Core Easing ───────────────────────────────────────────────
export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;
export const EASE_SOFT = [0.4, 0, 0.2, 1] as const;
export const EASE_LUXURY = [0.16, 1, 0.3, 1] as const;

// ── Duration Scale ────────────────────────────────────────────
export const DURATION = {
  instant: 0.16,
  fast: 0.3,
  normal: 0.55,
  slow: 0.8,
  slower: 1.1,
  ambient: 8,
  breath: 12,
} as const;

// ── Viewport Configuration ────────────────────────────────────
export const VIEWPORT = {
  tight: { once: true, margin: '-50px' },
  normal: { once: true, margin: '-100px' },
  loose: { once: true, margin: '-150px' },
  generous: { once: true, margin: '-200px' },
} as const;

// ── Stagger Configuration ───────────────────────────────────
export const STAGGER = {
  tight: 0.06,
  normal: 0.09,
  loose: 0.14,
  cinematic: 0.18,
} as const;

// ── Transition Presets ────────────────────────────────────────
export const transitionPresets = {
  soft: {
    duration: DURATION.normal,
    ease: EASE_CINEMATIC,
  } as Transition,
  slow: {
    duration: DURATION.slow,
    ease: EASE_CINEMATIC,
  } as Transition,
  luxury: {
    duration: DURATION.slower,
    ease: EASE_LUXURY,
  } as Transition,
} as const;

// ═══════════════════════════════════════════════════════════════
// REQUESTED VARIANTS
// ═══════════════════════════════════════════════════════════════

/**
 * slowReveal — gradual, deliberate emergence
 * For primary content that deserves full attention.
 */
export const slowReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slower,
      ease: EASE_LUXURY,
    },
  },
};

/**
 * atmosphericFade — pure opacity, no movement
 * For background elements and tonal shifts.
 */
export const atmosphericFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.slow * 1.5,
      ease: EASE_SOFT,
    },
  },
};

/**
 * softFloat — gentle vertical drift
 * For decorative elements and ambient motion.
 */
export const softFloat = {
  animate: {
    y: [-6, 6, -6],
    x: [-3, 3, -3],
    scale: [1, 1.008, 1],
  },
  transition: {
    duration: DURATION.ambient * 1.8,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    repeatType: 'mirror' as const,
  },
};

/**
 * glowPulse — subtle opacity oscillation
 * For atmospheric glow layers.
 */
export const glowPulse = {
  animate: {
    opacity: [0.3, 0.38, 0.3],
    scale: [1, 1.015, 1],
  },
  transition: {
    duration: DURATION.ambient,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'mirror' as const,
  },
};

/**
 * staggeredReveal — orchestrated children
 * Container variant that staggers child reveals.
 */
export const staggeredReveal = (stagger = STAGGER.normal, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

/**
 * staggeredRevealItem — individual item in stagger
 */
export const staggeredRevealItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASE_CINEMATIC,
    },
  },
};

/**
 * cinematicHover — subtle lift on interaction
 * For cards and interactive surfaces.
 */
export const cinematicHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.01,
    transition: {
      duration: DURATION.fast,
      ease: EASE_CINEMATIC,
    },
  },
};

/**
 * sectionFade — environmental emergence
 * For entire sections entering the viewport.
 */
export const sectionFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASE_SOFT,
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// LEGACY VARIANTS (retained for compatibility)
// ═══════════════════════════════════════════════════════════════

export const fadeSoft: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASE_CINEMATIC,
    },
  },
};

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slower,
      ease: EASE_CINEMATIC,
    },
  },
};

export const driftUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE_SOFT,
    },
  },
};

export const blurEmergence: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(12px)', scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: DURATION.slower,
      ease: EASE_LUXURY,
    },
  },
};

export const dissolveReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.slow * 1.5,
      ease: EASE_SOFT,
    },
  },
};

export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.slower,
      ease: EASE_LUXURY,
    },
  },
};

export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.cinematic,
      delayChildren: 0.3,
    },
  },
};

export const staggerContainer = (stagger = STAGGER.normal, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASE_CINEMATIC,
    },
  },
};

export const signatureReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(20px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.slower * 1.5,
      ease: EASE_LUXURY,
    },
  },
};

export const atmosphericBridge: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slower,
      ease: EASE_SOFT,
    },
  },
};

export const epilogueFade: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slower * 1.2,
      ease: EASE_LUXURY,
    },
  },
};

// ── Ambient Motion Config ─────────────────────────────────────
export const AMBIENT = {
  luminance: {
    duration: DURATION.breath,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    repeatType: 'mirror' as const,
  },
  depth: {
    duration: DURATION.ambient,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    repeatType: 'mirror' as const,
  },
  float: {
    duration: DURATION.ambient * 1.5,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    repeatType: 'mirror' as const,
  },
} as const;

// ── Utility Exports ───────────────────────────────────────────
export const CinematicMotion = {
  ease: {
    cinematic: EASE_CINEMATIC,
    soft: EASE_SOFT,
    luxury: EASE_LUXURY,
  },
  duration: DURATION,
  viewport: VIEWPORT,
  stagger: STAGGER,
  transition: transitionPresets,
  ambient: AMBIENT,
  variants: {
    slowReveal,
    atmosphericFade,
    softFloat,
    glowPulse,
    staggeredReveal,
    staggeredRevealItem,
    cinematicHover,
    sectionFade,
    fadeSoft,
    fadeRise,
    driftUp,
    blurEmergence,
    dissolveReveal,
    heroReveal,
    heroContainer,
    staggerContainer,
    staggerItem,
    signatureReveal,
    atmosphericBridge,
    epilogueFade,
  },
} as const;

export default CinematicMotion;
