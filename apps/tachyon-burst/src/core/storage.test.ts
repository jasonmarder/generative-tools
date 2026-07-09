import { describe, expect, it } from 'vitest';

import { defaultBurstConfig } from './dialConfig';
import {
  deleteSavedBurst,
  loadSavedBursts,
  saveBurst,
} from '../lib/storage';

class MemoryStorage {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  removeItem(key: string) {
    this.values.delete(key);
  }
}

describe('burst storage', () => {
  it('saves and loads named bursts newest first', () => {
    const storage = new MemoryStorage();
    const first = saveBurst(
      { name: 'First', config: defaultBurstConfig, thumbnail: 'data:image/png;base64,first' },
      storage,
    );
    const second = saveBurst(
      { name: 'Second', config: { ...defaultBurstConfig, seed: 'second' }, thumbnail: 'data:image/png;base64,second' },
      storage,
    );

    expect(loadSavedBursts(storage).map((item) => item.id)).toEqual([second.id, first.id]);
    expect(loadSavedBursts(storage)[0]).toMatchObject({
      name: 'Second',
      thumbnail: 'data:image/png;base64,second',
      config: { seed: 'second' },
    });
  });

  it('deletes saved bursts by id', () => {
    const storage = new MemoryStorage();
    const keep = saveBurst({ name: 'Keep', config: defaultBurstConfig, thumbnail: 'keep' }, storage);
    const remove = saveBurst({ name: 'Remove', config: defaultBurstConfig, thumbnail: 'remove' }, storage);

    deleteSavedBurst(remove.id, storage);

    expect(loadSavedBursts(storage).map((item) => item.id)).toEqual([keep.id]);
  });

});
