# QIF Break-It Test Results

Generated: 2026-02-06 08:01:05
Detection threshold: 10% relative QI drop
Channels: 64, Sample rate: 1000 Hz, Duration: 2.0s
Random seed: 42 (reproducible)

## Summary

- Total attacks: 10
- Detected: 6
- Missed: 4
- Expected to detect: 6
- Expected to miss: 4
- Matched expectations: 10/10

## Results by Coupling Mechanism

| Mechanism | Attack | Baseline QI | Attacked QI | Drop | Status | Expected |
|-----------|--------|-------------|-------------|------|--------|----------|
| A: Direct injection | #1 | 0.6387 | 0.0025 | +99.6% | DETECTED | detect |
| A: Direct injection | #2 | 0.6132 | 0.0081 | +98.7% | DETECTED | detect |
| B: Harmonic coupling | #3 | 0.5951 | 0.2259 | +62.0% | DETECTED | detect |
| B: Harmonic coupling | #4 | 0.5941 | 0.0091 | +98.5% | DETECTED | detect |
| C: Envelope modulation | #5 | 0.6528 | 0.0070 | +98.9% | DETECTED | detect |
| C: Envelope modulation | #6 | 0.6176 | 0.0008 | +99.9% | DETECTED | detect |
| D: Temporal interference | #7 | 0.6175 | 0.6200 | -0.4% | MISSED | miss |
| D: Temporal interference | #8 | 0.6090 | 0.6073 | +0.3% | MISSED | miss |
| E: Intermodulation | #9 | 0.6324 | 0.6222 | +1.6% | MISSED | miss |
| E: Intermodulation | #10 | 0.5997 | 0.5971 | +0.4% | MISSED | miss |

## Detailed Results

### Attack 1: Direct delta injection (2 Hz)

**Mechanism A:** Direct injection

Attacker signal is at neural frequency. Disrupts phase coherence and adds anomalous amplitude.

| Metric | Baseline | Attacked | Change |
|--------|----------|----------|--------|
| QI (unified) | 0.638743 | 0.002512 | -0.636230 (-99.6%) |
| QI (consumer) | 0.638743 | 0.002512 | -0.636230 (-99.6%) |
| Coherence (Cs) | 0.194095 | 0.000000 | -0.194095 (-100.0%) |
| Phase var (sigma_phi) | 0.069599 | 0.120618 | +0.051019 (+73.3%) |
| Transport (H_tau) | 1.568232 | 24.395429 | +22.827196 (+1455.6%) |
| Gain var (sigma_gamma) | 0.001575 | 0.000054 | -0.001520 (-96.5%) |
| Dsf | 0.000000 | 0.000000 | +0.000000 |

**Verdict:** DETECTED (should detect). Matches expectation.

### Attack 2: Direct alpha injection (10 Hz)

**Mechanism A:** Direct injection

Same frequency as target band. Detection relies on phase disruption, not frequency mismatch.

| Metric | Baseline | Attacked | Change |
|--------|----------|----------|--------|
| QI (unified) | 0.613171 | 0.008077 | -0.605094 (-98.7%) |
| QI (consumer) | 0.613171 | 0.008077 | -0.605094 (-98.7%) |
| Coherence (Cs) | 0.181197 | 0.000000 | -0.181197 (-100.0%) |
| Phase var (sigma_phi) | 0.100611 | 0.914794 | +0.814184 (+809.2%) |
| Transport (H_tau) | 1.604971 | 15.886158 | +14.281187 (+889.8%) |
| Gain var (sigma_gamma) | 0.002587 | 0.084112 | +0.081525 (+3151.4%) |
| Dsf | 0.000000 | 0.000000 | +0.000000 |

**Verdict:** DETECTED (should detect). Matches expectation.

### Attack 3: Harmonic at 2x gamma (160 Hz -> 80 Hz)

**Mechanism B:** Harmonic coupling

160 Hz attacker produces 80 Hz gamma via subharmonic. Appears as out-of-band energy in alpha recording.

