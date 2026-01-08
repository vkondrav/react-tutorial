import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import GradientDemo from '@lessons/css/3_1/GradientDemo';

const meta: Meta<typeof GradientDemo> = {
  title: 'Lessons/CSS/3.1 Backgrounds & Borders/GradientDemo',
  component: GradientDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof GradientDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check gradient type buttons are present
    await expect(canvas.getByRole('button', { name: 'linear-gradient' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'radial-gradient' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'conic-gradient' })).toBeInTheDocument();

    // Check linear is selected by default
    const linearBtn = canvas.getByRole('button', { name: 'linear-gradient' });
    expect(linearBtn).toHaveClass('btn-primary');
  },
};

export const SwitchToRadial: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const radialBtn = canvas.getByRole('button', { name: 'radial-gradient' });
    await user.click(radialBtn);

    await waitFor(() => {
      expect(radialBtn).toHaveClass('btn-primary');
    });

    // Check radial-specific controls appear
    await expect(canvas.getByRole('button', { name: 'circle' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'ellipse' })).toBeInTheDocument();
  },
};

export const SwitchToConic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const conicBtn = canvas.getByRole('button', { name: 'conic-gradient' });
    await user.click(conicBtn);

    await waitFor(() => {
      expect(conicBtn).toHaveClass('btn-primary');
    });

    // Check conic-specific controls appear
    await expect(canvas.getByText('Start Angle')).toBeInTheDocument();
  },
};

export const ColorPresets: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Check color preset buttons
    await expect(canvas.getByRole('button', { name: 'Sunset' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Ocean' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Forest' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Fire' })).toBeInTheDocument();

    // Click a preset
    await user.click(canvas.getByRole('button', { name: 'Ocean' }));
  },
};

export const HardStopsToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find and click the hard stops checkbox
    const hardStopsCheckbox = canvas.getByRole('checkbox', { name: 'Hard stops (sharp edges)' });
    expect(hardStopsCheckbox).not.toBeChecked();

    await user.click(hardStopsCheckbox);

    await waitFor(() => {
      expect(hardStopsCheckbox).toBeChecked();
    });
  },
};

export const ThreeColorsToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const threeColorsCheckbox = canvas.getByRole('checkbox', { name: 'Three colors' });
    expect(threeColorsCheckbox).toBeChecked();

    await user.click(threeColorsCheckbox);

    await waitFor(() => {
      expect(threeColorsCheckbox).not.toBeChecked();
    });
  },
};

export const AnglePresets: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Check angle preset buttons for linear gradient
    await expect(canvas.getByRole('button', { name: '0°' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: '45°' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: '90°' })).toBeInTheDocument();

    // Click 45 degree preset
    await user.click(canvas.getByRole('button', { name: '45°' }));

    await waitFor(() => {
      const btn = canvas.getByRole('button', { name: '45°' });
      expect(btn).toHaveClass('btn-primary');
    });
  },
};

export const CommonUseCases: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check common use cases section
    await expect(canvas.getByText('Common Use Cases')).toBeInTheDocument();
    await expect(canvas.getByText('Hero Background')).toBeInTheDocument();
    await expect(canvas.getByText('Image Overlay')).toBeInTheDocument();
  },
};

export const HardStopExplanation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check hard stop explanation section
    await expect(canvas.getByText('Hard Stops vs Smooth Transitions')).toBeInTheDocument();
    await expect(canvas.getByText(/Smooth transition/)).toBeInTheDocument();
    await expect(canvas.getByText(/Sharp edge at 50%/)).toBeInTheDocument();
  },
};
