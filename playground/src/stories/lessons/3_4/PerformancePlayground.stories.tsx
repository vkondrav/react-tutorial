import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import PerformancePlayground from '@lessons/3_4/PerformancePlayground';

const meta: Meta<typeof PerformancePlayground> = {
  title: 'Lessons/3.4/PerformancePlayground',
  component: PerformancePlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive playground with 3 demos: List Filter, Search, and Todo List. Practice memoization patterns.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - List Filter tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Try It Yourself');

    // Should have all tabs
    expect(canvas.getByRole('button', { name: /List Filter/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Todo List/i })).toBeInTheDocument();

    // List Filter tab should be active by default
    expect(canvasElement.textContent).toContain('Category');
    expect(canvasElement.textContent).toContain('Sort By');
  },
};

/**
 * Tests List Filter demo
 */
export const ListFilterDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have filter controls (two comboboxes: Category and Sort By)
    const comboboxes = canvas.getAllByRole('combobox');
    expect(comboboxes.length).toBe(2);
    expect(canvas.getByRole('button', { name: /useMemo/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Trigger Re-render/i })).toBeInTheDocument();

    // Should show products
    expect(canvasElement.textContent).toContain('Product');
    expect(canvasElement.textContent).toContain('products');
  },
};

/**
 * Tests Search demo
 */
export const SearchDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Search tab
    await userEvent.click(canvas.getByRole('button', { name: /Search/i }));

    // Should show search input
    await waitFor(() => {
      expect(canvas.getByPlaceholderText(/Search items/i)).toBeInTheDocument();
    });

    // Should have useCallback toggle
    expect(canvas.getByRole('button', { name: /useCallback/i })).toBeInTheDocument();

    // Type a search query
    const searchInput = canvas.getByPlaceholderText(/Search items/i);
    await userEvent.type(searchInput, 'React');

    // Should filter results
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('React');
    });
  },
};

/**
 * Tests Todo List demo
 */
export const TodoListDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Todo List tab
    await userEvent.click(canvas.getByRole('button', { name: /Todo List/i }));

    // Should show todo input
    await waitFor(() => {
      expect(canvas.getByPlaceholderText(/Add a todo/i)).toBeInTheDocument();
    });

    // Should show existing todos
    expect(canvasElement.textContent).toContain('Learn useMemo');
    expect(canvasElement.textContent).toContain('Learn useCallback');
    expect(canvasElement.textContent).toContain('Build something cool');

    // Should show render counts
    expect(canvasElement.textContent).toContain('renders:');
  },
};

/**
 * Tests adding a todo
 */
export const AddTodo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Todo List tab
    await userEvent.click(canvas.getByRole('button', { name: /Todo List/i }));

    await waitFor(() => {
      expect(canvas.getByPlaceholderText(/Add a todo/i)).toBeInTheDocument();
    });

    // Add a new todo
    const todoInput = canvas.getByPlaceholderText(/Add a todo/i);
    await userEvent.type(todoInput, 'New test todo');

    // Find the add button (the one with just the + icon)
    const addButtons = canvas.getAllByRole('button');
    const addButton = addButtons.find(
      (btn) => btn.querySelector('svg') && btn.className.includes('btn-primary')
    );
    if (addButton) {
      await userEvent.click(addButton);
    }

    // New todo should appear
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('New test todo');
    });
  },
};

/**
 * Tests switching between all tabs
 */
export const SwitchTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start on List Filter
    expect(canvasElement.textContent).toContain('Category');

    // Switch to Search
    await userEvent.click(canvas.getByRole('button', { name: /Search/i }));
    await waitFor(() => {
      expect(canvas.getByPlaceholderText(/Search items/i)).toBeInTheDocument();
    });

    // Switch to Todo List
    await userEvent.click(canvas.getByRole('button', { name: /Todo List/i }));
    await waitFor(() => {
      expect(canvas.getByPlaceholderText(/Add a todo/i)).toBeInTheDocument();
    });

    // Switch back to List Filter
    await userEvent.click(canvas.getByRole('button', { name: /List Filter/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Category');
    });
  },
};
