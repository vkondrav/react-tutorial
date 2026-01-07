import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import ContextWithStateDemo from '@lessons/react/3_2/ContextWithStateDemo';

const meta: Meta<typeof ContextWithStateDemo> = {
  title: 'Lessons/react-3.2/ContextWithStateDemo',
  component: ContextWithStateDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the Context + State pattern with a shared counter. Shows how multiple components can read and update state through context.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows shared counter
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Shared Counter with Context');

    // Should show CounterProvider
    expect(canvasElement.textContent).toContain('CounterProvider');
    expect(canvasElement.textContent).toContain('state lives here');

    // Should show components
    expect(canvasElement.textContent).toContain('DisplayCount');
    expect(canvasElement.textContent).toContain('ControlPanel');

    // Should have all control buttons
    expect(canvas.getByRole('button', { name: /Increment/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Decrement/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Reset/i })).toBeInTheDocument();

    // Initial count should be 0
    expect(canvasElement.textContent).toContain('0');
  },
};

/**
 * Tests incrementing the counter
 */
export const IncrementCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click increment multiple times
    await userEvent.click(canvas.getByRole('button', { name: /Increment/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Increment/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Increment/i }));

    // Count should be 3
    await waitFor(() => {
      const displayCount = canvas.getByText('3');
      expect(displayCount).toBeInTheDocument();
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
      const displayCount = canvas.getByText('1');
      expect(displayCount).toBeInTheDocument();
    });
  },
};

/**
 * Tests resetting the counter
 */
export const ResetCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Increment first
    await userEvent.click(canvas.getByRole('button', { name: /Increment/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Increment/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Increment/i }));

    // Reset button should be enabled
    const resetBtn = canvas.getByRole('button', { name: /Reset/i });
    expect(resetBtn).not.toBeDisabled();

    // Reset
    await userEvent.click(resetBtn);

    // Count should be 0
    await waitFor(() => {
      const displayCount = canvas.getByText('0');
      expect(displayCount).toBeInTheDocument();
    });
  },
};

/**
 * Tests reset button is disabled when count is 0
 */
export const ResetDisabledAtZero: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Reset button should be disabled at 0
    const resetBtn = canvas.getByRole('button', { name: /Reset/i });
    expect(resetBtn).toBeDisabled();
  },
};

/**
 * Tests toggling pattern code
 */
export const TogglePatternCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Code should be hidden initially
    expect(canvas.getByRole('button', { name: /Show Pattern/i })).toBeInTheDocument();

    // Click to show pattern
    await userEvent.click(canvas.getByRole('button', { name: /Show Pattern/i }));

    // Should show code sections
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('The Provider Pattern');
      expect(canvasElement.textContent).toContain('Custom Hook');
      expect(canvasElement.textContent).toContain('Best Practice');
      expect(canvasElement.textContent).toContain('Consumer Components');
    });
  },
};

/**
 * Tests key pattern explanation
 */
export const ShowsKeyPattern: Story = {
  play: async ({ canvasElement }) => {
    // Should show key pattern explanation
    expect(canvasElement.textContent).toContain('Key Pattern');
    expect(canvasElement.textContent).toContain('Provider holds the state');
    expect(canvasElement.textContent).toContain('read');
    expect(canvasElement.textContent).toContain('update');
  },
};
