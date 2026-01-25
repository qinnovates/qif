import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from 'remotion';
import { COHERENCE, COLORS, calculateCoherence } from '../data/oni-constants';

/**
 * CoherenceMetric Visualization
 *
 * "The Mathematics of Trust"
 *
 * Shows how the coherence formula Cₛ = e^(−(σ²φ + σ²τ + σ²γ))
 * calculates signal trust in real-time as variance components accumulate.
 *
 * Target: Investors understand scientific rigor and quantifiable security
 * Duration: 30 seconds at 30fps (900 frames)
 */

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: COLORS.dark,
    fontFamily: 'SF Pro Display, -apple-system, sans-serif',
    color: COLORS.light,
  },
  title: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 700,
    background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 24,
    color: '#94a3b8',
  },
  formula: {
    position: 'absolute',
    top: 180,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'SF Mono, monospace',
    color: COLORS.light,
  },
  variancePanel: {
    position: 'absolute',
    top: 280,
    left: 100,
    width: 500,
    padding: 30,
    background: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    border: `1px solid ${COLORS.gray}`,
  },
  varianceRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  varianceLabel: {
    width: 180,
    fontSize: 18,
  },
  varianceBar: {
    flex: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
  },
  varianceValue: {
    width: 60,
    textAlign: 'right',
    fontSize: 18,
    fontFamily: 'SF Mono, monospace',
  },
  gaugePanel: {
    position: 'absolute',
    top: 280,
    right: 100,
    width: 400,
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeLabel: {
    fontSize: 20,
    color: '#94a3b8',
    marginBottom: 20,
  },
  gaugeValue: {
    fontSize: 96,
    fontWeight: 700,
    fontFamily: 'SF Mono, monospace',
  },
  thresholdLine: {
    position: 'absolute',
    bottom: 100,
    left: 100,
    right: 100,
    height: 80,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  thresholdItem: {
    textAlign: 'center',
    padding: '10px 30px',
    borderRadius: 8,
    fontSize: 14,
  },
  keyMessage: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'italic',
    color: '#94a3b8',
  },
};

