import { defineConfig } from 'vite'

// Serve the plain demo from src/demo during `pnpm dev`
export default defineConfig({
  root: 'src/demo',
  server: {
    port: 5173,
    open: false
  },
  build: {
    outDir: '../../dist-demo',
    emptyOutDir: true
  }
})
