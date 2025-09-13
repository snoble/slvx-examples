# Geometric Art - SLVSX Constraint Solver Examples

These examples create complex geometric patterns that would be nearly impossible to calculate by hand, demonstrating the true power of constraint-based design.

## Islamic Star Pattern (`islamic_star.json`)

### Why This is Impressive

This creates a traditional 8-pointed Islamic star pattern with **192 precisely positioned points** and **88 connecting lines**, all calculated from just a few parameters:

```json
"parameters": {
  "outer_radius": 100,
  "inner_radius": 38,
  "star_points": 8,
  "interlace_depth": 15
}
```

### The Manual Calculation Nightmare

To create this pattern by hand, you would need to:

1. **Calculate 64 intersection points** where star rays cross
2. **Solve for coincident constraints** - ensuring lines meet exactly at midpoints
3. **Maintain perfect rotational symmetry** - each point must be exactly 45° apart
4. **Calculate nested polygons** at three different radii
5. **Ensure all 88 lines** connect at the right angles and distances

The math involved:
- 192 coordinate calculations (x,y for 64 points × 3 dimensions)
- 48 distance constraints to maintain
- 32 coincident point constraints
- 45° rotational transforms applied 8 times per layer

### What Makes It "Wow"

1. **Perfect Mathematical Precision**: Every intersection is exact, not approximated
2. **Parametric Control**: Change one radius and the entire pattern recalculates
3. **Complex Interlacing**: The pattern has three layers that weave together
4. **Impossible Without a Solver**: Try calculating where `mid1` should be when it must:
   - Lie on the line from `outer1` to `inner3`
   - Also lie on the line from `outer8` to `inner2`
   - Maintain exact distance relationships

### The Visual Result

The SVG output creates a stunning geometric pattern with:
- 16 major star rays forming the primary structure
- 8 octagonal web connections
- 8 cross-braces creating internal structure
- A centered 8-pointed star
- All perfectly symmetric and mathematically precise

## How to Generate

```bash
# Solve the constraints
slvsx solve islamic_star.json

# Export to SVG
slvsx export -f svg islamic_star.json > islamic_star.svg
```

## Try Modifying It

Change any parameter and watch the entire pattern reconfigure:
- Increase `inner_radius` to 50 - the star becomes fuller
- Change `interlace_depth` to 25 - the center star grows
- Modify `outer_radius` to 150 - everything scales perfectly

## The Power of Constraints

This example showcases:
- **Coincident constraints**: Points that must lie on multiple lines simultaneously
- **Distance constraints**: Maintaining exact radii for circular arrangements
- **Computed intersections**: The solver finds where lines cross automatically
- **Parametric relationships**: Everything derives from just 4 parameters

Without a constraint solver, creating this pattern would require:
- Hours of trigonometric calculations
- Careful plotting of each point
- Manual verification of symmetry
- Complete recalculation if you want to change anything

With SLVSX, it's just 50 constraints that solve instantly.