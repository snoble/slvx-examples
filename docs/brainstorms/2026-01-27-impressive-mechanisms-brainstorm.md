# Brainstorm: 3D Scissor Lift - The Most Impressive Demo

**Date:** 2026-01-27
**Status:** Ready for planning

## What We're Building

A **true 3D scissor lift mechanism** - not a flat 2D projection, but bars with actual width and thickness in 3D space. This will be substantially cooler than anything currently in the repo.

**Key insight:** SLVSX can define 3D wireframes and surface boundaries. We're not limited to 2D - we can create geometry that defines actual 3D solids when filled.

## Why This Approach

**Previous demos failed because:**
- They were "abstract line soup" - technically correct but visually boring
- They didn't look like real things
- They were flat 2D when SLVSX can do 3D

**This demo will succeed because:**
- Scissor lifts are universally recognized
- One parameter controls the entire mechanism (extension ratio)
- 3D geometry with actual bar thickness looks printable
- It demonstrates SLVSX's constraint power on a complex linked system

**Comparison to existing demos:**
- Current 3D demos: tetrahedron, octahedron (simple polyhedra, ~10-20 entities)
- Our target: 3D scissor lift with ~60-80 entities
- Goal: Most impressive demo in the repository

## Key Decisions

### 1. Structure
- **3 stages** (6 X-shaped scissor units)
- **Each bar is a 3D rectangle** - 4 corners with lines forming edges, not just a single line
- **Proper pivot points** - pins connecting bars at their centers
- **Platform on top** - visible load surface
- **Ground rail** - one side fixed, one slides

### 2. 3D Representation
- **Bar thickness:** 5mm (visible in SVG)
- **Bar width:** 10mm (depth into Z)
- **Bar length:** 50mm (parametric via `bar_length`)
- **Each bar = 8 points + 12 edges** (rectangular prism wireframe)

### 3. Parametric Control
- **`extension_ratio`**: 0.0 (collapsed) to 1.0 (fully extended)
- Controls all pivot angles simultaneously
- One change propagates through entire structure

### 4. Visual Design
- Coordinates centered around origin
- Full structure visible from an isometric-ish viewpoint
- Clear visual hierarchy: ground → bars → platform

## Entity Count Estimate

| Component | Points | Lines | Total per |
|-----------|--------|-------|-----------|
| One bar (3D rectangle) | 8 | 12 | 20 |
| 6 bars | 48 | 72 | 120 |
| Platform | 4 | 4 | 8 |
| Ground rail | 4 | 4 | 8 |
| Pivot pins | 6 | 0 | 6 |
| **Total** | **62** | **80** | **~140 entities** |

This would be the most entity-dense demo in the repo.

## Open Questions

1. **View angle** - What 3D viewpoint shows the mechanism best?
   - *Decision:* Slight isometric (rotated ~30° from front)

2. **Extension state** - Show at what extension level?
   - *Decision:* 50% - shows it's a dynamic mechanism, not static

3. **Wireframe vs filled bars** - Should bars be hollow rectangles or just edges?
   - *Decision:* Wireframe edges - that's what SLVSX outputs, and it's still impressive

## Success Criteria

- [ ] 60+ entities (more than any current demo)
- [ ] True 3D geometry (z-coordinates used meaningfully)
- [ ] Single `extension_ratio` parameter controls whole mechanism
- [ ] Immediately recognizable as a scissor lift
- [ ] SVG output that makes someone say "holy shit"
- [ ] README with clear parameter documentation

## Technical Approach

1. Start with ONE bar as a 3D wireframe rectangle
2. Add second bar crossing it at the pivot point
3. Add equal_length constraints for parallel bars
4. Stack second stage, link pivots to first stage endpoints
5. Stack third stage
6. Add platform and ground rail
7. Make extension parametric
8. Test at different extension values
