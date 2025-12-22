import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import HMRDemo from '@lessons/1_2/HMRDemo';

const meta: Meta<typeof HMRDemo> = {
  title: 'Lessons/1.2 Setting Up React App/HMRDemo',
  component: HMRDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Hot Module Replacement demo showing that state is preserved during updates. This demonstrates HMR behavior.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to get the counter display value
const getCounterValue = (canvasElement: HTMLElement): string => {
  const counterDisplay = canvasElement.querySelector('.text-3xl.font-bold');
  return counterDisplay?.textContent || '0';
};

/**
 * The default HMR demo with counter and input.
 */
export const Default: Story = {};

/**
 * Tests the counter increments correctly.
 */
export const IncrementCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const incrementButton = canvas.getByRole('button', { name: '+1' });

    // Initial count should be 0
    expect(getCounterValue(canvasElement)).toBe('0');

    // Click increment
    await userEvent.click(incrementButton);
    expect(getCounterValue(canvasElement)).toBe('1');

    // Click again
    await userEvent.click(incrementButton);
    expect(getCounterValue(canvasElement)).toBe('2');
  },
};

/**
 * Tests typing in the input field.
 */
export const TypeInInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText('Type here...');

    // Type text
    await userEvent.type(input, 'Hello HMR');

    // Input should have the value
    expect(input).toHaveValue('Hello HMR');
  },
};

/**
 * Tests that counter and input work independently.
 */
export const IndependentState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const incrementButton = canvas.getByRole('button', { name: '+1' });
    const input = canvas.getByPlaceholderText('Type here...');

    // Increment counter
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    expect(getCounterValue(canvasElement)).toBe('2');

    // Type in input (shouldn't affect counter)
    await userEvent.type(input, 'test');
    expect(input).toHaveValue('test');
    expect(getCounterValue(canvasElement)).toBe('2');
  },
};
