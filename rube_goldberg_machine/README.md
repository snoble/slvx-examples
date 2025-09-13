# Rube Goldberg Machine - SLVSX Constraint Solver Example

A chain-reaction machine where a marble triggers various mechanisms through a carefully orchestrated sequence. This example demonstrates why constraint solvers are essential for complex mechanical systems with cascading dependencies.

## Why This Example Requires a Constraint Solver

### The Manual Calculation Problem
Without a constraint solver, building this machine would require:

1. **Cascading Trigonometry**: Each component's position depends on the previous one:
   - Ramp angle determines exit velocity
   - Exit velocity determines landing position
   - Landing position determines lever placement
   - Lever ratio determines trigger point
   - And so on...

2. **Simultaneous Equations**: Multiple constraints must be satisfied at once:
   - The marble must land on the catcher
   - The catcher must trigger the lever
   - The lever must reach the dominoes
   - All while maintaining physical plausibility

3. **Parameter Propagation**: Changing the marble size affects:
   - Ramp clearances
   - Drop trajectories
   - Lever balance points
   - Domino spacing
   - Every downstream component

### What the Constraint Solver Provides

1. **Automatic Positioning**: Define relationships, not coordinates
2. **Parametric Control**: Change one value, everything adjusts
3. **Physics Constraints**: Angles, distances, and alignments maintained
4. **Incremental Building**: Add components step by step

## Files

### Incremental Development Steps
1. `step1_ramp.json` - Basic inclined ramp with marble path
2. `step2_drop.json` - Adds catcher below ramp exit
3. `step3_lever.json` - Adds seesaw mechanism
4. `complete_machine.json` - Full machine with dominoes, pulley, and bell

### Visualizations
- `*.svg` - Visual representations of each step

## Key Features Demonstrated

### 1. Sequential Dependencies
Each mechanism depends on the previous one's output position and timing. The constraint solver automatically maintains these relationships.

### 2. Mixed Constraint Types
- `angle` - Ramp incline for marble speed
- `distance` - Component spacing and drops
- `horizontal`/`vertical` - Gravity-aligned elements
- `coincident` - Connection points between mechanisms

### 3. Parametric Design
```json
"parameters": {
  "marble_radius": 10,
  "ramp_angle": 30,
  "lever_ratio": 3,
  "domino_spacing": 30
}
```
Change any parameter and the entire machine reconfigures.

## How to Use

### Solve the complete machine:
```bash
slvsx solve complete_machine.json
```

### Export to SVG:
```bash
slvsx export -f svg complete_machine.json > machine.svg
```

### Modify parameters:
Edit the parameters in `complete_machine.json`:
- Increase `ramp_angle` for faster marble
- Adjust `lever_ratio` for different mechanical advantage
- Change `domino_spacing` for tighter/looser arrangement

## The Power of Incremental Building

This example was built step-by-step:
1. Started with just a ramp
2. Added drop and catcher
3. Added lever mechanism
4. Added domino chain
5. Added pulley system
6. Added final bell

At each step, the constraint solver ensured everything remained connected and physically valid. This incremental approach would be nearly impossible with manual calculations.

## Physics Considerations

While the constraint solver handles positioning, the actual physics simulation (marble trajectory, domino falls, etc.) would require additional modeling. The solver ensures:
- Components are positioned correctly
- Clearances are maintained
- Angles and distances follow specifications
- Everything scales parametrically

## Try It Yourself

Experiment with the parameters:
1. Make the ramp steeper - see how the catcher moves
2. Change the lever ratio - watch the trigger point shift
3. Add more dominoes - they'll space automatically
4. Scale the entire machine - everything maintains proportions

This demonstrates the true power of constraint-based design: defining relationships rather than calculating positions.