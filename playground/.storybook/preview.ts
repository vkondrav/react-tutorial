import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/index.css';

initialize();

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        // daisyUI business theme base-100
        dark: { name: 'dark', value: '#1d232a' },

        light: { name: 'light', value: '#ffffff' },
      },
    },
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },

  // Enable MSW for all stories
  loaders: [mswLoader],

  initialGlobals: {
    backgrounds: {
      value: 'dark',
    },
  },
};

export default preview;
