# Equal Angles Constraint Demo

Demonstrates the `equal_angles` convenience constraint added in v0.2.8.

## Features Demonstrated

- **equal_angles**: Ensures equal angles between consecutive lines from a common center
- **distance**: All spokes have equal length
- **fixed**: Center and reference spoke fixed

## How It Works

The `equal_angles` constraint takes an array of line IDs and ensures the angles between consecutive pairs are all equal. For 6 lines, this creates 60° spacing.

```json
{
  "type": "equal_angles",
  "lines": ["spoke1", "spoke2", "spoke3", "spoke4", "spoke5", "spoke6"]
}
```

You can also specify an explicit angle value:
```json
{
  "type": "equal_angles",
  "lines": ["spoke1", "spoke2"],
  "value": 45
}
```

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| spoke_length | 50 | Length of each spoke from center |

## Use Cases

- Gear tooth spacing
- Radial patterns (flowers, stars)
- Clock hands positioning
- Fan blade layout
- Rotary symmetry in mechanical designs

## 3D Printing Application

This pattern is perfect for creating:
- Wheel spokes
- Decorative rosettes
- Mounting brackets with evenly-spaced holes
- Radial cooling fins
