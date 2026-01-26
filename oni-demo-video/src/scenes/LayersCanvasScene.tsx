/**
 * Layers Scene - Canvas-based 14-layer visualization
 * Best of both worlds: React composition + Canvas performance
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { CanvasBackground, LayerStackCanvas } from '../components/canvas';
import { colors } from '../data/oni-theme';

export const LayersCanvasScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const titleY = interpolate(Math.max(0, titleProgress), [0, 1], [50, 0]);
  const titleOpacity = Math.max(0, titleProgress);

  return (
    <AbsoluteFill style={{ background: colors.primary.dark }}>
      {/* Canvas-based animated background */}
      <CanvasBackground
        particleCount={40}
        auroraWaves={3}
        primaryColor={colors.primary.accent}
        secondaryColor={colors.primary.accentPurple}
      />

      {/* Canvas-based layer stack */}
      <LayerStackCanvas
        startFrame={30}
        showSignalFlow={true}
        highlightGateway={true}
      />

      {/* Title (React component on top) */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: colors.text.primary,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          14-Layer Security Model
        </h1>
        <p
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: colors.text.muted,
            margin: '12px 0 0 0',
          }}
        >
          Silicon to Synapse
        </p>
      </div>

      {/* Subtitle showing current phase */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <p
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: colors.text.muted,
            margin: 0,
          }}
        >
          Each layer has defined security controls, threat models, and verification methods
        </p>
      </div>
    </AbsoluteFill>
  );
};

export default LayersCanvasScene;
