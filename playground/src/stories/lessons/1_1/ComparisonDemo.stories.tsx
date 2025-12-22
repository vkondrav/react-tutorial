import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import ComparisonDemo from '@lessons/1_1/ComparisonDemo';

const meta: Meta<typeof ComparisonDemo> = {
  title: 'Lessons/1.1 What is React/ComparisonDemo',
  component: ComparisonDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An interactive demo comparing imperative (vanilla JS) and declarative (React) programming approaches. Shows side-by-side code comparison and includes an interactive counter.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to get the counter display element (the large bold number)
const getCounterDisplay = (canvas: ReturnType<typeof within>) => {
  // The counter is in a div with text-3xl font-bold classes
  const buttons = canvas.getAllByRole('button');
  // The counter display is the sibling element before the buttons container
  const incrementButton = buttons.find((b: HTMLElement) => b.textContent === '+');
  const buttonsContainer = incrementButton?.parentElement;
  const counterDisplay = buttonsContainer?.previousElementSibling;
  return counterDisplay;
};

/**
 * The default view showing the imperative vs declarative code comparison
 * along with an interactive counter demo.
 */
export const Default: Story = {};

/**
 * Tests the increment button increases the counter.
 */
export const IncrementCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the increment button (the one with +)
    const incrementButton = canvas.getByRole('button', { name: '+' });

    // Get counter display
    const counterDisplay = getCounterDisplay(canvas);
    expect(counterDisplay?.textContent).toBe('0');

    // Click increment
    await userEvent.click(incrementButton);
    expect(counterDisplay?.textContent).toBe('1');

    // Click again
    await userEvent.click(incrementButton);
    expect(counterDisplay?.textContent).toBe('2');
  },
};

/**
 * Tests the decrement button decreases the counter.
 */
export const DecrementCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const decrementButton = canvas.getByRole('button', { name: '−' });
    const counterDisplay = getCounterDisplay(canvas);

    // Click decrement from 0
    await userEvent.click(decrementButton);
    expect(counterDisplay?.textContent).toBe('-1');

    // Click again
    await userEvent.click(decrementButton);
    expect(counterDisplay?.textContent).toBe('-2');
  },
};

/**
 * Tests the reset button resets the counter to zero.
 */
export const ResetCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const incrementButton = canvas.getByRole('button', { name: '+' });
    const resetButton = canvas.getByRole('button', { name: 'Reset' });
    const counterDisplay = getCounterDisplay(canvas);

    // Increment a few times
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    expect(counterDisplay?.textContent).toBe('3');

    // Reset
    await userEvent.click(resetButton);
    expect(counterDisplay?.textContent).toBe('0');
  },
};

/**
 * The same component displayed in a wider container to better show
 * the side-by-side code comparison.
 */
export const WideView: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto">
        <Story />
      </div>
    ),
  ],
};
