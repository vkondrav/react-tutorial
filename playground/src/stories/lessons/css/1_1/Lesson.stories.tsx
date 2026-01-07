import type { Meta, StoryObj } from '@storybook/react-vite';
import CSSLesson1_1 from '@lessons/css/1_1';

const meta: Meta<typeof CSSLesson1_1> = {
  title: 'Lessons/css-1.1/Lesson',
  component: CSSLesson1_1,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'CSS Lesson 1.1: "Syntax, Parsing & The DOM". Covers how CSS selectors match DOM nodes, right-to-left parsing performance, and the difference between pseudo-classes and pseudo-elements.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The complete lesson page as it appears in the course.
 */
export const Default: Story = {};

/**
 * The lesson with a dark background for better contrast.
 */
export const WithBackground: Story = {
  decorators: [
    (Story) => (
      <div className="bg-base-300 min-h-screen py-8">
        <Story />
      </div>
    ),
  ],
};
