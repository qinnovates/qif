/**
 * RotatingText - Inspired by React Bits
 * Cycles through multiple words with animation
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface RotatingTextProps {
  words: string[];
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  duration?: number; // frames per word
  direction?: 'up' | 'down';
}

export const RotatingText: React.FC<RotatingTextProps> = ({
  words,
  delay = 0,
  className,
  style,
  duration = 60, // 2 seconds per word at 30fps
  direction = 'up',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  // Calculate current word index
  const totalDuration = duration * words.length;
  const cycleFrame = adjustedFrame % totalDuration;
  const currentIndex = Math.floor(cycleFrame / duration);
  const nextIndex = (currentIndex + 1) % words.length;

  // Progress within current word (0-1)
  const wordFrame = cycleFrame % duration;
  const isTransitioning = wordFrame > duration - 15; // last 15 frames are transition

  // Get words
  const currentWord = words[currentIndex];
  const nextWord = words[nextIndex];

  // Animation values
  const transitionProgress = isTransitioning
    ? interpolate(wordFrame, [duration - 15, duration], [0, 1])
    : 0;

  const dirMultiplier = direction === 'up' ? 1 : -1;

  // Current word leaving
  const currentY = interpolate(transitionProgress, [0, 1], [0, -40 * dirMultiplier]);
  const currentOpacity = interpolate(transitionProgress, [0, 0.5], [1, 0], {
    extrapolateRight: 'clamp',
  });

  // Next word entering
  const nextY = interpolate(transitionProgress, [0, 1], [40 * dirMultiplier, 0]);
  const nextOpacity = interpolate(transitionProgress, [0.5, 1], [0, 1], {
    extrapolateLeft: 'clamp',
  });

  // Initial fade in
  const initialFade = interpolate(adjustedFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        position: 'relative',
        opacity: initialFade,
        ...style,
      }}
    >
      {/* Current word */}
      <span
        style={{
          display: 'inline-block',
          transform: `translateY(${currentY}px)`,
          opacity: currentOpacity,
        }}
      >
        {currentWord}
      </span>

      {/* Next word (during transition) */}
      {isTransitioning && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            display: 'inline-block',
            transform: `translateY(${nextY}px)`,
            opacity: nextOpacity,
            whiteSpace: 'nowrap',
          }}
        >
          {nextWord}
        </span>
      )}
    </span>
  );
};

export default RotatingText;
