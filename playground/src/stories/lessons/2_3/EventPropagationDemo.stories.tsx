import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import EventPropagationDemo from '@lessons/2_3/EventPropagationDemo';

const meta: Meta<typeof EventPropagationDemo> = {
  title: 'Lessons/2.3/EventPropagationDemo',
  component: EventPropagationDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates event bubbling, stopPropagation(), and preventDefault() with interactive examples.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing propagation demos
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const bodyText = canvasElement.textContent || '';

    // Should show bubbling explanation
    expect(bodyText).toContain('Event Bubbling');
    expect(bodyText).toContain('PARENT');
    expect(bodyText).toContain('CHILD');

    // Should show code examples
    expect(bodyText).toContain('stopPropagation()');
    expect(bodyText).toContain('preventDefault()');
  },
};

/**
 * Tests event bubbling - clicking child also triggers parent
 */
export const EventBubbling: Story = {
  play: async ({ canvasElement }) => {
    // Find the child element in the bubbling demo (first one)
    const childDivs = canvasElement.querySelectorAll('.text-success');
    const childElement = childDivs[0]?.closest('.cursor-pointer');

    expect(childElement).toBeTruthy();
    await userEvent.click(childElement!);

    // Both parent and child should increment due to bubbling
    await waitFor(() => {
      const bodyText = canvasElement.textContent || '';
      expect(bodyText).toContain('Child clicked!');
      expect(bodyText).toContain('Parent clicked!');
    });
  },
};

/**
 * Tests stopPropagation - clicking child does NOT trigger parent
 */
export const StopPropagation: Story = {
  play: async ({ canvasElement }) => {
    // Find the child element with stopPropagation (the warning colored one)
    const stoppedChild = canvasElement.querySelector('.border-warning');

    expect(stoppedChild).toBeTruthy();
    await userEvent.click(stoppedChild!);

    // Only the stopped child should log, not the parent
    await waitFor(() => {
      const bodyText = canvasElement.textContent || '';
      expect(bodyText).toContain('propagation stopped');
    });
  },
};

/**
 * Tests form submission with preventDefault
 */
export const PreventDefault: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the submit button
    const submitButton = canvas.getByRole('button', { name: /Submit/i });
    await userEvent.click(submitButton);

    // Should log that default was prevented
    await waitFor(() => {
      const bodyText = canvasElement.textContent || '';
      expect(bodyText).toContain('Form submitted');
      expect(bodyText).toContain('default prevented');
    });
  },
};

/**
 * Tests the reset button
 */
export const ResetCounts: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the child to increment
    const childDivs = canvasElement.querySelectorAll('.text-success');
    const childElement = childDivs[0]?.closest('.cursor-pointer');
    await userEvent.click(childElement!);

    // Click reset
    const resetButton = canvas.getByRole('button', { name: /Reset Counts/i });
    await userEvent.click(resetButton);

    // Log should be cleared
    await waitFor(() => {
      expect(canvasElement.querySelector('.bg-base-200.rounded-lg')).toBeNull();
    });
  },
};

/**
 * Shows the key insight about bubbling
 */
export const ShowsKeyInsight: Story = {
  play: async ({ canvasElement }) => {
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('Remember');
    expect(bodyText).toContain('Events bubble up');
    expect(bodyText).toContain('child → parent');
  },
};
