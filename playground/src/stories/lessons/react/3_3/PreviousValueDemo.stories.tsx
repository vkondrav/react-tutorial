import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import PreviousValueDemo from '@lessons/react/3_3/PreviousValueDemo';

const meta: Meta<typeof PreviousValueDemo> = {
  title: 'Lessons/react-3.3/PreviousValueDemo',
  component: PreviousValueDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the usePrevious custom hook pattern for tracking previous values of state.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows number and text examples
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Tracking Previous Values');

    // Should show both examples
    expect(canvasElement.textContent).toContain('Number Example');
    expect(canvasElement.textContent).toContain('Text Example');

    // Should have increment/decrement buttons
    expect(canvas.getAllByRole('button').length).toBeGreaterThan(0);

    // Should show initial state
    expect(canvasElement.textContent).toContain('Previous:');
  },
};

/**
 * Tests incrementing number and tracking previous
 */
export const IncrementNumber: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the + button (increment)
    const buttons = canvas.getAllByRole('button');
    const incrementBtn = buttons.find((btn) => btn.querySelector('svg'));

    // Initial value should be 0, previous should be —
    expect(canvasElement.textContent).toContain('—');

    // Click increment
    if (incrementBtn && incrementBtn.textContent === '') {
      // Find the + button more specifically
      const plusButtons = buttons.filter((btn) => {
        const svg = btn.querySelector('svg');
        return svg && btn.closest('.card')?.textContent?.includes('Number Example');
      });
      if (plusButtons[1]) {
        await userEvent.click(plusButtons[1]); // Second button is +
      }
    }

    // After first click, previous should show 0
    await waitFor(() => {
      expect(canvasElement.textContent).toMatch(/Previous:[\s\S]*0/);
    });
  },
};

/**
 * Tests decrementing shows direction indicator
 */
export const DirectionIndicator: Story = {
  play: async ({ canvasElement }) => {
    // Find buttons in number example section
    const numberSection = canvasElement.querySelector('.card.bg-base-300');
    const buttons = numberSection?.querySelectorAll('button') || [];

    // Click + to increment
    if (buttons[1]) {
      await userEvent.click(buttons[1] as HTMLButtonElement);
    }

    // Should show up indicator
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('↑');
    });

    // Click - to decrement
    if (buttons[0]) {
      await userEvent.click(buttons[0] as HTMLButtonElement);
    }

    // Should show down indicator
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('↓');
    });
  },
};

/**
 * Tests text input previous value
 */
export const TextPreviousValue: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the text input
    const textInput = canvas.getByDisplayValue('React');

    // Initial value is "React"
    expect(textInput).toHaveValue('React');

    // Type a new value
    await userEvent.clear(textInput);
    await userEvent.type(textInput, 'Vue');

    // Should show change indication
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Changed from');
    });
  },
};

/**
 * Tests how it works explanation
 */
export const ShowsHowItWorks: Story = {
  play: async ({ canvasElement }) => {
    // Should show how it works section
    expect(canvasElement.textContent).toContain('How it works');
    expect(canvasElement.textContent).toContain('component re-renders');
    expect(canvasElement.textContent).toContain('returns');
    expect(canvasElement.textContent).toContain('OLD value');
    expect(canvasElement.textContent).toContain('useEffect updates ref');
  },
};

/**
 * Tests usePrevious hook code is shown
 */
export const ShowsHookCode: Story = {
  play: async ({ canvasElement }) => {
    // Should show usePrevious hook section
    expect(canvasElement.textContent).toContain('usePrevious custom hook');
  },
};
