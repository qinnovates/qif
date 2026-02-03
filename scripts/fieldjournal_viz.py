#!/usr/bin/env python3
"""
Field Journal Visualization Generator

Parses QI-FIELDJOURNAL.md for entries missing visualization links,
generates appropriate visualizations, and updates the journal with links.

Triggered by GitHub Actions on commit to ai-working/QI-FIELDJOURNAL.md.
"""

import re
import os
from pathlib import Path

# Visualization output directory
OUTPUT_DIR = Path("autodidact/learnviz/output/fieldjournal")
JOURNAL_PATH = Path("ai-working/QI-FIELDJOURNAL.md")

# Topic-to-visualization mapping
VIZ_PATTERNS = {
    "decoherence": "wave_decoherence",
    "wave": "wave_decoherence",
    "interference": "wave_interference",
    "collapse": "wave_decoherence",
    "tunneling": "tunneling_barrier",
    "barrier": "tunneling_barrier",
    "microtubule": "structure_diagram",
    "myelin": "structure_comparison",
    "fiber optic": "structure_comparison",
    "coaxial": "structure_comparison",
    "ion channel": "structure_diagram",
    "equation": "parameter_explorer",
    "metric": "parameter_explorer",
    "coherence": "coherence_plot",
    "timeline": "timeline",
    "tegmark": "decoherence_timeline",
}


def parse_entries(journal_text: str) -> list[dict]:
    """Parse journal entries, returning those missing visualizations."""
    entry_pattern = re.compile(
        r"### Entry (\w+-\d+): (.+?) \((\d{4}-\d{2}-\d{2})\)\n"
        r"(.*?)"
        r"\*\*Visualization:\*\*[ ]*(.*?)(?=\n\n---|\n\n### Entry|\n\n## |\Z)",
        re.DOTALL,
    )

    entries = []
    for match in entry_pattern.finditer(journal_text):
        entry_id = match.group(1)
        title = match.group(2)
        date = match.group(3)
        body = match.group(4)
        viz_link = match.group(5).strip()

        if not viz_link:  # No visualization yet
            entries.append({
                "id": entry_id,
                "title": title,
                "date": date,
                "body": body,
                "full_match": match.group(0),
            })

    return entries


def determine_viz_type(entry: dict) -> str:
    """Determine visualization type from entry content using weighted keyword matching."""
    text = (entry["title"] + " " + entry["body"]).lower()

    # Count matches per viz type, preferring more specific matches
    scores: dict[str, int] = {}
    for keyword, viz_type in VIZ_PATTERNS.items():
        if keyword in text:
            # Longer keywords are more specific, weight them higher
            weight = len(keyword)
            scores[viz_type] = scores.get(viz_type, 0) + weight

    if not scores:
        return "concept_map"

    return max(scores, key=scores.get)


