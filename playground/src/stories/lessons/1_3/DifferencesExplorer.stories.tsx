import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import DifferencesExplorer from '../../../lessons/1_3/DifferencesExplorer';

const meta: Meta<typeof DifferencesExplorer> = {
  title: 'Lessons/1.3 Understanding JSX/DifferencesExplorer',
  component: DifferencesExplorer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive explorer showing JSX vs HTML differences. Click on difference buttons to see explanations and examples.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to find a difference button by HTML text
const getDifferenceButton = (canvasElement: HTMLElement, htmlText: string): HTMLElement => {
  const buttons = canvasElement.querySelectorAll('button');
  const button = Array.from(buttons).find((btn) => btn.textContent?.includes(htmlText));
  if (!button) throw new Error(`Button for ${htmlText} not found`);
  return button;
};

/**
 * The default differences explorer.
 */
export const Default: Story = {};

/**
 * Tests clicking on the "class" difference shows its explanation.
 */
export const SelectClassDifference: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially shows "Click a difference above to learn more"
    expect(canvas.getByText('Click a difference above to learn more')).toBeInTheDocument();

    // Click on class difference button
    const classButton = getDifferenceButton(canvasElement, 'class');
    await userEvent.click(classButton);

    // Should show the explanation
    expect(canvas.getByText(/"class" is a reserved keyword in JavaScript/)).toBeInTheDocument();
    expect(canvas.getByText(/className="container"/)).toBeInTheDocument();
  },
};

/**
 * Tests clicking on the "for" difference shows its explanation.
 */
export const SelectForDifference: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const forButton = getDifferenceButton(canvasElement, 'for');
    await userEvent.click(forButton);

    expect(canvas.getByText(/"for" is a reserved keyword in JavaScript/)).toBeInTheDocument();
    expect(canvas.getByText(/htmlFor="email"/)).toBeInTheDocument();
  },
};

/**
 * Tests clicking on the "onclick" difference shows its explanation.
 */
export const SelectOnclickDifference: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const onclickButton = getDifferenceButton(canvasElement, 'onclick');
    await userEvent.click(onclickButton);

    expect(canvas.getByText(/JSX uses camelCase for all event handlers/)).toBeInTheDocument();
    expect(canvas.getByText(/onClick={handleClick}/)).toBeInTheDocument();
  },
};

/**
 * Tests toggling selection (click again to deselect).
 */
export const ToggleSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const classButton = getDifferenceButton(canvasElement, 'class');

    // Select
    await userEvent.click(classButton);
    expect(canvas.getByText(/"class" is a reserved keyword/)).toBeInTheDocument();

    // Deselect by clicking again
    await userEvent.click(classButton);
    expect(canvas.getByText('Click a difference above to learn more')).toBeInTheDocument();
  },
};

/**
 * Tests switching between different differences.
 */
export const SwitchBetweenDifferences: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const classButton = getDifferenceButton(canvasElement, 'class');
    const forButton = getDifferenceButton(canvasElement, 'for');
    const styleButton = getDifferenceButton(canvasElement, 'style');

    // Click class
    await userEvent.click(classButton);
    expect(canvas.getByText(/"class" is a reserved keyword/)).toBeInTheDocument();

    // Switch to for
    await userEvent.click(forButton);
    expect(canvas.getByText(/"for" is a reserved keyword/)).toBeInTheDocument();

    // Switch to style
    await userEvent.click(styleButton);
    expect(canvas.getByText(/Style is an object, not a string/)).toBeInTheDocument();
  },
};
