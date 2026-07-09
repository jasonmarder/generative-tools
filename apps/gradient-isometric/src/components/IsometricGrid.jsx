import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const IsometricGrid = forwardRef(({
  numShapes = 7,
  minSize = 2,
  maxSize = 3,
  showAscii = false,
  randomizeAscii = false,
  asciiShapes = 0,
  asciiDensity = 8,
  timestamp
}, ref) => {
  const [shapes, setShapes] = useState([]);
  const svgRef = React.useRef(null);

  const COLORS = [
    '#0B815E', '#22A4F5', '#4152A4', '#F1CB0F',
    '#F36746', '#F55885', '#FCAADA'
  ];

  const ASCII_CHARS = ['+', '(', ')', '∇', '[', ']'];

  const GRID_SIZE = 60;
  const GRID_WIDTH = 12;
  const GRID_HEIGHT = 8;

  const ISO_ANGLE = Math.PI / 6;
  const COS_ISO = Math.cos(ISO_ANGLE);
  const SIN_ISO = Math.sin(ISO_ANGLE);

  useImperativeHandle(ref, () => ({
    exportSVG: () => {
      if (!svgRef.current) return;

      const viewBoxSize = GRID_WIDTH * GRID_SIZE * 2;

      const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 ${viewBoxSize} ${viewBoxSize}"
        width="${viewBoxSize}"
        height="${viewBoxSize}"
      >
        ${shapes.map(shape => `
          <g>
            <polygon
              points="${shape.points}"
              fill="${shape.color}"
            />
            ${shape.asciiPoints && shape.asciiPoints.length > 0 ?
              shape.asciiPoints.map((point, i) => `
                <text
                  x="${point[0] + GRID_SIZE * 2}"
                  y="${point[1] + GRID_SIZE * 2}"
                  font-family="monospace"
                  font-size="${GRID_SIZE / asciiDensity}"
                  fill="${shape.isAsciiShape ? '#000' : '#666'}"
                  text-anchor="middle"
                  dominant-baseline="middle"
                >${shape.isAsciiShape ? shape.asciiChars[i] : '+'}</text>
              `).join('') : ''
            }
          </g>
        `).join('')}
      </svg>`;

      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'isometric-shapes.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }));

  const generateAsciiPoints = (baseX, baseY, width, height, isFlipped) => {
    const points = [];
    const chars = [];
    const baseChar = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
    const charSpacing = GRID_SIZE / asciiDensity;
    const horizontalChars = Math.floor(width / charSpacing);
    const verticalChars = Math.floor(height / charSpacing);

    for (let i = 0; i <= horizontalChars; i++) {
      for (let j = 0; j <= verticalChars; j++) {
        const progressX = i / horizontalChars;
        const progressY = j / verticalChars;

        let x, y;
        if (isFlipped) {
          x = baseX - (width * progressX);
          y = baseY + (height * progressY) + (progressX * width * SIN_ISO);
        } else {
          x = baseX + (width * progressX);
          y = baseY + (height * progressY) + (progressX * width * SIN_ISO);
        }

        points.push([x, y]);
        chars.push(randomizeAscii ?
          ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)] :
          baseChar
        );
      }
    }

    return { points, chars };
  };

  const shapesOverlap = (shape1Pos, shape1Size, shape2Pos, shape2Size) => {
    const buffer = GRID_SIZE * 0.5;
    return Math.abs(shape1Pos.x - shape2Pos.x) < (shape1Size.width + shape2Size.width + buffer) &&
           Math.abs(shape1Pos.y - shape2Pos.y) < (shape1Size.height + shape2Size.height + buffer);
  };

  const generateRandomShape = (index, existingShapes) => {
    let attempts = 0;
    let shape;

    do {
      const gridX = Math.floor(Math.random() * (GRID_WIDTH - 4));
      const gridY = Math.floor(Math.random() * (GRID_HEIGHT - 4));

      const sizeMultiplier = Math.random() * Math.random(); // Quadratic distribution
      const size = (minSize + (maxSize - minSize) * sizeMultiplier) * GRID_SIZE;
      const depth = (1 + Math.random() * 2) * GRID_SIZE; // Depth varies between 1-3 grid units

      const x = (gridX * GRID_SIZE * COS_ISO) - (gridY * GRID_SIZE * COS_ISO);
      const y = (gridX * GRID_SIZE * SIN_ISO) + (gridY * GRID_SIZE * SIN_ISO);
      const isFlipped = Math.random() > 0.5;

      const isAsciiShape = index < asciiShapes;
      const shapePos = { x, y };
      const shapeSize = {
        width: size * COS_ISO,
        height: size * SIN_ISO + depth
      };

      const overlaps = isAsciiShape && existingShapes.some(existing =>
        shapesOverlap(shapePos, shapeSize, existing.position, existing.size)
      );

      if (!overlaps || attempts > 50) {
        const basePoints = isFlipped ? [
          [x, y],
          [x - size * COS_ISO, y + size * SIN_ISO],
          [x - size * COS_ISO, y + size * SIN_ISO + depth],
          [x, y + depth]
        ] : [
          [x, y],
          [x + size * COS_ISO, y + size * SIN_ISO],
          [x + size * COS_ISO, y + size * SIN_ISO + depth],
          [x, y + depth]
        ];

        const points = basePoints
          .map(point => point.map(coord => coord + GRID_SIZE * 2).join(','))
          .join(' ');

        const { points: asciiPoints, chars: asciiChars } = isAsciiShape || showAscii ?
          generateAsciiPoints(x, y, size * COS_ISO, size * SIN_ISO + depth, isFlipped)
          : { points: [], chars: [] };

        shape = {
          points,
          color: isAsciiShape ? 'none' : COLORS[Math.floor(Math.random() * COLORS.length)],
          id: Math.random().toString(36).substr(2, 9),
          zIndex: gridX + gridY,
          isAsciiShape,
          asciiPoints,
          asciiChars,
          position: shapePos,
          size: shapeSize
        };
      }

      attempts++;
    } while (!shape);

    return shape;
  };

  const generateShapes = () => {
    const newShapes = [];
    for (let i = 0; i < numShapes; i++) {
      newShapes.push(generateRandomShape(i, newShapes));
    }
    newShapes.sort((a, b) => a.zIndex - b.zIndex);
    setShapes(newShapes);
  };

  useEffect(() => {
    generateShapes();
  }, [numShapes, minSize, maxSize, timestamp, randomizeAscii, asciiShapes]);

  const viewBoxSize = GRID_WIDTH * GRID_SIZE * 2;

  return (
    <div className="isometric-grid">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {shapes.map(shape => (
          <g key={shape.id}>
            <polygon
              points={shape.points}
              fill={shape.color}
            />
            {shape.asciiPoints && shape.asciiPoints.length > 0 &&
              shape.asciiPoints.map((point, i) => (
                <text
                  key={i}
                  x={point[0] + GRID_SIZE * 2}
                  y={point[1] + GRID_SIZE * 2}
                  fontFamily="monospace"
                  fontSize={GRID_SIZE / asciiDensity}
                  fill={shape.isAsciiShape ? '#000' : '#666'}
                  style={{ userSelect: 'none' }}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {shape.isAsciiShape ? shape.asciiChars[i] : '+'}
                </text>
              ))}
          </g>
        ))}
      </svg>
    </div>
  );
});

export default IsometricGrid;