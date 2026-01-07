import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import FetchPlayground from '@lessons/react/4_1/FetchPlayground';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof FetchPlayground> = {
  title: 'Lessons/react-4.1/FetchPlayground',
  component: FetchPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive playground with 4 demos: Search (debounced), Photos Gallery, Comments, and Auto-Refresh polling.',
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
 * Default view showing the Search tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should start on Search tab
    expect(canvas.getByText('Search Todos (Debounced)')).toBeInTheDocument();

    // Wait for todos to load
    await waitFor(
      () => {
        const todoItems = canvas.getAllByRole('checkbox');
        expect(todoItems.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests the search functionality with debounce
 */
export const SearchDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for todos to load
    await waitFor(
      () => {
        const todoItems = canvas.getAllByRole('checkbox');
        expect(todoItems.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );

    // Find the search input
    const searchInput = canvas.getByPlaceholderText('Search todos...');

    // Type a search term
    await userEvent.type(searchInput, 'Buy');

    // Wait for debounced search to filter results
    await waitFor(
      () => {
        // Should show filtered results containing "Buy groceries"
        const buyGroceriesItems = canvas.getAllByText(/Buy groceries/);
        expect(buyGroceriesItems.length).toBeGreaterThan(0);
      },
      { timeout: 2000 }
    );

    // Clear and search for something else
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'Walk');

    await waitFor(
      () => {
        const walkTheDogItems = canvas.getAllByText(/Walk the dog/);
        expect(walkTheDogItems.length).toBeGreaterThan(0);
      },
      { timeout: 2000 }
    );
  },
};

/**
 * Tests the Photos gallery tab
 */
export const PhotosDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Photos tab
    const photosTab = canvas.getByRole('button', { name: /Photos/ });
    await userEvent.click(photosTab);

    // Wait for photos to load
    await waitFor(
      () => {
        expect(canvas.getByText('Photo Albums')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Should show album selector buttons
    expect(canvas.getByRole('button', { name: 'Album 1' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Album 2' })).toBeInTheDocument();

    // Wait for images to appear (they're mocked)
    await waitFor(
      () => {
        const images = canvas.getAllByRole('img');
        expect(images.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );

    // Switch to Album 2
    const album2Button = canvas.getByRole('button', { name: 'Album 2' });
    await userEvent.click(album2Button);

    // Wait for new album photos
    await waitFor(
      () => {
        const images = canvas.getAllByRole('img');
        expect(images.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests the Comments tab
 */
export const CommentsDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Comments tab
    const commentsTab = canvas.getByRole('button', { name: /Comments/ });
    await userEvent.click(commentsTab);

    // Should show Comments section
    await waitFor(() => {
      expect(canvas.getByText('Post Comments')).toBeInTheDocument();
    });

    // Wait for comments to load
    await waitFor(
      () => {
        const commentElements = canvas.getAllByText(/Great insights/);
        expect(commentElements.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );

    // Switch to a different post using the dropdown
    const postSelect = canvas.getByRole('combobox');
    await userEvent.selectOptions(postSelect, '2');

    // Wait for new comments to load
    await waitFor(
      () => {
        const commentElements = canvas.getAllByText(/Great insights/);
        expect(commentElements.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests the Auto-Refresh (Polling) tab
 */
export const AutoRefreshDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Auto-Refresh tab
    const refreshTab = canvas.getByRole('button', { name: /Auto-Refresh/ });
    await userEvent.click(refreshTab);

    // Should show Auto-Refresh section
    await waitFor(() => {
      expect(canvas.getByText('Auto-Refresh (Polling)')).toBeInTheDocument();
    });

    // Polling should be stopped initially
    expect(canvas.getByText('Stopped')).toBeInTheDocument();
    expect(canvas.getByText('Start Polling')).toBeInTheDocument();

    // Start polling
    const startButton = canvas.getByRole('button', { name: 'Start Polling' });
    await userEvent.click(startButton);

    // Polling should now be active
    await waitFor(() => {
      expect(canvas.getByText('Active')).toBeInTheDocument();
    });

    // Wait for at least one fetch
    await waitFor(
      () => {
        // Should show a random todo
        expect(canvas.getByText(/Random Todo/)).toBeInTheDocument();
        // Fetch count should be at least 1
        const fetchCount = canvas.getByText(/Fetch Count:/);
        expect(fetchCount.parentElement?.textContent).toMatch(/[1-9]/);
      },
      { timeout: 5000 }
    );

    // Stop polling
    const stopButton = canvas.getByRole('button', { name: 'Stop Polling' });
    await userEvent.click(stopButton);

    // Polling should be stopped
    await waitFor(() => {
      expect(canvas.getByText('Stopped')).toBeInTheDocument();
    });
  },
};

/**
 * Tests switching between all tabs
 */
export const TabNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start on Search
    await waitFor(() => {
      expect(canvas.getByText('Search Todos (Debounced)')).toBeInTheDocument();
    });

    // Go to Photos
    await userEvent.click(canvas.getByRole('button', { name: /Photos/ }));
    await waitFor(() => {
      expect(canvas.getByText('Photo Albums')).toBeInTheDocument();
    });

    // Go to Comments
    await userEvent.click(canvas.getByRole('button', { name: /Comments/ }));
    await waitFor(() => {
      expect(canvas.getByText('Post Comments')).toBeInTheDocument();
    });

    // Go to Auto-Refresh
    await userEvent.click(canvas.getByRole('button', { name: /Auto-Refresh/ }));
    await waitFor(() => {
      expect(canvas.getByText('Auto-Refresh (Polling)')).toBeInTheDocument();
    });

    // Back to Search
    await userEvent.click(canvas.getByRole('button', { name: /Search/ }));
    await waitFor(() => {
      expect(canvas.getByText('Search Todos (Debounced)')).toBeInTheDocument();
    });
  },
};

/**
 * Tests empty search results
 */
export const EmptySearchResults: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for todos to load
    await waitFor(
      () => {
        const todoItems = canvas.getAllByRole('checkbox');
        expect(todoItems.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );

    // Search for something that doesn't exist
    const searchInput = canvas.getByPlaceholderText('Search todos...');
    await userEvent.type(searchInput, 'xyznonexistent123');

    // Wait for "No results" message
    await waitFor(
      () => {
        expect(canvas.getByText('No results found')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  },
};
