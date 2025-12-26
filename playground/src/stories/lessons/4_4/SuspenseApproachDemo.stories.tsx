import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import SuspenseApproachDemo from '@lessons/4_4/SuspenseApproachDemo';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof SuspenseApproachDemo> = {
  title: 'Lessons/4.4 Building useFetch Hook/SuspenseApproachDemo',
  component: SuspenseApproachDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Demonstrates React 19 use() hook with Suspense for declarative data fetching.',
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
 * Default view with live demo
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify title is present
    expect(canvas.getByText('React 19: use() + Suspense')).toBeInTheDocument();

    // Verify intro text mentions React 19
    expect(canvas.getByText(/introduces the/)).toBeInTheDocument();

    // Verify live demo section
    expect(canvas.getByText('Live Demo')).toBeInTheDocument();

    // Verify refresh button is present
    expect(canvas.getByRole('button', { name: /Refresh/ })).toBeInTheDocument();
  },
};

/**
 * Tests the refresh button exists and can be clicked
 */
export const RefreshDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the demo section exists
    expect(canvas.getByText('Live Demo')).toBeInTheDocument();

    // Click refresh button - this resets the promise cache and triggers a new fetch
    const refreshButton = canvas.getByRole('button', { name: /Refresh/ });
    expect(refreshButton).toBeInTheDocument();
    await userEvent.click(refreshButton);

    // Button should still be present after clicking
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Refresh/ })).toBeInTheDocument();
    });
  },
};

/**
 * Verifies the how it works section
 */
export const HowItWorks: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the 3 steps are present
    expect(canvas.getByText('Create Promise Outside')).toBeInTheDocument();
    expect(canvas.getByText('use() Suspends')).toBeInTheDocument();
    expect(canvas.getByText('Suspense Catches')).toBeInTheDocument();

    // Verify step descriptions
    expect(canvas.getByText(/Create the fetch promise outside/)).toBeInTheDocument();
    expect(canvas.getByText(/suspends the component/)).toBeInTheDocument();
    expect(canvas.getByText(/shows fallback UI/)).toBeInTheDocument();
  },
};

/**
 * Tests the code toggle functionality
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Code should be hidden initially
    expect(canvas.queryByText('Suspense Pattern')).not.toBeInTheDocument();

    // Click to show code
    const showCodeButton = canvas.getByText(/Show Code Example/);
    await userEvent.click(showCodeButton);

    // Code should be visible
    await waitFor(() => {
      expect(canvas.getByText('Suspense Pattern')).toBeInTheDocument();
    });

    // Click to hide code
    const hideCodeButton = canvas.getByText(/Hide Code Example/);
    await userEvent.click(hideCodeButton);

    // Code should be hidden again
    await waitFor(() => {
      expect(canvas.queryByText('Suspense Pattern')).not.toBeInTheDocument();
    });
  },
};

/**
 * Verifies the caveats section
 */
export const Caveats: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify caveats section
    expect(canvas.getByText(/Important Caveats/)).toBeInTheDocument();
    expect(canvas.getByText(/Promise must be created outside render/)).toBeInTheDocument();
    expect(canvas.getByText(/ErrorBoundary required/)).toBeInTheDocument();
    expect(canvas.getByText(/Cache management is your responsibility/)).toBeInTheDocument();
    expect(canvas.getByText(/No built-in refetch/)).toBeInTheDocument();
  },
};
