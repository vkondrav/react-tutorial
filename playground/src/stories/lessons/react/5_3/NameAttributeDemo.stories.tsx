import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import NameAttributeDemo from '@lessons/react/5_3/NameAttributeDemo';

const meta: Meta<typeof NameAttributeDemo> = {
  title: 'Lessons/react-5.3/NameAttributeDemo',
  component: NameAttributeDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the name attribute pattern for handling multiple inputs with a single generic handler.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows the form
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the generic handler pattern is displayed
    expect(canvas.getByText('The Generic Handler Pattern')).toBeInTheDocument();
    expect(canvas.getByText('{ ...prev, [e.target.name]: e.target.value }')).toBeInTheDocument();

    // Verify inputs are present with name attribute labels
    expect(canvas.getByText('name="username"')).toBeInTheDocument();
    expect(canvas.getByText('name="email"')).toBeInTheDocument();
    expect(canvas.getByText('name="age"')).toBeInTheDocument();
    expect(canvas.getByText('name="plan"')).toBeInTheDocument();
  },
};

/**
 * Tests typing in username field
 */
export const TypeUsername: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const usernameInput = canvas.getByPlaceholderText('johndoe');
    await userEvent.type(usernameInput, 'testuser');

    // Verify input value is set
    expect(usernameInput).toHaveValue('testuser');

    // Should show "changed" badge briefly
    await waitFor(() => {
      expect(canvas.getByText('username changed!')).toBeInTheDocument();
    });
  },
};

/**
 * Tests email input
 */
export const TypeEmail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText('john@example.com');
    await userEvent.type(emailInput, 'test@email.com');

    // Verify input value is set
    expect(emailInput).toHaveValue('test@email.com');

    // Should show "changed" badge briefly
    await waitFor(() => {
      expect(canvas.getByText('email changed!')).toBeInTheDocument();
    });
  },
};

/**
 * Tests age number input
 */
export const TypeAge: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const ageInput = canvas.getByPlaceholderText('25');
    await userEvent.type(ageInput, '30');

    // Verify input value is set
    expect(ageInput).toHaveValue(30);

    // Should show "changed" badge briefly
    await waitFor(() => {
      expect(canvas.getByText('age changed!')).toBeInTheDocument();
    });
  },
};

/**
 * Tests plan select dropdown
 */
export const SelectPlan: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the select and change to Pro
    const planSelect = canvas.getByRole('combobox');
    expect(planSelect).toHaveValue('free');

    await userEvent.selectOptions(planSelect, 'pro');

    // Verify select value changed
    expect(planSelect).toHaveValue('pro');

    // Should show "changed" badge briefly
    await waitFor(() => {
      expect(canvas.getByText('plan changed!')).toBeInTheDocument();
    });

    // Change to Enterprise
    await userEvent.selectOptions(planSelect, 'enterprise');
    expect(planSelect).toHaveValue('enterprise');
  },
};

/**
 * Tests subscribe checkbox
 */
export const ToggleCheckbox: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the checkbox
    const checkbox = canvas.getByRole('checkbox', { name: /Subscribe to newsletter/ });
    expect(checkbox).not.toBeChecked();

    // Check it
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Should show "changed" badge briefly
    await waitFor(() => {
      expect(canvas.getByText('subscribe changed!')).toBeInTheDocument();
    });

    // Uncheck it
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  },
};

/**
 * Verifies How It Works section
 */
export const HowItWorks: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('How It Works')).toBeInTheDocument();
    expect(canvas.getByText('1. Input has name')).toBeInTheDocument();
    expect(canvas.getByText('2. Extract from event')).toBeInTheDocument();
    expect(canvas.getByText('3. Update that key')).toBeInTheDocument();
  },
};

/**
 * Verifies checkbox gotcha warning
 */
export const CheckboxGotcha: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Checkbox gotcha:')).toBeInTheDocument();
    expect(canvas.getByText(/e.target.checked/)).toBeInTheDocument();
  },
};
