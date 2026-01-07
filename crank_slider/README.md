# Crank-Slider Mechanism

Converts rotary motion to reciprocating linear motion. The fundamental mechanism in piston engines, pumps, and compressors.

## How It Works

1. Crank rotates around fixed center
2. Connecting rod links crank pin to piston
3. Piston slides along rail (constrained to line)

## Parameters

- `crank_radius` - Radius of the rotating crank (25mm)
- `conrod_length` - Length of connecting rod (80mm)
- `crank_angle` - Input rotation angle (32 degrees)

## Key Constraints

- `fixed` - Crank center and rail endpoints
- `distance` - Crank radius and connecting rod length
- `angle` - Crank rotation
- `point_on_line` - Piston constrained to rail

## References

- [Wikipedia: Slider-crank linkage](https://en.wikipedia.org/wiki/Slider-crank_linkage)

## Usage

```bash
slvsx solve crank_slider/crank_slider.json
slvsx export -f svg crank_slider/crank_slider.json > crank_slider.svg
```
