import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import TSXDemo from '@lessons/react/1_3/TSXDemo';

const meta: Meta<typeof TSXDemo> = {
  title: 'Lessons/react-1.3/TSXDemo',
  component: TSXDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Comparison demo showing JSX vs TSX. Toggle the button to switch between viewing JavaScript and TypeScript versions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default TSX demo (starts on JSX view).
 */
export const Default: Story = {};

/**
 * Tests the toggle button switches between JSX and TSX views.
 */
export const ToggleView: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const toggleButton = canvas.getByRole('button');

    // Initially should show JSX view
    expect(toggleButton).toHaveTextContent(/Viewing: JSX/);

    // Click to switch to TSX
    await userEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent(/Viewing: TSX/);

    // Click again to switch back
    await userEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent(/Viewing: JSX/);
  },
};

/**
 * Tests button color changes when toggled.
 */
export const ButtonColorChange: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const toggleButton = canvas.getByRole('button');

    // Initially should be btn-primary (JSX)
    expect(toggleButton).toHaveClass('btn-primary');

    // Click to switch to TSX
    await userEvent.click(toggleButton);
    expect(toggleButton).toHaveClass('btn-success');

    // Click again to switch back
    await userEvent.click(toggleButton);
    expect(toggleButton).toHaveClass('btn-primary');
  },
};

/**
 * Tests code cards opacity changes when toggled.
 */
export const CodeCardOpacity: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const toggleButton = canvas.getByRole('button');

    // Initially JSX card should be visible, TSX dimmed
    const jsxCard = canvasElement.querySelector('.border-primary\\/50');
    const tsxCardDimmed = canvasElement.querySelector('.opacity-50');
    expect(jsxCard).toBeInTheDocument();
    expect(tsxCardDimmed).toBeInTheDocument();

    // Click to switch to TSX
    await userEvent.click(toggleButton);

    // Now TSX should be visible, JSX dimmed
    const tsxCard = canvasElement.querySelector('.border-success\\/50');
    const jsxCardDimmed = canvasElement.querySelector('.opacity-50');
    expect(tsxCard).toBeInTheDocument();
    expect(jsxCardDimmed).toBeInTheDocument();
  },
};
