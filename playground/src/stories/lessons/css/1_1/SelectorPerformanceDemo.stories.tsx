import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import SelectorPerformanceDemo from '@lessons/css/1_1/SelectorPerformanceDemo';

const meta: Meta<typeof SelectorPerformanceDemo> = {
  title: 'Lessons/css-1.1/SelectorPerformanceDemo',
  component: SelectorPerformanceDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates how browsers parse CSS selectors right-to-left and visualizes the efficiency of different selector patterns.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing selector efficiency comparison.
 */
export const Default: Story = {};

/**
 * Tests switching between selector examples.
 */
export const SwitchSelectors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially shows first selector
    expect(canvasElement.textContent).toContain('.nav-link');
    expect(canvasElement.textContent).toContain('Good');

    // Click on a different selector
    const badSelector = canvas.getByRole('button', { name: /div\.container ul li a\.link/i });
    await userEvent.click(badSelector);

    // Should show the new selector info
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Avoid');
      expect(canvasElement.textContent).toContain('Very deep');
    });
  },
};

/**
 * Tests the animation button triggers parsing visualization.
 */
export const AnimateParsing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the animation button
    const animateButton = canvas.getByRole('button', { name: /See Right-to-Left/i });
    await userEvent.click(animateButton);

    // Button should change text while animating
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Parsing...');
    });

    // Wait for animation to complete
    await waitFor(
      () => {
        expect(canvasElement.textContent).toContain('See Right-to-Left');
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests showing the universal selector warning.
 */
export const UniversalSelectorWarning: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on the universal selector example
    const universalButton = canvas.getByRole('button', { name: /\* \.content/i });
    await userEvent.click(universalButton);

    // Should show warning about universal selector
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Universal selector');
      expect(canvasElement.textContent).toContain('EVERY element');
      expect(canvasElement.textContent).toContain('Avoid');
    });
  },
};

/**
 * Shows good practices section.
 */
export const ShowsGoodPractices: Story = {
  play: async ({ canvasElement }) => {
    // Should show good practices
    expect(canvasElement.textContent).toContain('Good Practices');
    expect(canvasElement.textContent).toContain('Use class selectors');
    expect(canvasElement.textContent).toContain('Keep selectors short');

    // Should show things to avoid
    expect(canvasElement.textContent).toContain('Avoid');
    expect(canvasElement.textContent).toContain('Universal selectors');
    expect(canvasElement.textContent).toContain('Deep descendant chains');
  },
};
