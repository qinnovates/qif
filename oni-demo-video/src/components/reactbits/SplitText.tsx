/**
 * SplitText - Inspired by React Bits
 * Text with letters that scale/rotate in from different directions
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface SplitTextProps {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  direction?: 'up' | 'down' | 'left' | 'right' | 'random';
  staggerDelay?: number;
}

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  delay = 0,
  className,
  style,
  direction = 'up',
  staggerDelay = 2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const letters = text.split('');

  const getTransform = (index: number, progress: number) => {
    const distance = 50;
    let x = 0, y = 0, rotation = 0;

    const dir = direction === 'random'
      ? ['up', 'down', 'left', 'right'][Math.floor(seededRandom(index) * 4)]
      : direction;

    switch (dir) {
      case 'up':
        y = interpolate(progress, [0, 1], [distance, 0]);
        break;
      case 'down':
        y = interpolate(progress, [0, 1], [-distance, 0]);
        break;
      case 'left':
        x = interpolate(progress, [0, 1], [distance, 0]);
        break;
      case 'right':
        x = interpolate(progress, [0, 1], [-distance, 0]);
        break;
    }

    rotation = interpolate(progress, [0, 1], [(seededRandom(index) - 0.5) * 30, 0]);
    const scale = interpolate(progress, [0, 1], [0.5, 1]);

    return `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
  };

  return (
    <span className={className} style={{ display: 'inline-block', ...style }}>
      {letters.map((letter, i) => {
        const letterDelay = delay + i * staggerDelay;

        const progress = spring({
          frame: frame - letterDelay,
          fps,
          config: { damping: 15, stiffness: 100, mass: 0.5 },
        });

        const clampedProgress = Math.max(0, Math.min(1, progress));
        const opacity = clampedProgress;
        const transform = getTransform(i, clampedProgress);

        return (
          <span
            key={`${letter}-${i}`}
            style={{
              display: 'inline-block',
              opacity,
              transform,
              whiteSpace: letter === ' ' ? 'pre' : undefined,
            }}
          >
            {letter}
          </span>
        );
      })}
    </span>
  );
};

export default SplitText;
