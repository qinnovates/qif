/**
 * ShinyText - Inspired by React Bits
 * Text with animated gradient shine sweep
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface ShinyTextProps {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  baseColor?: string;
  shineColor?: string;
  speed?: number;
  loop?: boolean;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  delay = 0,
  className,
  style,
  baseColor = '#ffffff',
  shineColor = '#00e5ff',
  speed = 1,
  loop = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const duration = 60 / speed; // frames for one complete sweep

  // Calculate shine position (-100% to 200%)
  const rawProgress = loop
    ? (adjustedFrame % duration) / duration
    : Math.min(adjustedFrame / duration, 1);

  const shinePosition = interpolate(rawProgress, [0, 1], [-100, 200]);

  // Fade in
  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        position: 'relative',
        opacity,
        ...style,
      }}
    >
      {/* Base text */}
      <span style={{ color: baseColor }}>{text}</span>

      {/* Shine overlay */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(
            120deg,
            transparent ${shinePosition - 30}%,
            ${shineColor}44 ${shinePosition - 15}%,
            ${shineColor} ${shinePosition}%,
            ${shineColor}44 ${shinePosition + 15}%,
            transparent ${shinePosition + 30}%
          )`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {text}
      </span>
    </span>
  );
};

export default ShinyText;
