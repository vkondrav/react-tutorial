import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import FlexAxesDemo from '@lessons/css/2_2/FlexAxesDemo';

const meta: Meta<typeof FlexAxesDemo> = {
  title: 'Lessons/css-2.2/FlexAxesDemo',
  component: FlexAxesDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof FlexAxesDemo>;

export const Default: Story = {};

/**
 * Tests switching flex-direction to column
 */
export const SwitchToColumn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const columnBtn = canvas.getByRole('button', { name: /^column$/i });
    await userEvent.click(columnBtn);

    // Main axis should now be vertical
    expect(canvasElement.textContent).toContain('Vertical');
  },
};

/**
 * Tests switching justify-content
 */
export const ChangeJustifyContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all center buttons - first one is for justify-content
    const centerButtons = canvas.getAllByRole('button', { name: /^center$/i });
    await userEvent.click(centerButtons[0]);

    expect(canvasElement.textContent).toContain('justify-content: center');
  },
};

/**
 * Tests switching align-items
 */
export const ChangeAlignItems: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all center buttons - second one is for align-items
    const centerButtons = canvas.getAllByRole('button', { name: /^center$/i });
    await userEvent.click(centerButtons[1]);

    expect(canvasElement.textContent).toContain('align-items: center');
  },
};

/**
 * Tests space-between option
 */
export const SpaceBetween: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const spaceBetweenBtn = canvas.getByRole('button', { name: /space-between/i });
    await userEvent.click(spaceBetweenBtn);

    expect(canvasElement.textContent).toContain('justify-content: space-between');
  },
};

/**
 * Tests axis indicator updates correctly
 */
export const AxisIndicator: Story = {
  play: async ({ canvasElement }) => {
    // Should show axis information
    expect(canvasElement.textContent).toContain('Main Axis');
    expect(canvasElement.textContent).toContain('Cross Axis');
  },
};

/**
 * Tests quick reference cards are shown
 */
export const QuickReferenceCards: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('justify-content (Main Axis)');
    expect(canvasElement.textContent).toContain('align-items (Cross Axis)');
  },
};

/**
 * Tests generated CSS is shown
 */
export const GeneratedCSS: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Generated CSS');
    expect(canvasElement.textContent).toContain('display: flex');
  },
};

/**
 * Tests code snippet is shown
 */
export const CodeSnippetShown: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Flex Axes Reference');
  },
};