def generate_wave_decoherence(entry_id: str, output_dir: Path) -> Path:
    """Generate wave decoherence visualization showing phase scrambling."""
    import matplotlib.pyplot as plt
    import numpy as np

    fig, axes = plt.subplots(1, 3, figsize=(15, 4))

    t = np.linspace(0, 4 * np.pi, 1000)

    # Panel 1: Coherent superposition
    wave1 = np.sin(t)
    wave2 = np.sin(t + 0.1)
    axes[0].plot(t, wave1, "b-", alpha=0.7, label="Wave A")
    axes[0].plot(t, wave2, "r-", alpha=0.7, label="Wave B")
    axes[0].plot(t, wave1 + wave2, "purple", linewidth=2, label="Interference")
    axes[0].set_title("Coherent\n(quantum)", fontsize=11, fontweight="bold")
    axes[0].legend(fontsize=8)
    axes[0].set_ylim(-2.5, 2.5)

    # Panel 2: Partial decoherence
    rng = np.random.default_rng(42)
    phase_noise = rng.normal(0, 0.5, len(t)).cumsum() * 0.02
    wave2_noisy = np.sin(t + 0.1 + phase_noise)
    axes[1].plot(t, wave1, "b-", alpha=0.7)
    axes[1].plot(t, wave2_noisy, "r-", alpha=0.7)
    axes[1].plot(t, wave1 + wave2_noisy, "purple", linewidth=2)
    axes[1].set_title("Partial decoherence\n(phase scrambling)", fontsize=11, fontweight="bold")
    axes[1].set_ylim(-2.5, 2.5)

    # Panel 3: Full decoherence
    phase_noise_full = rng.normal(0, 2, len(t)).cumsum() * 0.05
    wave2_scrambled = np.sin(t + phase_noise_full)
    axes[2].plot(t, wave1, "b-", alpha=0.7)
    axes[2].plot(t, wave2_scrambled, "r-", alpha=0.7)
    axes[2].plot(t, wave1 + wave2_scrambled, "purple", linewidth=2)
    axes[2].set_title("Full decoherence\n(classical)", fontsize=11, fontweight="bold")
    axes[2].set_ylim(-2.5, 2.5)

    for ax in axes:
        ax.set_xlabel("Time", fontsize=9)
        ax.set_ylabel("Amplitude", fontsize=9)
        ax.grid(True, alpha=0.3)

    fig.suptitle(f"Decoherence as Phase Dilution — {entry_id}", fontsize=13, y=1.02)
    plt.tight_layout()

    out_path = output_dir / f"{entry_id.lower()}_decoherence.png"
    fig.savefig(out_path, dpi=150, bbox_inches="tight")
    plt.close(fig)
    return out_path


def generate_tunneling_barrier(entry_id: str, output_dir: Path) -> Path:
    """Generate quantum tunneling through barrier visualization."""
    import matplotlib.pyplot as plt
    import numpy as np

    fig, ax = plt.subplots(figsize=(10, 5))

    x = np.linspace(-5, 10, 1000)

    # Barrier
    barrier_left = 2.0
    barrier_right = 4.0
    barrier_height = 3.0
    barrier = np.where((x >= barrier_left) & (x <= barrier_right), barrier_height, 0)
    ax.fill_between(x, 0, barrier, color="gray", alpha=0.3, label="Energy barrier")
    ax.plot(x, barrier, "k-", linewidth=2)

    # Incoming wave (left of barrier)
    mask_left = x < barrier_left
    incoming = np.zeros_like(x)
    incoming[mask_left] = np.exp(-0.1 * (x[mask_left] - 1) ** 2) * np.cos(3 * x[mask_left])
    ax.plot(x, incoming + 0.01, "b-", linewidth=2, label="Incoming wave")

    # Tunneled wave (right of barrier) — exponentially decayed
    mask_right = x > barrier_right
    tunneled = np.zeros_like(x)
    tunneled[mask_right] = 0.15 * np.exp(-0.2 * (x[mask_right] - barrier_right)) * np.cos(
        3 * x[mask_right]
    )
    ax.plot(x, tunneled + 0.01, "r-", linewidth=2, label="Tunneled wave (attenuated)")

    # Exponential decay inside barrier
    mask_barrier = (x >= barrier_left) & (x <= barrier_right)
    decay = np.zeros_like(x)
    decay[mask_barrier] = np.exp(-1.5 * (x[mask_barrier] - barrier_left))
    ax.plot(x[mask_barrier], decay[mask_barrier] * 0.8, "g--", linewidth=1.5, label="Decay inside barrier")

    ax.set_xlabel("Position", fontsize=11)
    ax.set_ylabel("Amplitude / Energy", fontsize=11)
    ax.set_title(f"Quantum Tunneling Through a Barrier — {entry_id}", fontsize=13)
    ax.legend(fontsize=9)
    ax.set_ylim(-0.5, 4)
    ax.grid(True, alpha=0.3)

    ax.annotate(
        "Classically\nforbidden",
        xy=(3, 1.5),
        fontsize=10,
        ha="center",
        style="italic",
        color="gray",
    )

    plt.tight_layout()
    out_path = output_dir / f"{entry_id.lower()}_tunneling.png"
    fig.savefig(out_path, dpi=150, bbox_inches="tight")
    plt.close(fig)
    return out_path


