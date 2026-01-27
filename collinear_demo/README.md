# Collinear Constraint Demo

Demonstrates the `collinear` convenience constraint added in v0.2.8.

## Features Demonstrated

- **collinear**: Ensures 3+ points lie on the same line
- **distance**: Equal spacing between points
- **fixed**: Anchor point at origin

## How It Works

The `collinear` constraint takes an array of point IDs and ensures they all lie on the same line. Internally, it expands to:
1. An implicit line through the first 2 points
2. `point_on_line` constraints for remaining points

```json
{
  "type": "collinear",
  "points": ["anchor", "p1", "p2", "p3", "p4"]
}
```

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| spacing | 25 | Distance between consecutive points |

## Initial vs Solved

The initial positions have the points slightly off-line (y values vary from -3 to 8). After solving, all points are perfectly collinear while maintaining the specified distances.

## Use Cases

- Rail or track alignment
- Fence post placement
- Linear arrays of components
- Alignment verification
