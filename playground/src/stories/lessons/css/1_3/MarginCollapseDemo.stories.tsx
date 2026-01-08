import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import MarginCollapseDemo from '@lessons/css/1_3/MarginCollapseDemo';

const meta: Meta<typeof MarginCollapseDemo> = {
  title: 'Lessons/css-1.3/MarginCollapseDemo',
  component: MarginCollapseDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof MarginCollapseDemo>;

export const Default: Story = {};

/**
 * Tests scenario selection
 */
export const SelectParentChildScenario: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Parent-Child scenario
    const parentChildBtn = canvas.getByRole('button', { name: /Parent-Child/i });
    await userEvent.click(parentChildBtn);

    // Should show parent-child specific content
    expect(canvasElement.textContent).toContain("Child's margin can escape");
  },
};

/**
 * Tests empty element scenario
 */
export const SelectEmptyScenario: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Empty Element scenario
    const emptyBtn = canvas.getByRole('button', { name: /Empty Element/i });
    await userEvent.click(emptyBtn);

    // Should show empty element description
    expect(canvasElement.textContent).toContain('empty element');
  },
};

/**
 * Tests applying overflow fix
 */
export const ApplyOverflowFix: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have fix buttons
    const overflowBtn = canvas.getByRole('button', { name: /overflow: hidden/i });
    await userEvent.click(overflowBtn);

    // Should show the fix is active
    expect(overflowBtn).toHaveClass('btn-success');
  },
};

/**
 * Tests applying padding fix
 */
export const ApplyPaddingFix: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const paddingBtn = canvas.getByRole('button', { name: /padding: 1px/i });
    await userEvent.click(paddingBtn);

    expect(paddingBtn).toHaveClass('btn-success');
  },
};

/**
 * Tests applying flexbox fix
 */
export const ApplyFlexboxFix: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const flexboxBtn = canvas.getByRole('button', { name: /display: flex/i });
    await userEvent.click(flexboxBtn);

    expect(flexboxBtn).toHaveClass('btn-success');
  },
};

/**
 * Tests toggling margin visibility
 */
export const ToggleMarginVisibility: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the toggle
    const toggle = canvas.getByRole('checkbox');
    expect(toggle).toBeChecked();

    await userEvent.click(toggle);
    expect(toggle).not.toBeChecked();
  },
};

/**
 * Tests math breakdown is shown
 */
export const MathBreakdown: Story = {
  play: async ({ canvasElement }) => {
    // Should show expected vs actual
    expect(canvasElement.textContent).toContain('Expected');
    expect(canvasElement.textContent).toContain('Actual');
    expect(canvasElement.textContent).toContain('30px');
    expect(canvasElement.textContent).toContain('20px');
  },
};

/**
 * Tests code snippet is displayed
 */
export const CodeSnippetShown: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Margin Collapse');
    expect(canvasElement.textContent).toContain('overflow: hidden');
  },
};
