# Prime Star Patterns

Radial star patterns with prime numbers of points (3, 5, 7, 11, 13), demonstrating how the solver positions spokes with equal angular spacing.

## What This Shows

Each file uses the same `equal_angles` constraint but with a different number of spokes:

| File | Points | Angle Between Spokes | Pattern Name |
|------|--------|---------------------|--------------|
| star_03 | 3 | 120° | Triangle |
| star_05 | 5 | 72° | Pentagram |
| star_07 | 7 | ~51.4° | Heptagram |
| star_11 | 11 | ~32.7° | Hendecagram |
| star_13 | 13 | ~27.7° | Tridecagram |

## Why Prime Numbers?

Prime point counts produce true star patterns:
- No rotational symmetry subdivisions
- Each point is unique in its position
- Connecting every other point creates stars without overlapping lines

For example, a 6-pointed star has 2-fold and 3-fold symmetry, but a 7-pointed star has no such subdivisions.

## How the Solver Works

For each pattern, the solver:
1. Fixes the center point at origin
2. Fixes the first spoke pointing right (positive X)
3. Uses `equal_angles` to space remaining spokes equally
4. Uses `distance` constraints to keep all spokes the same length (50mm)

The solver calculates the exact angle (360°/N) and positions each tip accordingly.

## Constraint Structure

```json
{
  "constraints": [
    {"type": "fixed", "entity": "center"},
    {"type": "fixed", "entity": "tip1"},
    {"type": "distance", "between": ["center", "tip2"], "value": "$spoke_length"},
    ...
    {"type": "equal_angles", "lines": ["spoke1", "spoke2", ...]}
  ]
}
```

## Files

```
star_03.json + star_03.svg  (3 points - triangle)
star_05.json + star_05.svg  (5 points - pentagram)
star_07.json + star_07.svg  (7 points - heptagram)
star_11.json + star_11.svg  (11 points)
star_13.json + star_13.svg  (13 points)
```

## Variations

Try changing the `spoke_length` parameter to scale the patterns, or add lines connecting the tips to form actual star outlines.
