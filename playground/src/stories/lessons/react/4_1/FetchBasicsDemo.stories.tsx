import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { http, HttpResponse, delay } from 'msw';
import FetchBasicsDemo from '@lessons/react/4_1/FetchBasicsDemo';
import { handlers, mockUsers } from '@mocks/handlers';

const meta: Meta<typeof FetchBasicsDemo> = {
  title: 'Lessons/react-4.1/FetchBasicsDemo',
  component: FetchBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the basic pattern of fetching data with useEffect, including loading and error states.',
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
 * Default view - fetches users on mount and displays them
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
      { timeout: 3000 }
    );

    // Verify we have users displayed
    expect(canvas.getByText('Leanne Graham')).toBeInTheDocument();
    expect(canvas.getByText('Sincere@april.biz')).toBeInTheDocument();

    // Verify success state indicator is shown
    const successIndicator = canvas.getByText(/5 users/);
    expect(successIndicator).toBeInTheDocument();
  },
};

/**
 * Tests the loading state while data is being fetched
 */
export const LoadingState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/users', async () => {
          // Long delay to keep loading state visible
          await delay('infinite');
          return HttpResponse.json(mockUsers);
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show loading spinner
    await waitFor(() => {
      expect(canvas.getByText('Loading users...')).toBeInTheDocument();
    });

    // Loading indicator should be visible
    const loadingIndicator = canvas.getByText('Active');
    expect(loadingIndicator).toBeInTheDocument();
  },
};

/**
 * Tests the error state when fetch fails
 */
export const ErrorState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/users', async () => {
          await delay(100);
          return new HttpResponse(null, { status: 500 });
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for error to appear
    await waitFor(
      () => {
        const errorText = canvas.getByText(/Error:/);
        expect(errorText).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Should show "Try Again" button
    expect(canvas.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();

    // Error indicator should be active
    const errorIndicator = canvas.getByText('Has Error');
    expect(errorIndicator).toBeInTheDocument();
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
      { timeout: 3000 }
    );

    // Check initial fetch count
    const fetchCount1 = canvas.getByText('1x');
    expect(fetchCount1).toBeInTheDocument();

    // Click refetch button
    const refetchButton = canvas.getByRole('button', { name: /Refetch/ });
    await userEvent.click(refetchButton);

    // Wait for refetch to complete - fetch count should increment
    await waitFor(
      () => {
        const fetchCount2 = canvas.getByText('2x');
        expect(fetchCount2).toBeInTheDocument();
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
      { timeout: 3000 }
    );

    // Code should be hidden initially
    expect(canvas.queryByText('The useEffect Pattern')).not.toBeInTheDocument();

    // Click to show code
    const showCodeButton = canvas.getByRole('button', { name: /Show Code/ });
    await userEvent.click(showCodeButton);

    // Code snippet should be visible
    await waitFor(() => {
      expect(canvas.getByText('The useEffect Pattern')).toBeInTheDocument();
    });

    // Click to hide code
    const hideCodeButton = canvas.getByRole('button', { name: /Hide Code/ });
    await userEvent.click(hideCodeButton);

    // Code should be hidden again
    await waitFor(() => {
      expect(canvas.queryByText('The useEffect Pattern')).not.toBeInTheDocument();
    });
  },
};
