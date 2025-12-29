import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson4_2 from '@lessons/4_2';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof Lesson4_2> = {
  title: 'Lessons/4.2/Lesson',
  component: Lesson4_2,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 4.2: Loading, Error & Empty States - Complete lesson covering loading patterns (spinner, skeleton, progress, shimmer), error handling, empty states, and state composition.',
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
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify lesson header is present
    expect(canvas.getByText('Loading, Error & Empty States')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText('Loading States')).toBeInTheDocument();
    expect(canvas.getByText('Error States')).toBeInTheDocument();
    expect(canvas.getByText('Empty States')).toBeInTheDocument();
    expect(canvas.getByText('Composing States')).toBeInTheDocument();
    expect(canvas.getByText('States Playground')).toBeInTheDocument();
    expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();
  },
};

/**
 * Verify all takeaways are displayed
 */
export const Takeaways: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify key takeaways are present
    expect(
      canvas.getByText(/Loading states: Use skeletons for predictable content/)
    ).toBeInTheDocument();
    expect(canvas.getByText(/Error states: Always explain what happened/)).toBeInTheDocument();
    expect(canvas.getByText(/Empty states: Distinguish between "no data yet"/)).toBeInTheDocument();
    expect(canvas.getByText(/Check states in order: loading → error/)).toBeInTheDocument();
  },
};
