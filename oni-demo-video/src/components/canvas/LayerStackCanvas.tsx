/**
 * Canvas-based 14-Layer Stack Visualization
 * Dynamic layer reveal with signal flow and gateway highlight
 */

import React, { useRef, useEffect } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface Layer {
  id: string;
  name: string;
  color: string;
  category: 'silicon' | 'gateway' | 'biology';
}

const layers: Layer[] = [
  { id: 'L1', name: 'Physical Carrier', color: '#3b82f6', category: 'silicon' },
  { id: 'L2', name: 'Signal Conditioning', color: '#2563eb', category: 'silicon' },
  { id: 'L3', name: 'Analog Processing', color: '#1d4ed8', category: 'silicon' },
  { id: 'L4', name: 'Digital Conversion', color: '#1e40af', category: 'silicon' },
  { id: 'L5', name: 'Protocol Layer', color: '#1e3a8a', category: 'silicon' },
  { id: 'L6', name: 'Data Transport', color: '#172554', category: 'silicon' },
  { id: 'L7', name: 'Application Interface', color: '#334155', category: 'silicon' },
  { id: 'L8', name: 'Neural Gateway', color: '#a855f7', category: 'gateway' },
  { id: 'L9', name: 'Ion Channel Encoding', color: '#4ade80', category: 'biology' },
  { id: 'L10', name: 'Cellular Response', color: '#22c55e', category: 'biology' },
  { id: 'L11', name: 'Network Integration', color: '#16a34a', category: 'biology' },
  { id: 'L12', name: 'Regional Processing', color: '#15803d', category: 'biology' },
  { id: 'L13', name: 'Cognitive Binding', color: '#166534', category: 'biology' },
  { id: 'L14', name: 'Identity & Ethics', color: '#14532d', category: 'biology' },
];

interface LayerStackCanvasProps {
  startFrame?: number;
  showSignalFlow?: boolean;
  highlightGateway?: boolean;
}

export const LayerStackCanvas: React.FC<LayerStackCanvasProps> = ({
  startFrame = 0,
  showSignalFlow = true,
  highlightGateway = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    const adjustedFrame = frame - startFrame;
    if (adjustedFrame < 0) return;

    const time = adjustedFrame / fps;

    // Layout
    const layerWidth = 500;
    const layerHeight = 45;
    const layerGap = 6;
    const totalHeight = layers.length * (layerHeight + layerGap);
    const startY = (height - totalHeight) / 2;
    const startX = (width - layerWidth) / 2;

    // Draw layers
    layers.forEach((layer, i) => {
      const layerDelay = i * 5;
      const layerProgress = interpolate(adjustedFrame - layerDelay, [0, 20], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

      if (layerProgress <= 0) return;

      const y = startY + i * (layerHeight + layerGap);
      const isGateway = layer.category === 'gateway';
      const currentWidth = layerWidth * layerProgress;
      const extraWidth = isGateway ? 40 * layerProgress : 0;

      // Gateway glow
      if (isGateway && highlightGateway && layerProgress > 0.5) {
        const glowPulse = 0.5 + Math.sin(time * 4) * 0.3;
        const glowGradient = ctx.createRadialGradient(
          startX + layerWidth / 2, y + layerHeight / 2, 0,
          startX + layerWidth / 2, y + layerHeight / 2, layerWidth * 0.6
        );
        glowGradient.addColorStop(0, `${layer.color}${Math.round(glowPulse * 60).toString(16).padStart(2, '0')}`);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, y - 50, width, layerHeight + 100);
      }

      // Layer rectangle with rounded corners
      const x = startX - extraWidth / 2;
      const w = currentWidth + extraWidth;
      const h = layerHeight;
      const r = 10;

      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();

      // Gradient fill
      const layerGradient = ctx.createLinearGradient(x, y, x + w, y);
      layerGradient.addColorStop(0, layer.color);
      layerGradient.addColorStop(1, `${layer.color}cc`);
      ctx.fillStyle = layerGradient;
      ctx.fill();

      // Border for gateway
      if (isGateway) {
        ctx.strokeStyle = '#ffffff44';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Layer label
      if (layerProgress > 0.5) {
        const textOpacity = interpolate(layerProgress, [0.5, 1], [0, 1]);
        ctx.fillStyle = `rgba(255, 255, 255, ${textOpacity})`;
        ctx.font = `${isGateway ? '600' : '500'} ${isGateway ? 16 : 14}px Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${layer.id}: ${layer.name}`, startX + layerWidth / 2, y + layerHeight / 2);
      }
    });

    // Signal flow animation
    if (showSignalFlow && adjustedFrame > 80) {
      const signalCount = 3;
      for (let s = 0; s < signalCount; s++) {
        const signalTime = (time - 2.5 + s * 0.5) % 3;
        if (signalTime < 0 || signalTime > 2) continue;

        const signalY = startY + (signalTime / 2) * totalHeight;
        const signalOpacity = Math.sin(signalTime * Math.PI / 2);

        // Signal dot
        ctx.beginPath();
        ctx.arc(startX - 30, signalY, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${signalOpacity})`;
        ctx.fill();

        // Signal trail
        ctx.beginPath();
        ctx.moveTo(startX - 30, signalY);
        ctx.lineTo(startX - 30, signalY - 40);
        const trailGradient = ctx.createLinearGradient(0, signalY - 40, 0, signalY);
        trailGradient.addColorStop(0, 'transparent');
        trailGradient.addColorStop(1, `rgba(0, 229, 255, ${signalOpacity})`);
        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Category labels
    const categories = [
      { label: 'SILICON', y: startY + 3 * (layerHeight + layerGap), color: '#3b82f6' },
      { label: 'BRIDGE', y: startY + 7 * (layerHeight + layerGap) + layerHeight / 2, color: '#a855f7' },
      { label: 'BIOLOGY', y: startY + 11 * (layerHeight + layerGap), color: '#22c55e' },
    ];

    categories.forEach(cat => {
      const labelOpacity = interpolate(adjustedFrame, [30, 60], [0, 0.7], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

      ctx.save();
      ctx.translate(startX - 60, cat.y);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = `${cat.color}${Math.round(labelOpacity * 255).toString(16).padStart(2, '0')}`;
      ctx.font = '600 12px Inter, system-ui, sans-serif';
      ctx.letterSpacing = '4px';
      ctx.textAlign = 'center';
      ctx.fillText(cat.label, 0, 0);
      ctx.restore();
    });

  }, [frame, width, height, fps, startFrame, showSignalFlow, highlightGateway]);

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

export default LayerStackCanvas;
