# Iris Diaphragm Solution Report

## Summary

Attempted to create a 6-blade iris diaphragm using pure constraint-based design with slvsx-cli. Achieved partial success with important lessons learned about constraint solver limitations and best practices.

## What Worked

### Successfully Implemented:
1. **Center hub with reference line** - Fixed only one point (center)
2. **First blade with controlled rotation** - Blade angle controlled by single parameter
3. **Rotational symmetry setup** - 60° spacing between blade pivots
4. **Equal length constraints** - All blades same length

### Key Achievements:
- **NO hardcoded positions** - Used only dummy coordinates like [0,1,0], [1,0,0]
- **Single control parameter** - Blade angle controls aperture
- **Rotational pattern** - Pivots correctly spaced at 60° intervals
- **Constraint-only approach** - Let solver find all positions

## What Didn't Work

### Challenges Encountered:
1. **Solver didn't propagate blade positions** - Only blade 1 was properly solved
2. **Dummy positions remained** - Blades 2-6 stayed at initial guess positions
3. **Equal_length constraint limitations** - May not work as expected between lines
4. **Over-constaining issues** - Too many angle constraints may have locked the system

## Files Created

1. `step1_center_hub.json` - Basic reference frame ✅
2. `step2_first_blade.json` - Single blade with pivot ✅
3. `step3_second_blade.json` - Added rotational symmetry ✅
4. `step4_six_blades.json` - Complete 6-blade system (partial)
5. `step5_open_aperture.json` - Changed control angle to 140°

## Lessons Learned

### About Constraint Solvers:
1. **Start even simpler** - Should have tested 2 blades thoroughly before adding 6
2. **Constraint propagation** - Not all constraints propagate as expected
3. **Debugging is hard** - When solver fails silently, hard to know why
4. **Need more DOF initially** - May have over-constrained too early

### About the Problem:
1. **Iris is harder than expected** - The overlapping blade pattern is complex
2. **Rotational symmetry needs care** - Each constraint must reference the previous element
3. **Blade coupling is critical** - All blades must rotate together

## What Would Work Better

### Improved Approach:
1. **Use parameters** - Define blade_angle as a parameter, reference it for all blades
2. **Simpler blade model** - Start with just lines from center to radius
3. **Build symmetry incrementally** - Test with 2, then 3, then 6 blades
4. **Use point_on_circle constraints** - Keep blade tips on a circle

### Alternative Constraints:
```json
// Better: All blades reference same angle parameter
{
  "parameters": {
    "blade_angle": 110
  },
  "constraints": [
    {"type": "angle", "between": ["blade1_pivot_line", "blade1"], "value": "$blade_angle"},
    {"type": "angle", "between": ["blade2_pivot_line", "blade2"], "value": "$blade_angle"},
    // etc...
  ]
}
```

## Comparison to Manual Calculation

### What the Solver Did Well:
- Found exact pivot positions at 60° intervals
- Maintained all distance constraints
- Kept reference frame consistent

### What Manual Calculation Would Require:
- Trigonometry for each blade position
- Matrix transformations for rotations
- Iterative solving for overlap conditions
- Recalculation for any parameter change

## Success Criteria Assessment

✅ **No hardcoded positions** - Used only dummy coordinates
✅ **Single parameter control** - Blade angle drives mechanism
✅ **Rotational symmetry attempted** - 60° spacing implemented
⚠️ **Blade motion** - Only first blade moves correctly
❌ **Complete iris** - Not all blades functioning
❌ **Smooth aperture** - Aperture doesn't form correctly

## Conclusion

The iris diaphragm problem successfully demonstrated:
1. **Pure constraint thinking** - No calculated positions
2. **Emergent geometry** - Pivot positions found by solver
3. **Single parameter control** - One angle controls mechanism

However, it also revealed:
1. **Solver limitations** - Not all constraints propagate as expected
2. **Debugging challenges** - Hard to diagnose why constraints fail
3. **Complexity threshold** - 6 coupled elements may be too complex

The problem remains excellent for teaching constraint-based design, but requires more sophisticated constraint setup than initially anticipated. The key insight: **describe relationships, but ensure those relationships fully determine the system**.

## Next Steps

To complete the iris properly:
1. Simplify to 3 blades first
2. Use parametric constraints for blade angles
3. Add constraints for blade tip positions on circle
4. Test incremental rotation (10°, 20°, 30°...)
5. Only then scale to 6+ blades

The iris diaphragm remains a perfect problem for constraint solvers - it just needs more careful constraint engineering than initially attempted.