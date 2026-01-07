# Whitworth Quick-Return Mechanism

Converts uniform rotary motion into non-uniform reciprocating motion where the return stroke is faster than the forward stroke. Used in shaping machines and planers.

## How It Works

1. Crank rotates uniformly around its center
2. Crank pin slides inside the rocker slot
3. Rocker oscillates about its pivot
4. Output slider moves along rail via vertical link

The asymmetric geometry means the crank travels more degrees during the cutting stroke than the return stroke.

## Parameters

- `crank_radius` - Radius of driving crank (25mm)
- `rocker_length` - Length of oscillating rocker (100mm)
- `crank_angle` - Input rotation angle (45 degrees)

## Key Constraints

- `fixed` - Crank center, rocker pivot, rail end
- `distance` - Crank radius, rocker length
- `angle` - Crank rotation
- `point_on_line` - Crank pin slides in rocker, slider on rail
- `perpendicular` - Output link perpendicular to rail

## References

- [Wikipedia: Quick return mechanism](https://en.wikipedia.org/wiki/Quick_return_mechanism)

## Usage

```bash
slvsx solve whitworth_quick_return/whitworth_quick_return.json
slvsx export -f svg whitworth_quick_return/whitworth_quick_return.json > whitworth.svg
```
