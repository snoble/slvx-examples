# Tangent Arc Chain

Demonstrates the `tangent` constraint between an arc and a line, creating a smooth transition.

![Tangent Arc Chain](tangent_arc_chain.svg)

## How It Works

The `tangent` constraint ensures that where the arc meets the line, they share the same direction (slope). This creates a smooth, continuous path without any kinks or corners.

## Key Constraints Used

- **arc**: Defines a circular arc with center, start, and end points
- **tangent**: Ensures smooth transition between arc and line
- **distance**: Controls the arc radius
- **fixed**: Anchors reference points

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `arc_radius` | 30 mm | Radius of the arc |

## Entity: arc

The `arc` entity defines a circular arc:

```json
{
  "type": "arc",
  "id": "quarter_arc",
  "center": "center",
  "start": "start",
  "end": "end",
  "normal": [0, 0, 1]
}
```

- **center**: Point ID for the arc's center
- **start**: Point ID for where the arc begins
- **end**: Point ID for where the arc ends
- **normal**: Direction vector perpendicular to the arc plane

## Constraint: tangent

The `tangent` constraint creates smooth connections:

```json
{
  "type": "tangent",
  "a": "arc_entity",
  "b": "line_entity"
}
```

**Important**: The `tangent` constraint works with arcs and lines, but NOT with circle entities directly.

## Known Limitations

1. Arc entities are not rendered in SVG export (see issue #46)
2. The `tangent` constraint does not work with `circle` entities - use `arc` instead

## Applications

- CAM toolpaths (smooth transitions reduce vibration)
- Road design (highway curves)
- Railway track geometry
- Animation paths (smooth motion)
