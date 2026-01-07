# Pantograph

A mechanical linkage that copies and scales drawings. The tracer follows an original while the pen draws an enlarged or reduced copy.

## How It Works

Four equal-length links form a rhombus (parallelogram with equal sides). The key property: pivot, joint_b, and pen are always collinear. This collinearity, combined with the rhombus geometry, ensures the pen traces a scaled version of the tracer's path.

## Parameters

- `link_length` - Length of each rhombus side (40mm)
- `arm_angle` - Angle of the input arm (45 degrees)
- `pen_extension` - Distance from joint_b to pen (80mm)

## Scaling Ratio

The scale factor is determined by the ratio of distances along the output line:
- Scale = (pivot to pen) / (pivot to tracer)

## Key Constraints

- `fixed` - Pivot point and reference
- `distance` - Four equal rhombus sides, pen extension
- `angle` - Arm angle (parametric input)
- `point_on_line` - joint_b lies on pivot-to-pen line (collinearity)

## Applications

- Enlarging or reducing drawings
- Engraving machines
- Copying signatures

## References

- [Wikipedia: Pantograph](https://en.wikipedia.org/wiki/Pantograph)

## Usage

```bash
slvsx solve pantograph/pantograph.json
slvsx export -f svg pantograph/pantograph.json > pantograph.svg
```
