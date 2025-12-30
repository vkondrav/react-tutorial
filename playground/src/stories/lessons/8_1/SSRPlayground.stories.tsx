import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import SSRPlayground from '@lessons/8_1/SSRPlayground';

const meta: Meta<typeof SSRPlayground> = {
  title: 'Lessons/8.1/SSRPlayground',
  component: SSRPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Live SSR demo embedded in an iframe. Note: Requires SSR server to be running (npm run ssr:dev).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows setup instructions and controls
 * Note: The iframe won't load in Storybook since the SSR server isn't running
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show setup instructions
    expect(canvasElement.textContent).toContain('Setup Required');
    expect(canvasElement.textContent).toContain('npm run ssr:dev');

    // Should show control buttons
    expect(canvas.getByRole('button', { name: /Refresh/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Show Tips/i })).toBeInTheDocument();

    // Should show Open in New Tab link
    expect(canvas.getByRole('link', { name: /Open in New Tab/i })).toBeInTheDocument();
  },
};

/**
 * Shows the tips section
 */
export const ShowsTips: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Show Tips button
    const tipsButton = canvas.getByRole('button', { name: /Show Tips/i });
    const { userEvent } = await import('storybook/test');
    await userEvent.click(tipsButton);

    // Should show tips
    expect(canvasElement.textContent).toContain('How to Verify SSR');
    expect(canvasElement.textContent).toContain('View Page Source');
    expect(canvasElement.textContent).toContain('Disable JavaScript');
  },
};

/**
 * Verifies key points are shown
 */
export const ShowsKeyPoints: Story = {
  play: async ({ canvasElement }) => {
    // Should show key points
    expect(canvasElement.textContent).toContain('Instant Content');
    expect(canvasElement.textContent).toContain('SEO Ready');
    expect(canvasElement.textContent).toContain('Hydration');
  },
};

/**
 * Verifies browser chrome is shown
 */
export const ShowsBrowserChrome: Story = {
  play: async ({ canvasElement }) => {
    // Should show browser chrome
    expect(canvasElement.textContent).toContain('localhost:5173/ssr-demo');
    expect(canvasElement.textContent).toContain('SSR');
  },
};
