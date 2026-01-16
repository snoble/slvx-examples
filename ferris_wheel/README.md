# Ferris Wheel

A six-cabin ferris wheel with evenly spaced spokes and a support structure.

![Ferris Wheel](ferris_wheel.svg)

## How It Works

The ferris wheel demonstrates radial symmetry using angular constraints. Six spokes radiate from a central hub, each separated by exactly 60 degrees. Cabins are attached at the end of each spoke, all constrained to lie on the wheel rim circle.

## Key Constraints Used

- **point_on_circle**: Constrains all 6 spoke endpoints to lie on the wheel rim
- **diameter**: Sets the wheel rim diameter parametrically
- **angle**: Controls the rotation position and ensures 60° spacing between spokes
- **fixed**: Anchors the hub and support structure

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `wheel_diameter` | 100 mm | Diameter of the wheel rim |
| `cabin_size` | 15 mm | Diameter of each passenger cabin |
| `rotation_angle` | 30° | Current rotation angle of the wheel |

## Animation

Change `rotation_angle` from 0° to 360° to animate the wheel spinning:
- The entire wheel rotates as a unit
- All cabins maintain their positions on the rim
- The support structure remains fixed

## Features Demonstrated

1. **Radial symmetry**: 6 spokes at equal 60° angles
2. **point_on_circle**: All cabin positions constrained to the rim
3. **diameter constraint**: Parametric wheel size
4. **Hierarchical constraints**: Angles between adjacent spokes

## Applications

- Amusement park rides
- Observation wheels
- Rotating display stands
- Water wheels
