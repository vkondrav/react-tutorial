import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import LogicalAndDemo from '@lessons/react/2_4/LogicalAndDemo';

const meta: Meta<typeof LogicalAndDemo> = {
  title: 'Lessons/react-2.4/LogicalAndDemo',
  component: LogicalAndDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the logical AND (&&) short-circuit pattern for showing/hiding elements.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with 3 notifications
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show notification count of 3
    expect(canvasElement.textContent).toContain('3');

    // Should show User button (not admin)
    expect(canvas.getByRole('button', { name: /User/i })).toBeInTheDocument();

    // Should show No Error button
    expect(canvas.getByRole('button', { name: /No Error/i })).toBeInTheDocument();
  },
};

/**
 * Tests incrementing and decrementing notifications
 */
export const NotificationCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find increment/decrement buttons by their position in the component
    const buttons = canvas.getAllByRole('button');
    const decrementBtn = buttons[0]; // First button is decrement
    const incrementBtn = buttons[1]; // Second button is increment

    // Increment
    await userEvent.click(incrementBtn);
    expect(canvasElement.textContent).toContain('4');

    // Decrement twice
    await userEvent.click(decrementBtn);
    await userEvent.click(decrementBtn);
    expect(canvasElement.textContent).toContain('2');
  },
};

/**
 * Tests notification badge disappears at 0
 */
export const NotificationBadgeHidesAtZero: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get decrement button and click until 0
    const buttons = canvas.getAllByRole('button');
    const decrementBtn = buttons[0];

    // Click 3 times to get to 0
    await userEvent.click(decrementBtn);
    await userEvent.click(decrementBtn);
    await userEvent.click(decrementBtn);

    // Should show "All caught up!" message when all conditions are false/0
    expect(canvasElement.textContent).toContain('All caught up!');
  },
};

/**
 * Tests admin toggle shows admin panel
 */
export const ToggleAdmin: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click to enable admin
    await userEvent.click(canvas.getByRole('button', { name: /User/i }));

    // Should show Admin button now
    expect(canvas.getByRole('button', { name: /Admin/i })).toBeInTheDocument();

    // Should show ADMIN badge
    expect(canvasElement.textContent).toContain('ADMIN');

    // Should show Admin Panel
    expect(canvasElement.textContent).toContain('Admin Panel');
    expect(canvasElement.textContent).toContain('Secret admin controls');
  },
};

/**
 * Tests error toggle shows error message
 */
export const ToggleError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click to enable error
    await userEvent.click(canvas.getByRole('button', { name: /No Error/i }));

    // Should show Error button now
    expect(canvas.getByRole('button', { name: /^Error$/i })).toBeInTheDocument();

    // Should show error message
    expect(canvasElement.textContent).toContain('Something went wrong');
    expect(canvasElement.textContent).toContain('Please try again');
  },
};

/**
 * Shows the && gotcha warning about 0
 */
export const ShowsGotchaWarning: Story = {
  play: async ({ canvasElement }) => {
    // Should show explanation of why && works
    expect(canvasElement.textContent).toContain('Why && Works');
    expect(canvasElement.textContent).toContain('Gotcha');
    expect(canvasElement.textContent).toContain('0 &&');
  },
};
