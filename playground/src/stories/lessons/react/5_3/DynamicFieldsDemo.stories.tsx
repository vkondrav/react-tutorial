import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import DynamicFieldsDemo from '@lessons/react/5_3/DynamicFieldsDemo';

const meta: Meta<typeof DynamicFieldsDemo> = {
  title: 'Lessons/react-5.3/DynamicFieldsDemo',
  component: DynamicFieldsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates dynamic form fields - adding and removing phone numbers with unique IDs.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows one phone entry
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify title
    expect(canvas.getByText('Phone Numbers')).toBeInTheDocument();

    // Verify Add Phone button
    expect(canvas.getByRole('button', { name: /Add Phone/ })).toBeInTheDocument();

    // Should have one phone input
    expect(canvas.getByPlaceholderText('555-1234')).toBeInTheDocument();

    // State should show 1 item
    expect(canvas.getByText(/State \(1 item\)/)).toBeInTheDocument();
  },
};

/**
 * Tests adding a phone entry
 */
export const AddPhone: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Add Phone
    await userEvent.click(canvas.getByRole('button', { name: /Add Phone/ }));

    // Should now have 2 phone inputs
    await waitFor(() => {
      const phoneInputs = canvas.getAllByPlaceholderText('555-1234');
      expect(phoneInputs.length).toBe(2);
    });

    // State should show 2 items
    expect(canvas.getByText(/State \(2 items\)/)).toBeInTheDocument();

    // Add a third
    await userEvent.click(canvas.getByRole('button', { name: /Add Phone/ }));

    await waitFor(() => {
      const phoneInputs = canvas.getAllByPlaceholderText('555-1234');
      expect(phoneInputs.length).toBe(3);
    });
  },
};

/**
 * Tests removing a phone entry
 */
export const RemovePhone: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Add a second phone first
    await userEvent.click(canvas.getByRole('button', { name: /Add Phone/ }));

    await waitFor(() => {
      expect(canvas.getByText(/State \(2 items\)/)).toBeInTheDocument();
    });

    // Find and click the remove button (should be 2 now)
    const removeButtons = canvasElement.querySelectorAll('button.text-error');
    expect(removeButtons.length).toBe(2);

    await userEvent.click(removeButtons[1]);

    // Should be back to 1 item
    await waitFor(() => {
      expect(canvas.getByText(/State \(1 item\)/)).toBeInTheDocument();
    });
  },
};

/**
 * Tests that remove button is disabled when only one phone
 */
export const RemoveDisabledWhenOne: Story = {
  play: async ({ canvasElement }) => {
    // With only one phone, remove button should be disabled
    const removeButton = canvasElement.querySelector('button.text-error') as HTMLButtonElement;
    expect(removeButton).toBeDisabled();
  },
};

/**
 * Tests typing phone number
 */
export const TypePhoneNumber: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const phoneInput = canvas.getByPlaceholderText('555-1234');
    await userEvent.type(phoneInput, '123-456-7890');

    // Verify input value is set
    expect(phoneInput).toHaveValue('123-456-7890');
  },
};

/**
 * Tests changing phone type
 */
export const ChangePhoneType: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the type select
    const typeSelect = canvas.getByRole('combobox');
    expect(typeSelect).toHaveValue('mobile');

    // Change to work
    await userEvent.selectOptions(typeSelect, 'work');
    expect(typeSelect).toHaveValue('work');

    // Change to home
    await userEvent.selectOptions(typeSelect, 'home');
    expect(typeSelect).toHaveValue('home');
  },
};

/**
 * Verifies key warning about array index
 */
export const KeyWarning: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Never use array index as key!')).toBeInTheDocument();
    expect(canvas.getByText(/crypto.randomUUID/)).toBeInTheDocument();
  },
};
