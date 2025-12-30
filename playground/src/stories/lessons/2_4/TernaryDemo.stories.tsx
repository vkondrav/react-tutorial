import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import TernaryDemo from '@lessons/2_4/TernaryDemo';

const meta: Meta<typeof TernaryDemo> = {
  title: 'Lessons/2.4/TernaryDemo',
  component: TernaryDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Deep dive into ternary operator usage with theme toggle and user status examples.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - light theme
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show Light button (default state)
    expect(canvas.getByRole('button', { name: /Light/i })).toBeInTheDocument();

    // Should show sunny message
    expect(canvasElement.textContent).toContain('Bright and sunny!');

    // Should show online status by default
    expect(canvasElement.textContent).toContain('Available');
  },
};

/**
 * Tests theme toggle between light and dark
 */
export const ToggleTheme: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click to switch to dark
    await userEvent.click(canvas.getByRole('button', { name: /Light/i }));

    // Should now show Dark button
    expect(canvas.getByRole('button', { name: /Dark/i })).toBeInTheDocument();

    // Should show dark mode message
    expect(canvasElement.textContent).toContain('Easy on the eyes!');

    // Toggle back to light
    await userEvent.click(canvas.getByRole('button', { name: /Dark/i }));
    expect(canvasElement.textContent).toContain('Bright and sunny!');
  },
};

/**
 * Tests switching between all user statuses
 */
export const SwitchUserStatus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click away button
    await userEvent.click(canvas.getByRole('button', { name: /^away$/i }));
    expect(canvasElement.textContent).toContain('Away');

    // Click busy button
    await userEvent.click(canvas.getByRole('button', { name: /^busy$/i }));
    expect(canvasElement.textContent).toContain('Do not disturb');

    // Click offline button
    await userEvent.click(canvas.getByRole('button', { name: /^offline$/i }));
    expect(canvasElement.textContent).toContain('Offline');

    // Back to online
    await userEvent.click(canvas.getByRole('button', { name: /^online$/i }));
    expect(canvasElement.textContent).toContain('Available');
  },
};

/**
 * Shows the nested ternary warning
 */
export const ShowsNestedTernaryWarning: Story = {
  play: async ({ canvasElement }) => {
    // Should show warning about nested ternaries
    expect(canvasElement.textContent).toContain('Watch Out for Nested Ternaries');
    expect(canvasElement.textContent).toContain('hard to read');
  },
};
