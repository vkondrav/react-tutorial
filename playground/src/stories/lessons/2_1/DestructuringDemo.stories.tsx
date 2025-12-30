import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import DestructuringDemo from '@lessons/2_1/DestructuringDemo';

const meta: Meta<typeof DestructuringDemo> = {
  title: 'Lessons/2.1/DestructuringDemo',
  component: DestructuringDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Comparison between accessing props.property vs destructured props, showing cleaner code with destructuring.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing "Without Destructuring" tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show without destructuring by default
    expect(canvas.getByText('Without Destructuring')).toBeInTheDocument();

    // Should show the code with props. prefix (text is split by syntax highlighting)
    const codeText = canvasElement.textContent || '';
    expect(codeText).toContain('props.avatar');
    expect(codeText).toContain('props.name');

    // Should show warning about repetition
    expect(canvas.getByText(/Repetitive/i)).toBeInTheDocument();
  },
};

/**
 * Tests switching to "With Destructuring" tab
 */
export const SwitchToDestructured: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the "With Destructuring" button
    const withButton = canvas.getByRole('button', { name: /With Destructuring/ });
    await userEvent.click(withButton);

    // Should show destructured code
    const codeElements = canvas.getAllByText(/avatar|name|bio|role/);
    expect(codeElements.length).toBeGreaterThan(0);

    // Should show success message
    expect(canvas.getByText(/Clean!/i)).toBeInTheDocument();
    expect(canvas.getByText(/extracted right in the function parameters/i)).toBeInTheDocument();

    // Should have green border/styling
    const withButtonAfter = canvas.getByRole('button', { name: /With Destructuring/ });
    expect(withButtonAfter).toHaveClass(/success/i);
  },
};

/**
 * Tests switching back to "Without Destructuring"
 */
export const SwitchBack: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // First switch to With Destructuring
    const withButton = canvas.getByRole('button', { name: /With Destructuring/ });
    await userEvent.click(withButton);

    // Then switch back
    const withoutButton = canvas.getByRole('button', { name: /Without Destructuring/ });
    await userEvent.click(withoutButton);

    // Should show warning again
    expect(canvas.getByText(/Repetitive/i)).toBeInTheDocument();

    // Should have error/red styling
    const withoutButtonAfter = canvas.getByRole('button', { name: /Without Destructuring/ });
    expect(withoutButtonAfter).toHaveClass(/error/i);
  },
};

/**
 * Tests that both tabs show equivalence explanation
 */
export const ShowsEquivalence: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the equivalence explanation at bottom
    expect(canvas.getByText(/DESTRUCTURING SYNTAX/i)).toBeInTheDocument();
    expect(canvas.getByText(/These are equivalent/i)).toBeInTheDocument();
  },
};

/**
 * Tests toggling multiple times
 */
export const ToggleMultipleTimes: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const withButton = canvas.getByRole('button', { name: /With Destructuring/ });
    const withoutButton = canvas.getByRole('button', { name: /Without Destructuring/ });

    // Toggle several times
    await userEvent.click(withButton);
    expect(canvas.getByText(/Clean!/i)).toBeInTheDocument();

    await userEvent.click(withoutButton);
    expect(canvas.getByText(/Repetitive/i)).toBeInTheDocument();

    await userEvent.click(withButton);
    expect(canvas.getByText(/Clean!/i)).toBeInTheDocument();

    await userEvent.click(withoutButton);
    expect(canvas.getByText(/Repetitive/i)).toBeInTheDocument();
  },
};
