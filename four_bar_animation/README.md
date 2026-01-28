# Four-Bar Linkage Animation

A four-bar linkage shown at 6 different crank angles, demonstrating how the solver calculates unique coupler and rocker positions for each input angle.

## What This Shows

Each file has identical link lengths but a different `crank_angle` parameter:

| File | Crank Angle | What the solver calculates |
|------|-------------|---------------------------|
| angle_000 | 0° | Crank horizontal right, mechanism at rest position |
| angle_060 | 60° | Crank rotated 60°, coupler and rocker adjust |
| angle_120 | 120° | Crank in upper-left quadrant |
| angle_180 | 180° | Crank horizontal left, maximum extension |
| angle_240 | 240° | Crank in lower-left quadrant |
| angle_300 | 300° | Crank in lower-right quadrant |

## Geometric Closure

At each angle, the solver must find where the coupler and rocker endpoints go such that:
- Crank end is exactly 30mm from ground_left at the specified angle
- Coupler is exactly 70mm long
- Rocker is exactly 60mm long and connects to ground_right

This is a **genuine constraint satisfaction problem** - there's only one valid position for each configuration.

## Parameters

All variants share:
- `crank_length`: 30mm
- `coupler_length`: 70mm
- `rocker_length`: 60mm
- `ground_length`: 100mm

Only `crank_angle` changes between files.

## Files

```
angle_000.json + angle_000.svg  (0°)
angle_060.json + angle_060.svg  (60°)
angle_120.json + angle_120.svg  (120°)
angle_180.json + angle_180.svg  (180°)
angle_240.json + angle_240.svg  (240°)
angle_300.json + angle_300.svg  (300°)
```

## Viewing as Animation

To see these as a flipbook animation, open the SVGs in sequence. The crank rotates smoothly while the coupler and rocker follow the constraints.