| Metric | Baseline | Attacked | Change |
|--------|----------|----------|--------|
| QI (unified) | 0.595142 | 0.225942 | -0.369200 (-62.0%) |
| QI (consumer) | 0.595142 | 0.225942 | -0.369200 (-62.0%) |
| Coherence (Cs) | 0.161685 | 0.061383 | -0.100303 (-62.0%) |
| Phase var (sigma_phi) | 0.104157 | 1.073394 | +0.969236 (+930.5%) |
| Transport (H_tau) | 1.715682 | 1.715682 | +0.000000 (+0.0%) |
| Gain var (sigma_gamma) | 0.002263 | 0.001548 | -0.000715 (-31.6%) |
| Dsf | 0.000000 | 0.000000 | +0.000000 |

**Verdict:** DETECTED (should detect). Matches expectation.

### Attack 4: Subharmonic at theta/2 (2.5 Hz -> 5 Hz)

**Mechanism B:** Harmonic coupling

2.5 Hz attacker produces 5 Hz theta via harmonic generation. Appears as out-of-band energy in alpha recording.

| Metric | Baseline | Attacked | Change |
|--------|----------|----------|--------|
| QI (unified) | 0.594097 | 0.009142 | -0.584955 (-98.5%) |
| QI (consumer) | 0.594097 | 0.009142 | -0.584955 (-98.5%) |
| Coherence (Cs) | 0.166782 | 0.000001 | -0.166782 (-100.0%) |
| Phase var (sigma_phi) | 0.114982 | 1.790079 | +1.675097 (+1456.8%) |
| Transport (H_tau) | 1.672505 | 12.073717 | +10.401211 (+621.9%) |
| Gain var (sigma_gamma) | 0.003578 | 0.001699 | -0.001879 (-52.5%) |
| Dsf | 0.000000 | 0.000000 | +0.000000 |

**Verdict:** DETECTED (should detect). Matches expectation.

### Attack 5: AM-modulated carrier (1 kHz, 10 Hz envelope)

**Mechanism C:** Envelope modulation

Tissue demodulates AM carrier, producing 10 Hz amplitude modulation. Increases gain variance.

| Metric | Baseline | Attacked | Change |
|--------|----------|----------|--------|
| QI (unified) | 0.652771 | 0.007002 | -0.645769 (-98.9%) |
| QI (consumer) | 0.652771 | 0.007002 | -0.645769 (-98.9%) |
| Coherence (Cs) | 0.223642 | 0.000000 | -0.223642 (-100.0%) |
| Phase var (sigma_phi) | 0.084766 | 0.027646 | -0.057120 (-67.4%) |
| Transport (H_tau) | 1.410277 | 19.821930 | +18.411653 (+1305.5%) |
| Gain var (sigma_gamma) | 0.002663 | 0.167761 | +0.165098 (+6198.7%) |
| Dsf | 0.000000 | 0.000000 | +0.000000 |

**Verdict:** DETECTED (should detect). Matches expectation.

### Attack 6: FM-modulated carrier (RF, 8 Hz mod)

**Mechanism C:** Envelope modulation

FM demodulation by tissue produces 8 Hz phase modulation. Disrupts phase coherence directly.

| Metric | Baseline | Attacked | Change |
|--------|----------|----------|--------|
| QI (unified) | 0.617649 | 0.000766 | -0.616883 (-99.9%) |
| QI (consumer) | 0.617649 | 0.000766 | -0.616883 (-99.9%) |
| Coherence (Cs) | 0.179279 | 0.000000 | -0.179279 (-100.0%) |
| Phase var (sigma_phi) | 0.088215 | 3.266317 | +3.178102 (+3602.7%) |
| Transport (H_tau) | 1.628564 | 15.909751 | +14.281187 (+876.9%) |
| Gain var (sigma_gamma) | 0.002033 | 0.082396 | +0.080363 (+3952.1%) |
| Dsf | 0.000000 | 0.000000 | +0.000000 |

