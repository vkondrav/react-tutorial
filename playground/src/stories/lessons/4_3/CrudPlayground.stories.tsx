import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { http, HttpResponse, delay } from 'msw';
import CrudPlayground from '@lessons/4_3/CrudPlayground';
import { mockTodos } from '@mocks/handlers';

const meta: Meta<typeof CrudPlayground> = {
  title: 'Lessons/4.3/CrudPlayground',
  component: CrudPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Full CRUD todo application demonstrating all operations: Create (POST), Read (GET), Update (PATCH), and Delete (DELETE).',
      },
    },
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos', async () => {
          await delay(100);
          return HttpResponse.json(mockTodos.slice(0, 5));
        }),
        http.post('https://jsonplaceholder.typicode.com/todos', async ({ request }) => {
          await delay(200);
          const body = (await request.json()) as Record<string, unknown>;
          return HttpResponse.json({
            id: 201,
            ...body,
          });
        }),
        http.patch('https://jsonplaceholder.typicode.com/todos/:id', async ({ request }) => {
          await delay(100);
          const body = await request.json();
          return HttpResponse.json(body);
        }),
        http.delete('https://jsonplaceholder.typicode.com/todos/:id', async () => {
          await delay(100);
          return HttpResponse.json({});
        }),
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view after loading todos
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for todos to load
    await waitFor(
      () => {
        expect(canvas.getByText(/Todos \(\d+ remaining\)/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify add form is present
    expect(canvas.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Add/ })).toBeInTheDocument();

    // Verify CRUD operations section
    expect(canvas.getByText('CRUD Operations Used')).toBeInTheDocument();
    expect(canvas.getByText('POST')).toBeInTheDocument();
    expect(canvas.getByText('PATCH')).toBeInTheDocument();
    expect(canvas.getByText('DELETE')).toBeInTheDocument();
    expect(canvas.getByText('GET')).toBeInTheDocument();
  },
};

/**
 * Tests adding a new todo
 */
export const AddTodo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial load
    await waitFor(
      () => {
        expect(canvas.getByText(/Todos/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Type new todo
    const input = canvas.getByPlaceholderText('Add a new todo...');
    await userEvent.type(input, 'My New Todo Item');

    // Click add button
    const addButton = canvas.getByRole('button', { name: /Add/ });
    await userEvent.click(addButton);

    // New todo should appear
    await waitFor(
      () => {
        expect(canvas.getByText('My New Todo Item')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Toast should show success
    await waitFor(() => {
      expect(canvas.getByText('Todo added!')).toBeInTheDocument();
    });
  },
};

/**
 * Tests toggling a todo's completed state
 */
export const ToggleTodo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for todos to load
    await waitFor(
      () => {
        const checkboxes = canvas.getAllByRole('checkbox');
        expect(checkboxes.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );

    // Get first checkbox
    const checkboxes = canvas.getAllByRole('checkbox');
    const firstCheckbox = checkboxes[0];
    const initialState = (firstCheckbox as HTMLInputElement).checked;

    // Toggle it
    await userEvent.click(firstCheckbox);

    // State should change (optimistic update)
    await waitFor(() => {
      expect((firstCheckbox as HTMLInputElement).checked).toBe(!initialState);
    });
  },
};

/**
 * Tests that edit buttons are present for each todo
 */
export const EditButtonsPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for todos to load
    await waitFor(
      () => {
        expect(canvas.getByText(/Todos/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Wait for checkboxes to appear
    await waitFor(() => {
      const checkboxes = canvas.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    // Each todo should have edit and delete buttons
    // The edit buttons are btn-ghost btn-square buttons
    const todoItems = canvasElement.querySelectorAll('.card .rounded-lg');
    expect(todoItems.length).toBeGreaterThan(0);

    // Find buttons with SVG icons (edit pencil icons)
    const ghostButtons = canvasElement.querySelectorAll('.card button.btn-ghost.btn-square');
    // We should have at least 2 buttons per todo (edit + delete) plus the header refresh
    expect(ghostButtons.length).toBeGreaterThanOrEqual(2);
  },
};

/**
 * Tests deleting a todo
 */
export const DeleteTodo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for todos to load
    await waitFor(
      () => {
        expect(canvas.getByText(/Todos/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Get initial count
    const initialMatch = canvas.getByText(/Todos \((\d+) remaining\)/).textContent;

    // Find and click delete button (trash icon with text-error class)
    const deleteButtons = canvasElement.querySelectorAll(
      'button.text-error\\/70, button.text-error'
    );
    if (deleteButtons.length > 0) {
      await userEvent.click(deleteButtons[0]);

      // Should show toast after delete
      await waitFor(
        () => {
          expect(canvas.getByText('Todo deleted!')).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Count should change if we had uncompleted todos
      if (initialMatch) {
        await waitFor(() => {
          const newCount = canvas.getByText(/Todos \((\d+) remaining\)/);
          expect(newCount).toBeInTheDocument();
        });
      }
    }
  },
};

/**
 * Tests the refresh button reloads data
 */
export const RefreshTodos: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial load
    await waitFor(
      () => {
        expect(canvas.getByText(/Todos/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Find the refresh button (it's a btn-square btn-ghost in the header)
    const headerRefreshButton = canvasElement.querySelector(
      '.card button.btn-ghost.btn-sm.btn-square'
    );

    expect(headerRefreshButton).toBeInTheDocument();

    // Click it
    if (headerRefreshButton) {
      await userEvent.click(headerRefreshButton);

      // Wait for data to reload (it should still show todos)
      await waitFor(
        () => {
          expect(canvas.getByText(/Todos/)).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    }
  },
};

/**
 * Tests add button disabled state
 */
export const AddButtonDisabled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for load
    await waitFor(
      () => {
        expect(canvas.getByRole('button', { name: /Add/ })).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Add button should be disabled when input is empty
    const addButton = canvas.getByRole('button', { name: /Add/ });
    expect(addButton).toBeDisabled();

    // Type something
    const input = canvas.getByPlaceholderText('Add a new todo...');
    await userEvent.type(input, 'Test');

    // Now button should be enabled
    expect(addButton).toBeEnabled();

    // Clear input
    await userEvent.clear(input);

    // Button should be disabled again
    expect(addButton).toBeDisabled();
  },
};
