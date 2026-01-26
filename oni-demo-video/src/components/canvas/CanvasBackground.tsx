/**
 * Canvas-based animated background for Remotion
 * Combines React composition with Canvas API performance
 */

import React, { useRef, useEffect } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
}

interface AuroraWave {
  offset: number;
  amplitude: number;
  wavelength: number;
  color: string;
  opacity: number;
}

interface CanvasBackgroundProps {
  particleCount?: number;
  auroraWaves?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

// Seeded random for consistent animations
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

export const CanvasBackground: React.FC<CanvasBackgroundProps> = ({
  particleCount = 60,
  auroraWaves = 5,
  primaryColor = '#00e5ff',
  secondaryColor = '#a855f7',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Generate particles once (stable across frames)
  const particles = React.useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      x: seededRandom(i * 1.1) * width,
      y: seededRandom(i * 2.2) * height,
      size: 1 + seededRandom(i * 3.3) * 3,
      speed: 0.3 + seededRandom(i * 4.4) * 0.7,
      color: i % 3 === 0 ? primaryColor : secondaryColor,
      opacity: 0.3 + seededRandom(i * 5.5) * 0.5,
    }));
  }, [particleCount, width, height, primaryColor, secondaryColor]);

  // Generate aurora waves
  const auroras = React.useMemo<AuroraWave[]>(() => {
    return Array.from({ length: auroraWaves }, (_, i) => ({
      offset: i * 0.2,
      amplitude: 60 + i * 25,
      wavelength: 350 + i * 80,
      color: i % 2 === 0 ? primaryColor : secondaryColor,
      opacity: 0.08 - i * 0.01,
    }));
  }, [auroraWaves, primaryColor, secondaryColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Animation progress
    const time = frame / fps;
    const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

    // Draw aurora waves
    auroras.forEach((aurora, i) => {
      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x <= width; x += 10) {
        const baseY = height * 0.35;
        const wave1 = Math.sin((x / aurora.wavelength) + time * 0.5 + aurora.offset * Math.PI * 2) * aurora.amplitude;
        const wave2 = Math.sin((x / (aurora.wavelength * 0.6)) + time * 0.7) * (aurora.amplitude * 0.4);
        const y = baseY + wave1 + wave2;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      // Gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, `${aurora.color}${Math.round(aurora.opacity * fadeIn * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.filter = 'blur(40px)';
      ctx.fill();
      ctx.filter = 'none';
    });

    // Draw particles
    particles.forEach((particle, i) => {
      // Calculate position with upward drift
      const y = (particle.y - (frame * particle.speed) % height + height) % height;

      // Twinkle effect
      const twinkle = 0.5 + Math.sin(frame * 0.1 + i * 0.5) * 0.5;

      ctx.beginPath();
      ctx.arc(particle.x, y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity * twinkle * fadeIn;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Central glow
    const glowPulse = 0.7 + Math.sin(frame * 0.03) * 0.3;
    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, 400 * glowPulse
    );
    gradient.addColorStop(0, `${secondaryColor}15`);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

  }, [frame, width, height, fps, particles, auroras]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default CanvasBackground;
