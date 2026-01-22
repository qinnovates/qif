# Process Improvement Strategy for ONI Framework Publishing

## Current State Analysis

### What's Working
1. **Clear folder structure** - Topic-based organization with `MAIN/publications/` and `MAIN/resources/` separation
2. **Naming conventions** - Consistent `Blog-*` and `TechDoc-*` patterns across all 13 publications
3. **Templates exist** - APA TechDoc, Blog, and INDEX templates provide comprehensive formatting guidance
4. **CLAUDE.md** - Comprehensive AI instructions with file trees, workflows, and quality checklists
5. **MAIN/INDEX.md** - Cross-reference registry with dependency maps, publication matrix, and metrics
6. **Research Pipeline** - Automated research monitoring via `keywords.json` and `research_monitor.py`
7. **YAML front-matter** - Implemented on all publications with title, date, URL, and tags
8. **Topic INDEX.md files** - All 7 topic folders have INDEX.md with dependencies, key concepts, and future work
9. **APA formatting** - Technical documents follow APA 7th edition with proper citations and acknowledgments

### Gaps Identified
1. ~~No automated validation of file naming~~ → Checklist documented, automation pending
2. ~~README.md updates are manual and error-prone~~ → Process documented in CLAUDE.md
3. ~~No version tracking for individual documents~~ → Partial (front-matter on publications)
4. ~~Cross-references between papers not systematically maintained~~ → **RESOLVED: MAIN/INDEX.md**
5. ~~INDEX.md only deployed to 1 of 5 topic folders~~ → **RESOLVED: All 7 folders have INDEX.md**
6. No content calendar or publishing schedule tracking
7. No CHANGELOG.md at repository root
8. No automated docx generation workflow (currently manual pandoc commands)

---

## Recommended Improvements

### 1. Pre-Commit Checklist Automation

Create a checklist that Claude runs through before every commit:

```markdown
## Pre-Commit Verification

### File Naming
- [ ] All blog posts match `Blog-[Topic_Name].md`
- [ ] All papers match `TechDoc-[Topic_Name].md`
- [ ] Folder names are lowercase-hyphenated
- [ ] INDEX.md exists in topic folder

### Content Quality
- [ ] APA formatting on TechDocs (author, abstract, keywords, numbered sections)
- [ ] References are APA formatted with DOIs where available
- [ ] Acknowledgments section included (TechDocs)
- [ ] Front matter complete (Blog posts)
- [ ] Related Articles section included (Blog posts)

### Repository Updates
- [ ] MAIN/INDEX.md Quick Navigation updated
- [ ] MAIN/INDEX.md Reading Order updated
- [ ] MAIN/INDEX.md Dependency Map updated
- [ ] MAIN/INDEX.md Cross-Reference Matrix updated
- [ ] MAIN/INDEX.md Metrics updated
- [ ] Topic INDEX.md created/updated
- [ ] docx files regenerated via pandoc
```

### 2. Document Metadata Standard

Add consistent metadata to all documents:

```yaml
---
# Required for all documents
title: ""
type: "Blog" | "TechDoc" | "Template" | "Instructions"
topic: ""  # Maps to folder name
version: "1.0"
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"

# For Blog posts
url: ""
tags: []

# For TechDocs
keywords: []
abstract: ""
---
```

### 3. Cross-Reference Registry

Maintained in MAIN/INDEX.md. Current state (as of January 2026):

| Document | References | Referenced By |
|----------|------------|---------------|
| ONI Framework | - | All other papers |
| Coherence Metric | ONI Framework | Neural Firewall, Neural Ransomware, TTT |
| Scale-Frequency | ONI Framework | Quantum Security, TTT |
| Neural Firewall | ONI Framework, Coherence Metric | Neural Ransomware, TTT |
| Neural Ransomware | ONI Framework, Coherence Metric, Neural Firewall | - |
| Quantum Security | ONI Framework, Scale-Frequency, Coherence Metric | TTT |
| Tunneling Traversal Time | ONI Framework, Scale-Frequency, Quantum Security, Coherence Metric | - |

### 4. Version Changelog

Create `CHANGELOG.md` at repository root:

```markdown
# Changelog

## [2026-01-22]
### Added
- Tunneling Traversal Time publication (Blog + TechDoc)
- Topic INDEX.md for tunneling-traversal-time
- Quantum Security TechDoc

### Changed
- Updated MAIN/INDEX.md with new publication (metrics now 7 topics, 13 docs)
- Cross-reference matrix expanded to include TTT

## [2026-01-21]
### Added
- MAIN/INDEX.md as central navigation hub
- INDEX_TEMPLATE.md for topic folders
- Quantum Security Blog post

### Changed
- Reorganized into MAIN/publications structure
- Renamed files from Medium-* to Blog-* convention
- Updated all topic INDEX.md files

### Removed
- medium_template_v2.py (consolidated into BLOG_TEMPLATE.md)
```

