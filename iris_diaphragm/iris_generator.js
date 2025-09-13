#!/usr/bin/env node

/**
 * Generates a sophisticated iris diaphragm that would be nearly impossible
 * to calculate manually. Key features:
 * 1. Tapered trapezoidal blades (not simple lines)
 * 2. Perpendicular constraints ensuring blade edges are perpendicular to centerline
 * 3. Coincident constraints ensuring pivots lie on blade bases
 * 4. All blades move in perfect synchronization
 * 
 * The math to calculate where each tapered blade's corners should be
 * when rotated at an arbitrary angle while maintaining perpendicular
 * edges and proper overlap would require solving systems of equations
 * for each configuration.
 */

function generateSophisticatedIris(numBlades, bladeAngle) {
  const pivotRadius = 120;
  const bladeLength = 100;
  const bladeBaseWidth = 45;
  const bladeTipWidth = 15;
  
  const doc = {
    schema: "slvs-json/1",
    units: "mm",
    parameters: {
      pivot_radius: pivotRadius,
      blade_length: bladeLength,
      blade_angle: bladeAngle,
      blade_base_width: bladeBaseWidth,
      blade_tip_width: bladeTipWidth
    },
    entities: [],
    constraints: []
  };
  
  // Add center
  doc.entities.push({
    type: "point",
    id: "center",
    at: [0, 0, 0]
  });
  
  doc.constraints.push({
    type: "fixed",
    entity: "center"
  });
  
  // Calculate initial positions for visualization (solver will override)
  const angleStep = 360 / numBlades;
  
  for (let i = 1; i <= numBlades; i++) {
    const spokeAngle = (i - 1) * angleStep;
    const pivotX = Math.cos(spokeAngle * Math.PI / 180) * pivotRadius;
    const pivotY = Math.sin(spokeAngle * Math.PI / 180) * pivotRadius;
    
    // Add pivot point
    doc.entities.push({
      type: "point",
      id: `pivot${i}`,
      at: [pivotX, pivotY, 0]
    });
    
    // Add spoke from center to pivot
    doc.entities.push({
      type: "line",
      id: `spoke${i}`,
      p1: "center",
      p2: `pivot${i}`
    });
    
    // Add blade centerline
    doc.entities.push({
      type: "point",
      id: `blade${i}_tip`,
      at: [1, 1, 0]  // Dummy position
    });
    
    doc.entities.push({
      type: "line",
      id: `blade${i}_centerline`,
      p1: `pivot${i}`,
      p2: `blade${i}_tip`
    });
    
    // Add blade shape - trapezoid with 4 corners
    doc.entities.push({
      type: "point",
      id: `blade${i}_base_left`,
      at: [1, 1, 0]
    });
    
    doc.entities.push({
      type: "point",
      id: `blade${i}_base_right`,
      at: [1, 1, 0]
    });
    
    doc.entities.push({
      type: "line",
      id: `blade${i}_base_edge`,
      p1: `blade${i}_base_left`,
      p2: `blade${i}_base_right`
    });
    
    doc.entities.push({
      type: "point",
      id: `blade${i}_tip_left`,
      at: [1, 1, 0]
    });
    
    doc.entities.push({
      type: "point",
      id: `blade${i}_tip_right`,
      at: [1, 1, 0]
    });
    
    doc.entities.push({
      type: "line",
      id: `blade${i}_tip_edge`,
      p1: `blade${i}_tip_left`,
      p2: `blade${i}_tip_right`
    });
    
    // Add blade side edges
    doc.entities.push({
      type: "line",
      id: `blade${i}_left_edge`,
      p1: `blade${i}_base_left`,
      p2: `blade${i}_tip_left`
    });
    
    doc.entities.push({
      type: "line",
      id: `blade${i}_right_edge`,
      p1: `blade${i}_base_right`,
      p2: `blade${i}_tip_right`
    });
  }
  
  // Add constraints
  // First pivot is fixed for reference
  doc.constraints.push({
    type: "fixed",
    entity: "pivot1"
  });
  
  for (let i = 1; i <= numBlades; i++) {
    const nextI = i < numBlades ? i + 1 : 1;
    
    // Pivot distance from center
    if (i > 1) {
      doc.constraints.push({
        type: "distance",
        between: ["center", `pivot${i}`],
        value: "$pivot_radius"
      });
      
      // Angular spacing between spokes
      const prevI = i - 1;
      doc.constraints.push({
        type: "angle",
        between: [`spoke${prevI}`, `spoke${i}`],
        value: angleStep
      });
    }
    
    // Blade length
    doc.constraints.push({
      type: "distance",
      between: [`pivot${i}`, `blade${i}_tip`],
      value: "$blade_length"
    });
    
    // Blade angle from spoke (synchronized via parameter)
    doc.constraints.push({
      type: "angle",
      between: [`spoke${i}`, `blade${i}_centerline`],
      value: "$blade_angle"
    });
    
    // CRITICAL: Pivot must lie on blade base
    doc.constraints.push({
      type: "coincident",
      at: `pivot${i}`,
      of: [`blade${i}_base_edge`]
    });
    
    // CRITICAL: Blade tip must lie on tip edge
    doc.constraints.push({
      type: "coincident",
      at: `blade${i}_tip`,
      of: [`blade${i}_tip_edge`]
    });
    
    // Base width
    doc.constraints.push({
      type: "distance",
      between: [`blade${i}_base_left`, `blade${i}_base_right`],
      value: "$blade_base_width"
    });
    
    // Tip width (tapered)
    doc.constraints.push({
      type: "distance",
      between: [`blade${i}_tip_left`, `blade${i}_tip_right`],
      value: "$blade_tip_width"
    });
    
    // CRITICAL: Base edge perpendicular to centerline
    doc.constraints.push({
      type: "perpendicular",
      a: `blade${i}_centerline`,
      b: `blade${i}_base_edge`
    });
    
    // CRITICAL: Tip edge perpendicular to centerline
    doc.constraints.push({
      type: "perpendicular",
      a: `blade${i}_centerline`,
      b: `blade${i}_tip_edge`
    });
  }
  
  return doc;
}

