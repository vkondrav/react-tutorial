import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import ValidationRulesDemo from '@lessons/5_2/ValidationRulesDemo';

const meta: Meta<typeof ValidationRulesDemo> = {
  title: 'Lessons/5.2 Form Validation Patterns/ValidationRulesDemo',
  component: ValidationRulesDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates common validation rules: required, length, pattern (regex), and custom.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows Required rule tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify tab buttons are present
    expect(canvas.getByRole('button', { name: 'Required' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Length' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Pattern (Regex)' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Custom' })).toBeInTheDocument();

    // Required should be selected by default
    const requiredButton = canvas.getByRole('button', { name: 'Required' });
    expect(requiredButton).toHaveClass('btn-primary');
  },
};

/**
 * Tests Required validation rule
 */
export const RequiredRule: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify Required title
    expect(canvas.getByText('Required Field')).toBeInTheDocument();

    // Find the username input
    const usernameInput = canvas.getByPlaceholderText('Enter username...');

    // Focus and blur empty input - should show error
    await userEvent.click(usernameInput);
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getByText('This field is required')).toBeInTheDocument();
    });

    // Type something - error should disappear
    await userEvent.type(usernameInput, 'testuser');
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.queryByText('This field is required')).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests Length validation rule
 */
export const LengthRule: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Length tab
    await userEvent.click(canvas.getByRole('button', { name: 'Length' }));

    // Wait for title
    await waitFor(() => {
      expect(canvas.getByText('Length Constraints')).toBeInTheDocument();
    });

    // Find input with placeholder
    const usernameInput = canvas.getByPlaceholderText('3-20 characters...');

    // Type too short - should show error
    await userEvent.type(usernameInput, 'ab');
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getByText('Minimum 3 characters')).toBeInTheDocument();
    });

    // Type valid length
    await userEvent.clear(usernameInput);
    await userEvent.type(usernameInput, 'validuser');
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getByText('Valid length')).toBeInTheDocument();
    });

    // Character counter should be visible
    expect(canvas.getByText('9/20')).toBeInTheDocument();
  },
};

/**
 * Tests Pattern validation rule
 */
export const PatternRule: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Pattern tab
    await userEvent.click(canvas.getByRole('button', { name: 'Pattern (Regex)' }));

    // Wait for title
    await waitFor(() => {
      expect(canvas.getByText('Pattern Matching (Regex)')).toBeInTheDocument();
    });

    // Find email input
    const emailInput = canvas.getByPlaceholderText('you@example.com');

    // Type invalid email
    await userEvent.type(emailInput, 'notanemail');
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getByText('Invalid email format')).toBeInTheDocument();
    });

    // Type valid email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getByText('Valid email format')).toBeInTheDocument();
    });

    // Lightbulb tip should be visible
    expect(canvas.getByText(/Common patterns:/)).toBeInTheDocument();
  },
};

/**
 * Tests Custom validation rule (password strength)
 */
export const CustomRule: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Custom tab
    await userEvent.click(canvas.getByRole('button', { name: 'Custom' }));

    // Wait for title
    await waitFor(() => {
      expect(canvas.getByText('Custom Validation')).toBeInTheDocument();
    });

    // Find password input
    const passwordInput = canvas.getByPlaceholderText('Create a strong password...');

    // Type a weak password
    await userEvent.type(passwordInput, 'weak');

    // Should see strength indicators and rule list
    await waitFor(() => {
      expect(canvas.getByText('At least 8 characters')).toBeInTheDocument();
      expect(canvas.getByText('One uppercase letter')).toBeInTheDocument();
      expect(canvas.getByText('One lowercase letter')).toBeInTheDocument();
      expect(canvas.getByText('One number')).toBeInTheDocument();
      expect(canvas.getByText('One special character')).toBeInTheDocument();
    });

    // Type a strong password
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'Strong1!pwd');

    // All rules should pass (check marks)
    await waitFor(() => {
      // The strength bar should show all 5 bars filled
      const strengthBars = canvasElement.querySelectorAll('.bg-success.rounded-full');
      expect(strengthBars.length).toBe(5);
    });
  },
};
