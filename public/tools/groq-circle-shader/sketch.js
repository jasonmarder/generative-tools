// Organic Islands Pattern Generator
const params = {
  // Grid properties
  cols: 50,
  rows: 50,
  cellSize: 16,

  // Noise properties - controls island shapes
  islandNoiseScale: 0.1,
  noiseOffset: 0,
  noiseSpeed: 0.005,

  // Island threshold (INVERTED: lower noise = orange fill)
  islandThreshold: 0.5,

  // Decoration noise (creates variety in filled cells)
  decorationNoiseScale: 0.25,

  // Pattern variety (0-100 percentage, gets normalized)
  emptyAmount: 40,
  tinyDotAmount: 20,
  smallCircleAmount: 20,
  mediumCircleAmount: 10,
  largeCircleAmount: 5,
  strokedAmount: 3,
  nestedAmount: 2,

  // Size ranges
  tinyDotSize: 0.15,
  smallCircleSize: 0.35,
  mediumCircleSize: 0.55,
  largeCircleSize: 0.75,
  strokedCircleSize: 0.6,
  nestedSquareSize: 0.7,
  nestedCircleSize: 0.4,
  strokeWeight: 2,

  // Colors
  fgColor: '#FF8000',
  bgColor: '#141414',

  // Animation
  animate: false,

  // Export options
  exportIslandsOnly: false,

  // Mask options
  useMask: false,
  maskOpacity: 0.3,
  showMaskDebug: false,

  // Actions
  uploadMask: function() {
    document.getElementById('maskUpload').click();
  },
  clearMask: function() {
    maskGraphics = null;
    maskPath = null;
    params.useMask = false;
    drawPattern();
  },
  regenerate: function () {
    seed = random(10000);
    noiseSeed(seed);
    randomSeed(seed);
    drawPattern();
  },
  exportPNG: function () {
    save(`islands-${Date.now()}.png`);
  },
  exportSVG: function () {
    exportAsSVG();
  }
};

let gui;
let seed;
let maskGraphics;
let maskPath;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent('canvas-container');

  seed = random(10000);
  noiseSeed(seed);
  randomSeed(seed);

  setupFileUpload();
  setupGUI();
  drawPattern();
}

function setupFileUpload() {
  // Create hidden file input
  const input = document.createElement('input');
  input.type = 'file';
  input.id = 'maskUpload';
  input.accept = '.svg,image/svg+xml';
  input.style.display = 'none';
  document.body.appendChild(input);

  input.addEventListener('change', handleMaskUpload);
}

function handleMaskUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    parseSVGMask(e.target.result);
  };
  reader.readAsText(file);
}

function parseSVGMask(svgContent) {
  // Create blob URL from SVG content
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  // Load SVG as image
  loadImage(url, (img) => {
    // Create graphics buffer for mask with performance optimization
    maskGraphics = createGraphics(width, height);
    maskGraphics.drawingContext.willReadFrequently = true;
    maskGraphics.background(0); // Black background

    // Draw the SVG image scaled to fit canvas
    maskGraphics.image(img, 0, 0, width, height);

    params.useMask = true;

    // Debug: Test some sample pixels
    console.log('Mask loaded, dimensions:', width, 'x', height);
    console.log('Sample pixel at (400,400):', maskGraphics.get(400, 400));
    console.log('Sample pixel at (100,100):', maskGraphics.get(100, 100));
    console.log('Sample pixel at (700,700):', maskGraphics.get(700, 700));

    // Clean up blob URL
    URL.revokeObjectURL(url);

    drawPattern();
  }, () => {
    alert('Failed to load SVG. Please try a different file.');
    URL.revokeObjectURL(url);
  });
}

