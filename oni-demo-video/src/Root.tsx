import { Composition } from "remotion";
import { ONIDemoVideo } from "./ONIDemoVideo";
import { videoConfig } from "./data/oni-theme";
import { LayersCanvasScene } from "./scenes/LayersCanvasScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ONIDemoVideo"
        component={ONIDemoVideo}
        durationInFrames={videoConfig.durationInFrames}
        fps={videoConfig.fps}
        width={videoConfig.width}
        height={videoConfig.height}
      />
      {/* Preview composition for development - shorter version */}
      <Composition
        id="ONIDemoPreview"
        component={ONIDemoVideo}
        durationInFrames={900} // 30 seconds preview
        fps={videoConfig.fps}
        width={videoConfig.width}
        height={videoConfig.height}
      />
      {/* Canvas-based Layers Scene - Best of both worlds demo */}
      <Composition
        id="LayersCanvas"
        component={LayersCanvasScene}
        durationInFrames={300} // 10 seconds
        fps={videoConfig.fps}
        width={videoConfig.width}
        height={videoConfig.height}
      />
    </>
  );
};
