import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import StatePreservationProblemDemo from '@lessons/react/6_5/StatePreservationProblemDemo';

const meta: Meta<typeof StatePreservationProblemDemo> = {
  title: 'Lessons/react-6.5/StatePreservationProblemDemo',
  component: StatePreservationProblemDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates the state preservation problem with conditional rendering - state is lost when components unmount.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows the warning and counter tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the warning banner
    expect(canvas.getByText('Try this:')).toBeInTheDocument();

    // Should show both tab buttons
    expect(canvas.getByRole('button', { name: 'Counter Tab' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Form Tab' })).toBeInTheDocument();

    // Should show the counter
    expect(canvas.getByText('This counter resets when you switch tabs')).toBeInTheDocument();
  },
};

/**
 * Counter loses state on tab switch
 */
export const CounterLosesState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Increment counter a few times
    const plusBtn = canvas.getByRole('button', { name: '+' });
    await user.click(plusBtn);
    await user.click(plusBtn);
    await user.click(plusBtn);

    // Counter should show 3
    expect(canvas.getByText('3')).toBeInTheDocument();

    // Switch to form tab
    await user.click(canvas.getByRole('button', { name: 'Form Tab' }));

    // Should show form
    await waitFor(() => {
      expect(canvas.getByText('Draft your message:')).toBeInTheDocument();
    });

    // Switch back to counter
    await user.click(canvas.getByRole('button', { name: 'Counter Tab' }));

    // Counter should be reset to 0
    await waitFor(() => {
      expect(canvas.getByText('0')).toBeInTheDocument();
    });
  },
};

/**
 * Form loses state on tab switch
 */
export const FormLosesState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to form tab
    await user.click(canvas.getByRole('button', { name: 'Form Tab' }));

    await waitFor(() => {
      expect(canvas.getByText('Draft your message:')).toBeInTheDocument();
    });

    // Type in the textarea
    const textarea = canvas.getByPlaceholderText('Type something here...');
    await user.type(textarea, 'Hello World');

    // Should show character count
    await waitFor(() => {
      expect(canvas.getByText('✓ 11 characters typed')).toBeInTheDocument();
    });

    // Switch to counter tab
    await user.click(canvas.getByRole('button', { name: 'Counter Tab' }));

    // Switch back to form
    await user.click(canvas.getByRole('button', { name: 'Form Tab' }));

    // Form should be empty (state lost)
    await waitFor(() => {
      const newTextarea = canvas.getByPlaceholderText('Type something here...');
      expect(newTextarea).toHaveValue('');
    });
  },
};

/**
 * Warning banner can be dismissed
 */
export const DismissWarning: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Warning should be visible
    expect(canvas.getByText('Try this:')).toBeInTheDocument();

    // Find and click dismiss button
    const dismissBtns = canvasElement.querySelectorAll('button.btn-circle');
    if (dismissBtns.length > 0) {
      await user.click(dismissBtns[0]);
    }

    // Warning should be gone
    await waitFor(() => {
      expect(canvas.queryByText('Try this:')).not.toBeInTheDocument();
    });
  },
};

/**
 * Explanation section is shown
 */
export const Explanation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the explanation
    expect(canvas.getByText('Why does this happen?')).toBeInTheDocument();

    // Check for the word "Unmounting" which appears clearly in the text
    expect(canvas.getByText(/Unmounting destroys/)).toBeInTheDocument();
  },
};

/**
 * Code snippet is shown
 */
export const CodeSnippet: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the code snippet
    expect(canvas.getByText('The Problem: Conditional Rendering')).toBeInTheDocument();
  },
};
