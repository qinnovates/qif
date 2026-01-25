import React from 'react';
import { Composition } from 'remotion';
import { CoherenceMetric } from './compositions/CoherenceMetric';
import { TIMING } from './data/oni-constants';

/**
 * ONI Visualizations Root
 *
 * Registers all video compositions for the ONI Framework.
 * Each composition is designed for investor presentations and technical demonstrations.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Coherence Metric: The Mathematics of Trust */}
      <Composition
        id="CoherenceMetric"
        component={CoherenceMetric}
        durationInFrames={900}  // 30 seconds
        fps={TIMING.FPS}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* Placeholder for Layer Stack visualization */}
      <Composition
        id="LayerStack"
        component={CoherenceMetric}  // Will be replaced with LayerStack component
        durationInFrames={1350}  // 45 seconds
        fps={TIMING.FPS}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* Placeholder for Attack Detection visualization */}
      <Composition
        id="AttackDetection"
        component={CoherenceMetric}  // Will be replaced with AttackDetection component
        durationInFrames={1800}  // 60 seconds
        fps={TIMING.FPS}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
