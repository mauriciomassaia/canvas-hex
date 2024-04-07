import { defineConfig } from 'vite'

export default defineConfig(() =>({
  // config options
  build: {
    outDir: 'docs/',
  },
  base: '/canvas-hex/'
}));
