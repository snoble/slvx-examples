# Iris Diaphragm Mechanism - Pure Constraint Challenge

## The Problem

Design an iris diaphragm (like a camera aperture) that:
- Has 6-12 overlapping blades
- Opens and closes with a single rotation parameter
- Maintains a perfectly circular aperture at all positions
- Each blade pivots at its outer edge
- Blades overlap consistently without gaps

## Why This Problem is PERFECT for Constraint Solvers

### You CANNOT Cheat with Positions
- Blade positions depend on the number of blades (360°/N)
- Each blade's angle depends on the aperture setting
- Overlap patterns emerge from constraints, not coordinates
- If you hardcode ANY blade position, the mechanism breaks when N changes

### The Math is Nightmarish
Calculating blade positions requires:
- Simultaneous trigonometric equations
- Intersection of rotating planes
- Maintaining tangency while rotating
- Ensuring overlap without gaps

The solver handles all of this automatically!

## CRITICAL RULES - VIOLATIONS WILL BREAK EVERYTHING

1. **FIX ONLY THE CENTER POINT** - Everything else must be derived
2. **USE ROTATIONAL SYMMETRY** - Don't place blades manually
3. **LET OVERLAP EMERGE** - Don't calculate overlap angles
4. **ONE PARAMETER CONTROLS ALL** - Single angle opens/closes
5. **DUMMY COORDINATES ONLY** - Use [0,0,0], [1,0,0], [0,1,0]

## Why Hardcoding Positions Will Fail

### Scenario 1: You hardcode blade positions
```json
// ❌ WRONG - This breaks when you change blade count
{"type": "point", "id": "blade1_pivot", "at": [100, 0, 0]},
{"type": "point", "id": "blade2_pivot", "at": [50, 86.6, 0]},  // Calculated for 6 blades
```
**Problem**: Want 8 blades instead of 6? Recalculate EVERYTHING!

### Scenario 2: You calculate overlap angles
```json
// ❌ WRONG - Hardcoded overlap
{"type": "angle", "between": ["blade1", "blade2"], "value": 30}
```
**Problem**: Overlap must change with aperture size. This locks it!

### Scenario 3: You fix blade endpoints
```json
// ❌ WRONG - Fixed blade geometry
{"type": "fixed", "entity": "blade1_inner"},
{"type": "fixed", "entity": "blade1_outer"}
```
**Problem**: Blades must rotate! Fixing them breaks the mechanism.

## Critical Implementation Lessons (Added After First Attempt)

### Lesson 1: Start with JUST the Pivot Circle
Don't add blades yet! First verify that N pivots arrange correctly at 360°/N intervals. Test with 2, 3, 4 pivots before moving on.

### Lesson 2: One Blade First, Perfect It
Add blade structure to ONLY one blade. Make sure it rotates correctly with a single angle constraint. Only then add blade #2.

### Lesson 3: Use Parameters for Synchronized Motion
All blades must reference the SAME angle parameter. Don't give each blade its own angle constraint:
```json
// WRONG - Independent angles (what I did first time):
{"type": "angle", "between": ["pivot1_line", "blade1"], "value": 110},
{"type": "angle", "between": ["pivot2_line", "blade2"], "value": 110},

// RIGHT - Shared parameter:
"parameters": {"blade_angle": 110},
"constraints": [
  {"type": "angle", "between": ["pivot1_line", "blade1"], "value": "$blade_angle"},
  {"type": "angle", "between": ["pivot2_line", "blade2"], "value": "$blade_angle"}
]
```

### Lesson 4: Test with 2 Blades Exhaustively
Before adding blades 3-6, verify that:
- Both blades rotate together
- Changing the parameter affects both
- The mechanism doesn't lock up

### Lesson 5: Debug Immediately When Constraints Don't Propagate
If dummy positions don't update, STOP. Don't add more complexity. The solver is telling you something is wrong.

### Lesson 6: All Dummy Positions Can Be Identical
Use [1,1,0] for EVERYTHING. If you're varying dummy positions, you're still thinking about location instead of relationships.

## The RIGHT Approach - Step by Step

### Step 1: Create the Center Hub
```json
{
  "entities": [
    {
      "type": "point",
      "id": "center",
      "at": [0, 0, 0]
    },
    {
      "type": "point",
      "id": "reference",
      "at": [1, 0, 0]  // Dummy - for angle reference
    },
    {
      "type": "line",
      "id": "ref_line",
      "p1": "center",
      "p2": "reference"
    }
  ],
  "constraints": [
    {
      "type": "fixed",
      "entity": "center"  // ONLY fixed point!
    },
    {
      "type": "horizontal",
      "a": "ref_line"
    },
    {
      "type": "distance",
      "between": ["center", "reference"],
      "value": 100
    }
  ]
}
```