def generate_structure_comparison(entry_id: str, output_dir: Path) -> Path:
    """Generate comparison diagram (myelin vs coaxial cable vs fiber optic)."""
    import matplotlib.pyplot as plt
    import matplotlib.patches as patches

    fig, axes = plt.subplots(1, 3, figsize=(15, 5))

    # Myelin sheath
    ax = axes[0]
    ax.set_xlim(-3, 3)
    ax.set_ylim(-2, 2)
    ax.set_aspect("equal")
    ax.add_patch(patches.FancyBboxPatch((-2.5, -0.15), 5, 0.3, boxstyle="round,pad=0.05", facecolor="#FFD700", edgecolor="black", linewidth=1.5))
    for i, xpos in enumerate([-1.5, 0, 1.5]):
        ax.add_patch(patches.FancyBboxPatch((xpos - 0.6, -0.5), 1.2, 1, boxstyle="round,pad=0.1", facecolor="#8B4513", alpha=0.4, edgecolor="brown", linewidth=1))
    ax.annotate("Axon", xy=(0, 0), ha="center", va="center", fontsize=10, fontweight="bold", color="black")
    ax.annotate("Myelin", xy=(0, 0.7), ha="center", fontsize=9, color="brown")
    ax.annotate("Node of\nRanvier", xy=(0.75, -0.7), ha="center", fontsize=7, color="gray")
    ax.set_title("Myelin Sheath\n(Biology, ~500M years)", fontsize=11, fontweight="bold")
    ax.axis("off")

    # Coaxial cable
    ax = axes[1]
    ax.set_xlim(-3, 3)
    ax.set_ylim(-2, 2)
    ax.set_aspect("equal")
    ax.add_patch(patches.Circle((0, 0), 1.5, facecolor="#D3D3D3", edgecolor="black", linewidth=1.5))
    ax.add_patch(patches.Circle((0, 0), 1.0, facecolor="white", edgecolor="black", linewidth=1))
    ax.add_patch(patches.Circle((0, 0), 0.5, facecolor="#B87333", edgecolor="black", linewidth=1.5))
    ax.annotate("Conductor", xy=(0, 0), ha="center", va="center", fontsize=8, fontweight="bold")
    ax.annotate("Insulation", xy=(0.75, 0.75), ha="center", fontsize=7, color="gray")
    ax.annotate("Shield", xy=(1.1, -1.1), ha="center", fontsize=7, color="gray")
    ax.set_title("Coaxial Cable\n(Engineering, 1880s)", fontsize=11, fontweight="bold")
    ax.axis("off")

    # Fiber optic
    ax = axes[2]
    ax.set_xlim(-3, 3)
    ax.set_ylim(-2, 2)
    ax.set_aspect("equal")
    ax.add_patch(patches.Circle((0, 0), 1.5, facecolor="#87CEEB", edgecolor="black", linewidth=1.5))
    ax.add_patch(patches.Circle((0, 0), 0.7, facecolor="#4169E1", edgecolor="black", linewidth=1.5))
    ax.annotate("Core", xy=(0, 0), ha="center", va="center", fontsize=9, fontweight="bold", color="white")
    ax.annotate("Cladding", xy=(1.1, 0), ha="center", fontsize=8, color="navy")
    ax.set_title("Fiber Optic Cable\n(Engineering, 1960s)", fontsize=11, fontweight="bold")
    ax.axis("off")

    fig.suptitle(f"Convergent Design: Signal Insulation Across Domains — {entry_id}", fontsize=13, y=1.02)
    plt.tight_layout()

    out_path = output_dir / f"{entry_id.lower()}_structure.png"
    fig.savefig(out_path, dpi=150, bbox_inches="tight")
    plt.close(fig)
    return out_path


