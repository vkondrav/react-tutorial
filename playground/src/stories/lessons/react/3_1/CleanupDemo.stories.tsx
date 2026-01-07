import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import CleanupDemo from '@lessons/react/3_1/CleanupDemo';

const meta: Meta<typeof CleanupDemo> = {
  title: 'Lessons/react-3.1/CleanupDemo',
  component: CleanupDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates cleanup functions with timer and keyboard listener examples. Shows mount/unmount behavior.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - both demos unmounted
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Cleanup Functions Prevent Memory Leaks');

    // Should have mount buttons for both demos
    expect(canvas.getByRole('button', { name: /Mount Timer/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Mount Listener/i })).toBeInTheDocument();

    // Timer and listener should not be visible initially
    expect(canvasElement.textContent).not.toContain('Timer running');
    expect(canvasElement.textContent).not.toContain('Press any key');
  },
};

/**
 * Tests mounting and unmounting the timer
 */
export const TimerMountUnmount: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Mount the timer
    await userEvent.click(canvas.getByRole('button', { name: /Mount Timer/i }));

    // Timer should be running
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Timer running');
    });

    // Should show unmount button
    expect(canvas.getByRole('button', { name: /Unmount Timer/i })).toBeInTheDocument();

    // Wait a bit for timer to tick
    await new Promise((resolve) => setTimeout(resolve, 1100));

    // Timer should have incremented
    expect(canvasElement.textContent).toMatch(/[1-9]s/);

    // Unmount the timer
    await userEvent.click(canvas.getByRole('button', { name: /Unmount Timer/i }));

    // Timer should be gone
    await waitFor(() => {
      expect(canvasElement.textContent).not.toContain('Timer running');
    });

    // Mount button should be back
    expect(canvas.getByRole('button', { name: /Mount Timer/i })).toBeInTheDocument();
  },
};

/**
 * Tests mounting and unmounting the keyboard listener
 */
export const KeyboardListenerMountUnmount: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Mount the listener
    await userEvent.click(canvas.getByRole('button', { name: /Mount Listener/i }));

    // Listener should be active
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Press any key');
    });

    // Should show unmount button
    expect(canvas.getByRole('button', { name: /Unmount Listener/i })).toBeInTheDocument();

    // Unmount the listener
    await userEvent.click(canvas.getByRole('button', { name: /Unmount Listener/i }));

    // Listener should be gone
    await waitFor(() => {
      expect(canvasElement.textContent).not.toContain('Press any key');
    });
  },
};

/**
 * Tests when cleanup runs explanation
 */
export const ShowsCleanupTiming: Story = {
  play: async ({ canvasElement }) => {
    // Should show when cleanup runs
    expect(canvasElement.textContent).toContain('When Does Cleanup Run?');
    expect(canvasElement.textContent).toContain('Before Re-running Effect');
    expect(canvasElement.textContent).toContain('dependencies change');
    expect(canvasElement.textContent).toContain('On Component Unmount');
    expect(canvasElement.textContent).toContain('removed from the DOM');
  },
};

/**
 * Tests memory leak warning
 */
export const ShowsWarning: Story = {
  play: async ({ canvasElement }) => {
    // Should show warning
    expect(canvasElement.textContent).toContain('Memory Leak Warning');
    expect(canvasElement.textContent).toContain('Forgetting cleanup causes memory leaks');
    expect(canvasElement.textContent).toContain('slows down your app');
  },
};

/**
 * Tests that both demos can run simultaneously
 */
export const BothDemosRunning: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Mount timer
    await userEvent.click(canvas.getByRole('button', { name: /Mount Timer/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Timer running');
    });

    // Mount listener
    await userEvent.click(canvas.getByRole('button', { name: /Mount Listener/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Press any key');
    });

    // Both should be visible
    expect(canvasElement.textContent).toContain('Timer running');
    expect(canvasElement.textContent).toContain('Press any key');

    // Clean up - unmount both
    await userEvent.click(canvas.getByRole('button', { name: /Unmount Timer/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Unmount Listener/i }));
  },
};
