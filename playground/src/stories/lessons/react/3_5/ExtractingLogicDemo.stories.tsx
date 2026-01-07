import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import ExtractingLogicDemo from '@lessons/react/3_5/ExtractingLogicDemo';

const meta: Meta<typeof ExtractingLogicDemo> = {
  title: 'Lessons/react-3.5/ExtractingLogicDemo',
  component: ExtractingLogicDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Before & After comparison showing how to extract logic into a useWindowSize custom hook.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - Before (Inline) code shown
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Before & After');
    expect(canvasElement.textContent).toContain('useWindowSize');

    // Should have toggle buttons
    expect(canvas.getByRole('button', { name: /Before/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /After/i })).toBeInTheDocument();

    // Should show live demo
    expect(canvasElement.textContent).toContain('Live Demo');
    expect(canvasElement.textContent).toContain('pixels');
  },
};

/**
 * Tests switching to After (Custom Hook) view
 */
export const ShowAfterView: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click After button
    await userEvent.click(canvas.getByRole('button', { name: /After/i }));

    // Should show after code
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Custom Hook');
      expect(canvasElement.textContent).toContain('Usage');
      expect(canvasElement.textContent).toContain('Clean & Simple');
    });

    // Should show benefit message
    expect(canvasElement.textContent).toContain('Write once, use everywhere');
  },
};

/**
 * Tests switching back to Before view
 */
export const SwitchBackToBefore: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to After first
    await userEvent.click(canvas.getByRole('button', { name: /After/i }));

    // Then switch back to Before
    await userEvent.click(canvas.getByRole('button', { name: /Before/i }));

    // Should show problem message
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Problem');
      expect(canvasElement.textContent).toContain('duplicated');
    });
  },
};

/**
 * Tests live demo shows window size
 */
export const LiveDemoShowsWindowSize: Story = {
  play: async ({ canvasElement }) => {
    // Should show window dimensions
    expect(canvasElement.textContent).toContain('×');
    expect(canvasElement.textContent).toContain('pixels');

    // Should show device type badge (Mobile, Tablet, or Desktop)
    const hasBadge =
      canvasElement.textContent?.includes('Mobile') ||
      canvasElement.textContent?.includes('Tablet') ||
      canvasElement.textContent?.includes('Desktop');
    expect(hasBadge).toBe(true);
  },
};
