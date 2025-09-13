# PCB Layout - Constraint Solver Example Spec

## Concept
A printed circuit board layout where component placement follows electrical and thermal constraints. Components must maintain clearances, traces must route efficiently, and heat-generating parts need proper spacing.

## What Makes This a Good Example

### 1. **Graph-like Connectivity**
- Components connected by traces, not symmetric patterns
- Each connection is unique
- No rotational or mirror symmetry

### 2. **Multiple Constraint Types**
- Electrical: Trace lengths for signal timing
- Thermal: Spacing between heat sources
- Mechanical: Component clearances
- Manufacturing: Minimum trace widths and via spacing

### 3. **Why You Can't Calculate This Manually**
- Moving one component affects:
  - All connected trace routes
  - Thermal zones of nearby components
  - EMI shielding requirements
  - Overall board area
- Trace routing is NP-hard problem
- Multiple competing constraints must balance

### 4. **Parametric Value**
- Change board size → components rearrange
- Swap component packages → clearances update
- Modify thermal limits → spacing adjusts
- Add components → routing reflows

## Incremental Development Workflow

### Step 1: Board Outline
- Create rectangular PCB boundary
- Define mounting holes at corners
- Test: Board size changes, holes stay at corners

### Step 2: Power Components
- Place voltage regulator with heat zone
- Position power connector at edge
- Connect with wide trace
- Test: Moving connector moves trace

### Step 3: Microcontroller
- Center MCU on board
- Maintain clearance from power section
- Add decoupling capacitors nearby
- Test: MCU stays centered as board changes

### Step 4: Signal Routing
- Add connectors at edges
- Route signals from MCU
- Maintain trace spacing
- Test: Traces avoid obstacles

### Step 5: Crystal Oscillator
- Place near MCU with short traces
- Equal length differential pairs
- Ground plane clearance
- Test: Crystal follows MCU movement

### Step 6: LED Indicators
- Line up LEDs at board edge
- Equal spacing constraint
- Current limiting resistors inline
- Test: Number of LEDs parametric

## Key Constraints to Demonstrate

1. **Distance** - Component clearances
2. **Point-on-line** - Edge connectors
3. **Parallel** - Differential pairs
4. **Equal-length** - Timing-critical traces
5. **Coincident** - Trace connections

## Parameters
```json
{
  "board_width": 100,        // mm
  "board_height": 80,        // mm
  "min_clearance": 0.5,      // mm
  "trace_width": 0.25,       // mm
  "thermal_spacing": 5,      // mm
  "mounting_hole_inset": 3   // mm
}
```

## Success Criteria
- Components maintain electrical clearances
- Traces connect without crossing
- Thermal zones don't overlap
- Manufacturing rules satisfied
- Board area minimized automatically