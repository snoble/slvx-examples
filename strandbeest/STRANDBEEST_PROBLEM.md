# Strandbeest Walking Mechanism - The Ultimate Constraint Challenge

## The Problem

Recreate Theo Jansen's Strandbeest leg mechanism that:
- Converts circular rotation into a walking gait
- Maintains ground clearance during swing phase
- Has a flat foot trajectory during ground contact
- Uses exactly 11 bars with specific length ratios
- Creates a figure-8 foot path from single rotation input

## Why This is the ULTIMATE Test for Constraint Solvers

### The Magic is in the Ratios
Jansen spent years evolving these specific bar lengths:
- a = 38, b = 41.5, c = 39.3, d = 40.1, e = 55.8
- f = 39.4, g = 36.7, h = 65.7, i = 49, j = 50, k = 61.9

Small changes create drastically different gaits. The solver must maintain these relationships while finding the complex foot path.

### Manual Calculation is Practically Impossible
- 11 bars create multiple coupled four-bar linkages
- Forward kinematics requires solving multiple nonlinear equations simultaneously
- The foot path emerges from the constraints - it can't be predetermined
- Each position requires iterative numerical solving

## WHY YOU CANNOT CHEAT

### If You Hardcode Joint Positions...
```json
// ❌ CATASTROPHIC FAILURE
{"type": "point", "id": "knee", "at": [45.2, 67.8, 0]}  // "Calculated" position
```
**What happens**: The mechanism jams! Each joint position depends on ALL the bar constraints. One wrong position breaks the entire linkage.

### If You Try to Precompute the Foot Path...
```json
// ❌ COMPLETELY WRONG
{"type": "point", "id": "foot_position_1", "at": [100, -50, 0]},
{"type": "point", "id": "foot_position_2", "at": [95, -48, 0]}
```
**What happens**: The path is the OUTPUT, not an input! It emerges from the mechanism's constraints.

### If You Fix Multiple Points...
```json
// ❌ MECHANISM LOCKS UP
{"type": "fixed", "entity": "hip"},
{"type": "fixed", "entity": "shoulder"}
```
**What happens**: Linkages must move! Fixing joints prevents motion.

## The Strandbeest Bar System

```
        Crank (m)
          /
       Hip O----Upper Thigh----Knee
         |                      |
    Spine|                 Shin |
         |                      |
      Base----Lower Thigh----Ankle
                                |
                              Foot
```

The magic: One rotating crank drives the entire leg through these coupled linkages.

## CRITICAL PRINCIPLES - VIOLATE AND FAIL

1. **Fix ONLY the base and crank center** - Everything else must move
2. **Use distance constraints for bars** - These are rigid links
3. **Let joint positions emerge** - Don't calculate them
4. **The foot path is discovered, not defined** - It's the output
5. **Use dummy coordinates** - [0,0,0], [1,1,0], etc.

## Step-by-Step Construction

### Step 1: Create the Fixed Base
```json
{
  "entities": [
    {
      "type": "point",
      "id": "base",
      "at": [0, 0, 0]
    },
    {
      "type": "point",
      "id": "crank_center",
      "at": [1, 0, 0]  // Dummy position
    }
  ],
  "constraints": [
    {
      "type": "fixed",
      "entity": "base"
    },
    {
      "type": "distance",
      "between": ["base", "crank_center"],
      "value": 38  // Jansen's 'a' dimension
    },
    {
      "type": "horizontal",
      "a": "base_to_crank"  // Keep mechanism upright
    }
  ]
}
```

### Step 2: Add the Rotating Crank
```json
// Add to entities:
{
  "type": "point",
  "id": "crank_pin",
  "at": [1, 1, 0]  // Dummy - will rotate
},
{
  "type": "line",
  "id": "crank",
  "p1": "crank_center",
  "p2": "crank_pin"
}

// Add constraints:
{
  "type": "distance",
  "between": ["crank_center", "crank_pin"],
  "value": 15  // Crank radius
},
{
  "type": "angle",
  "between": ["horizontal_ref", "crank"],
  "value": 0  // Start angle - ANIMATE THIS!
}
```

### Step 3: Add the Hip Joint
```json
// Add:
{
  "type": "point",
  "id": "hip",
  "at": [0, 1, 0]  // Dummy position
}

// Constraints:
{
  "type": "distance",
  "between": ["base", "hip"],
  "value": 41.5  // Jansen's 'b' - spine length
},
{
  "type": "distance",
  "between": ["crank_pin", "hip"],
  "value": 39.3  // Jansen's 'c' - drive rod
}
```

