import type { Meta, StoryObj } from '@storybook/react-vite';
import Lesson2_2 from '@lessons/2_2';

const meta: Meta<typeof Lesson2_2> = {
  title: 'Lessons/2.2 State/Lesson',
  component: Lesson2_2,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 2.2: State with useState - Complete lesson covering state basics, state vs props, multiple state values, state updates, and interactive playground.',
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
