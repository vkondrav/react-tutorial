import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import FlexShorthandDemo from '@lessons/css/2_2/FlexShorthandDemo';

const meta: Meta<typeof FlexShorthandDemo> = {
  title: 'Lessons/css-2.2/FlexShorthandDemo',
  component: FlexShorthandDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof FlexShorthandDemo>;

export const Default: Story = {};

/**
 * Tests applying Equal Width preset
 */
export const ApplyEqualWidthPreset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const presetBtn = canvas.getByRole('button', { name: /Equal Width/i });
    await userEvent.click(presetBtn);

    // All boxes should show 1 / 1 / 0%
    expect(canvasElement.textContent).toContain('1 / 1 / 0%');
  },
};

/**
 * Tests applying Fixed Width preset
 */
export const ApplyFixedWidthPreset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const presetBtn = canvas.getByRole('button', { name: /Fixed Width/i });
    await userEvent.click(presetBtn);

    // All boxes should show 0 / 0 / 100px
    expect(canvasElement.textContent).toContain('0 / 0 / 100px');
  },
};

/**
 * Tests flex shorthand explanation
 */
export const FlexShorthandExplanation: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('flex Shorthand');
    expect(canvasElement.textContent).toContain('grow');
    expect(canvasElement.textContent).toContain('shrink');
    expect(canvasElement.textContent).toContain('basis');
  },
};

/**
 * Tests container width slider exists
 */
export const ContainerWidthSlider: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Container Width');
    const sliders = canvasElement.querySelectorAll('input[type="range"]');
    expect(sliders.length).toBeGreaterThanOrEqual(1);
  },
};

/**
 * Tests box controls are present
 */
export const BoxControlsPresent: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Box 1');
    expect(canvasElement.textContent).toContain('Box 2');
    expect(canvasElement.textContent).toContain('Box 3');
    expect(canvasElement.textContent).toContain('flex-grow');
    expect(canvasElement.textContent).toContain('flex-shrink');
    expect(canvasElement.textContent).toContain('flex-basis');
  },
};

/**
 * Tests common flex values section
 */
export const CommonFlexValues: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Common flex Values');
    expect(canvasElement.textContent).toContain('flex: 1');
    expect(canvasElement.textContent).toContain('flex: auto');
    expect(canvasElement.textContent).toContain('flex: none');
  },
};

/**
 * Tests code snippet is shown
 */
export const CodeSnippetShown: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Flex Shorthand Reference');
  },
};
