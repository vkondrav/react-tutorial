import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import QueryStatesDemo from '@lessons/8_3/QueryStatesDemo';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof QueryStatesDemo> = {
  title: 'Lessons/8.3 TanStack Query/QueryStatesDemo',
  component: QueryStatesDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates stale vs fresh data concepts and how TanStack Query handles caching and background refetching.',
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
 * Default view - shows post with stale/fresh indicators
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for post to load
    await waitFor(
      () => {
        const postBadge = canvas.getByText('Post #1');
        expect(postBadge).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Verify the stale time explanation is shown
    expect(canvas.getByText(/How Stale Time Works/)).toBeInTheDocument();
  },
};

/**
 * Tests switching between posts
 */
export const SwitchPosts: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial post to load
    await waitFor(
      () => {
        expect(canvas.getByText('Post #1')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Click on Post 3 button
    const post3Button = canvas.getByRole('button', { name: '3' });
    await userEvent.click(post3Button);

    // Wait for new post to load
    await waitFor(
      () => {
        expect(canvas.getByText('Post #3')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests changing the stale time dropdown
 */
export const ChangeStaleTime: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for post to load
    await waitFor(
      () => {
        expect(canvas.getByText('Post #1')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Change stale time via dropdown
    const staleTimeSelect = canvas.getByRole('combobox');
    await userEvent.selectOptions(staleTimeSelect, '30000');

    // Verify the selection changed (should now show 30s option selected)
    expect(staleTimeSelect).toHaveValue('30000');
  },
};

/**
 * Tests the code toggle functionality
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for post to load
    await waitFor(
      () => {
        expect(canvas.getByText('Post #1')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Click to show code
    const showCodeButton = canvas.getByRole('button', { name: /Show Code/ });
    await userEvent.click(showCodeButton);

    // Code snippet should be visible
    await waitFor(() => {
      expect(canvas.getByText('Stale Time Configuration')).toBeInTheDocument();
    });
  },
};
