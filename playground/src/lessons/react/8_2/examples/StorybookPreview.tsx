// @ts-nocheck
// .storybook/preview.ts
import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/index.css'; // Import global styles

// Initialize MSW before stories load
initialize();

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1d232a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    layout: 'padded',
  },
  // Enable MSW for all stories
  loaders: [mswLoader],
};

export default preview;