### 5. Publishing Workflow States

Track content through stages:

```
Research → Draft → Review → Formatted → Committed → Published
```

For each document, track:
- Current state
- Last update date
- Medium URL (if published)
- Any pending updates needed

---

## Template Inventory

### Current Templates
| Template | Purpose | Location | Status |
|----------|---------|----------|--------|
| TECHDOC_TEMPLATE_APA.md | Technical papers (APA 7th) | MAIN/resources/templates/ | Active |
| BLOG_TEMPLATE.md | Blog posts (Medium-optimized) | MAIN/resources/templates/ | Active |
| INDEX_TEMPLATE.md | Topic folder indexes | MAIN/resources/templates/ | Active |
| PUBLISHING_INSTRUCTIONS.md | Workflow guide | MAIN/resources/processes/ | Active |

### Deprecated Templates
| Template | Reason | Replaced By |
|----------|--------|-------------|
| medium_template_v2.py | Consolidated | BLOG_TEMPLATE.md |
| MEDIUM_TEMPLATE.md | Renamed | BLOG_TEMPLATE.md |

### Proposed Additional Templates

#### 1. Research Note Template (NOT YET IMPLEMENTED)
For shorter, less formal research notes that may become papers later:

```markdown
# Research Note: [Topic]

**Date:** YYYY-MM-DD
**Status:** Draft | In Review | Archived
**Related Papers:** [links]

## Key Insight

[1-2 paragraph summary]

## Supporting Evidence

[Bullet points or short sections]

## Questions for Further Research

- [ ] Question 1
- [ ] Question 2

## Raw Notes

[Unstructured notes, quotes, references]
```

#### 2. Topic Index Template — IMPLEMENTED
Template exists at `MAIN/resources/templates/INDEX_TEMPLATE.md`. **Deployed to all 7 topic folders.**

---

## Automation Opportunities

### 1. INDEX.md Auto-Update Script

Logic for Claude to follow after each content addition:

1. Scan `MAIN/publications/*/` for all markdown files
2. Count total documents (Blog + TechDoc per folder)
3. Update MAIN/INDEX.md metrics section
4. Verify all links in Quick Navigation section are valid
5. Update dependency map if new topic added

### 2. File Naming Validator

Before commit, verify:
```
- Blog posts: /^Blog-[A-Z][a-zA-Z_]+\.md$/
- TechDocs: /^TechDoc-[A-Z][a-zA-Z_]+\.md$/
- Folders: /^[a-z]+(-[a-z]+)*$/
- Required files per folder: INDEX.md, Blog-*.md, TechDoc-*.md
```

### 3. Cross-Reference Checker

After editing any paper:
1. Extract all internal references (links to other ONI papers)
2. Verify referenced documents exist
3. Check if referenced documents need updates for consistency

### 4. Docx Generation Automation

After each markdown update:
```bash
cd MAIN/publications/[topic]/
pandoc Blog-*.md -o Blog-*.docx
pandoc TechDoc-*.md -o TechDoc-*.docx
```

---

## Current File Tree (Implemented)

```
ONI/
├── README.md
├── CLAUDE.md                       # AI instructions
├── ABOUT.md
├── CHANGELOG.md                    # PENDING
├── CONTRIBUTING.md
├── LICENSE
│
└── MAIN/
    ├── INDEX.md                     # Central navigation hub
    │
    ├── resources/
    │   ├── templates/
    │   │   ├── TECHDOC_TEMPLATE_APA.md
    │   │   ├── BLOG_TEMPLATE.md
    │   │   └── INDEX_TEMPLATE.md
    │   ├── processes/
    │   │   ├── PUBLISHING_INSTRUCTIONS.md
    │   │   └── PROCESS_IMPROVEMENTS.md   # This file
    │   └── pipeline/
    │       ├── scripts/
    │       │   ├── keywords.json
    │       │   └── research_monitor.py
    │       ├── incoming/
    │       └── processed/
    │
    ├── publications/
    │   ├── 0-oni-framework/
    │   │   ├── INDEX.md              # COMPLETE
    │   │   ├── Blog-ONI_Framework.md
    │   │   └── TechDoc-ONI_Framework.md
    │   │
    │   ├── coherence-metric/
    │   │   ├── INDEX.md              # COMPLETE
    │   │   ├── Blog-Coherence_Metric.md
    │   │   └── TechDoc-Coherence_Metric_Detailed.md
    │   │
    │   ├── neural-firewall/
    │   │   ├── INDEX.md              # COMPLETE
    │   │   ├── Blog-Neural_Firewall.md
    │   │   └── TechDoc-Neural_Firewall_Architecture.md
    │   │
    │   ├── neural-ransomware/
    │   │   ├── INDEX.md              # COMPLETE
    │   │   ├── Blog-Neural_Ransomware.md
    │   │   └── TechDoc-Neural_Ransomware.md
    │   │
    │   ├── scale-frequency/
    │   │   ├── INDEX.md              # COMPLETE
    │   │   ├── Blog-Scale_Frequency.md
    │   │   └── TechDoc-Scale_Frequency.md
    │   │
    │   ├── quantum-security/
    │   │   ├── INDEX.md              # COMPLETE
    │   │   ├── Blog-Quantum_Security.md
    │   │   └── TechDoc-Quantum_Security.md
    │   │
    │   └── tunneling-traversal-time/
    │       ├── INDEX.md              # COMPLETE
    │       ├── Blog-Tunneling_Traversal_Time.md
    │       ├── Blog-Tunneling_Traversal_Time.docx
    │       ├── TechDoc-Tunneling_Traversal_Time.md
    │       └── TechDoc-Tunneling_Traversal_Time.docx
    │
    └── prototypes/
        └── oni-visualizations/
            └── README.md
```

