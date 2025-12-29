import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import SingleStateDemo from '@lessons/5_3/SingleStateDemo';

const meta: Meta<typeof SingleStateDemo> = {
  title: 'Lessons/5.3 Handling Multiple Inputs/SingleStateDemo',
  component: SingleStateDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the difference between separate useState calls and a single state object pattern.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows Separate States tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify tab buttons are present
    expect(canvas.getByRole('button', { name: /Separate States/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Single Object/ })).toBeInTheDocument();

    // Separate States should be selected by default
    const separateButton = canvas.getByRole('button', { name: /Separate States/ });
    expect(separateButton).toHaveClass('btn-error');

    // Should show Not Recommended badge
    expect(canvas.getByText('Not Recommended')).toBeInTheDocument();
  },
};

/**
 * Tests Separate States tab interaction
 */
export const SeparateStates: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show issues explanation
    expect(canvas.getByText(/Lots of repetition/)).toBeInTheDocument();

    // Find inputs
    const firstNameInput = canvas.getByPlaceholderText('John');
    const lastNameInput = canvas.getByPlaceholderText('Doe');
    const emailInput = canvas.getByPlaceholderText('john@example.com');
    const phoneInput = canvas.getByPlaceholderText('555-1234');

    // Type in all fields
    await userEvent.type(firstNameInput, 'Jane');
    await userEvent.type(lastNameInput, 'Smith');
    await userEvent.type(emailInput, 'jane@test.com');
    await userEvent.type(phoneInput, '123-4567');

    // Verify values are set
    expect(firstNameInput).toHaveValue('Jane');
    expect(lastNameInput).toHaveValue('Smith');
    expect(emailInput).toHaveValue('jane@test.com');
    expect(phoneInput).toHaveValue('123-4567');
  },
};

/**
 * Tests Single Object State tab
 */
export const SingleObjectState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Single Object tab
    await userEvent.click(canvas.getByRole('button', { name: /Single Object/ }));

    // Wait for Recommended badge
    await waitFor(() => {
      expect(canvas.getByText('Recommended')).toBeInTheDocument();
    });

    // Find inputs
    const firstNameInput = canvas.getByPlaceholderText('John');
    const lastNameInput = canvas.getByPlaceholderText('Doe');

    // Type in fields
    await userEvent.type(firstNameInput, 'John');
    await userEvent.type(lastNameInput, 'Doe');

    // Verify inputs have values
    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');

    // Lightbulb tip should be visible
    expect(canvas.getByText(/One state, one handler, easy reset!/)).toBeInTheDocument();
  },
};

/**
 * Tests Reset All button in Single Object State
 */
export const ResetAll: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Single Object tab
    await userEvent.click(canvas.getByRole('button', { name: /Single Object/ }));

    await waitFor(() => {
      expect(canvas.getByText('Recommended')).toBeInTheDocument();
    });

    // Type in fields
    const firstNameInput = canvas.getByPlaceholderText('John');
    await userEvent.type(firstNameInput, 'John');

    expect(firstNameInput).toHaveValue('John');

    // Click Reset All
    await userEvent.click(canvas.getByRole('button', { name: 'Reset All' }));

    // All fields should be empty
    await waitFor(() => {
      expect(firstNameInput).toHaveValue('');
    });
  },
};

/**
 * Verifies lightbulb tip is shown
 */
export const LightbulbTip: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Single Object tab
    await userEvent.click(canvas.getByRole('button', { name: /Single Object/ }));

    // Wait for tip
    await waitFor(() => {
      expect(canvas.getByText(/One state, one handler, easy reset!/)).toBeInTheDocument();
    });
  },
};
