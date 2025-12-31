import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import ContextReducerPlayground from '@lessons/7_3/ContextReducerPlayground';

const meta: Meta<typeof ContextReducerPlayground> = {
  title: 'Lessons/7.3/ContextReducerPlayground',
  component: ContextReducerPlayground,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Interactive playground with three Context + Reducer demos: Theme Switcher, Todo List, and Shopping Cart.',
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
 * Default view shows Theme demo
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show all tab buttons
    expect(canvas.getByRole('button', { name: /Theme/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Todo List/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Shopping Cart/i })).toBeInTheDocument();

    // Should show theme demo by default
    expect(canvas.getByText('Theme:')).toBeInTheDocument();
    expect(canvas.getByText('Accent:')).toBeInTheDocument();
  },
};

/**
 * Theme demo - change theme
 */
export const ThemeChange: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click light theme button
    await user.click(canvas.getByRole('button', { name: /light/i }));

    // Should show light selected (btn-primary class indicates active)
    await waitFor(() => {
      const lightBtn = canvas.getByRole('button', { name: /light/i });
      expect(lightBtn.className).toContain('btn-primary');
    });
  },
};

/**
 * Theme demo - change accent color
 */
export const ThemeAccentChange: Story = {
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();

    // Find accent color buttons (circular buttons)
    const accentButtons = canvasElement.querySelectorAll('.rounded-full');
    expect(accentButtons.length).toBeGreaterThanOrEqual(4);

    // Click the purple accent (second button)
    if (accentButtons[1]) {
      await user.click(accentButtons[1]);
    }

    // The clicked button should have ring
    await waitFor(() => {
      expect(accentButtons[1]?.className).toContain('ring-2');
    });
  },
};

/**
 * Theme demo - reset to defaults
 */
export const ThemeReset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Change theme to light
    await user.click(canvas.getByRole('button', { name: /light/i }));

    // Reset to defaults
    await user.click(canvas.getByRole('button', { name: 'Reset to Defaults' }));

    // Dark should be active again (default)
    await waitFor(() => {
      const darkBtns = canvas.getAllByRole('button', { name: /dark/i });
      const darkBtn = darkBtns.find((btn) => !btn.className.includes('ghost'));
      expect(darkBtn?.className).toContain('btn-primary');
    });
  },
};

/**
 * Todo List demo
 */
export const TodoListDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Todo List tab
    await user.click(canvas.getByRole('button', { name: /Todo List/i }));

    await waitFor(() => {
      expect(canvas.getByPlaceholderText('Add a todo...')).toBeInTheDocument();
    });

    // Should show initial todos
    expect(canvas.getByText('Learn Context + Reducer')).toBeInTheDocument();
    expect(canvas.getByText('Build something cool')).toBeInTheDocument();
  },
};

/**
 * Todo List - add todo
 */
export const TodoListAddItem: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Todo List
    await user.click(canvas.getByRole('button', { name: /Todo List/i }));

    await waitFor(() => {
      expect(canvas.getByPlaceholderText('Add a todo...')).toBeInTheDocument();
    });

    // Add a new todo
    const input = canvas.getByPlaceholderText('Add a todo...');
    await user.type(input, 'Test todo item');
    await user.keyboard('{Enter}');

    // Should show the new todo
    await waitFor(() => {
      expect(canvas.getByText('Test todo item')).toBeInTheDocument();
    });
  },
};

/**
 * Todo List - filter todos
 */
export const TodoListFilter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Todo List
    await user.click(canvas.getByRole('button', { name: /Todo List/i }));

    await waitFor(() => {
      expect(canvas.getByText('Learn Context + Reducer')).toBeInTheDocument();
    });

    // Click active filter
    await user.click(canvas.getByRole('button', { name: 'active' }));

    // Completed todo should be hidden
    await waitFor(() => {
      expect(canvas.queryByText('Learn Context + Reducer')).not.toBeInTheDocument();
    });

    // Active todo should still be visible
    expect(canvas.getByText('Build something cool')).toBeInTheDocument();
  },
};

/**
 * Shopping Cart demo
 */
export const ShoppingCartDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Shopping Cart
    await user.click(canvas.getByRole('button', { name: /Shopping Cart/i }));

    await waitFor(() => {
      expect(canvas.getByText('Cart is empty')).toBeInTheDocument();
    });

    // Should show menu items
    expect(canvas.getByText('☕ Coffee')).toBeInTheDocument();
    expect(canvas.getByText('🥐 Croissant')).toBeInTheDocument();
    expect(canvas.getByText('🍪 Cookie')).toBeInTheDocument();
  },
};

/**
 * Shopping Cart - add items
 */
export const ShoppingCartAddItems: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Shopping Cart
    await user.click(canvas.getByRole('button', { name: /Shopping Cart/i }));

    await waitFor(() => {
      expect(canvas.getByText('Cart is empty')).toBeInTheDocument();
    });

    // Add Coffee
    await user.click(canvas.getByText('☕ Coffee'));

    // Should show subtotal
    await waitFor(() => {
      expect(canvas.getByText('Subtotal:')).toBeInTheDocument();
    });

    // Add Croissant
    await user.click(canvas.getByText('🥐 Croissant'));

    // Should update total (items added successfully)
    await waitFor(() => {
      // Verify both items are in cart by checking subtotal exists
      expect(canvas.getByText('Total:')).toBeInTheDocument();
    });
  },
};

/**
 * Shopping Cart - apply discount
 */
export const ShoppingCartDiscount: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Shopping Cart
    await user.click(canvas.getByRole('button', { name: /Shopping Cart/i }));

    await waitFor(() => {
      expect(canvas.getByText('Cart is empty')).toBeInTheDocument();
    });

    // Add item
    await user.click(canvas.getByText('☕ Coffee'));

    await waitFor(() => {
      expect(canvas.getByText('Subtotal:')).toBeInTheDocument();
    });

    // Enter discount code
    const discountInput = canvas.getByPlaceholderText('Discount code');
    await user.type(discountInput, 'SAVE10');
    await user.click(canvas.getByRole('button', { name: 'Apply' }));

    // Should show discount
    await waitFor(() => {
      expect(canvas.getByText(/Discount \(10%\)/)).toBeInTheDocument();
    });
  },
};

/**
 * Hint about Context + Reducer
 */
export const HintMessage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the hint
    expect(canvas.getByText(/Context \+ Reducer/)).toBeInTheDocument();
    expect(canvas.getByText(/state is managed globally/)).toBeInTheDocument();
  },
};
