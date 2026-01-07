import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson2_4 from '@lessons/react/2_4';

const meta: Meta<typeof Lesson2_4> = {
  title: 'Lessons/react-2.4/Lesson',
  component: Lesson2_4,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full lesson page for Conditional Rendering - covers ternary operator, logical &&, and pattern comparison.',
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
    expect(canvasElement.textContent).toContain('Conditional Rendering');
    expect(canvasElement.textContent).toContain('Module 2');
    expect(canvasElement.textContent).toContain('Lesson 4');

    // Should have all section titles
    expect(canvasElement.textContent).toContain('What is Conditional Rendering?');
    expect(canvasElement.textContent).toContain('The Ternary Operator');
    expect(canvasElement.textContent).toContain('Short-Circuit with &&');
    expect(canvasElement.textContent).toContain('Choosing the Right Pattern');
    expect(canvasElement.textContent).toContain('Conditional Rendering Playground');
    expect(canvasElement.textContent).toContain('Key Takeaways');

    // Should have interactive demos
    expect(canvas.getAllByRole('button').length).toBeGreaterThan(0);
  },
};

/**
 * Verifies takeaways are present
 */
export const ShowsTakeaways: Story = {
  play: async ({ canvasElement }) => {
    // Should show all takeaways
    expect(canvasElement.textContent).toContain(
      'Ternary (? :) is best for showing one thing OR another'
    );
    expect(canvasElement.textContent).toContain('&& is best for showing something OR nothing');
    expect(canvasElement.textContent).toContain('Early returns clean up complex conditions');
    expect(canvasElement.textContent).toContain('Avoid deeply nested ternaries');
    expect(canvasElement.textContent).toContain('null, undefined, and false render nothing');
  },
};
