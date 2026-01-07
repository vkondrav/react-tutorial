import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import CSSApproachDemo from '@lessons/react/6_5/CSSApproachDemo';

const meta: Meta<typeof CSSApproachDemo> = {
  title: 'Lessons/react-6.5/CSSApproachDemo',
  component: CSSApproachDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates the CSS hiding approach to preserve state - components stay mounted but hidden with display: none.',
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
 * Default view shows the success banner and counter tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the success banner
    expect(canvas.getByText(/state is preserved!/)).toBeInTheDocument();

    // Should show both tab buttons
    expect(canvas.getByRole('button', { name: 'Counter Tab' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Form Tab' })).toBeInTheDocument();

    // Should show the counter
    expect(canvas.getByText('This counter keeps its value!')).toBeInTheDocument();
  },
};

/**
 * Counter preserves state on tab switch
 */
export const CounterPreservesState: Story = {
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

    // Counter should still show 3 (state preserved!)
    await waitFor(() => {
      expect(canvas.getByText('3')).toBeInTheDocument();
    });
  },
};

/**
 * Form preserves state on tab switch
 */
export const FormPreservesState: Story = {
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

    // Form should still have the text (state preserved!)
    await waitFor(() => {
      const formTextarea = canvas.getByPlaceholderText('Type something here...');
      expect(formTextarea).toHaveValue('Hello World');
    });
  },
};

/**
 * Pros and cons are displayed
 */
export const ProsAndCons: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show pros
    expect(canvas.getByText('Pros')).toBeInTheDocument();
    expect(canvas.getByText(/State is preserved across tab switches/)).toBeInTheDocument();
    expect(canvas.getByText(/Simple to implement/)).toBeInTheDocument();

    // Should show cons
    expect(canvas.getByText('Cons')).toBeInTheDocument();
    expect(canvas.getByText(/Hidden components stay in DOM/)).toBeInTheDocument();
    expect(canvas.getByText(/Effects keep running/)).toBeInTheDocument();
  },
};

/**
 * When to use section is shown
 */
export const WhenToUse: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show when to use
    expect(canvas.getByText('When to use CSS hiding')).toBeInTheDocument();
    expect(canvas.getByText(/small numbers of tabs/)).toBeInTheDocument();
  },
};

/**
 * Code snippet is shown
 */
export const CodeSnippet: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the code snippet
    expect(canvas.getByText('CSS Hiding Approach')).toBeInTheDocument();
  },
};
