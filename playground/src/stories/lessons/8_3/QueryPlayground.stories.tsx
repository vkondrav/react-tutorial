import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import QueryPlayground from '@lessons/8_3/QueryPlayground';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof QueryPlayground> = {
  title: 'Lessons/8.3/QueryPlayground',
  component: QueryPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive playground demonstrating dependent queries, parallel queries, deduplication, and polling patterns.',
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
 * Default view - Dependent Queries demo
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the dependent queries tab is active
    expect(canvas.getByRole('button', { name: /Dependent/ })).toHaveClass('tab-active');

    // Wait for users to load
    await waitFor(
      () => {
        expect(canvas.getByText('Select a User')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests the dependent queries demo - selecting a user loads their posts
 */
export const DependentQueries: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for users to load
    await waitFor(
      () => {
        const userButtons = canvas.getAllByRole('button');
        expect(userButtons.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );

    // Initially should show "Select a user first" message
    expect(canvas.getByText(/Select a user first/)).toBeInTheDocument();

    // Click on the first user in the list (should be Leanne Graham)
    await waitFor(
      async () => {
        const leanneButton = canvas.getByText('Leanne Graham');
        await userEvent.click(leanneButton);
      },
      { timeout: 5000 }
    );

    // Wait for posts to load
    await waitFor(
      () => {
        expect(canvas.getByText(/Posts by User #1/)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests the parallel queries demo
 */
export const ParallelQueries: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to parallel queries tab
    const parallelTab = canvas.getByRole('button', { name: /Parallel/ });
    await userEvent.click(parallelTab);

    // Verify all three resource cards are present
    await waitFor(
      () => {
        expect(canvas.getByText('Users')).toBeInTheDocument();
        expect(canvas.getByText('Posts')).toBeInTheDocument();
        expect(canvas.getByText('Todos')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Wait for all to load
    await waitFor(
      () => {
        expect(canvas.getByText(/users loaded/)).toBeInTheDocument();
        expect(canvas.getByText(/posts loaded/)).toBeInTheDocument();
        expect(canvas.getByText(/todos loaded/)).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  },
};

/**
 * Tests the deduplication demo
 */
export const Deduplication: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to deduplication tab
    const dedupTab = canvas.getByRole('button', { name: /Dedup/ });
    await userEvent.click(dedupTab);

    // Wait for the demo to appear
    await waitFor(
      () => {
        expect(canvas.getByText('Request Deduplication')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Increase component count to 3
    const button3 = canvas.getByRole('button', { name: '3' });
    await userEvent.click(button3);

    // Wait for all components to show
    await waitFor(
      () => {
        expect(canvas.getByText('Component #1')).toBeInTheDocument();
        expect(canvas.getByText('Component #2')).toBeInTheDocument();
        expect(canvas.getByText('Component #3')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Verify deduplication message
    expect(canvas.getByText(/Deduplication Active/)).toBeInTheDocument();
  },
};

/**
 * Tests the polling demo
 */
export const Polling: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to polling tab
    const pollingTab = canvas.getByRole('button', { name: /Polling/ });
    await userEvent.click(pollingTab);

    // Wait for the demo to appear
    await waitFor(
      () => {
        expect(canvas.getByText('Automatic Polling')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify polling is stopped initially
    expect(canvas.getByText('Stopped')).toBeInTheDocument();

    // Start polling
    const startButton = canvas.getByRole('button', { name: 'Start Polling' });
    await userEvent.click(startButton);

    // Verify polling is now active
    await waitFor(
      () => {
        expect(canvas.getByText('Active')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Stop polling to clean up
    const stopButton = canvas.getByRole('button', { name: 'Stop Polling' });
    await userEvent.click(stopButton);
  },
};
