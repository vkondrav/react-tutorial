import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import MutationsDemo from '@lessons/react/8_3/MutationsDemo';

const meta: Meta<typeof MutationsDemo> = {
  title: 'Lessons/react-8.3/MutationsDemo',
  component: MutationsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates useMutation for create, update, and delete operations with cache invalidation.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows todo list with mutation capabilities
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for todos to load
    await waitFor(
      () => {
        expect(canvas.getByText('Learn TanStack Query basics')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Verify the cache invalidation info is shown
    expect(canvas.getByText(/Cache Invalidation Flow/)).toBeInTheDocument();
  },
};

/**
 * Tests adding a new todo
 */
export const AddTodo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial todos to load
    await waitFor(
      () => {
        expect(canvas.getByText('Learn TanStack Query basics')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Type a new todo
    const input = canvas.getByPlaceholderText('Add a new todo...');
    await userEvent.type(input, 'My new todo item');

    // Click add button
    const addButton = canvas.getByRole('button', { name: /Add/ });
    await userEvent.click(addButton);

    // Wait for new todo to appear
    await waitFor(
      () => {
        expect(canvas.getByText('My new todo item')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests toggling a todo's completion status
 */
export const ToggleTodo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for todos to load
    await waitFor(
      () => {
        expect(canvas.getByText('Understand mutations')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Find the uncompleted todo checkbox
    const checkboxes = canvas.getAllByRole('checkbox');
    const uncompletedCheckbox = checkboxes.find(
      (cb) => !cb.hasAttribute('checked') || !(cb as HTMLInputElement).checked
    );

    if (uncompletedCheckbox) {
      // Click to toggle
      await userEvent.click(uncompletedCheckbox);

      // Wait for the mutation to complete
      await waitFor(
        () => {
          // The todo should now be checked
          expect((uncompletedCheckbox as HTMLInputElement).checked).toBe(true);
        },
        { timeout: 3000 }
      );
    }
  },
};

/**
 * Tests the code toggle functionality
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for todos to load
    await waitFor(
      () => {
        expect(canvas.getByText('Learn TanStack Query basics')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Click to show code
    const showCodeButton = canvas.getByRole('button', { name: /Show Code/ });
    await userEvent.click(showCodeButton);

    // Code snippet should be visible
    await waitFor(() => {
      expect(canvas.getByText('Mutation Pattern')).toBeInTheDocument();
    });
  },
};
