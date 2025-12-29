import type { Meta, StoryObj } from '@storybook/react-vite';
import Lesson8_1 from '@lessons/8_1';

const meta: Meta<typeof Lesson8_1> = {
  title: 'Lessons/8.1/Lesson',
  component: Lesson8_1,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 8.1: Server-Side Rendering - covers SSR fundamentals, hydration, and when to use SSR.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full lesson page view
 */
export const Default: Story = {};
