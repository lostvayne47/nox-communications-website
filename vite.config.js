import { defineConfig } from 'vite';
export default defineConfig({ esbuild: { jsx: 'automatic' }, preview: { port: 4173, strictPort: true } });
