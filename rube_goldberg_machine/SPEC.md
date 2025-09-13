# Rube Goldberg Machine - Constraint Solver Example Spec

## Concept
A chain-reaction machine where a marble triggers various mechanisms. Components must align precisely for the marble path to work, with ramps, levers, and triggers positioned by constraints.

## What Makes This a Good Example

### 1. **Sequential Dependencies**
- Each component depends on the previous one
- Small changes cascade through the system
- No symmetry - each mechanism is unique

### 2. **Physics Constraints**
- Ramp angles for marble speed
- Lever ratios for mechanical advantage
- Drop heights for energy transfer
- Trigger distances for activation

### 3. **Why You Can't Calculate This Manually**
- Changing one ramp angle affects:
  - Exit velocity
  - Landing position
  - Next component placement
  - All downstream components
- Multiple constraint types interact
- Path continuity requires solving simultaneous equations

### 4. **Parametric Value**
- Adjust marble size → all clearances update
- Change table height → all components reposition
- Modify mechanism spacing → maintains connections
- Scale entire machine → preserves functionality

## Incremental Development Workflow

### Step 1: First Ramp
- Create inclined plane
- Set angle for marble roll
- Define start and end points
- Test: Angle changes maintain ramp length

### Step 2: First Drop
- Position catcher below ramp
- Calculate drop distance
- Ensure marble trajectory hits target
- Test: Moving ramp moves catcher

### Step 3: Lever Mechanism
- Add seesaw with pivot
- Position marble landing spot
- Other end triggers next component
- Test: Lever ratio maintained

### Step 4: Domino Section
- Line of falling pieces
- Equal spacing constraint
- First domino at lever end
- Test: Number of dominoes parametric

### Step 5: Pulley System
- Weight drops when triggered
- Pulls string to release next marble
- Pulley height constrains paths
- Test: Pulley ratio preserved

### Step 6: Grand Finale
- Bell or flag at end
- Must be reachable from last mechanism
- Celebration component
- Test: Always triggers regardless of scale

## Key Constraints to Demonstrate

1. **Angle** - Ramp inclines
2. **Distance** - Component spacing
3. **Coincident** - Path connections
4. **Tangent** - Smooth transitions
5. **Vertical/Horizontal** - Gravity alignment

## Parameters
```json
{
  "marble_radius": 10,       // mm
  "ramp_angle": 30,          // degrees
  "drop_height": 200,        // mm
  "domino_spacing": 30,      // mm
  "lever_ratio": 3,          // mechanical advantage
  "table_height": 1000       // mm
}
```

## Success Criteria
- Marble path is continuous
- Each mechanism triggers the next
- Changing parameters maintains functionality
- Energy transfer is plausible
- Can add/remove mechanisms modularly