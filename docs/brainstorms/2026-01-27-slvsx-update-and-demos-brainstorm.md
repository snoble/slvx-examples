# Brainstorm: SLVSX CLI Update and Demo Expansion

**Date:** 2026-01-27
**Status:** Ready for planning

## What We're Building

A systematic update and expansion of the slvx-examples repository:

1. **Update to slvsx-cli v0.2.8** - Get the latest CLI and MCP with bug fixes
2. **Validate all 33 existing demos** - Systematic sweep to verify they work and find regressions
3. **File issues as discovered** - Use `gh` to report bugs to snoble/slvsx-cli immediately
4. **Create new demos** - Add examples that stress-test edge cases, cover missing features, and showcase capabilities

## Why This Approach

**Systematic sweep chosen over targeted testing because:**
- Ensures no regressions from CLI updates
- Creates a clean baseline before adding new demos
- May uncover issues in demos that weren't using fixed features
- Documents current state of all examples

**File issues as we go because:**
- Fresh context when the problem is discovered
- Faster feedback loop for slvsx-cli development
- Avoids losing track of issues found during sweep

## Key Decisions

### 1. Update Strategy
- Update CLI via the install script: `curl -fsSL https://raw.githubusercontent.com/snoble/slvsx-cli/main/install.sh | bash`
- MCP should auto-update (already configured in Claude settings)

### 2. Testing Protocol
For each of the 33 demos:
- Validate the JSON schema
- Solve the constraints
- Export to SVG
- Compare with existing SVG (visual regression check)
- Document any failures or changes

### 3. New Features to Exercise
From v0.2.8 release:
- `point_on_line` with workplane parameter (was broken for 2D)
- Arc entity SVG rendering (was not rendering)
- Cubic Bezier SVG rendering (was not rendering)
- `collinear` constraint (new convenience constraint)
- `equal_angles` constraint (new convenience constraint)

### 4. New Demo Categories to Add
- **Bug hunting**: Demos that stress-test edge cases (equal_length chains, complex constraint dependencies)
- **Feature coverage**: Demos using `collinear`, `equal_angles`, and now-working arcs/cubics
- **Visual showcase**: Impressive examples that demonstrate solver capabilities

### 5. Visual Impact & Target Audience
**Key insight**: Cool pictures matter a lot. The audience includes 3D printing enthusiasts.

- **Rendering angles**: Use interesting viewpoints for 3D examples, not just top-down
- **3D printable designs**: Create demos that could actually be printed (joints, assemblies, brackets)
- **Practical mechanisms**: Focus on things makers would want to build
- **Consider**: parametric designs where changing one value creates different printable variants

### 6. Issue Filing
- File to: https://github.com/snoble/slvsx-cli/issues
- Include: minimal reproduction JSON, expected vs actual behavior, slvsx version
- Use `gh issue create` for efficiency

## Open Questions

1. **SVG comparison method**: Should we do pixel-diff or just visual inspection?
   - *Decided*: Visual inspection is sufficient for this sweep

2. **Demo organization**: Should new demos follow existing category structure or create new categories?
   - *Decided*: Follow existing structure, create new categories only if needed

3. **Known issue #25** (`equal_length` with >2 entities): Should we retest this?
   - *Decided*: Yes, include in sweep to see if it's fixed

## Existing Demo Inventory (33 files)

| Category | Count | Examples |
|----------|-------|----------|
| Mechanical Linkages | 11 | four_bar, chebyshev, peaucellier, theo_jansen, crank_slider, scotch_yoke, whitworth, geneva, pantograph, cam_follower, ferris_wheel |
| Gear Systems | 1 | gear_mechanism |
| Curves/Paths | 2 | bezier_path, tangent_arc_chain |
| Artistic Patterns | 4 | islamic_star, parametric_flower, spirograph, simple_iris |
| Mechanical Parts | 1 | symmetric_bracket |
| Complex Systems | 2 | rube_goldberg_machine, constraint_showcase |
| 3D Structures | 4 | tetrahedron, octahedron, square_pyramid, space_truss |
| Basic Shapes | 5 | equilateral_triangle, triangle_constraints_only, square, hexagon, pentagon_star |
| Architecture | 3 | floor_plan, mandala, truss_bridge |

## Success Criteria

- [ ] All 33 existing demos solve without errors
- [ ] SVGs regenerated with v0.2.8
- [ ] Known issues (#44, #45, #46) confirmed fixed
- [ ] Any new issues filed to slvsx-cli
- [ ] At least 3 new demos using new/fixed features
- [ ] README updated with any new findings
