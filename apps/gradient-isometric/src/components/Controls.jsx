import React from 'react';

function Chevron() {
  return (
    <svg className="chevron" width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
      <path d="M1 0.5 L7 4 L1 7.5 Z" fill="currentColor" />
    </svg>
  );
}

function Controls({ settings, onSettingsChange, onGenerateShapes, onExportSvg }) {
  const handleInputChange = (key, value) => {
    onSettingsChange({ [key]: value });
  };

  return (
    <details className="controls-panel" open>
      <summary className="panel-header">
        <span className="panel-header__title">
          <Chevron />
          <span>Isometric Generator</span>
        </span>
        <span className="panel-header__meta">Gradient</span>
      </summary>

      <div className="controls-content">
        <details className="control-section" open>
          <summary className="section-title">
            <Chevron />
            <span>Composition</span>
          </summary>
          <div className="section-body">
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
          </div>
        </details>

        <details className="control-section" open>
          <summary className="section-title">
            <Chevron />
            <span>ASCII Overlay</span>
          </summary>
          <div className="section-body">
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
          </div>
        </details>

        <details className="control-section control-section--last" open>
          <summary className="section-title">
            <Chevron />
            <span>Actions</span>
          </summary>
          <div className="section-body section-body--flush">
            <button type="button" className="function-row" onClick={onGenerateShapes}>
              Generate Shapes
            </button>
            <button type="button" className="function-row" onClick={onExportSvg}>
              Export SVG
            </button>
          </div>
        </details>
      </div>
    </details>
  );
}

export default Controls;
