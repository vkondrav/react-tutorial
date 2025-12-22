import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import EventBasicsDemo from '@lessons/2_3/EventBasicsDemo';

const meta: Meta<typeof EventBasicsDemo> = {
  title: 'Lessons/2.3 Events/EventBasicsDemo',
  component: EventBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Introduction to event handling - demonstrates click events and SyntheticEvent data.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with clickable button
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the click me button with count 0
    expect(canvas.getByRole('button', { name: /Click Me! \(0\)/ })).toBeInTheDocument();

    // Should have code toggle button
    expect(canvas.getByRole('button', { name: /Hide Code/ })).toBeInTheDocument();
  },
};

/**
 * Tests clicking the button and seeing event data
 */
export const ClickButton: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the button
    const clickButton = canvas.getByRole('button', { name: /Click Me! \(0\)/ });
    await userEvent.click(clickButton);

    // Button should update count
    expect(canvas.getByRole('button', { name: /Click Me! \(1\)/ })).toBeInTheDocument();

    // Event data should appear
    await waitFor(() => {
      const bodyText = canvasElement.textContent || '';
      expect(bodyText).toContain('LAST EVENT DATA');
      expect(bodyText).toContain('type');
      expect(bodyText).toContain('click');
    });
  },
};

/**
 * Tests multiple clicks increment the counter
 */
export const MultipleClicks: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const clickButton = canvas.getByRole('button', { name: /Click Me!/ });

    // Click multiple times
    await userEvent.click(clickButton);
    await userEvent.click(clickButton);
    await userEvent.click(clickButton);

    // Should show count of 3
    expect(canvas.getByRole('button', { name: /Click Me! \(3\)/ })).toBeInTheDocument();
  },
};

/**
 * Tests toggling code visibility
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Code should be visible by default
    const hideButton = canvas.getByRole('button', { name: /Hide Code/ });
    expect(hideButton).toBeInTheDocument();

    // Should see key points
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('onClick (camelCase)');
    expect(bodyText).toContain('Event Object');

    // Click to hide code
    await userEvent.click(hideButton);

    // Button should say "Show Code" now
    expect(canvas.getByRole('button', { name: /Show Code/ })).toBeInTheDocument();
  },
};

/**
 * Shows the common mistake warning
 */
export const ShowsCommonMistake: Story = {
  play: async ({ canvasElement }) => {
    // Should show the common mistake warning
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('Common mistake');
    expect(bodyText).toContain("Don't call the function immediately");
  },
};
