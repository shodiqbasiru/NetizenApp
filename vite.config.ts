import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensures output directory is correct
  },
  base: '/', // Set this to '/' unless deploying to a subdirectory
});