export const CoherenceMetric: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animate each variance component with different timing
  const phaseVariance = interpolate(
    frame,
    [60, 180],  // frames 60-180 (2-6 seconds)
    [0, COHERENCE.PHASE_VARIANCE.max],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const transportVariance = interpolate(
    frame,
    [120, 300],  // frames 120-300 (4-10 seconds)
    [0, COHERENCE.TRANSPORT_VARIANCE.max],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const gainVariance = interpolate(
    frame,
    [180, 360],  // frames 180-360 (6-12 seconds)
    [0, COHERENCE.GAIN_VARIANCE.max],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Calculate coherence score
  const coherenceScore = calculateCoherence(phaseVariance, transportVariance, gainVariance);

  // Determine status based on thresholds
  const getStatus = () => {
    if (coherenceScore > COHERENCE.ACCEPT_THRESHOLD) return { label: 'ACCEPT', color: COLORS.green };
    if (coherenceScore > COHERENCE.FLAG_THRESHOLD) return { label: 'FLAG', color: COLORS.yellow };
    return { label: 'REJECT', color: COLORS.red };
  };
  const status = getStatus();

  // Fade in elements
  const titleOpacity = interpolate(frame, [0, 30], [0, 1]);
  const formulaOpacity = interpolate(frame, [30, 60], [0, 1]);
  const panelOpacity = interpolate(frame, [45, 75], [0, 1]);
  const messageOpacity = interpolate(frame, [durationInFrames - 90, durationInFrames - 60], [0, 1]);

  // Variance bar fills with physics-based motion
  const phaseBarWidth = spring({ frame: frame - 60, fps, config: { damping: 20, stiffness: 80 } }) * (phaseVariance / COHERENCE.PHASE_VARIANCE.max) * 100;
  const transportBarWidth = spring({ frame: frame - 120, fps, config: { damping: 20, stiffness: 80 } }) * (transportVariance / COHERENCE.TRANSPORT_VARIANCE.max) * 100;
  const gainBarWidth = spring({ frame: frame - 180, fps, config: { damping: 20, stiffness: 80 } }) * (gainVariance / COHERENCE.GAIN_VARIANCE.max) * 100;

  return (
    <AbsoluteFill style={styles.container}>
      {/* Title */}
      <div style={{ ...styles.title, opacity: titleOpacity }}>
        Coherence Metric: Cₛ
      </div>
      <div style={{ ...styles.subtitle, opacity: titleOpacity }}>
        The Mathematics of Trust
      </div>

      {/* Formula */}
      <div style={{ ...styles.formula, opacity: formulaOpacity }}>
        Cₛ = e<sup>−(σ²φ + σ²τ + σ²γ)</sup>
      </div>

      {/* Variance Panel */}
      <div style={{ ...styles.variancePanel, opacity: panelOpacity }}>
        <div style={{ fontSize: 14, color: '#64748b', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Variance Components
        </div>

        {/* Phase Variance */}
        <div style={styles.varianceRow}>
          <div style={{ ...styles.varianceLabel, color: COLORS.blue }}>
            σ²φ (Phase)
          </div>
          <div style={styles.varianceBar}>
            <div style={{
              width: `${Math.min(phaseBarWidth, 100)}%`,
              height: '100%',
              backgroundColor: COLORS.blue,
              borderRadius: 10,
              transition: 'width 0.1s',
            }} />
          </div>
          <div style={{ ...styles.varianceValue, color: COLORS.blue }}>
            {phaseVariance.toFixed(3)}
          </div>
        </div>

        {/* Transport Variance */}
        <div style={styles.varianceRow}>
          <div style={{ ...styles.varianceLabel, color: COLORS.orange }}>
            σ²τ (Transport)
          </div>
          <div style={styles.varianceBar}>
            <div style={{
              width: `${Math.min(transportBarWidth, 100)}%`,
              height: '100%',
              backgroundColor: COLORS.orange,
              borderRadius: 10,
              transition: 'width 0.1s',
            }} />
          </div>
          <div style={{ ...styles.varianceValue, color: COLORS.orange }}>
            {transportVariance.toFixed(3)}
          </div>
        </div>

        {/* Gain Variance */}
        <div style={styles.varianceRow}>
          <div style={{ ...styles.varianceLabel, color: COLORS.green }}>
            σ²γ (Gain)
          </div>
          <div style={styles.varianceBar}>
            <div style={{
              width: `${Math.min(gainBarWidth, 100)}%`,
              height: '100%',
              backgroundColor: COLORS.green,
              borderRadius: 10,
              transition: 'width 0.1s',
            }} />
          </div>
          <div style={{ ...styles.varianceValue, color: COLORS.green }}>
            {gainVariance.toFixed(3)}
          </div>
        </div>

        <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${COLORS.gray}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94a3b8' }}>Total Variance:</span>
            <span style={{ fontFamily: 'SF Mono, monospace' }}>
              {(phaseVariance + transportVariance + gainVariance).toFixed(3)}
            </span>
          </div>
        </div>
      </div>

      {/* Coherence Gauge */}
      <div style={{ ...styles.gaugePanel, opacity: panelOpacity }}>
        <div style={styles.gaugeLabel}>Trust Score</div>
        <div style={{ ...styles.gaugeValue, color: status.color }}>
          {coherenceScore.toFixed(2)}
        </div>
        <div style={{
          marginTop: 20,
          padding: '10px 30px',
          borderRadius: 8,
          backgroundColor: status.color,
          color: COLORS.dark,
          fontWeight: 600,
          fontSize: 18,
        }}>
          {status.label}
        </div>
      </div>

      {/* Threshold Reference */}
      <div style={styles.thresholdLine}>
        <div style={{
          ...styles.thresholdItem,
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          color: COLORS.green,
        }}>
          ACCEPT: Cₛ &gt; 0.75
        </div>
        <div style={{
          ...styles.thresholdItem,
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
          color: COLORS.yellow,
        }}>
          FLAG: 0.50 &lt; Cₛ ≤ 0.75
        </div>
        <div style={{
          ...styles.thresholdItem,
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          color: COLORS.red,
        }}>
          REJECT: Cₛ ≤ 0.50
        </div>
      </div>

      {/* Key Message */}
      <div style={{ ...styles.keyMessage, opacity: messageOpacity }}>
        "Every signal earns its trust through mathematical proof, not assumption."
      </div>
    </AbsoluteFill>
  );
};
