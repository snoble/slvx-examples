# Scotch Yoke Mechanism

Converts rotary motion to pure sinusoidal linear motion. Unlike the crank-slider, produces exact simple harmonic motion.

## How It Works

1. Crank pin rotates in a circle
2. Pin slides in vertical slot of yoke
3. Yoke moves horizontally with crank's X-position

## Parameters

- `crank_radius` - Radius of rotation (30mm)
- `slot_length` - Length of vertical slot (50mm)
- `crank_angle` - Input rotation angle (32 degrees)

## Key Constraints

- `fixed` - Center and rail endpoints
- `distance` - Crank radius
- `angle` - Crank rotation
- `point_on_line` - Pin in slot, yoke on rail
- `perpendicular` - Slot perpendicular to rail

## Applications

- Reciprocating compressors
- High-speed engines
- Precision linear actuators

## References

- [Wikipedia: Scotch yoke](https://en.wikipedia.org/wiki/Scotch_yoke)

## Usage

```bash
slvsx solve scotch_yoke/scotch_yoke.json
slvsx export -f svg scotch_yoke/scotch_yoke.json > scotch_yoke.svg
```
