import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import EventPlayground from '@lessons/2_3/EventPlayground';

const meta: Meta<typeof EventPlayground> = {
  title: 'Lessons/2.3 Events/EventPlayground',
  component: EventPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Interactive form playground with validation demonstrating event handling.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with empty form
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show form fields (labels are not associated, so use selectors)
    const nameInput = canvasElement.querySelector('input[name="name"]');
    const emailInput = canvasElement.querySelector('input[name="email"]');
    const ageInput = canvasElement.querySelector('input[name="age"]');
    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(ageInput).toBeTruthy();
    expect(canvas.getByRole('checkbox')).toBeInTheDocument();

    // Should show submit and reset buttons
    expect(canvas.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
  },
};

/**
 * Tests filling out form fields
 */
export const FillFormFields: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill name
    const nameInput = canvasElement.querySelector('input[name="name"]') as HTMLInputElement;
    await userEvent.type(nameInput, 'John Doe');
    expect(nameInput).toHaveValue('John Doe');

    // Fill email
    const emailInput = canvasElement.querySelector('input[name="email"]') as HTMLInputElement;
    await userEvent.type(emailInput, 'john@example.com');
    expect(emailInput).toHaveValue('john@example.com');

    // Fill age
    const ageInput = canvasElement.querySelector('input[name="age"]') as HTMLInputElement;
    await userEvent.type(ageInput, '25');
    expect(ageInput).toHaveValue(25);

    // Check newsletter
    const checkbox = canvas.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // State panel should reflect values
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('John Doe');
    expect(bodyText).toContain('john@example.com');
  },
};

/**
 * Tests validation errors - empty fields
 */
export const ValidationErrorsEmpty: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Submit empty form
    const submitButton = canvas.getByRole('button', { name: /Submit/i });
    await userEvent.click(submitButton);

    // Should show validation errors
    await waitFor(() => {
      expect(canvas.getByText('Name is required')).toBeInTheDocument();
      expect(canvas.getByText('Email is required')).toBeInTheDocument();
      expect(canvas.getByText('Age is required')).toBeInTheDocument();
    });
  },
};

/**
 * Tests email field is required validation
 * Note: Browser's native type="email" validation handles format checking
 */
export const ValidationErrorEmail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill name and age with valid values, leave email empty
    const nameInput = canvasElement.querySelector('input[name="name"]') as HTMLInputElement;
    const ageInput = canvasElement.querySelector('input[name="age"]') as HTMLInputElement;

    await userEvent.type(nameInput, 'John');
    await userEvent.type(ageInput, '25');

    // Submit with empty email
    await userEvent.click(canvas.getByRole('button', { name: /Submit/i }));

    // Should show email required error
    await waitFor(() => {
      expect(canvas.getByText('Email is required')).toBeInTheDocument();
    });
  },
};

/**
 * Tests age validation - under 18
 */
export const ValidationErrorAge: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvasElement.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = canvasElement.querySelector('input[name="email"]') as HTMLInputElement;
    const ageInput = canvasElement.querySelector('input[name="age"]') as HTMLInputElement;

    // Fill valid name and email
    await userEvent.type(nameInput, 'John');
    await userEvent.type(emailInput, 'john@test.com');

    // Fill age under 18
    await userEvent.type(ageInput, '15');

    // Submit
    await userEvent.click(canvas.getByRole('button', { name: /Submit/i }));

    // Should show age error
    await waitFor(() => {
      expect(canvas.getByText('Must be 18 or older')).toBeInTheDocument();
    });
  },
};

/**
 * Tests successful form submission
 */
export const SuccessfulSubmission: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvasElement.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = canvasElement.querySelector('input[name="email"]') as HTMLInputElement;
    const ageInput = canvasElement.querySelector('input[name="age"]') as HTMLInputElement;

    // Fill all fields with valid data
    await userEvent.type(nameInput, 'Jane Smith');
    await userEvent.type(emailInput, 'jane@example.com');
    await userEvent.type(ageInput, '30');

    // Submit
    await userEvent.click(canvas.getByRole('button', { name: /Submit/i }));

    // Should show success message
    await waitFor(() => {
      expect(canvas.getByText(/Form Submitted Successfully/i)).toBeInTheDocument();
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
    const nameInput = canvasElement.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = canvasElement.querySelector('input[name="email"]') as HTMLInputElement;

    await userEvent.type(nameInput, 'John');
    await userEvent.type(emailInput, 'john@test.com');

    // Click reset
    await userEvent.click(canvas.getByRole('button', { name: /Reset/i }));

    // Fields should be cleared
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  },
};

/**
 * Tests error clearing when typing
 */
export const ErrorClearingOnType: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Submit empty to trigger errors
    await userEvent.click(canvas.getByRole('button', { name: /Submit/i }));

    // Error should appear
    await waitFor(() => {
      expect(canvas.getByText('Name is required')).toBeInTheDocument();
    });

    // Start typing in name field
    const nameInput = canvasElement.querySelector('input[name="name"]') as HTMLInputElement;
    await userEvent.type(nameInput, 'J');

    // Error should disappear
    await waitFor(() => {
      expect(canvas.queryByText('Name is required')).not.toBeInTheDocument();
    });
  },
};
