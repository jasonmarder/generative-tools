# Generative Tools

Eight internal brand generators collected behind one small, consistent Toolcraft-style dock.

## Tools

- chainguard block
- fortastra rings
- Gradient isometric
- Groq circuit
- Groq circle shader
- Runlayer hero
- Runlayer particle
- Tachyon burst

Each generator runs as an isolated, same-origin app under `public/tools`. The host only handles navigation, so each tool keeps its original rendering and controls while sharing a single entry point.

Editable project sources live under `apps`. Production snapshots live under `public/tools`, which keeps the combined host fast and prevents the tools' different frameworks and dependency versions from interfering with one another. Runlayer Hero is the one exception: its original folder only contained a compiled build, so its editable source was not available to import.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```

The build uses relative asset paths, so the generated `dist` directory can be served from a root domain or a subdirectory such as GitHub Pages.

## Repository layout

```text
apps/          Editable source projects
public/tools/  Production snapshots loaded by the host
src/           Shared dock and navigation shell
```

## Dock behavior

The bottom pill keeps the current tool visible and expands upward from its arrow. It supports mouse, touch, Escape, arrow keys, Home/End, browser history, deep links via `?tool=<slug>`, and `prefers-reduced-motion`.
