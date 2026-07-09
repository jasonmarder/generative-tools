import { useEffect, useState } from 'react';

export interface PaletteEditorProps {
  palette: string[];
  onChangeColor: (index: number, color: string) => void;
  onRemoveColor: (index: number) => void;
  onAddColor: () => void;
}

/** Accepts `#rrggbb`, `rrggbb`, `#rgb`, or `rgb` (with/without #). Returns a
 *  normalized lowercase `#rrggbb`, or null when the value isn't a valid hex. */
function normalizeHex(value: string): string | null {
  const raw = value.trim().replace(/^#/, '');

  if (/^[0-9a-fA-F]{6}$/.test(raw)) {
    return `#${raw.toLowerCase()}`;
  }

  if (/^[0-9a-fA-F]{3}$/.test(raw)) {
    const [r, g, b] = raw;
    return `#${(r + r + g + g + b + b).toLowerCase()}`;
  }

  return null;
}

function SwatchRow({
  color,
  index,
  onChangeColor,
  onRemoveColor,
  removable,
}: {
  color: string;
  index: number;
  onChangeColor: (index: number, color: string) => void;
  onRemoveColor: (index: number) => void;
  removable: boolean;
}) {
  const [draft, setDraft] = useState(color);

  // Resync the field when the color changes from the outside (picker, randomize,
  // preset load) — but leave the user's text alone while they're editing it.
  useEffect(() => {
    setDraft((current) => (normalizeHex(current) === color ? current : color));
  }, [color]);

  const handleHexInput = (value: string) => {
    setDraft(value);
    const normalized = normalizeHex(value);
    if (normalized) {
      onChangeColor(index, normalized);
    }
  };

  const commit = (value: string) => {
    const normalized = normalizeHex(value);
    if (normalized) {
      onChangeColor(index, normalized);
      setDraft(normalized);
    } else {
      setDraft(color);
    }
  };

  return (
    <li className="swatch">
      <input
        className="swatch__chip"
        type="color"
        value={color}
        aria-label={`Color ${index + 1} swatch`}
        onChange={(event) => onChangeColor(index, event.target.value)}
      />
      <input
        className="swatch__hex"
        type="text"
        value={draft}
        spellCheck={false}
        autoComplete="off"
        aria-label={`Color ${index + 1} hex`}
        onChange={(event) => handleHexInput(event.target.value)}
        onBlur={(event) => commit(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.currentTarget.blur();
          }
        }}
      />
      <button
        type="button"
        className="swatch__remove"
        onClick={() => onRemoveColor(index)}
        disabled={!removable}
        aria-label={`Remove color ${index + 1}`}
        title="Remove color"
      >
        ×
      </button>
    </li>
  );
}

export function PaletteEditor({
  palette,
  onChangeColor,
  onRemoveColor,
  onAddColor,
}: PaletteEditorProps) {
  return (
    <section className="palette" aria-label="Palette">
      <div className="palette__head">
        <h2 className="palette__title">Palette</h2>
        <button
          type="button"
          className="palette__add"
          onClick={onAddColor}
          aria-label="Add color"
          title="Add color"
        >
          +
        </button>
      </div>
      <ul className="palette__list">
        {palette.map((color, index) => (
          <SwatchRow
            // Index-based key is intentional: rows are positional and a stable
            // identity keeps the hex field focused while editing.
            key={index}
            color={color}
            index={index}
            onChangeColor={onChangeColor}
            onRemoveColor={onRemoveColor}
            removable={palette.length > 1}
          />
        ))}
      </ul>
    </section>
  );
}
