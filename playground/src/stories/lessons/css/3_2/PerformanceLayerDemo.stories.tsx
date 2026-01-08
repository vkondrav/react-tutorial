import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import PerformanceLayerDemo from '@lessons/css/3_2/PerformanceLayerDemo';

const meta: Meta<typeof PerformanceLayerDemo> = {
  title: 'Lessons/CSS/3.2 Transitions & Animations/PerformanceLayerDemo',
  component: PerformanceLayerDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof PerformanceLayerDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check type toggle buttons
    await expect(canvas.getByRole('button', { name: /transform \(GPU\)/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /left \(Layout\)/i })).toBeInTheDocument();

    // Transform is selected by default
    const transformBtn = canvas.getByRole('button', { name: /transform \(GPU\)/i });
    expect(transformBtn).toHaveClass('btn-success');
  },
};

export const SwitchToLeftAnimation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const leftBtn = canvas.getByRole('button', { name: /left \(Layout\)/i });
    await user.click(leftBtn);

    await waitFor(() => {
      expect(leftBtn).toHaveClass('btn-error');
    });
  },
};

export const StartStopAnimation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find start button
    const startBtn = canvas.getByRole('button', { name: /Start Animation/i });
    await user.click(startBtn);

    // Button should change to Stop
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Stop Animation/i })).toBeInTheDocument();
    });

    // Click stop
    await user.click(canvas.getByRole('button', { name: /Stop Animation/i }));

    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Start Animation/i })).toBeInTheDocument();
    });
  },
};

export const RenderingPipeline: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check pipeline sections
    await expect(canvas.getByText('The Rendering Pipeline')).toBeInTheDocument();

    // Check pipeline phases exist in the component
    const pipelineText = canvasElement.textContent || '';
    expect(pipelineText).toMatch(/Layout/);
    expect(pipelineText).toMatch(/Paint/);
    expect(pipelineText).toMatch(/Composite/);
  },
};

export const PropertyGuide: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check property guide
    await expect(canvas.getByText('Property Performance Guide')).toBeInTheDocument();

    // Check guide text exists
    const guideText = canvasElement.textContent || '';
    expect(guideText).toMatch(/Safe to Animate/i);
    expect(guideText).toMatch(/Avoid Animating/i);
  },
};

export const CodeExample: Story = {
  play: async ({ canvasElement }) => {
    // Check code snippet exists
    const codeSnippets = canvasElement.querySelectorAll('.bg-base-300');
    expect(codeSnippets.length).toBeGreaterThan(0);
  },
};
