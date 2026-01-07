import type { Meta, StoryObj } from '@storybook/react-vite';
import Lesson8_2 from '@lessons/react/8_2';

const meta: Meta<typeof Lesson8_2> = {
  title: 'Lessons/react-8.2/Lesson',
  component: Lesson8_2,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full lesson page for Testing Strategies - covers testing approaches, Storybook setup, MSW mocking, and interaction tests.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The complete Lesson 8.2 page with all sections
 */
export const Default: Story = {};
