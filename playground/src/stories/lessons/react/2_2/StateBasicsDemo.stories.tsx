import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import StateBasicsDemo from '@lessons/react/2_2/StateBasicsDemo';

const meta: Meta<typeof StateBasicsDemo> = {
  title: 'Lessons/react-2.2/StateBasicsDemo',
  component: StateBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Introduction to useState - demonstrates state changes with an interactive counter.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with counter starting at 0
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show counter starting at 0 (look for the large display)
    const counterDisplay = canvasElement.querySelector('.text-7xl');
    expect(counterDisplay?.textContent).toBe('0');

    // Should have increment, decrement, and reset buttons
    expect(canvas.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  },
};

/**
 * Tests incrementing the counter
 */
export const IncrementCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find increment button (the one with +)
    const buttons = canvas.getAllByRole('button');
    const incrementButton = buttons.find((btn) =>
      btn.querySelector('svg')?.parentElement?.classList.contains('btn-success')
    );

    expect(incrementButton).toBeTruthy();

    // Click increment
    await userEvent.click(incrementButton!);
    const counterDisplay = canvasElement.querySelector('.text-7xl');
    expect(counterDisplay?.textContent).toBe('1');

    // Click again
    await userEvent.click(incrementButton!);
    expect(counterDisplay?.textContent).toBe('2');
  },
};

/**
 * Tests decrementing the counter
 */
export const DecrementCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find decrement button (the one with -)
    const buttons = canvas.getAllByRole('button');
    const decrementButton = buttons.find((btn) => btn.classList.contains('btn-error'));

    expect(decrementButton).toBeTruthy();

    // Click decrement
    await userEvent.click(decrementButton!);
    expect(canvas.getByText('-1')).toBeInTheDocument();

    // Click again
    await userEvent.click(decrementButton!);
    expect(canvas.getByText('-2')).toBeInTheDocument();
  },
};

/**
 * Tests the reset button
 */
export const ResetCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const buttons = canvas.getAllByRole('button');
    const incrementButton = buttons.find((btn) => btn.classList.contains('btn-success'));
    const resetButton = canvas.getByRole('button', { name: 'Reset' });

    // Increment a few times
    await userEvent.click(incrementButton!);
    await userEvent.click(incrementButton!);
    await userEvent.click(incrementButton!);
    const counterDisplay = canvasElement.querySelector('.text-7xl');
    expect(counterDisplay?.textContent).toBe('3');

    // Reset
    await userEvent.click(resetButton);
    expect(counterDisplay?.textContent).toBe('0');
  },
};

/**
 * Tests toggling code visibility
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Code should be visible by default (button says "Hide Code")
    expect(canvas.getByRole('button', { name: /Hide Code/ })).toBeInTheDocument();

    // Should see anatomy explanation cards
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('setCount');
    expect(bodyText).toContain('useState');

    // Click to hide code
    const toggleButton = canvas.getByRole('button', { name: /Hide Code/ });
    await userEvent.click(toggleButton);

    // Code should be hidden (button now says "Show Code")
    expect(canvas.getByRole('button', { name: /Show Code/ })).toBeInTheDocument();

    // Click to show again
    const showButton = canvas.getByRole('button', { name: /Show Code/ });
    await userEvent.click(showButton);

    // Code should be visible again (button says "Hide Code")
    expect(canvas.getByRole('button', { name: /Hide Code/ })).toBeInTheDocument();
  },
};

/**
 * Tests increment then decrement
 */
export const IncrementThenDecrement: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const buttons = canvas.getAllByRole('button');
    const incrementButton = buttons.find((btn) => btn.classList.contains('btn-success'));
    const decrementButton = buttons.find((btn) => btn.classList.contains('btn-error'));

    const counterDisplay = canvasElement.querySelector('.text-7xl');

    // Increment
    await userEvent.click(incrementButton!);
    await userEvent.click(incrementButton!);
    expect(counterDisplay?.textContent).toBe('2');

    // Decrement
    await userEvent.click(decrementButton!);
    expect(counterDisplay?.textContent).toBe('1');

    // Decrement below zero
    await userEvent.click(decrementButton!);
    await userEvent.click(decrementButton!);
    expect(counterDisplay?.textContent).toBe('-1');
  },
};
