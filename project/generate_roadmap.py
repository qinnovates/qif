#!/usr/bin/env python3
"""
Generate ROADMAP.md from prd.json

Single source of truth: prd.json
Generated output: ROADMAP.md

Run manually or via GitHub Action on push.
"""

import json
from datetime import datetime
from pathlib import Path


def load_prd(path: Path) -> dict:
    with open(path) as f:
        return json.load(f)


def generate_roadmap(prd: dict) -> str:
    lines = []

    # Header
    lines.append("# Roadmap")
    lines.append("")
    lines.append("> **Auto-generated from [prd.json](prd.json)** — do not edit directly.")
    lines.append(f"> Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append("")

    # Progress summary
    metrics = prd.get("metrics", {})
    total = metrics.get("total_tasks", 0)
    completed = metrics.get("completed", 0)
    pending = metrics.get("pending", 0)
    rate = metrics.get("completion_rate", "0%")

    lines.append("## Progress")
    lines.append("")
    lines.append(f"| Total | Completed | Pending | Rate |")
    lines.append(f"|-------|-----------|---------|------|")
    lines.append(f"| {total} | {completed} | {pending} | {rate} |")
    lines.append("")

    # Progress bar (text-based)
    if total > 0:
        pct = int((completed / total) * 100)
        filled = pct // 5
        bar = "█" * filled + "░" * (20 - filled)
        lines.append(f"```")
        lines.append(f"[{bar}] {pct}%")
        lines.append(f"```")
        lines.append("")

    # Pending tasks
    pending_tasks = [t for t in prd.get("tasks", []) if t.get("status") == "pending"]
    if pending_tasks:
        lines.append("## Pending Tasks")
        lines.append("")
        for task in pending_tasks:
            priority = task.get("priority", "medium")
            priority_badge = {"critical": "🔴", "high": "🟠", "medium": "🟡", "low": "🟢"}.get(priority, "⚪")
            lines.append(f"- {priority_badge} **{task['id']}**: {task['description']}")
            if task.get("depends_on"):
                lines.append(f"  - Depends on: {', '.join(task['depends_on'])}")
        lines.append("")

    # Future work
    future = prd.get("future_work", [])
    if future:
        lines.append("## Future Work")
        lines.append("")
        for item in future:
            status = item.get("status", "backlog")
            status_badge = {
                "backlog": "📋",
                "in-progress": "🚧",
                "blocked-external": "⛔",
                "research-needed": "🔬"
            }.get(status, "📋")

            lines.append(f"### {status_badge} {item['title']}")
            lines.append("")
            lines.append(f"{item.get('description', '')}")
            lines.append("")

            if item.get("rationale"):
                lines.append(f"**Rationale:** {item['rationale']}")
                lines.append("")

            # Deliverables
            deliverables = item.get("deliverables", [])
            if deliverables:
                lines.append("**Deliverables:**")
                for d in deliverables:
                    d_status = d.get("status", "backlog")
                    checkbox = "☑️" if d_status == "complete" else "☐"
                    lines.append(f"- {checkbox} {d.get('title', d.get('id', 'Unknown'))}")
                lines.append("")

            # Components (for epics)
            components = item.get("components", [])
            if components:
                lines.append("**Components:**")
                for c in components:
                    c_status = c.get("status", "backlog")
                    checkbox = "☑️" if c_status in ["complete", "design-complete"] else "☐"
                    lines.append(f"- {checkbox} {c.get('title', c.get('id', 'Unknown'))}")
                lines.append("")

            if item.get("estimated_effort"):
                lines.append(f"**Effort:** {item['estimated_effort']}")
            if item.get("timeline"):
                lines.append(f"**Timeline:** {item['timeline']}")
            if item.get("feasibility"):
                lines.append(f"**Feasibility:** {item['feasibility']}")
            lines.append("")
            lines.append("---")
            lines.append("")

    # Recent completions
    completed_tasks = [t for t in prd.get("tasks", []) if t.get("status") == "complete"]
    completed_tasks.sort(key=lambda x: x.get("completed_at", ""), reverse=True)
    recent = completed_tasks[:10]

    if recent:
        lines.append("## Recent Completions")
        lines.append("")
        lines.append("| Task | Completed | Learnings |")
        lines.append("|------|-----------|-----------|")
        for task in recent:
            date = task.get("completed_at", "")
            learnings = task.get("learnings", "")
            # Truncate learnings for table
            if len(learnings) > 60:
                learnings = learnings[:57] + "..."
            lines.append(f"| {task['id']} | {date} | {learnings} |")
        lines.append("")

    return "\n".join(lines)


def main():
    script_dir = Path(__file__).parent
    prd_path = script_dir / "prd.json"
    roadmap_path = script_dir / "ROADMAP.md"

    prd = load_prd(prd_path)
    roadmap = generate_roadmap(prd)

    with open(roadmap_path, "w") as f:
        f.write(roadmap)

    print(f"Generated {roadmap_path}")


if __name__ == "__main__":
    main()
