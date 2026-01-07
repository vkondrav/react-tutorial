import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson2_5 from '@lessons/react/2_5';

const meta: Meta<typeof Lesson2_5> = {
  title: 'Lessons/react-2.5/Lesson',
  component: Lesson2_5,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full lesson page for Lists & Keys - covers rendering lists with .map(), why keys matter, common key mistakes, and list operations.',
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
    expect(canvasElement.textContent).toContain('Lists & Keys');
    expect(canvasElement.textContent).toContain('Module 2');
    expect(canvasElement.textContent).toContain('Lesson 5');

    // Should have all section titles
    expect(canvasElement.textContent).toContain('Rendering Lists with .map()');
    expect(canvasElement.textContent).toContain('Why Keys Matter');
    expect(canvasElement.textContent).toContain('Common Key Mistakes');
    expect(canvasElement.textContent).toContain('Filtering, Sorting & Transforming');
    expect(canvasElement.textContent).toContain('List Playground');
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
    expect(canvasElement.textContent).toContain('Use .map() to transform arrays into JSX elements');
    expect(canvasElement.textContent).toContain(
      'Always provide a unique, stable key prop to list items'
    );
    expect(canvasElement.textContent).toContain('Use IDs from your data as keys');
    expect(canvasElement.textContent).toContain(
      'Index as key is OK only for static lists that never reorder'
    );
    expect(canvasElement.textContent).toContain('Chain .filter(), .sort(), .map()');
    expect(canvasElement.textContent).toContain('Keys help React identify which items changed');
  },
};
