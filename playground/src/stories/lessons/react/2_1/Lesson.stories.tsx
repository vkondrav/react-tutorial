import type { Meta, StoryObj } from '@storybook/react-vite';
import Lesson2_1 from '@lessons/react/2_1';

const meta: Meta<typeof Lesson2_1> = {
  title: 'Lessons/react-2.1/Lesson',
  component: Lesson2_1,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 2.1: Props - Passing Data to Components. Complete lesson covering props basics, destructuring, defaults, children prop, and interactive playground.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full lesson page with all sections
 */
export const Default: Story = {};

/**
 * Lesson displayed in a container with max-width
 */
export const Contained: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
};
