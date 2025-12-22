import type { Meta, StoryObj } from '@storybook/react-vite';
import Lesson1_3 from '../../../lessons/1_3';

const meta: Meta<typeof Lesson1_3> = {
  title: 'Lessons/1.3 Understanding JSX/Full Lesson',
  component: Lesson1_3,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The complete Lesson 1.3: "Understanding JSX". This lesson covers JSX syntax, differences from HTML, embedding JavaScript, JSX rules, common mistakes, and TSX.',
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
