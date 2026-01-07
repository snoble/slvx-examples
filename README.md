# SLVSX Constraint Solver Examples

A collection of examples demonstrating the [SLVSX](https://github.com/snoble/slvsx-cli) constraint solver for parametric design and mechanical systems.

## What is SLVSX?

SLVSX is a command-line interface to the SolveSpace constraint solver. It allows you to define geometric relationships declaratively and have the solver calculate actual positions automatically.

## Examples

### Mechanical Linkages

| Example | Description | Preview |
|---------|-------------|---------|
| [Four-Bar Linkage](four_bar_linkage/) | Classic planar linkage with parametric crank angle | [SVG](four_bar_linkage/four_bar_linkage.svg) |
| [Chebyshev Linkage](chebyshev_linkage/) | Approximate straight-line mechanism | [SVG](chebyshev_linkage/chebyshev_linkage.svg) |
| [Peaucellier Linkage](peaucellier_linkage/) | First mechanism to convert rotary to exact straight line (1864) | [SVG](peaucellier_linkage/peaucellier_linkage.svg) |
| [Theo Jansen Leg](theo_jansen_leg/) | Strandbeest walking mechanism using "holy numbers" | [SVG](theo_jansen_leg/theo_jansen_leg.svg) |
| [Crank-Slider](crank_slider/) | Converts rotary to reciprocating motion (piston/engine) | [SVG](crank_slider/crank_slider.svg) |
| [Scotch Yoke](scotch_yoke/) | Converts rotation to linear motion via sliding yoke | [SVG](scotch_yoke/scotch_yoke.svg) |
| [Whitworth Quick-Return](whitworth_quick_return/) | Asymmetric motion for shaping machines | [SVG](whitworth_quick_return/whitworth_quick_return.svg) |
| [Geneva Mechanism](geneva_mechanism/) | Maltese cross for intermittent motion | [SVG](geneva_mechanism/geneva_mechanism.svg) |
| [Pantograph](pantograph/) | Rhombus linkage for copying/scaling drawings | [SVG](pantograph/pantograph.svg) |

### Gear Systems

| Example | Description | Preview |
|---------|-------------|---------|
| [Gear Mechanism](gear_mechanism/) | Two meshing gears with proper tooth spacing | [SVG](gear_mechanism/gear_mechanism.svg) |

### Artistic Patterns

| Example | Description | Preview |
|---------|-------------|---------|
| [Islamic Star Pattern](geometric_art/) | 192 points, 88 lines - intricate geometric precision | [SVG](geometric_art/islamic_star.svg) |
| [Parametric Flower](parametric_flower/) | Organic patterns from geometric constraints | [SVG](parametric_flower/parametric_flower.svg) |
| [Spirograph](spirograph/) | Mathematical art patterns | [SVG](spirograph/spirograph.svg) |
| [Iris Diaphragm](iris_diaphragm/) | Camera-style aperture mechanism | [SVG](iris_diaphragm/sophisticated_8blade.svg) |

### Complex Systems

| Example | Description | Preview |
|---------|-------------|---------|
| [Rube Goldberg Machine](rube_goldberg_machine/) | Chain-reaction with marble, bucket, lever, dominoes | [SVG](rube_goldberg_machine/rube_goldberg_machine.svg) |
| [Constraint Showcase](constraint_showcase/) | Demonstrates many constraint types in one file | [SVG](constraint_showcase/constraint_showcase.svg) |

### 3D Structures

| Example | Description |
|---------|-------------|
| [Tetrahedron](3d_structures/) | 4-faced polyhedron |
| [Octahedron](3d_structures/) | 8-faced polyhedron |
| [Pyramid](3d_structures/) | Square-based pyramid |
| [3D Truss](3d_structures/) | Structural truss in 3D |

### Learning Examples

| Example | Description |
|---------|-------------|
| [Basic Shapes](basic_shapes/) | Triangle, square, hexagon, pentagon - for learning constraint basics |

## Quick Start

### Installation
```bash
# Install SLVSX
curl -fsSL https://raw.githubusercontent.com/snoble/slvsx-cli/main/install.sh | bash

# Clone examples
git clone https://github.com/snoble/slvx-examples.git
cd slvx-examples
```

### Try It Out
```bash
# Solve a linkage
slvsx solve four_bar_linkage/four_bar_linkage.json

# Export to SVG
slvsx export -f svg four_bar_linkage/four_bar_linkage.json > output.svg
open output.svg
```

## Creating Your Own Examples

Read the [Visual Design Guide](VISUAL_DESIGN_GUIDE.md) before creating examples.

### Key Principles
1. **Build incrementally** - Add entities one at a time, test after each
2. **Export to SVG** - Visually inspect at every step
3. **Use parameters** - Make key dimensions parametric
4. **Provide good initial guesses** - Use `at` fields for points

### Example Structure
```json
{
  "schema": "slvs-json/1",
  "units": "mm",
  "parameters": {
    "link_length": 50,
    "angle": 30
  },
  "entities": [
    {"type": "point", "id": "origin", "at": [0, 0, 0]},
    {"type": "line", "id": "link", "p1": "origin", "p2": "end"}
  ],
  "constraints": [
    {"type": "fixed", "entity": "origin"},
    {"type": "distance", "between": ["origin", "end"], "value": "$link_length"}
  ]
}
```

## Key Constraint Types

| Constraint | Purpose | Example Use |
|------------|---------|-------------|
| `fixed` | Anchor a point | Origin, pivot points |
| `distance` | Set distance between points | Lengths, radii |
| `angle` | Set angle between lines | Rotations, slopes |
| `perpendicular` | Make lines 90 degrees | Right angles |
| `parallel` | Make lines parallel | Rails, guides |
| `point_on_line` | Point lies on line | Sliders, intersections |
| `equal_length` | Make segments equal | Regular polygons |
| `midpoint` | Point at midpoint | Centering |

## Known Issues

See [GitHub Issues](https://github.com/snoble/slvsx-cli/issues) for current bugs and feature requests.

- `equal_length` with >2 entities can cause crashes (bug #25) - use chained constraints instead
- `symmetric` constraint requires 2D geometry with workplane
- Circles don't track points - use points for moving parts

## Resources

- [SLVSX CLI](https://github.com/snoble/slvsx-cli) - The constraint solver
- [Visual Design Guide](VISUAL_DESIGN_GUIDE.md) - How to create good examples
- [SolveSpace](https://solvespace.com) - The underlying constraint solver

## License

Examples are provided as-is for educational purposes.
