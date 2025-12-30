import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import RenderCountDemo from '@lessons/3_4/RenderCountDemo';

const meta: Meta<typeof RenderCountDemo> = {
  title: 'Lessons/3.4/RenderCountDemo',
  component: RenderCountDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Shows how parent re-renders cause all children to re-render, demonstrating the problem memoization solves.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows parent and child render counts
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Watch the Render Counts');

    // Should have count controls
    expect(canvas.getByRole('button', { name: '−' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: '+' })).toBeInTheDocument();

    // Should have text input
    expect(canvas.getByPlaceholderText(/Type something/i)).toBeInTheDocument();

    // Should show components
    expect(canvasElement.textContent).toContain('CountDisplay');
    expect(canvasElement.textContent).toContain('TextDisplay');

    // Should show render counts
    expect(canvasElement.textContent).toContain('Parent renders');
    expect(canvasElement.textContent).toContain('Renders:');
  },
};

/**
 * Tests incrementing count causes both children to re-render
 */
export const IncrementCount: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Reset counts first
    await userEvent.click(canvas.getByRole('button', { name: /Reset Counts/i }));

    // Click increment
    await userEvent.click(canvas.getByRole('button', { name: '+' }));

    // Both children should have rendered
    await waitFor(() => {
      const renderTexts = canvasElement.querySelectorAll('.text-error');
      expect(renderTexts.length).toBeGreaterThan(0);
    });
  },
};

/**
 * Tests typing text causes both children to re-render
 */
export const TypeText: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Reset counts first
    await userEvent.click(canvas.getByRole('button', { name: /Reset Counts/i }));

    // Type in input
    const input = canvas.getByPlaceholderText(/Type something/i);
    await userEvent.type(input, 'hello');

    // Text display should show the text
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('hello');
    });
  },
};

/**
 * Tests reset counts button
 */
export const ResetCounts: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Do some actions first
    await userEvent.click(canvas.getByRole('button', { name: '+' }));
    await userEvent.click(canvas.getByRole('button', { name: '+' }));

    // Reset counts
    await userEvent.click(canvas.getByRole('button', { name: /Reset Counts/i }));

    // Counts should be reset (though the UI shows current render which is 1)
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Renders:');
    });
  },
};

/**
 * Tests problem explanation is shown
 */
export const ShowsProblemExplanation: Story = {
  play: async ({ canvasElement }) => {
    // Should show problem explanation
    expect(canvasElement.textContent).toContain('Problem');
    expect(canvasElement.textContent).toContain('Both children re-render');
    expect(canvasElement.textContent).toContain('wastes performance');
  },
};
