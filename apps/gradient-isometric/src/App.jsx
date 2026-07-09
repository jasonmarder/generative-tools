import React, { useState, useRef } from 'react';
import IsometricGrid from './components/IsometricGrid';
import Controls from './components/Controls';
import './App.css';

function App() {
  const [settings, setSettings] = useState({
    numShapes: 7,
    minSize: 2,
    maxSize: 3,
    showAscii: false,
    randomizeAscii: false,
    asciiShapes: 0,
    asciiDensity: 8,
    timestamp: Date.now()
  });

  const gridRef = useRef();

  const handleSettingsChange = (updates) => {
    setSettings(prev => ({
      ...prev,
      ...updates,
      timestamp: Date.now() // Update timestamp to trigger regeneration
    }));
  };

  const handleGenerateShapes = () => {
    setSettings(prev => ({
      ...prev,
      timestamp: Date.now()
    }));
  };

  const handleExportSvg = () => {
    if (gridRef.current && gridRef.current.exportSVG) {
      gridRef.current.exportSVG();
    }
  };

  return (
    <div className="app-container">
      <div className="controls-panel">
        <Controls
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onGenerateShapes={handleGenerateShapes}
          onExportSvg={handleExportSvg}
        />
      </div>
      <div className="preview-window">
        <IsometricGrid
          ref={gridRef}
          {...settings}
        />
      </div>
    </div>
  );
}

export default App;