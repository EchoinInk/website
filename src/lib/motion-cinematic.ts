// ═══════════════════════════════════════════════════════════════
// Echo in Ink — Cinematic Motion System
// Ambient, environmental, subconscious motion
// ═══════════════════════════════════════════════════════════════
//
// Motion Identity Principles:
// - ambient: motion that exists without demanding attention
// - delayed: intentional lag creates emotional weight
// - soft: no sharp edges, everything dissolves
// - diffused: motion spreads like light through haze
// - immersive: motion surrounds rather than moves across
// - underwater-like: resistance, viscosity, depth
// - emotionally restrained: feeling over spectacle
//
// ═══════════════════════════════════════════════════════════════

import { type Transition, type Variants } from 'framer-motion';

// ── Core Easing — Cinematic, deliberate ───────────────────────
export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;
export const EASE_SOFT = [0.4, 0, 0.2, 1] as const;
export const EASE_LUXURY = [0.16, 1, 0.3, 1] as const;

// ── Duration Scale — Slow, intentional ────────────────────────
export const DURATION = {
  instant: 0.16,     // Micro interactions
  fast: 0.3,         // Quick transitions
  normal: 0.55,      // Standard reveals
  slow: 0.8,         // Deliberate motion
  slower: 1.1,       // Cinematic entrance
  ambient: 8,        // Environmental loops
  breath: 12,        // Atmospheric cycles
} as const;

// ── Viewport Configuration — Generous margins ────────────────
export const VIEWPORT = {
  tight: { once: true, margin: '-50px' },
  normal: { once: true, margin: '-100px' },
  loose: { once: true, margin: '-150px' },
  generous: { once: true, margin: '-200px' },
} as const;

// ── Ambient Motion Config ─────────────────────────────────────
export const AMBIENT = {
  // Luminance drift — slow opacity oscillation
  luminance: {
    duration: DURATION.breath,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    repeatType: 'mirror' as const,
  },
  // Depth drift — subtle scale breathing
  depth: {
    duration: DURATION.ambient,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    repeatType: 'mirror' as const,
  },
  // Parallax drift — vertical float
  float: {
    duration: DURATION.ambient * 1.5,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    repeatType: 'mirror' as const,
  },
} as const;

// ── Stagger Configuration — Cinematic, deterministic pacing ─────────────────
export const STAGGER: Record<string, number> = {
  tight: 0.06,       // Quick sequence
  normal: 0.09,      // Standard flow
  loose: 0.14,       // Dramatic reveals
  cinematic: 0.18,   // Hero sequences
} as const;

// Retained for compatibility. Shared motion now remains deterministic.
export const organicOffset = (base: number, variance = 0.08): number => {
  void variance;
  return base;
};

// ── Cinematic Reveal Variants ────────────────────────────────

// Soft fade — minimal movement, mostly opacity
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

// Gentle rise — subtle upward drift
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

// Drift up — even more subtle
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

// Luminance reveal — glow-like fade
export const luminanceReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.slower,
      ease: EASE_CINEMATIC,
    },
  },
};

// ── Container Variants — Staggered reveals ────────────────────

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

// ── Hero Reveal — Sacred, deliberate ─────────────────────────

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

// ── Section Reveal — Environmental emergence ──────────────────

export const sectionReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASE_SOFT,
    },
  },
};

// ── Card Hover — Subtle lift ────────────────────────────────

export const cardHover = {
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

// ── Text Line Reveal — Editorial stagger ─────────────────────

export const textLineReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASE_CINEMATIC,
    },
  },
};

// ── Ambient Glow Animation ───────────────────────────────────

export const ambientGlow = {
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

// ── Parallax Float ───────────────────────────────────────────

export const parallaxFloat = {
  animate: {
    y: [-8, 8, -8],
  },
  transition: {
    duration: DURATION.ambient * 1.2,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'mirror' as const,
  },
};

// ═══════════════════════════════════════════════════════════════
// AMBIENT DRIFT — Atmospheric, underwater-like motion
// ═══════════════════════════════════════════════════════════════

export const ambientDrift = {
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

// Ultra-subtle atmospheric float for background layers
export const atmosphericFloat = {
  animate: {
    y: [-12, 12, -12],
    scale: [1, 1.015, 1],
    opacity: [0.3, 0.35, 0.3],
  },
  transition: {
    duration: DURATION.ambient * 2.5,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    repeatType: 'mirror' as const,
  },
};

// ═══════════════════════════════════════════════════════════════
// BLUR EMERGENCE — Elements materializing through haze
// ═══════════════════════════════════════════════════════════════

export const blurEmergence: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: 'blur(12px)',
    scale: 0.98,
  },
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

// Slower, more ethereal blur emergence
export const blurEmergenceSlow: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: 'blur(16px)',
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: DURATION.slower * 1.2,
      ease: EASE_LUXURY,
    },
  },
};

// Dissolve reveal — pure opacity, no movement
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

// ═══════════════════════════════════════════════════════════════
// ATMOSPHERIC DIFFUSION — Volumetric, spatial motion
// ═══════════════════════════════════════════════════════════════

export const volumetricDrift = {
  animate: {
    y: [-20, 20, -20],
    opacity: [0.02, 0.04, 0.02],
    scale: [1, 1.02, 1],
  },
  transition: {
    duration: DURATION.ambient * 3,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    repeatType: 'mirror' as const,
  },
};

// Depth fade for background elements
export const depthFade: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 1.02,
  },
  visible: {
    opacity: 0.4,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION.slower * 1.5,
      ease: EASE_SOFT,
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// CINEMATIC CONTAINER — Orchestrated reveal sequences
// ═══════════════════════════════════════════════════════════════

export const cinematicContainer = (delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.cinematic * 1.2,
      delayChildren: delay,
    },
  },
});

export const cinematicItem: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.normal,
      ease: EASE_CINEMATIC,
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// ORCHESTRATED REVEAL — Asymmetric, non-uniform timing
// ═══════════════════════════════════════════════════════════════

export const orchestratedReveal = (index: number, total: number): Variants => {
  // Create asymmetric timing — earlier items reveal faster, later items slower
  const baseDelay = index * 0.08;
  const depthFactor = 1 + (index / total) * 0.3;

  return {
    hidden: {
      opacity: 0,
      y: 20 + index * 4,
      filter: `blur(${6 + index * 2}px)`,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: DURATION.slow * depthFactor,
        delay: baseDelay,
        ease: EASE_LUXURY,
      },
    },
  };
};

// ═══════════════════════════════════════════════════════════════
// SIGNATURE MOMENT — Emotional climax motion
// ═══════════════════════════════════════════════════════════════

export const signatureReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(20px)',
  },
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

// ═══════════════════════════════════════════════════════════════
// FADE TRANSITIONS — Section-to-section atmospheric bridges
// ═══════════════════════════════════════════════════════════════

export const atmosphericBridge: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slower,
      ease: EASE_SOFT,
    },
  },
};

// Epilogue fade for footer — world dissolving into darkness
export const epilogueFade: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slower * 1.2,
      ease: EASE_LUXURY,
    },
  },
};

// ── Utility Transitions ─────────────────────────────────────

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
