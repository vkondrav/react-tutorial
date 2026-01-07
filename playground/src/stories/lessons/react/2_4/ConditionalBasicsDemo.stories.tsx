import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import ConditionalBasicsDemo from '@lessons/react/2_4/ConditionalBasicsDemo';

const meta: Meta<typeof ConditionalBasicsDemo> = {
  title: 'Lessons/react-2.4/ConditionalBasicsDemo',
  component: ConditionalBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Introduction to conditional rendering with ternary operator - shows login/logout state changes.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - logged out state
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show "Log In" button (logged out state)
    expect(canvas.getByRole('button', { name: /Log In/i })).toBeInTheDocument();

    // Should show isLoggedIn = false
    expect(canvasElement.textContent).toContain('isLoggedIn');
    expect(canvasElement.textContent).toContain('false');

    // Should show "Please log in" message
    expect(canvasElement.textContent).toContain('Please');
    expect(canvasElement.textContent).toContain('log in');
  },
};

/**
 * Tests logging in and seeing welcome message
 */
export const LogIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Log In button
    const loginButton = canvas.getByRole('button', { name: /Log In/i });
    await userEvent.click(loginButton);

    // Should now show "Log Out" button
    expect(canvas.getByRole('button', { name: /Log Out/i })).toBeInTheDocument();

    // Should show isLoggedIn = true
    expect(canvasElement.textContent).toContain('true');

    // Should show welcome message
    expect(canvasElement.textContent).toContain('Welcome back');
    expect(canvasElement.textContent).toContain('User!');
  },
};

/**
 * Tests logging in then out
 */
export const LogInAndOut: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Log in
    await userEvent.click(canvas.getByRole('button', { name: /Log In/i }));
    expect(canvasElement.textContent).toContain('Welcome back');

    // Log out
    await userEvent.click(canvas.getByRole('button', { name: /Log Out/i }));
    expect(canvasElement.textContent).toContain('Please');
    expect(canvasElement.textContent).toContain('log in');
  },
};

/**
 * Tests toggling code visibility
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Code should be visible by default
    const hideButton = canvas.getByRole('button', { name: /Hide Code/i });
    expect(hideButton).toBeInTheDocument();

    // Click to hide code
    await userEvent.click(hideButton);

    // Button should say "Show Code" now
    expect(canvas.getByRole('button', { name: /Show Code/i })).toBeInTheDocument();

    // Click to show code again
    await userEvent.click(canvas.getByRole('button', { name: /Show Code/i }));
    expect(canvas.getByRole('button', { name: /Hide Code/i })).toBeInTheDocument();
  },
};

/**
 * Shows explanation of how ternary works
 */
export const ShowsExplanation: Story = {
  play: async ({ canvasElement }) => {
    // Should show explanation
    expect(canvasElement.textContent).toContain('How it works');
    expect(canvasElement.textContent).toContain('ternary operator');
    expect(canvasElement.textContent).toContain('condition ? valueIfTrue : valueIfFalse');
  },
};
