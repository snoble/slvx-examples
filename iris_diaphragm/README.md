# Iris Diaphragm Constraint Solver Example

This directory demonstrates the power of the SLVSX constraint solver through an iris diaphragm mechanism - similar to a camera aperture. This example showcases why constraint solvers are essential for complex mechanical designs.

## Why This Example is Exceptional

### The Challenge
Creating an iris diaphragm with tapered blades that:
- Open and close smoothly with a single parameter
- Maintain perfect rotational symmetry
- Have trapezoidal blades (wider at base, narrower at tip)
- Keep blade edges perpendicular to their centerlines
- Position pivots exactly on blade base edges (not at corners)

### Why You Need a Constraint Solver

Without a constraint solver, calculating the positions of tapered blade corners requires:

1. **Complex Trigonometry**: For each blade at angle θ:
   - Rotate centerline by θ from spoke direction
   - Calculate perpendicular vectors at both ends
   - Find corner points at specific distances along perpendiculars
   - Ensure pivot lies exactly on the base edge line

2. **System of Equations**: Each blade has 4 corners whose positions depend on:
   - Pivot location (radius and angular position)
   - Blade rotation angle
   - Base and tip widths
   - Perpendicularity constraints

3. **Scalability Issues**: 
   - 8 blades = 32 corner points to calculate
   - Every aperture change requires recalculating all points
   - Adding blades means rewriting all calculations

### The Constraint Solver Advantage

With SLVSX, you simply declare relationships:
```json
{
  "type": "perpendicular",
  "a": "blade1_centerline",
  "b": "blade1_base_edge"
}
```

The solver automatically:
- Calculates all corner positions
- Maintains constraints as parameters change
- Handles any number of blades
- Ensures geometric consistency

## Key Files

### Core Examples
- `sophisticated_8blade.json` - 8-blade iris with tapered blades and all constraints
- `test_single_tapered_blade.json` - Single blade demonstration showing the complexity
- `generated_12blade_impressive.json` - 12-blade version showing scalability

### Generator
- `iris_generator.js` - Node.js script that generates iris configurations programmatically

### Different Aperture Settings
- `sophisticated_6blade_closed.json` - 6 blades at 35° (closed aperture)
- `sophisticated_6blade_mid.json` - 6 blades at 55° (medium aperture)
- `sophisticated_6blade_open.json` - 6 blades at 75° (open aperture)

## Running the Examples

### Solve a configuration:
```bash
slvsx solve sophisticated_8blade.json
```

### Generate new configurations:
```bash
node iris_generator.js
```

### Export to SVG for visualization:
```bash
slvsx export -f svg sophisticated_8blade.json > iris.svg
```

## Key Constraints Used

1. **`perpendicular`** - Ensures blade edges are perpendicular to centerline
2. **`coincident`** - Places pivot point exactly on blade base edge
3. **`distance`** - Sets blade dimensions and pivot radius
4. **`angle`** - Controls blade rotation and spoke spacing
5. **`fixed`** - Anchors center point and reference pivot

## Why This Couldn't Be Done Without the Library

### Manual Calculation Complexity
For a single blade with corners at arbitrary rotation:
```javascript
// You'd need to:
1. Calculate rotated centerline endpoint
2. Find perpendicular vector at pivot
3. Calculate base corners along perpendicular
4. Find perpendicular vector at tip
5. Calculate tip corners along perpendicular
6. Verify pivot is on base edge line

// For each parameter change:
- Recalculate all of the above
- For all blades
- Ensure consistency
```

### With SLVSX
```javascript
// Just change the parameter:
"blade_angle": 45  // All blades update automatically
```

## Incremental Development Process

This example required incremental building:

1. **Start with pivots**: Verify rotational symmetry
2. **Add single blade**: Test rotation and dimensions
3. **Add blade shape**: Implement tapered trapezoid
4. **Add constraints**: Perpendicular edges, coincident pivot
5. **Replicate**: Extend to all blades
6. **Parameterize**: Link all blades to single control angle

Each step required testing before proceeding - you can't write this all at once.

## Technical Achievement

This demonstrates several sophisticated constraint solver capabilities:
- **Geometric relationships** without explicit coordinates
- **Parametric design** - change one value, update entire mechanism
- **Complex constraints** - perpendicularity, coincidence, synchronized motion
- **Emergent behavior** - overlap patterns arise from constraints, not explicit design

The iris diaphragm is a perfect example of where constraint solvers shine: a mechanism with complex geometry that would be tedious to calculate manually but elegant to specify through relationships.