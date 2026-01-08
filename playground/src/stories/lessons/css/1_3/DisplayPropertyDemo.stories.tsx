import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import DisplayPropertyDemo from '@lessons/css/1_3/DisplayPropertyDemo';

const meta: Meta<typeof DisplayPropertyDemo> = {
  title: 'Lessons/css-1.3/DisplayPropertyDemo',
  component: DisplayPropertyDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof DisplayPropertyDemo>;

export const Default: Story = {};

/**
 * Tests switching to inline display
 */
export const SwitchToInline: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click inline button
    const inlineBtn = canvas.getByRole('button', { name: /display: inline$/i });
    await userEvent.click(inlineBtn);

    // Should show inline description
    expect(canvasElement.textContent).toContain('Flows with text');
  },
};

/**
 * Tests switching to inline-block display
 */
export const SwitchToInlineBlock: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click inline-block button
    const inlineBlockBtn = canvas.getByRole('button', { name: /display: inline-block/i });
    await userEvent.click(inlineBlockBtn);

    // Should show inline-block description
    expect(canvasElement.textContent).toContain('Best of both');
  },
};

/**
 * Tests property behavior table for block
 */
export const PropertyBehaviorBlock: Story = {
  play: async ({ canvasElement }) => {
    // Block should have all properties working
    expect(canvasElement.textContent).toContain('Property Behavior');
    expect(canvasElement.textContent).toContain('width');
    expect(canvasElement.textContent).toContain('height');

    // All should show "Works" for block
    const worksBadges = canvasElement.querySelectorAll('.border-success');
    expect(worksBadges.length).toBeGreaterThanOrEqual(4);
  },
};

/**
 * Tests property behavior table for inline
 */
export const PropertyBehaviorInline: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to inline
    const inlineBtn = canvas.getByRole('button', { name: /display: inline$/i });
    await userEvent.click(inlineBtn);

    // Should show some properties as ignored
    expect(canvasElement.textContent).toContain('Ignored');
  },
};

/**
 * Tests width slider control
 */
export const WidthSlider: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Width:');
    const sliders = canvasElement.querySelectorAll('input[type="range"]');
    expect(sliders.length).toBeGreaterThanOrEqual(3);
  },
};

/**
 * Tests live preview shows boxes
 */
export const LivePreview: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Live Preview');
    expect(canvasElement.textContent).toContain('Box 1');
    expect(canvasElement.textContent).toContain('Box 2');
  },
};

/**
 * Tests side-by-side comparison
 */
export const SideByComparison: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Side-by-Side Comparison');
    expect(canvasElement.textContent).toContain('display: block');
    expect(canvasElement.textContent).toContain('display: inline');
    expect(canvasElement.textContent).toContain('display: inline-block');
  },
};

/**
 * Tests common use cases section
 */
export const CommonUseCases: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('When to Use Each');
    expect(canvasElement.textContent).toContain('Divs, sections');
    expect(canvasElement.textContent).toContain('Spans, links');
    expect(canvasElement.textContent).toContain('Buttons, badges');
  },
};

/**
 * Tests code snippet display
 */
export const CodeSnippetShown: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Display Property Values');
    expect(canvasElement.textContent).toContain('display: block');
  },
};
