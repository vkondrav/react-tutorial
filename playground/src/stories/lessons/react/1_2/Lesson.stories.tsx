import type { Meta, StoryObj } from '@storybook/react-vite';
import Lesson1_2 from '@lessons/react/1_2';

const meta: Meta<typeof Lesson1_2> = {
  title: 'Lessons/react-1.2/Lesson',
  component: Lesson1_2,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The complete Lesson 1.2: "Setting Up Your First React App". This lesson covers project structure, file connections, HMR, and package.json.',
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
