import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson3_5 from '@lessons/3_5';

const meta: Meta<typeof Lesson3_5> = {
  title: 'Lessons/3.5 Custom Hooks/Lesson',
  component: Lesson3_5,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full lesson page for Custom Hooks: Reusable Logic - covers extracting stateful logic, common patterns, and building your own hooks.',
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
    expect(canvasElement.textContent).toContain('Custom Hooks: Reusable Logic');
    expect(canvasElement.textContent).toContain('Module 3');
    expect(canvasElement.textContent).toContain('Lesson 5');

    // Should have all section titles
    expect(canvasElement.textContent).toContain('What are Custom Hooks?');
    expect(canvasElement.textContent).toContain('Extracting Logic into Hooks');
    expect(canvasElement.textContent).toContain('Common Custom Hook Patterns');
    expect(canvasElement.textContent).toContain('Custom Hooks Playground');
    expect(canvasElement.textContent).toContain('Key Takeaways');

    // Should have interactive demos
    expect(canvas.getAllByRole('button').length).toBeGreaterThan(0);
  },
};

/**
 * Verifies why custom hooks and rules are listed
 */
export const ShowsWhyAndRules: Story = {
  play: async ({ canvasElement }) => {
    // Should show why custom hooks
    expect(canvasElement.textContent).toContain('Why Custom Hooks?');
    expect(canvasElement.textContent).toContain('Share logic between components');
    expect(canvasElement.textContent).toContain('Keep components clean');
    expect(canvasElement.textContent).toContain('easier to test');

    // Should show rules
    expect(canvasElement.textContent).toContain('Rules');
    expect(canvasElement.textContent).toContain('start with');
    expect(canvasElement.textContent).toContain('use');
    expect(canvasElement.textContent).toContain('Follow the Rules of Hooks');
  },
};

/**
 * Verifies takeaways are present
 */
export const ShowsTakeaways: Story = {
  play: async ({ canvasElement }) => {
    // Should show all takeaways
    expect(canvasElement.textContent).toContain('extract reusable stateful logic');
    expect(canvasElement.textContent).toContain('Name must start with "use"');
    expect(canvasElement.textContent).toContain('can call other hooks');
    expect(canvasElement.textContent).toContain('isolated state');
    expect(canvasElement.textContent).toContain('Return an array');
    expect(canvasElement.textContent).toContain('form handling, data fetching');
  },
};
