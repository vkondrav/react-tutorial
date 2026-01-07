import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import PersistentValueDemo from '@lessons/react/3_3/PersistentValueDemo';

const meta: Meta<typeof PersistentValueDemo> = {
  title: 'Lessons/react-3.3/PersistentValueDemo',
  component: PersistentValueDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates storing interval ID in a ref for a timer that can be started, paused, and reset.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - timer at 00:00
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Timer with Ref');
    expect(canvasElement.textContent).toContain('Stores Interval ID');

    // Should show initial time
    expect(canvasElement.textContent).toContain('00:00');
    expect(canvasElement.textContent).toContain('Paused');

    // Should have Start and Reset buttons
    expect(canvas.getByRole('button', { name: /Start/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Reset/i })).toBeInTheDocument();

    // Reset should be disabled initially
    expect(canvas.getByRole('button', { name: /Reset/i })).toBeDisabled();

    // Should show interval ref status
    expect(canvasElement.textContent).toContain('intervalRef.current = null');
  },
};

/**
 * Tests starting the timer
 */
export const StartTimer: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start the timer
    await userEvent.click(canvas.getByRole('button', { name: /Start/i }));

    // Should show Running status
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Running');
    });

    // Button should now say Pause
    expect(canvas.getByRole('button', { name: /Pause/i })).toBeInTheDocument();

    // Interval ref should be active
    expect(canvasElement.textContent).toContain('[Active Interval]');

    // Wait for timer to tick
    await new Promise((resolve) => setTimeout(resolve, 1100));

    // Time should have incremented
    expect(canvasElement.textContent).toMatch(/00:0[1-9]/);
  },
};

/**
 * Tests pausing the timer
 */
export const PauseTimer: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start the timer
    await userEvent.click(canvas.getByRole('button', { name: /Start/i }));

    // Wait a bit
    await new Promise((resolve) => setTimeout(resolve, 1100));

    // Pause the timer
    await userEvent.click(canvas.getByRole('button', { name: /Pause/i }));

    // Should show Paused status
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Paused');
    });

    // Button should say Start again
    expect(canvas.getByRole('button', { name: /Start/i })).toBeInTheDocument();

    // Interval ref should be null
    expect(canvasElement.textContent).toContain('intervalRef.current = null');
  },
};

/**
 * Tests resetting the timer
 */
export const ResetTimer: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start the timer
    await userEvent.click(canvas.getByRole('button', { name: /Start/i }));

    // Wait for timer to tick
    await new Promise((resolve) => setTimeout(resolve, 1100));

    // Reset the timer
    await userEvent.click(canvas.getByRole('button', { name: /Reset/i }));

    // Should be back to 00:00 and paused
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('00:00');
      expect(canvasElement.textContent).toContain('Paused');
    });
  },
};

/**
 * Tests explanation message
 */
export const ShowsExplanation: Story = {
  play: async ({ canvasElement }) => {
    // Should show explanation
    expect(canvasElement.textContent).toContain('Why use a ref here?');
    expect(canvasElement.textContent).toContain('interval ID needs to persist');
    expect(canvasElement.textContent).toContain("shouldn't re-render");
  },
};