def generate_structure_diagram(entry_id: str, output_dir: Path) -> Path:
    """Generate a labeled structure diagram for biological structures."""
    import matplotlib.pyplot as plt
    import matplotlib.patches as patches

    fig, ax = plt.subplots(figsize=(10, 6))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7)
    ax.set_aspect("equal")

    # Neuron body
    ax.add_patch(patches.Circle((3, 3.5), 1.5, facecolor="#FFE4B5", edgecolor="black", linewidth=2))
    ax.annotate("Neuron\nCell Body", xy=(3, 3.5), ha="center", va="center", fontsize=10, fontweight="bold")

    # Microtubules inside
    for y_off in [-0.4, 0, 0.4]:
        ax.plot([2.2, 3.8], [3.5 + y_off, 3.5 + y_off], "g-", linewidth=3, alpha=0.6)
    ax.annotate("Microtubules\n(~25 nm)", xy=(3, 2.5), ha="center", fontsize=8, color="green",
                arrowprops=dict(arrowstyle="->", color="green"), xytext=(3, 1.5))

    # Ion channel
    ax.add_patch(patches.Rectangle((6.5, 3.0), 0.5, 1.0, facecolor="#FF6347", edgecolor="black", linewidth=1.5))
    ax.annotate("Ion Channel\n(~1 nm)", xy=(6.75, 2.8), ha="center", fontsize=8, color="red",
                arrowprops=dict(arrowstyle="->", color="red"), xytext=(6.75, 1.5))

    # Membrane
    ax.plot([5, 8], [3, 3], "k-", linewidth=2)
    ax.plot([5, 8], [4, 4], "k-", linewidth=2)
    ax.annotate("Cell Membrane", xy=(8.2, 3.5), fontsize=9, va="center")

    # Tegmark's calculation zone
    ax.add_patch(patches.FancyBboxPatch((5.5, 2.5), 2.5, 2,
                 boxstyle="round,pad=0.1", facecolor="none", edgecolor="red",
                 linewidth=2, linestyle="--"))
    ax.annotate("Tegmark's\ncalculation\nzone", xy=(8.5, 5.5), fontsize=9, color="red",
                ha="center", fontweight="bold")

    # Hagan's shielding zone
    ax.add_patch(patches.FancyBboxPatch((1.8, 2.8), 4, 1.5,
                 boxstyle="round,pad=0.1", facecolor="none", edgecolor="green",
                 linewidth=2, linestyle="--"))
    ax.annotate("Hagan's proposed\nshielding zone", xy=(1, 5.5), fontsize=9, color="green",
                ha="center", fontweight="bold")

    ax.set_title(f"Quantum Decoherence Debate: Where It Happens — {entry_id}", fontsize=13)
    ax.axis("off")

    plt.tight_layout()
    out_path = output_dir / f"{entry_id.lower()}_structure.png"
    fig.savefig(out_path, dpi=150, bbox_inches="tight")
    plt.close(fig)
    return out_path


def generate_decoherence_timeline(entry_id: str, output_dir: Path) -> Path:
    """Generate timeline of decoherence research."""
    import matplotlib.pyplot as plt
    import numpy as np

    fig, ax = plt.subplots(figsize=(14, 4))

    events = [
        (2000, "Tegmark\n10⁻¹³ s", "red"),
        (2002, "Hagan et al.\n10⁻⁶ s\n(microtubules)", "green"),
        (2014, "Hameroff &\nPenrose\n(Orch-OR review)", "blue"),
        (2015, "Fisher\n(Posner\nmolecules)", "purple"),
        (2020, "Bandyopadhyay\n(tubulin\noscillations)", "orange"),
        (2024, "Dewan\n(non-Markovian\ndynamics)", "teal"),
        (2025, "Fisher group\n(experimental\nevidence)", "purple"),
    ]

    ax.axhline(y=0, color="black", linewidth=2)

    for i, (year, label, color) in enumerate(events):
        y_offset = 0.8 if i % 2 == 0 else -0.8
        ax.plot(year, 0, "o", color=color, markersize=12, zorder=5)
        ax.annotate(
            label,
            xy=(year, 0),
            xytext=(year, y_offset),
            fontsize=8,
            ha="center",
            va="bottom" if y_offset > 0 else "top",
            fontweight="bold",
            color=color,
            arrowprops=dict(arrowstyle="-", color=color, linewidth=1),
        )
        ax.annotate(str(year), xy=(year, 0), xytext=(year, -0.15 if y_offset > 0 else 0.15),
                    fontsize=8, ha="center", va="top" if y_offset > 0 else "bottom", color="gray")

    ax.set_xlim(1998, 2027)
    ax.set_ylim(-2, 2)
    ax.set_title(f"The Decoherence Debate: 25 Years of Quantum Brain Research — {entry_id}", fontsize=13)
    ax.axis("off")

    plt.tight_layout()
    out_path = output_dir / f"{entry_id.lower()}_timeline.png"
    fig.savefig(out_path, dpi=150, bbox_inches="tight")
    plt.close(fig)
    return out_path


