import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import ValidationApproachesDemo from '@lessons/5_2/ValidationApproachesDemo';

const meta: Meta<typeof ValidationApproachesDemo> = {
  title: 'Lessons/5.2 Form Validation Patterns/ValidationApproachesDemo',
  component: ValidationApproachesDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates different validation timing approaches: on submit, on blur, and on change.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows On Blur tab (recommended)
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify tab buttons are present
    expect(canvas.getByRole('button', { name: 'On Submit' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'On Blur' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'On Change' })).toBeInTheDocument();

    // On Blur should be selected by default
    const blurButton = canvas.getByRole('button', { name: 'On Blur' });
    expect(blurButton).toHaveClass('btn-secondary');

    // Recommended badge should be visible
    expect(canvas.getByText('Recommended')).toBeInTheDocument();
  },
};

/**
 * Tests On Submit validation - errors only show after submit
 */
export const OnSubmitValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to On Submit tab
    await userEvent.click(canvas.getByRole('button', { name: 'On Submit' }));

    // Wait for the submit badge to appear in the demo area
    await waitFor(() => {
      expect(canvas.getByText('Validate only when form is submitted')).toBeInTheDocument();
    });

    // Find the email input
    const emailInput = canvas.getByPlaceholderText('Enter your email...');

    // Type invalid email
    await userEvent.type(emailInput, 'invalid');

    // No error should show yet (before submit)
    expect(canvas.queryByText('Invalid email format')).not.toBeInTheDocument();

    // Submit the form - use the Submit button within the demo area
    const submitButtons = canvas.getAllByRole('button', { name: 'Submit' });
    await userEvent.click(submitButtons[submitButtons.length - 1]);

    // Now error should show
    await waitFor(() => {
      expect(canvas.getByText('Invalid email format')).toBeInTheDocument();
    });
  },
};

/**
 * Tests On Blur validation - errors show when leaving field
 */
export const OnBlurValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // On Blur is default, find email input
    const emailInput = canvas.getByPlaceholderText('Enter your email...');

    // Type invalid email
    await userEvent.type(emailInput, 'invalid');

    // No error yet while typing
    expect(canvas.queryByText('Invalid email format')).not.toBeInTheDocument();

    // Blur the input (tab away)
    await userEvent.tab();

    // Error should now show
    await waitFor(() => {
      expect(canvas.getByText('Invalid email format')).toBeInTheDocument();
    });

    // Clear and type valid email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.tab();

    // Error should be gone
    await waitFor(() => {
      expect(canvas.queryByText('Invalid email format')).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests On Change validation - instant feedback while typing
 */
export const OnChangeValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to On Change tab
    await userEvent.click(canvas.getByRole('button', { name: 'On Change' }));

    // Wait for the change badge to appear
    await waitFor(() => {
      const badges = canvas.getAllByText('On Change');
      expect(badges.length).toBeGreaterThan(0);
    });

    // Find email input
    const emailInput = canvas.getByPlaceholderText('Enter your email...');

    // Type a character - should show error immediately
    await userEvent.type(emailInput, 'a');

    await waitFor(() => {
      expect(canvas.getByText('Invalid email format')).toBeInTheDocument();
    });

    // Continue typing to make it valid
    await userEvent.type(emailInput, 'bc@test.com');

    // Should show valid
    await waitFor(() => {
      expect(canvas.getByText('Valid email')).toBeInTheDocument();
    });
  },
};

/**
 * Verifies comparison table is displayed
 */
export const ComparisonTable: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify comparison table header
    expect(canvas.getByText('Comparison')).toBeInTheDocument();

    // Check table headers
    expect(canvas.getByRole('columnheader', { name: 'Approach' })).toBeInTheDocument();
    expect(canvas.getByRole('columnheader', { name: 'Pros' })).toBeInTheDocument();
    expect(canvas.getByRole('columnheader', { name: 'Cons' })).toBeInTheDocument();
    expect(canvas.getByRole('columnheader', { name: 'Best For' })).toBeInTheDocument();

    // Check specific content
    expect(canvas.getByText('Most forms (recommended)')).toBeInTheDocument();
  },
};
