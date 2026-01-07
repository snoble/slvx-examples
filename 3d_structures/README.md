# 3D Structures

Examples demonstrating 3D constraint solving with points in three-dimensional space.

## Examples

| File | Description |
|------|-------------|
| `tetrahedron.json` | 4-vertex, 6-edge triangular pyramid |
| `octahedron.json` | 8-faced polyhedron with 6 vertices |
| `pyramid.json` | Square-based pyramid |
| `truss_3d.json` | Structural truss in 3D space |

## Key Concepts

- Points use 3D coordinates: `[x, y, z]`
- Distance constraints work in 3D
- No workplane required for pure 3D geometry

## Usage

```bash
slvsx solve 3d_structures/tetrahedron.json
```

## Notes

- 3D structures don't produce meaningful SVG exports (2D projection)
- Use for learning 3D constraint relationships
