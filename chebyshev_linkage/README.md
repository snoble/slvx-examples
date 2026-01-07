# Chebyshev Linkage

A four-bar linkage that produces approximate straight-line motion. Invented by Pafnuty Chebyshev in 1850.

## How It Works

The coupler point traces a path that includes a nearly straight segment, useful for converting rotary motion to approximate linear motion without requiring a true sliding joint.

## Parameters

- `crank_angle` - Input angle for animation

## Key Constraints

- Fixed ground pivots
- Distance constraints for link lengths
- Specific link ratios produce the straight-line approximation

## References

- [Wikipedia: Chebyshev Linkage](https://en.wikipedia.org/wiki/Chebyshev_linkage)

## Usage

```bash
slvsx solve chebyshev_linkage/chebyshev_linkage.json
slvsx export -f svg chebyshev_linkage/chebyshev_linkage.json > chebyshev.svg
```
