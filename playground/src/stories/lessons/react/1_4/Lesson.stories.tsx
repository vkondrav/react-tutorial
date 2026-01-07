import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson1_4 from '@lessons/react/1_4';

const meta: Meta<typeof Lesson1_4> = {
  title: 'Lessons/react-1.4/Lesson',
  component: Lesson1_4,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complete lesson on React components, covering component syntax, rules, composition, and an interactive builder.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The complete lesson 1.4 on Components.
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify lesson header
    expect(canvas.getByText(/Components: Your First Building Block/i)).toBeInTheDocument();

    // Verify all sections are present
    expect(canvas.getByText(/What is a Component\?/i)).toBeInTheDocument();
    expect(canvas.getByText(/The 3 Component Rules/i)).toBeInTheDocument();
    expect(canvas.getByText(/Component Composition/i)).toBeInTheDocument();
    expect(canvas.getByText(/Component Builder/i)).toBeInTheDocument();
    expect(canvas.getByText(/Key Takeaways/i)).toBeInTheDocument();
  },
};

/**
 * Lesson with dark background for better visibility.
 */
export const WithBackground: Story = {
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
};
