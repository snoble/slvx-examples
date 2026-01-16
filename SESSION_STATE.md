# Session State - slvsx-examples

## Current Status

CLI version in MCP: **Latest (post 0.1.6)**

**Last Action:** Added 5 new examples showcasing previously unused features

## What We've Done This Session

### 1. Tested MCP Tools
- All MCP tools working: solve_constraints, validate_constraints, export_to_svg, create_example, search_documentation, get_schema, list_constraints, list_entities

### 2. Created New Examples

| Example | Features Demonstrated | Status |
|---------|----------------------|--------|
| **cam_follower/** | point_on_line (3D), angle, circles | Works |
| **ferris_wheel/** | point_on_circle, diameter, angle chains | Works |
| **bezier_path/** | cubic (Bezier curve), perpendicular | Solves (SVG doesn't render curve) |
| **tangent_arc_chain/** | arc, tangent | Solves (SVG doesn't render arc) |
| **symmetric_bracket/** | parallel, equal constraints for symmetry | Works |

### 3. Filed Issues

| Issue | Title | Status |
|-------|-------|--------|
| #44 | point_on_line fails with 2D entities | Open |
| #45 | Cubic Bezier curves not rendered in SVG export | Open |
| #46 | Arc entities not rendered in SVG export | Open |
| #49 | symmetric_vertical and symmetric_horizontal collapse points | Open |

### 4. Updated Documentation
- README.md: Added new examples to tables, added new constraint types, updated known issues
- Each new example has JSON, SVG, and README files

## Features Tested

### Working Features
- `point_on_circle` - Constrains points to circles (ferris_wheel)
- `diameter` - Sets circle diameter (ferris_wheel)
- `tangent` - Arc-to-line tangency (tangent_arc_chain)
- `arc` entity - Circular arcs (tangent_arc_chain)
- `cubic` entity - Bezier curves (bezier_path)
- `parallel` - Multiple lines parallel (symmetric_bracket)
- `perpendicular` - Lines at right angles (bezier_path)

### Broken Features (Issues Filed)
- `point_on_line` with point2_d/line2_d - "Invalid solver system" (#44)
- `symmetric_vertical` / `symmetric_horizontal` - Points collapse to same location (#49)
- SVG rendering of `arc` entities (#46)
- SVG rendering of `cubic` entities (#45)

## Existing Examples Status

| Example | Status | Notes |
|---------|--------|-------|
| basic_shapes/* | Works | Various triangle, square, hexagon, pentagon |
| four_bar_linkage | Works | Classic 4-bar with parametric crank angle |
| chebyshev_linkage | Works | Approximate straight-line linkage |
| peaucellier_linkage | Works | Exact straight-line linkage |
| theo_jansen_leg | Works | Strandbeest walking mechanism |
| crank_slider | Works | Piston/engine mechanism |
| scotch_yoke | Works | Linear motion from rotation |
| whitworth_quick_return | Works | Quick return mechanism |
| geneva_mechanism | Works | 4-slot intermittent motion |
| pantograph | Works | Copy/scale drawing mechanism |
| gear_mechanism | Works | Two meshing gears |
| parametric_flower | Works | Needs more constraints (issue #37) |
| spirograph | Works | Octagon pattern |
| geometric_art | Works | Islamic star pattern |
| iris_diaphragm | Works | 6-blade iris |
| constraint_showcase | Works | Demos many constraint types |
| rube_goldberg_machine | **BUG** | Crashes with equal_length >2 entities (bug #25) |
| 3d_structures/* | Works | Tetrahedron, octahedron, pyramid, truss |
| **cam_follower** | **NEW** | Cam mechanism with point_on_line |
| **ferris_wheel** | **NEW** | Radial symmetry with point_on_circle |
| **bezier_path** | **NEW** | Cubic Bezier curves |
| **tangent_arc_chain** | **NEW** | Arc-line tangent constraints |
| **symmetric_bracket** | **NEW** | Manual symmetry using parallel |

## Best Practices Learned

1. **Use 3D entities (point, line) instead of 2D (point2_d, line2_d)** for point_on_line constraints
2. **Avoid symmetric_horizontal/symmetric_vertical** - use parallel + fixed points instead
3. **Arcs and cubics work in solver** but don't render in SVG - add manual paths to SVG
4. **Build incrementally** - Add one constraint at a time to identify issues
5. **Provide good initial guesses** - Important for convergence

## Commands Reference

```bash
# Using MCP tools (via Claude)
mcp__slvsx__solve_constraints
mcp__slvsx__validate_constraints
mcp__slvsx__export_to_svg
mcp__slvsx__create_example
mcp__slvsx__search_documentation
mcp__slvsx__list_constraints
mcp__slvsx__list_entities

# Direct CLI
slvsx solve path/to/example.json
slvsx validate path/to/example.json
slvsx export path/to/example.json -o output.svg
```

## Working Directory
`/Users/steven/Documents/Code/slvx-examples`

## Git Status
- Branch: main
- Uncommitted: 5 new examples + README updates
