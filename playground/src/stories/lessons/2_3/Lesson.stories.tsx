import type { Meta, StoryObj } from '@storybook/react-vite';
import Lesson2_3 from '@lessons/2_3';

const meta: Meta<typeof Lesson2_3> = {
  title: 'Lessons/2.3 Events/Lesson',
  component: Lesson2_3,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 2.3: Event Handling - Complete lesson covering event basics, event types, propagation, handler patterns, and interactive playground.',
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
