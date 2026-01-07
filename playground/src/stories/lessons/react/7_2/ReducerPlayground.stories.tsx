import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import ReducerPlayground from '@lessons/react/7_2/ReducerPlayground';

const meta: Meta<typeof ReducerPlayground> = {
  title: 'Lessons/react-7.2/ReducerPlayground',
  component: ReducerPlayground,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Interactive playground with three useReducer demos: Todo List, Shopping Cart, and Multi-Step Form.',
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
 * Default view shows Todo List demo
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show all tab buttons
    expect(canvas.getByRole('button', { name: /Todo List/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Shopping Cart/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Multi-Step Form/i })).toBeInTheDocument();

    // Should show todo list by default
    expect(canvas.getByPlaceholderText('Add a todo...')).toBeInTheDocument();
  },
};

/**
 * Todo list - add todo
 */
export const TodoAddItem: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Type a new todo
    const input = canvas.getByPlaceholderText('Add a todo...');
    await user.type(input, 'New test todo');

    // Press Enter to add
    await user.keyboard('{Enter}');

    // Should show the new todo
    await waitFor(() => {
      expect(canvas.getByText('New test todo')).toBeInTheDocument();
    });
  },
};

/**
 * Todo list - toggle and filter
 */
export const TodoFilterAndToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Should have initial todos
    expect(canvas.getByText('Learn useReducer')).toBeInTheDocument();

    // Filter by active
    await user.click(canvas.getByRole('button', { name: 'active' }));

    // "Learn useReducer" should be hidden (it's completed)
    await waitFor(() => {
      expect(canvas.queryByText('Learn useReducer')).not.toBeInTheDocument();
    });

    // Should still show active todos
    expect(canvas.getByText('Build a todo app')).toBeInTheDocument();

    // Click "all" to show all
    await user.click(canvas.getByRole('button', { name: 'all' }));

    await waitFor(() => {
      expect(canvas.getByText('Learn useReducer')).toBeInTheDocument();
    });
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
      expect(canvas.getByText('Cart is empty. Add some items!')).toBeInTheDocument();
    });

    // Should show products
    expect(canvas.getByText('Coffee')).toBeInTheDocument();
    expect(canvas.getByText('Sandwich')).toBeInTheDocument();
    expect(canvas.getByText('Cookie')).toBeInTheDocument();
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
      expect(canvas.getByText('Coffee')).toBeInTheDocument();
    });

    // Click Coffee
    await user.click(canvas.getByText('Coffee'));

    // Should show coffee in cart with quantity controls
    await waitFor(() => {
      expect(canvas.getByText('Subtotal:')).toBeInTheDocument();
    });

    // Add Sandwich
    await user.click(canvas.getByText('Sandwich'));

    // Should update subtotal (appears in subtotal and total)
    await waitFor(() => {
      // 4.99 + 8.99 = 13.98
      const priceElements = canvas.getAllByText('$13.98');
      expect(priceElements.length).toBeGreaterThan(0);
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
      expect(canvas.getByText('Coffee')).toBeInTheDocument();
    });

    // Add an item first
    await user.click(canvas.getByText('Coffee'));

    await waitFor(() => {
      expect(canvas.getByText('Subtotal:')).toBeInTheDocument();
    });

    // Enter discount code
    const discountInput = canvas.getByPlaceholderText('Discount code (try SAVE10)');
    await user.type(discountInput, 'SAVE10');

    // Apply discount
    await user.click(canvas.getByRole('button', { name: 'Apply' }));

    // Should show discount applied
    await waitFor(() => {
      expect(canvas.getByText(/Discount \(SAVE10\)/)).toBeInTheDocument();
    });
  },
};

/**
 * Multi-Step Form demo
 */
export const MultiStepFormDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Multi-Step Form
    await user.click(canvas.getByRole('button', { name: /Multi-Step Form/i }));

    await waitFor(() => {
      expect(canvas.getByText('Multi-Step Form (Step 1/3)')).toBeInTheDocument();
    });

    // Should show step 1 fields
    expect(canvas.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('your@email.com')).toBeInTheDocument();
  },
};

/**
 * Multi-Step Form - navigate steps
 */
export const MultiStepFormNavigate: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Multi-Step Form
    await user.click(canvas.getByRole('button', { name: /Multi-Step Form/i }));

    await waitFor(() => {
      expect(canvas.getByPlaceholderText('Your name')).toBeInTheDocument();
    });

    // Fill step 1
    await user.type(canvas.getByPlaceholderText('Your name'), 'John');
    await user.type(canvas.getByPlaceholderText('your@email.com'), 'john@test.com');

    // Click Next
    await user.click(canvas.getByRole('button', { name: 'Next' }));

    // Should show step 2
    await waitFor(() => {
      expect(canvas.getByText('Multi-Step Form (Step 2/3)')).toBeInTheDocument();
    });

    // Should show plan options
    expect(canvas.getByRole('button', { name: 'basic' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'pro' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'enterprise' })).toBeInTheDocument();
  },
};

/**
 * Multi-Step Form - complete flow
 */
export const MultiStepFormComplete: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Multi-Step Form
    await user.click(canvas.getByRole('button', { name: /Multi-Step Form/i }));

    await waitFor(() => {
      expect(canvas.getByPlaceholderText('Your name')).toBeInTheDocument();
    });

    // Step 1
    await user.type(canvas.getByPlaceholderText('Your name'), 'John');
    await user.type(canvas.getByPlaceholderText('your@email.com'), 'john@test.com');
    await user.click(canvas.getByRole('button', { name: 'Next' }));

    // Step 2 - select plan
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'pro' })).toBeInTheDocument();
    });
    await user.click(canvas.getByRole('button', { name: 'pro' }));
    await user.click(canvas.getByRole('button', { name: 'Next' }));

    // Step 3 - select addons
    await waitFor(() => {
      expect(canvas.getByText('Priority Support')).toBeInTheDocument();
    });

    // Submit
    await user.click(canvas.getByRole('button', { name: 'Submit' }));

    // Should show success
    await waitFor(
      () => {
        expect(canvas.getByText('Success!')).toBeInTheDocument();
        expect(canvas.getByText(/Welcome, John/)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  },
};

/**
 * Tip about useReducer
 */
export const UseReducerTip: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the tip (useReducer appears in multiple places, check for the specific tip text)
    expect(canvas.getByText(/Each demo uses/)).toBeInTheDocument();
    expect(canvas.getByText(/explicit actions/)).toBeInTheDocument();
  },
};
