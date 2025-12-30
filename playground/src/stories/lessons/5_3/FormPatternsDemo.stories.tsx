import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import FormPatternsDemo from '@lessons/5_3/FormPatternsDemo';

const meta: Meta<typeof FormPatternsDemo> = {
  title: 'Lessons/5.3/FormPatternsDemo',
  component: FormPatternsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates common form patterns: nested objects, array fields, and form reset.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows Nested Objects tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify tab buttons are present
    expect(canvas.getByRole('button', { name: 'Nested Objects' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Array Fields' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Form Reset' })).toBeInTheDocument();

    // Nested Objects should be selected by default
    const nestedButton = canvas.getByRole('button', { name: 'Nested Objects' });
    expect(nestedButton).toHaveClass('btn-primary');
  },
};

/**
 * Tests Nested Objects pattern
 */
export const NestedObjects: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify title - there are 2 occurrences (button + heading)
    const nestedMatches = canvas.getAllByText('Nested Objects');
    expect(nestedMatches.length).toBe(2);
    expect(canvas.getByText('Address (nested)')).toBeInTheDocument();

    // Fill name
    const nameInput = canvas.getByPlaceholderText('John Doe');
    await userEvent.type(nameInput, 'Jane Smith');

    // Fill address fields
    const streetInput = canvas.getByPlaceholderText('123 Main St');
    const cityInput = canvas.getByPlaceholderText('New York');
    const zipInput = canvas.getByPlaceholderText('10001');

    await userEvent.type(streetInput, '456 Oak Ave');
    await userEvent.type(cityInput, 'Boston');
    await userEvent.type(zipInput, '02101');

    // Verify input values are set
    expect(nameInput).toHaveValue('Jane Smith');
    expect(streetInput).toHaveValue('456 Oak Ave');
    expect(cityInput).toHaveValue('Boston');
    expect(zipInput).toHaveValue('02101');
  },
};

/**
 * Tests Array Fields pattern
 */
export const ArrayFields: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Array Fields tab
    await userEvent.click(canvas.getByRole('button', { name: 'Array Fields' }));

    // Wait for title - there are 2 occurrences (button + heading)
    await waitFor(() => {
      const matches = canvas.getAllByText('Array Fields');
      expect(matches.length).toBe(2);
    });

    // Should have initial skills
    expect(canvas.getByText('React')).toBeInTheDocument();
    expect(canvas.getByText('TypeScript')).toBeInTheDocument();

    // Add a new skill
    const skillInput = canvas.getByPlaceholderText('Add a skill...');
    await userEvent.type(skillInput, 'JavaScript');
    await userEvent.click(canvas.getByRole('button', { name: 'Add' }));

    // New skill should appear
    await waitFor(() => {
      expect(canvas.getByText('JavaScript')).toBeInTheDocument();
    });
  },
};

/**
 * Tests removing a skill
 */
export const RemoveSkill: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Array Fields tab
    await userEvent.click(canvas.getByRole('button', { name: 'Array Fields' }));

    await waitFor(() => {
      expect(canvas.getByText('React')).toBeInTheDocument();
    });

    // Find and click the remove button for React (the × inside the badge)
    const reactBadge = canvas.getByText('React').closest('span');
    const removeButton = reactBadge?.querySelector('button');
    if (removeButton) {
      await userEvent.click(removeButton);
    }

    // React should be gone
    await waitFor(() => {
      expect(canvas.queryByText('React')).not.toBeInTheDocument();
    });

    // TypeScript should still be there
    expect(canvas.getByText('TypeScript')).toBeInTheDocument();
  },
};

/**
 * Tests Form Reset pattern
 */
export const FormReset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Form Reset tab
    await userEvent.click(canvas.getByRole('button', { name: 'Form Reset' }));

    // Wait for title - there will be 2 occurrences (button + heading)
    await waitFor(() => {
      const matches = canvas.getAllByText('Form Reset');
      expect(matches.length).toBe(2);
    });

    // Fill form fields
    const emailInput = canvas.getByPlaceholderText('you@example.com');
    const passwordInput = canvas.getByPlaceholderText('••••••••');
    const rememberCheckbox = canvas.getByRole('checkbox', { name: 'Remember me' });

    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(rememberCheckbox);

    expect(emailInput).toHaveValue('test@test.com');
    expect(rememberCheckbox).toBeChecked();

    // Click Reset
    await userEvent.click(canvas.getByRole('button', { name: 'Reset' }));

    // Fields should be cleared
    await waitFor(() => {
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
      expect(rememberCheckbox).not.toBeChecked();
    });
  },
};

/**
 * Tests Form Submit and Reset flow
 */
export const SubmitAndReset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Form Reset tab
    await userEvent.click(canvas.getByRole('button', { name: 'Form Reset' }));

    // Wait for heading - there will be 2 occurrences (button + heading)
    await waitFor(() => {
      const matches = canvas.getAllByText('Form Reset');
      expect(matches.length).toBe(2);
    });

    // Fill and submit
    await userEvent.type(canvas.getByPlaceholderText('you@example.com'), 'test@email.com');
    await userEvent.type(canvas.getByPlaceholderText('••••••••'), 'secret123');
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));

    // Should show submitted state
    await waitFor(() => {
      expect(canvas.getByText('Submitted!')).toBeInTheDocument();
    });

    // Click Reset Form
    await userEvent.click(canvas.getByRole('button', { name: /Reset Form/ }));

    // Should be back to form view
    await waitFor(() => {
      expect(canvas.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    });
  },
};

/**
 * Verifies pro tip about initialState
 */
export const ProTip: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Form Reset tab
    await userEvent.click(canvas.getByRole('button', { name: 'Form Reset' }));

    await waitFor(() => {
      expect(canvas.getByText('Pro tip:')).toBeInTheDocument();
      // initialState appears multiple times (code examples), just verify it's present
      const initialStateMatches = canvas.getAllByText(/initialState/);
      expect(initialStateMatches.length).toBeGreaterThan(0);
    });
  },
};
