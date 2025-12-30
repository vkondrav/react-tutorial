import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import UseMemoDemo from '@lessons/3_4/UseMemoDemo';

const meta: Meta<typeof UseMemoDemo> = {
  title: 'Lessons/3.4/UseMemoDemo',
  component: UseMemoDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates useMemo with an expensive calculation. Toggle memoization on/off to see the performance difference.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows expensive calculation demo
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Expensive Calculation Demo');

    // Should have controls
    expect(canvas.getByRole('slider')).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Light|Dark/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /useMemo/i })).toBeInTheDocument();

    // Should show results
    expect(canvasElement.textContent).toContain('Result');
    expect(canvasElement.textContent).toContain('Calculation Time');
  },
};

/**
 * Tests toggling useMemo on/off
 */
export const ToggleMemoization: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the memoization toggle
    const memoToggle = canvas.getByRole('button', { name: /useMemo/i });

    // Check initial state (should be OFF by default based on code)
    const initialText = memoToggle.textContent;

    // Toggle
    await userEvent.click(memoToggle);

    // State should change
    await waitFor(() => {
      expect(memoToggle.textContent).not.toBe(initialText);
    });
  },
};

/**
 * Tests dark/light toggle
 */
export const ToggleDarkMode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the dark/light toggle
    const themeToggle = canvas.getByRole('button', { name: /Light|Dark/i });

    // Toggle
    await userEvent.click(themeToggle);

    // Should show opposite mode
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Light|Dark/i })).toBeInTheDocument();
    });
  },
};

/**
 * Tests reset button
 */
export const ResetCalculations: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click reset
    await userEvent.click(canvas.getByRole('button', { name: /Reset/i }));

    // Total calculations should show a number
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Total calculations');
    });
  },
};

/**
 * Tests explanation tip
 */
export const ShowsTip: Story = {
  play: async ({ canvasElement }) => {
    // Should show tip
    expect(canvasElement.textContent).toContain('Try this');
    expect(canvasElement.textContent).toContain('dark/light toggle');
    expect(canvasElement.textContent).toContain('useMemo ON');
  },
};
