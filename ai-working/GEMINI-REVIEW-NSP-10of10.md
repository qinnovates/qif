# Gemini: NSP v0.2 Roadmap to 10/10 + ChatGPT Prompt

**Date:** 2026-02-06

---

## 5 Changes to Reach 10/10 (ranked by impact)

### 1. Strengthen Handshake Transcript Integrity
Include `HelloRetryRequest` in the transcript hash if used. Prevents attacker from injecting a retry request and desynchronizing the transcript view between client and server.

**Action (Section 4.4):**
```
// If HelloRetryRequest was sent:
transcript_hash = SHA-384(ClientHello_initial || HelloRetryRequest || ClientHello_final || ServerHello || ...)

// If no HelloRetryRequest was sent:
transcript_hash = SHA-384(ClientHello || ServerHello || ...)
```
Add: "If a HelloRetryRequest is sent, the transcript MUST include the initial ClientHello, the HelloRetryRequest, and the second ClientHello."

### 2. Improve Key Separation in Finished Message
Derive dedicated `finished` keys for client and server instead of using the main session key directly. Prevents session key from being used for multiple purposes (encryption AND MACing).

**Action (Section 4.8.7):**
```
client_finished_key = HKDF-SHA-384(IKM=session_key_material, salt=..., info="NSP-v0.2-client-finished")
server_finished_key = HKDF-SHA-384(IKM=session_key_material, salt=..., info="NSP-v0.2-server-finished")

// Client Finished:
verify_data = HMAC-SHA-384(client_finished_key, transcript_hash)

// Server Finished:
verify_data = HMAC-SHA-384(server_finished_key, transcript_hash)
```

### 3. Mandate Proactive Rekeying to Prevent Nonce Wrap
Don't rely solely on 90-day rotation. Add a hard sequence number trigger.

**Action (Section 10.5):**
"Implementations MUST initiate key rotation when the sequence number exceeds 2^31 - 1. A session MUST be terminated with a sequence_number_overflow fatal alert if rekeying does not complete before wrap."

### 4. Clarify Certificate Chain Limitations
Explicitly state: flat trust model, no intermediate CAs in v0.2.

**Action (Section 4.8.9):**
"This version of NSP assumes a flat trust model where the device certificate is signed directly by a recognized Manufacturer Root CA whose public key is known to the receiver. Certificate chains containing intermediate CAs are not supported."

### 5. Formalize Frame Group Signature Omission
Make the group_size=1 rule a formal specification, not just a table comment.

**Action (Section 3.6):**
"For a frame_group_size of 1, the Merkle tree construction is bypassed. The group signature consists only of the ML-DSA-65 signature over the SHA-256 hash of the single encrypted frame. The SPHINCS+ signature is omitted in this minimum-latency configuration."

---

## ChatGPT (GPT-4o) Review Prompt

**Subject: Critical Security Review of NSP v0.2 Protocol Specification**

You are a world-class expert in cryptographic protocol design and network security, with a deep understanding of the NIST PQC standards (ML-KEM, ML-DSA, SLH-DSA), hybrid key exchange, and the practical constraints of embedded/implanted devices.

Your task is to perform a rigorous, critical security review of the attached protocol specification: "Neural Sensory Protocol (NSP) v0.2".

**Do not summarize the document or provide generic praise.** My goal is to find weaknesses. Assume the role of an adversary trying to break the protocol. I have already iterated on this with other AI models (Gemini 1.5, Claude 3), so I am looking for a deeper level of analysis that uncovers issues they might have missed.

Please structure your review to address the following specific areas:

1. **Cryptographic Misuse:** Identify any incorrect choice of cryptographic primitives, flawed parameterization, insecure modes of operation, potential for cross-protocol attacks, or subtle nonce management issues. Scrutinize the hybrid key exchange, key derivation functions, and the use of AES-GCM.

2. **Protocol Logic Errors:** Analyze the handshake state machine for race conditions, deadlock, or downgrade attacks. Examine the transcript hashing, authentication mechanism, and key rotation sequence for any logical flaws that could allow an attacker to bypass security guarantees (e.g., lack of binding between parameters, state confusion).

3. **Real-World Deployment Blockers:** From a practical systems engineering perspective, what are the biggest hurdles to implementing this protocol correctly and securely? Consider performance bottlenecks (latency, throughput), power consumption on constrained hardware, key/certificate management complexity over a 20-year lifecycle, and any ambiguities in the spec that could lead to insecure implementations.

4. **Unique Perspective:** Given your unique training data, what have other AIs likely missed? Focus on subtle interactions between primitives, or parallels to flaws found in older/lesser-known real-world protocols that this design might be unintentionally echoing.

5. **Clean-Slate Redesign:** After your critique, briefly describe the major architectural changes you would make if designing a similar post-quantum BCI protocol from scratch. Would you use a different framework than a TLS-like handshake? A different approach to authentication or agility?

Please be direct, specific, and technical. The attached specification follows.

*(Paste the full NSP v0.2 specification text here)*

---

*Saved from Gemini CLI, 2026-02-06*
