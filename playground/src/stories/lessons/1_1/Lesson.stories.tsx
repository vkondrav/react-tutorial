import type { Meta, StoryObj } from '@storybook/react-vite';
import Lesson1_1 from '../../../lessons/1_1';

const meta: Meta<typeof Lesson1_1> = {
  title: 'Lessons/1.1 What is React/Full Lesson',
  component: Lesson1_1,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The complete Lesson 1.1: "What is React & Why Use It?" This lesson covers declarative programming, component composition, and the Virtual DOM.',
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
