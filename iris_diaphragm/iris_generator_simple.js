#!/usr/bin/env node

/**
 * Simple Iris Diaphragm Generator
 * Creates a working iris mechanism with specified number of blades
 * 
 * Key simplifications from the original:
 * - Simple triangular blades (not trapezoids)
 * - Fixed pivot positions
 * - Single angle parameter controls all blades
 * - No complex coincident constraints
 */

function generateSimpleIris(numBlades = 6, bladeAngle = 30, outputFile = null) {
  const pivotRadius = 60;
  const bladeLength = 50;
  
  const doc = {
    schema: "slvs-json/1",
    units: "mm",
    parameters: {
      pivot_radius: pivotRadius,
      blade_length: bladeLength,
      blade_angle: bladeAngle,
      aperture_size: Math.cos(bladeAngle * Math.PI / 180) * bladeLength * 0.8
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
  
  // Add guide circles for visualization
  doc.entities.push({
    type: "circle",
    id: "pivot_circle",
    center: [0, 0, 0],
    diameter: pivotRadius * 2
  });
  
  doc.entities.push({
    type: "circle",
    id: "aperture_guide",
    center: [0, 0, 0],
    diameter: Math.cos(bladeAngle * Math.PI / 180) * bladeLength * 1.6
  });
  
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
    
    // Add radial line from center to pivot
    doc.entities.push({
      type: "line",
      id: `radial${i}`,
      p1: "center",
      p2: `pivot${i}`
    });
    
    // Add blade tip (initial position, will be constrained)
    const tipAngle = spokeAngle + bladeAngle;
    const tipX = pivotX + Math.cos(tipAngle * Math.PI / 180) * bladeLength * 0.7;
    const tipY = pivotY + Math.sin(tipAngle * Math.PI / 180) * bladeLength * 0.7;
    
    doc.entities.push({
      type: "point",
      id: `blade${i}_tip`,
      at: [tipX, tipY, 0]
    });
    
    // Add blade line
    doc.entities.push({
      type: "line",
      id: `blade${i}`,
      p1: `pivot${i}`,
      p2: `blade${i}_tip`
    });
    
    // Add constraint to fix pivot position
    doc.constraints.push({
      type: "fixed",
      entity: `pivot${i}`
    });
    
    // Add constraint for blade length
    doc.constraints.push({
      type: "distance",
      between: [`pivot${i}`, `blade${i}_tip`],
      value: "$blade_length"
    });
    
    // Add angle constraint between radial and blade
    doc.constraints.push({
      type: "angle",
      between: [`radial${i}`, `blade${i}`],
      value: "$blade_angle"
    });
  }
  
  if (outputFile) {
    const fs = require('fs');
    fs.writeFileSync(outputFile, JSON.stringify(doc, null, 2));
    console.log(`Generated ${outputFile} with ${numBlades} blades at ${bladeAngle}° angle`);
  } else {
    console.log(JSON.stringify(doc, null, 2));
  }
  
  return doc;
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help') {
    console.log('Usage: node iris_generator_simple.js [numBlades] [bladeAngle] [outputFile]');
    console.log('');
    console.log('Examples:');
    console.log('  node iris_generator_simple.js 6 30 iris_open.json    # 6 blades, 30° angle');
    console.log('  node iris_generator_simple.js 8 45 iris_mid.json     # 8 blades, 45° angle');
    console.log('  node iris_generator_simple.js 12 60 iris_closed.json  # 12 blades, 60° angle');
    console.log('');
    console.log('Parameters:');
    console.log('  numBlades   - Number of iris blades (default: 6)');
    console.log('  bladeAngle  - Angle of blades in degrees (default: 30)');
    console.log('                0° = fully open, 60-70° = nearly closed');
    console.log('  outputFile  - Output JSON file (optional, prints to stdout if not provided)');
    process.exit(0);
  }
  
  const numBlades = parseInt(args[0]) || 6;
  const bladeAngle = parseFloat(args[1]) || 30;
  const outputFile = args[2] || null;
  
  generateSimpleIris(numBlades, bladeAngle, outputFile);
}

module.exports = generateSimpleIris;