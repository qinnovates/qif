# Neuroscience & BCI Research

> **Purpose:** Personal research and learning repository for neuroscience concepts I need to understand to build the ONI Framework. This is where I figure out things I don't know but need to know.

**This is NOT polished documentation.** It's a working knowledge base for building understanding of the biological substrate that BCIs interface with.

---

## Table of Contents

1. [BCI-Functional Electrode Zone Classification](#bci-functional-electrode-zone-classification)
2. [Kanban](#kanban)
3. [Folder Structure](#folder-structure)
4. [Purpose of Each Folder](#purpose-of-each-folder)
5. [Research Documents](#research-documents)
6. [Key Questions](#key-questions-this-research-aims-to-answer)
7. [Related Projects](#related-projects)
8. [Adding Research](#adding-research)

---

## BCI-Functional Electrode Zone Classification

> **Learning Framework:** Organize brain regions by *what they do* (function) rather than *where they are* (anatomy). This is more practical for understanding electrode placement and BCI security.

### The 10 Key BCI Electrode Zones

| Region | Full Name | ONI Layer | Function | BCI Access | MNI Coords |
|--------|-----------|-----------|----------|------------|------------|
| **M1** | Primary Motor Cortex | L13 (Semantic) | MOTOR | High | (-35,-20,55) |
| **S1** | Primary Somatosensory Cortex | L12 (Session) | SENSORY | High | (-35,-35,50) |
| **PMC** | Premotor Cortex | L13 (Semantic) | EXECUTIVE | High | (-45,5,50) |
| **SMA** | Supplementary Motor Area | L13 (Semantic) | EXECUTIVE | High | (0,-5,60) |
| **PFC** | Prefrontal Cortex | L14 (Identity) | COGNITIVE | High | (35,45,25) |
| **BROCA** | Broca's Area | L14 (Identity) | LANGUAGE | Medium | (-50,20,15) |
| **WERNICKE** | Wernicke's Area | L14 (Identity) | LANGUAGE | Medium | (-55,-55,20) |
| **V1** | Primary Visual Cortex | L12 (Session) | VISUAL | High | (0,-85,5) |
| **A1** | Primary Auditory Cortex | L12 (Session) | AUDITORY | High | (-55,-20,10) |
| **HIPP** | Hippocampus | L11 (Transport) | MEMORY | Medium | (-25,-20,-15) |

### Understanding the Two Classifications

| Classification | What It Tells You | Example |
|----------------|-------------------|---------|
| **ONI Layer** | Functional role in cognitive stack | M1 = L13 (translates intent → motor commands) |
| **BCI Access** | Physical accessibility to electrodes | M1 = High (surface cortex, easy to reach) |

These are **orthogonal** — a region can be L13 (high-level function) but still have High BCI access (easy to reach physically).

### BCI Access Levels

| Level | Meaning | Regions |
|-------|---------|---------|
| **High** | Surface cortex, well-characterized, primary BCI targets | M1, S1, PMC, SMA, PFC, V1, A1 |
| **Medium** | Deeper or more complex access requirements | BROCA, WERNICKE, HIPP |
| **Low** | Deep brain structures, specialized electrodes needed | SNc, VTA, NAc, LC, Raphe |
| **None** | Too deep or risky for current BCI technology | VLPO, LHA |

### Source Files

- **TARA:** `MAIN/tara-nsec-platform/tara_mvp/data/brain_regions.py`
- **ONI Framework:** `MAIN/oni-framework/oni/neuromapping.py`

---

## Kanban

### Backlog
| Task | Description | Priority |
|------|-------------|----------|
| Motor cortex deep dive | Understand electrode placement, neural decoding | High |
| Neurotransmitter systems | DA, 5-HT, NE pathways and cofactors | High |
| BCI-to-neuron zoom animation | Blender/Manim visualization project | Medium |
| Synaptic transmission | How signals cross synapses | Medium |
| Ion channel mechanics | Na+/K+ channels, action potentials | Low |

### In Progress
| Task | Description | Notes |
|------|-------------|-------|
| BCI Mouse Movement | How BCIs decode motor signals | See Research-BCI_Mouse_Movement.md |

### Done
| Task | Completed | Output |
|------|-----------|--------|
| Initial folder structure | 2026-01-26 | Brain region folders created |
| Visualization assets collected | 2026-01-26 | visualizing-the-mind/ |

---

## Folder Structure

```
neuroscience-homework-todo/
├── README.md                           # This file
├── Research-BCI_Mouse_Movement.md      # How BCIs enable cursor/keyboard control
│
├── visualizing-the-mind/               # 3D visualization projects (Blender, Manim)
│   ├── blender/                        # Blender scene files and renders
│   └── manim/                          # Manim animation scripts
│
├── bci-electrode-zones/                # ═══ BCI-FUNCTIONAL CLASSIFICATION ═══
│   ├── motor/                          # Movement control
│   │   └── M1 - Primary Motor Cortex/
│   │
│   ├── sensory/                        # Touch, proprioception
│   │   └── S1 - Primary Somatosensory Cortex/
│   │
│   ├── cognitive/                      # Executive function, decision-making
│   │   └── PFC - Prefrontal Cortex/
│   │
│   ├── language/                       # Speech production and comprehension
│   │   ├── BROCA - Broca's Area/
│   │   └── WERNICKE - Wernicke's Area/
│   │
│   ├── visual/                         # Vision processing
│   │   └── V1 - Primary Visual Cortex/
│   │
│   ├── auditory/                       # Hearing processing
│   │   └── A1 - Primary Auditory Cortex/
│   │
│   ├── memory/                         # Memory formation and retrieval
│   │   └── HIPP - Hippocampus/
│   │
│   └── executive/                      # Motor planning and coordination
│       ├── PMC - Premotor Cortex/
│       └── SMA - Supplementary Motor Area/
│
└── brain-regions/                      # ═══ ANATOMICAL CLASSIFICATION ═══
    ├── cerebral-cortex/                # Outer brain layer (higher functions)
    │   ├── motor-cortex/               # Movement control (BCI primary target)
    │   ├── sensory-cortex/             # Touch, proprioception
    │   ├── prefrontal-cortex/          # Executive function, planning
    │   ├── visual-cortex/              # Vision processing
    │   ├── auditory-cortex/            # Hearing processing
    │   └── parietal-cortex/            # Spatial awareness, integration
    │
    ├── cerebellum/                     # Movement coordination, balance
    │
    ├── brainstem/                      # Vital functions
    │   ├── medulla/                    # Heart rate, breathing
    │   ├── pons/                       # Sleep, arousal
    │   └── midbrain/                   # Eye movement, hearing
    │
    ├── limbic-system/                  # Emotion, memory
    │   ├── amygdala/                   # Fear, emotion processing
    │   ├── hippocampus/                # Memory formation
    │   └── cingulate-cortex/           # Decision-making, emotion
    │
    ├── thalamus/                       # Sensory relay station
    ├── hypothalamus/                   # Hormones, homeostasis
    ├── basal-ganglia/                  # Movement initiation, habits
    ├── corpus-callosum/                # Hemispheric communication
    └── neural-pathways/                # Major fiber tracts
```

---

## Purpose of Each Folder

### Two Classification Systems

| Folder | Organization | Best For |
|--------|--------------|----------|
| **bci-electrode-zones/** | By function (what it does) | Learning BCI electrode placement, security analysis |
| **brain-regions/** | By anatomy (where it is) | Understanding brain structure, neuroscience foundations |

### What Goes in Each Region Folder

1. **How it works** — Function, anatomy, connections
2. **Research notes** — Papers, findings, key facts
3. **Questions** — Things to ask researchers/professionals
4. **Unknowns** — What science hasn't figured out yet
5. **BCI relevance** — How this region relates to brain-computer interfaces
6. **Security implications** — Potential vulnerabilities, attack surfaces
7. **ONI layer mapping** — Which layer(s) this region maps to

---

## Research Documents

| Document | Description |
|----------|-------------|
| [Research-BCI_Mouse_Movement.md](./Research-BCI_Mouse_Movement.md) | Deep dive on how BCIs decode motor cortex signals for cursor control |

---

## Key Questions This Research Aims to Answer

1. Where exactly do BCI electrodes sit in the brain?
2. How deep do they go?
3. What signals do they record?
4. How are those signals decoded into actions?
5. What are the current technological limitations?
6. What questions remain unanswered in the field?

---

## Related Projects

- **Visualizations:** [visualizing-the-mind/](./visualizing-the-mind/) — Blender and Manim visualization projects
- **Backlog:** [bci-to-neuron-zoom-rendering](../docs/visualizations/pending/bci-to-neuron-zoom-rendering/) — GitHub Pages pending visualization
- **Video Assets:** `video/bci-zoom/` — Video project files
- **ONI_LAYERS.md:** Biological Foundation section — How this maps to L8-L14
- **oni/neuromapping.py:** Python API for brain region → layer mappings

---

## Adding Research

When adding research to a brain region folder:

1. Create a file named `Notes-[Topic].md` for informal notes
2. Create `Research-[Topic].md` for structured research
3. Include sources with links
4. Tag questions with `[Q]` prefix
5. Tag unknowns with `[?]` prefix

Example:
```markdown
## Motor Cortex Notes

[Q] Why do some neurons respond to imagined movement but not actual movement?

[?] Unknown: The exact mechanism by which motor cortex neurons "know" whether movement is intended vs executed.

Source: Smith et al. (2023) - https://example.com/paper
```

---

*Last Updated: 2026-01-26*
