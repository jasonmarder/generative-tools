import { readFile, writeFile } from "node:fs/promises";
import * as THREE from "three";

const inputPath = process.argv[2] ?? "src/assets/coral.glb";
const outputPath = process.argv[3] ?? "src/assets/coral-points.bin";
const maxPoints = Number(process.argv[4] ?? 60000);

const COMPONENT_READERS = {
  5120: { size: 1, read: (view, offset) => view.getInt8(offset) },
  5121: { size: 1, read: (view, offset) => view.getUint8(offset) },
  5122: { size: 2, read: (view, offset) => view.getInt16(offset, true) },
  5123: { size: 2, read: (view, offset) => view.getUint16(offset, true) },
  5125: { size: 4, read: (view, offset) => view.getUint32(offset, true) },
  5126: { size: 4, read: (view, offset) => view.getFloat32(offset, true) },
};

const TYPE_COUNTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16,
};

const glb = await readFile(inputPath);
const { json, binary } = parseGlb(glb);
const points = [];
const scenes = json.scenes?.length ? json.scenes : [{ nodes: json.nodes?.map((_, index) => index) ?? [] }];
const scene = scenes[json.scene ?? 0] ?? scenes[0];

for (const nodeIndex of scene.nodes ?? []) {
  traverseNode(nodeIndex, new THREE.Matrix4());
}

const stride = Math.max(1, Math.ceil(points.length / maxPoints));
const selected = [];
for (let i = 0; i < points.length && selected.length < maxPoints; i += stride) {
  selected.push(points[i]);
}

const output = new Float32Array(selected.length * 3);
for (let i = 0; i < selected.length; i++) {
  output[i * 3 + 0] = selected[i].x;
  output[i * 3 + 1] = selected[i].y;
  output[i * 3 + 2] = selected[i].z;
}

await writeFile(outputPath, Buffer.from(output.buffer));
console.log(JSON.stringify({
  inputPath,
  outputPath,
  sourcePoints: points.length,
  bakedPoints: selected.length,
  bytes: output.byteLength,
}));

function traverseNode(nodeIndex, parentMatrix) {
  const node = json.nodes?.[nodeIndex];
  if (!node) return;

  const localMatrix = nodeMatrix(node);
  const worldMatrix = parentMatrix.clone().multiply(localMatrix);
  if (node.mesh !== undefined) collectMesh(node.mesh, worldMatrix);

  for (const child of node.children ?? []) {
    traverseNode(child, worldMatrix);
  }
}

function collectMesh(meshIndex, matrix) {
  const mesh = json.meshes?.[meshIndex];
  if (!mesh) return;

  for (const primitive of mesh.primitives ?? []) {
    const positionAccessorIndex = primitive.attributes?.POSITION;
    if (positionAccessorIndex === undefined) continue;
    const positions = readAccessor(positionAccessorIndex);
    for (let i = 0; i < positions.length; i += 3) {
      points.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]).applyMatrix4(matrix));
    }
  }
}

function nodeMatrix(node) {
  if (node.matrix) return new THREE.Matrix4().fromArray(node.matrix);

  const translation = new THREE.Vector3().fromArray(node.translation ?? [0, 0, 0]);
  const rotation = new THREE.Quaternion().fromArray(node.rotation ?? [0, 0, 0, 1]);
  const scale = new THREE.Vector3().fromArray(node.scale ?? [1, 1, 1]);
  return new THREE.Matrix4().compose(translation, rotation, scale);
}

function readAccessor(accessorIndex) {
  const accessor = json.accessors?.[accessorIndex];
  const bufferView = json.bufferViews?.[accessor?.bufferView];
  const reader = COMPONENT_READERS[accessor?.componentType];
  const itemSize = TYPE_COUNTS[accessor?.type];
  if (!accessor || !bufferView || !reader || !itemSize) return [];

  const byteOffset = (bufferView.byteOffset ?? 0) + (accessor.byteOffset ?? 0);
  const byteStride = bufferView.byteStride ?? reader.size * itemSize;
  const dataView = new DataView(binary.buffer, binary.byteOffset, binary.byteLength);
  const values = new Array(accessor.count * itemSize);

  for (let i = 0; i < accessor.count; i++) {
    const itemOffset = byteOffset + i * byteStride;
    for (let component = 0; component < itemSize; component++) {
      values[i * itemSize + component] = reader.read(dataView, itemOffset + component * reader.size);
    }
  }

  return values;
}

function parseGlb(buffer) {
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const magic = view.getUint32(0, true);
  const version = view.getUint32(4, true);
  if (magic !== 0x46546c67 || version !== 2) {
    throw new Error("Expected a binary glTF 2.0 file.");
  }

  let cursor = 12;
  let json = null;
  let binary = null;
  while (cursor < buffer.byteLength) {
    const chunkLength = view.getUint32(cursor, true);
    const chunkType = view.getUint32(cursor + 4, true);
    const chunk = buffer.subarray(cursor + 8, cursor + 8 + chunkLength);
    if (chunkType === 0x4e4f534a) json = JSON.parse(new TextDecoder().decode(chunk));
    if (chunkType === 0x004e4942) binary = chunk;
    cursor += 8 + chunkLength;
  }

  if (!json || !binary) throw new Error("GLB is missing JSON or binary chunk.");
  return { json, binary };
}
