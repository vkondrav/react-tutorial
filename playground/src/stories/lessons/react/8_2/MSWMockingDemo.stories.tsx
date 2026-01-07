import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import MSWMockingDemo from '@lessons/react/8_2/MSWMockingDemo';

const meta: Meta<typeof MSWMockingDemo> = {
  title: 'Lessons/react-8.2/MSWMockingDemo',
  component: MSWMockingDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Explains Mock Service Worker (MSW) for API mocking in Storybook tests.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing what MSW is
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the "What is MSW?" tab content
    expect(canvas.getByText('How MSW Works')).toBeInTheDocument();

    // Should show benefits
    expect(canvas.getByText('No Server Needed')).toBeInTheDocument();
    expect(canvas.getByText('Real fetch()')).toBeInTheDocument();
  },
};

/**
 * Tests switching to the Handlers tab
 */
export const HandlersTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Handlers tab
    const handlersTab = canvas.getByRole('button', { name: 'Handlers' });
    await userEvent.click(handlersTab);

    // Should show handler code
    await waitFor(() => {
      expect(canvas.getByText('src/mocks/handlers.ts')).toBeInTheDocument();
    });
  },
};

/**
 * Tests switching to the In Stories tab
 */
export const InStoriesTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on In Stories tab
    const storiesTab = canvas.getByRole('button', { name: 'In Stories' });
    await userEvent.click(storiesTab);

    // Should show story MSW code
    await waitFor(() => {
      expect(canvas.getByText('Component.stories.tsx')).toBeInTheDocument();
    });

    // Should show the key pattern tip
    expect(canvas.getByText(/Key Pattern/)).toBeInTheDocument();
  },
};
