import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import CompositionPlayground from '@lessons/6_1/CompositionPlayground';

const meta: Meta<typeof CompositionPlayground> = {
  title: 'Lessons/6.1/CompositionPlayground',
  component: CompositionPlayground,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Interactive playground with composable building blocks (Avatar, Badge, IconButton, Card) and composed components (UserCard, PostCard, StatCard).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing building blocks and composed components
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show building blocks section
    expect(canvas.getByText('Building Blocks')).toBeInTheDocument();
    // Avatar, Badge, IconButton appear as code labels
    expect(canvas.getAllByText('Avatar').length).toBeGreaterThan(0);
    expect(canvas.getAllByText('Badge').length).toBeGreaterThan(0);

    // Should show composed components section
    expect(canvas.getByText('Composed Components')).toBeInTheDocument();
  },
};

/**
 * Verify stat cards are rendered
 */
export const StatCards: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show stat cards
    expect(canvas.getByText('Total Users')).toBeInTheDocument();
    expect(canvas.getByText('1,234')).toBeInTheDocument();
    expect(canvas.getByText('Posts Today')).toBeInTheDocument();
    expect(canvas.getByText('89')).toBeInTheDocument();
    expect(canvas.getByText('Engagement')).toBeInTheDocument();
    expect(canvas.getByText('94%')).toBeInTheDocument();
  },
};

/**
 * Verify user cards are rendered
 */
export const UserCards: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show user cards
    expect(canvas.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(canvas.getByText('sarah@example.com')).toBeInTheDocument();
    expect(canvas.getByText('Mike Wilson')).toBeInTheDocument();
    expect(canvas.getByText('mike@example.com')).toBeInTheDocument();
  },
};

/**
 * Interact with post card like button
 */
export const LikePost: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find initial like count (42 for the post)
    expect(canvas.getByText('42')).toBeInTheDocument();

    // Find the like button with count 42 (post's like button)
    const likeButton = canvas.getByText('42').closest('button');

    if (likeButton) {
      await user.click(likeButton);

      // Like count should increase
      expect(canvas.getByText('43')).toBeInTheDocument();

      // Click again to unlike
      await user.click(likeButton);
      expect(canvas.getByText('42')).toBeInTheDocument();
    }
  },
};

/**
 * Verify post card content
 */
export const PostCard: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show post author
    expect(canvas.getByText('Alex Chen')).toBeInTheDocument();
    expect(canvas.getByText('2 hours ago')).toBeInTheDocument();

    // Should show post content
    expect(canvas.getByText(/Just finished building a component library/)).toBeInTheDocument();

    // Should show tags
    expect(canvas.getByText('#react')).toBeInTheDocument();
    expect(canvas.getByText('#composition')).toBeInTheDocument();
    expect(canvas.getByText('#typescript')).toBeInTheDocument();
  },
};

/**
 * Verify power of composition section
 */
export const PowerOfComposition: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('The Power of Composition')).toBeInTheDocument();
    expect(canvas.getByText(/flexible layouts/)).toBeInTheDocument();
    expect(canvas.getByText(/Each composed component is still customizable/)).toBeInTheDocument();
  },
};
