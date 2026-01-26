/**
 * BlurText - Inspired by React Bits
 * Text that blurs and fades in letter by letter
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  animateBy?: 'letter' | 'word';
  staggerDelay?: number;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 0,
  className,
  style,
  animateBy = 'letter',
  staggerDelay = 3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elements = animateBy === 'letter'
    ? text.split('')
    : text.split(' ');

  return (
    <span className={className} style={{ display: 'inline-flex', flexWrap: 'wrap', ...style }}>
      {elements.map((element, i) => {
        const elementDelay = delay + i * staggerDelay;

        const progress = spring({
          frame: frame - elementDelay,
          fps,
          config: { damping: 20, stiffness: 100 },
        });

        const opacity = Math.max(0, progress);
        const blur = interpolate(Math.max(0, progress), [0, 1], [10, 0]);
        const y = interpolate(Math.max(0, progress), [0, 1], [20, 0]);

        return (
          <span
            key={`${element}-${i}`}
            style={{
              display: 'inline-block',
              opacity,
              filter: `blur(${blur}px)`,
              transform: `translateY(${y}px)`,
              whiteSpace: animateBy === 'word' ? 'pre' : undefined,
            }}
          >
            {element}
            {animateBy === 'word' && i < elements.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </span>
  );
};

export default BlurText;
