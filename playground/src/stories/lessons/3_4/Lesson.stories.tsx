import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson3_4 from '@lessons/3_4';

const meta: Meta<typeof Lesson3_4> = {
  title: 'Lessons/3.4/Lesson',
  component: Lesson3_4,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full lesson page for useMemo & useCallback: Performance - covers re-render optimization, memoization patterns, and when to use them.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The complete lesson page
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have lesson header
    expect(canvasElement.textContent).toContain('useMemo & useCallback: Performance');
    expect(canvasElement.textContent).toContain('Module 3');
    expect(canvasElement.textContent).toContain('Lesson 4');

    // Should have all section titles
    expect(canvasElement.textContent).toContain('Understanding Re-renders');
    expect(canvasElement.textContent).toContain('useMemo: Caching Expensive Calculations');
    expect(canvasElement.textContent).toContain('useCallback: Caching Functions');
    expect(canvasElement.textContent).toContain('When to Use (And When NOT To)');
    expect(canvasElement.textContent).toContain('Performance Playground');
    expect(canvasElement.textContent).toContain('Key Takeaways');

    // Should have interactive demos
    expect(canvas.getAllByRole('button').length).toBeGreaterThan(0);
  },
};

/**
 * Verifies problems and solutions are listed
 */
export const ShowsProblemsAndSolutions: Story = {
  play: async ({ canvasElement }) => {
    // Should show problems
    expect(canvasElement.textContent).toContain('Problems');
    expect(canvasElement.textContent).toContain('Recalculating expensive operations');
    expect(canvasElement.textContent).toContain('Re-creating functions');
    expect(canvasElement.textContent).toContain('Unnecessary child component updates');

    // Should show solutions
    expect(canvasElement.textContent).toContain('Solutions');
    expect(canvasElement.textContent).toContain('useMemo');
    expect(canvasElement.textContent).toContain('useCallback');
    expect(canvasElement.textContent).toContain('React.memo');
  },
};

/**
 * Verifies takeaways are present
 */
export const ShowsTakeaways: Story = {
  play: async ({ canvasElement }) => {
    // Should show all takeaways
    expect(canvasElement.textContent).toContain('useMemo caches computed VALUES');
    expect(canvasElement.textContent).toContain('useCallback caches FUNCTIONS');
    expect(canvasElement.textContent).toContain('React.memo wraps components');
    expect(canvasElement.textContent).toContain("Don't optimize prematurely");
    expect(canvasElement.textContent).toContain('Memoization has memory cost');
    expect(canvasElement.textContent).toContain('Dependencies array works like useEffect');
    expect(canvasElement.textContent).toContain('Profile with React DevTools');
  },
};
