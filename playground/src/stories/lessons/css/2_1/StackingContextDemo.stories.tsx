import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import StackingContextDemo from '@lessons/css/2_1/StackingContextDemo';

const meta: Meta<typeof StackingContextDemo> = {
  title: 'Lessons/css-2.1/StackingContextDemo',
  component: StackingContextDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof StackingContextDemo>;

export const Default: Story = {};

/**
 * Tests switching to stacking context scenario
 */
export const SwitchToStackingContext: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const contextBtn = canvas.getByRole('button', { name: /Stacking Contexts/i });
    await userEvent.click(contextBtn);

    expect(canvasElement.textContent).toContain('isolated');
    expect(canvasElement.textContent).toContain('Parent A');
    expect(canvasElement.textContent).toContain('Parent B');
  },
};

/**
 * Tests basic z-index shows boxes
 */
export const BasicZIndexBoxes: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Box A');
    expect(canvasElement.textContent).toContain('Box B');
    expect(canvasElement.textContent).toContain('Box C');
  },
};

/**
 * Tests z-index inputs are present
 */
export const ZIndexInputs: Story = {
  play: async ({ canvasElement }) => {
    const inputs = canvasElement.querySelectorAll('input[type="number"]');
    expect(inputs.length).toBeGreaterThanOrEqual(3);
  },
};

/**
 * Tests what creates stacking context section
 */
export const WhatCreatesStackingContext: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('What Creates a Stacking Context');
    expect(canvasElement.textContent).toContain('opacity');
    expect(canvasElement.textContent).toContain('transform');
    expect(canvasElement.textContent).toContain('filter');
  },
};

/**
 * Tests debugging tip is shown
 */
export const DebuggingTip: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Debugging z-index Issues');
    expect(canvasElement.textContent).toContain('stacking context that traps');
  },
};

/**
 * Tests stacking context trap explanation
 */
export const StackingContextTrapExplanation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to context scenario
    const contextBtn = canvas.getByRole('button', { name: /Stacking Contexts/i });
    await userEvent.click(contextBtn);

    // Should show the trap explanation
    expect(canvasElement.textContent).toContain('Child A');
    expect(canvasElement.textContent).toContain('Child B');
  },
};

/**
 * Tests code snippet is shown
 */
export const CodeSnippetShown: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Stacking Context Example');
  },
};
