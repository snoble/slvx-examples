# Debugging Lessons: Rube Goldberg Machine SVG Visualization

## The Problem
The initial Rube Goldberg machine SVG output looked terrible - the visualization was squished and unusable despite the constraint solver working correctly.

## Root Cause Analysis

### What Went Wrong
1. **Absurd Coordinate System**: Used `table_height = 1000` which placed all geometry at Y coordinates between 800-1200
2. **Huge Empty Space**: The origin was at (0,0) but all action happened 1000+ units away
3. **Poor ViewBox**: SVG viewBox had to span from -20 to 1240 in Y axis, making the actual machine tiny in the visualization

### The Actual Bug
This was NOT a bug in the SLVSX tool - it was a design mistake in choosing coordinate values. The solver worked perfectly; the visualization was just poorly scaled.

## How to Avoid This Problem

### 1. Start with Reasonable Coordinates
✅ **DO**: Center your design around the origin
```json
"ramp_height": 80,    // Good - human-scale
"lever_height": -20   // Good - uses negative space
```

❌ **DON'T**: Use arbitrary large offsets
```json
"table_height": 1000,  // Bad - creates huge offset
"ramp_start_height": 200  // Bad - compounds the problem
```

### 2. Test Incrementally with Visualization
- After EACH incremental step, export to SVG and check the viewBox
- Look for warning signs:
  - ViewBox height or width > 500 units
  - Most coordinates in the hundreds or thousands
  - Large empty spaces in the visualization

### 3. Use Relative Positioning
Instead of:
```json
"at": [0, "$table_height + $ramp_start_height", 0]  // Results in Y=1200
```

Use:
```json
"at": [0, "$ramp_height", 0]  // Results in Y=80
```

### 4. Check Coordinate Ranges Early
Before building complex mechanisms, solve a simple version and check:
```bash
slvsx solve simple.json | jq '.entities | to_entries[] | .value.at'
```
If you see coordinates > 200, reconsider your scale.

## The Fix Applied

### Before (Bad)
- Y coordinates: 0 to 1200
- ViewBox: -20 to 1240 (height of 1260!)
- Everything squished into top 15% of view

### After (Good)
- Y coordinates: -67 to 80
- ViewBox: -87 to 187 (height of 274)
- Well-distributed use of space

## Key Takeaways

1. **Coordinate System Matters**: Even if constraints solve correctly, poor coordinate choices ruin visualization
2. **Test Visualization Early**: Don't wait until the complete system to check SVG output
3. **Use Human-Scale Values**: Think in terms of millimeters/centimeters, not arbitrary large numbers
4. **Center Around Origin**: Distribute your design around (0,0) rather than offsetting everything
5. **Incremental Testing Includes Visual Check**: Each incremental step should be visually verified, not just mathematically solved

## Prevention Checklist
- [ ] Are my base coordinates < 100 units from origin?
- [ ] Does my design use both positive and negative space?
- [ ] Is my viewBox aspect ratio reasonable (close to 1:1)?
- [ ] Do I test SVG output at each incremental step?
- [ ] Are my parameter values in sensible ranges?

## What I Should Have Done
1. Started with a simple 2-point line and verified SVG output
2. Used coordinates in the -100 to 100 range
3. Exported and visually checked after EVERY incremental addition
4. Immediately noticed when viewBox became unreasonable
5. Fixed coordinate system before adding complexity

This wasn't a tool bug - it was a design error that proper incremental testing would have caught immediately.