// Generate different configurations showing aperture control
const configurations = [
  { blades: 6, angle: 35, name: "6blade_closed" },
  { blades: 6, angle: 55, name: "6blade_mid" },
  { blades: 6, angle: 75, name: "6blade_open" },
  { blades: 8, angle: 40, name: "8blade_closed" },
  { blades: 8, angle: 60, name: "8blade_mid" },
  { blades: 8, angle: 80, name: "8blade_open" }
];

const fs = require('fs');

// Generate the most impressive one
const impressive = generateSophisticatedIris(8, 60);
fs.writeFileSync('iris_diaphragm/sophisticated_8blade.json', JSON.stringify(impressive, null, 2));
console.log('Generated sophisticated_8blade.json');

// Show how changing just blade_angle opens/closes the aperture
for (const config of configurations) {
  const iris = generateSophisticatedIris(config.blades, config.angle);
  const filename = `iris_diaphragm/sophisticated_${config.name}.json`;
  fs.writeFileSync(filename, JSON.stringify(iris, null, 2));
  console.log(`Generated ${filename}`);
}

console.log('\nWhy this needs a constraint solver:');
console.log('1. Each blade is a trapezoid with perpendicular edges to its centerline');
console.log('2. The pivot must lie exactly on the blade base edge (not at a corner)');
console.log('3. All blades rotate by the same angle simultaneously');
console.log('4. Calculating where the 4 corners of each tapered blade should be');
console.log('   after rotation while maintaining all constraints would require');
console.log('   solving multiple systems of equations for each configuration');
console.log('5. The overlapping pattern emerges naturally from the constraints');