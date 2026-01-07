# Session State - slvsx-examples

## Current Status

CLI version in MCP: **0.1.6**

## What We've Done This Session

### 1. Tested MCP Tools
- `solve_constraints` - Works
- `validate_constraints` - Works (silent on success)
- `export_to_svg` - Works
- `create_example` - Works (triangle, square, circle, linkage, parametric, 3d)
- `search_documentation` - Works
- `get_schema` - **BROKEN** (filed issue #28)

### 2. Tested Previously Buggy Constraints
- `point_on_circle` - **NOW WORKS** (bug #21 fixed!)
- `symmetric` - Needs 2D geometry with `about` field (filed issue #30)
- `tangent` - Only works with arcs, not circles (documented limitation)
- `equal_length` - Works with multiple entities in one constraint

### 3. Created New Examples
- **peaucellier_linkage/** - First mechanism to convert rotary to exact straight line (1864)
  - Built incrementally following best practices
  - Added citations to Wikipedia, SolveSpace examples, AMS
- **theo_jansen_leg/** - Strandbeest walking mechanism using "holy numbers"
  - Famous link ratios discovered by genetic algorithm
  - Added citations to Wikipedia, strandbeest.com, SolveSpace, JavaLab
- **whitworth_quick_return/** - Quick return mechanism for shaping machines
  - Crank pin slides in rocker slot for asymmetric motion
- **geneva_mechanism/** - 4-slot Maltese cross for intermittent motion
  - Pin engages slots to rotate Geneva wheel 90° per cycle
- **pantograph/** - Rhombus linkage for copying/scaling drawings
  - Pen traces scaled copy of tracer path

### 4. Filed Issues
- **#28**: MCP `get_schema` tool fails - CLI missing 'schema' subcommand
- **#29**: Document 2D geometry entities (point2_d, line2_d) and workplane requirements
- **#30**: Clarify symmetric constraint syntax and 3D limitations
- **#31**: Feature request: equal_angle constraint for distributing entities evenly
- **#32**: Feature request: collinear constraint for 3+ points
- **#33**: Feature request: Circle center as point reference
- **#34**: Documentation: point_on_circle constraint missing from reference table
- **#35**: Feature request: Arc and curve entities
- **#36**: MCP: search_documentation returns limited context
- **#37**: Example improvement: parametric_flower lacks constraints

### 5. Best Practices Learned from MCP Docs
- Start with fixed reference points
- Add entities one at a time, test after each
- Use parameters for dimensions
- Provide good initial guesses in `at` fields
- Validate before solving
- Use `preserve: true` for iterative refinement
- Circles don't track points (use points for moving parts)

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
| whitworth_quick_return | **NEW** | Quick return mechanism |
| geneva_mechanism | **NEW** | 4-slot intermittent motion |
| pantograph | **NEW** | Copy/scale drawing mechanism |
| gear_mechanism | Works | Two meshing gears |
| parametric_flower | Works | Needs more constraints (issue #37) |
| spirograph | Works | Octagon pattern |
| geometric_art | Works | Islamic star pattern |
| iris_diaphragm | Works | 6-blade iris |
| constraint_showcase | Works | Demos many constraint types |
| rube_goldberg_machine | **BUG** | Crashes with equal_length >2 entities (bug #25) |
| 3d_structures/* | Works | Tetrahedron, octahedron, pyramid, truss |

## Ideas for More Examples

All previously planned examples are now implemented!

## Commands Reference

```bash
# Using MCP tools (via Claude)
mcp__slvsx__solve_constraints
mcp__slvsx__validate_constraints
mcp__slvsx__export_to_svg
mcp__slvsx__create_example
mcp__slvsx__search_documentation

# Direct CLI (v0.1.6)
slvsx solve path/to/example.json
slvsx validate path/to/example.json
slvsx export path/to/example.json -o output.svg
```

## Working Directory
`/Users/steven/Documents/Code/slvx-examples`
