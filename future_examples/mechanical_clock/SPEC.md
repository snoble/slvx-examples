# Mechanical Clock - Constraint Solver Example Spec

## Concept
A mechanical clock escapement mechanism with gears, pendulum, and hands. The gear ratios must maintain precise timing relationships, and the escapement geometry must allow proper energy transfer.

## What Makes This a Good Example

### 1. **Precise Mechanical Relationships**
- Gear ratios determine time accuracy
- Escapement geometry affects pendulum swing
- No decorative symmetry - purely functional

### 2. **Kinematic Constraints**
- Gear teeth must mesh properly
- Pendulum arc constrains escapement wheel
- Hands rotate at specific ratios (1:12:720)
- Power transfer through gear train

### 3. **Why You Can't Calculate This Manually**
- Changing pendulum length affects:
  - Beat rate
  - Escapement tooth spacing
  - Gear ratios throughout train
  - Overall clock accuracy
- Involute gear profiles require complex math
- Multiple gears must maintain precise center distances

### 4. **Parametric Value**
- Adjust pendulum length → beat rate changes
- Scale mechanism → all gears resize
- Change gear count → ratios recalculate
- Modify escapement angle → geometry updates

## Incremental Development Workflow

### Step 1: Pendulum
- Create pendulum rod and bob
- Set pivot point
- Define swing arc
- Test: Length changes affect period

### Step 2: Escapement Wheel
- Create escape wheel with teeth
- Position relative to pendulum
- Set tooth angle for proper impulse
- Test: Wheel follows pendulum pivot

### Step 3: Pallet Fork
- Add pallet connecting to pendulum
- Define pallet faces
- Ensure proper engagement angles
- Test: Pallets catch wheel teeth

### Step 4: First Gear Reduction
- Add pinion to escapement wheel
- Mesh with larger gear
- Set proper center distance
- Test: Gear ratio maintained

### Step 5: Minute Hand Gear
- Add 60:1 reduction from escapement
- Connect minute hand
- Maintain gear mesh throughout
- Test: One hour = 60 beats

### Step 6: Hour Hand Gear
- Add 12:1 reduction from minute
- Connect hour hand
- Ensure concentric shafts
- Test: Hands maintain ratio

## Key Constraints to Demonstrate

1. **Distance** - Gear center spacing
2. **Angle** - Escapement geometry
3. **Tangent** - Gear tooth meshing
4. **Coincident** - Concentric shafts
5. **Gear-ratio** - Timing relationships

## Parameters
```json
{
  "pendulum_length": 994,     // mm (1 second beat)
  "escape_teeth": 30,         // count
  "pallet_span": 7.5,         // teeth
  "drop_angle": 1.5,          // degrees
  "gear_module": 2,           // mm
  "shaft_spacing": 50         // mm
}
```

## Success Criteria
- Pendulum period matches desired beat
- Escapement provides steady impulse
- Gear train maintains exact ratios
- All gears mesh properly
- Mechanism is kinematically valid