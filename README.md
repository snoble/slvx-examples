# SLVSX Constraint Solver Examples

A collection of examples demonstrating the power of the [SLVSX](https://github.com/snoble/slvsx-cli) constraint solver for parametric design and mechanical systems.

## What is SLVSX?

SLVSX is a command-line interface to the SolveSpace constraint solver. It allows you to define geometric relationships declaratively and have the solver calculate actual positions automatically.

## Key Examples

### 🔧 [Iris Diaphragm](iris_diaphragm/)
A sophisticated mechanical iris (like a camera aperture) with tapered blades. This example showcases:
- Complex geometric constraints (perpendicular, coincident)
- Parametric control (single parameter controls entire mechanism)
- Why constraint solvers are essential for complex mechanical design

### ⚙️ [Gear Mechanism](gear_mechanism.json)
Interlocking gears with proper tooth meshing demonstrating mechanical constraints.

### 🔗 [Four-Bar Linkage](four_bar_linkage.json)
Classic mechanical linkage showing motion constraints and degrees of freedom.

### 🌸 [Parametric Flower](parametric_flower.json)
Artistic example showing how constraints can create organic patterns.

### 📐 Basic Geometry Examples
- `triangle.json` - Simple triangle with constraints
- `square_pure_constraints.json` - Square defined entirely by constraints
- `hexagon_pure_constraints.json` - Hexagon using rotational symmetry
- `pentagon_star.json` - Star pattern with angular constraints

## Installation

1. Install SLVSX:
```bash
curl -fsSL https://raw.githubusercontent.com/snoble/slvsx-cli/main/install.sh | bash
```

2. Clone this repository:
```bash
git clone https://github.com/snoble/slvx-examples.git
cd slvx-examples
```

## Usage

### Solve a constraint system:
```bash
slvsx solve iris_diaphragm/sophisticated_8blade.json
```

### Export to SVG:
```bash
slvsx export -f svg iris_diaphragm/sophisticated_8blade.json > output.svg
```

### Validate a file:
```bash
slvsx validate gear_mechanism.json
```

## Key Concepts

### Constraints vs Coordinates
Instead of specifying exact positions:
```json
{"type": "point", "id": "p1", "at": [86.6, 50, 0]}  // Hard-coded
```

Use constraints to define relationships:
```json
{"type": "distance", "between": ["center", "p1"], "value": 100},
{"type": "angle", "between": ["ref_line", "spoke1"], "value": 30}
```

### Parametric Design
Define parameters once, use everywhere:
```json
"parameters": {
  "blade_angle": 45,
  "blade_length": 100
}
```

### Constraint Types
- `fixed` - Anchor a point or entity
- `distance` - Set distance between points
- `angle` - Set angle between lines
- `perpendicular` - Make lines perpendicular
- `parallel` - Make lines parallel
- `coincident` - Place point on line
- `horizontal`/`vertical` - Align to axes

## Contributing

Feel free to add more examples! The best examples:
1. Demonstrate why a constraint solver is needed
2. Would be difficult to calculate manually
3. Show parametric behavior (changing one value updates everything)
4. Are well-documented

## Resources

- [SLVSX CLI Documentation](https://github.com/snoble/slvsx-cli)
- [SolveSpace](https://solvespace.com) - The underlying constraint solver
- [Constraint Programming](https://en.wikipedia.org/wiki/Constraint_programming) - General concepts

## License

Examples are provided as-is for educational purposes.