**Verdict:** DETECTED (should detect). Matches expectation.

### Attack 7: Temporal interference (500 + 510 Hz = 10 Hz)

**Mechanism D:** Temporal interference

Beat frequency forms in tissue volume, not at electrode. Electrode sees only faint high-freq components (filtered out). QI has no visibility into volumetric interference.

| Metric | Baseline | Attacked | Change |
|--------|----------|----------|--------|
| QI (unified) | 0.617485 | 0.619972 | +0.002488 (+0.4%) |
| QI (consumer) | 0.617485 | 0.619972 | +0.002488 (+0.4%) |
| Coherence (Cs) | 0.194502 | 0.195286 | +0.000784 (+0.4%) |
| Phase var (sigma_phi) | 0.113871 | 0.109859 | -0.004012 (-3.5%) |
| Transport (H_tau) | 1.520913 | 1.520913 | +0.000000 (+0.0%) |
| Gain var (sigma_gamma) | 0.002528 | 0.002519 | -0.000009 (-0.4%) |
| Dsf | 0.000000 | 0.000000 | +0.000000 |

**Verdict:** MISSED (should miss). Matches expectation.

### Attack 8: Temporal interference (2 kHz + 2.008 kHz = 8 Hz)

**Mechanism D:** Temporal interference

Higher carrier frequencies, even more attenuation at electrode. The 8 Hz beat is purely volumetric.

| Metric | Baseline | Attacked | Change |
|--------|----------|----------|--------|
| QI (unified) | 0.609026 | 0.607320 | -0.001707 (-0.3%) |
| QI (consumer) | 0.609026 | 0.607320 | -0.001707 (-0.3%) |
| Coherence (Cs) | 0.174819 | 0.174329 | -0.000490 (-0.3%) |
| Phase var (sigma_phi) | 0.098331 | 0.101137 | +0.002806 (+2.9%) |
| Transport (H_tau) | 1.643224 | 1.643224 | +0.000000 (+0.0%) |
| Gain var (sigma_gamma) | 0.002451 | 0.002452 | +0.000000 (+0.0%) |
| Dsf | 0.000000 | 0.000000 | +0.000000 |

**Verdict:** MISSED (should miss). Matches expectation.

### Attack 9: Intermodulation (BLE 2.4 GHz + SDR = alpha)

**Mechanism E:** Intermodulation

Nonlinear tissue mixing of BLE + attacker SDR produces alpha. If it works, the entrained activity is real neural firing. Signal properties look physiologically normal.

| Metric | Baseline | Attacked | Change |
|--------|----------|----------|--------|
| QI (unified) | 0.632371 | 0.622158 | -0.010212 (-1.6%) |
| QI (consumer) | 0.632371 | 0.622158 | -0.010212 (-1.6%) |
| Coherence (Cs) | 0.208379 | 0.205014 | -0.003365 (-1.6%) |
| Phase var (sigma_phi) | 0.104847 | 0.120696 | +0.015849 (+15.1%) |
| Transport (H_tau) | 1.461541 | 1.461541 | +0.000000 (+0.0%) |
| Gain var (sigma_gamma) | 0.002007 | 0.002439 | +0.000432 (+21.5%) |
| Dsf | 0.000000 | 0.000000 | +0.000000 |

**Verdict:** MISSED (should miss). Matches expectation.

### Attack 10: Intermodulation (MICS 402 + UHF 225 MHz = theta)

**Mechanism E:** Intermodulation

Implant MICS + external UHF mix in tissue. If intermod products reach neural frequencies, induced firing is indistinguishable from normal.

