import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import ErrorDisplayDemo from '@lessons/react/5_2/ErrorDisplayDemo';

const meta: Meta<typeof ErrorDisplayDemo> = {
  title: 'Lessons/react-5.2/ErrorDisplayDemo',
  component: ErrorDisplayDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates different error display patterns: inline errors, error summary, and toast messages.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows Inline Errors tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify tab buttons are present
    expect(canvas.getByRole('button', { name: 'Inline Errors' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Error Summary' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Toast Messages' })).toBeInTheDocument();

    // Inline Errors should be selected by default
    const inlineButton = canvas.getByRole('button', { name: 'Inline Errors' });
    expect(inlineButton).toHaveClass('btn-primary');

    // Recommended badge should be visible
    expect(canvas.getByText('Recommended')).toBeInTheDocument();
  },
};

/**
 * Tests inline errors display
 */
export const InlineErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find inputs
    const nameInput = canvas.getByPlaceholderText('Your name');
    const emailInput = canvas.getByPlaceholderText('you@example.com');

    // Blur name field empty - should show error inline
    await userEvent.click(nameInput);
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getByText('Name is required')).toBeInTheDocument();
    });

    // Blur email with invalid value
    await userEvent.type(emailInput, 'notvalid');
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getByText('Valid email required')).toBeInTheDocument();
    });

    // Fix the errors
    await userEvent.type(nameInput, 'John');
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.queryByText('Name is required')).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests error summary display
 */
export const ErrorSummary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Error Summary tab
    await userEvent.click(canvas.getByRole('button', { name: 'Error Summary' }));

    // Wait for the summary badge to appear
    await waitFor(() => {
      const badges = canvas.getAllByText('Error Summary');
      expect(badges.length).toBe(2); // Button + badge
    });

    // Submit with empty fields
    await userEvent.click(canvas.getByRole('button', { name: /Submit.*Try with empty fields/ }));

    // Should show error summary alert
    await waitFor(() => {
      expect(canvas.getByText('Please fix the following errors:')).toBeInTheDocument();
      expect(canvas.getByText('Name is required')).toBeInTheDocument();
      expect(canvas.getByText('Valid email required')).toBeInTheDocument();
      expect(canvas.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });

    // Fill in valid data
    await userEvent.type(canvas.getByPlaceholderText('Your name'), 'John');
    await userEvent.type(canvas.getByPlaceholderText('you@example.com'), 'john@example.com');
    await userEvent.type(canvas.getByPlaceholderText('••••••••'), 'password123');

    // Submit again - alert should contain fewer errors (or none)
    await userEvent.click(canvas.getByRole('button', { name: /Submit/ }));

    await waitFor(() => {
      expect(canvas.queryByText('Name is required')).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests toast message display
 */
export const ToastMessages: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Toast Messages tab
    await userEvent.click(canvas.getByRole('button', { name: 'Toast Messages' }));

    // Wait for the toast badge to appear
    await waitFor(() => {
      const badges = canvas.getAllByText('Toast Messages');
      expect(badges.length).toBe(2); // Button + badge
    });

    // Submit with empty email
    await userEvent.click(canvas.getByRole('button', { name: 'Subscribe' }));

    // Should show toast with error
    await waitFor(() => {
      expect(canvas.getByText('Email is required')).toBeInTheDocument();
    });

    // Type invalid email
    const emailInput = canvas.getByPlaceholderText('you@example.com');
    await userEvent.type(emailInput, 'invalid');
    await userEvent.click(canvas.getByRole('button', { name: 'Subscribe' }));

    await waitFor(() => {
      expect(canvas.getByText('Please enter a valid email')).toBeInTheDocument();
    });

    // Type valid email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.click(canvas.getByRole('button', { name: 'Subscribe' }));

    // Should show success toast
    await waitFor(() => {
      expect(canvas.getByText('Subscribed successfully!')).toBeInTheDocument();
    });
  },
};

/**
 * Verifies best practice tip is displayed
 */
export const BestPracticeTip: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify best practice tip - use getAllByText since "inline errors" appears as button too
    expect(canvas.getByText('Best Practice:')).toBeInTheDocument();
    expect(canvas.getByText(/Users see exactly where the problem is/)).toBeInTheDocument();
  },
};
