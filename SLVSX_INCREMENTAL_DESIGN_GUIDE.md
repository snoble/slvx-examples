# SLVSX Constraint Solver: Incremental Design Guide

## What is SLVSX?

SLVSX is a geometric constraint solver that finds positions for points, lines, and circles based on relationships you define. Instead of calculating exact coordinates, you describe relationships like "these lines are perpendicular" or "these segments have equal length" and the solver figures out the actual positions.

## Installation

```bash
# Download the latest macOS binary
curl -L https://github.com/snoble/slvsx-cli/releases/download/v0.1.4/slvsx-macos.tar.gz -o slvsx-macos.tar.gz
tar -xzf slvsx-macos.tar.gz
./slvsx --version
```

## The Problem: Designing a Deployable Solar Panel Array

You need to design a solar panel array that:
- Folds compactly for transport (1m x 1m x 0.5m)
- Deploys to 6m x 4m when operational
- Maintains structural rigidity when deployed
- Has panels that track the sun independently
- Includes support struts that don't interfere with panel rotation
- Has a single actuation point for deployment

This is nearly impossible to design all at once because:
- Folding geometry affects deployed configuration
- Support structure must work in both states
- Panel tracking must not cause collisions
- Everything must fit within transport constraints

## The Incremental Approach

### CRITICAL RULES - NEVER VIOLATE THESE!

1. **NEVER hardcode exact positions** - Use dummy coordinates like [0,0,0], [1,0,0], [0,1,0]
2. **Fix ONLY 1-2 points maximum** - Usually just one origin point
3. **Let the solver discover ALL other positions** - That's its job!
4. **Use constraints to define relationships** - Not coordinates
5. **If you're calculating angles or positions, STOP** - Add a constraint instead

### Why This Matters

When you hardcode positions:
- Modifications become impossible without recalculation
- You've defeated the purpose of the solver
- You accumulate rounding errors
- You can't explore different configurations

When you use constraints:
- Change one parameter, everything updates
- Insert new elements anywhere
- Solver guarantees geometric consistency
- Explore configurations by changing single values

### Core Concept: Build One Relationship at a Time

Instead of trying to solve everything simultaneously, you'll:
1. Start with the simplest possible constraint
2. Test that it works
3. Add one more constraint
4. Test again
5. If it fails, you know exactly which constraint caused the problem

### Step-by-Step Building Process

#### Step 1: Create the Base Frame (fixed_base.json)

**CRITICAL RULE: Use approximate positions (0,0,0 or 1,1,0) for ALL points. The solver will find the real positions!**

```json
{
  "schema": "slvs-json/1",
  "units": "mm",
  "entities": [
    {
      "type": "point",
      "id": "base_left",
      "at": [0, 0, 0]
    },
    {
      "type": "point",
      "id": "base_right",
      "at": [1, 0, 0]  // Just a guess! Solver will fix it
    },
    {
      "type": "line",
      "id": "base",
      "p1": "base_left",
      "p2": "base_right"
    }
  ],
  "constraints": [
    {
      "type": "fixed",
      "entity": "base_left"
    },
    {
      "type": "horizontal",
      "a": "base"
    },
    {
      "type": "distance",
      "between": ["base_left", "base_right"],
      "value": 1000
    }
  ]
}
```

Note: base_right is NOT fixed! Only ONE point is fixed, everything else comes from constraints.

Test: `./slvsx solve fixed_base.json`

#### Step 2: Add First Folding Arm (add_arm1.json)
Copy previous file and add:
- Two new points with DUMMY coordinates
- Lines to represent the arm segments
- Distance constraints ONLY - no fixed positions!

```json
// Add to entities:
{
  "type": "point",
  "id": "arm1_mid",
  "at": [0, 1, 0]  // DUMMY position - solver will calculate!
},
{
  "type": "point", 
  "id": "arm1_end",
  "at": [1, 1, 0]  // DUMMY position - solver will calculate!
},
{
  "type": "line",
  "id": "arm1_lower",
  "p1": "base_left",
  "p2": "arm1_mid"
},
{
  "type": "line",
  "id": "arm1_upper",
  "p1": "arm1_mid",
  "p2": "arm1_end"
}

// Add constraints:
{
  "type": "distance",
  "between": ["base_left", "arm1_mid"],
  "value": 750
},
{
  "type": "distance",
  "between": ["arm1_mid", "arm1_end"],
  "value": 750
}
```

**The arm can now rotate freely! Add an angle constraint later to control deployment.**

#### Step 3: Add Parallel Folding Arm (add_arm2.json)
- Add matching arm from base_right
- Use equal_length constraints to ensure symmetry
- Add lines and use parallel constraints

#### Step 4: Add Cross-Bracing (add_bracing.json)
- Add diagonal supports
- Use equal_length for all diagonals
- This is where the solver becomes powerful - you don't calculate angles

#### Step 5: Add Panel Mounting Points (add_panels.json)
- Add points for panel corners
- Constrain them to lie on the arms
- Use coincident constraints

#### Step 6: Add Deployment Constraint (deployment.json)
- Add a single control angle
- All other angles derive from this one
- Change this one value to animate deployment

## Key Constraint Types

### Fixed Position
```json
{"type": "fixed", "entity": "point_id"}
```
Use sparingly - usually only 1-2 points

