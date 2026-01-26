/**
 * Canvas-based Neural Network Visualization
 * Dynamic nodes and connections with signal flow
 */

import React, { useRef, useEffect, useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface Node {
  x: number;
  y: number;
  layer: number;
  index: number;
}

interface Connection {
  from: Node;
  to: Node;
  weight: number;
}

interface NeuralNetworkCanvasProps {
  layers?: number[];
  nodeRadius?: number;
  primaryColor?: string;
  secondaryColor?: string;
  signalColor?: string;
  showSignals?: boolean;
}

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

export const NeuralNetworkCanvas: React.FC<NeuralNetworkCanvasProps> = ({
  layers = [4, 6, 8, 6, 4],
  nodeRadius = 12,
  primaryColor = '#00e5ff',
  secondaryColor = '#a855f7',
  signalColor = '#22c55e',
  showSignals = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Generate network structure
  const { nodes, connections } = useMemo(() => {
    const allNodes: Node[] = [];
    const allConnections: Connection[] = [];

    const layerSpacing = width / (layers.length + 1);

    layers.forEach((nodeCount, layerIndex) => {
      const nodeSpacing = height / (nodeCount + 1);

      for (let i = 0; i < nodeCount; i++) {
        const node: Node = {
          x: layerSpacing * (layerIndex + 1),
          y: nodeSpacing * (i + 1),
          layer: layerIndex,
          index: i,
        };
        allNodes.push(node);

        // Connect to previous layer
        if (layerIndex > 0) {
          const prevLayerNodes = allNodes.filter(n => n.layer === layerIndex - 1);
          prevLayerNodes.forEach(prevNode => {
            allConnections.push({
              from: prevNode,
              to: node,
              weight: seededRandom(prevNode.index * 100 + node.index),
            });
          });
        }
      }
    });

    return { nodes: allNodes, connections: allConnections };
  }, [layers, width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    const time = frame / fps;
    const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

    // Draw connections
    connections.forEach((conn, i) => {
      const connectionDelay = (conn.from.layer * 10) + (i % 10);
      const connectionFade = interpolate(frame - connectionDelay, [0, 20], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

      ctx.beginPath();
      ctx.moveTo(conn.from.x, conn.from.y);
      ctx.lineTo(conn.to.x, conn.to.y);

      const gradient = ctx.createLinearGradient(
        conn.from.x, conn.from.y,
        conn.to.x, conn.to.y
      );
      gradient.addColorStop(0, `${primaryColor}${Math.round(conn.weight * 0.3 * connectionFade * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `${secondaryColor}${Math.round(conn.weight * 0.3 * connectionFade * 255).toString(16).padStart(2, '0')}`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1 + conn.weight;
      ctx.stroke();

      // Draw signal traveling along connection
      if (showSignals && connectionFade > 0.5) {
        const signalProgress = ((time * 2 + i * 0.1) % 1);
        const signalX = conn.from.x + (conn.to.x - conn.from.x) * signalProgress;
        const signalY = conn.from.y + (conn.to.y - conn.from.y) * signalProgress;

        ctx.beginPath();
        ctx.arc(signalX, signalY, 3, 0, Math.PI * 2);
        ctx.fillStyle = signalColor;
        ctx.globalAlpha = 0.8 * conn.weight;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    });

    // Draw nodes
    nodes.forEach((node, i) => {
      const nodeDelay = node.layer * 15 + node.index * 3;
      const nodeScale = interpolate(frame - nodeDelay, [0, 20], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

      if (nodeScale <= 0) return;

      // Node glow
      const glowGradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, nodeRadius * 3 * nodeScale
      );
      glowGradient.addColorStop(0, `${node.layer < layers.length / 2 ? primaryColor : secondaryColor}40`);
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(node.x - nodeRadius * 3, node.y - nodeRadius * 3, nodeRadius * 6, nodeRadius * 6);

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeRadius * nodeScale, 0, Math.PI * 2);

      const nodeGradient = ctx.createRadialGradient(
        node.x - nodeRadius * 0.3, node.y - nodeRadius * 0.3, 0,
        node.x, node.y, nodeRadius
      );
      nodeGradient.addColorStop(0, '#ffffff');
      nodeGradient.addColorStop(0.5, node.layer < layers.length / 2 ? primaryColor : secondaryColor);
      nodeGradient.addColorStop(1, node.layer < layers.length / 2 ? primaryColor : secondaryColor);

      ctx.fillStyle = nodeGradient;
      ctx.fill();

      // Pulse effect
      const pulse = Math.sin(time * 3 + node.layer + node.index * 0.5) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeRadius * nodeScale * (1 + pulse * 0.2), 0, Math.PI * 2);
      ctx.strokeStyle = `${node.layer < layers.length / 2 ? primaryColor : secondaryColor}${Math.round(pulse * 100).toString(16).padStart(2, '0')}`;
      ctx.lineWidth = 2;
      ctx.stroke();
    });

  }, [frame, width, height, fps, nodes, connections, layers, nodeRadius, primaryColor, secondaryColor, signalColor, showSignals]);

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

export default NeuralNetworkCanvas;
