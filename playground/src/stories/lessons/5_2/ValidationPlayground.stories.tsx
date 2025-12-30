import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import ValidationPlayground from '@lessons/5_2/ValidationPlayground';

const meta: Meta<typeof ValidationPlayground> = {
  title: 'Lessons/5.2/ValidationPlayground',
  component: ValidationPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Complete signup form playground with email availability, password strength, age validation, and optional website field.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows empty form
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all form fields are present
    expect(canvas.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('Min 8 chars, uppercase + number')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('Re-enter password')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('Must be 13 or older')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('https://yoursite.com')).toBeInTheDocument();

    // Verify buttons
    expect(canvas.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Reset' })).toBeInTheDocument();

    // Verify validation status section
    expect(canvas.getByText('Validation Status')).toBeInTheDocument();
  },
};

/**
 * Tests email validation with taken email
 */
export const TakenEmail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText('you@example.com');

    // Type a taken email
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.tab();

    // Should show loading then error
    await waitFor(
      () => {
        expect(canvas.getByText('This email is already registered')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests password strength indicator
 */
export const PasswordStrength: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const passwordInput = canvas.getByPlaceholderText('Min 8 chars, uppercase + number');

    // Type a weak password (only lowercase)
    await userEvent.type(passwordInput, 'password');

    // Should show error for missing requirements
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getByText('Must include uppercase and number')).toBeInTheDocument();
    });

    // Add uppercase and number
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'Password1');
    await userEvent.tab();

    // Should pass now
    await waitFor(() => {
      expect(canvas.queryByText('Must include uppercase and number')).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests password confirmation matching
 */
export const PasswordConfirmation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const passwordInput = canvas.getByPlaceholderText('Min 8 chars, uppercase + number');
    const confirmInput = canvas.getByPlaceholderText('Re-enter password');

    // Type password
    await userEvent.type(passwordInput, 'Password1');

    // Type mismatched confirmation
    await userEvent.type(confirmInput, 'Password2');
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getByText('Passwords do not match')).toBeInTheDocument();
    });

    // Fix confirmation
    await userEvent.clear(confirmInput);
    await userEvent.type(confirmInput, 'Password1');
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getByText('Passwords match')).toBeInTheDocument();
    });
  },
};

/**
 * Tests age validation
 */
export const AgeValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const ageInput = canvas.getByPlaceholderText('Must be 13 or older');

    // Type age under 13
    await userEvent.type(ageInput, '10');
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getByText('Age must be between 13 and 120')).toBeInTheDocument();
    });

    // Fix age
    await userEvent.clear(ageInput);
    await userEvent.type(ageInput, '25');
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.queryByText('Age must be between 13 and 120')).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests optional website validation
 */
export const WebsiteValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const websiteInput = canvas.getByPlaceholderText('https://yoursite.com');

    // Type invalid URL
    await userEvent.type(websiteInput, 'not-a-url');
    await userEvent.tab();

    await waitFor(() => {
      expect(
        canvas.getByText('Invalid URL (must start with http:// or https://)')
      ).toBeInTheDocument();
    });

    // Fix URL
    await userEvent.clear(websiteInput);
    await userEvent.type(websiteInput, 'https://example.com');
    await userEvent.tab();

    await waitFor(() => {
      expect(
        canvas.queryByText('Invalid URL (must start with http:// or https://)')
      ).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests show/hide password toggle
 */
export const PasswordToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const passwordInput = canvas.getByPlaceholderText('Min 8 chars, uppercase + number');

    // Password should be hidden by default
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Type a password
    await userEvent.type(passwordInput, 'Secret123');

    // Find and click the eye button (it's inside the password field container)
    const toggleButton = canvasElement.querySelector('button[type="button"]') as HTMLButtonElement;
    await userEvent.click(toggleButton);

    // Password should now be visible
    await waitFor(() => {
      expect(passwordInput).toHaveAttribute('type', 'text');
    });

    // Click again to hide
    await userEvent.click(toggleButton);

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  },
};

/**
 * Tests complete form submission with success
 */
export const SuccessfulSubmission: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill all fields with valid data
    await userEvent.type(canvas.getByPlaceholderText('you@example.com'), 'newuser@email.com');
    await userEvent.type(
      canvas.getByPlaceholderText('Min 8 chars, uppercase + number'),
      'Password1'
    );
    await userEvent.type(canvas.getByPlaceholderText('Re-enter password'), 'Password1');
    await userEvent.type(canvas.getByPlaceholderText('Must be 13 or older'), '25');
    await userEvent.type(canvas.getByPlaceholderText('https://yoursite.com'), 'https://mysite.com');

    // Wait for email check to complete (wait for spinner to disappear and checkmark to appear)
    await waitFor(
      () => {
        // Check that the email input has success styling
        const emailInput = canvas.getByPlaceholderText('you@example.com');
        expect(emailInput).toHaveClass('input-success');
      },
      { timeout: 3000 }
    );

    // Submit the form
    await userEvent.click(canvas.getByRole('button', { name: 'Create Account' }));

    // Should show success state
    await waitFor(() => {
      expect(canvas.getByText('Account Created!')).toBeInTheDocument();
      expect(canvas.getByText('newuser@email.com')).toBeInTheDocument();
    });

    // Start Over button should be present
    expect(canvas.getByRole('button', { name: 'Start Over' })).toBeInTheDocument();
  },
};

/**
 * Tests reset button
 */
export const ResetForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill some fields
    await userEvent.type(canvas.getByPlaceholderText('you@example.com'), 'test@email.com');
    await userEvent.type(
      canvas.getByPlaceholderText('Min 8 chars, uppercase + number'),
      'Password1'
    );

    // Click Reset
    await userEvent.click(canvas.getByRole('button', { name: 'Reset' }));

    // Fields should be empty
    await waitFor(() => {
      expect(canvas.getByPlaceholderText('you@example.com')).toHaveValue('');
      expect(canvas.getByPlaceholderText('Min 8 chars, uppercase + number')).toHaveValue('');
    });
  },
};

/**
 * Tests validation status checklist
 */
export const ValidationStatusChecklist: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initial state - all should be invalid
    expect(canvas.getByText('Validation Status')).toBeInTheDocument();

    // Fill valid data
    await userEvent.type(canvas.getByPlaceholderText('you@example.com'), 'valid@email.com');
    await userEvent.type(
      canvas.getByPlaceholderText('Min 8 chars, uppercase + number'),
      'Password1'
    );
    await userEvent.type(canvas.getByPlaceholderText('Re-enter password'), 'Password1');
    await userEvent.type(canvas.getByPlaceholderText('Must be 13 or older'), '25');

    // Tab to trigger validation
    await userEvent.tab();

    // Wait for async validation to complete and check status
    await waitFor(
      () => {
        // The validation status section should show green checkmarks for valid fields
        const successIndicators = canvasElement.querySelectorAll('.text-success');
        expect(successIndicators.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  },
};
