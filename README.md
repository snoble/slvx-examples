# SLVSX Constraint Solver Examples

A collection of visually impressive examples demonstrating the power of the [SLVSX](https://github.com/snoble/slvsx-cli) constraint solver for parametric design and mechanical systems.

## 📖 **IMPORTANT**: [Visual Design Guide](VISUAL_DESIGN_GUIDE.md)
**Before creating examples, read the Visual Design Guide to understand what makes a "wow" example.**

## What is SLVSX?

SLVSX is a command-line interface to the SolveSpace constraint solver. It allows you to define geometric relationships declaratively and have the solver calculate actual positions automatically.

## Showcase Examples

### 🌟 [Islamic Star Pattern](geometric_art/)
**192 points, 88 lines, 4 parameters**
- Intricate geometric pattern with perfect mathematical precision
- Complex intersections calculated automatically
- Would take hours to calculate by hand
- **View:** `geometric_art/islamic_star.svg`

### 🔧 [Iris Diaphragm](iris_diaphragm/)  
**Mechanical aperture with tapered blades**
- Sophisticated mechanism like a camera aperture
- Single parameter controls entire mechanism
- Perpendicular constraints create proper blade geometry
- **View:** `iris_diaphragm/sophisticated_8blade.svg`

### 🎢 [Rube Goldberg Machine](rube_goldberg_machine/)
**Chain-reaction machine with visual components**
- Recognizable mechanical components (marble, bucket, lever, dominoes)
- Sequential dependencies between mechanisms
- Shows why manual calculation is impractical
- **View:** `rube_goldberg_machine/rube_goldberg_machine.svg`

## Additional Examples

### Mechanical Systems
- [Four-Bar Linkage](four_bar_linkage.json) - Classic mechanical linkage
- [Gear Mechanism](gear_mechanism.json) - Interlocking gears with proper meshing

### Artistic Patterns
- [Parametric Flower](parametric_flower.json) - Organic patterns from constraints
- [Spirograph](spirograph.json) - Mathematical art patterns

### [Basic Shapes](basic_shapes/)
Simple learning examples for understanding constraint basics

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
# Solve the Islamic star pattern
slvsx solve geometric_art/islamic_star.json

# Export to SVG and view
slvsx export -f svg geometric_art/islamic_star.json > star.svg
open star.svg  # or use your SVG viewer
```

## Creating Your Own Examples

### The Golden Rule
**Always export to SVG and visually inspect at every step.**

### Good Example Checklist
- [ ] Visually recognizable components (not abstract lines)
- [ ] Reasonable coordinate system (< 200 units from origin)
- [ ] Parameters that make sense (human-scale values)
- [ ] Complex enough to show solver power
- [ ] SVG output that makes people say "wow"

### Example Structure
```json
{
  "schema": "slvs-json/1",
  "units": "mm",
  "parameters": {
    "key_dimension": 50,
    "angle": 30
  },
  "entities": [
    // Points, lines, etc.
  ],
  "constraints": [
    // Relationships between entities
  ]
}
```

## Key Constraint Types

| Constraint | Purpose | Example Use |
|------------|---------|-------------|
| `fixed` | Anchor a point | Origin, pivot points |
| `distance` | Set distance between points | Lengths, radii |
| `angle` | Set angle between lines | Rotations, slopes |
| `perpendicular` | Make lines 90° | Right angles |
| `parallel` | Make lines parallel | Rails, guides |
| `coincident` | Point on line | Intersections |
| `horizontal`/`vertical` | Align to axes | Level surfaces |

## Development Workflow

1. **Start Simple**: Basic shape with few constraints
2. **Test Visually**: Export to SVG after each change
3. **Add Complexity**: Layer additional constraints
4. **Check Scale**: Ensure viewBox is reasonable
5. **Parametrize**: Replace hard values with parameters
6. **Document**: Explain why it needs a solver

## Contributing

### What Makes a Good Contribution
- **Visually Impressive**: Should make viewers say "wow"
- **Demonstrates Solver Power**: Too complex for manual calculation
- **Well Documented**: Clear explanation of constraints used
- **Properly Scaled**: Reasonable coordinate system
- **Parametric**: Key dimensions controlled by parameters

### Before Submitting
1. Read the [Visual Design Guide](VISUAL_DESIGN_GUIDE.md)
2. Test all incremental steps
3. Ensure SVG output looks impressive
4. Document why a solver is needed
5. Use human-scale parameters

## Resources

- [SLVSX CLI Documentation](https://github.com/snoble/slvsx-cli)
- [Visual Design Guide](VISUAL_DESIGN_GUIDE.md) - **Must read for contributors**
- [SolveSpace](https://solvespace.com) - The underlying constraint solver

## License

Examples are provided as-is for educational purposes.