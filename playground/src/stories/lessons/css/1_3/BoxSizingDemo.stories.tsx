import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import BoxSizingDemo from '@lessons/css/1_3/BoxSizingDemo';

const meta: Meta<typeof BoxSizingDemo> = {
  title: 'Lessons/css-1.3/BoxSizingDemo',
  component: BoxSizingDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof BoxSizingDemo>;

export const Default: Story = {};

/**
 * Tests switching to border-box mode
 */
export const SwitchToBorderBox: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should start with content-box
    const contentBoxBtn = canvas.getByRole('button', { name: /content-box/i });
    expect(contentBoxBtn).toHaveClass('btn-warning');

    // Click border-box
    const borderBoxBtn = canvas.getByRole('button', { name: /border-box/i });
    await userEvent.click(borderBoxBtn);

    // Should now be active
    expect(borderBoxBtn).toHaveClass('btn-success');
  },
};

/**
 * Tests the width slider functionality
 */
export const AdjustWidth: Story = {
  play: async ({ canvasElement }) => {
    // Find the width slider (first range input)
    const sliders = canvasElement.querySelectorAll('input[type="range"]');
    expect(sliders.length).toBeGreaterThanOrEqual(3);

    // Check width label exists
    expect(canvasElement.textContent).toContain('Width:');
  },
};

/**
 * Tests the padding slider functionality
 */
export const AdjustPadding: Story = {
  play: async ({ canvasElement }) => {
    // Check padding label exists
    expect(canvasElement.textContent).toContain('Padding:');
  },
};

/**
 * Tests the math calculation display
 */
export const MathCalculations: Story = {
  play: async ({ canvasElement }) => {
    // Should show the math section
    expect(canvasElement.textContent).toContain('The Math');
    expect(canvasElement.textContent).toContain('content-box');
    expect(canvasElement.textContent).toContain('border-box');
    expect(canvasElement.textContent).toContain('Total rendered width');
  },
};

/**
 * Tests the pro tip alert
 */
export const ProTipAlert: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Pro Tip');
    expect(canvasElement.textContent).toContain('Universal Reset');
  },
};

/**
 * Tests code snippet display
 */
export const CodeSnippetShown: Story = {
  play: async ({ canvasElement }) => {
    // Should show code
    expect(canvasElement.textContent).toContain('box-sizing');
  },
};
