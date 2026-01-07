import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { http, HttpResponse, delay } from 'msw';
import StatesPlayground from '@lessons/react/4_2/StatesPlayground';
import { handlers, mockPosts } from '@mocks/handlers';

const meta: Meta<typeof StatesPlayground> = {
  title: 'Lessons/react-4.2/StatesPlayground',
  component: StatesPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive playground with 3 demos: Photo Gallery, Search, and Shopping Cart - each demonstrating loading, error, and empty states.',
      },
    },
    msw: {
      handlers,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows Photo Gallery tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify tab buttons are present
    expect(canvas.getByRole('button', { name: /Photo Gallery/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Search/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Shopping Cart/ })).toBeInTheDocument();

    // Photo Gallery should be selected by default
    const photoGalleryButton = canvas.getByRole('button', { name: /Photo Gallery/ });
    expect(photoGalleryButton).toHaveClass('btn-primary');

    // Verify controls for Photo Gallery demo
    expect(canvas.getByText('Simulate Error')).toBeInTheDocument();
    expect(canvas.getByText('Simulate Empty')).toBeInTheDocument();
  },
};

/**
 * Tests Photo Gallery loading and displaying photos
 */
export const PhotoGalleryData: Story = {
  play: async ({ canvasElement }) => {
    // Wait for photos to load (they should appear as images)
    await waitFor(
      () => {
        const images = canvasElement.querySelectorAll('img');
        expect(images.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests Photo Gallery error simulation
 */
export const PhotoGalleryError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial load to complete
    await waitFor(
      () => {
        const images = canvasElement.querySelectorAll('img');
        expect(images.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );

    // Check the "Simulate Error" checkbox
    const simulateErrorCheckbox = canvas.getByLabelText('Simulate Error');
    await userEvent.click(simulateErrorCheckbox);

    // Should show error state
    await waitFor(
      () => {
        expect(canvas.getByText('Failed to load photos')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Retry button should be present
    expect(canvas.getByRole('button', { name: /Retry/ })).toBeInTheDocument();
  },
};

/**
 * Tests Photo Gallery empty simulation
 */
export const PhotoGalleryEmpty: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial load
    await waitFor(
      () => {
        const images = canvasElement.querySelectorAll('img');
        expect(images.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );

    // Check the "Simulate Empty" checkbox
    const simulateEmptyCheckbox = canvas.getByLabelText('Simulate Empty');
    await userEvent.click(simulateEmptyCheckbox);

    // Should show empty state
    await waitFor(
      () => {
        expect(canvas.getByText('No photos to display')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests Search tab
 */
export const SearchTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Search tab
    const searchButton = canvas.getByRole('button', { name: /Search/ });
    await userEvent.click(searchButton);

    // Verify Search tab is selected
    await waitFor(() => {
      expect(searchButton).toHaveClass('btn-primary');
    });

    // Should show search input
    expect(canvas.getByPlaceholderText('Search posts...')).toBeInTheDocument();

    // Should show initial prompt
    expect(canvas.getByText('Enter a search term to find posts')).toBeInTheDocument();
  },
};

/**
 * Tests Search with results
 */
export const SearchWithResults: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/posts', async () => {
          await delay(300);
          return HttpResponse.json(mockPosts.slice(0, 3));
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Search tab
    const searchButton = canvas.getByRole('button', { name: /Search/ });
    await userEvent.click(searchButton);

    // Find and type in search input
    const searchInput = canvas.getByPlaceholderText('Search posts...');
    await userEvent.type(searchInput, 'post');

    // Wait for results to appear
    await waitFor(
      () => {
        const results = canvasElement.querySelectorAll('li');
        expect(results.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests Search with no results
 */
export const SearchNoResults: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/posts', async () => {
          await delay(300);
          return HttpResponse.json([]);
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Search tab
    const searchButton = canvas.getByRole('button', { name: /Search/ });
    await userEvent.click(searchButton);

    // Find and type in search input
    const searchInput = canvas.getByPlaceholderText('Search posts...');
    await userEvent.type(searchInput, 'xyz123nonexistent');

    // Wait for "no results" message
    await waitFor(
      () => {
        expect(canvas.getByText(/No results for/)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests clearing search
 */
export const SearchClear: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Search tab
    const searchButton = canvas.getByRole('button', { name: /Search/ });
    await userEvent.click(searchButton);

    // Type something in search
    const searchInput = canvas.getByPlaceholderText('Search posts...');
    await userEvent.type(searchInput, 'test');

    // Clear button should appear - find and click it
    await waitFor(() => {
      const clearButton = canvasElement.querySelector('button[class*="btn-square"]');
      expect(clearButton).toBeInTheDocument();
    });

    // Click the clear button
    const clearButton = canvasElement.querySelector(
      'button[class*="btn-square"]'
    ) as HTMLButtonElement;
    await userEvent.click(clearButton);

    // Search input should be empty and show initial prompt
    await waitFor(() => {
      expect(canvas.getByText('Enter a search term to find posts')).toBeInTheDocument();
    });
  },
};

/**
 * Tests Shopping Cart tab
 */
export const ShoppingCartTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Shopping Cart tab
    const cartButton = canvas.getByRole('button', { name: /Shopping Cart/ });
    await userEvent.click(cartButton);

    // Verify Shopping Cart tab is selected
    await waitFor(() => {
      expect(cartButton).toHaveClass('btn-primary');
    });

    // Wait for cart to load and show items
    await waitFor(
      () => {
        expect(canvas.getByText('React Handbook')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(canvas.getByText('TypeScript Guide')).toBeInTheDocument();
  },
};

/**
 * Tests removing items from cart
 */
export const ShoppingCartRemoveItem: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Shopping Cart tab
    const cartButton = canvas.getByRole('button', { name: /Shopping Cart/ });
    await userEvent.click(cartButton);

    // Wait for cart items to load
    await waitFor(
      () => {
        expect(canvas.getByText('React Handbook')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Find the remove button (X) for the first item and click it
    const removeButtons = canvasElement.querySelectorAll('button[class*="btn-square"]');
    // Filter to find remove buttons (the ones with X icon)
    const removeButton = removeButtons[0] as HTMLButtonElement;
    await userEvent.click(removeButton);

    // React Handbook should be removed
    await waitFor(() => {
      expect(canvas.queryByText('React Handbook')).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests clearing the entire cart
 */
export const ShoppingCartClear: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Shopping Cart tab
    const cartButton = canvas.getByRole('button', { name: /Shopping Cart/ });
    await userEvent.click(cartButton);

    // Wait for cart items to load
    await waitFor(
      () => {
        expect(canvas.getByText('React Handbook')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Click the Clear button
    const clearButton = canvas.getByRole('button', { name: 'Clear' });
    await userEvent.click(clearButton);

    // Should show empty cart state
    await waitFor(() => {
      expect(canvas.getByText('Your cart is empty')).toBeInTheDocument();
    });
  },
};

/**
 * Tests adding sample item to empty cart
 */
export const ShoppingCartAddSample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Shopping Cart tab
    const cartButton = canvas.getByRole('button', { name: /Shopping Cart/ });
    await userEvent.click(cartButton);

    // Wait for cart items to load
    await waitFor(
      () => {
        expect(canvas.getByText('React Handbook')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Clear the cart first
    const clearButton = canvas.getByRole('button', { name: 'Clear' });
    await userEvent.click(clearButton);

    // Wait for empty state
    await waitFor(() => {
      expect(canvas.getByText('Your cart is empty')).toBeInTheDocument();
    });

    // Click "Add Sample Item" button
    const addSampleButton = canvas.getByRole('button', { name: 'Add Sample Item' });
    await userEvent.click(addSampleButton);

    // Sample item should be added
    await waitFor(() => {
      expect(canvas.getByText('Sample Item')).toBeInTheDocument();
    });
  },
};

/**
 * Verifies the "What to Notice" tips section
 */
export const WhatToNotice: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify tips section
    expect(canvas.getByText('What to Notice')).toBeInTheDocument();
    expect(canvas.getByText(/Skeletons match layout/)).toBeInTheDocument();
    expect(canvas.getByText(/Errors are actionable/)).toBeInTheDocument();
    expect(canvas.getByText(/Empty states guide users/)).toBeInTheDocument();
    expect(canvas.getByText(/Search shows context/)).toBeInTheDocument();
  },
};
