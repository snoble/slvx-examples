# Symmetric Bracket

A mechanical bracket with a centered notch and mounting holes, demonstrating how to achieve symmetric geometry using parallel and distance constraints.

![Symmetric Bracket](symmetric_bracket.svg)

## How It Works

This bracket has perfect left-right symmetry achieved through:
- Fixed reference points at symmetric positions
- Parallel constraints on corresponding edges
- Equal distance constraints on both sides

## Key Constraints Used

- **parallel**: Ensures left and right sides are parallel (and vertical)
- **distance**: Sets heights and depths parametrically
- **fixed**: Anchors symmetric reference points
- **circle**: Mounting holes at the bottom corners

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `half_width` | 40 mm | Half the total bracket width |
| `height` | 50 mm | Height of the bracket |
| `notch_half_width` | 15 mm | Half the notch width |
| `notch_depth` | 15 mm | Depth of the notch cutout |

## Achieving Symmetry Without symmetric_* Constraints

Since the `symmetric_vertical` and `symmetric_horizontal` constraints have issues (see issue #49), this example demonstrates an alternative approach:

1. **Fix symmetric reference points**: Place fixed points at positions like (-x, y) and (x, y)
2. **Use parallel constraints**: Force corresponding edges to be parallel
3. **Use equal distance constraints**: Ensure corresponding dimensions match

This "manual symmetry" approach is more verbose but reliable.

## Structure

```
            notch_tl    notch_tr
top_left -----+          +------ top_right
              |          |
              | notch    |
              |          |
              +----------+
              notch_bl    notch_br

left_side                    right_side
   |                            |
   |                            |
   O--------------------------O
bottom_left  (bottom)   bottom_right
  hole                      hole
```

## Applications

- Structural mounting brackets
- Electronic enclosure brackets
- Shelf supports
- Machine frame components
