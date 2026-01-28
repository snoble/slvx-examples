# Brainstorm: Parametric Showcase Examples

**Date:** 2026-01-27
**Status:** Ready for planning

## What We're Building

Two parametric showcases that demonstrate the solver calculating genuinely different solutions when a parameter changes:

### 1. Four-Bar Linkage Animation
- Same mechanism at 6 different crank angles: 0°, 60°, 120°, 180°, 240°, 300°
- Separate JSON + SVG files for each position
- Shows geometric closure - solver must find where coupler/rocker go at each angle

### 2. Prime Star Patterns
- Same constraint structure with different point counts: 3, 5, 7, 11, 13
- Separate JSON + SVG files for each
- Shows constraint propagation across varying symmetry orders

## Why This Approach

**Current gap:** The repo has 23 parametric examples, but none show the same design at different parameter values. This makes parametric design abstract rather than demonstrable.

**What the solver is doing:**

*Four-bar linkage:* At each crank angle, the solver must find the unique position of the coupler and rocker that satisfies all four length constraints. This is a genuine geometric calculation.

*Star patterns:* For each point count, the solver positions N points with equal_length edges and equal_angles between them. Different N produces fundamentally different geometry.

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Output format | Separate files per variant | Clear, diffable, easy to compare |
| Linkage angles | 0°, 60°, 120°, 180°, 240°, 300° | Even 60° steps show full rotation |
| Star point counts | 3, 5, 7, 11, 13 | Primes produce true star patterns |
| Directory structure | `four_bar_animation/`, `prime_stars/` | Grouped by example type |

## Structure

### four_bar_animation/
```
four_bar_animation/
├── README.md
├── angle_000.json + angle_000.svg
├── angle_060.json + angle_060.svg
├── angle_120.json + angle_120.svg
├── angle_180.json + angle_180.svg
├── angle_240.json + angle_240.svg
└── angle_300.json + angle_300.svg
```

### prime_stars/
```
prime_stars/
├── README.md
├── star_03.json + star_03.svg  (triangle)
├── star_05.json + star_05.svg  (pentagon star)
├── star_07.json + star_07.svg  (heptagram)
├── star_11.json + star_11.svg  (11-pointed star)
└── star_13.json + star_13.svg  (13-pointed star)
```

## Technical Approach

### Four-Bar Linkage
- Base on existing `four_bar_linkage/four_bar_linkage.json`
- Change only `crank_angle` parameter for each variant
- Use 2D plane constraints (horizontal, angle, distance)

### Prime Stars
- Create base template with `num_points` parameter
- For each variant, manually set point count and initial positions
- Use `equal_length` for all edges, `equal_angles` for spoke angles
- Connect points to form star pattern (every other point for true stars)

## Open Questions

1. **Star connectivity** - Connect adjacent points (polygon) or skip points (star)?
   - *Decision:* Do both - create polygon + internal star lines

2. **Should we include a generator script?**
   - *Decision:* Not required, but could add later

## Success Criteria

- [x] 6 four-bar linkage variants (6 JSON + 6 SVG)
- [x] 5 prime star variants (5 JSON + 5 SVG)
- [x] READMEs explaining parameter effects
- [x] Visually obvious that solver is computing different solutions
- [x] Update main README with new examples
