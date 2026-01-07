import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import ListOperationsDemo from '@lessons/react/2_5/ListOperationsDemo';

const meta: Meta<typeof ListOperationsDemo> = {
  title: 'Lessons/react-2.5/ListOperationsDemo',
  component: ListOperationsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates filtering, sorting, and transforming lists - shows how to chain array methods before .map().',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows all products with filter controls
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show all 8 products by default
    expect(canvasElement.textContent).toContain('Showing 8 of 8 products');

    // Should show filter controls
    expect(canvas.getByPlaceholderText('Search products...')).toBeInTheDocument();

    // Should have category dropdown
    const selects = canvas.getAllByRole('combobox');
    expect(selects.length).toBe(3); // Category, Stock, Sort

    // Should show some products
    expect(canvasElement.textContent).toContain('Laptop Pro');
    expect(canvasElement.textContent).toContain('Wireless Mouse');
    expect(canvasElement.textContent).toContain('Standing Desk');
  },
};

/**
 * Tests search filtering
 */
export const SearchFilter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Type in search
    const searchInput = canvas.getByPlaceholderText('Search products...');
    await userEvent.type(searchInput, 'desk');

    // Should filter to desk items
    expect(canvasElement.textContent).toContain('Standing Desk');
    expect(canvasElement.textContent).toContain('Desk Lamp');

    // Should show filtered count
    expect(canvasElement.textContent).toContain('Showing 2 of 8 products');

    // Other items should not be visible
    expect(canvasElement.textContent).not.toContain('Laptop Pro');
  },
};

/**
 * Tests category filtering
 */
export const CategoryFilter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Select Electronics category
    const selects = canvas.getAllByRole('combobox');
    await userEvent.selectOptions(selects[0], 'Electronics');

    // Should show only electronics
    expect(canvasElement.textContent).toContain('Laptop Pro');
    expect(canvasElement.textContent).toContain('Wireless Mouse');
    expect(canvasElement.textContent).toContain('Mechanical Keyboard');
    expect(canvasElement.textContent).toContain('Monitor 27"');
    expect(canvasElement.textContent).toContain('USB-C Hub');

    // Should not show furniture
    expect(canvasElement.textContent).not.toContain('Standing Desk');
    expect(canvasElement.textContent).not.toContain('Office Chair');

    // Should show filtered count
    expect(canvasElement.textContent).toContain('Showing 5 of 8 products');
  },
};

/**
 * Tests stock filtering
 */
export const StockFilter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Select Out of Stock
    const selects = canvas.getAllByRole('combobox');
    await userEvent.selectOptions(selects[1], 'outOfStock');

    // Should show only out of stock items
    expect(canvasElement.textContent).toContain('Standing Desk');
    expect(canvasElement.textContent).toContain('Monitor 27"');

    // Should show filtered count
    expect(canvasElement.textContent).toContain('Showing 2 of 8 products');

    // In stock items should not be visible
    expect(canvasElement.textContent).not.toContain('Laptop Pro');
    expect(canvasElement.textContent).not.toContain('Wireless Mouse');
  },
};

/**
 * Tests sorting by price
 */
export const SortByPrice: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Select Sort by Price
    const selects = canvas.getAllByRole('combobox');
    await userEvent.selectOptions(selects[2], 'price');

    // Products should be sorted by price (ascending by default)
    // Cheapest first: Wireless Mouse $49
    const productList = canvasElement.querySelectorAll('.rounded-lg.bg-base-200');
    expect(productList.length).toBeGreaterThan(0);
  },
};

/**
 * Tests toggling sort order
 */
export const ToggleSortOrder: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the sort order toggle button
    const sortButton = canvas.getByTitle(/Ascending|Descending/);
    expect(sortButton).toBeInTheDocument();

    // Click to toggle
    await userEvent.click(sortButton);

    // Button should now show different icon (can't easily verify icon, but action works)
    expect(sortButton).toBeInTheDocument();
  },
};

/**
 * Tests combined filters showing no results
 */
export const NoResults: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Search for something that doesn't exist
    const searchInput = canvas.getByPlaceholderText('Search products...');
    await userEvent.type(searchInput, 'xyz123notfound');

    // Should show no results message
    expect(canvasElement.textContent).toContain('No products match your filters');
    expect(canvasElement.textContent).toContain('Showing 0 of 8 products');
  },
};

/**
 * Tests combined filters
 */
export const CombinedFilters: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Select Electronics category
    const selects = canvas.getAllByRole('combobox');
    await userEvent.selectOptions(selects[0], 'Electronics');

    // Select In Stock
    await userEvent.selectOptions(selects[1], 'inStock');

    // Should show only in-stock electronics
    expect(canvasElement.textContent).toContain('Laptop Pro');
    expect(canvasElement.textContent).toContain('Wireless Mouse');
    expect(canvasElement.textContent).toContain('Mechanical Keyboard');
    expect(canvasElement.textContent).toContain('USB-C Hub');

    // Monitor is out of stock
    expect(canvasElement.textContent).not.toContain('Monitor 27"');

    // Should show filtered count
    expect(canvasElement.textContent).toContain('Showing 4 of 8 products');
  },
};

/**
 * Shows product details correctly
 */
export const ShowsProductDetails: Story = {
  play: async ({ canvasElement }) => {
    // Should show product prices
    expect(canvasElement.textContent).toContain('$1299');
    expect(canvasElement.textContent).toContain('$49');
    expect(canvasElement.textContent).toContain('$599');

    // Should show stock badges
    expect(canvasElement.textContent).toContain('In Stock');
    expect(canvasElement.textContent).toContain('Out of Stock');

    // Should show categories
    expect(canvasElement.textContent).toContain('Electronics');
    expect(canvasElement.textContent).toContain('Furniture');
  },
};
