# Fun Geometry Project with SLVSX

This project demonstrates creative uses of the SLVSX constraint solver for generating parametric geometric designs.

## What We Created

### 1. **Parametric Star Polygon Generator** (`geometry_animator.py`)
A Python script that creates various star polygons with adjustable parameters:
- Pentagon stars (5 points)
- Hexagon stars (6 points)  
- Octagon stars (8 points)
- Rotating stars with angular offsets
- Gear mechanisms with meshing constraints

### 2. **Key Features**
- **Parametric Design**: Change a single parameter (like inner_radius) to morph the entire shape
- **Constraint-Based**: Uses geometric constraints (distances, angles, tangency) instead of explicit coordinates
- **Animation Ready**: Parameters can be varied over time to create animations
- **Multiple Formats**: Can export to SVG, DXF, STL when using slvsx

## How It Works

The constraint solver takes a JSON description of:
1. **Entities**: Points, lines, circles
2. **Constraints**: Relationships between entities (fixed positions, distances, angles, tangency)
3. **Parameters**: Named values that can be varied

The solver finds positions for all entities that satisfy all constraints simultaneously.

## Example: Creating a 5-Point Star

```python
star = create_star_polygon(
    n_points=5,      # Pentagon base
    outer_radius=100, # Outer points distance from center
    inner_radius=40,  # Inner points distance (controls "sharpness")
    rotation=0        # Rotation angle
)
```

This generates constraints like:
- Center point fixed at origin
- 5 outer points at 100mm from center
- 5 inner points at 40mm from center
- Angular spacing of 72° between adjacent outer points

## Running the Project

1. **Generate the constraint files**:
   ```bash
   python3 geometry_animator.py
   ```

2. **Solve constraints** (when slvsx is available):
   ```bash
   ./slvsx solve pentagon_star.json
   ```

3. **Export to SVG**:
   ```bash
   ./slvsx export -f svg pentagon_star.json -o star.svg
   ```

## Fun Variations to Try

1. **Animated Spirograph**: Vary the rotation parameter from 0 to 360 degrees
2. **Morphing Stars**: Animate inner_radius from 10 to 90 to see the star "breathe"
3. **Gear Train**: Create multiple meshing gears with specific ratios
4. **Kaleidoscope Patterns**: Use symmetry constraints to create complex patterns

## Why This is Cool

- **Mathematical Beauty**: The shapes emerge from constraints, not explicit calculations
- **Engineering Applications**: Same principles used in CAD for mechanical design
- **Creative Coding**: Combine programming with geometric art
- **Educational**: Teaches constraint-based thinking and parametric design

## Next Steps

1. Add more complex mechanisms (linkages, cams, etc.)
2. Create a web visualizer using the WASM version
3. Generate animation frames by varying parameters
4. Export to 3D formats for printing/modeling

## Technical Notes

The project uses the SLVSX constraint solver which wraps the SolveSpace geometric kernel. This provides industrial-strength constraint solving in a simple JSON interface perfect for programmatic generation of geometric designs.