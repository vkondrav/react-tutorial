import type { Meta, StoryObj } from '@storybook/react-vite';
import Lesson4_1 from '@lessons/react/4_1';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof Lesson4_1> = {
  title: 'Lessons/react-4.1/Lesson',
  component: Lesson4_1,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 4.1: Fetching Data with useEffect - Complete lesson page covering basic fetch patterns, dependency arrays, race conditions, and interactive playground.',
      },
    },
    msw: {
      handlers,
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
