/**
 * ONI Framework Demo Video Script
 * ~400 words, 3:30 runtime
 *
 * For ElevenLabs generation, use voice: "Adam" (authoritative) or "Rachel" (professional)
 * Request word-level timestamps for precise sync
 */

export interface ScriptLine {
  text: string;
  startFrame: number;
  endFrame: number;
  scene: string;
}

export const script: ScriptLine[] = [
  // Scene 0: Cold Open (0:00-0:08)
  {
    scene: 'coldOpen',
    text: "Brain-computer interfaces are no longer science fiction.",
    startFrame: 0,
    endFrame: 120,
  },
  {
    scene: 'coldOpen',
    text: "They're in operating rooms. They're in research labs. They're coming to consumers.",
    startFrame: 120,
    endFrame: 240,
  },

  // Scene 1: Title (0:08-0:15)
  {
    scene: 'title',
    text: "But who's protecting the most sensitive data in existence?",
    startFrame: 240,
    endFrame: 360,
  },
  {
    scene: 'title',
    text: "Your thoughts.",
    startFrame: 360,
    endFrame: 450,
  },

  // Scene 2: Problem (0:15-0:40)
  {
    scene: 'problem',
    text: "Today's brain-computer interfaces lack standardized security frameworks.",
    startFrame: 450,
    endFrame: 570,
  },
  {
    scene: 'problem',
    text: "There's no OSI model for neural interfaces.",
    startFrame: 570,
    endFrame: 690,
  },
  {
    scene: 'problem',
    text: "No common language between neuroscientists, engineers, and security researchers.",
    startFrame: 690,
    endFrame: 870,
  },
  {
    scene: 'problem',
    text: "Until now.",
    startFrame: 870,
    endFrame: 960,
  },
  {
    scene: 'problem',
    text: "Introducing ONI—the Open Neurosecurity Interoperability.",
    startFrame: 960,
    endFrame: 1140,
  },
  {
    scene: 'problem',
    text: "The first BCI framework built security-first from the ground up.",
    startFrame: 1140,
    endFrame: 1320,
  },
  {
    scene: 'problem',
    text: "Privacy-native. Your thoughts stay yours—by design, not by promise.",
    startFrame: 1320,
    endFrame: 1500,
  },
  {
    scene: 'problem',
    text: "The OSI model the neural era has been waiting for.",
    startFrame: 1500,
    endFrame: 1680,
  },

  // Scene 3: 14-Layer Model (0:56-1:36)
  {
    scene: 'layers',
    text: "ONI defines fourteen layers spanning silicon to synapse.",
    startFrame: 1680,
    endFrame: 1830,
  },
  {
    scene: 'layers',
    text: "Layers one through seven mirror the classical OSI model—physical signals, protocols, transport, and application interfaces.",
    startFrame: 1830,
    endFrame: 2130,
  },
  {
    scene: 'layers',
    text: "But here's where ONI goes further.",
    startFrame: 2130,
    endFrame: 2250,
  },
  {
    scene: 'layers',
    text: "Layer eight is the Neural Gateway—the critical bridge where silicon meets synapse.",
    startFrame: 2250,
    endFrame: 2490,
  },
  {
    scene: 'layers',
    text: "This is where traditional security ends and neurosecurity begins.",
    startFrame: 2490,
    endFrame: 2670,
  },
  {
    scene: 'layers',
    text: "Layers nine through fourteen map the biological stack—from ion channels to spike trains, neural populations, circuit dynamics, cognitive function, and ultimately, identity.",
    startFrame: 2670,
    endFrame: 2880,
  },

  // Scene 4: Coherence Metric (1:36-2:16)
  {
    scene: 'coherence',
    text: "But how do you measure neural security?",
    startFrame: 2880,
    endFrame: 3000,
  },
  {
    scene: 'coherence',
    text: "ONI introduces the Coherence Score—a unified metric combining phase variance, timing precision, and frequency stability.",
    startFrame: 3000,
    endFrame: 3240,
  },
  {
    scene: 'coherence',
    text: "When coherence drops below threshold, automated defense mechanisms activate.",
    startFrame: 3240,
    endFrame: 3420,
  },
  {
    scene: 'coherence',
    text: "Whether it's MRI interference, electromagnetic disruption, or a malicious injection attack—the system responds instantly.",
    startFrame: 3420,
    endFrame: 3660,
  },
  {
    scene: 'coherence',
    text: "And the Scale-Frequency Invariant ensures neural patterns maintain constant relationships across all scales.",
    startFrame: 3660,
    endFrame: 3900,
  },
  {
    scene: 'coherence',
    text: "As scale increases, frequency decreases proportionally. The product remains invariant—a fingerprint of healthy neural activity.",
    startFrame: 3900,
    endFrame: 4140,
  },

  // Scene 5: TARA Stack (2:16-2:56)
  {
    scene: 'tara',
    text: "For security professionals, there's TARA—the Telemetry Analysis and Response Automation stack.",
    startFrame: 4140,
    endFrame: 4380,
  },
  {
    scene: 'tara',
    text: "Real-time brain topology visualization.",
    startFrame: 4380,
    endFrame: 4530,
  },
  {
    scene: 'tara',
    text: "Attack simulation across all fourteen layers.",
    startFrame: 4530,
    endFrame: 4710,
  },
  {
    scene: 'tara',
    text: "Neural Signal Assurance Monitoring that flags anomalies before they become breaches.",
    startFrame: 4710,
    endFrame: 4920,
  },
  {
    scene: 'tara',
    text: "And here's what makes it different: TARA never sees your raw neural data.",
    startFrame: 4920,
    endFrame: 5130,
  },
  {
    scene: 'tara',
    text: "Only mathematical scores—coherence values, deltas, and deviations. Your thoughts stay on your device.",
    startFrame: 5130,
    endFrame: 5400,
  },

  // Scene 6: Academic Foundation (3:00-3:31)
  {
    scene: 'academic',
    text: "ONI isn't built in a vacuum.",
    startFrame: 5400,
    endFrame: 5520,
  },
  {
    scene: 'academic',
    text: "It extends the threat models of Kohno and colleagues at the University of Washington.",
    startFrame: 5520,
    endFrame: 5760,
  },
  {
    scene: 'academic',
    text: "It incorporates neurosecurity research from Columbia, Yale, and the Graz BCI Lab.",
    startFrame: 5760,
    endFrame: 6030,
  },
  {
    scene: 'academic',
    text: "Every claim is cited. Every formula is documented.",
    startFrame: 6030,
    endFrame: 6180,
  },
  {
    scene: 'academic',
    text: "Built for researchers, developers, regulators, security teams...",
    startFrame: 6180,
    endFrame: 6360,
  },
  {
    scene: 'academic',
    // NOTE: This line should have slow pan-in animation with WHITE TEXT for dramatic emphasis
    text: "...and you.",
    startFrame: 6360,
    endFrame: 6600, // Extended for dramatic effect
  },

  // Scene 7: Call to Action (3:30-3:50)
  {
    scene: 'cta',
    text: "Ready to secure the neural frontier?",
    startFrame: 6300,
    endFrame: 6450,
  },
  {
    scene: 'cta',
    text: "Install ONI with a single command.",
    startFrame: 6450,
    endFrame: 6600,
  },
  {
    scene: 'cta',
    text: "pip install oni-framework, oni-tara, or oni-academy",
    startFrame: 6600,
    endFrame: 6780,
  },
  {
    scene: 'cta',
    text: "Join us in building the security standards for brain-computer interfaces.",
    startFrame: 6780,
    endFrame: 6990,
  },

  // Scene 8: Credits (3:53-4:23) - Powerful closing with dynamic waves
  {
    scene: 'credits',
    text: "Your mind.",
    startFrame: 6990,
    endFrame: 7080,
  },
  {
    scene: 'credits',
    text: "Your privacy.",
    startFrame: 7080,
    endFrame: 7170,
  },
  {
    scene: 'credits',
    text: "Our future.",
    startFrame: 7170,
    endFrame: 7260,
  },
  {
    scene: 'credits',
    text: "Because life's most important connections deserve the most thought.",
    startFrame: 7260,
    endFrame: 7470,
  },
  {
    scene: 'credits',
    text: "Welcome to the OSI of Mind.",
    startFrame: 7470,
    endFrame: 7710,
  },
];

