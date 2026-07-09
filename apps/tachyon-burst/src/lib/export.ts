import type { BurstConfig, ExportPayload } from '../core/types';
import { serializeSvgElement } from './svg';

export type PngScale = 1 | 2 | 4;

export interface PngExportOptions {
  scale?: PngScale;
}

export const createExportPayload = (config: BurstConfig, presetName?: string): ExportPayload => ({
  version: 1,
  exportedAt: new Date().toISOString(),
  presetName,
  config,
});

export const stringifyExportPayload = (payload: ExportPayload) =>
  JSON.stringify(payload, null, 2);

export const parseExportPayload = (json: string): ExportPayload => {
  const payload = JSON.parse(json) as Partial<ExportPayload>;

  if (payload.version !== 1 || !payload.exportedAt || !payload.config) {
    throw new Error('Unsupported Burst Lab export payload');
  }

  return payload as ExportPayload;
};

export const serializeSvgForExport = (svg: SVGSVGElement) => serializeSvgElement(svg);

export const serializeSvgForPng = (svg: SVGSVGElement) => serializeSvgElement(svg);

export const exportSvgBlob = (svg: SVGSVGElement) =>
  new Blob([serializeSvgForExport(svg)], { type: 'image/svg+xml;charset=utf-8' });

const loadImage = async (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Unable to load SVG for PNG export'));
    image.src = url;
  });

const svgSize = (svg: SVGSVGElement) => {
  const viewBox = svg.viewBox.baseVal;

  if (viewBox.width > 0 && viewBox.height > 0) {
    return { width: viewBox.width, height: viewBox.height };
  }

  const width = Number(svg.getAttribute('width'));
  const height = Number(svg.getAttribute('height'));

  return {
    width: Number.isFinite(width) && width > 0 ? width : 1,
    height: Number.isFinite(height) && height > 0 ? height : 1,
  };
};

export const exportPngBlob = async (
  svg: SVGSVGElement,
  optionsOrScale: PngScale | PngExportOptions = 1,
) => {
  const options =
    typeof optionsOrScale === 'number' ? { scale: optionsOrScale } : optionsOrScale;
  const scale = options.scale ?? 1;
  const source = serializeSvgForPng(svg);
  const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  try {
    const image = await loadImage(url);
    const { width, height } = svgSize(svg);
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(width * scale);
    canvas.height = Math.ceil(height * scale);

    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Canvas rendering is unavailable');
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('PNG export failed'));
        }
      }, 'image/png');
    });
  } finally {
    URL.revokeObjectURL(url);
  }
};
