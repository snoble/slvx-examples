# Iris Diaphragm Constraint Solver Example

Working iris diaphragm mechanisms demonstrating the power of constraint-based design. These examples create camera aperture-like mechanisms that open and close smoothly.

## Working Examples

### Simple Iris Mechanisms
- `simple_iris.json` - Basic 6-blade iris with simple lines
- `simple_iris.svg` - Rendered visualization

### 6-Blade Configurations
- `iris_6blade_open.json` - Open aperture (15° blade angle)
- `iris_6blade_mid.json` - Medium aperture (45° blade angle)  
- `iris_6blade_closed.json` - Closed aperture (65° blade angle)
- `iris_6blade.json` - Advanced version with blade shapes

All configurations include their generated SVG files for visualization.

## Generator Script

### `iris_generator_simple.js`
Node.js script that generates working iris configurations with any number of blades.

Usage:
```bash
node iris_generator_simple.js [numBlades] [bladeAngle] [outputFile]

# Examples:
node iris_generator_simple.js 6 30 iris_open.json    # 6 blades, 30° angle
node iris_generator_simple.js 8 45 iris_mid.json     # 8 blades, 45° angle
node iris_generator_simple.js 12 60 iris_closed.json # 12 blades, 60° angle
```

Parameters:
- `numBlades` - Number of iris blades (default: 6)
- `bladeAngle` - Angle of blades in degrees (0° = open, 60-70° = nearly closed)
- `outputFile` - Output JSON file (prints to stdout if not provided)

## Key Design Features

### Synchronized Motion
All blades rotate by the same angle parameter, creating uniform aperture changes.

### Constraints Used
1. **`fixed`** - Anchors center and pivot points
2. **`distance`** - Sets blade lengths
3. **`angle`** - Controls blade rotation relative to radials
4. **`perpendicular`** - Blade base perpendicular to centerline (advanced version)
5. **`point_on_line`** - Pivot positioned on blade base (advanced version)

### Parametric Control
Single `blade_angle` parameter controls entire mechanism:
```json
"parameters": {
  "blade_angle": 30  // Change this to open/close aperture
}
```

## Running the Examples

### Generate and solve:
```bash
# Generate a new configuration
node iris_generator_simple.js 8 35 iris_8blade.json

# Export to SVG
slvsx export -o iris_8blade.svg iris_8blade.json
```

### View existing examples:
```bash
# Open any of the SVG files in a browser
open iris_6blade_open.svg
open iris_6blade_mid.svg
open iris_6blade_closed.svg
```

## Why Use a Constraint Solver?

### Without Constraints
- Calculate each blade tip position with trigonometry
- Manually update all positions when angle changes
- Complex math for each configuration

### With Constraints
- Declare relationships once
- Solver handles all calculations
- Change one parameter, everything updates

## Technical Achievement

This example demonstrates:
- **Parametric design** - Single parameter controls entire mechanism
- **Scalability** - Generator works for any number of blades
- **Visual impact** - Creates recognizable mechanical aperture
- **Practical application** - Similar to real camera iris mechanisms

The iris diaphragm showcases how constraint solvers turn complex mechanical calculations into simple relationship declarations.