function drawSVGElement(pg, element, svgWidth, svgHeight) {
  const scaleX = width / svgWidth;
  const scaleY = height / svgHeight;

  pg.fill(255);
  pg.noStroke();

  if (element.tagName === 'path') {
    // For paths, we'll rasterize by checking points
    // This is a simplified approach - for complex paths you'd want a proper SVG parser
    const d = element.getAttribute('d');
    if (d) {
      drawPathToMask(pg, d, scaleX, scaleY);
    }
  } else if (element.tagName === 'rect') {
    const x = parseFloat(element.getAttribute('x') || 0) * scaleX;
    const y = parseFloat(element.getAttribute('y') || 0) * scaleY;
    const w = parseFloat(element.getAttribute('width')) * scaleX;
    const h = parseFloat(element.getAttribute('height')) * scaleY;
    pg.rect(x, y, w, h);
  } else if (element.tagName === 'circle') {
    const cx = parseFloat(element.getAttribute('cx')) * scaleX;
    const cy = parseFloat(element.getAttribute('cy')) * scaleY;
    const r = parseFloat(element.getAttribute('r')) * Math.min(scaleX, scaleY);
    pg.ellipse(cx, cy, r * 2, r * 2);
  }
}

function drawPathToMask(pg, pathData, scaleX, scaleY) {
  // Simple path parser - handles basic SVG path commands
  pg.beginShape();

  const commands = pathData.match(/[a-zA-Z][^a-zA-Z]*/g);

  commands.forEach(cmd => {
    const type = cmd[0];
    const coords = cmd.slice(1).trim().split(/[\s,]+/).map(Number);

    if (type === 'M' || type === 'm') {
      for (let i = 0; i < coords.length; i += 2) {
        pg.vertex(coords[i] * scaleX, coords[i + 1] * scaleY);
      }
    } else if (type === 'L' || type === 'l') {
      for (let i = 0; i < coords.length; i += 2) {
        pg.vertex(coords[i] * scaleX, coords[i + 1] * scaleY);
      }
    }
  });

  pg.endShape(CLOSE);
}

function isInsideMask(x, y) {
  if (!maskGraphics || !params.useMask) return true;

  // Ensure coordinates are integers
  const px = Math.floor(x);
  const py = Math.floor(y);

  // Check bounds
  if (px < 0 || py < 0 || px >= width || py >= height) return false;

  const pixel = maskGraphics.get(px, py);

  // Check if pixel is not black (has content)
  // A pixel is considered "inside" if it has any non-black color
  const isInside = (pixel[0] + pixel[1] + pixel[2]) > 30; // Sum of RGB > threshold

  return isInside;
}

function draw() {
  if (params.animate) {
    params.noiseOffset += params.noiseSpeed;
    drawPattern();
  }
}

