# Floor Plan Layout - Constraint Solver Example Spec

## Concept
An adaptive apartment floor plan that automatically adjusts furniture placement based on room dimensions, maintaining ergonomic clearances and building codes.

## What Makes This a Good Example

### 1. **No Symmetry Required**
- Rooms are different sizes and shapes
- Furniture has varied dimensions
- Layout is functional, not decorative

### 2. **Real-World Constraints**
- Minimum walkway clearances (36" for main paths, 24" for secondary)
- Door swing clearances (no furniture blocking doors)
- Building codes (bathroom fixtures, kitchen triangle)
- Ergonomic distances (TV viewing, desk depth)

### 3. **Why You Can't Calculate This Manually**
- Changing room width affects:
  - Furniture positions
  - Walking paths
  - Which furniture fits
  - Optimal arrangements
- Multiple interdependent constraints create a system of equations
- Packing problem with clearance requirements

### 4. **Parametric Value**
- Change apartment from 400 to 800 sq ft
- Adjust room proportions
- Swap furniture sizes
- Everything re-arranges automatically

## Incremental Development Workflow

### Step 1: Basic Room Boundaries
- Create outer walls
- Add single door
- Test: Changing room dimensions

### Step 2: Add First Furniture (Bed)
- Place bed with clearance from walls
- Ensure walking space around it
- Test: Bed maintains clearance as room changes

### Step 3: Add Desk Against Window
- Align desk with window center
- Maintain distance from bed
- Test: Desk stays centered on window

### Step 4: Add Bathroom Fixtures
- Toilet with code clearances
- Sink with counter space
- Door swing clearance
- Test: All maintain minimum distances

### Step 5: Kitchen Work Triangle
- Place sink, stove, refrigerator
- Maintain ergonomic triangle distances
- Counter space between appliances
- Test: Triangle scales with kitchen size

### Step 6: Living Area
- Couch facing TV wall
- Coffee table with clearances
- Side tables aligned
- Test: Viewing distance maintained

## Key Constraints to Demonstrate

1. **Distance** - Minimum clearances
2. **Parallel** - Furniture against walls
3. **Perpendicular** - Corner arrangements
4. **Coincident** - Centering on features
5. **Point-on-line** - Alignment along walls

## Parameters
```json
{
  "room_width": 20,        // ft
  "room_depth": 25,        // ft
  "min_clearance": 3,      // ft
  "door_width": 3,         // ft
  "bed_width": 5,          // ft
  "bed_length": 6.5,       // ft
  "viewing_distance": 8    // ft
}
```

## Success Criteria
- Room can scale from 400-800 sq ft
- All furniture maintains legal clearances
- Walking paths remain clear
- Ergonomic relationships preserved
- No manual coordinate calculations needed