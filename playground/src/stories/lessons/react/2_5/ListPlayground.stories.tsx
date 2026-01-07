import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import ListPlayground from '@lessons/react/2_5/ListPlayground';

const meta: Meta<typeof ListPlayground> = {
  title: 'Lessons/react-2.5/ListPlayground',
  component: ListPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Complete todo list playground - demonstrates add, remove, toggle, and filter functionality with proper key usage.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows todo list with sample items
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show header
    expect(canvasElement.textContent).toContain('Todo List');
    expect(canvasElement.textContent).toContain('2 active');
    expect(canvasElement.textContent).toContain('2 completed');

    // Should show sample todos
    expect(canvasElement.textContent).toContain('Learn React basics');
    expect(canvasElement.textContent).toContain('Master useState hook');
    expect(canvasElement.textContent).toContain('Understand lists and keys');
    expect(canvasElement.textContent).toContain('Build something awesome');

    // Should have input for new todo
    expect(canvas.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();

    // Should have Add button
    expect(canvas.getByRole('button', { name: /Add/i })).toBeInTheDocument();

    // Should have filter tabs (use exact match to avoid matching "Clear Completed")
    expect(canvas.getByRole('button', { name: /^All/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /^Active/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /^Completed/i })).toBeInTheDocument();
  },
};

/**
 * Tests adding a new todo
 */
export const AddTodo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Type new todo
    const input = canvas.getByPlaceholderText('What needs to be done?');
    await userEvent.type(input, 'New test todo');

    // Click Add button
    await userEvent.click(canvas.getByRole('button', { name: /Add/i }));

    // Should show new todo
    expect(canvasElement.textContent).toContain('New test todo');

    // Should update counts
    expect(canvasElement.textContent).toContain('3 active');

    // Input should be cleared
    expect(input).toHaveValue('');
  },
};

/**
 * Tests adding todo with Enter key
 */
export const AddTodoWithEnter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Type new todo and press Enter
    const input = canvas.getByPlaceholderText('What needs to be done?');
    await userEvent.type(input, 'Enter key todo{enter}');

    // Should show new todo
    expect(canvasElement.textContent).toContain('Enter key todo');
  },
};

/**
 * Tests toggling todo completion
 */
export const ToggleTodo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find an uncompleted todo's checkbox (the circle buttons)
    // "Understand lists and keys" is uncompleted
    const buttons = canvas.getAllByRole('button');
    const checkboxButtons = buttons.filter(
      (btn) =>
        btn.className.includes('rounded-full') && btn.className.includes('border-base-content')
    );

    if (checkboxButtons.length > 0) {
      await userEvent.click(checkboxButtons[0]);
    }

    // Count should update
    expect(canvasElement.textContent).toContain('3 completed');
    expect(canvasElement.textContent).toContain('1 active');
  },
};

/**
 * Tests removing a todo
 */
export const RemoveTodo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find delete buttons (X icons)
    const deleteButtons = canvas.getAllByRole('button').filter((btn) => {
      return btn.className.includes('btn-square') && btn.className.includes('text-error');
    });

    if (deleteButtons.length > 0) {
      await userEvent.click(deleteButtons[0]);
    }

    // Should have fewer todos now
    expect(canvasElement.textContent).toContain('All (3)');
  },
};

/**
 * Tests filtering to active todos
 */
export const FilterActive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Active filter
    await userEvent.click(canvas.getByRole('button', { name: /Active/i }));

    // Should show only active todos
    expect(canvasElement.textContent).toContain('Understand lists and keys');
    expect(canvasElement.textContent).toContain('Build something awesome');

    // Completed todos should not be visible
    expect(canvasElement.textContent).not.toContain('Learn React basics');
    expect(canvasElement.textContent).not.toContain('Master useState hook');
  },
};

/**
 * Tests filtering to completed todos
 */
export const FilterCompleted: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Completed filter (use exact match to avoid matching "Clear Completed")
    await userEvent.click(canvas.getByRole('button', { name: /^Completed/i }));

    // Should show only completed todos
    expect(canvasElement.textContent).toContain('Learn React basics');
    expect(canvasElement.textContent).toContain('Master useState hook');

    // Active todos should not be visible
    expect(canvasElement.textContent).not.toContain('Understand lists and keys');
    expect(canvasElement.textContent).not.toContain('Build something awesome');
  },
};

/**
 * Tests clear completed functionality
 */
export const ClearCompleted: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have Clear Completed button
    const clearButton = canvas.getByRole('button', { name: /Clear Completed/i });
    expect(clearButton).toBeInTheDocument();

    // Click to clear completed
    await userEvent.click(clearButton);

    // Completed todos should be gone
    expect(canvasElement.textContent).not.toContain('Learn React basics');
    expect(canvasElement.textContent).not.toContain('Master useState hook');

    // Active todos should remain
    expect(canvasElement.textContent).toContain('Understand lists and keys');
    expect(canvasElement.textContent).toContain('Build something awesome');

    // Count should update
    expect(canvasElement.textContent).toContain('0 completed');
  },
};

/**
 * Tests empty state when filtering
 */
export const EmptyFilterState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Clear all completed first
    await userEvent.click(canvas.getByRole('button', { name: /Clear Completed/i }));

    // Now filter to completed
    await userEvent.click(canvas.getByRole('button', { name: /Completed/i }));

    // Should show empty state
    expect(canvasElement.textContent).toContain('No completed todos yet');
  },
};

/**
 * Tests Add button is disabled when input is empty
 */
export const AddButtonDisabled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Add button should be disabled when input is empty
    const addButton = canvas.getByRole('button', { name: /Add/i });
    expect(addButton).toBeDisabled();

    // Type something
    const input = canvas.getByPlaceholderText('What needs to be done?');
    await userEvent.type(input, 'test');

    // Now button should be enabled
    expect(addButton).not.toBeDisabled();
  },
};

/**
 * Shows code examples section
 */
export const ShowsCodeExamples: Story = {
  play: async ({ canvasElement }) => {
    // Should show code examples
    expect(canvasElement.textContent).toContain('Key concepts in this example');
    expect(canvasElement.textContent).toContain('Adding items');
    expect(canvasElement.textContent).toContain('Updating items');
    expect(canvasElement.textContent).toContain('Removing items');
    expect(canvasElement.textContent).toContain('Filtering for display');
  },
};
