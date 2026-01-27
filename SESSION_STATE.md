# Session State - slvsx-examples

## Current Status

CLI version: **v0.2.8** (installed 2026-01-27)
MCP version: **@sknoble/slvsx-mcp-server 0.2.8**

**Last Action:** Systematic testing of all 33 demos with v0.2.8, filed 2 new issues, created 3 new demos

## What We've Done This Session

### 1. Updated to v0.2.8
- Downloaded and installed CLI binary from GitHub release
- Verified version: `slvsx --version` → 0.2.8
- MCP tools confirmed working with same version

### 2. Tested All 33 Existing Demos

| Category | Count | Result |
|----------|-------|--------|
| Basic Shapes | 5 | All pass |
| Mechanical Linkages | 11 | All pass |
| Architecture | 3 | All pass |
| Artistic Patterns | 4 | All pass |
| 3D Structures | 4 | All pass |
| Gear/Mechanical | 2 | All pass |
| Curves/Paths | 2 | Solve but SVG doesn't render curves |
| Complex Systems | 2 | 1 pass, 1 fail (rube_goldberg) |

### 3. New Issues Filed

| Issue | Title | Status |
|-------|-------|--------|
| #51 | Cubic and Arc entities not rendered in SVG export (v0.2.8) | Open |
| #52 | rube_goldberg_machine example fails with 'Invalid solver system' | Open |

**Note:** PR #48 claimed to fix arc/cubic SVG rendering, but testing shows it's still not working in v0.2.8.

### 4. Issues Confirmed Fixed in v0.2.8
- **equal_length with >2 entities** - Bug #25 is FIXED! Tested with 3+ lines successfully.
- **point_on_line with 2D entities** - Bug #44 was fixed in PR #50

### 5. New Features Tested

| Feature | Status | Notes |
|---------|--------|-------|
| `collinear` constraint | Works | New convenience constraint for 3+ points on a line |
| `equal_angles` constraint | Works | New convenience constraint for equal angles between lines |

### 6. Created 3 New Demos

| Example | Features Demonstrated | Status |
|---------|----------------------|--------|
| **collinear_demo/** | collinear, distance | Works |
| **equal_angles_demo/** | equal_angles, distance | Works |
| **parametric_hinge/** | angle, parallel, perpendicular, diameter, circle | Works |

## Features Status (v0.2.8)

### Working Features
- `collinear` - NEW! Ensures 3+ points lie on same line
- `equal_angles` - NEW! Equal angles between consecutive lines
- `equal_length` with >2 entities - FIXED! Was bug #25
- `point_on_line` with 2D entities - FIXED! Was bug #44 (PR #50)
- `point_on_circle` - Works
- `diameter` - Works
- `tangent` - Works (arc-to-line)
- `arc` entity - Solves correctly
- `cubic` entity - Solves correctly
- `parallel`, `perpendicular`, `distance`, `angle`, `fixed` - All work

### Broken Features
- **SVG rendering of arc entities** - Issue #51 (supposed to be fixed in PR #48 but isn't)
- **SVG rendering of cubic entities** - Issue #51
- **rube_goldberg_machine.json** - "Invalid solver system" - Issue #52
- `symmetric_vertical` / `symmetric_horizontal` - Points collapse (Issue #49)

## Existing Examples Status

| Example | Status | Notes |
|---------|--------|-------|
| basic_shapes/* | Works | 5 examples |
| four_bar_linkage | Works | |
| chebyshev_linkage | Works | |
| peaucellier_linkage | Works | |
| theo_jansen_leg | Works | |
| crank_slider | Works | |
| scotch_yoke | Works | |
| whitworth_quick_return | Works | |
| geneva_mechanism | Works | |
| pantograph | Works | |
| cam_follower | Works | |
| ferris_wheel | Works | |
| gear_mechanism | Works | |
| symmetric_bracket | Works | |
| parametric_flower | Works | |
| spirograph | Works | |
| geometric_art/islamic_star | Works | |
| iris_diaphragm | Works | |
| floor_plan | Works | |
| mandala | Works | |
| truss_bridge | Works | |
| constraint_showcase | Works | |
| bezier_path | Solves | SVG doesn't render cubic curve |
| tangent_arc_chain | Solves | SVG doesn't render arc |
| rube_goldberg_machine | **FAILS** | Issue #52 |
| 3d_structures/* | Works | 4 examples |
| **collinear_demo** | **NEW** | |
| **equal_angles_demo** | **NEW** | |
| **parametric_hinge** | **NEW** | 3D-printable design |

## Commands Reference

```bash
# CLI
~/.local/bin/slvsx solve path/to/example.json
~/.local/bin/slvsx validate path/to/example.json
~/.local/bin/slvsx export -f svg path/to/example.json

# MCP tools (via Claude)
mcp__slvsx__solve_constraints
mcp__slvsx__validate_constraints
mcp__slvsx__export_to_svg
mcp__slvsx__create_example
mcp__slvsx__search_documentation
mcp__slvsx__list_constraints
mcp__slvsx__list_entities

# File issues
gh issue create --repo snoble/slvsx-cli --title "..." --body "..."
```

## Working Directory
`/Users/steven/Documents/Code/slvx-examples`

## Git Status
- Branch: feat/slvsx-v0.2.8-demo-sweep
- New files: collinear_demo/, equal_angles_demo/, parametric_hinge/
- Modified: SESSION_STATE.md
