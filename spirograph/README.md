# Spirograph Pattern

A constraint-based spirograph mechanism with rolling circles.

## Features
- Outer circle (radius 100)
- Inner rolling circle (radius 30)
- 8-pointed star pattern from traced points
- Equal-length constraints for regular pattern

## Constraints Used
- `fixed` - Center point
- `distance` - Circle radii and point positions
- `equal_length` - Uniform line segments
- `horizontal` - Ground alignment

## Mechanism
Simulates a spirograph drawing tool where a smaller circle rolls inside a larger circle, with a pen point tracing the resulting pattern.