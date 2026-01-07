import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import MultipleStateDemo from '@lessons/react/2_2/MultipleStateDemo';

const meta: Meta<typeof MultipleStateDemo> = {
  title: 'Lessons/react-2.2/MultipleStateDemo',
  component: MultipleStateDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates using multiple useState hooks in a single component with a form example.',
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

    // Should have form fields (look for placeholders since labels are simple text)
    expect(canvas.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
    expect(canvas.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(canvas.getByRole('checkbox')).toBeInTheDocument();
  },
};

/**
 * Tests filling out the name field
 */
export const FillName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = canvas.getByPlaceholderText(/Enter your name/i);
    await userEvent.type(nameInput, 'John Doe');

    expect(nameInput).toHaveValue('John Doe');
  },
};

/**
 * Tests filling out the email field
 */
export const FillEmail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText(/Enter your email/i);
    await userEvent.type(emailInput, 'john@example.com');

    expect(emailInput).toHaveValue('john@example.com');
  },
};

/**
 * Tests toggling the newsletter checkbox
 */
export const ToggleNewsletter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const checkbox = canvas.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  },
};

/**
 * Tests filling all fields
 */
export const FillAllFields: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill name
    const nameInput = canvas.getByPlaceholderText(/Enter your name/i);
    await userEvent.type(nameInput, 'Jane Smith');

    // Fill email
    const emailInput = canvas.getByPlaceholderText(/Enter your email/i);
    await userEvent.type(emailInput, 'jane@example.com');

    // Check newsletter
    const checkbox = canvas.getByRole('checkbox');
    await userEvent.click(checkbox);

    // Verify all values
    expect(nameInput).toHaveValue('Jane Smith');
    expect(emailInput).toHaveValue('jane@example.com');
    expect(checkbox).toBeChecked();
  },
};
