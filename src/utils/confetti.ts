import confetti from 'canvas-confetti';

/**
 * Fires a high-energy celebratory confetti animation across the screen
 */
export function triggerAchievementConfetti() {
  if (typeof window === 'undefined') return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Realistic celebration burst with mixed shapes and velocities
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6']
  });

  fire(0.2, {
    spread: 60,
    colors: ['#fbbf24', '#f43f5e', '#6366f1', '#14b8a6']
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#fbbf24', '#f97316', '#a855f7', '#06b6d4']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#e11d48', '#8b5cf6', '#10b981']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#ffd700', '#ffaa00', '#ff4500']
  });

  // Secondary side cannons burst after 250ms
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ['#fbbf24', '#6366f1', '#10b981', '#ec4899']
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ['#fbbf24', '#6366f1', '#10b981', '#ec4899']
    });
  }, 250);
}

/**
 * Fires gold-themed fireworks confetti for legendary/diamond tier achievements
 */
export function triggerGoldStarsConfetti() {
  if (typeof window === 'undefined') return;

  const duration = 2000;
  const animationEnd = Date.now() + duration;

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);
    confetti({
      particleCount,
      spread: 360,
      startVelocity: 30,
      ticks: 60,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      },
      colors: ['#ffd700', '#ffae00', '#ffffff', '#f59e0b']
    });
  }, 250);
}