### Step 4: Add Upper Thigh to Knee
```json
{
  "type": "point",
  "id": "knee",
  "at": [1, 1, 0]  // Dummy
}

// Critical constraints:
{
  "type": "distance",
  "between": ["hip", "knee"],
  "value": 40.1  // Jansen's 'd' - upper thigh
}
```

### Step 5: Add Lower Thigh Triangle
```json
{
  "type": "point",
  "id": "lower_pivot",
  "at": [1, 0, 0]  // Dummy
}

// The triangle that creates stability:
{
  "type": "distance",
  "between": ["base", "lower_pivot"],
  "value": 55.8  // Jansen's 'e'
},
{
  "type": "distance",
  "between": ["lower_pivot", "knee"],
  "value": 39.4  // Jansen's 'f'
}
```

### Step 6: Add Ankle and Shin
```json
{
  "type": "point",
  "id": "ankle",
  "at": [2, 0, 0]  // Dummy
}

{
  "type": "distance",
  "between": ["knee", "ankle"],
  "value": 36.7  // Jansen's 'g' - shin
},
{
  "type": "distance",
  "between": ["lower_pivot", "ankle"],
  "value": 65.7  // Jansen's 'h' - lower thigh
}
```

### Step 7: Add the Foot
```json
{
  "type": "point",
  "id": "foot",
  "at": [2, -1, 0]  // Dummy
}

{
  "type": "distance",
  "between": ["ankle", "foot"],
  "value": 49  // Jansen's 'i' - foot connector
},
{
  "type": "distance",
  "between": ["knee", "foot"],
  "value": 50  // Jansen's 'j' - toe control
},
{
  "type": "distance",
  "between": ["lower_pivot", "foot"],
  "value": 61.9  // Jansen's 'k' - heel control
}
```

## The Magic Moment - Animation

Change the crank angle from 0° to 360° in small steps:
- The foot will trace a figure-8 path
- Flat section when touching ground (stance phase)
- High clearance during swing phase
- All from rotating one input!

## Testing Your Implementation

### Test 1: Full Rotation
```python
for angle in range(0, 360, 10):
    # Set crank angle constraint to 'angle'
    # Solve
    # Record foot position
    # Plot the path
```
**Success**: Figure-8 path with flat bottom section

### Test 2: Change Bar Length
- Modify just ONE bar length (e.g., shin from 36.7 to 40)
- Re-solve for full rotation
**Result**: Completely different gait! Shows sensitivity to ratios

### Test 3: Multiple Legs
- Add constraints for legs at 120° phase offset
- All driven by same crank
**Result**: Tripod gait emerges naturally

## Common Failures and Why

### Failure 1: "I'll calculate the knee position"
**Why it fails**: Knee position depends on FOUR different bar constraints simultaneously. Your calculation will be wrong.

### Failure 2: "I'll define the foot path"
**Why it fails**: The path EMERGES from the mechanism. It's not an input!

### Failure 3: "I'll use approximate bar lengths"
**Why it fails**: The magic is in the exact ratios. Change them and you get a limping beast, not a smooth walker.

### Failure 4: "I'll add extra constraints for stability"
**Why it fails**: Over-constraining prevents motion. Trust the mechanism!

## Advanced Challenges

1. **Add Phase-Shifted Legs** - Create 6 or 8 leg versions
2. **Add Steering** - Vary leg phases for turning
3. **Add Terrain Following** - Adjust foot height constraints
4. **Optimize Bar Ratios** - Evolve new gaits
5. **Add Body Dynamics** - Include center of mass constraints

## The Deeper Lesson

This mechanism teaches the fundamental principle of constraint solvers:

**Complex behavior emerges from simple relationships**

You don't program the walking motion. You define the bar lengths and one rotation. The walking emerges.

## Success Metrics

You've succeeded when:
1. Foot traces a figure-8 from crank rotation alone
2. Changing any bar length dramatically alters the gait  
3. NO joint positions are hardcoded
4. The solution finds configurations that would be impossible to calculate
5. You can animate by varying just the crank angle

## Final Warning

If you find yourself:
- Calculating trigonometry
- Plotting the foot path in advance
- Fixing joint positions
- Using anything other than distance constraints for bars

**STOP!** You're defeating the entire purpose. The solver's job is to find the positions that satisfy your bar lengths. Your job is just to specify those lengths.

The Strandbeest walks because of the relationships between its parts, not because of where those parts are located. Let the solver discover the magic!