### Step 2: Add First Blade with Pivot
```json
// Add to entities:
{
  "type": "point",
  "id": "blade1_pivot",
  "at": [1, 0, 0]  // Dummy position
},
{
  "type": "point",
  "id": "blade1_inner",
  "at": [0, 1, 0]  // Dummy position
},
{
  "type": "line",
  "id": "blade1",
  "p1": "blade1_pivot",
  "p2": "blade1_inner"
}

// Add constraints:
{
  "type": "distance",
  "between": ["center", "blade1_pivot"],
  "value": 100  // Radius to pivot
},
{
  "type": "distance",
  "between": ["blade1_pivot", "blade1_inner"],
  "value": 80  // Blade length
},
{
  "type": "angle",
  "between": ["ref_line", "blade1"],
  "value": 20  // Control angle - THIS drives everything!
}
```

### Step 3: Add Second Blade with Rotational Symmetry
```json
// Add blade2 with same structure...

// Critical constraint for rotational symmetry:
{
  "type": "angle",
  "between": ["blade1_pivot_line", "blade2_pivot_line"],
  "value": 60  // 360°/6 for 6 blades
}
```

### Step 4: Add Equal Blade Constraints
```json
{
  "type": "equal_length",
  "a": "blade1",
  "b": "blade2"
},
{
  "type": "equal_angle",
  "angles": ["blade1_angle", "blade2_angle"]  // All blades rotate together
}
```

### Step 5: Continue Pattern for N Blades

The key: Each blade is constrained relative to the previous one, creating a chain of rotational symmetry.

## Testing Your Solution

### Test 1: Change Aperture
- Modify the single control angle from 20° to 60°
- ALL blades should rotate together
- Aperture should open smoothly

### Test 2: Change Blade Count
- Change the symmetry angle from 60° (6 blades) to 45° (8 blades)
- Entire mechanism should reconfigure
- No manual recalculation needed!

### Test 3: Change Blade Length
- Modify the blade length parameter
- Overlap pattern should adjust automatically
- Aperture range changes accordingly

## Common Failure Patterns (From Real Implementation)

### Pattern 1: "It Works for One Blade, Ship It!"
**What happens**: You get blade 1 working, immediately add 5 more, and blades 2-6 don't move.
**Why**: The constraints aren't propagating. You need to debug with 2 blades first.

### Pattern 2: "Each Blade Gets Its Own Angle"
**What happens**: You give each blade an independent angle constraint.
**Problem**: Now you need to update 6+ constraints to open/close instead of one parameter.

### Pattern 3: "I'll Calculate the Starting Positions"
**What happens**: You use [50, 86.6, 0] for 60° position.
**Problem**: When you change to 8 blades, nothing works because your "helpful" positions are now wrong.

### Pattern 4: "Add Everything, Then Test"
**What happens**: You add pivots, blades, inner points, all constraints, then test.
**Problem**: When it fails, you have no idea which part is broken.

### Pattern 5: "The Dummy Positions Matter"
**What happens**: You carefully place dummies at [1,0,0], [0,1,0], [-1,0,0].
**Problem**: You're still thinking in coordinates! Use [1,1,0] for everything.

## Common Mistakes and Why They Fail

### Mistake 1: Calculating Blade Positions
**Why it fails**: When you change N, all positions change. The pattern is 2π/N - let the solver find it!

### Mistake 2: Fixed Overlap Angles
**Why it fails**: Overlap depends on aperture opening. It must be derived, not specified.

### Mistake 3: Over-Constraining
**Why it fails**: Too many constraints make the system impossible. Trust the solver!

### Mistake 4: Using Cartesian Coordinates
**Why it fails**: This is a radial problem. Think in terms of angles and distances from center.

## Key Insights

1. **Rotational Symmetry is KEY** - One blade defined, others follow by symmetry
2. **Single Parameter Control** - One angle drives the entire mechanism
3. **Constraints Define Motion** - The aperture size emerges from blade angles
4. **No Hardcoded Positions** - Everything derives from center + constraints
5. **Parametric Design** - Change N, change blade_length, everything updates

## Advanced Challenges

Once the basic iris works:

1. **Add Overlap Constraints** - Ensure minimum overlap at all positions
2. **Add Aperture Shape Control** - Keep it circular vs polygonal
3. **Add Mechanical Limits** - Min/max aperture size
4. **Add Blade Curvature** - Curved blades for smoother aperture
5. **Multi-Stage Iris** - Two sets of blades for finer control

## Why This Beats Manual Calculation

Manual approach would require:
- Trigonometric equations for each blade
- Iterative solving for overlap conditions
- Recalculation for any parameter change
- No guarantee of finding valid configuration

Constraint solver:
- Describes relationships once
- Finds valid configurations automatically
- Updates everything when parameters change
- Guarantees geometric consistency

## Success Criteria

You've succeeded when:
- Changing the control angle smoothly opens/closes aperture
- Changing blade count regenerates entire mechanism
- No blade positions are hardcoded
- The solution uses rotational symmetry constraints
- You can animate by varying a single parameter

Remember: If you're calculating coordinates, you're doing it wrong. Describe relationships and let the solver find the positions!