// Full script as single text for voiceover generation
export const fullScript = script.map(line => line.text).join(' ');

// Word count: ~480 words
// Estimated read time at 110 WPM: ~4:23 (fits 4:23 with natural pacing)
// Final frame: 7710 = 4:17 at 30fps
//
// ANIMATION NOTES:
// - Scene 2 (Problem): NEW selling points phase after "ONI Framework" intro
//   - Universal, Secure by Design, Biodigital Ready - staggered reveal
// - Scene 4 (Coherence): Show threshold trigger → defense mechanism activation
//   - Visual: Gauge drops below threshold → shield/alert animation
//   - Examples: MRI interference, electromagnetic disruption, injection attacks
// - Scene 4 (Scale-Frequency): Animated visualization of f × S ≈ k
//   - Scale bar grows (10→1000), Frequency shrinks (100→1 Hz), k stays ~1000
// - Scene 5 (TARA): NEW - Privacy-preserving monitoring explanation
//   - Visual: Shield icon with lock, "RAW → Cₛ ONLY" transformation
//   - Show: Raw data stays local, only scores transmitted
//   - Add "Privacy-First" feature card to TARAScene
// - Scene 6 ("...and you"): SLOW PAN-IN with WHITE TEXT and glow for emphasis
// - Scene 7 (CTA): Cycling pip install animation (framework → tara → academy)
// - Scene 8 (Credits): Dynamic circular wave animation on "Welcome to" finale
// - Cold Open: Wave grid fades in 5 seconds before transition for continuity
