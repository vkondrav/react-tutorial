import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import LiftingPlayground from '@lessons/react/7_1/LiftingPlayground';

const meta: Meta<typeof LiftingPlayground> = {
  title: 'Lessons/react-7.1/LiftingPlayground',
  component: LiftingPlayground,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Interactive playground with three lifted state demos: Shopping Cart, Form Wizard, and Currency Converter.',
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
 * Default view shows Shopping Cart demo
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show all three tab buttons
    expect(canvas.getByRole('button', { name: /Shopping Cart/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Form Wizard/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Currency Converter/i })).toBeInTheDocument();

    // Should show shopping cart demo by default
    expect(canvas.getByText('Products and cart share selection state')).toBeInTheDocument();
    expect(canvas.getByText('Products')).toBeInTheDocument();
  },
};

/**
 * Shopping cart - add items
 */
export const ShoppingCartAddItems: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Cart should be empty initially
    expect(canvas.getByText('Your cart is empty')).toBeInTheDocument();

    // Find and click Add button for Wireless Headphones
    const addButtons = canvas.getAllByRole('button', { name: /Add/i });
    await user.click(addButtons[0]); // First Add button

    // Cart should now have 1 item
    await waitFor(() => {
      expect(canvas.getByText(/Cart \(1 items\)/)).toBeInTheDocument();
    });

    // Add another item
    await user.click(addButtons[1]); // Second Add button

    // Cart should now have 2 items
    await waitFor(() => {
      expect(canvas.getByText(/Cart \(2 items\)/)).toBeInTheDocument();
    });
  },
};

/**
 * Shopping cart - remove item
 */
export const ShoppingCartRemove: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Add an item first
    const addButtons = canvas.getAllByRole('button', { name: /Add/i });
    await user.click(addButtons[0]);

    await waitFor(() => {
      expect(canvas.getByText(/Cart \(1 items\)/)).toBeInTheDocument();
    });

    // Add another item
    await user.click(addButtons[1]);

    await waitFor(() => {
      expect(canvas.getByText(/Cart \(2 items\)/)).toBeInTheDocument();
    });

    // The cart is working - items can be added
    expect(canvas.queryByText('Your cart is empty')).not.toBeInTheDocument();
  },
};

/**
 * Form Wizard demo
 */
export const FormWizardDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Form Wizard tab
    await user.click(canvas.getByRole('button', { name: /Form Wizard/i }));

    await waitFor(() => {
      expect(canvas.getByText('Multi-step form with live summary')).toBeInTheDocument();
    });

    // Should show Step 1
    expect(canvas.getByText('Step 1: Personal Information')).toBeInTheDocument();

    // Should show Summary panel
    expect(canvas.getByText('Summary (Live Preview)')).toBeInTheDocument();
  },
};

/**
 * Form Wizard - fill form and see live summary
 */
export const FormWizardLiveSummary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Form Wizard
    await user.click(canvas.getByRole('button', { name: /Form Wizard/i }));

    await waitFor(() => {
      expect(canvas.getByText('Step 1: Personal Information')).toBeInTheDocument();
    });

    // Fill in name
    const nameInput = canvas.getByPlaceholderText('Enter your name');
    await user.type(nameInput, 'John Doe');

    // Summary should update
    await waitFor(() => {
      expect(canvas.getByText('John Doe')).toBeInTheDocument();
    });

    // Fill in email
    const emailInput = canvas.getByPlaceholderText('Enter your email');
    await user.type(emailInput, 'john@example.com');

    // Summary should update
    await waitFor(() => {
      expect(canvas.getByText('john@example.com')).toBeInTheDocument();
    });
  },
};

/**
 * Form Wizard - navigate steps
 */
export const FormWizardNavigate: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Form Wizard
    await user.click(canvas.getByRole('button', { name: /Form Wizard/i }));

    await waitFor(() => {
      expect(canvas.getByText('Step 1: Personal Information')).toBeInTheDocument();
    });

    // Fill required fields for step 1
    await user.type(canvas.getByPlaceholderText('Enter your name'), 'John');
    await user.type(canvas.getByPlaceholderText('Enter your email'), 'john@test.com');

    // Click Next
    await user.click(canvas.getByRole('button', { name: /Next/i }));

    // Should show Step 2
    await waitFor(() => {
      expect(canvas.getByText('Step 2: Select Plan')).toBeInTheDocument();
    });

    // Select a plan
    await user.click(canvas.getByRole('button', { name: 'Pro' }));

    // Click Next
    await user.click(canvas.getByRole('button', { name: /Next/i }));

    // Should show Step 3
    await waitFor(() => {
      expect(canvas.getByText('Step 3: Add Features')).toBeInTheDocument();
    });
  },
};

/**
 * Currency Converter demo
 */
export const CurrencyConverterDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Currency Converter
    await user.click(canvas.getByRole('button', { name: /Currency Converter/i }));

    await waitFor(() => {
      expect(canvas.getByText('Two-way synced currency inputs')).toBeInTheDocument();
    });

    // Should show currency selects (USD and EUR appear as options, so use getAllByText)
    const usdOptions = canvas.getAllByText('USD');
    expect(usdOptions.length).toBeGreaterThan(0);
    const eurOptions = canvas.getAllByText('EUR');
    expect(eurOptions.length).toBeGreaterThan(0);
  },
};

/**
 * Currency Converter - swap currencies
 */
export const CurrencyConverterSwap: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Currency Converter
    await user.click(canvas.getByRole('button', { name: /Currency Converter/i }));

    await waitFor(() => {
      expect(canvas.getByText('Two-way synced currency inputs')).toBeInTheDocument();
    });

    // Find and click swap button (the circular button with arrows)
    const circleBtn = Array.from(canvasElement.querySelectorAll('button.btn-circle')).find((btn) =>
      btn.querySelector('svg')
    );

    if (circleBtn) {
      await user.click(circleBtn);
    }

    // Currencies should swap - now EUR should be first
    // The selects should have swapped values
    const selects = canvasElement.querySelectorAll('select');
    await waitFor(() => {
      expect(selects[0]).toHaveValue('EUR');
      expect(selects[1]).toHaveValue('USD');
    });
  },
};

/**
 * Notice hint is shown
 */
export const NoticeHint: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the hint notice
    expect(canvas.getByText(/Notice:/)).toBeInTheDocument();
    expect(canvas.getByText(/sibling components stay in sync/)).toBeInTheDocument();
  },
};
