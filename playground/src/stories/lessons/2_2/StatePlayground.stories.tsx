import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import StatePlayground from '@lessons/2_2/StatePlayground';

const meta: Meta<typeof StatePlayground> = {
  title: 'Lessons/2.2 State/StatePlayground',
  component: StatePlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive todo app playground demonstrating multiple state values working together.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with initial todos
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have input field
    const input = canvas.getByPlaceholderText(/what needs to be done/i);
    expect(input).toBeInTheDocument();

    // Should show initial todos
    expect(canvas.getByText('Learn useState')).toBeInTheDocument();
    expect(canvas.getByText('Build a counter')).toBeInTheDocument();
    expect(canvas.getByText('Create a todo app')).toBeInTheDocument();
  },
};

/**
 * Tests adding a todo
 */
export const AddTodo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText(/what needs to be done/i);
    const addButton = canvas.getByRole('button', { name: /^add$/i });

    // Type a todo
    await userEvent.type(input, 'Learn React State');

    // Click add
    await userEvent.click(addButton);

    // Todo should appear in the list
    await waitFor(() => {
      expect(canvas.getByText('Learn React State')).toBeInTheDocument();
    });

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

    const input = canvas.getByPlaceholderText(/what needs to be done/i);

    // Type and press Enter
    await userEvent.type(input, 'Practice useState{Enter}');

    // Todo should appear
    await waitFor(() => {
      expect(canvas.getByText('Practice useState')).toBeInTheDocument();
    });
  },
};

/**
 * Tests toggling a todo as complete
 */
export const ToggleTodo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Use the third initial todo (not done)
    const checkbox = canvas.getAllByRole('checkbox')[2]; // "Create a todo app"
    expect(checkbox).not.toBeChecked();

    // Click to toggle
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Click again to uncheck
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  },
};

/**
 * Tests removing a todo
 */
export const RemoveTodo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Use first initial todo
    expect(canvas.getByText('Learn useState')).toBeInTheDocument();

    // Find all X buttons (remove buttons)
    const buttons = canvas.getAllByRole('button');
    const removeButtons = buttons.filter(
      (btn) => btn.classList.contains('btn-ghost') && btn.classList.contains('btn-xs')
    );

    // Click first remove button
    await userEvent.click(removeButtons[0]);

    // Todo should be removed
    await waitFor(() => {
      expect(canvas.queryByText('Learn useState')).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests adding multiple todos
 */
export const AddMultipleTodos: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText(/what needs to be done/i);

    // Add first todo
    await userEvent.type(input, 'First new todo{Enter}');

    // Add second todo
    await userEvent.type(input, 'Second new todo{Enter}');

    // Add third todo
    await userEvent.type(input, 'Third new todo{Enter}');

    // All should be visible
    await waitFor(() => {
      expect(canvas.getByText('First new todo')).toBeInTheDocument();
      expect(canvas.getByText('Second new todo')).toBeInTheDocument();
      expect(canvas.getByText('Third new todo')).toBeInTheDocument();
    });
  },
};

/**
 * Tests that empty todos are not added
 */
export const PreventEmptyTodo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const addButton = canvas.getByRole('button', { name: /^add$/i });

    // Count initial checkboxes (3 initial todos)
    const initialCheckboxes = canvas.getAllByRole('checkbox');
    const initialCount = initialCheckboxes.length;

    // Try to add empty todo
    await userEvent.click(addButton);

    // Should not add anything (same count)
    const checkboxesAfter = canvas.getAllByRole('checkbox');
    expect(checkboxesAfter).toHaveLength(initialCount);
  },
};