### Distance
```json
{"type": "distance", "between": ["point1", "point2"], "value": 100}
```

### Geometric Relationships
```json
{"type": "perpendicular", "a": "line1", "b": "line2"}
{"type": "parallel", "a": "line1", "b": "line2"}
{"type": "horizontal", "a": "line1"}
{"type": "vertical", "a": "line1"}
```

### Equal Constraints
```json
{"type": "equal_length", "a": "line1", "b": "line2"}
{"type": "equal_radius", "a": "circle1", "b": "circle2"}
```

### Coincidence
```json
{"type": "coincident", "entity": "point", "on": "line"}
```

### Angles
```json
{"type": "angle", "between": ["line1", "line2"], "value": 45}
```

## Testing Workflow

1. **After each addition:**
   ```bash
   ./slvsx solve current_step.json | python3 -m json.tool
   ```

2. **Check degrees of freedom (DOF):**
   - DOF > 0: Under-constrained (can still move)
   - DOF = 0: Fully constrained (solved)
   - Error: Over-constrained (impossible)

3. **Visualize:**
   ```bash
   ./slvsx export -f svg current_step.json > output.svg
   open output.svg
   ```

## Common Patterns

### Scissor Mechanism
- Equal length segments
- Parallel pairs
- One angle controls entire deployment

### Rigid Triangle
- Three distance constraints between three points
- Automatically maintains shape

### Sliding Joint
- Point coincident on line
- Can slide along but not leave the line

### Four-Bar Linkage
- Four points, four distance constraints
- One degree of freedom for motion

## Advantages of This Approach

1. **Local Changes, Global Effects**: Modify one constraint in the middle, everything adjusts
2. **Exploration**: Try different values easily without recalculating
3. **Validation**: Solver tells you if configuration is impossible
4. **No Accumulated Error**: Unlike manual calculation, constraints are solved exactly
5. **Focus**: Tackle one engineering challenge at a time

## Tips for Success

1. **Start with the minimum**: Just 1-2 fixed points
2. **Add constraints incrementally**: One at a time if debugging
3. **Use non-numeric constraints**: Prefer parallel/perpendicular over angles
4. **Test frequently**: Run solver after each addition
5. **Save working versions**: Keep each successful step as a separate file
6. **Let the solver work**: Don't pre-calculate positions - use rough estimates and let solver fix them

## Example: The RIGHT Way vs WRONG Way

### ❌ WRONG - Hardcoding Positions
```json
{
  "entities": [
    {"type": "point", "id": "A", "at": [0, 0, 0]},
    {"type": "point", "id": "B", "at": [100, 0, 0]},
    {"type": "point", "id": "C", "at": [50, 86.6, 0]}  // Calculated √3/2 * 100
  ],
  "constraints": [
    {"type": "fixed", "entity": "A"},
    {"type": "fixed", "entity": "B"},
    {"type": "fixed", "entity": "C"}  // Everything is fixed!
  ]
}
```
Problems: Can't modify, can't scale, can't rotate, defeats the solver

### ✅ RIGHT - Using Constraints
```json
{
  "entities": [
    {"type": "point", "id": "A", "at": [0, 0, 0]},
    {"type": "point", "id": "B", "at": [1, 0, 0]},  // Dummy position
    {"type": "point", "id": "C", "at": [0, 1, 0]},  // Dummy position
    {"type": "line", "id": "AB", "p1": "A", "p2": "B"},
    {"type": "line", "id": "BC", "p1": "B", "p2": "C"},
    {"type": "line", "id": "CA", "p1": "C", "p2": "A"}
  ],
  "constraints": [
    {"type": "fixed", "entity": "A"},  // Only ONE fixed point!
    {"type": "horizontal", "a": "AB"},
    {"type": "distance", "between": ["A", "B"], "value": 100},
    {"type": "equal_length", "a": "AB", "b": "BC"},
    {"type": "equal_length", "a": "BC", "b": "CA"}
  ]
}
```
Benefits: Change the 100 to 200, triangle scales. Remove horizontal, it rotates. Solver finds C automatically!

## Example Problem Progression

1. `step1_base.json` - Just the fixed mounting points
2. `step2_first_arm.json` - Add one articulated arm
3. `step3_second_arm.json` - Mirror arm with symmetry constraints  
4. `step4_cross_brace.json` - Add structural support
5. `step5_panels.json` - Mount panels on frame
6. `step6_actuator.json` - Single control point for deployment
7. `step7_stops.json` - Add deployment limits
8. `step8_final.json` - Complete mechanism

Each file builds on the previous, making debugging simple. If step 5 fails, you know the panel constraints conflict with the existing structure.

## When to Use This Tool

Perfect for:
- Mechanisms with moving parts
- Structures that must fold/deploy
- Designs with many symmetric elements
- Systems where changing one dimension affects many others
- Problems where exact angles/positions emerge from constraints

Not ideal for:
- Simple static shapes with known coordinates
- Purely aesthetic designs without geometric constraints
- 3D solid modeling (this is 2D + limited 3D)

## Next Steps

1. Start with `fixed_base.json`
2. Add one constraint at a time
3. Test after each addition
4. When you hit an error, remove the last constraint and try another approach
5. Build complexity gradually

Remember: The power comes from describing relationships, not positions. Let the solver do the math!