function drawPattern() {
  background(params.bgColor);

  // Debug mode: show raw mask
  if (params.showMaskDebug && maskGraphics) {
    image(maskGraphics, 0, 0);
    return;
  }

  const startX = (width - params.cols * params.cellSize) / 2;
  const startY = (height - params.rows * params.cellSize) / 2;

  // LAYER 1: Draw orange filled squares (INVERTED: black islands are the negative space)
  noStroke();
  fill(params.fgColor);

  for (let x = 0; x < params.cols; x++) {
    for (let y = 0; y < params.rows; y++) {
      const islandNoise = noise(
        x * params.islandNoiseScale,
        y * params.islandNoiseScale,
        params.noiseOffset
      );

      // INVERTED: Fill where noise is BELOW threshold (creates black island voids)
      if (islandNoise < params.islandThreshold) {
        const pixelX = startX + x * params.cellSize;
        const pixelY = startY + y * params.cellSize;
        const centerX = pixelX + params.cellSize / 2;
        const centerY = pixelY + params.cellSize / 2;

        // Check if cell is inside mask
        if (isInsideMask(centerX, centerY)) {
          rect(pixelX, pixelY, params.cellSize + 1, params.cellSize + 1);
        }
      }
    }
  }

  // LAYER 2: Add decorative elements on top of filled squares
  for (let x = 0; x < params.cols; x++) {
    for (let y = 0; y < params.rows; y++) {
      const islandNoise = noise(
        x * params.islandNoiseScale,
        y * params.islandNoiseScale,
        params.noiseOffset
      );

      // Only add decorations to filled cells
      if (islandNoise < params.islandThreshold) {
        const centerX = startX + x * params.cellSize + params.cellSize / 2;
        const centerY = startY + y * params.cellSize + params.cellSize / 2;

        // Check if cell is inside mask
        if (!isInsideMask(centerX, centerY)) continue;

        // Use unique random seed per cell for true randomness
        randomSeed(seed * (x + 1) * (y + 1) * 12345.6789);

        // Define weights from params
        const weights = {
          empty: params.emptyAmount,
          tiny: params.tinyDotAmount,
          small: params.smallCircleAmount,
          medium: params.mediumCircleAmount,
          large: params.largeCircleAmount,
          stroked: params.strokedAmount,
          nested: params.nestedAmount
        };

        // Calculate total weight
        let totalWeight = 0;
        for (let key in weights) {
          totalWeight += weights[key];
        }

        // Pick a random value locally
        let r = random(0, totalWeight);

        // Determine which type is selected
        let selectedType = 'empty';
        let currentSum = 0;
        for (let key in weights) {
          currentSum += weights[key];
          if (r <= currentSum) {
            selectedType = key;
            break;
          }
        }

        // Skip decorations if in islands-only export mode
        if (params.exportIslandsOnly) continue;

        // Draw the selected decoration
        if (selectedType === 'empty') {
          // Do nothing (plain filled square from Layer 1)
        } else if (selectedType === 'tiny') {
          drawCircle(centerX, centerY, params.tinyDotSize, false);
        } else if (selectedType === 'small') {
          drawCircle(centerX, centerY, params.smallCircleSize, false);
        } else if (selectedType === 'medium') {
          drawCircle(centerX, centerY, params.mediumCircleSize, false);
        } else if (selectedType === 'large') {
          drawCircle(centerX, centerY, params.largeCircleSize, false);
        } else if (selectedType === 'stroked') {
          drawCircle(centerX, centerY, params.strokedCircleSize, true);
        } else if (selectedType === 'nested') {
          drawNestedSquare(centerX, centerY);
        }
      }
    }
  }

  // Draw mask preview overlay if enabled
  if (maskGraphics && params.maskOpacity > 0) {
    push();
    blendMode(MULTIPLY);
    tint(255, 0, 0, params.maskOpacity * 255); // Red tint to see mask area
    image(maskGraphics, 0, 0);
    pop();
  }
}

function drawNestedSquare(x, y) {
  // Nested Square is a square of BG color inside the Orange cell
  const size = params.cellSize * params.nestedSquareSize;

  rectMode(CENTER);
  fill(params.bgColor);
  noStroke();
  rect(x, y, size, size);

  // With a circle inside it (Orange again)
  const circleSize = params.cellSize * params.nestedCircleSize;
  fill(params.fgColor);
  ellipse(x, y, circleSize);

  rectMode(CORNER);
}

function drawCircle(x, y, sizeMult, isStroked) {
  const size = params.cellSize * sizeMult;

  if (isStroked) {
    noFill();
    stroke(params.bgColor);
    strokeWeight(params.strokeWeight);
    ellipse(x, y, size);
  } else {
    fill(params.bgColor);
    noStroke();
    ellipse(x, y, size);
  }
}

