# Theo Jansen Leg Mechanism

The walking leg mechanism from Theo Jansen's Strandbeest kinetic sculptures. Uses specific link ratios discovered through evolutionary algorithms.

## How It Works

An 8-bar linkage that converts rotary crank motion into a walking foot trajectory. Point F (the foot) traces a path that lifts, moves forward, plants, and pushes backward - mimicking animal locomotion.

## The "Holy Numbers"

Theo Jansen discovered these optimal link ratios through genetic algorithms:
- a = 38.0 (crank)
- b = 41.5, c = 39.3, d = 40.1, e = 55.8
- f = 39.4, g = 36.7, h = 65.7
- i = 49.0, j = 50.0, k = 61.9, l = 7.8

## Parameters

- `crank_angle` - Input rotation (40 degrees)

## Key Constraints

- `fixed` - Origin O and frame point M
- `distance` - All link lengths from holy numbers
- `angle` - Crank rotation
- `point_on_line` - Triangular sub-linkages

## References

- [Wikipedia: Jansen's linkage](https://en.wikipedia.org/wiki/Jansen%27s_linkage)
- [Strandbeest.com](https://www.strandbeest.com/)

## Usage

```bash
slvsx solve theo_jansen_leg/theo_jansen_leg.json
slvsx export -f svg theo_jansen_leg/theo_jansen_leg.json > theo_jansen.svg
```
