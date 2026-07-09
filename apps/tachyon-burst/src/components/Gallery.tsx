import type { SavedBurst } from '../core/types';

export interface GalleryProps {
  saved: SavedBurst[];
  onRestore: (item: SavedBurst) => void;
  onDeleteSaved: (id: string) => void;
}

export function Gallery({ saved, onRestore, onDeleteSaved }: GalleryProps) {
  if (saved.length === 0) {
    return <p className="saved-empty">No saved variations</p>;
  }

  return (
    <div className="saved-grid" aria-label="Saved variations">
      {saved.map((item) => (
        <article className="saved-card" key={item.id}>
          <button
            type="button"
            className="saved-card__img-btn"
            onClick={() => onRestore(item)}
            title={`Restore ${item.name} · ${formatGalleryDate(item.updatedAt)}`}
          >
            <img className="saved-card__img" src={item.thumbnail} alt="" loading="lazy" />
          </button>
          <div className="saved-card__bar">
            <span className="saved-card__name" title={item.name}>
              {item.name}
            </span>
            <button
              type="button"
              className="saved-card__del"
              onClick={() => onDeleteSaved(item.id)}
              aria-label={`Delete ${item.name}`}
            >
              ×
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function formatGalleryDate(timestamp: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp));
}
