/**
 * GradientText - Inspired by React Bits
 * Text with animated moving gradient
 */

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface GradientTextProps {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  speed?: number;
  angle?: number;
}

export const GradientText: React.FC<GradientTextProps> = ({
  text,
  delay = 0,
  className,
  style,
  colors = ['#00e5ff', '#a855f7', '#ec4899', '#00e5ff'],
  speed = 0.5,
  angle = 135,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  // Animate gradient position
  const gradientOffset = (adjustedFrame * speed) % 100;

  // Fade in
  const opacity = interpolate(adjustedFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(adjustedFrame, [0, 20], [0.95, 1], {
    extrapolateRight: 'clamp',
  });

  // Build gradient string
  const gradientStops = colors
    .map((color, i) => {
      const position = (i / (colors.length - 1)) * 200 + gradientOffset;
      return `${color} ${position}%`;
    })
    .join(', ');

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        opacity,
        transform: `scale(${scale})`,
        background: `linear-gradient(${angle}deg, ${gradientStops})`,
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        ...style,
      }}
    >
      {text}
    </span>
  );
};

export default GradientText;
