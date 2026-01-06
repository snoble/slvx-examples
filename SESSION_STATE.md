# Session State - slvsx-examples

## What We've Done

### 1. Updated Examples for slvsx-cli v0.2.0
- Fixed API changes (horizontal/vertical need 2D geometry with workplane, equal_length uses entities array)
- Most examples in the repo now work

### 2. Created New Examples
- **chebyshev_linkage/** - Classic 4-bar linkage mechanism
- **3d_structures/** - New 3D geometry examples:
  - tetrahedron.json - Regular tetrahedron
  - octahedron.json - Regular octahedron (12 equal edges)
  - square_pyramid.json - Pyramid with equal base and slant edges
  - space_truss.json - Triangular space frame cell

### 3. Filed Bugs
- **#21**: point_on_circle crashes ("Cannot find handle")
- **#22**: symmetric constraint crashes
- **#23**: tangent constraint crashes
- **#25**: Multiple equal_length constraints crash ("Handle isn't unique")

### 4. Discovered Workarounds
- **Bug #25 workaround**: Use ONE equal_length constraint with all edges, not multiple constraints
  ```json
  // WORKS
  {"type": "equal_length", "entities": ["e1", "e2", "e3", "e4", "e5", "e6"]}

  // CRASHES
  {"type": "equal_length", "entities": ["e1", "e2", "e3"]}
  {"type": "equal_length", "entities": ["e4", "e5", "e6"]}
  ```

## What's Broken (Blocked by Bugs)

1. **constraint_showcase/constraint_showcase.json** - Uses point_on_circle (bug #21)
2. **rube_goldberg_machine/rube_goldberg_machine.json** - Complex example, crashes

## What To Do Next (With Fixed CLI)

### Priority 1: Test Bug Fixes
```bash
# Download new CLI
curl -sL https://github.com/snoble/slvsx-cli/releases/download/v0.X.X/slvsx-macos-arm64.tar.gz | tar xz -C /tmp

# Test if bugs are fixed
/tmp/slvsx solve constraint_showcase/constraint_showcase.json
/tmp/slvsx solve rube_goldberg_machine/rube_goldberg_machine.json
```

### Priority 2: Test Constraint Types That Were Buggy
- point_on_circle
- symmetric
- tangent
- Multiple equal_length constraints

### Priority 3: If Bugs Are Fixed, Create More Examples
Ideas from plan.md:
- **Peaucellier Linkage** - Converts rotary to exact linear motion
- **Crank-Slider** - Piston mechanism
- **Symmetric Design** - Demonstrates symmetric constraint
- More complex 3D structures (if multiple equal_length works)

### Priority 4: Update plan.md
- Mark fixed bugs
- Update constraint status
- Remove workarounds if no longer needed

## Commands Reference

```bash
# Solve and show result
/tmp/slvsx solve path/to/example.json

# Export to SVG
/tmp/slvsx export path/to/example.json -o path/to/output.svg

# Validate without solving
/tmp/slvsx validate path/to/example.json

# Test all examples
for f in /Users/steven/Documents/Code/slvx-examples/*/*.json; do
  echo "=== $f ==="
  /tmp/slvsx solve "$f" 2>&1 | head -3
done
```

## Working Directory
`/Users/steven/Documents/Code/slvx-examples`

## Git Status
All changes committed to main branch. Ready for push if desired.
