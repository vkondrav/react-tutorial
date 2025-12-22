// Vite config for building the SSR client bundle
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-ssr',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        'ssr-client': path.resolve(dirname, 'src/ssr-client.tsx'),
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
  },
  resolve: {
    alias: {
      '@lessons': path.resolve(dirname, './src/lessons'),
      '@components': path.resolve(dirname, './src/lessons/components'),
    },
  },
});

