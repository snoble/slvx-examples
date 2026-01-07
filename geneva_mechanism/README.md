# Geneva Mechanism (Maltese Cross)

Converts continuous rotary motion into intermittent rotary motion. Each rotation of the driver advances the Geneva wheel by one slot position.

## How It Works

1. Driver wheel rotates continuously with a pin
2. Pin enters one of four slots on the Geneva cross
3. Geneva wheel rotates exactly 90 degrees
4. Pin exits, Geneva wheel locks until next engagement

## Parameters

- `driver_radius` - Distance from driver center to pin (40mm)
- `driver_angle` - Input rotation angle (30 degrees)
- `center_distance` - Distance between wheel centers (70mm)
- `slot_length` - Length of each slot (50mm)

## Key Constraints

- `fixed` - Both wheel centers
- `distance` - Pin orbit radius, slot lengths
- `angle` - Driver rotation
- `perpendicular` - Slots are 90 degrees apart
- `point_on_line` - Pin engages current slot

## Applications

- Film projectors (advancing film frames)
- Watch mechanisms
- Indexing tables in manufacturing

## References

- [Wikipedia: Geneva drive](https://en.wikipedia.org/wiki/Geneva_drive)

## Usage

```bash
slvsx solve geneva_mechanism/geneva_mechanism.json
slvsx export -f svg geneva_mechanism/geneva_mechanism.json > geneva.svg
```