function setupGUI() {
  if (gui) gui.destroy();
  gui = new dat.GUI({ width: 320, scrollable: false });

  // dat.gui's root panel has no built-in title row (only folders get one), so
  // add a custom title bar that doubles as the whole-panel collapse toggle —
  // matching the lil-gui reference panel where clicking the title
  // collapses/expands everything below it.
  const titleBar = document.createElement('div');
  titleBar.className = 'gui-panel-title';
  titleBar.textContent = 'Organic Pattern Generator';
  gui.domElement.insertBefore(titleBar, gui.domElement.firstChild);
  titleBar.addEventListener('click', () => {
    gui.domElement.classList.toggle('panel-closed');
  });

  const gridF = gui.addFolder('Grid');
  gridF.add(params, 'cols', 10, 100, 1).onChange(drawPattern);
  gridF.add(params, 'rows', 10, 100, 1).onChange(drawPattern);
  gridF.add(params, 'cellSize', 5, 50, 1).onChange(drawPattern);

  const islandF = gui.addFolder('Island Shape');
  islandF.add(params, 'islandNoiseScale', 0.01, 0.3).name('Island Detail').onChange(drawPattern);
  islandF.add(params, 'islandThreshold', 0, 1).name('Island Size').onChange(drawPattern);
  islandF.add(params, 'noiseSpeed', 0, 0.01).name('Animation Speed');
  islandF.add(params, 'animate');

  const decorationF = gui.addFolder('Decoration Mix (Proportions)');
  decorationF.add(params, 'decorationNoiseScale', 0.1, 0.8).name('Pattern Flow').onChange(drawPattern);
  decorationF.add(params, 'emptyAmount', 0, 100).name('Plain Fill').onChange(drawPattern);
  decorationF.add(params, 'tinyDotAmount', 0, 100).name('Tiny Dots').onChange(drawPattern);
  decorationF.add(params, 'smallCircleAmount', 0, 100).name('Small Circles').onChange(drawPattern);
  decorationF.add(params, 'mediumCircleAmount', 0, 100).name('Medium Circles').onChange(drawPattern);
  decorationF.add(params, 'largeCircleAmount', 0, 100).name('Large Circles').onChange(drawPattern);
  decorationF.add(params, 'strokedAmount', 0, 100).name('Stroked').onChange(drawPattern);
  decorationF.add(params, 'nestedAmount', 0, 100).name('Nested Square').onChange(drawPattern);

  const sizeF = gui.addFolder('Element Sizes');
  sizeF.add(params, 'tinyDotSize', 0.05, 0.3).name('Tiny Dot').onChange(drawPattern);
  sizeF.add(params, 'smallCircleSize', 0.2, 0.6).name('Small Circle').onChange(drawPattern);
  sizeF.add(params, 'mediumCircleSize', 0.4, 0.8).name('Medium Circle').onChange(drawPattern);
  sizeF.add(params, 'largeCircleSize', 0.6, 1.2).name('Large Circle').onChange(drawPattern);
  sizeF.add(params, 'strokedCircleSize', 0.4, 1).name('Stroked Circle').onChange(drawPattern);
  sizeF.add(params, 'nestedSquareSize', 0.3, 1).name('Nested Square').onChange(drawPattern);
  sizeF.add(params, 'nestedCircleSize', 0.2, 0.8).name('Nested Circle').onChange(drawPattern);
  sizeF.add(params, 'strokeWeight', 0.5, 5).name('Stroke Weight').onChange(drawPattern);

  const colorF = gui.addFolder('Colors');
  colorF.addColor(params, 'fgColor').name('Fill Color').onChange(drawPattern);
  colorF.addColor(params, 'bgColor').name('Island Color').onChange(drawPattern);

  const maskF = gui.addFolder('Shape Mask');
  maskF.add(params, 'uploadMask').name('📁 Upload SVG Mask');
  maskF.add(params, 'useMask').name('Use Mask').onChange(drawPattern);
  maskF.add(params, 'showMaskDebug').name('Show Mask Buffer').onChange(drawPattern);
  maskF.add(params, 'maskOpacity', 0, 1, 0.1).name('Mask Preview').onChange(drawPattern);
  maskF.add(params, 'clearMask').name('🗑️ Clear Mask');

  const exportF = gui.addFolder('Export');
  exportF.add(params, 'exportIslandsOnly').name('Islands Only').onChange(drawPattern);
  exportF.add(params, 'exportPNG').name('💾 Save PNG');
  exportF.add(params, 'exportSVG').name('📐 Save SVG');

  gui.add(params, 'regenerate').name('🎲 New Pattern');

  islandF.open();
  decorationF.open();
  exportF.open();
}

