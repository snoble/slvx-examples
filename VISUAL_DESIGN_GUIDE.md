# Visual Design Guide for SLVSX Examples

## THE GOLDEN RULE
**Always export to SVG and visually inspect at every step.** If it doesn't look impressive, it isn't.

## What Makes a "Wow" Example

### 1. Visual Recognition Over Abstract Math
❌ **BAD**: Lines connecting points with no clear meaning
```json
{"type": "line", "p1": "p1", "p2": "p2"}  // What is this?
```

✅ **GOOD**: Recognizable shapes using multiple points
```json
// Octagonal approximation of a circle
{"type": "point", "id": "circle_p1", "at": [36, 45, 0]},
{"type": "point", "id": "circle_p2", "at": [34.24, 49.24, 0]},
{"type": "point", "id": "circle_p3", "at": [30, 51, 0]},
// ... 5 more points forming octagon
```

### 2. Components That Look Like What They Are

#### Creating a Marble/Ball
Don't use a single point. Create an octagonal outline:
- 8 points around the center
- Connected with lines to form visible ball shape
- Constrained by distance from center

#### Creating a Gear/Pulley
Don't use abstract circles. Create visible teeth/spokes:
- Octagonal or hexagonal outline
- Visible connection points
- Clear mechanical purpose

#### Creating Containers (Buckets, Boxes)
Always include all sides:
- Left wall, right wall, bottom (and top if needed)
- Use vertical/horizontal constraints for alignment
- Make them look like actual containers

### 3. Coordinate System Best Practices

#### Always Start Small
- Keep initial coordinates between -100 and 100
- Use origin (0,0) as reference center
- Distribute design around origin, not offset from it

#### Test ViewBox Early
```bash
./slvsx export -f svg example.json > example.svg
head -1 example.svg  # Check viewBox dimensions
```
- If viewBox width or height > 500, reconsider scale
- If most space is empty, fix coordinate system

### 4. Building Complex Patterns

#### Islamic Star Example Success
Why it works:
- 192 points creating intricate pattern
- Coincident constraints create precise intersections
- Parameters control entire design
- Visually stunning result that's clearly complex

#### Key Principles:
1. Start with simple base shape
2. Add layers of complexity
3. Use coincident constraints for intersections
4. Ensure rotational/reflective symmetry where appropriate

## Step-by-Step Process

### 1. Initial Design
```bash
# Create simple version first
echo '{"entities": [...], "constraints": [...]}' > step1.json
./slvsx solve step1.json
./slvsx export -f svg step1.json > step1.svg
# LOOK AT THE SVG! Does it look good?
```

### 2. Incremental Enhancement
- Add visual details progressively
- Test SVG after EVERY addition
- If something looks wrong, fix it immediately

### 3. Visual Testing Checklist
- [ ] Can you tell what each component is?
- [ ] Are shapes recognizable without labels?
- [ ] Does the overall composition look impressive?
- [ ] Would someone say "wow, how did AI calculate that?"

## Common Mistakes to Avoid

### 1. The "Abstract Line Soup"
**Problem**: Creating technically correct but visually meaningless designs
**Solution**: Every line should have clear visual purpose

### 2. The "Giant Coordinate" Error
**Problem**: Using coordinates like Y=1000, creating tiny squished visualizations
**Solution**: Keep coordinates human-scale (typically under 200)

### 3. The "Single Point" Mistake
**Problem**: Representing objects as single points
**Solution**: Use multiple points to create recognizable outlines

### 4. The "Missing Visual Test"
**Problem**: Only checking if constraints solve, not how they look
**Solution**: Export and view SVG after every change

## Examples of Good Visual Design

### Rube Goldberg Machine Components
```json
// Marble - 8 points forming octagon
"marble_p1" through "marble_p8" with lines connecting them

// Bucket - 4 corners with walls
"bucket_top_left", "bucket_top_right", 
"bucket_bottom_left", "bucket_bottom_right"
Plus lines for left, right, and bottom walls

// Lever - Rectangle with visible thickness
"lever_left_top", "lever_left_bottom",
"lever_right_top", "lever_right_bottom"
Plus triangular pivot support
```

### Islamic Star Pattern
```json
// Multiple layers at different radii
"inner_radius": 38, "outer_radius": 100

// Intersection points calculated by solver
Coincident constraints ensure precise meetings

// Result: Intricate pattern from simple parameters
```

## Testing Your Design

### Quick Visual Test
```bash
# After creating/modifying any JSON file:
./slvsx solve mydesign.json && \
./slvsx export -f svg mydesign.json > mydesign.svg && \
echo "Check mydesign.svg - does it look impressive?"
```

### The "Show Your Friend" Test
Show the SVG to someone unfamiliar with the project:
- Can they identify what it is?
- Do they find it visually interesting?
- Would they believe it was calculated, not drawn?

## Parameter Guidelines

### Good Parameters
```json
{
  "marble_radius": 6,      // Human-scale
  "ramp_angle": 25,        // Reasonable angle
  "bucket_width": 25,      // Proportional sizes
  "lever_length": 80       // Everything under 200
}
```

### Bad Parameters
```json
{
  "table_height": 1000,    // WAY too large
  "tiny_detail": 0.001,    // Too small to see
  "random_offset": 847     // Arbitrary large number
}
```

## Final Checklist

Before committing any example:
- [ ] Exported to SVG and visually inspected
- [ ] All components are recognizable
- [ ] Coordinate system is reasonable (viewBox < 500x500)
- [ ] Someone would say "wow" when seeing it
- [ ] Parameters are human-scale and sensible
- [ ] Tested incremental builds visually
- [ ] No abstract "line soup"
- [ ] Clear visual purpose for every element

## Remember
**The constraint solver's power should be VISIBLE in the output.** If viewers can't see the complexity and precision, the example fails its purpose.