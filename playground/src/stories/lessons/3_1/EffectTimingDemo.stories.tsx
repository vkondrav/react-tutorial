import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import EffectTimingDemo from '@lessons/3_1/EffectTimingDemo';

const meta: Meta<typeof EffectTimingDemo> = {
  title: 'Lessons/3.1/EffectTimingDemo',
  component: EffectTimingDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Visualizes the effect lifecycle with an event log. Shows mount, render, effect, and cleanup events.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows lifecycle visualizer
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Effect Lifecycle Visualization');

    // Should have remount button
    expect(canvas.getByRole('button', { name: /Remount Component/i })).toBeInTheDocument();

    // Should show lifecycle events after mount
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Lifecycle Events');
    });
  },
};

/**
 * Tests remounting the component
 */
export const Remount: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial mount events
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Component mounted');
    });

    // Click remount
    await userEvent.click(canvas.getByRole('button', { name: /Remount Component/i }));

    // New mount events should appear
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Component mounted');
    });
  },
};

/**
 * Tests updating state to trigger effect
 */
export const UpdateState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for component to be ready
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Update State/i })).toBeInTheDocument();
    });

    // Initial count should be 0
    expect(canvasElement.textContent).toContain('Count:');

    // Click update state
    await userEvent.click(canvas.getByRole('button', { name: /Update State/i }));

    // Should trigger cleanup and new effect
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('useEffect runs');
    });
  },
};

/**
 * Tests timeline explanation
 */
export const ShowsTimeline: Story = {
  play: async ({ canvasElement }) => {
    // Should show timeline phases
    expect(canvasElement.textContent).toContain('Effect Timeline');
    expect(canvasElement.textContent).toContain('Render Phase');
    expect(canvasElement.textContent).toContain('React calls your component function');
    expect(canvasElement.textContent).toContain('Browser Paint');
    expect(canvasElement.textContent).toContain('Browser updates the screen');
    expect(canvasElement.textContent).toContain('useEffect Runs');
    expect(canvasElement.textContent).toContain('after paint');
    expect(canvasElement.textContent).toContain('Cleanup (on re-render)');
  },
};

/**
 * Tests the legend
 */
export const ShowsLegend: Story = {
  play: async ({ canvasElement }) => {
    // Should show legend
    expect(canvasElement.textContent).toContain('Mount');
    expect(canvasElement.textContent).toContain('Render');
    expect(canvasElement.textContent).toContain('Effect');
    expect(canvasElement.textContent).toContain('Cleanup');
  },
};

/**
 * Tests tip about useLayoutEffect
 */
export const ShowsTip: Story = {
  play: async ({ canvasElement }) => {
    // Should show tip about useLayoutEffect
    expect(canvasElement.textContent).toContain('Why after paint?');
    expect(canvasElement.textContent).toContain("doesn't block the visual update");
    expect(canvasElement.textContent).toContain('useLayoutEffect');
  },
};
