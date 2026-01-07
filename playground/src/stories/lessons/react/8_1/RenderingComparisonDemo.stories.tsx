import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import RenderingComparisonDemo from '@lessons/react/8_1/RenderingComparisonDemo';

const meta: Meta<typeof RenderingComparisonDemo> = {
  title: 'Lessons/react-8.1/RenderingComparisonDemo',
  component: RenderingComparisonDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Side-by-side animated comparison of Client-Side Rendering vs Server-Side Rendering timelines.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows CSR vs SSR comparison
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show Play button
    expect(canvas.getByRole('button', { name: /Play Comparison/i })).toBeInTheDocument();

    // Should show both CSR and SSR sections
    expect(canvasElement.textContent).toContain('Client-Side Rendering');
    expect(canvasElement.textContent).toContain('Server-Side Rendering');

    // Should show key difference section
    expect(canvasElement.textContent).toContain('Key Difference');
  },
};

/**
 * Tests clicking the Play button
 */
export const PlayAnimation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Play button
    const playButton = canvas.getByRole('button', { name: /Play Comparison/i });
    await userEvent.click(playButton);

    // Button should change to "Playing..."
    expect(canvas.getByRole('button', { name: /Playing/i })).toBeInTheDocument();
  },
};

/**
 * Tests the Reset button
 */
export const ResetAfterPlay: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Play button
    await userEvent.click(canvas.getByRole('button', { name: /Play Comparison/i }));

    // Click Reset button
    const resetButton = canvas.getByRole('button', { name: /Reset/i });
    await userEvent.click(resetButton);

    // Play button should be available again
    expect(canvas.getByRole('button', { name: /Play Comparison/i })).toBeInTheDocument();
  },
};

/**
 * Verifies timeline steps are shown
 */
export const ShowsTimelineSteps: Story = {
  play: async ({ canvasElement }) => {
    // CSR steps
    expect(canvasElement.textContent).toContain('Download HTML');
    expect(canvasElement.textContent).toContain('Download JS Bundle');
    expect(canvasElement.textContent).toContain('Render Content');

    // SSR steps
    expect(canvasElement.textContent).toContain('Server fetches data');
    expect(canvasElement.textContent).toContain('Server renders HTML');
    expect(canvasElement.textContent).toContain('Hydrate');
  },
};
