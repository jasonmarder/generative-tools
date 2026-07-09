export interface RandomSource {
  next(): number;
  range(min: number, max: number): number;
  int(min: number, max: number): number;
  pick<T>(items: readonly T[]): T;
  shuffle<T>(items: readonly T[]): T[];
  fork(label: string): RandomSource;
}

const FNV_OFFSET = 2166136261;
const FNV_PRIME = 16777619;

export function hashSeed(seed: string): number {
  let hash = FNV_OFFSET;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, FNV_PRIME);
  }

  return hash >>> 0;
}

export function createPrng(seed: string): RandomSource {
  let state = hashSeed(seed) || 0x9e3779b9;

  const source: RandomSource = {
    next() {
      state += 0x6d2b79f5;

      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    },

    range(min: number, max: number) {
      return min + source.next() * (max - min);
    },

    int(min: number, max: number) {
      return Math.floor(source.range(min, max + 1));
    },

    pick<T>(items: readonly T[]) {
      if (items.length === 0) {
        throw new Error('Cannot pick from an empty collection.');
      }

      return items[source.int(0, items.length - 1)];
    },

    shuffle<T>(items: readonly T[]) {
      const shuffled = [...items];

      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = source.int(0, index);
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
      }

      return shuffled;
    },

    fork(label: string) {
      return createPrng(`${seed}:${label}:${state >>> 0}`);
    },
  };

  return source;
}
