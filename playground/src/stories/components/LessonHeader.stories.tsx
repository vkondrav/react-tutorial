import type { Meta, StoryObj } from '@storybook/react-vite';
import LessonHeader from '../../lessons/components/LessonHeader';

const meta: Meta<typeof LessonHeader> = {
  title: 'Shared Components/LessonHeader',
  component: LessonHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    module: {
      control: 'text',
      description: 'The module number',
    },
    lesson: {
      control: 'text',
      description: 'The lesson number',
    },
    title: {
      control: 'text',
      description: 'The lesson title',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    module: '1',
    lesson: '1',
    title: 'What is React & Why Use It?',
  },
};

export const Module2Lesson3: Story = {
  args: {
    module: '2',
    lesson: '3',
    title: 'Event Handling in React',
  },
};

export const LongTitle: Story = {
  args: {
    module: '7',
    lesson: '4',
    title: 'Advanced State Management with Redux Toolkit and Context API',
  },
};