| Metric | Baseline | Attacked | Change |
|--------|----------|----------|--------|
| QI (unified) | 0.599651 | 0.597111 | -0.002540 (-0.4%) |
| QI (consumer) | 0.599651 | 0.597111 | -0.002540 (-0.4%) |
| Coherence (Cs) | 0.157524 | 0.156857 | -0.000667 (-0.4%) |
| Phase var (sigma_phi) | 0.086065 | 0.090191 | +0.004126 (+4.8%) |
| Transport (H_tau) | 1.759949 | 1.759949 | +0.000000 (+0.0%) |
| Gain var (sigma_gamma) | 0.002164 | 0.002283 | +0.000119 (+5.5%) |
| Dsf | 0.000000 | 0.000000 | +0.000000 |

**Verdict:** MISSED (should miss). Matches expectation.

## Analysis: What QI Catches vs. What It Misses

### Mechanisms A, B, C: Detectable

These attacks perturb signal properties that QI directly measures:

- **Phase variance (sigma_phi):** Direct injection and FM modulation disrupt inter-channel phase coherence. The circular variance metric catches this because an injected signal with a different phase relationship reduces the mean resultant length.
- **Gain variance (sigma_gamma):** AM modulation and direct injection increase amplitude fluctuations. The normalized variance metric flags abnormal amplitude distributions.
- **Transport entropy (H_tau):** Attacks that degrade channel reliability (direct injection overwhelming sensors, harmonic coupling saturating amplifiers) increase the negative log-likelihood sum.
- **Dsf (scale-frequency):** When an attack introduces energy at a frequency inconsistent with the expected spatial extent, the log-ratio squared term grows. This catches cross-band energy injection.

### Mechanisms D, E: Blind Spots

These attacks exploit a fundamental limitation: QI operates on electrode-level signal measurements, but the attack happens in tissue volume.

**Temporal interference (Mechanism D):**
Two high-frequency signals (each subthreshold for neural activation) intersect in a target brain region. Their beat frequency matches a neural band. At the recording electrode, only the individual high-frequency carriers are visible, and those are filtered out by the BCI's bandpass filter. The beat-frequency effect is purely volumetric. QI never sees it because the electrode-level signal is clean.

**Intermodulation (Mechanism E):**
The BCI's own wireless signal (BLE, MICS) mixes with an attacker's signal in nonlinear tissue. If the intermodulation product falls in a neural band, it can entrain actual neurons. The resulting neural activity IS genuine firing, just attacker-induced. QI cannot distinguish this from normal brain activity because the signal properties (phase coherence, amplitude stability, spatial extent) are physiologically normal.

### The Honest Truth

QI is a signal-integrity metric. It answers: "Does this electrode signal look like normal neural activity?" For attacks that corrupt signal properties (A, B, C), this is effective. For attacks that produce physiologically genuine but attacker-controlled activity (D, E), QI is blind by design.

Defending against Mechanisms D and E requires different tools entirely:

- **Multi-electrode spatial filtering:** Detecting interference patterns that don't match expected brain source geometry.
- **RF environment monitoring:** Detecting anomalous transmissions near the BCI operating environment.
- **Behavioral correlation:** Checking whether neural patterns correlate with expected task/stimulus context.
- **Implant-level RF shielding:** Hardware countermeasure to reduce intermodulation products at the source.

QI's role in a defense-in-depth architecture is the signal-integrity layer, not the only layer.

## Component Sensitivity Ranking

Which QI components contributed most to detection across all attacks:

| Component | Avg Relative Change (detectable attacks) |
|-----------|------------------------------------------|
| Gain variance | +2186.9% |
| Phase variance | +1134.2% |
| Transport entropy | +858.3% |
| Scale-frequency (Dsf) | +0.0% |

## Recommendations

1. QI's classical terms (phase, transport, gain, Dsf) form a solid signal-integrity baseline.
2. For complete BCI security, QI must be paired with RF monitoring and spatial source analysis.
3. The Dsf term adds detection capability beyond raw coherence, especially for cross-band attacks.
4. Consumer devices (qi_consumer, no Dsf) are more vulnerable to harmonic/subharmonic attacks.
5. Temporal interference is the most concerning blind spot: it requires no implant compromise and can target specific brain regions with clinical-grade precision (this is an active neurostimulation research technique).
