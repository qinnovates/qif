/**
 * Title Scene - Cinematic full-screen logo reveal
 * Features: Aurora effects, elegant typography, smooth reveals
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { AnimatedONILogo } from '../components/AnimatedONILogo';
import { NeuralFlow } from '../components/NeuralFlow';
import { colors } from '../data/oni-theme';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Neural flow activation timing
  const flowState = frame > 80 ? 'reactive' : 'resting';

  // Flow fade in
  const flowOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.primary.dark,
      }}
    >
      {/* Full-screen animated ONI logo */}
      <AnimatedONILogo
        width={1920}
        height={1080}
        showTagline={true}
      />

      {/* Neural Flow at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: flowOpacity,
        }}
      >
        <NeuralFlow
          state={flowState}
          width={600}
          height={50}
          intensity={0.6}
        />
      </div>
    </AbsoluteFill>
  );
};
