import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import ControlledPlayground from '@lessons/react/5_1/ControlledPlayground';

const meta: Meta<typeof ControlledPlayground> = {
  title: 'Lessons/react-5.1/ControlledPlayground',
  component: ControlledPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive form building playground with a complete registration form featuring validation, nested checkboxes, and form submission.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default empty form state
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify form fields are present
    expect(canvas.getByPlaceholderText('John')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('Doe')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('john@example.com')).toBeInTheDocument();

    // Verify submit button is disabled (form not valid)
    const submitButton = canvas.getByRole('button', { name: /Fill Required Fields/ });
    expect(submitButton).toBeDisabled();

    // Verify validation summary is shown
    expect(canvas.getByText('Missing or invalid:')).toBeInTheDocument();
  },
};

/**
 * Tests form field validation
 */
export const FormValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill first name
    const firstNameInput = canvas.getByPlaceholderText('John');
    await userEvent.type(firstNameInput, 'Jane');

    // Should show success state
    await waitFor(() => {
      expect(firstNameInput).toHaveClass('input-success');
    });

    // Fill invalid email
    const emailInput = canvas.getByPlaceholderText('john@example.com');
    await userEvent.type(emailInput, 'invalid');

    // Should show error state
    await waitFor(() => {
      expect(emailInput).toHaveClass('input-error');
    });

    // Fill valid email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'jane@example.com');

    // Should show success state
    await waitFor(() => {
      expect(emailInput).toHaveClass('input-success');
    });
  },
};

/**
 * Tests password matching validation
 */
export const PasswordMatching: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get password inputs
    const passwordInputs = canvas.getAllByPlaceholderText('••••••••');
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];

    // Enter a strong password
    await userEvent.type(passwordInput, 'password123');

    // Should show success for strong password
    await waitFor(() => {
      expect(canvas.getByText('Strong password')).toBeInTheDocument();
    });

    // Enter mismatching confirm password
    await userEvent.type(confirmPasswordInput, 'password456');

    // Confirm password field should show error class
    await waitFor(() => {
      expect(confirmPasswordInput).toHaveClass('input-error');
    });

    // Fix the confirm password
    await userEvent.clear(confirmPasswordInput);
    await userEvent.type(confirmPasswordInput, 'password123');

    // Should show success
    await waitFor(() => {
      expect(canvas.getByText('Passwords match')).toBeInTheDocument();
    });
  },
};

/**
 * Tests notification checkboxes
 */
export const NotificationPreferences: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify notification section
    expect(canvas.getByText('Notification Preferences')).toBeInTheDocument();

    // Get checkboxes by their labels
    const emailCheckbox = canvas.getByRole('checkbox', { name: 'Email' });
    const smsCheckbox = canvas.getByRole('checkbox', { name: 'SMS' });
    const pushCheckbox = canvas.getByRole('checkbox', { name: 'Push' });

    // Verify default states (email: true, sms: false, push: true)
    expect(emailCheckbox).toBeChecked();
    expect(smsCheckbox).not.toBeChecked();
    expect(pushCheckbox).toBeChecked();

    // Toggle SMS on
    await userEvent.click(smsCheckbox);
    expect(smsCheckbox).toBeChecked();

    // Toggle email off
    await userEvent.click(emailCheckbox);
    expect(emailCheckbox).not.toBeChecked();
  },
};

/**
 * Tests the role select dropdown
 */
export const RoleSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the role select
    const roleSelect = canvas.getByRole('combobox');

    // Select Developer
    await userEvent.selectOptions(roleSelect, 'developer');

    // Should have success class
    await waitFor(() => {
      expect(roleSelect).toHaveClass('select-success');
    });
  },
};

/**
 * Tests the bio textarea with character count
 */
export const BioWithCharacterCount: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initial count should be 0/200
    expect(canvas.getByText('0/200')).toBeInTheDocument();

    // Find the bio textarea
    const bioTextarea = canvas.getByPlaceholderText('Tell us about yourself...');

    // Type some text
    await userEvent.type(bioTextarea, 'I am a developer.');

    // Count should update
    await waitFor(() => {
      expect(canvas.getByText('17/200')).toBeInTheDocument();
    });
  },
};

/**
 * Tests the reset button
 */
export const ResetForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill some fields
    const firstNameInput = canvas.getByPlaceholderText('John');
    await userEvent.type(firstNameInput, 'Jane');

    const emailInput = canvas.getByPlaceholderText('john@example.com');
    await userEvent.type(emailInput, 'jane@test.com');

    // Verify fields are filled
    await waitFor(() => {
      expect(firstNameInput).toHaveValue('Jane');
    });

    // Click reset
    const resetButton = canvas.getByRole('button', { name: 'Reset' });
    await userEvent.click(resetButton);

    // Fields should be cleared
    await waitFor(() => {
      expect(firstNameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
    });
  },
};

/**
 * Tests the state debug toggle
 */
export const DebugStateToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // State should be hidden initially
    expect(canvas.queryByText('"firstName"')).not.toBeInTheDocument();

    // Click to show state
    const showButton = canvas.getByRole('button', { name: /Show Form State/ });
    await userEvent.click(showButton);

    // State should be visible (JSON with firstName key)
    await waitFor(() => {
      // The JSON shows the form state structure
      expect(canvas.getByRole('button', { name: /Hide Form State/ })).toBeInTheDocument();
    });

    // Click to hide
    await userEvent.click(canvas.getByRole('button', { name: /Hide Form State/ }));

    // State should be hidden
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Show Form State/ })).toBeInTheDocument();
    });
  },
};

/**
 * Tests completing and submitting the full form
 */
export const CompleteFormSubmission: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill all required fields
    await userEvent.type(canvas.getByPlaceholderText('John'), 'Jane');
    await userEvent.type(canvas.getByPlaceholderText('Doe'), 'Smith');
    await userEvent.type(canvas.getByPlaceholderText('john@example.com'), 'jane@example.com');

    const passwordInputs = canvas.getAllByPlaceholderText('••••••••');
    await userEvent.type(passwordInputs[0], 'password123');
    await userEvent.type(passwordInputs[1], 'password123');

    await userEvent.selectOptions(canvas.getByRole('combobox'), 'developer');

    // Agree to terms - find by the checkbox that's not in notifications
    const termsCheckbox = canvas.getByRole('checkbox', { name: /I agree to the/ });
    await userEvent.click(termsCheckbox);

    // Submit button should now be enabled
    await waitFor(() => {
      const submitButton = canvas.getByRole('button', { name: 'Create Account' });
      expect(submitButton).not.toBeDisabled();
    });

    // Submit the form
    const submitButton = canvas.getByRole('button', { name: 'Create Account' });
    await userEvent.click(submitButton);

    // Should show success message
    await waitFor(() => {
      expect(canvas.getByText('Form Submitted!')).toBeInTheDocument();
      expect(canvas.getByText(/Welcome, Jane Smith!/)).toBeInTheDocument();
    });
  },
};
