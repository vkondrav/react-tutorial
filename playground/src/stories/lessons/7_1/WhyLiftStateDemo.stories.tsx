import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import WhyLiftStateDemo from '@lessons/7_1/WhyLiftStateDemo';

const meta: Meta<typeof WhyLiftStateDemo> = {
  title: 'Lessons/7.1/WhyLiftStateDemo',
  component: WhyLiftStateDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates why lifting state is needed - shows problem of isolated sibling state vs solution with lifted state.',
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
 * Default view shows the problem tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show both tab buttons
    expect(canvas.getByRole('button', { name: /The Problem/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /The Solution/i })).toBeInTheDocument();

    // Problem tab should be active by default
    expect(canvas.getByText(/Sibling components can't share state directly/)).toBeInTheDocument();

    // Should show the isolated components
    expect(canvas.getByText('ProductList (has its own state)')).toBeInTheDocument();
    expect(canvas.getByText('CartSummary (separate state)')).toBeInTheDocument();
  },
};

/**
 * Problem demo shows isolated state
 */
export const ProblemDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Should show cart can't access data
    expect(canvas.getByText("Can't access cart data!")).toBeInTheDocument();

    // Select some products
    await user.click(canvas.getByRole('button', { name: /Laptop.*\$999/i }));
    await user.click(canvas.getByRole('button', { name: /Phone.*\$699/i }));

    // Should show 2 items selected in ProductList
    await waitFor(() => {
      expect(canvas.getByText(/Selected: 2 items/)).toBeInTheDocument();
    });

    // But CartSummary still can't access the data
    expect(canvas.getByText("Can't access cart data!")).toBeInTheDocument();
  },
};

/**
 * Switch to solution tab shows lifted state
 */
export const SolutionDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click The Solution tab
    await user.click(canvas.getByRole('button', { name: /The Solution/i }));

    // Should show lifted state message (text split by <strong> tag)
    await waitFor(() => {
      expect(canvas.getByText(/passed down as props/)).toBeInTheDocument();
    });

    // Should show both components receive props
    expect(canvas.getByText('ProductList (receives props)')).toBeInTheDocument();
    expect(canvas.getByText('CartSummary (receives props)')).toBeInTheDocument();
  },
};

/**
 * Lifted state solution works - cart syncs
 */
export const LiftedStateWorks: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to solution tab
    await user.click(canvas.getByRole('button', { name: /The Solution/i }));

    await waitFor(() => {
      expect(canvas.getByText('ProductList (receives props)')).toBeInTheDocument();
    });

    // Initially cart should be empty
    expect(canvas.getByText('0 items')).toBeInTheDocument();
    expect(canvas.getByText('Cart is empty')).toBeInTheDocument();

    // Add Laptop to cart
    await user.click(canvas.getByRole('button', { name: /Laptop.*\$999/i }));

    // Cart should now show 1 item
    await waitFor(() => {
      expect(canvas.getByText('1 items')).toBeInTheDocument();
    });

    // Should show total (text "Total:" appears in cart summary)
    expect(canvas.getByText('Total:')).toBeInTheDocument();
  },
};

/**
 * Code toggle works
 */
export const CodeToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Show Code button
    await user.click(canvas.getByRole('button', { name: 'Show Code' }));

    // Should show code snippets
    await waitFor(() => {
      expect(canvas.getByText('The Problem: State Trapped in Sibling')).toBeInTheDocument();
      expect(canvas.getByText('The Solution: Lifted State')).toBeInTheDocument();
    });

    // Click Hide Code
    await user.click(canvas.getByRole('button', { name: 'Hide Code' }));

    // Code should be hidden
    await waitFor(() => {
      expect(canvas.queryByText('The Problem: State Trapped in Sibling')).not.toBeInTheDocument();
    });
  },
};
