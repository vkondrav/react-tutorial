import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import DocumentFlowDemo from '@lessons/css/2_1/DocumentFlowDemo';

const meta: Meta<typeof DocumentFlowDemo> = {
  title: 'Lessons/css-2.1/DocumentFlowDemo',
  component: DocumentFlowDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof DocumentFlowDemo>;

export const Default: Story = {};

/**
 * Tests switching to absolute mode
 */
export const SwitchToAbsolute: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click absolute button
    const absoluteBtn = canvas.getByRole('button', { name: /Out of Flow \(absolute\)/i });
    await userEvent.click(absoluteBtn);

    // Should show absolute description
    expect(canvasElement.textContent).toContain('removed from flow');
  },
};

/**
 * Tests switching to fixed mode
 */
export const SwitchToFixed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click fixed button
    const fixedBtn = canvas.getByRole('button', { name: /Out of Flow \(fixed\)/i });
    await userEvent.click(fixedBtn);

    // Should show fixed description
    expect(canvasElement.textContent).toContain('viewport');
  },
};

/**
 * Tests visual demo shows target box
 */
export const VisualDemoShown: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Target Box');
    expect(canvasElement.textContent).toContain('Box 1');
    expect(canvasElement.textContent).toContain('Box 3');
  },
};

/**
 * Tests flow comparison cards
 */
export const FlowComparisonCards: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('In Flow');
    expect(canvasElement.textContent).toContain('Out of Flow');
    expect(canvasElement.textContent).toContain('position: static');
    expect(canvasElement.textContent).toContain('position: absolute');
  },
};

/**
 * Tests code snippet is shown
 */
export const CodeSnippetShown: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Document Flow Example');
    expect(canvasElement.textContent).toContain('position: relative');
  },
};
