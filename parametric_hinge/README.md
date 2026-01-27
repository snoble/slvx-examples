# Parametric Hinge Joint

A 3D-printable hinge joint with fully parametric dimensions. Change the parameters to create different sized hinges for your projects.

## Features Demonstrated

- **angle**: Controls the opening angle between hinge leaves
- **parallel**: Ensures leaf sides are parallel (rectangular leaves)
- **perpendicular**: Ensures 90° corners on each leaf
- **distance**: Controls all dimensions parametrically
- **diameter**: Defines the hinge pin circle
- **circle**: Represents the hinge pin hole

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| leaf_width | 30 | Width of each hinge leaf (mm) |
| leaf_length | 50 | Length of each hinge leaf (mm) |
| hinge_radius | 5 | Distance from hinge center to leaf edge (mm) |
| open_angle | 45 | Opening angle between leaves (degrees) |

## 3D Printing Notes

This 2D constraint model represents the top view of a hinge. To create a printable 3D model:

1. Extrude both leaves to desired thickness (e.g., 3mm)
2. Add the hinge barrel/knuckle around the pin circle
3. Consider adding screw holes at the leaf_hole points
4. Add fillets to stress concentration points

## Parametric Variations

Try these parameter combinations:

**Small box hinge:**
```json
"leaf_width": 15, "leaf_length": 25, "hinge_radius": 3
```

**Large door hinge:**
```json
"leaf_width": 50, "leaf_length": 100, "hinge_radius": 8
```

**90° bracket:**
```json
"open_angle": 90
```

## Use Cases

- Cabinet doors
- Box lids
- Project enclosures
- Articulated joints for robots/toys
- Foldable brackets
