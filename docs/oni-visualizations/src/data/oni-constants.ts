/**
 * ONI Framework Scientific Constants
 *
 * All values derived from documented research and framework specifications.
 * See: MAIN/publications/coherence-metric/TechDoc-Coherence_Metric_Detailed.md
 */

// Coherence Metric Thresholds
export const COHERENCE = {
  ACCEPT_THRESHOLD: 0.75,    // Cₛ > 0.75 = ACCEPT
  FLAG_THRESHOLD: 0.5,       // 0.5 < Cₛ ≤ 0.75 = FLAG
  REJECT_THRESHOLD: 0.5,     // Cₛ ≤ 0.5 = REJECT

  // Variance ranges (from research)
  PHASE_VARIANCE: { min: 0.05, max: 0.2 },      // σ²φ
  TRANSPORT_VARIANCE: { min: 0.1, max: 0.4 },   // σ²τ (dominates)
  GAIN_VARIANCE: { min: 0.02, max: 0.1 },       // σ²γ
};

// Synaptic reliability (p = 0.85 per synapse)
export const SYNAPTIC_RELIABILITY = 0.85;

// 14-Layer Model
export const LAYERS = {
  // OSI Domain (L1-L7)
  L1: { name: 'Physical', domain: 'OSI', color: '#3b82f6' },
  L2: { name: 'Data Link', domain: 'OSI', color: '#3b82f6' },
  L3: { name: 'Network', domain: 'OSI', color: '#3b82f6' },
  L4: { name: 'Transport', domain: 'OSI', color: '#3b82f6' },
  L5: { name: 'Session', domain: 'OSI', color: '#3b82f6' },
  L6: { name: 'Presentation', domain: 'OSI', color: '#3b82f6' },
  L7: { name: 'Application', domain: 'OSI', color: '#3b82f6' },

  // Bridge Layer (L8) - THE FIREWALL
  L8: { name: 'Neural Gateway', domain: 'Bridge', color: '#f59e0b' },

  // Biology Domain (L9-L11)
  L9: { name: 'Signal Processing', domain: 'Biology', color: '#8b5cf6' },
  L10: { name: 'Neural Protocol', domain: 'Biology', color: '#8b5cf6' },
  L11: { name: 'Cognitive Transport', domain: 'Biology', color: '#8b5cf6' },

  // Cognitive Domain (L12-L14)
  L12: { name: 'Cognitive Session', domain: 'Cognitive', color: '#ec4899' },
  L13: { name: 'Semantic', domain: 'Cognitive', color: '#ec4899' },
  L14: { name: 'Identity', domain: 'Human', color: '#ec4899' },
};

// Brand Colors
export const COLORS = {
  dark: '#0a0e17',
  darker: '#060912',
  blue: '#00d4ff',
  purple: '#8b5cf6',
  pink: '#ec4899',
  green: '#10b981',
  yellow: '#f59e0b',
  red: '#ef4444',
  orange: '#f97316',
  gray: '#1e293b',
  light: '#e2e8f0',
};

// Animation timings (frames at 30fps)
export const TIMING = {
  FPS: 30,
  INTRO_DURATION: 60,           // 2 seconds
  MAIN_DURATION: 300,           // 10 seconds
  OUTRO_DURATION: 60,           // 2 seconds
  LAYER_REVEAL_INTERVAL: 15,    // 0.5 seconds per layer
};

/**
 * Calculate coherence score from variance components
 * Cₛ = e^(−(σ²φ + σ²τ + σ²γ))
 */
export function calculateCoherence(
  phaseVariance: number,
  transportVariance: number,
  gainVariance: number
): number {
  const totalVariance = phaseVariance + transportVariance + gainVariance;
  return Math.exp(-totalVariance);
}

/**
 * Calculate reliability across pathway (0.85^n)
 */
export function calculatePathwayReliability(synapseCount: number): number {
  return Math.pow(SYNAPTIC_RELIABILITY, synapseCount);
}
