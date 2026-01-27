# 3D Scissor Lift Mechanism

A true 3D scissor lift where **each bar is a rectangular prism wireframe** with actual width and thickness - not just flat lines.

## Features Demonstrated

- **True 3D bar geometry**: Each bar has 8 corner points and 12 edges forming a rectangular prism
- **3-stage scissor mechanism**: 6 crossing bars total
- **Visible cross-sections**: Rectangular end caps show bar thickness
- **Ground rail and platform**: Both have 3D depth

## Entity Count

| Component | Points | Lines |
|-----------|--------|-------|
| 6 bars (8 pts, 12 lines each) | 48 | 72 |
| Ground rail | 4 | 4 |
| Platform | 4 | 4 |
| **Total** | **56** | **80** |

**136 entities** - the most entity-dense demo in the repository!

## Bar Structure

Each bar is a 3D rectangular prism wireframe:

```
    tbl------tbr
   /|        /|
  / |       / |
tfl------tfr  |     (top end cap)
 |  |      |  |
 |  bbl----|--bbr
 | /       | /
 |/        |/
bfl------bfr        (bottom end cap)

4 long edges connect the end caps
```

- **Bar width**: 4mm (visible in cross-section)
- **Bar depth**: 5mm (front-to-back offset)
- **Bar length**: ~55mm diagonal

## 3D Printing

This wireframe defines actual 3D solid geometry:

1. Each bar's 8 points define the corners of a printable rectangular bar
2. The 12 edges show the wireframe - fill to create solid bars
3. Ground rail and platform are printable mounting surfaces
4. Pivot points where bars cross would need pin holes

## Constraints

Only 4 `fixed` constraints anchor the ground rail corners. The geometry is defined by initial point positions - a real scissor lift would add `equal_length` constraints on the long edges to ensure bars maintain shape during articulation.

## Variations

**Change extension angle**: Adjust Y-coordinates of bar endpoints to collapse or extend the lift.

**Add more stages**: Each stage is 2 bars (16 points, 24 lines). Copy the pattern and connect to previous stage.