def generate_concept_map(entry_id: str, output_dir: Path) -> Path:
    """Fallback: generate a simple concept map from entry keywords."""
    import matplotlib.pyplot as plt

    fig, ax = plt.subplots(figsize=(8, 6))
    ax.text(0.5, 0.5, f"Concept map\n{entry_id}\n(auto-generated)", ha="center", va="center",
            fontsize=14, transform=ax.transAxes)
    ax.axis("off")

    out_path = output_dir / f"{entry_id.lower()}_concept.png"
    fig.savefig(out_path, dpi=150, bbox_inches="tight")
    plt.close(fig)
    return out_path


# Generator dispatch
GENERATORS = {
    "wave_decoherence": generate_wave_decoherence,
    "wave_interference": generate_wave_decoherence,
    "tunneling_barrier": generate_tunneling_barrier,
    "structure_comparison": generate_structure_comparison,
    "structure_diagram": generate_structure_diagram,
    "decoherence_timeline": generate_decoherence_timeline,
    "parameter_explorer": generate_concept_map,
    "coherence_plot": generate_concept_map,
    "timeline": generate_decoherence_timeline,
    "concept_map": generate_concept_map,
}


def main():
    """Main entry point: parse journal, generate missing vizs, update journal."""
    if not JOURNAL_PATH.exists():
        print(f"Journal not found at {JOURNAL_PATH}")
        return

    journal_text = JOURNAL_PATH.read_text()
    entries = parse_entries(journal_text)

    if not entries:
        print("No entries missing visualizations. Nothing to do.")
        return

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    updated_text = journal_text
    generated = 0

    for entry in entries:
        entry_id = entry["id"]
        viz_type = determine_viz_type(entry)
        generator = GENERATORS.get(viz_type, generate_concept_map)

        print(f"Generating {viz_type} for {entry_id}: {entry['title']}")

        try:
            out_path = generator(entry_id, OUTPUT_DIR)
            rel_path = os.path.relpath(out_path, JOURNAL_PATH.parent)

            # Update the journal entry with the visualization link
            old_viz_line = f"**Visualization:**"
            new_viz_line = f"**Visualization:** ![{entry_id}]({rel_path})"

            # Only replace the first occurrence within this entry's context
            # Find the entry in the text and update its viz line
            entry_start = updated_text.find(f"### Entry {entry_id}:")
            if entry_start >= 0:
                next_entry = updated_text.find("### Entry ", entry_start + 1)
                if next_entry == -1:
                    next_entry = len(updated_text)

                entry_section = updated_text[entry_start:next_entry]
                viz_pos = entry_section.rfind(old_viz_line)
                if viz_pos >= 0:
                    updated_section = (
                        entry_section[:viz_pos]
                        + new_viz_line
                        + entry_section[viz_pos + len(old_viz_line):]
                    )
                    updated_text = updated_text[:entry_start] + updated_section + updated_text[next_entry:]
                    generated += 1

        except Exception as e:
            print(f"  Error generating viz for {entry_id}: {e}")

    if generated > 0:
        JOURNAL_PATH.write_text(updated_text)
        print(f"\nGenerated {generated} visualizations. Journal updated.")
    else:
        print("\nNo visualizations generated.")


if __name__ == "__main__":
    main()
