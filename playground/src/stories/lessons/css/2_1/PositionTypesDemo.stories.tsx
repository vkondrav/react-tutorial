import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import PositionTypesDemo from '@lessons/css/2_1/PositionTypesDemo';

const meta: Meta<typeof PositionTypesDemo> = {
  title: 'Lessons/css-2.1/PositionTypesDemo',
  component: PositionTypesDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof PositionTypesDemo>;

export const Default: Story = {};

/**
 * Tests switching to relative position
 */
export const SwitchToRelative: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const relativeBtn = canvas.getByRole('button', { name: /^relative$/i });
    await userEvent.click(relativeBtn);

    expect(canvasElement.textContent).toContain('stays in flow');
    expect(canvasElement.textContent).toContain('In Flow');
  },
};

/**
 * Tests switching to absolute position
 */
export const SwitchToAbsolute: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const absoluteBtn = canvas.getByRole('button', { name: /^absolute$/i });
    await userEvent.click(absoluteBtn);

    expect(canvasElement.textContent).toContain('Removed from flow');
    expect(canvasElement.textContent).toContain('Out of Flow');
  },
};

/**
 * Tests switching to fixed position
 */
export const SwitchToFixed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const fixedBtn = canvas.getByRole('button', { name: /^fixed$/i });
    await userEvent.click(fixedBtn);

    expect(canvasElement.textContent).toContain('viewport');
    expect(canvasElement.textContent).toContain('Out of Flow');
  },
};

/**
 * Tests switching to sticky position
 */
export const SwitchToSticky: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const stickyBtn = canvas.getByRole('button', { name: /^sticky$/i });
    await userEvent.click(stickyBtn);

    expect(canvasElement.textContent).toContain('Hybrid');
    expect(canvasElement.textContent).toContain('Scroll the container');
  },
};

/**
 * Tests offset controls appear for non-static
 */
export const OffsetControlsAppear: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click relative to show controls
    const relativeBtn = canvas.getByRole('button', { name: /^relative$/i });
    await userEvent.click(relativeBtn);

    expect(canvasElement.textContent).toContain('Offset Values');
    expect(canvasElement.textContent).toContain('top:');
    expect(canvasElement.textContent).toContain('left:');
  },
};

/**
 * Tests the essential pattern tip
 */
export const EssentialPatternTip: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Essential Pattern');
    expect(canvasElement.textContent).toContain('Relative Parent');
    expect(canvasElement.textContent).toContain('Absolute Child');
  },
};

/**
 * Tests info card shows position details
 */
export const InfoCardShown: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('position:');
    expect(canvasElement.textContent).toContain('Document Flow');
    expect(canvasElement.textContent).toContain('Positioned Relative To');
  },
};

/**
 * Tests code snippet is shown
 */
export const CodeSnippetShown: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Position Types Reference');
  },
};
