import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import FluidTypographyDemo from '@lessons/css/2_4/FluidTypographyDemo';

const meta: Meta<typeof FluidTypographyDemo> = {
  title: 'Lessons/CSS/2.4 Responsive Strategy/FluidTypographyDemo',
  component: FluidTypographyDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof FluidTypographyDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check main sections are present
    await expect(canvas.getByText('Build Your clamp() Value')).toBeInTheDocument();
    await expect(canvas.getByText('Live Preview')).toBeInTheDocument();
  },
};

export const ClampControls: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check clamp controls are present
    await expect(canvas.getByText('Min Size')).toBeInTheDocument();
    await expect(canvas.getByText('Preferred')).toBeInTheDocument();
    await expect(canvas.getByText('Max Size')).toBeInTheDocument();

    // Check sliders are present
    const sliders = canvasElement.querySelectorAll('input[type="range"]');
    expect(sliders.length).toBeGreaterThanOrEqual(3);
  },
};

export const LivePreview: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check live preview text
    await expect(canvas.getByText(/The quick brown fox/)).toBeInTheDocument();
    await expect(canvas.getByText(/Computed size:/)).toBeInTheDocument();
  },
};

export const ScalingZones: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check scaling zone labels
    await expect(canvas.getByText(/\(min\)/)).toBeInTheDocument();
    await expect(canvas.getByText('Scaling zone')).toBeInTheDocument();
    await expect(canvas.getByText(/\(max\)/)).toBeInTheDocument();
  },
};

export const HowClampWorks: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check explanation section
    await expect(canvas.getByText('How clamp() Works')).toBeInTheDocument();
  },
};

export const CommonPresets: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check presets section
    await expect(canvas.getByText('Common Typography Presets')).toBeInTheDocument();
    await expect(canvas.getByText('Body Text')).toBeInTheDocument();
    await expect(canvas.getByText('Subheading')).toBeInTheDocument();
    await expect(canvas.getByText('Heading')).toBeInTheDocument();
    await expect(canvas.getByText('Hero Title')).toBeInTheDocument();
  },
};

export const ProTips: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check pro tips
    await expect(canvas.getByText('Pro Tips')).toBeInTheDocument();
    await expect(canvas.getByText(/utopia\.fyi/)).toBeInTheDocument();
  },
};

export const CodeExamplePresent: Story = {
  play: async ({ canvasElement }) => {
    // Check code example title is present in the CodeSnippet header
    const codeSnippetHeaders = canvasElement.querySelectorAll('.bg-base-300');
    const headerTexts = Array.from(codeSnippetHeaders).map((el) => el.textContent);
    expect(headerTexts.some((t) => t?.includes('Fluid Typography'))).toBe(true);
  },
};

export const AdjustingMinSize: Story = {
  play: async ({ canvasElement }) => {
    // Find the min size slider (first range input in controls section)
    const sliders = canvasElement.querySelectorAll('input[type="range"]');
    const minSlider = sliders[0] as HTMLInputElement;

    // Verify initial value
    expect(minSlider.value).toBe('16');

    // The clamp formula should be displayed
    const codeBlock = canvasElement.querySelector('code');
    expect(codeBlock?.textContent).toContain('clamp');
  },
};

export const AdjustingPreferred: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check preferred value label is displayed
    await expect(canvas.getByText('Preferred')).toBeInTheDocument();

    // Check vw unit is used in clamp display
    const codeElements = canvasElement.querySelectorAll('code');
    const codeTexts = Array.from(codeElements).map((el) => el.textContent);
    expect(codeTexts.some((t) => t?.includes('vw'))).toBe(true);
  },
};

export const ViewportWidthSlider: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check live preview section exists
    await expect(canvas.getByText('Live Preview')).toBeInTheDocument();

    // Check breakpoint labels in the slider
    await expect(canvas.getByText('320px')).toBeInTheDocument();
    await expect(canvas.getByText('1400px')).toBeInTheDocument();
  },
};
