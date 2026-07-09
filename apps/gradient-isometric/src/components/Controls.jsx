import React from 'react';

function Controls({ settings, onSettingsChange, onGenerateShapes, onExportSvg }) {
  const handleInputChange = (key, value) => {
    onSettingsChange({ [key]: value });
  };

  return (
    <div className="controls-content">
      <header className="panel-header">
        <span>Isometric Generator</span>
        <span className="panel-header__meta">Gradient</span>
      </header>

      <section className="control-section">
        <h2>Composition</h2>
        <label className="field-row field-row--stacked">
          <span className="field-label">Shape count</span>
          <input
            type="number"
            min={1}
            value={settings.numShapes}
            onChange={(e) => handleInputChange('numShapes', parseInt(e.target.value))}
          />
        </label>

        <div className="range-pair" aria-label="Size range in grid units">
          <label className="field-row field-row--stacked">
            <span className="field-label"><span>Minimum size</span><output>{settings.minSize}</output></span>
            <input
              type="range"
              min={1}
              max={5}
              value={settings.minSize}
              onChange={(e) => handleInputChange('minSize', parseInt(e.target.value))}
            />
          </label>
          <label className="field-row field-row--stacked">
            <span className="field-label"><span>Maximum size</span><output>{settings.maxSize}</output></span>
            <input
              type="range"
              min={1}
              max={5}
              value={settings.maxSize}
              onChange={(e) => handleInputChange('maxSize', parseInt(e.target.value))}
            />
          </label>
        </div>
      </section>

      <section className="control-section">
        <h2>ASCII Overlay</h2>
        <label className="switch-row">
          <span>Show overlay</span>
          <input
            type="checkbox"
            checked={settings.showAscii}
            onChange={(e) => handleInputChange('showAscii', e.target.checked)}
          />
          <span className="switch" aria-hidden="true" />
        </label>

        <label className="switch-row">
          <span>Random characters</span>
          <input
            type="checkbox"
            checked={settings.randomizeAscii}
            onChange={(e) => handleInputChange('randomizeAscii', e.target.checked)}
          />
          <span className="switch" aria-hidden="true" />
        </label>

        <label className="field-row field-row--stacked">
          <span className="field-label">Character shapes</span>
          <input
            type="number"
            min={0}
            value={settings.asciiShapes}
            onChange={(e) => handleInputChange('asciiShapes', parseInt(e.target.value))}
          />
        </label>
        <p className="field-help">Available: + &nbsp;( )&nbsp; ∇ &nbsp;[ ]</p>

        <label className="field-row field-row--stacked">
          <span className="field-label"><span>Density</span><output>{settings.asciiDensity}</output></span>
          <input
            type="range"
            min={1}
            max={16}
            value={settings.asciiDensity}
            onChange={(e) => handleInputChange('asciiDensity', parseInt(e.target.value))}
          />
        </label>
      </section>

      <div className="panel-actions">
        <button
          className="primary-button"
          onClick={onGenerateShapes}
        >
          Generate Shapes
        </button>
        <button
          className="secondary-button"
          onClick={onExportSvg}
        >
          Export SVG
        </button>
      </div>
    </div>
  );
}

export default Controls;
