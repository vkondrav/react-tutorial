/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@lessons': path.resolve(dirname, './src/lessons'),
      '@components': path.resolve(dirname, './src/lessons/components'),
    },
  },
  // Proxy SSR/RSC routes to the Express server
  server: {
    proxy: {
      // Forward /ssr-demo to Express on port 3001
      '/ssr-demo': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      // Forward /rsc-demo to Express on port 3001
      '/rsc-demo': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      // Forward SSR assets to Express
      '/ssr-assets': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  // Build configuration for SSR client bundle
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['react-icons'],
          query: ['@tanstack/react-query'],
          syntax: ['react-syntax-highlighter'],
        },
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          sequence: {
            concurrent: true,
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
