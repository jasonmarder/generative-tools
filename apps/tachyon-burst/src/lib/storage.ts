import type { BurstConfig, ExportPayload, SavedBurst } from '../core/types';

const STORAGE_VERSION = 1;
const SAVED_KEY = 'tachyon-burst-lab:saved';

export interface SaveBurstInput {
  name: string;
  config: BurstConfig;
  thumbnail: string;
}

export interface BurstStorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export function loadSavedBursts(storage = getBrowserStorage()): SavedBurst[] {
  return readCollection(SAVED_KEY, storage);
}

export function saveBurst(input: SaveBurstInput, storage = getBrowserStorage()): SavedBurst {
  const now = new Date().toISOString();
  const saved = loadSavedBursts(storage);
  const item: SavedBurst = {
    id: createId('saved'),
    name: input.name.trim() || 'Untitled burst',
    createdAt: now,
    updatedAt: now,
    thumbnail: input.thumbnail,
    config: input.config,
  };

  writeCollection(SAVED_KEY, [item, ...saved], storage);
  return item;
}

export function updateSavedBurst(
  id: string,
  input: Partial<SaveBurstInput>,
  storage = getBrowserStorage(),
): SavedBurst | null {
  const saved = loadSavedBursts(storage);
  const index = saved.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const current = saved[index];
  const updated: SavedBurst = {
    ...current,
    ...withoutUndefined(input),
    name: input.name?.trim() || current.name,
    updatedAt: new Date().toISOString(),
  };

  saved[index] = updated;
  writeCollection(SAVED_KEY, saved, storage);
  return updated;
}

export function deleteSavedBurst(id: string, storage = getBrowserStorage()): SavedBurst[] {
  const next = loadSavedBursts(storage).filter((item) => item.id !== id);
  writeCollection(SAVED_KEY, next, storage);
  return next;
}

export function createExportPayload(config: BurstConfig, presetName?: string): ExportPayload {
  return {
    version: STORAGE_VERSION,
    exportedAt: new Date().toISOString(),
    presetName,
    config,
  };
}

export function parseExportPayload(json: string): ExportPayload {
  const payload = JSON.parse(json) as ExportPayload;

  if (payload.version !== STORAGE_VERSION || !payload.config) {
    throw new Error('Unsupported Tachyon Burst Lab export.');
  }

  return payload;
}

function readCollection(key: string, storage: BurstStorageAdapter | null): SavedBurst[] {
  if (!storage) {
    return [];
  }

  const raw = storage.getItem(key);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter(isSavedBurst) : [];
  } catch {
    return [];
  }
}

function writeCollection(key: string, items: SavedBurst[], storage: BurstStorageAdapter | null): void {
  storage?.setItem(key, JSON.stringify(items));
}

function getBrowserStorage(): BurstStorageAdapter | null {
  return typeof window === 'undefined' ? null : window.localStorage;
}

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function isSavedBurst(value: unknown): value is SavedBurst {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<SavedBurst>;
  return Boolean(
    candidate.id &&
      candidate.name &&
      candidate.createdAt &&
      candidate.updatedAt &&
      candidate.thumbnail &&
      candidate.config,
  );
}

function withoutUndefined<T extends Record<string, unknown>>(value: T): Partial<T> {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined)) as Partial<T>;
}
