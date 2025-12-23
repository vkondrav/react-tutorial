import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import CustomHookBasicsDemo from '@lessons/3_5/CustomHookBasicsDemo';

const meta: Meta<typeof CustomHookBasicsDemo> = {
  title: 'Lessons/3.5 Custom Hooks/CustomHookBasicsDemo',
  component: CustomHookBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the useCounter custom hook with two independent counters using different step values.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows two counters using the same custom hook
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('useCounter Hook in Action');

    // Should show both counters
    expect(canvasElement.textContent).toContain('Counter 1');
    expect(canvasElement.textContent).toContain('Counter 2');
    expect(canvasElement.textContent).toContain('step: 1');
    expect(canvasElement.textContent).toContain('step: 5');

    // Should have control buttons
    expect(canvas.getAllByRole('button', { name: /Reset/i }).length).toBe(2);
  },
};

/**
 * Tests Counter 1 increment/decrement (step: 1)
 */
export const Counter1Operations: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find Counter 1 card
    const counter1Section = canvasElement.querySelector('.card.bg-base-300');
    expect(counter1Section).toBeInTheDocument();

    // Increment Counter 1 (steps by 1)
    const incrementButtons = canvas.getAllByRole('button');
    // Find the + button in the first counter card (primary button)
    const counter1Increment = incrementButtons.find(
      (btn) =>
        btn.classList.contains('btn-primary') &&
        btn.closest('.card.bg-base-300') === counter1Section
    );

    if (counter1Increment) {
      await userEvent.click(counter1Increment);
      await userEvent.click(counter1Increment);
    }

    // Should show incremented value
    await waitFor(() => {
      expect(counter1Section?.textContent).toContain('2');
    });
  },
};

/**
 * Tests Counter 2 operations (step: 5)
 */
export const Counter2Operations: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find Counter 2 card (second bg-base-300 card)
    const counterCards = canvasElement.querySelectorAll('.card.bg-base-300');
    const counter2Section = counterCards[1];
    expect(counter2Section).toBeInTheDocument();

    // Initial value should be 10
    expect(counter2Section?.textContent).toContain('10');

    // Find increment button for Counter 2
    const buttons = canvas.getAllByRole('button');
    const counter2Increment = buttons.find(
      (btn) =>
        btn.classList.contains('btn-primary') &&
        btn.closest('.card.bg-base-300') === counter2Section
    );

    if (counter2Increment) {
      await userEvent.click(counter2Increment);
    }

    // Should be 15 after one click (step: 5)
    await waitFor(() => {
      expect(counter2Section?.textContent).toContain('15');
    });
  },
};

/**
 * Tests reset functionality
 */
export const ResetCounters: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click Reset buttons
    const resetButtons = canvas.getAllByRole('button', { name: /Reset/i });
    expect(resetButtons.length).toBe(2);

    // Click the first counter's increment a few times
    const counterCards = canvasElement.querySelectorAll('.card.bg-base-300');
    const counter1Section = counterCards[0];
    const buttons = canvas.getAllByRole('button');
    const counter1Increment = buttons.find(
      (btn) =>
        btn.classList.contains('btn-primary') &&
        btn.closest('.card.bg-base-300') === counter1Section
    );

    if (counter1Increment) {
      await userEvent.click(counter1Increment);
      await userEvent.click(counter1Increment);
      await userEvent.click(counter1Increment);
    }

    // Reset counter 1
    await userEvent.click(resetButtons[0]);

    // Should be back to 0
    await waitFor(() => {
      expect(counter1Section?.textContent).toContain('0');
    });
  },
};

/**
 * Tests code snippet is displayed
 */
export const ShowsCodeSnippet: Story = {
  play: async ({ canvasElement }) => {
    // Should show the custom hook code
    expect(canvasElement.textContent).toContain('The Custom Hook');
    expect(canvasElement.textContent).toContain('TypeScript');
  },
};
