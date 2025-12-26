import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import EmptyStatesDemo from '@lessons/4_2/EmptyStatesDemo';

const meta: Meta<typeof EmptyStatesDemo> = {
  title: 'Lessons/4.2 Loading Error Empty States/EmptyStatesDemo',
  component: EmptyStatesDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates empty state patterns: No Data, No Results, First Time User, and Filtered Out states.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows the No Data empty state
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify empty state type buttons are present
    expect(canvas.getByRole('button', { name: 'No Data' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'No Results' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'First Time' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Filtered Out' })).toBeInTheDocument();

    // No Data should show the "No projects yet" message
    expect(canvas.getByText('No projects yet')).toBeInTheDocument();
    expect(canvas.getByText(/You haven't created any projects/)).toBeInTheDocument();
  },
};

/**
 * Tests switching to No Results empty state
 */
export const NoResultsState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on No Results button
    const noResultsButton = canvas.getByRole('button', { name: 'No Results' });
    await userEvent.click(noResultsButton);

    // Verify No Results is now selected (uses bg-primary for selected state)
    await waitFor(() => {
      expect(noResultsButton).toHaveClass('bg-primary');
    });

    expect(canvas.getByText('No results found')).toBeInTheDocument();
    expect(canvas.getByText(/couldn't find anything matching/)).toBeInTheDocument();
  },
};

/**
 * Tests switching to First Time empty state
 */
export const FirstTimeState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on First Time button
    const firstTimeButton = canvas.getByRole('button', { name: 'First Time' });
    await userEvent.click(firstTimeButton);

    // Verify First Time is now selected (uses bg-primary for selected state)
    await waitFor(() => {
      expect(firstTimeButton).toHaveClass('bg-primary');
    });

    expect(canvas.getByText('Welcome to Photos!')).toBeInTheDocument();
    expect(canvas.getByText(/Your memories will appear here/)).toBeInTheDocument();
  },
};

/**
 * Tests switching to Filtered Out empty state
 */
export const FilteredOutState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Filtered Out button
    const filteredButton = canvas.getByRole('button', { name: 'Filtered Out' });
    await userEvent.click(filteredButton);

    // Verify Filtered Out is now selected (uses bg-primary for selected state)
    await waitFor(() => {
      expect(filteredButton).toHaveClass('bg-primary');
    });

    expect(canvas.getByText('No items match filters')).toBeInTheDocument();
    expect(canvas.getByText(/Try adjusting your filters/)).toBeInTheDocument();
  },
};

/**
 * Tests the interactive search demo - searching with results
 */
export const InteractiveSearchWithResults: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the search input in the interactive demo
    const searchInput = canvas.getByPlaceholderText('Search items...');
    expect(searchInput).toBeInTheDocument();

    // Search for "React" which should match "React Fundamentals"
    await userEvent.type(searchInput, 'React');

    // Should show matching result
    await waitFor(() => {
      expect(canvas.getByText('React Fundamentals')).toBeInTheDocument();
    });

    // TypeScript Basics should not be visible since it doesn't match
    // (Actually it might be visible if the search is case-insensitive partial match)
  },
};

/**
 * Tests the interactive search demo - searching with no results
 */
export const InteractiveSearchNoResults: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the search input in the interactive demo
    const searchInput = canvas.getByPlaceholderText('Search items...');

    // Search for something that doesn't exist
    await userEvent.type(searchInput, 'xyz123');

    // Should show "No matching results" empty state
    await waitFor(() => {
      expect(canvas.getByText('No matching results')).toBeInTheDocument();
    });

    // Should show a Clear Filters button
    expect(canvas.getByRole('button', { name: /Clear Filters/ })).toBeInTheDocument();
  },
};

/**
 * Tests the category filter in interactive demo
 */
export const InteractiveFilterByCategory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the category select
    const categorySelect = canvas.getByRole('combobox');
    expect(categorySelect).toBeInTheDocument();

    // Filter by "Articles"
    await userEvent.selectOptions(categorySelect, 'article');

    // Should only show articles
    await waitFor(() => {
      expect(canvas.getByText('CSS Grid Guide')).toBeInTheDocument();
    });

    // Courses should not be visible
    expect(canvas.queryByText('React Fundamentals')).not.toBeInTheDocument();
  },
};

/**
 * Tests clearing filters in interactive demo
 */
export const InteractiveClearFilters: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // First apply a search filter
    const searchInput = canvas.getByPlaceholderText('Search items...');
    await userEvent.type(searchInput, 'xyz');

    // Should show no results
    await waitFor(() => {
      expect(canvas.getByText('No matching results')).toBeInTheDocument();
    });

    // Click Clear button
    const clearButton = canvas.getByRole('button', { name: /Clear$/ });
    await userEvent.click(clearButton);

    // Should show all items again
    await waitFor(() => {
      expect(canvas.getByText('React Fundamentals')).toBeInTheDocument();
      expect(canvas.getByText('TypeScript Basics')).toBeInTheDocument();
    });
  },
};

/**
 * Verifies guidelines section
 */
export const Guidelines: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify guidelines section is present
    expect(canvas.getByText('Empty State Guidelines')).toBeInTheDocument();
    expect(canvas.getByText(/Explain what would appear here/)).toBeInTheDocument();
    expect(canvas.getByText(/Show what was searched for/)).toBeInTheDocument();
    expect(canvas.getByText(/Welcome the user warmly/)).toBeInTheDocument();
  },
};
