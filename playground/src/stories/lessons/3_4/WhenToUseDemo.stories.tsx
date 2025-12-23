import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import WhenToUseDemo from '@lessons/3_4/WhenToUseDemo';

const meta: Meta<typeof WhenToUseDemo> = {
  title: 'Lessons/3.4 useMemo & useCallback/WhenToUseDemo',
  component: WhenToUseDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Decision guide for when to use useMemo and useCallback, and when NOT to use them.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows decision guide
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Should have title
    expect(canvasElement.textContent).toContain('Decision Guide');

    // Should show DO use section
    expect(canvasElement.textContent).toContain('DO Use When');

    // Should show DON'T use section
    expect(canvasElement.textContent).toContain("DON'T Use When");
  },
};

/**
 * Tests DO use scenarios are listed
 */
export const ShowsDoUseScenarios: Story = {
  play: async ({ canvasElement }) => {
    // Should show useMemo scenarios
    expect(canvasElement.textContent).toContain('Filtering/sorting large arrays');
    expect(canvasElement.textContent).toContain('Complex calculations');

    // Should show useCallback scenarios
    expect(canvasElement.textContent).toContain('Passing callbacks to React.memo');
    expect(canvasElement.textContent).toContain('useEffect dependencies');
  },
};

/**
 * Tests DON'T use scenarios are listed
 */
export const ShowsDontUseScenarios: Story = {
  play: async ({ canvasElement }) => {
    // Should show don't use scenarios
    expect(canvasElement.textContent).toContain('Simple calculations');
    expect(canvasElement.textContent).toContain('Primitives or small objects');
    expect(canvasElement.textContent).toContain('not passed to memoized children');
    expect(canvasElement.textContent).toContain('Premature optimization');
  },
};

/**
 * Tests hidden cost section
 */
export const ShowsHiddenCost: Story = {
  play: async ({ canvasElement }) => {
    // Should show hidden cost section
    expect(canvasElement.textContent).toContain('Hidden Cost');
    expect(canvasElement.textContent).toContain('Memory');
    expect(canvasElement.textContent).toContain('Comparison');
    expect(canvasElement.textContent).toContain('Complexity');
    expect(canvasElement.textContent).toContain('stale values');
  },
};

/**
 * Tests rule of thumb
 */
export const ShowsRuleOfThumb: Story = {
  play: async ({ canvasElement }) => {
    // Should show rule of thumb
    expect(canvasElement.textContent).toContain('Rule of thumb');
    expect(canvasElement.textContent).toContain('without memoization first');
    expect(canvasElement.textContent).toContain('React DevTools Profiler');
  },
};