---

## Implementation Priority

### Phase 1 (Immediate) — COMPLETE
- [x] Create CLAUDE.md (comprehensive AI instructions)
- [x] Create BLOG_TEMPLATE.md (v2 with style guide)
- [x] Standardize file naming (`Blog-*` and `TechDoc-*` patterns)
- [x] Update all file trees in documentation
- [x] Create INDEX_TEMPLATE.md
- [x] Deploy INDEX.md to all topic folders (7 of 7 complete)
- [x] Create MAIN/INDEX.md with dependency map and cross-reference matrix

### Phase 2 (Next Session) — IN PROGRESS
- [ ] Create CHANGELOG.md at repository root
- [ ] Create Research Note template file
- [ ] Add docx generation to standard workflow documentation
- [ ] Verify all topic INDEX.md files have consistent formatting

### Phase 3 (Future)
- [x] Build cross-reference registry → **MAIN/INDEX.md**
- [x] Document pre-commit checklist → **In CLAUDE.md**
- [ ] Automate pre-commit checklist as `.git/hooks/pre-commit`
- [x] Add document metadata to publications → **YAML front-matter on all 13 publications**
- [ ] Add consistent metadata to infrastructure files (templates, processes)
- [ ] Implement content calendar for publishing schedule tracking
- [ ] Create automated docx generation script

---

## Metrics Summary

| Metric | Count | Last Updated |
|--------|-------|--------------|
| Total Topics | 7 | 2026-01-22 |
| Published Documents | 13 | 2026-01-22 |
| Blog Posts | 7 | 2026-01-22 |
| Technical Documents | 6 | 2026-01-22 |
| Topic INDEX.md Files | 7 | 2026-01-22 |
| Prototypes | 1 | 2026-01-21 |
| Templates | 3 | 2026-01-21 |
| Planned Topics | 5 | 2026-01-21 |

---

## Next Steps (Recommended Actions)

### Immediate Priority
1. **Create CHANGELOG.md** at repository root with semantic versioning history
2. **Verify docx files** exist for all publications (currently only tunneling-traversal-time has them)

### Short-Term
3. **Create Research Note template** as `MAIN/resources/templates/RESEARCH_NOTE_TEMPLATE.md`
4. **Add YAML metadata** to all infrastructure files in `resources/`
5. **Generate docx files** for all publications using pandoc

### Medium-Term
6. **Create pre-commit hook** (`.git/hooks/pre-commit`) to automate validation
7. **Implement content calendar** for publishing schedule tracking
8. **Create docx generation script** to automate Word document creation

---

## Recent Additions Log

### 2026-01-22
- **Tunneling Traversal Time** publication added:
  - TechDoc with APA 7th edition formatting
  - Blog post with template-compliant structure
  - INDEX.md with dependencies, key concepts, threat model
  - docx files generated for both documents
- **MAIN/INDEX.md** updated with:
  - New entry in Quick Navigation
  - Step 7 in Reading Order
  - Expanded Dependency Map (TTT under Quantum Security)
  - TTT row/column in Cross-Reference Matrix
  - Updated folder structure
  - Metrics updated (7 topics, 13 documents)

### 2026-01-21
- Quantum Security publication added
- MAIN folder restructure completed
- All topic INDEX.md files deployed
- Blog/TechDoc naming convention standardized

---

*Strategy Version: 3.0*
*Last Updated: January 22, 2026*
*Author: Kevin L. Qi with Claude (Anthropic)*
