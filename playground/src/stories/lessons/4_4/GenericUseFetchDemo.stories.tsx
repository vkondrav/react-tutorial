import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import GenericUseFetchDemo from '@lessons/4_4/GenericUseFetchDemo';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof GenericUseFetchDemo> = {
  title: 'Lessons/4.4/GenericUseFetchDemo',
  component: GenericUseFetchDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates using TypeScript generics with useFetch for type-safe data fetching across different resource types.',
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
 * Default view shows Users resource
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify title is present
    expect(canvas.getByText('Type-Safe Fetching with Generics')).toBeInTheDocument();

    // Verify resource selector buttons are present
    expect(canvas.getByRole('button', { name: 'Users' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Posts' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Todos' })).toBeInTheDocument();

    // Users should be selected by default
    const usersButton = canvas.getByRole('button', { name: 'Users' });
    expect(usersButton).toHaveClass('btn-primary');

    // Wait for users to load
    await waitFor(
      () => {
        const userNames = canvas.queryAllByText(/Leanne Graham|Ervin Howell/);
        expect(userNames.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests switching to Posts resource
 */
export const PostsResource: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Posts button
    const postsButton = canvas.getByRole('button', { name: 'Posts' });
    await userEvent.click(postsButton);

    // Posts should now be selected
    await waitFor(() => {
      expect(postsButton).toHaveClass('btn-secondary');
    });

    // Wait for posts to load
    await waitFor(
      () => {
        // Should show post content - check for post titles
        const postCards = canvasElement.querySelectorAll('.bg-base-200.rounded-lg');
        expect(postCards.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests switching to Todos resource
 */
export const TodosResource: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Todos button
    const todosButton = canvas.getByRole('button', { name: 'Todos' });
    await userEvent.click(todosButton);

    // Todos should now be selected
    await waitFor(() => {
      expect(todosButton).toHaveClass('btn-accent');
    });

    // Wait for todos to load (they have checkboxes)
    await waitFor(
      () => {
        const checkboxes = canvas.getAllByRole('checkbox');
        expect(checkboxes.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests switching between all resource types
 */
export const SwitchResources: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start with Users (default) - verify User Type is highlighted
    const usersButton = canvas.getByRole('button', { name: 'Users' });
    expect(usersButton).toHaveClass('btn-primary');

    // Switch to Posts
    await userEvent.click(canvas.getByRole('button', { name: 'Posts' }));
    await waitFor(() => {
      const postsButton = canvas.getByRole('button', { name: 'Posts' });
      expect(postsButton).toHaveClass('btn-secondary');
    });

    // Switch to Todos
    await userEvent.click(canvas.getByRole('button', { name: 'Todos' }));
    await waitFor(() => {
      const todosButton = canvas.getByRole('button', { name: 'Todos' });
      expect(todosButton).toHaveClass('btn-accent');
    });

    // Switch back to Users
    await userEvent.click(canvas.getByRole('button', { name: 'Users' }));
    await waitFor(() => {
      const usersBtn = canvas.getByRole('button', { name: 'Users' });
      expect(usersBtn).toHaveClass('btn-primary');
    });
  },
};

/**
 * Verifies type interface display
 */
export const TypeInterfaces: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all type labels are present
    expect(canvas.getByText('User Type')).toBeInTheDocument();
    expect(canvas.getByText('Post Type')).toBeInTheDocument();
    expect(canvas.getByText('Todo Type')).toBeInTheDocument();
  },
};
