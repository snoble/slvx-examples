# 3D Scissor Lift Mechanism

A true 3D scissor lift with visible depth - bars have actual width in 3D space, not just flat 2D lines.

## Features Demonstrated

- **3D geometry**: Front and back layers with depth connections
- **equal_length**: All 12 scissor bars maintain equal length
- **Linked mechanism**: 3 stages of X-shaped scissor units
- **Platform and ground rail**: Visible mounting surfaces

## Structure

```
         Platform (top)
            /\
Stage 3:   X  X  (front and back bars)
            \/
Stage 2:   X  X
            \/
Stage 1:   X  X
            \/
         Ground rail
```

## Entity Count

| Component | Points | Lines |
|-----------|--------|-------|
| Ground corners | 4 | 4 |
| Mid-level 1 corners | 4 | 4 |
| Mid-level 2 corners | 4 | 4 |
| Platform corners | 4 | 4 |
| Pivot points | 3 | 0 |
| Scissor bars (front) | 0 | 6 |
| Scissor bars (back) | 0 | 6 |
| Depth connections | 0 | 8 |
| **Total** | **19** | **32** |

**51 entities** - one of the largest demos in the repository.

## 3D Visualization

The SVG shows an isometric-style view where:
- Front layer: leftmost positions (x offset -25 to +25)
- Back layer: offset right and up (+5 in x and y)
- Depth lines: diagonal connectors showing the 3D structure

## Constraints

| Constraint | Count | Purpose |
|------------|-------|---------|
| fixed | 4 | Anchor ground rail corners |
| equal_length | 1 (12 bars) | All scissor bars same length |

## 3D Printing Notes

This wireframe defines the surfaces of a printable scissor lift:

1. Each X-unit is two bars crossing at the center
2. Bars have 10mm width (depth between front/back layers)
3. Ground rail and platform are 50mm wide rectangles
4. Add material thickness in CAD by extruding along bar axes

## Variations

**Change extension angle:**
Modify the Y-coordinates of middle points (m1f, m2f, etc.) to change the lift height. Lower Y = more collapsed, higher Y = more extended.

**Add more stages:**
Copy the stage pattern (4 corner points + 4 bars) and connect to the previous stage's top points.

## Visual Design

This demo follows the VISUAL_DESIGN_GUIDE.md principles:
- Immediately recognizable as a scissor lift
- 3D depth visible through diagonal depth lines
- Ground and platform rails show mounting surfaces
- Coordinates stay within -30 to +130 range
