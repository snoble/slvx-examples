---
title: "feat: SLVSX CLI Update and Demo Sweep"
type: feat
date: 2026-01-27
---

# SLVSX CLI Update and Demo Sweep

## Overview

Update to slvsx-cli v0.2.8, systematically test all 33 existing demos, file issues to GitHub as discovered, and create new demos showcasing fixed features and new constraints. Target audience includes 3D printing enthusiasts.

## Problem Statement / Motivation

The slvsx-cli has released v0.2.8 with significant fixes:
- **point_on_line for 2D entities** (#50) - Previously failed with point2_d/line2_d
- **Arc and Cubic SVG rendering** (#48) - Previously entities solved but didn't render
- **New constraints**: `collinear` and `equal_angles` convenience constraints (#40)

Our existing 33 demos need validation against the new version, and we should create new demos to:
1. Confirm the fixes work in practice
2. Stress-test edge cases to find remaining issues
3. Showcase the solver's capabilities to 3D printing audience

## Proposed Solution

### Phase 1: CLI Update & Verification

**Update the CLI:**
```bash
curl -fsSL https://raw.githubusercontent.com/snoble/slvsx-cli/main/install.sh | bash
```

**Verify version:**
```bash
slvsx --version
# Expected: 0.2.8
```

**Note on MCP:** The MCP server tools (`mcp__slvsx__*`) should automatically use the updated CLI. Verify by checking tool responses include version info.

### Phase 2: Systematic Demo Sweep

Test all 33 demos in order of increasing complexity. For each demo:

1. `mcp__slvsx__validate_constraints` - Check JSON schema
2. `mcp__slvsx__solve_constraints` - Verify solve succeeds
3. `mcp__slvsx__export_to_svg` - Generate visualization
4. Visual inspection - Compare with existing SVG

**Testing Order (by category and risk):**

| Order | Category | Count | Files | Risk Level |
|-------|----------|-------|-------|------------|
| 1 | Basic Shapes | 5 | `basic_shapes/*.json` | Low - simple constraints |
| 2 | Mechanical Linkages | 11 | `*_linkage/*.json`, `crank_slider/`, etc. | Medium - uses point_on_line |
| 3 | Architecture | 3 | `floor_plan/`, `mandala/`, `truss_bridge/` | Medium - newer examples |
| 4 | Artistic Patterns | 4 | `geometric_art/`, `parametric_flower/`, etc. | Medium |
| 5 | 3D Structures | 4 | `3d_structures/*.json` | Low - 3D uses different codepath |
| 6 | Gear/Mechanical | 2 | `gear_mechanism/`, `symmetric_bracket/` | Low |
| 7 | Curves/Paths | 2 | `bezier_path/`, `tangent_arc_chain/` | **High** - tests arc/cubic fix |
| 8 | Complex Systems | 2 | `rube_goldberg_machine/`, `constraint_showcase/` | **High** - tests #25 |

### Phase 3: Issue Filing

When a problem is found:

```bash
gh issue create --repo snoble/slvsx-cli \
  --title "Bug: <brief description>" \
  --body "$(cat <<'EOF'
## Environment
- slvsx-cli version: 0.2.8
- Platform: macOS

## Minimal Reproduction
```json
{
  "schema": "slvs-json/1",
  "units": "mm",
  "entities": [...],
  "constraints": [...]
}
```

## Expected Behavior
<what should happen>

## Actual Behavior
<what actually happens>

## Additional Context
Found while testing slvx-examples: <example_name>
EOF
)"
```

**Filing criteria:**
- **File immediately:** Crashes, solve failures, major visual regressions
- **Note for later:** Minor coordinate differences, cosmetic issues
- **Check existing issues first:** Search `gh issue list --repo snoble/slvsx-cli`

### Phase 4: New Demo Creation

Create 3-5 new demos targeting:

1. **Fixed features demo** - Uses arc/cubic entities with SVG rendering
2. **Collinear constraint demo** - Showcases new `collinear` constraint
3. **Equal angles demo** - Showcases new `equal_angles` constraint
4. **3D printable mechanism** - Practical design for maker audience

**Demo creation checklist:**
- [ ] Create `demo_name/demo_name.json`
- [ ] Build incrementally - SVG export after each constraint
- [ ] Keep coordinates in -100 to 100 range
- [ ] Create `demo_name/README.md` with features demonstrated
- [ ] Update main `README.md` with new example

## Technical Considerations

### Known Issues to Validate

| Issue | Status | Test Case |
|-------|--------|-----------|
| #44 point_on_line 2D | Should be fixed in v0.2.8 | `bezier_path/`, mechanical linkages |
| #45 Cubic rendering | Should be fixed in v0.2.8 | `bezier_path/bezier_path.json` |
| #46 Arc rendering | Should be fixed in v0.2.8 | `tangent_arc_chain/tangent_arc_chain.json` |
| #25 equal_length >2 | Unknown | `rube_goldberg_machine/` |
| #49 symmetric collapse | Unknown | Avoid in new demos |

### Visual Design Guidelines

From `VISUAL_DESIGN_GUIDE.md`:
- **Golden Rule:** Export to SVG and visually inspect at EVERY step
- Keep coordinates between -100 and 100
- If viewBox > 500 units, fix coordinate system
- Make components visually recognizable (octagonal balls, visible teeth)

### 3D Printing Considerations

- Focus on parametric designs where changing one value creates variants
- Create practical mechanisms (joints, hinges, brackets)
- Consider wall thickness and printability
- Note: SVG is 2D - provide guidance on using parameters for 3D export

## Acceptance Criteria

### Functional Requirements
- [x] CLI updated to v0.2.8 and verified
- [x] All 33 existing demos tested (validate, solve, export)
- [x] SVGs regenerated with v0.2.8
- [x] Issues filed for any failures (using `gh issue create`) - #51, #52
- [x] At least 3 new demos created showcasing fixed/new features

### Quality Gates
- [x] Known issues #44, #45, #46 confirmed fixed - #44 fixed, #45/#46 still broken (filed #51)
- [x] Known issue #25 tested and documented (fixed or workaround noted) - FIXED!
- [x] SESSION_STATE.md updated with testing results
- [x] Main README.md updated with any new findings/examples

## Success Metrics

- All 33 demos solve without errors (or issues filed for failures)
- bezier_path and tangent_arc_chain SVGs now render curves
- New demos demonstrate `collinear`, `equal_angles`, and arc/cubic features
- No regressions introduced (existing working demos still work)

## Dependencies & Risks

### Dependencies
- slvsx-cli v0.2.8 available via install script
- `gh` CLI authenticated for issue creation

### Risks

| Risk | Mitigation |
|------|------------|
| v0.2.8 introduces regressions | Git tag before regenerating SVGs; review diff |
| Bug #25 still present | Document workaround, don't block on fix |
| MCP/CLI version mismatch | Verify version in tool responses |

## Demo Inventory (33 files)

<details>
<summary>Full list of demos to test</summary>

**Basic Shapes (5):**
- `basic_shapes/equilateral_triangle.json`
- `basic_shapes/triangle_constraints_only.json`
- `basic_shapes/square_pure_constraints.json`
- `basic_shapes/hexagon_pure_constraints.json`
- `basic_shapes/pentagon_star.json`

**Mechanical Linkages (11):**
- `four_bar_linkage/four_bar_linkage.json`
- `chebyshev_linkage/chebyshev_linkage.json`
- `peaucellier_linkage/peaucellier_linkage.json`
- `theo_jansen_leg/theo_jansen_leg.json`
- `crank_slider/crank_slider.json`
- `scotch_yoke/scotch_yoke.json`
- `whitworth_quick_return/whitworth_quick_return.json`
- `geneva_mechanism/geneva_mechanism.json`
- `pantograph/pantograph.json`
- `cam_follower/cam_follower.json`
- `ferris_wheel/ferris_wheel.json`

**Architecture (3):**
- `floor_plan/floor_plan.json`
- `mandala/mandala.json`
- `truss_bridge/truss_bridge.json`

**Artistic Patterns (4):**
- `geometric_art/islamic_star.json`
- `parametric_flower/parametric_flower.json`
- `spirograph/spirograph.json`
- `iris_diaphragm/simple_iris.json`

**3D Structures (4):**
- `3d_structures/tetrahedron.json`
- `3d_structures/octahedron.json`
- `3d_structures/square_pyramid.json`
- `3d_structures/space_truss.json`

**Gear/Mechanical (2):**
- `gear_mechanism/gear_mechanism.json`
- `symmetric_bracket/symmetric_bracket.json`

**Curves/Paths (2):**
- `bezier_path/bezier_path.json`
- `tangent_arc_chain/tangent_arc_chain.json`

**Complex Systems (2):**
- `rube_goldberg_machine/rube_goldberg_machine.json`
- `constraint_showcase/constraint_showcase.json`

</details>

## References & Research

### Internal References
- Brainstorm: `docs/brainstorms/2026-01-27-slvsx-update-and-demos-brainstorm.md`
- Visual guide: `VISUAL_DESIGN_GUIDE.md`
- Session tracking: `SESSION_STATE.md`
- Debugging lessons: `rube_goldberg_machine/DEBUGGING_LESSONS.md`

### External References
- slvsx-cli repo: https://github.com/snoble/slvsx-cli
- v0.2.8 release: https://github.com/snoble/slvsx-cli/releases/tag/v0.2.8
- Issue #50 (point_on_line fix): https://github.com/snoble/slvsx-cli/pull/50
- Issue #48 (arc/cubic rendering): https://github.com/snoble/slvsx-cli/pull/48
- Issue #40 (collinear/equal_angles): https://github.com/snoble/slvsx-cli/pull/40
