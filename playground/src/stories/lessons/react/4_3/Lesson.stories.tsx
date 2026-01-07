import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, waitFor } from 'storybook/test';
import Lesson4_3 from '@lessons/react/4_3';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof Lesson4_3> = {
  title: 'Lessons/react-4.3/Lesson',
  component: Lesson4_3,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 4.3: Creating & Updating Data (POST/PUT/DELETE) - Complete lesson covering POST requests, PUT/PATCH updates, DELETE operations, and optimistic vs pessimistic updates.',
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
    expect(canvas.getByText('Creating & Updating Data (POST/PUT/DELETE)')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText('POST: Creating Data')).toBeInTheDocument();
    expect(canvas.getByText('PUT/PATCH: Updating Data')).toBeInTheDocument();
    expect(canvas.getByText('DELETE: Removing Data')).toBeInTheDocument();
    expect(canvas.getByText('Optimistic vs Pessimistic Updates')).toBeInTheDocument();
    expect(canvas.getByText('CRUD Playground')).toBeInTheDocument();
    expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();
  },
};

/**
 * Verify all takeaways are displayed
 */
export const Takeaways: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for content to load
    await waitFor(() => {
      expect(canvas.getByText(/POST creates new resources/)).toBeInTheDocument();
    });

    // Verify key takeaways are present
    expect(canvas.getByText(/PUT replaces entire resources/)).toBeInTheDocument();
    expect(canvas.getByText(/DELETE removes resources/)).toBeInTheDocument();
    expect(canvas.getByText(/Optimistic updates feel faster/)).toBeInTheDocument();
    expect(canvas.getByText(/Pessimistic updates are safer/)).toBeInTheDocument();
  },
};
