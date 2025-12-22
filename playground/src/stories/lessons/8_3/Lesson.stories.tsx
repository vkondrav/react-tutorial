import type { Meta, StoryObj } from '@storybook/react-vite';
import Lesson8_3 from '@lessons/8_3';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof Lesson8_3> = {
  title: 'Lessons/8.3 TanStack Query/Lesson',
  component: Lesson8_3,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 8.3: Server State with TanStack Query - Complete lesson page covering useQuery, useMutation, caching, and cache invalidation patterns.',
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
