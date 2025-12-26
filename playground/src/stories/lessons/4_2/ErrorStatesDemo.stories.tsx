import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import ErrorStatesDemo from '@lessons/4_2/ErrorStatesDemo';

const meta: Meta<typeof ErrorStatesDemo> = {
  title: 'Lessons/4.2 Loading Error Empty States/ErrorStatesDemo',
  component: ErrorStatesDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates error handling patterns: error types (network, server, not found, auth), inline errors, and toast notifications.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows the Error Types tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify tab buttons are present
    expect(canvas.getByRole('button', { name: 'Error Types' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Inline Errors' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Toast Errors' })).toBeInTheDocument();

    // Error Types tab should be selected by default
    const errorTypesButton = canvas.getByRole('button', { name: 'Error Types' });
    expect(errorTypesButton).toHaveClass('btn-primary');

    // Verify error type cards are present
    expect(canvas.getByText('Connection Lost')).toBeInTheDocument();
    expect(canvas.getByText('Server Error')).toBeInTheDocument();
    expect(canvas.getByText('Not Found')).toBeInTheDocument();
    expect(canvas.getByText('Access Denied')).toBeInTheDocument();
  },
};

/**
 * Tests triggering a network error
 */
export const TriggerNetworkError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the network error trigger button
    const networkCard = canvas.getByText('Connection Lost').closest('.card') as HTMLElement | null;
    if (!networkCard) throw new Error('Network card not found');

    const triggerButton = within(networkCard).getByRole('button', { name: /Trigger Error/ });
    await userEvent.click(triggerButton);

    // Should show the error state with retry button
    await waitFor(() => {
      expect(within(networkCard).getByRole('button', { name: /Retry/ })).toBeInTheDocument();
    });

    // Click retry to recover
    const retryButton = within(networkCard).getByRole('button', { name: /Retry/ });
    await userEvent.click(retryButton);

    // Should show "Retrying..." and then recover
    await waitFor(
      () => {
        expect(
          within(networkCard).getByRole('button', { name: /Trigger Error/ })
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests the inline errors tab with form validation
 */
export const InlineErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Inline Errors tab
    const inlineButton = canvas.getByRole('button', { name: 'Inline Errors' });
    await userEvent.click(inlineButton);

    // Verify inline tab is selected
    await waitFor(() => {
      expect(inlineButton).toHaveClass('btn-primary');
    });

    // Find the email input
    const emailInput = canvas.getByPlaceholderText('Enter your email');
    expect(emailInput).toBeInTheDocument();

    // Type an invalid email (without @)
    await userEvent.type(emailInput, 'invalidemail');

    // Should show inline error
    await waitFor(() => {
      expect(canvas.getByText('Please enter a valid email address')).toBeInTheDocument();
    });

    // Clear and type valid email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'valid@email.com');

    // Error should disappear
    await waitFor(() => {
      expect(canvas.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests the toast errors tab
 */
export const ToastErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Toast Errors tab
    const toastButton = canvas.getByRole('button', { name: 'Toast Errors' });
    await userEvent.click(toastButton);

    // Verify toast tab is selected
    await waitFor(() => {
      expect(toastButton).toHaveClass('btn-primary');
    });

    // Click trigger toast error button
    const triggerButton = canvas.getByRole('button', { name: 'Trigger Toast Error' });
    await userEvent.click(triggerButton);

    // Should show toast error message
    await waitFor(() => {
      expect(canvas.getByText('Failed to save changes. Please try again.')).toBeInTheDocument();
    });

    // Find and click dismiss button (the X button in the toast)
    const dismissButton = canvas.getByRole('button', { name: '' }); // X button
    await userEvent.click(dismissButton);

    // Toast should be dismissed
    await waitFor(() => {
      expect(
        canvas.queryByText('Failed to save changes. Please try again.')
      ).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests triggering a server error
 */
export const TriggerServerError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the server error trigger button
    const serverCard = canvas.getByText('Server Error').closest('.card') as HTMLElement | null;
    if (!serverCard) throw new Error('Server card not found');

    const triggerButton = within(serverCard).getByRole('button', { name: /Trigger Error/ });
    await userEvent.click(triggerButton);

    // Should show the error state with "Try Again" button
    await waitFor(() => {
      expect(within(serverCard).getByRole('button', { name: /Try Again/ })).toBeInTheDocument();
    });
  },
};

/**
 * Verifies error handling best practices section
 */
export const BestPractices: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify best practices section
    expect(canvas.getByText('Error Handling Best Practices')).toBeInTheDocument();
    expect(canvas.getByText(/Explain what went wrong in plain language/)).toBeInTheDocument();
    expect(canvas.getByText(/Provide a clear action/)).toBeInTheDocument();
    expect(canvas.getByText(/Don't show raw error messages/)).toBeInTheDocument();
  },
};
