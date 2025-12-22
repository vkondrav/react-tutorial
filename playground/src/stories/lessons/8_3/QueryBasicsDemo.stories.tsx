import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import QueryBasicsDemo from '@lessons/8_3/QueryBasicsDemo';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof QueryBasicsDemo> = {
  title: 'Lessons/8.3 TanStack Query/QueryBasicsDemo',
  component: QueryBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the basic useQuery pattern with TanStack Query, including loading, error, and success states.',
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
 * Default view - fetches users on mount and displays them with state indicators
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for the loading state to finish and users to appear
    await waitFor(
      () => {
        const userElements = canvas.getAllByText(/Leanne Graham|Ervin Howell|Clementine Bauch/);
        expect(userElements.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );

    // Verify we have users displayed
    expect(canvas.getByText('Leanne Graham')).toBeInTheDocument();
    expect(canvas.getByText('Sincere@april.biz')).toBeInTheDocument();

    // Verify the comparison note is shown
    expect(canvas.getByText(/Compare to useEffect!/)).toBeInTheDocument();
  },
};

/**
 * Tests that the state indicators are displayed correctly
 */
export const StateIndicators: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for users to load
    await waitFor(
      () => {
        expect(canvas.getByText('Leanne Graham')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Verify all state indicators are visible
    expect(canvas.getByText('isLoading')).toBeInTheDocument();
    expect(canvas.getByText('isFetching')).toBeInTheDocument();
    expect(canvas.getByText('isError')).toBeInTheDocument();
    expect(canvas.getByText('isSuccess')).toBeInTheDocument();

    // Comparison note should be visible
    expect(canvas.getByText(/Compare to useEffect!/)).toBeInTheDocument();
  },
};

/**
 * Tests the refetch button functionality
 */
export const RefetchButton: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial fetch to complete
    await waitFor(
      () => {
        expect(canvas.getByText('Leanne Graham')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Click refetch button
    const refetchButton = canvas.getByRole('button', { name: /Refetch/ });
    await userEvent.click(refetchButton);

    // Should show fetching state briefly or remain successful
    await waitFor(
      () => {
        expect(canvas.getByText('Leanne Graham')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests the code toggle functionality
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for users to load first
    await waitFor(
      () => {
        expect(canvas.getByText('Leanne Graham')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Code should be hidden initially
    expect(canvas.queryByText('useQuery Basics')).not.toBeInTheDocument();

    // Click to show code
    const showCodeButton = canvas.getByRole('button', { name: /Show Code/ });
    await userEvent.click(showCodeButton);

    // Code snippet should be visible
    await waitFor(() => {
      expect(canvas.getByText('useQuery Basics')).toBeInTheDocument();
    });

    // Click to hide code
    const hideCodeButton = canvas.getByRole('button', { name: /Hide Code/ });
    await userEvent.click(hideCodeButton);

    // Code should be hidden again
    await waitFor(() => {
      expect(canvas.queryByText('useQuery Basics')).not.toBeInTheDocument();
    });
  },
};
