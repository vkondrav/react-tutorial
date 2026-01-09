import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import ReducedMotionDemo from '@lessons/css/4_3/ReducedMotionDemo';

const meta: Meta<typeof ReducedMotionDemo> = {
  title: 'Lessons/css-4.3/ReducedMotionDemo',
  component: ReducedMotionDemo,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ReducedMotionDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check initial state
    await waitFor(() => {
      expect(canvas.getByText('Simulate Reduced Motion')).toBeInTheDocument();
    });
    expect(canvas.getByText('Motion Enabled')).toBeInTheDocument();
  },
};

export const ToggleReducedMotion: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find toggle
    await waitFor(() => {
      expect(canvas.getByRole('checkbox')).toBeInTheDocument();
    });
    const toggle = canvas.getByRole('checkbox');

    // Toggle on
    await userEvent.click(toggle);

    await waitFor(() => {
      expect(canvas.getByText('Motion Reduced')).toBeInTheDocument();
    });

    // Check that descriptions change
    expect(canvas.getByText('Reduced: Gentle pulse instead of spin')).toBeInTheDocument();

    // Toggle off
    await userEvent.click(toggle);

    await waitFor(() => {
      expect(canvas.getByText('Motion Enabled')).toBeInTheDocument();
    });
    expect(canvas.getByText('Normal: Continuous rotation')).toBeInTheDocument();
  },
};

export const BestPractices: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check best practices are present
    await waitFor(() => {
      expect(canvas.getByText('Keep essential feedback')).toBeInTheDocument();
    });
    expect(canvas.getByText("Replace, don't remove")).toBeInTheDocument();
    expect(canvas.getByText('Reduce duration')).toBeInTheDocument();
    expect(canvas.getByText('Respect the preference')).toBeInTheDocument();
  },
};

export const AutoplayWarning: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check warning is present
    await waitFor(() => {
      expect(canvas.getByText('Never autoplay large animations')).toBeInTheDocument();
    });
    const pageText = canvasElement.textContent || '';
    expect(pageText).toContain('vestibular disorders');
  },
};

export const ShowCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click show code button
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Show CSS Code' })).toBeInTheDocument();
    });
    const showCodeButton = canvas.getByRole('button', { name: 'Show CSS Code' });
    await userEvent.click(showCodeButton);

    // Check that code is displayed
    await waitFor(() => {
      const pageText = canvasElement.textContent || '';
      expect(pageText).toMatch(/Reduced Motion Pattern/);
    });

    // Check for CSS content
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/prefers-reduced-motion/);

    // Hide code
    const hideCodeButton = canvas.getByRole('button', { name: 'Hide CSS Code' });
    await userEvent.click(hideCodeButton);
  },
};
