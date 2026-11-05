/**
 * Motion tokens — defined once, used everywhere (brief §6.2).
 * CSS mirrors these as custom properties in globals.css (--ease-out, --dur-*, --stagger).
 */

export const ease = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

export const duration = {
  micro: 0.2,
  reveal: 0.7,
  hero: 0.9,
};

export const stagger = 0.07;
export const revealDistance = 24;
export const viewportTrigger = { once: true, amount: 0.2 } as const;
