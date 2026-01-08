import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import MediaQueryDemo from '@lessons/css/2_4/MediaQueryDemo';

const meta: Meta<typeof MediaQueryDemo> = {
  title: 'Lessons/CSS/2.4 Responsive Strategy/MediaQueryDemo',
  component: MediaQueryDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof MediaQueryDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check approach buttons are present
    await expect(
      canvas.getByRole('button', { name: 'Mobile-First (min-width)' })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Desktop-First (max-width)' })
    ).toBeInTheDocument();

    // Check mobile-first is selected by default
    const mobileFirstBtn = canvas.getByRole('button', { name: 'Mobile-First (min-width)' });
    await expect(mobileFirstBtn).toHaveClass('btn-success');
  },
};

export const MobileFirstApproach: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click mobile-first
    const mobileFirstBtn = canvas.getByRole('button', { name: 'Mobile-First (min-width)' });
    await user.click(mobileFirstBtn);

    await waitFor(() => {
      expect(mobileFirstBtn).toHaveClass('btn-success');
    });

    // Check mobile-first content
    await expect(canvas.getByText('Mobile-First Approach')).toBeInTheDocument();
    await expect(canvas.getByText('Mobile-First (Recommended)')).toBeInTheDocument();
  },
};

export const DesktopFirstApproach: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click desktop-first
    const desktopFirstBtn = canvas.getByRole('button', { name: 'Desktop-First (max-width)' });
    await user.click(desktopFirstBtn);

    await waitFor(() => {
      expect(desktopFirstBtn).toHaveClass('btn-error');
    });

    // Check desktop-first content
    await expect(canvas.getByText('Desktop-First Approach')).toBeInTheDocument();
    await expect(canvas.getByText('Desktop-First (Avoid)')).toBeInTheDocument();
  },
};

export const ViewportSlider: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check viewport slider is present
    const sliders = canvasElement.querySelectorAll('input[type="range"]');
    expect(sliders.length).toBeGreaterThanOrEqual(1);

    // Check breakpoint buttons
    await expect(canvas.getByText('Mobile')).toBeInTheDocument();
    await expect(canvas.getByText('Tablet')).toBeInTheDocument();
    await expect(canvas.getByText('Desktop')).toBeInTheDocument();
  },
};

export const StylesAppliedSection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check styles applied section
    await expect(canvas.getByText('Styles Applied (in order)')).toBeInTheDocument();
    await expect(canvas.getByText('Simulated Layout')).toBeInTheDocument();
  },
};

export const ComparisonCards: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check comparison cards
    await expect(canvas.getByText('Mobile-First (Recommended)')).toBeInTheDocument();
    await expect(canvas.getByText('Desktop-First (Avoid)')).toBeInTheDocument();
    await expect(canvas.getByText(/Progressive enhancement/)).toBeInTheDocument();
    await expect(canvas.getByText(/Graceful degradation/)).toBeInTheDocument();
  },
};

export const CommonBreakpoints: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check common breakpoints info
    await expect(canvas.getByText('Common Breakpoints')).toBeInTheDocument();
    await expect(canvas.getByText(/sm: 640px/)).toBeInTheDocument();
  },
};

export const CodeExamplePresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check code example title changes based on approach
    // Default is mobile-first
    await expect(canvas.getByText('Mobile-First CSS')).toBeInTheDocument();
  },
};
