import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import UseCallbackDemo from '@lessons/3_4/UseCallbackDemo';

const meta: Meta<typeof UseCallbackDemo> = {
  title: 'Lessons/3.4/UseCallbackDemo',
  component: UseCallbackDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates useCallback with React.memo components. Shows how stable function references prevent unnecessary re-renders.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows counter with memoized buttons
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('useCallback + React.memo Demo');

    // Should have toggle and buttons
    expect(canvas.getByRole('button', { name: /useCallback/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Update Other State/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Reset Counts/i })).toBeInTheDocument();

    // Should show count
    expect(canvasElement.textContent).toContain('Count');

    // Should show increment and decrement buttons with render counts
    expect(canvasElement.textContent).toContain('Increment');
    expect(canvasElement.textContent).toContain('Decrement');
    expect(canvasElement.textContent).toContain('Renders:');
  },
};

/**
 * Tests toggling useCallback on/off
 */
export const ToggleUseCallback: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the useCallback toggle
    const callbackToggle = canvas.getByRole('button', { name: /useCallback/i });
    const initialText = callbackToggle.textContent;

    // Toggle
    await userEvent.click(callbackToggle);

    // State should change
    await waitFor(() => {
      expect(callbackToggle.textContent).not.toBe(initialText);
    });
  },
};

/**
 * Tests incrementing the counter
 */
export const IncrementCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find increment button (inside the memoized component)
    const incrementBtn = canvas.getByRole('button', { name: /Increment/i });

    // Click increment
    await userEvent.click(incrementBtn);
    await userEvent.click(incrementBtn);

    // Count should increase
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('2');
    });
  },
};

/**
 * Tests decrementing the counter
 */
export const DecrementCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Increment first
    await userEvent.click(canvas.getByRole('button', { name: /Increment/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Increment/i }));

    // Then decrement
    await userEvent.click(canvas.getByRole('button', { name: /Decrement/i }));

    // Count should be 1
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('1');
    });
  },
};

/**
 * Tests updating other state
 */
export const UpdateOtherState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click update other state
    await userEvent.click(canvas.getByRole('button', { name: /Update Other State/i }));

    // Should show incremented other state count
    await waitFor(() => {
      expect(canvasElement.textContent).toMatch(/Update Other State \(\d+\)/);
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
    expect(canvasElement.textContent).toContain('Update Other State');
    expect(canvasElement.textContent).toContain('button render counts');
  },
};
