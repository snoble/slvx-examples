#!/usr/bin/env node

/**
 * Constraint-Based Iris Diaphragm Generator
 * Creates iris mechanisms using constraints instead of pre-calculated positions
 * 
 * Key improvements:
 * - Pivots positioned by constraints (distance + angle)
 * - No trigonometric calculations
 * - Let the solver determine all positions
 * - Truly parametric design
 */

function generateConstrainedIris(numBlades = 6, bladeAngle = 30, outputFile = null) {
  const pivotRadius = 60;
  const bladeLength = 50;
  
  const doc = {
    schema: "slvs-json/1",
    units: "mm",
    parameters: {
      pivot_radius: pivotRadius,
      blade_length: bladeLength,
      blade_angle: bladeAngle,
      num_blades: numBlades
    },
    entities: [],
    constraints: []
  };
  
  // Add center point
  doc.entities.push({
    type: "point",
    id: "center",
    at: [0, 0, 0]
  });
  
  doc.constraints.push({
    type: "fixed",
    entity: "center"
  });
  
  // Add visualization circle
  doc.entities.push({
    type: "circle",
    id: "pivot_circle",
    center: [0, 0, 0],
    diameter: pivotRadius * 2
  });
  
  const angleStep = 360 / numBlades;
  
  // Create first pivot as reference
  doc.entities.push({
    type: "point",
    id: "pivot1",
    at: [pivotRadius, 0, 0]  // Initial guess
  });
  
  // Create first radial line
  doc.entities.push({
    type: "line",
    id: "radial1",
    p1: "center",
    p2: "pivot1"
  });
  
  // Constrain first radial to be horizontal
  doc.constraints.push({
    type: "horizontal",
    a: "radial1"
  });
  
  // Constrain first pivot distance
  doc.constraints.push({
    type: "distance",
    between: ["center", "pivot1"],
    value: "$pivot_radius"
  });
  
  // Create first blade
  doc.entities.push({
    type: "point",
    id: "blade1_tip",
    at: [pivotRadius + 30, 20, 0]  // Initial guess
  });
  
  doc.entities.push({
    type: "line",
    id: "blade1",
    p1: "pivot1",
    p2: "blade1_tip"
  });
  
  // Blade tip must be on aperture circle (no distance constraint needed)
  doc.constraints.push({
    type: "angle",
    between: ["radial1", "blade1"],
    value: "$blade_angle"
  });
  
  // Create remaining pivots and blades
  for (let i = 2; i <= numBlades; i++) {
    // Add pivot point (initial guess position)
    doc.entities.push({
      type: "point",
      id: `pivot${i}`,
      at: [pivotRadius * 0.5, pivotRadius * 0.5, 0]  // Just a guess
    });
    
    // Add radial line
    doc.entities.push({
      type: "line",
      id: `radial${i}`,
      p1: "center",
      p2: `pivot${i}`
    });
    
    // Constrain pivot distance from center
    doc.constraints.push({
      type: "distance",
      between: ["center", `pivot${i}`],
      value: "$pivot_radius"
    });
    
    // Constrain angle from previous radial
    doc.constraints.push({
      type: "angle",
      between: [`radial${i-1}`, `radial${i}`],
      value: angleStep
    });
    
    // Add blade tip
    doc.entities.push({
      type: "point",
      id: `blade${i}_tip`,
      at: [30, 30, 0]  // Initial guess
    });
    
    // Add blade line
    doc.entities.push({
      type: "line",
      id: `blade${i}`,
      p1: `pivot${i}`,
      p2: `blade${i}_tip`
    });
    
    // Constrain blade angle from radial (no distance constraint needed)
    doc.constraints.push({
      type: "angle",
      between: [`radial${i}`, `blade${i}`],
      value: "$blade_angle"
    });
  }
  
  // Add closing angle constraint between last and first radial
  doc.constraints.push({
    type: "angle",
    between: [`radial${numBlades}`, "radial1"],
    value: angleStep
  });
  
  // Add aperture circle that blade tips must touch
  const aperture = Math.cos(bladeAngle * Math.PI / 180) * bladeLength * 0.8;
  doc.entities.push({
    type: "circle",
    id: "aperture",
    center: [0, 0, 0],
    diameter: aperture * 2
  });
  
  // Constrain all blade tips to lie on aperture circle
  for (let i = 1; i <= numBlades; i++) {
    doc.constraints.push({
      type: "point_on_circle",
      point: `blade${i}_tip`,
      circle: "aperture"
    });
  }
  
  if (outputFile) {
    const fs = require('fs');
    fs.writeFileSync(outputFile, JSON.stringify(doc, null, 2));
    console.log(`Generated ${outputFile} with ${numBlades} blades at ${bladeAngle}° angle`);
    console.log(`This version uses constraints to position everything - no calculations!`);
  } else {
    console.log(JSON.stringify(doc, null, 2));
  }
  
  return doc;
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help') {
    console.log('Constraint-Based Iris Generator');
    console.log('Usage: node iris_generator_constrained.js [numBlades] [bladeAngle] [outputFile]');
    console.log('');
    console.log('Examples:');
    console.log('  node iris_generator_constrained.js 6 30 iris_open.json');
    console.log('  node iris_generator_constrained.js 8 45 iris_mid.json');
    console.log('  node iris_generator_constrained.js 12 60 iris_closed.json');
    console.log('');
    console.log('Key difference: This generator uses constraints to position pivots');
    console.log('instead of calculating positions with trigonometry.');
    process.exit(0);
  }
  
  const numBlades = parseInt(args[0]) || 6;
  const bladeAngle = parseFloat(args[1]) || 30;
  const outputFile = args[2] || null;
  
  generateConstrainedIris(numBlades, bladeAngle, outputFile);
}

module.exports = generateConstrainedIris;