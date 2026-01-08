import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import BezierCurvesDemo from '@lessons/css/3_2/BezierCurvesDemo';

const meta: Meta<typeof BezierCurvesDemo> = {
  title: 'Lessons/CSS/3.2 Transitions & Animations/BezierCurvesDemo',
  component: BezierCurvesDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof BezierCurvesDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check preset buttons
    await expect(canvas.getByRole('button', { name: 'linear' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'ease' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'ease-in' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'ease-out' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'ease-in-out' })).toBeInTheDocument();

    // Ease is selected by default
    const easeBtn = canvas.getByRole('button', { name: 'ease' });
    expect(easeBtn).toHaveClass('btn-primary');
  },
};

export const SwitchPresets: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click linear preset
    await user.click(canvas.getByRole('button', { name: 'linear' }));

    await waitFor(() => {
      const linearBtn = canvas.getByRole('button', { name: 'linear' });
      expect(linearBtn).toHaveClass('btn-primary');
    });

    // Click bounce preset
    await user.click(canvas.getByRole('button', { name: 'bounce' }));

    await waitFor(() => {
      const bounceBtn = canvas.getByRole('button', { name: 'bounce' });
      expect(bounceBtn).toHaveClass('btn-primary');
    });
  },
};

export const BezierCurveCanvas: Story = {
  play: async ({ canvasElement }) => {
    // Check canvas element exists
    const canvasEl = canvasElement.querySelector('canvas');
    expect(canvasEl).toBeInTheDocument();
  },
};

export const ControlPointSliders: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check control point labels
    await expect(canvas.getByText('x1')).toBeInTheDocument();
    await expect(canvas.getByText('y1')).toBeInTheDocument();
    await expect(canvas.getByText('x2')).toBeInTheDocument();
    await expect(canvas.getByText('y2')).toBeInTheDocument();

    // Check sliders exist
    const sliders = canvasElement.querySelectorAll('input[type="range"]');
    expect(sliders.length).toBe(4);
  },
};

export const PlayAnimation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find and click play button
    const playBtn = canvas.getByRole('button', { name: 'Play Animation' });
    expect(playBtn).toBeInTheDocument();

    await user.click(playBtn);
  },
};

export const TimingFunctionGuide: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check timing function guide
    await expect(canvas.getByText('When to Use Each')).toBeInTheDocument();
    await expect(canvas.getByText(/ease-out \(Entrances\)/i)).toBeInTheDocument();
    await expect(canvas.getByText(/ease-in \(Exits\)/i)).toBeInTheDocument();
  },
};

export const CubicBezierOutput: Story = {
  play: async ({ canvasElement }) => {
    // Check cubic-bezier output is displayed
    const codeBlocks = canvasElement.querySelectorAll('.font-mono');
    const hasCubicBezier = Array.from(codeBlocks).some((block) =>
      block.textContent?.includes('cubic-bezier')
    );
    expect(hasCubicBezier).toBe(true);
  },
};
