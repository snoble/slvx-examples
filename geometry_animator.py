#!/usr/bin/env python3
"""
Fun Geometry Project: Animated Star Polygon Generator
This creates parametric star polygons that can be animated by varying parameters
"""

import json
import subprocess
import math
from pathlib import Path

def create_star_polygon(n_points=5, outer_radius=100, inner_radius=40, rotation=0):
    """Create a star polygon with n points"""
    
    entities = []
    constraints = []
    
    # Center point
    entities.append({
        "type": "point",
        "id": "center",
        "at": [0, 0, 0]
    })
    
    constraints.append({
        "type": "fixed",
        "entity": "center"
    })
    
    # Create outer and inner points
    for i in range(n_points):
        # Outer point
        outer_angle = (360 / n_points) * i + rotation
        outer_id = f"outer_{i}"
        
        entities.append({
            "type": "point",
            "id": outer_id,
            "at": [
                outer_radius * math.cos(math.radians(outer_angle)),
                outer_radius * math.sin(math.radians(outer_angle)),
                0
            ]
        })
        
        constraints.append({
            "type": "distance",
            "point1": "center",
            "point2": outer_id,
            "distance": outer_radius
        })
        
        # Inner point (between outer points)
        inner_angle = (360 / n_points) * (i + 0.5) + rotation
        inner_id = f"inner_{i}"
        
        entities.append({
            "type": "point",
            "id": inner_id,
            "at": [
                inner_radius * math.cos(math.radians(inner_angle)),
                inner_radius * math.sin(math.radians(inner_angle)),
                0
            ]
        })
        
        constraints.append({
            "type": "distance",
            "point1": "center",
            "point2": inner_id,
            "distance": inner_radius
        })
    
    # Create lines connecting the points to form a star
    for i in range(n_points):
        next_i = (i + 1) % n_points
        
        # Line from outer to inner point
        entities.append({
            "type": "line",
            "id": f"line_out_{i}",
            "start": f"outer_{i}",
            "end": f"inner_{i}"
        })
        
        # Line from inner to next outer point
        entities.append({
            "type": "line",
            "id": f"line_in_{i}",
            "start": f"inner_{i}",
            "end": f"outer_{next_i}"
        })
    
    return {
        "schema": "slvs-json/1",
        "units": "mm",
        "entities": entities,
        "constraints": constraints
    }

def create_gear_pair(gear1_teeth=20, gear2_teeth=10, module=2):
    """Create a pair of meshing gears"""
    
    pitch_radius1 = (gear1_teeth * module) / 2
    pitch_radius2 = (gear2_teeth * module) / 2
    center_distance = pitch_radius1 + pitch_radius2
    
    return {
        "schema": "slvs-json/1",
        "units": "mm",
        "parameters": {
            "rotation1": 0,
            "rotation2": 0
        },
        "entities": [
            {"type": "point", "id": "gear1_center", "at": [0, 0, 0]},
            {"type": "point", "id": "gear2_center", "at": [center_distance, 0, 0]},
            {"type": "circle", "id": "gear1_pitch", "center": "gear1_center", "radius": pitch_radius1},
            {"type": "circle", "id": "gear2_pitch", "center": "gear2_center", "radius": pitch_radius2}
        ],
        "constraints": [
            {"type": "fixed", "entity": "gear1_center"},
            {"type": "fixed", "entity": "gear2_center"},
            {"type": "tangent", "entity1": "gear1_pitch", "entity2": "gear2_pitch"}
        ]
    }

def solve_with_slvsx(constraint_data):
    """Solve constraints using slvsx (when available)"""
    try:
        result = subprocess.run(
            ['slvsx', 'solve', '-'],
            input=json.dumps(constraint_data),
            capture_output=True,
            text=True,
            check=True
        )
        return json.loads(result.stdout)
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        print(f"Note: slvsx not available or error occurred: {e}")
        print("When slvsx is installed, this will solve the constraints")
        return None

def main():
    print("Fun Geometry Project: Parametric Star Polygons and Gears")
    print("=" * 60)
    
    # Create different star polygons
    stars = [
        ("Pentagon Star", create_star_polygon(5, 100, 40)),
        ("Hexagon Star", create_star_polygon(6, 100, 50)),
        ("Octagon Star", create_star_polygon(8, 100, 60)),
        ("Rotating Star", create_star_polygon(5, 100, 40, rotation=36))
    ]
    
    for name, star_data in stars:
        filename = f"{name.lower().replace(' ', '_')}.json"
        with open(filename, 'w') as f:
            json.dump(star_data, f, indent=2)
        print(f"\nCreated {name}: {filename}")
        print(f"  - Points: {len([e for e in star_data['entities'] if e['type'] == 'point'])}")
        print(f"  - Lines: {len([e for e in star_data['entities'] if e['type'] == 'line'])}")
        print(f"  - Constraints: {len(star_data['constraints'])}")
    
    # Create gear mechanism
    gear_data = create_gear_pair(20, 10, 2)
    with open("gear_mechanism.json", 'w') as f:
        json.dump(gear_data, f, indent=2)
    print("\nCreated Gear Mechanism: gear_mechanism.json")
    
    print("\n" + "=" * 60)
    print("To solve these constraints when slvsx is available:")
    print("  slvsx solve pentagon_star.json")
    print("  slvsx export -f svg pentagon_star.json")
    print("\nOr use the Python integration in this script!")

if __name__ == "__main__":
    main()