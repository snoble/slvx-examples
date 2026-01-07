# Peaucellier-Lipkin Linkage

The first planar linkage capable of converting rotary motion into perfect straight-line motion. Invented in 1864 by Charles-Nicolas Peaucellier.

## How It Works

Uses a rhombus of four equal links (the "kite") connected to two equal long links from a fixed pivot. The mathematical principle is circle inversion - the output point D traces a perfect straight line as input point B traces a circle.

## Parameters

- `long_link` - Length of OA and OC links (80mm)
- `short_link` - Length of rhombus sides (45mm)
- `input_angle` - Rotation of input arm (45 degrees)

## Key Constraints

- `fixed` - Origin O and auxiliary pivot P
- `distance` - Link lengths
- `angle` - Input arm rotation
- `equal_length` - Rhombus sides must be equal

## Historical Significance

Before this invention, James Watt and others created approximate straight-line mechanisms, but Peaucellier's was the first mathematically exact solution.

## References

- [Wikipedia: Peaucellier-Lipkin linkage](https://en.wikipedia.org/wiki/Peaucellier%E2%80%93Lipkin_linkage)
- [AMS: How to Draw a Straight Line](https://www.ams.org/publicoutreach/feature-column/fcarc-linkages1)

## Usage

```bash
slvsx solve peaucellier_linkage/peaucellier_linkage.json
slvsx export -f svg peaucellier_linkage/peaucellier_linkage.json > peaucellier.svg
```
