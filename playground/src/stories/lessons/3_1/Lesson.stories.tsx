import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson3_1 from '@lessons/3_1';

const meta: Meta<typeof Lesson3_1> = {
  title: 'Lessons/3.1/Lesson',
  component: Lesson3_1,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full lesson page for useEffect: Side Effects & Lifecycle - covers effect basics, dependency arrays, cleanup functions, and effect timing.',
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
    expect(canvasElement.textContent).toContain('useEffect: Side Effects & Lifecycle');
    expect(canvasElement.textContent).toContain('Module 3');
    expect(canvasElement.textContent).toContain('Lesson 1');

    // Should have all section titles
    expect(canvasElement.textContent).toContain('What Are Side Effects?');
    expect(canvasElement.textContent).toContain('The Dependency Array');
    expect(canvasElement.textContent).toContain('When Do Effects Run?');
    expect(canvasElement.textContent).toContain('Cleanup Functions');
    expect(canvasElement.textContent).toContain('useEffect Playground');
    expect(canvasElement.textContent).toContain('Key Takeaways');

    // Should have interactive demos
    expect(canvas.getAllByRole('button').length).toBeGreaterThan(0);
  },
};

/**
 * Verifies side effects examples are listed
 */
export const ShowsSideEffectsExamples: Story = {
  play: async ({ canvasElement }) => {
    // Should show examples of side effects
    expect(canvasElement.textContent).toContain('Fetching data from an API');
    expect(canvasElement.textContent).toContain('Setting up subscriptions');
    expect(canvasElement.textContent).toContain('Manually changing the DOM');
    expect(canvasElement.textContent).toContain('Setting timers');
    expect(canvasElement.textContent).toContain('Logging to the console');
    expect(canvasElement.textContent).toContain('Storing data in localStorage');

    // Should show NOT side effects
    expect(canvasElement.textContent).toContain('Calculating derived values');
    expect(canvasElement.textContent).toContain('Rendering JSX');
    expect(canvasElement.textContent).toContain('Event handlers');
  },
};

/**
 * Verifies takeaways are present
 */
export const ShowsTakeaways: Story = {
  play: async ({ canvasElement }) => {
    // Should show all takeaways
    expect(canvasElement.textContent).toContain('useEffect runs after render');
    expect(canvasElement.textContent).toContain(
      'Empty dependency array [] = run once on mount only'
    );
    expect(canvasElement.textContent).toContain(
      'Dependencies in array = re-run when those values change'
    );
    expect(canvasElement.textContent).toContain('No array = run after every render');
    expect(canvasElement.textContent).toContain(
      'Return a cleanup function to prevent memory leaks'
    );
    expect(canvasElement.textContent).toContain(
      'Cleanup runs before the effect re-runs AND on unmount'
    );
    expect(canvasElement.textContent).toContain("Don't lie about dependencies");
  },
};
