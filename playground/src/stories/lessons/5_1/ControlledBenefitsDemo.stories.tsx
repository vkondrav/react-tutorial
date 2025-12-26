import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import ControlledBenefitsDemo from '@lessons/5_1/ControlledBenefitsDemo';

const meta: Meta<typeof ControlledBenefitsDemo> = {
  title: 'Lessons/5.1 Controlled Components/ControlledBenefitsDemo',
  component: ControlledBenefitsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the benefits of controlled components: instant validation, auto formatting, conditional logic, and computed values.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows Validation tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify tab buttons are present
    expect(canvas.getByRole('button', { name: 'Instant Validation' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Auto Formatting' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Conditional Logic' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Computed Values' })).toBeInTheDocument();

    // Validation tab should be selected by default
    const validationButton = canvas.getByRole('button', { name: 'Instant Validation' });
    expect(validationButton).toHaveClass('btn-primary');
  },
};

/**
 * Tests instant validation with email and password
 */
export const InstantValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Type an invalid email
    const emailInput = canvas.getByPlaceholderText('you@example.com');
    await userEvent.type(emailInput, 'invalid');

    // Should show error
    await waitFor(() => {
      expect(canvas.getByText('Must include @ and .')).toBeInTheDocument();
    });

    // Type a valid email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'test@example.com');

    // Should show success
    await waitFor(() => {
      expect(canvas.getByText('Valid email format')).toBeInTheDocument();
    });

    // Type a short password
    const passwordInput = canvas.getByPlaceholderText('Enter password...');
    await userEvent.type(passwordInput, 'short');

    // Should show error with remaining count
    await waitFor(() => {
      expect(canvas.getByText(/Need \d+ more characters/)).toBeInTheDocument();
    });
  },
};

/**
 * Tests auto formatting for phone and credit card
 */
export const AutoFormatting: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Auto Formatting tab
    await userEvent.click(canvas.getByRole('button', { name: 'Auto Formatting' }));

    // Wait for the phone input to appear
    await waitFor(() => {
      expect(canvas.getByPlaceholderText('(123) 456-7890')).toBeInTheDocument();
    });

    // Type phone number (should auto-format)
    const phoneInput = canvas.getByPlaceholderText('(123) 456-7890');
    await userEvent.type(phoneInput, '1234567890');

    // Should show formatted
    await waitFor(() => {
      expect(phoneInput).toHaveValue('(123) 456-7890');
    });

    // Type credit card (should auto-format)
    const creditCardInput = canvas.getByPlaceholderText('1234 5678 9012 3456');
    await userEvent.type(creditCardInput, '1234567890123456');

    // Should show formatted with spaces
    await waitFor(() => {
      expect(creditCardInput).toHaveValue('1234 5678 9012 3456');
    });
  },
};

/**
 * Tests conditional logic with delivery method
 */
export const ConditionalLogic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Conditional Logic tab
    await userEvent.click(canvas.getByRole('button', { name: 'Conditional Logic' }));

    // Wait for the delivery method options to appear
    await waitFor(() => {
      expect(canvas.getByText('Delivery Method')).toBeInTheDocument();
    });

    // Pickup should be selected by default
    expect(canvas.getByText(/Pick up at:/)).toBeInTheDocument();

    // Switch to shipping
    const shippingRadio = canvas.getByRole('radio', { name: 'Ship to Address' });
    await userEvent.click(shippingRadio);

    // Address field should appear
    await waitFor(() => {
      expect(canvas.getByPlaceholderText('Enter your address...')).toBeInTheDocument();
    });

    // Switch back to pickup
    const pickupRadio = canvas.getByRole('radio', { name: 'Store Pickup' });
    await userEvent.click(pickupRadio);

    // Address field should disappear
    await waitFor(() => {
      expect(canvas.queryByPlaceholderText('Enter your address...')).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests computed values with order total
 */
export const ComputedValues: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Computed Values tab
    await userEvent.click(canvas.getByRole('button', { name: 'Computed Values' }));

    // Wait for the quantity input to appear
    await waitFor(() => {
      expect(canvas.getByRole('spinbutton')).toBeInTheDocument();
    });

    // Verify initial values
    expect(canvas.getByText('Subtotal:')).toBeInTheDocument();
    expect(canvas.getByText('Total:')).toBeInTheDocument();

    // Change quantity to 2
    const quantityInput = canvas.getByRole('spinbutton');
    await userEvent.clear(quantityInput);
    await userEvent.type(quantityInput, '2');

    // Apply discount
    const discountCheckbox = canvas.getByRole('checkbox', { name: 'Apply 10% discount' });
    await userEvent.click(discountCheckbox);

    // Discount should be applied
    await waitFor(() => {
      expect(canvas.getByText(/Discount \(10%\)/)).toBeInTheDocument();
    });

    // Checkbox should be checked
    expect(discountCheckbox).toBeChecked();
  },
};
