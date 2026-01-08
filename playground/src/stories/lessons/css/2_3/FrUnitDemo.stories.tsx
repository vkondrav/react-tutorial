import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import FrUnitDemo from '@lessons/css/2_3/FrUnitDemo';

const meta: Meta<typeof FrUnitDemo> = {
  title: 'Lessons/CSS/2.3 CSS Grid/FrUnitDemo',
  component: FrUnitDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof FrUnitDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check preset buttons are present
    await expect(canvas.getByRole('button', { name: '1fr 1fr 1fr' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: '200px 1fr' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: '100px 1fr 2fr' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: '1fr 2fr 1fr' })).toBeInTheDocument();

    // Check container width control
    await expect(canvas.getByText('Container Width:')).toBeInTheDocument();
  },
};

export const EqualPreset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click equal preset
    const equalBtn = canvas.getByRole('button', { name: '1fr 1fr 1fr' });
    await user.click(equalBtn);

    await waitFor(() => {
      expect(equalBtn).toHaveClass('btn-primary');
    });

    // Check description
    await expect(canvas.getByText(/Equal thirds/)).toBeInTheDocument();
  },
};

export const SidebarPreset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click sidebar preset
    const sidebarBtn = canvas.getByRole('button', { name: '200px 1fr' });
    await user.click(sidebarBtn);

    await waitFor(() => {
      expect(sidebarBtn).toHaveClass('btn-primary');
    });

    // Check description
    await expect(canvas.getByText(/Fixed sidebar/)).toBeInTheDocument();
  },
};

export const MixedPreset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click mixed preset
    const mixedBtn = canvas.getByRole('button', { name: '100px 1fr 2fr' });
    await user.click(mixedBtn);

    await waitFor(() => {
      expect(mixedBtn).toHaveClass('btn-primary');
    });

    // Check description
    await expect(canvas.getByText(/Fixed.*\+ 1 part \+ 2 parts/)).toBeInTheDocument();
  },
};

export const CalculationBreakdown: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check calculation breakdown is present
    await expect(canvas.getByText('Calculation Breakdown:')).toBeInTheDocument();
    await expect(canvas.getByText(/Container:/)).toBeInTheDocument();
    await expect(canvas.getByText(/Free space:/)).toBeInTheDocument();
  },
};

export const KeyInsight: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check key insight is present
    await expect(canvas.getByText('Key Insight')).toBeInTheDocument();
    await expect(canvas.getByText(/smarter than percentages/)).toBeInTheDocument();
  },
};

export const LegendPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check legend items
    await expect(canvas.getByText('Fixed (px)')).toBeInTheDocument();
    await expect(canvas.getByText('Flexible (fr)')).toBeInTheDocument();
  },
};
