# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# snippet for Claude

Reference to Isometric Grid Generator development:
anthropic.com/[chat_id]

Key Components:
1. IsometricGrid.jsx
- Generates isometric parallelograms with varied sizes
- Handles ASCII character overlay
- Uses predefined color palette: #0B815E, #22A4F5, #4152A4, #F1CB0F, #F36746, #F55885, #FCAADA
- ASCII characters: +, (, ), ∇, [, ]
- SVG export functionality

2. Controls.jsx
- Number of shapes control
- Size range sliders (min/max)
- ASCII overlay toggle
- ASCII randomization toggle
- ASCII density slider
- Generate/Export buttons

3. App.jsx
- State management for all settings
- Connects Controls and IsometricGrid
- Handles settings updates and regeneration

4. App.css
- Two-column layout (300px controls, flexible preview)
- Full viewport height preview window
- Control styling and button states

Last working state achieved: Functional isometric grid generator with ASCII overlays, varied shape sizes, and SVG export.