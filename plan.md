# slvsx-examples Update Plan

## Overview
Updating all examples to work with slvsx-cli v0.2.0 API changes.

## Key API Changes (v0.1.6 → v0.2.0)

### 1. Horizontal/Vertical Constraints Require 2D Geometry
- Must use `plane`, `point2_d`, and `line2_d` entities
- Constraint needs `workplane` field
- 3D `point` and `line` entities won't work with horizontal/vertical

```json
// Required structure for horizontal/vertical:
{"type": "plane", "id": "xy_plane", "origin": [0,0,0], "normal": [0,0,1]}
{"type": "point2_d", "id": "p1", "at": [0, 0], "workplane": "xy_plane"}
{"type": "line2_d", "id": "line1", "p1": "p1", "p2": "p2", "workplane": "xy_plane"}
{"type": "horizontal", "entity": "line1", "workplane": "xy_plane"}
```

### 2. equal_length Uses `entities` Array
```json
// Old (broken): {"type": "equal_length", "a": "line1", "b": "line2"}
// New (correct): {"type": "equal_length", "entities": ["line1", "line2"]}
```

### 3. Constraint Field Names
| Constraint | Fields |
|------------|--------|
| `distance` | `between: [point1, point2]`, `value` |
| `perpendicular` | `a: line1`, `b: line2` |
| `parallel` | `entities: [line1, line2]` |
| `angle` | `between: [line1, line2]`, `value` |
| `midpoint` | `point`, `of: line` |
| `equal_length` | `entities: [line1, line2, ...]` |
| `point_on_line` | `point`, `line` |
| `coincident` | `entities: [point1, point2]` |
| `fixed` | `entity`, `workplane` (optional for 2D) |
| `horizontal` | `entity`, `workplane` |
| `vertical` | `entity`, `workplane` |

## Status

### Working Examples ✅
- [x] basic_shapes/equilateral_triangle.json
- [x] basic_shapes/pentagon_star.json
- [x] basic_shapes/triangle_constraints_only.json (fixed)
- [x] basic_shapes/square_pure_constraints.json (fixed)
- [x] basic_shapes/hexagon_pure_constraints.json (fixed - with angle constraints)
- [x] four_bar_linkage/four_bar_linkage.json (fixed - 2D with horizontal, angle, parametric)
- [x] gear_mechanism/gear_mechanism.json (already worked)
- [x] geometric_art/islamic_star.json (fixed - 2D with horizontal, angle)
- [x] iris_diaphragm/simple_iris.json (fixed - 2D with horizontal, angle)
- [x] parametric_flower/parametric_flower.json (already worked)
- [x] spirograph/spirograph.json (fixed equal_length)
- [x] chebyshev_linkage/chebyshev_linkage.json (new - classic 4-bar linkage)
- [x] 3d_structures/tetrahedron.json (new - 3D regular tetrahedron)
- [x] 3d_structures/octahedron.json (new - 3D regular octahedron)
- [x] 3d_structures/square_pyramid.json (new - 3D pyramid with equal edges)
- [x] 3d_structures/space_truss.json (new - 3D space frame cell)

### Needs Work 🔧
- [ ] constraint_showcase/constraint_showcase.json - crashes (bug #21)
- [ ] rube_goldberg_machine/rube_goldberg_machine.json - CLI crashes with many entities (bug #25)

### Bugs Filed 🐛
- Issue #21: Crash with point_on_circle constraint ("Cannot find handle" assertion)
- Issue #22: Crash with symmetric constraint
- Issue #23: Crash with tangent constraint
- Issue #25: CLI crash with multiple equal_length constraints ("Handle isn't unique" assertion)
  - **Workaround**: Use a single `equal_length` constraint with all edges instead of multiple constraints
  - Example: `{"type": "equal_length", "entities": ["e1", "e2", "e3", "e4"]}` works
  - But two separate constraints like `{"entities": ["e1", "e2"]}` and `{"entities": ["e3", "e4"]}` crashes

## Constraint Types Status

### Working ✅
- [x] fixed
- [x] distance
- [x] horizontal (needs 2D geometry)
- [x] vertical (needs 2D geometry)
- [x] perpendicular
- [x] parallel
- [x] angle
- [x] midpoint
- [x] equal_length
- [x] equal_radius
- [x] point_on_line

### Buggy - Crashes 🐛
- [ ] point_on_circle - Bug #21
- [ ] symmetric - Bug #22
- [ ] tangent - Bug #23

### Needs Investigation
- [ ] coincident - causes "Invalid solver system" in some cases

## New Examples to Create

Inspired by SolveSpace examples:
1. **Peaucellier Linkage** - converts rotary to linear motion
2. **Chebyshev Linkage** - approximate straight line mechanism
3. **Crank-Slider** - piston mechanism
4. **Symmetric Design** - demonstrates symmetric constraint
5. **Midpoint Construction** - demonstrates midpoint constraint

## Commands

```bash
# Download latest CLI
curl -sL https://github.com/snoble/slvsx-cli/releases/download/v0.2.0/slvsx-macos-arm64.tar.gz | tar xz -C /tmp

# Test an example
/tmp/slvsx solve path/to/example.json

# Export SVG
/tmp/slvsx export path/to/example.json -o path/to/output.svg

# Validate without solving
/tmp/slvsx validate path/to/example.json
```
