import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson3_2 from '@lessons/3_2';

const meta: Meta<typeof Lesson3_2> = {
  title: 'Lessons/3.2/Lesson',
  component: Lesson3_2,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full lesson page for useContext: Sharing State - covers prop drilling problem, context basics, context + state pattern, and multiple contexts.',
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
    expect(canvasElement.textContent).toContain('useContext: Sharing State');
    expect(canvasElement.textContent).toContain('Module 3');
    expect(canvasElement.textContent).toContain('Lesson 2');

    // Should have all section titles
    expect(canvasElement.textContent).toContain('The Prop Drilling Problem');
    expect(canvasElement.textContent).toContain('Context to the Rescue');
    expect(canvasElement.textContent).toContain('Context with State');
    expect(canvasElement.textContent).toContain('Using Multiple Contexts');
    expect(canvasElement.textContent).toContain('Context Playground');
    expect(canvasElement.textContent).toContain('Key Takeaways');

    // Should have interactive demos
    expect(canvas.getAllByRole('button').length).toBeGreaterThan(0);
  },
};

/**
 * Verifies three steps to use context are listed
 */
export const ShowsThreeSteps: Story = {
  play: async ({ canvasElement }) => {
    // Should show three steps
    expect(canvasElement.textContent).toContain('Three Steps to Use Context');
    expect(canvasElement.textContent).toContain('Create');
    expect(canvasElement.textContent).toContain('createContext()');
    expect(canvasElement.textContent).toContain('Provide');
    expect(canvasElement.textContent).toContain('Context.Provider');
    expect(canvasElement.textContent).toContain('Consume');
    expect(canvasElement.textContent).toContain('useContext()');
  },
};

/**
 * Verifies takeaways are present
 */
export const ShowsTakeaways: Story = {
  play: async ({ canvasElement }) => {
    // Should show all takeaways
    expect(canvasElement.textContent).toContain('Context solves prop drilling');
    expect(canvasElement.textContent).toContain('Three steps: createContext()');
    expect(canvasElement.textContent).toContain('Combine Context + useState');
    expect(canvasElement.textContent).toContain('Use multiple contexts');
    expect(canvasElement.textContent).toContain('Context re-renders ALL consumers');
    expect(canvasElement.textContent).toContain("Don't overuse context");
    expect(canvasElement.textContent).toContain('Consider context for: themes');
  },
};
