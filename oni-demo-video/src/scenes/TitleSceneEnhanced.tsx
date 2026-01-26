/**
 * Enhanced Title Scene - React Bits + Canvas animations
 * Best of all worlds: React Bits text + Canvas background + Remotion
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { CanvasBackground } from '../components/canvas';
import { BlurText, SplitText, GradientText, ShinyText } from '../components/reactbits';
import { colors } from '../data/oni-theme';

export const TitleSceneEnhanced: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation phases
  const showONI = frame >= 30;
  const showTagline = frame >= 90;
  const showSubtitle = frame >= 130;

  // ONI letters scale animation
  const oniScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15, stiffness: 40, mass: 1.5 },
  });

  // Glow pulse for ONI
  const glowPulse = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0.5, 1]
  );

  return (
    <AbsoluteFill style={{ background: colors.primary.dark }}>
      {/* Canvas-based animated background */}
      <CanvasBackground
        particleCount={80}
        auroraWaves={5}
        primaryColor={colors.primary.accent}
        secondaryColor={colors.primary.accentPurple}
      />

      {/* Central content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 30,
        }}
      >
        {/* ONI Letters with SplitText animation */}
        {showONI && (
          <div
            style={{
              transform: `scale(${Math.max(0, oniScale)})`,
              filter: `drop-shadow(0 0 ${60 * glowPulse}px ${colors.primary.accent}66)`,
            }}
          >
            <SplitText
              text="ONI"
              delay={30}
              direction="up"
              staggerDelay={8}
              style={{
                fontSize: 200,
                fontWeight: 800,
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                letterSpacing: '-0.02em',
                background: `linear-gradient(180deg, #ffffff 0%, ${colors.primary.accent}90 70%, ${colors.primary.accentPurple}80 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            />
          </div>
        )}

        {/* Tagline with gradient animation */}
        {showTagline && (
          <GradientText
            text="Open Neurocomputing Interface"
            delay={90}
            colors={[colors.primary.accent, colors.primary.accentPurple, colors.primary.accent]}
            speed={0.3}
            style={{
              fontSize: 28,
              fontWeight: 300,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
            }}
          />
        )}

        {/* Subtitle with blur animation */}
        {showSubtitle && (
          <BlurText
            text="The OSI of Mind"
            delay={130}
            animateBy="word"
            staggerDelay={10}
            style={{
              fontSize: 20,
              fontWeight: 400,
              letterSpacing: '0.15em',
              color: colors.text.muted,
            }}
          />
        )}

        {/* Shiny accent text */}
        {frame >= 170 && (
          <div style={{ marginTop: 40 }}>
            <ShinyText
              text="Securing the Neural Frontier"
              delay={170}
              baseColor={colors.text.muted}
              shineColor={colors.primary.accent}
              speed={0.8}
              style={{
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: '0.1em',
              }}
            />
          </div>
        )}
      </div>

      {/* Concentric rings decoration */}
      {[1, 2, 3].map((ring) => {
        const ringProgress = spring({
          frame: frame - 60 - ring * 20,
          fps,
          config: { damping: 40, stiffness: 40 },
        });
        const size = 350 + ring * 180;
        const rotation = frame * (0.03 / ring) * (ring % 2 === 0 ? 1 : -1);

        return (
          <div
            key={ring}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              borderRadius: '50%',
              border: `1px solid ${ring % 2 === 0 ? colors.primary.accent : colors.primary.accentPurple}`,
              opacity: Math.max(0, ringProgress) * 0.15,
              transform: `rotate(${rotation}deg) scale(${interpolate(Math.max(0, ringProgress), [0, 1], [0.8, 1])})`,
              pointerEvents: 'none',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export default TitleSceneEnhanced;
