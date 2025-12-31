import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import CustomProviderDemo from '@lessons/7_3/CustomProviderDemo';

const meta: Meta<typeof CustomProviderDemo> = {
  title: 'Lessons/7.3/CustomProviderDemo',
  component: CustomProviderDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates two advanced provider patterns: named actions and selector hooks for performance.',
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
 * Default view shows both patterns
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show both patterns
    expect(canvas.getByText('Pattern 1: Provider with Named Actions')).toBeInTheDocument();
    expect(canvas.getByText('Pattern 2: Selector Hooks')).toBeInTheDocument();
  },
};

/**
 * Notification pattern - add notifications
 */
export const NotificationAdd: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Initially no notifications
    expect(canvas.getByText('No notifications')).toBeInTheDocument();

    // Click Add Success
    await user.click(canvas.getByRole('button', { name: 'Add Success' }));

    // Should show success notification
    await waitFor(() => {
      expect(canvas.getByText('Operation successful!')).toBeInTheDocument();
    });

    // Add error notification
    await user.click(canvas.getByRole('button', { name: 'Add Error' }));

    await waitFor(() => {
      expect(canvas.getByText('Something went wrong')).toBeInTheDocument();
    });
  },
};

/**
 * Notification pattern - clear all
 */
export const NotificationClear: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Add some notifications
    await user.click(canvas.getByRole('button', { name: 'Add Success' }));
    await user.click(canvas.getByRole('button', { name: 'Add Info' }));

    await waitFor(() => {
      expect(canvas.getByText('Operation successful!')).toBeInTheDocument();
    });

    // Click Clear All
    await user.click(canvas.getByRole('button', { name: 'Clear All' }));

    // Should be empty again
    await waitFor(() => {
      expect(canvas.getByText('No notifications')).toBeInTheDocument();
    });
  },
};

/**
 * Cart pattern - add items
 */
export const CartAddItems: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find Pattern 2 section
    const cartSection = canvas.getByText('Pattern 2: Selector Hooks').closest('.card')!;
    const withinCart = within(cartSection as HTMLElement);

    // Should show 0 items initially
    expect(withinCart.getByText('0 items')).toBeInTheDocument();

    // Click Coffee button
    await user.click(withinCart.getByRole('button', { name: /Coffee/i }));

    // Should show 1 item
    await waitFor(() => {
      expect(withinCart.getByText('1 items')).toBeInTheDocument();
    });

    // Click Tea button
    await user.click(withinCart.getByRole('button', { name: /Tea/i }));

    // Should show 2 items
    await waitFor(() => {
      expect(withinCart.getByText('2 items')).toBeInTheDocument();
    });
  },
};

/**
 * Cart pattern - total updates
 */
export const CartTotal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find Pattern 2 section
    const cartSection = canvas.getByText('Pattern 2: Selector Hooks').closest('.card')!;
    const withinCart = within(cartSection as HTMLElement);

    // Initially $0.00
    expect(withinCart.getByText('$0.00')).toBeInTheDocument();

    // Add Coffee ($4.99)
    await user.click(withinCart.getByRole('button', { name: /Coffee.*\$4\.99/i }));

    // Should show $4.99
    await waitFor(() => {
      expect(withinCart.getByText('$4.99')).toBeInTheDocument();
    });

    // Add Juice ($5.99)
    await user.click(withinCart.getByRole('button', { name: /Juice.*\$5\.99/i }));

    // Should show $10.98
    await waitFor(() => {
      expect(withinCart.getByText('$10.98')).toBeInTheDocument();
    });
  },
};

/**
 * Cart pattern - quantity controls
 */
export const CartQuantityControls: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find Pattern 2 section
    const cartSection = canvas.getByText('Pattern 2: Selector Hooks').closest('.card')!;
    const withinCart = within(cartSection as HTMLElement);

    // Add Coffee
    await user.click(withinCart.getByRole('button', { name: /Coffee/i }));

    await waitFor(() => {
      expect(withinCart.getByText('1 items')).toBeInTheDocument();
    });

    // Add Coffee again (increment quantity)
    await user.click(withinCart.getByRole('button', { name: /Coffee/i }));

    // Should show 2 items (same product, qty 2)
    await waitFor(() => {
      expect(withinCart.getByText('2 items')).toBeInTheDocument();
    });
  },
};

/**
 * Best practice tip is shown
 */
export const BestPracticeTip: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the tip
    expect(canvas.getByText('Best Practice:')).toBeInTheDocument();
    expect(canvas.getByText(/Export everything from a single file/)).toBeInTheDocument();
  },
};

/**
 * Code toggle works
 */
export const CodeToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Show Code Patterns
    await user.click(canvas.getByRole('button', { name: 'Show Code Patterns' }));

    // Should show code snippet
    await waitFor(() => {
      expect(canvas.getByText('Advanced Provider Patterns')).toBeInTheDocument();
    });
  },
};
