---
title: Parametric Showcase Examples
type: feat
date: 2026-01-27
---

# Parametric Showcase Examples

## Overview

Create two parametric showcases that demonstrate the solver calculating genuinely different solutions when a parameter changes. This fills a gap in the repo: while 23 parametric examples exist, none show the same design at different parameter values.

## Problem Statement / Motivation

The current examples demonstrate constraint types individually, but don't show **parametric variation** - the same mechanism solved at different parameter values. This makes parametric design abstract rather than demonstrable.

**What the solver is doing:**

- **Four-bar linkage:** At each crank angle, the solver must find the unique position of the coupler and rocker that satisfies all four length constraints. This is genuine geometric closure calculation.
- **Star patterns:** For each point count, the solver positions N points with equal_length edges and equal_angles between them. Different N produces fundamentally different geometry.

## Proposed Solution

Create two new example directories with multiple variants each:

### 1. Four-Bar Linkage Animation (`four_bar_animation/`)
- 6 JSON + SVG file pairs at crank angles: 0°, 60°, 120°, 180°, 240°, 300°
- Based on existing `four_bar_linkage/four_bar_linkage.json`
- Only `crank_angle` parameter changes between variants

### 2. Prime Star Patterns (`prime_stars/`)
- 5 JSON + SVG file pairs for point counts: 3, 5, 7, 11, 13
- Uses `equal_angles` constraint for radial symmetry
- Uses `equal_length` for consistent spoke lengths
- Prime numbers ensure true star patterns (no overlapping vertices)

## Technical Approach

### Four-Bar Linkage Variants

Template from `four_bar_linkage/four_bar_linkage.json`:
- 4 points: ground_left, ground_right, crank_end, rocker_end
- 4 lines: ground, crank, coupler, rocker
- Parameters: crank_length=30, coupler_length=70, rocker_length=60, ground_length=100
- Key constraint: `{"type": "angle", "between": ["crank", "ground"], "value": "$crank_angle"}`

**For each variant, only change:**
1. `crank_angle` parameter value (0, 60, 120, 180, 240, 300)
2. Initial `at` positions for `crank_end` and `rocker_end` to give solver good starting points

**Initial position calculations:**
| Angle | crank_end (x, y) | Notes |
|-------|-----------------|-------|
| 0° | [30, 0] | Horizontal right |
| 60° | [15, 26] | ~cos(60°)*30, sin(60°)*30 |
| 120° | [-15, 26] | Upper left quadrant |
| 180° | [-30, 0] | Horizontal left |
| 240° | [-15, -26] | Lower left quadrant |
| 300° | [15, -26] | Lower right quadrant |

### Prime Star Patterns

Template from `equal_angles_demo/equal_angles_demo.json`:
- Central point + N tip points
- N spokes from center to tips
- `equal_angles` constraint on all spokes
- `equal_length` constraints (or `distance` with parameter) for spoke lengths

**For each variant:**
1. Create N tip points with good initial positions (evenly distributed around circle)
2. Create N spoke lines from center to tips
3. Use `equal_angles` constraint on all spokes
4. Fix center point and first tip (to anchor the pattern)

**Point counts and angles:**
| N | Angle between spokes | Pattern name |
|---|---------------------|--------------|
| 3 | 120° | Triangle |
| 5 | 72° | Pentagram |
| 7 | ~51.4° | Heptagram |
| 11 | ~32.7° | 11-pointed star |
| 13 | ~27.7° | 13-pointed star |

## File Structure

```
four_bar_animation/
├── README.md
├── angle_000.json
├── angle_000.svg
├── angle_060.json
├── angle_060.svg
├── angle_120.json
├── angle_120.svg
├── angle_180.json
├── angle_180.svg
├── angle_240.json
├── angle_240.svg
├── angle_300.json
└── angle_300.svg

prime_stars/
├── README.md
├── star_03.json
├── star_03.svg
├── star_05.json
├── star_05.svg
├── star_07.json
├── star_07.svg
├── star_11.json
├── star_11.svg
├── star_13.json
└── star_13.svg
```

## Acceptance Criteria

### Four-Bar Animation
- [x] Create `four_bar_animation/` directory
- [x] Create `angle_000.json` with crank_angle=0
- [x] Create `angle_060.json` with crank_angle=60
- [x] Create `angle_120.json` with crank_angle=120
- [x] Create `angle_180.json` with crank_angle=180
- [x] Create `angle_240.json` with crank_angle=240
- [x] Create `angle_300.json` with crank_angle=300
- [x] Export SVG for each JSON file
- [x] Create README.md explaining the animation concept
- [x] Verify each SVG shows visibly different mechanism position

### Prime Stars
- [x] Create `prime_stars/` directory
- [x] Create `star_03.json` with 3 points (triangle)
- [x] Create `star_05.json` with 5 points (pentagram)
- [x] Create `star_07.json` with 7 points (heptagram)
- [x] Create `star_11.json` with 11 points
- [x] Create `star_13.json` with 13 points
- [x] Export SVG for each JSON file
- [x] Create README.md explaining prime star patterns
- [x] Verify each SVG shows correct number of evenly-spaced spokes

### Documentation
- [x] Update main README.md with new examples section
- [x] Add "Parametric Showcases" category to example table

## Success Metrics

- Visually obvious that solver is computing different solutions
- Each variant solves without errors
- SVGs are clear and well-formatted
- READMEs explain what the solver is calculating

## References

### Source Templates
- `four_bar_linkage/four_bar_linkage.json` - Base linkage structure
- `equal_angles_demo/equal_angles_demo.json` - Pattern for equal_angles constraint

### Brainstorm
- `docs/brainstorms/2026-01-27-parametric-showcase-brainstorm.md` - Design decisions

### Key Constraint Types
- `angle` - Controls crank rotation
- `distance` - Maintains link lengths
- `equal_angles` - Creates radial symmetry
- `fixed` - Anchors reference points
