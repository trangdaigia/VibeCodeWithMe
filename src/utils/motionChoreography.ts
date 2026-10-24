// Pure choreography, spring physics presets, and visual animation helpers for LinguaFlow

export const FLUID_EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const SPRING_SNAPPY = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 32,
  mass: 0.8,
};

export const SPRING_GENTLE = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 26,
  mass: 0.9,
};

export const PAGE_TRANSITION_VARIANTS = {
  initial: {
    opacity: 0,
    y: 14,
    scale: 0.992,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.995,
  },
};

export const CARD_HOVER_PROPS = {
  whileHover: {
    y: -3,
    scale: 1.008,
    transition: { duration: 0.2, ease: FLUID_EASE_OUT },
  },
  whileTap: {
    scale: 0.985,
  },
};

/**
 * Calculates a bounded stagger delay (in seconds) for list/grid items
 * so large lists never take too long to finish animating.
 */
export function computeStaggerDelay(index: number, stepSeconds = 0.045, maxDelaySeconds = 0.36): number {
  if (index <= 0 || !Number.isFinite(index)) return 0;
  const raw = index * Math.max(0, stepSeconds);
  return Number(Math.min(maxDelaySeconds, raw).toFixed(3));
}

/**
 * Clamps progress percentage between a minimum visual fill and 100%
 * for smooth progress bar animations.
 */
export function clampVisualProgress(percent: number, minVisualPercent = 6): number {
  if (!Number.isFinite(percent) || percent <= 0) return Math.max(0, minVisualPercent);
  return Math.min(100, Math.max(minVisualPercent, Math.round(percent)));
}

/**
 * Returns a deterministic theme accent gradient class pair for each language course
 * to power ambient hero glow & active indicator highlights.
 */
export function getLanguageAmbientPalette(languageId: string): {
  heroGradient: string;
  orbPrimary: string;
  orbSecondary: string;
  accentBadge: string;
} {
  switch (languageId) {
    case 'chinese':
      return {
        heroGradient: 'from-slate-950 via-rose-950/90 to-slate-900',
        orbPrimary: 'bg-rose-500/20',
        orbSecondary: 'bg-amber-400/15',
        accentBadge: 'text-amber-300',
      };
    case 'japanese':
      return {
        heroGradient: 'from-slate-950 via-fuchsia-950/85 to-indigo-950',
        orbPrimary: 'bg-pink-500/20',
        orbSecondary: 'bg-indigo-400/20',
        accentBadge: 'text-pink-200',
      };
    case 'korean':
      return {
        heroGradient: 'from-slate-950 via-sky-950/90 to-indigo-950',
        orbPrimary: 'bg-cyan-400/20',
        orbSecondary: 'bg-indigo-500/20',
        accentBadge: 'text-cyan-200',
      };
    case 'french':
      return {
        heroGradient: 'from-slate-950 via-blue-950/90 to-indigo-950',
        orbPrimary: 'bg-blue-400/20',
        orbSecondary: 'bg-rose-400/15',
        accentBadge: 'text-sky-200',
      };
    case 'german':
      return {
        heroGradient: 'from-slate-950 via-amber-950/80 to-slate-900',
        orbPrimary: 'bg-amber-400/20',
        orbSecondary: 'bg-emerald-400/15',
        accentBadge: 'text-amber-300',
      };
    case 'spanish':
      return {
        heroGradient: 'from-slate-950 via-orange-950/85 to-indigo-950',
        orbPrimary: 'bg-orange-400/20',
        orbSecondary: 'bg-amber-300/15',
        accentBadge: 'text-amber-200',
      };
    case 'english':
    default:
      return {
        heroGradient: 'from-slate-950 via-indigo-950 to-slate-900',
        orbPrimary: 'bg-indigo-500/25',
        orbSecondary: 'bg-cyan-400/15',
        accentBadge: 'text-amber-300',
      };
  }
}
