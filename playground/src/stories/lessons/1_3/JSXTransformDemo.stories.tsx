import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import JSXTransformDemo from '@lessons/1_3/JSXTransformDemo';

const meta: Meta<typeof JSXTransformDemo> = {
  title: 'Lessons/1.3/JSXTransformDemo',
  component: JSXTransformDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive demo showing how JSX transforms into React.createElement() calls. Click the arrow button to toggle the transformation view.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default JSX transform demo.
 */
export const Default: Story = {};

/**
 * Tests clicking the arrow button toggles the transform view.
 */
export const ToggleTransform: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the arrow button
    const arrowButton = canvas.getByRole('button');

    // Initially, the transform view should be dimmed (opacity-40)
    const transformCard = canvasElement.querySelector('.opacity-40');
    expect(transformCard).toBeInTheDocument();

    // Click to show transform
    await userEvent.click(arrowButton);

    // Transform view should now be visible (opacity-100)
    const visibleCard = canvasElement.querySelector('.opacity-100');
    expect(visibleCard).toBeInTheDocument();

    // Click again to hide
    await userEvent.click(arrowButton);

    // Should be dimmed again
    const dimmedCard = canvasElement.querySelector('.opacity-40');
    expect(dimmedCard).toBeInTheDocument();
  },
};

/**
 * Tests the button changes appearance when active.
 */
export const ButtonStateChange: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const arrowButton = canvas.getByRole('button');

    // Initially should be btn-ghost
    expect(arrowButton).toHaveClass('btn-ghost');

    // Click to activate
    await userEvent.click(arrowButton);

    // Should now be btn-primary
    expect(arrowButton).toHaveClass('btn-primary');
  },
};
