# Neural Sensory Protocol (NSP)

## Use-Case: Post-Quantum Secure Protocols for BCI Sensory Data

**Document Type:** Use-Case Proposal
**Organization:** Qinnovate (Open Standards)
**Framework Reference:** QIF v3.1 Hourglass Model
**Status:** Draft
**Date:** 2026-02-06
**Author:** Kevin Qi

---

## Table of Contents

- [Summary](#summary)
- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
- [Protocol Architecture](#protocol-architecture)
- [Phased Development](#phased-development)
- [Technical Requirements](#technical-requirements)
- [Standards Alignment](#standards-alignment)
- [Success Criteria](#success-criteria)
- [Open Questions](#open-questions)

---

## Summary

The Neural Sensory Protocol (NSP) is a proposed open standard for post-quantum secure encoding and transmission of sensory data between external sensors and brain-computer interface (BCI) hardware. NSP addresses a critical gap: while the OSI model provided the internet with both a layered architecture and a suite of protocols at each layer (TCP, UDP, HTTP, SSH), no equivalent protocol standard exists for BCI systems. The QIF Hourglass Model defines where security boundaries exist. NSP defines what crosses those boundaries and how.

NSP begins with auditory BCIs (cochlear and cortical auditory implants) as the simplest sensory modality and the one with the most active research. The second phase introduces a lightweight visual encoding protocol for visual cortex stimulation, with the long-term goal of restoring sight using a secure, efficient, fully local processing pipeline.

---

## Problem Statement

### The Protocol Gap

The internet matured through a decades-long process of defining protocols at each OSI layer. Every major protocol was designed without security and had it retrofitted later:

| Protocol | Security Retrofit | Delay |
|----------|-------------------|-------|
| HTTP (1991) | HTTPS / TLS (1995-2000) | 4-9 years |
| DNS (1983) | DNSSEC (2005-2010) | 22-27 years |
| SMTP (1982) | STARTTLS / DMARC (2002-2015) | 20-33 years |
| IPv4 (1981) | IPsec (1995), IPv6 (ongoing) | 14+ years |

BCI systems today face the same trajectory. Sensory data is transmitted between devices and neural tissue using proprietary, vendor-specific encoding with no unified protocol standard and no built-in security. The window to prevent a repetition of the internet's security debt is now, before BCI adoption scales.

### The Quantum Threat

NIST has established a post-quantum cryptography migration timeline. Classical encryption schemes (RSA, ECC) protecting today's BCI data links will be vulnerable to quantum computing attacks. Any protocol designed today without post-quantum cryptography will require the same painful retrofit that HTTP, DNS, and every other internet protocol underwent.

### The Latency Constraint

Sensory BCIs operate under strict latency requirements. Visual and auditory perception demand sub-50ms round-trip processing. Cloud-dependent architectures introduce unacceptable latency, create single points of failure, and expand the attack surface. Protocols for sensory BCIs must assume local-only processing.

---

## Proposed Solution

### NSP: Security-First Sensory Protocols

NSP is a family of lightweight, post-quantum encrypted encoding protocols for BCI sensory data. Each protocol targets a specific sensory modality and operates entirely on-device.

**Design Principles:**

1. **Post-quantum encrypted from day one.** No classical-only fallback. Built on NIST-standardized post-quantum algorithms (ML-KEM, ML-DSA, SLH-DSA).
2. **Local processing only.** All AI inference, encoding, and decryption happen on the BCI chip. No cloud dependency.
3. **Lightweight by design.** Protocols must fit the compute and power constraints of implantable hardware. Inspired by the simplicity that made HTML successful: minimal specification, maximum utility.
4. **Open standard.** Security through transparency (Kerckhoffs' Principle). Published specification, open reference implementation, public review.
5. **QIF-compliant.** Protocols map to the QIF Hourglass Model. Security properties are defined per-band (S1 through N2 for sensory protocols).

---

## Protocol Architecture

### Data Flow

```
ENVIRONMENT                    SILICON DOMAIN              INTERFACE    NEURAL DOMAIN
                               (S3 → S2 → S1)              (I0)        (N1 → N2)
                              ┌─────────────────┐
Sensor Array ──────────────►  │  Local AI Engine │
(camera, LIDAR,               │  - Object recog. │
 microphone,                  │  - Spatial map   │
 depth sensor)                │  - OCR / ASR     │
                              └────────┬────────┘
                                       │
                              ┌────────▼────────┐
                              │  NSP Encoder     │
                              │  - Modality codec│
                              │  - Compression   │
                              │  - Framing       │
                              └────────┬────────┘
                                       │
                              ┌────────▼────────┐
                              │  PQ Encryption   │
                              │  - ML-KEM key ex.│
                              │  - Authenticated │
                              │    encryption    │
                              └────────┬────────┘
                                       │
                              ┌────────▼────────┐
                              │  BCI Chip Decode │───────►  Cortical
                              │  - Decrypt       │         Stimulation
                              │  - Stimulation   │         (person
                              │    mapping       │          perceives)
                              └─────────────────┘
```

### QIF Hourglass Mapping

| Pipeline Stage | QIF Band | Security Boundary |
|----------------|----------|-------------------|
| Sensor input, AI inference | **S3** (Application) | Input validation, adversarial robustness |
| NSP encoding + compression | **S2** (Digital Processing) | Codec integrity, frame authentication |
| PQ encryption / decryption | **S1** (Analog Front-End) | Post-quantum key exchange, tamper detection |
| Electrode stimulation | **I0** (Neural Interface) | Signal integrity at electrode-tissue boundary |
| Subcortical relay | **N1** (Subcortical Relay) | Coherence monitoring (QIF Coherence Metric) |
| Cortical perception | **N2** (Sensorimotor Processing) | Perceptual fidelity validation |

### The "Neural HTML" Concept

NSP-Visual (Phase 2) introduces a lightweight rendering protocol analogous to HTML. Where HTML provides a minimal markup language that browsers render into visual experiences, NSP-Visual provides a minimal neural markup that BCI chips render into cortical stimulation patterns.

| Property | HTML (Web) | NSP-Visual (BCI) |
|----------|-----------|-------------------|
| Purpose | Encode visual content for screens | Encode visual content for visual cortex |
| Rendering | Browser engine (client-side) | BCI chip + local AI (on-device) |
| Transport security | TLS 1.3 | Post-quantum authenticated encryption |
| Complexity | Minimal markup, rich rendering | Minimal encoding, neural-mapped rendering |
| Dependency | Requires internet (typically) | Fully local, no network required |

This lightweight encoding could also serve broader applications, functioning as a high-efficiency rendering protocol for next-generation web infrastructure where applications run locally rather than through centralized app stores.

---

## Phased Development

### Phase 1: NSP-Audio (Auditory BCI Protocol)

**Target:** Cochlear implants, cortical auditory BCIs
**Rationale:** Audio is the simplest sensory modality for BCI encoding. Cochlear implants have decades of clinical history. Multiple laboratories are actively developing cortical auditory interfaces.

| Component | Description |
|-----------|-------------|
| **Codec** | Frequency-band decomposition optimized for tonotopic mapping |
| **Compression** | Perceptual compression tuned to auditory cortex response curves |
| **Encryption** | ML-KEM-768 key encapsulation + AES-256-GCM authenticated encryption |
| **Latency target** | < 20ms encode-to-stimulate |
| **Reference hardware** | ARM Cortex-M class or equivalent low-power processor |

**Deliverables:**
- NSP-Audio specification (v0.1)
- Open-source reference encoder/decoder
- Security threat model mapped to QIF bands S1-S3 and I0
- Test suite with synthetic and recorded audio inputs

### Phase 2: NSP-Visual (Visual BCI Protocol)

**Target:** Visual cortex prostheses for blindness restoration
**Rationale:** Visual data is higher-bandwidth and more complex than audio, but the same architectural principles apply. Local AI handles the heavy computation (object recognition, spatial mapping, OCR); NSP-Visual transmits a lightweight encoded representation to the BCI chip.

| Component | Description |
|-----------|-------------|
| **Input pipeline** | Camera + LIDAR + depth sensor fused by on-device AI |
| **Encoding** | Retinotopic-mapped scene description (objects, edges, depth, motion) |
| **Compression** | Aggressive perceptual reduction (cortex does not need pixel data) |
| **Encryption** | ML-KEM-1024 key encapsulation + AES-256-GCM |
| **Latency target** | < 50ms sensor-to-stimulate |
| **Reference hardware** | NVIDIA Jetson class or equivalent edge GPU |

**Deliverables:**
- NSP-Visual specification (v0.1)
- "Neural HTML" encoding format specification
- Reference implementation with simulated visual cortex output
- Adversarial robustness testing (manipulated visual input attacks)
- Clinical partner engagement for validation

---

## Technical Requirements

### Cryptographic Requirements

| Requirement | Specification | Rationale |
|-------------|---------------|-----------|
| Key encapsulation | NIST ML-KEM (FIPS 203) | Post-quantum key exchange |
| Digital signatures | NIST ML-DSA (FIPS 204) or SLH-DSA (FIPS 205) | Firmware and codec authentication |
| Symmetric encryption | AES-256-GCM | Authenticated encryption for data frames |
| Key rotation | Automatic, interval configurable | Limits exposure window |
| Side-channel resistance | Constant-time implementations required | Implantable hardware is physically accessible |

### Compute Constraints

| Constraint | Phase 1 (Audio) | Phase 2 (Visual) |
|------------|------------------|-------------------|
| Processor class | ARM Cortex-M / RISC-V | Edge GPU (Jetson-class) |
| Power budget | < 100 mW | < 2 W |
| Memory | < 512 KB SRAM | < 4 GB |
| Latency (end-to-end) | < 20 ms | < 50 ms |
| Storage (firmware) | < 2 MB | < 64 MB |

### Security Requirements

| Requirement | Description |
|-------------|-------------|
| Zero cloud dependency | All processing local to device |
| Tamper detection | Hardware-level integrity monitoring at I0 boundary |
| Fail-secure | Stimulation halts on decryption failure (no degraded mode) |
| Auditability | Cryptographic log of all firmware updates |
| Adversarial robustness | AI pipeline must resist manipulated sensor input |

---

## Standards Alignment

| Organization | Relevance | Engagement Strategy |
|--------------|-----------|---------------------|
| **NIST** | Post-quantum cryptography standards (FIPS 203/204/205); PQC migration deadline | Align NSP encryption with finalized NIST PQC standards. Target protocol readiness before NIST migration deadline. |
| **IEEE** | Neural engineering standards (IEEE SA); BCI device interoperability | Propose NSP as IEEE working group for BCI protocol standardization. Leverage IEEE 802 precedent (networking protocols). |
| **ISO** | Medical device standards (ISO 13485); information security (ISO 27001) | Ensure NSP-compliant devices can meet ISO medical device certification. Map security properties to ISO 27001 controls. |
| **FDA** | Medical device regulation (21 CFR 820); cybersecurity guidance for devices | Design NSP with FDA premarket cybersecurity guidance in mind. Threat model documentation as regulatory submission artifact. |
| **Qinnovate / QIF** | Hourglass Model defines security architecture; Coherence Metric provides integrity measure | NSP is the first protocol family built to the QIF specification. Validates the framework with a concrete, implementable standard. |

---

## Success Criteria

| Criterion | Measurement | Target |
|-----------|-------------|--------|
| **Specification published** | NSP-Audio v0.1 publicly available | Within 12 months |
| **Reference implementation** | Open-source encoder/decoder passing test suite | Within 18 months |
| **Post-quantum validated** | Independent cryptographic review confirms PQC compliance | Before v1.0 |
| **Latency met** | End-to-end benchmarks on reference hardware | Audio < 20ms, Visual < 50ms |
| **Standards engagement** | Formal proposal submitted to IEEE or NIST | Within 24 months |
| **Clinical validation** | Partner lab testing with real BCI hardware | Phase 1 within 36 months |
| **Adoption signal** | At least one BCI manufacturer commits to NSP evaluation | Within 36 months |

---

## Open Questions

1. **Codec design:** Should NSP-Audio define a single codec or a codec negotiation mechanism (analogous to TLS cipher suites)? A single codec is simpler; negotiation provides flexibility but increases attack surface.

2. **Key management for implants:** How are post-quantum keys provisioned and rotated on implanted hardware that cannot be physically accessed? What is the key revocation model?

3. **Backward compatibility:** Should NSP support a classical encryption fallback for pre-PQC hardware, or is a clean break (PQC-only) the correct design choice?

4. **AI model updates:** The local AI pipeline (object recognition, ASR) will require periodic updates. How are model updates authenticated and delivered securely to implanted devices?

5. **Regulatory pathway:** Which regulatory classification (FDA Class II vs. III) does an NSP-compliant device fall under? Does the protocol itself require separate certification?

6. **Visual encoding fidelity:** What is the minimum useful resolution for visual cortex stimulation? This determines NSP-Visual bandwidth requirements and compression targets.

7. **Power budget for PQC:** ML-KEM and ML-DSA have larger key sizes and higher compute costs than classical schemes. Can these fit within implantable power budgets, or do we need hardware-accelerated PQC?

8. **Interoperability scope:** Should NSP mandate specific sensor hardware (camera specs, microphone specs), or remain sensor-agnostic with defined input format requirements?

9. **Adversarial threat model:** Beyond cryptographic attacks, how does NSP defend against adversarial manipulation of sensor input (e.g., crafted visual patterns designed to produce harmful stimulation)?

10. **Licensing model:** Apache 2.0 (consistent with Qinnovate), RAND-Z (royalty-free, common in standards bodies), or something else?

---

*Qinnovate — Open Standards for Neural Security*
*QIF (Quantum Indeterministic Framework for Neural Security)*
*github.com/qinnovates/mindloft*