function exportAsSVG() {
  // Generate SVG markup manually
  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
<rect width="${width}" height="${height}" fill="${params.bgColor}"/>
`;

  const startX = (width - params.cols * params.cellSize) / 2;
  const startY = (height - params.rows * params.cellSize) / 2;

  // Layer 1: Draw filled squares
  for (let x = 0; x < params.cols; x++) {
    for (let y = 0; y < params.rows; y++) {
      const islandNoise = noise(
        x * params.islandNoiseScale,
        y * params.islandNoiseScale,
        params.noiseOffset
      );

      if (islandNoise < params.islandThreshold) {
        const pixelX = startX + x * params.cellSize;
        const pixelY = startY + y * params.cellSize;
        const centerX = pixelX + params.cellSize / 2;
        const centerY = pixelY + params.cellSize / 2;

        // Check if cell is inside mask
        if (isInsideMask(centerX, centerY)) {
          svg += `<rect x="${pixelX}" y="${pixelY}" width="${params.cellSize + 1}" height="${params.cellSize + 1}" fill="${params.fgColor}"/>\n`;
        }
      }
    }
  }

  // Layer 2: Decorations (skip if islands-only)
  if (!params.exportIslandsOnly) {
    for (let x = 0; x < params.cols; x++) {
      for (let y = 0; y < params.rows; y++) {
        const islandNoise = noise(
          x * params.islandNoiseScale,
          y * params.islandNoiseScale,
          params.noiseOffset
        );

        if (islandNoise < params.islandThreshold) {
          const centerX = startX + x * params.cellSize + params.cellSize / 2;
          const centerY = startY + y * params.cellSize + params.cellSize / 2;

          // Check if cell is inside mask
          if (!isInsideMask(centerX, centerY)) continue;

          randomSeed(seed * (x + 1) * (y + 1) * 12345.6789);

          const weights = {
            empty: params.emptyAmount,
            tiny: params.tinyDotAmount,
            small: params.smallCircleAmount,
            medium: params.mediumCircleAmount,
            large: params.largeCircleAmount,
            stroked: params.strokedAmount,
            nested: params.nestedAmount
          };

          let totalWeight = 0;
          for (let key in weights) {
            totalWeight += weights[key];
          }

          let r = random(0, totalWeight);
          let selectedType = 'empty';
          let currentSum = 0;
          for (let key in weights) {
            currentSum += weights[key];
            if (r <= currentSum) {
              selectedType = key;
              break;
            }
          }

          // Add decoration SVG
          if (selectedType === 'tiny') {
            svg += svgCircle(centerX, centerY, params.tinyDotSize, false);
          } else if (selectedType === 'small') {
            svg += svgCircle(centerX, centerY, params.smallCircleSize, false);
          } else if (selectedType === 'medium') {
            svg += svgCircle(centerX, centerY, params.mediumCircleSize, false);
          } else if (selectedType === 'large') {
            svg += svgCircle(centerX, centerY, params.largeCircleSize, false);
          } else if (selectedType === 'stroked') {
            svg += svgCircle(centerX, centerY, params.strokedCircleSize, true);
          } else if (selectedType === 'nested') {
            svg += svgNestedSquare(centerX, centerY);
          }
        }
      }
    }
  }

  svg += '</svg>';

  // Download SVG
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `islands-${Date.now()}.svg`;
  link.click();
  URL.revokeObjectURL(url);
}

function svgCircle(x, y, sizeMult, isStroked) {
  const radius = (params.cellSize * sizeMult) / 2;

  if (isStroked) {
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="none" stroke="${params.bgColor}" stroke-width="${params.strokeWeight}"/>\n`;
  } else {
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${params.bgColor}"/>\n`;
  }
}

function svgNestedSquare(x, y) {
  const size = params.cellSize * params.nestedSquareSize;
  const half = size / 2;
  const circleRadius = (params.cellSize * params.nestedCircleSize) / 2;

  return `<rect x="${x - half}" y="${y - half}" width="${size}" height="${size}" fill="${params.bgColor}"/>\n` +
         `<circle cx="${x}" cy="${y}" r="${circleRadius}" fill="${params.fgColor}"/>\n`;
}

function keyPressed() {
  if (key === ' ') params.regenerate();
  if (key === 's' || key === 'S') params.exportPNG();
  if (key === 'v' || key === 'V') params.exportSVG();
}
