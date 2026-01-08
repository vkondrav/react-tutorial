import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import KeyframesDemo from '@lessons/css/3_2/KeyframesDemo';

const meta: Meta<typeof KeyframesDemo> = {
  title: 'Lessons/CSS/3.2 Transitions & Animations/KeyframesDemo',
  component: KeyframesDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof KeyframesDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check preset buttons
    await expect(canvas.getByRole('button', { name: 'bounce' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'pulse' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'shake' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'spin' })).toBeInTheDocument();

    // Bounce is selected by default
    const bounceBtn = canvas.getByRole('button', { name: 'bounce' });
    expect(bounceBtn).toHaveClass('btn-primary');
  },
};

export const SwitchAnimationPresets: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click pulse preset
    await user.click(canvas.getByRole('button', { name: 'pulse' }));

    await waitFor(() => {
      const pulseBtn = canvas.getByRole('button', { name: 'pulse' });
      expect(pulseBtn).toHaveClass('btn-primary');
    });

    // Click spin preset
    await user.click(canvas.getByRole('button', { name: 'spin' }));

    await waitFor(() => {
      const spinBtn = canvas.getByRole('button', { name: 'spin' });
      expect(spinBtn).toHaveClass('btn-primary');
    });
  },
};

export const IterationCount: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Check iteration count buttons
    await expect(canvas.getByRole('button', { name: '1' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: '2' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: '3' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'infinite' })).toBeInTheDocument();

    // Click 1
    await user.click(canvas.getByRole('button', { name: '1' }));

    await waitFor(() => {
      expect(canvas.getByRole('button', { name: '1' })).toHaveClass('btn-primary');
    });
  },
};

export const FillModeSelect: Story = {
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();

    // Find fill mode select
    const selects = canvasElement.querySelectorAll('select');
    const fillModeSelect = selects[0];
    expect(fillModeSelect).toBeInTheDocument();

    // Change fill mode
    await user.selectOptions(fillModeSelect, 'forwards');

    await waitFor(() => {
      expect(fillModeSelect).toHaveValue('forwards');
    });
  },
};

export const DirectionSelect: Story = {
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();

    // Find direction select (second select)
    const selects = canvasElement.querySelectorAll('select');
    const directionSelect = selects[1];
    expect(directionSelect).toBeInTheDocument();

    // Change direction
    await user.selectOptions(directionSelect, 'alternate');

    await waitFor(() => {
      expect(directionSelect).toHaveValue('alternate');
    });
  },
};

export const PlayPauseControls: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find pause button (animation starts playing)
    const pauseBtn = canvas.getByRole('button', { name: 'Pause' });
    expect(pauseBtn).toBeInTheDocument();

    await user.click(pauseBtn);

    // Should change to Play
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    });
  },
};

export const RestartAnimation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find restart button
    const restartBtn = canvas.getByRole('button', { name: 'Restart' });
    expect(restartBtn).toBeInTheDocument();

    await user.click(restartBtn);
  },
};

export const FillModeExplanation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check fill mode explanation section
    await expect(canvas.getByText('animation-fill-mode Explained')).toBeInTheDocument();

    // Check fill mode options exist in page content
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/forwards/);
    expect(pageText).toMatch(/backwards/);
    expect(pageText).toMatch(/both/);
  },
};

export const GeneratedCSS: Story = {
  play: async ({ canvasElement }) => {
    // Check generated CSS is displayed in a CodeSnippet
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/animation:/);
  },
};
