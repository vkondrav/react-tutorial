import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import LoadingStatesDemo from '@lessons/4_2/LoadingStatesDemo';

const meta: Meta<typeof LoadingStatesDemo> = {
  title: 'Lessons/4.2 Loading Error Empty States/LoadingStatesDemo',
  component: LoadingStatesDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates different loading state patterns: Spinner, Skeleton, Progress Bar, and Shimmer effects.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows the Spinner pattern selected
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify pattern selector buttons are present
    expect(canvas.getByRole('button', { name: 'Spinner' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Skeleton' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Progress' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Shimmer' })).toBeInTheDocument();

    // Spinner should be selected by default
    const spinnerButton = canvas.getByRole('button', { name: 'Spinner' });
    expect(spinnerButton).toHaveClass('btn-primary');

    // Verify info panel shows spinner info
    expect(canvas.getByText('When to use Spinner')).toBeInTheDocument();
  },
};

/**
 * Tests switching to Skeleton pattern
 */
export const SkeletonPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Skeleton button
    const skeletonButton = canvas.getByRole('button', { name: 'Skeleton' });
    await userEvent.click(skeletonButton);

    // Verify Skeleton is now selected
    await waitFor(() => {
      expect(skeletonButton).toHaveClass('btn-primary');
    });

    // Verify info panel shows skeleton info
    expect(canvas.getByText('When to use Skeleton')).toBeInTheDocument();
    expect(canvas.getByText(/Very fast loads/)).toBeInTheDocument();
  },
};

/**
 * Tests switching to Progress pattern
 */
export const ProgressPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Progress button
    const progressButton = canvas.getByRole('button', { name: 'Progress' });
    await userEvent.click(progressButton);

    // Verify Progress is now selected
    await waitFor(() => {
      expect(progressButton).toHaveClass('btn-primary');
    });

    // Verify info panel shows progress info
    expect(canvas.getByText('When to use Progress')).toBeInTheDocument();
    expect(canvas.getByText(/File uploads\/downloads/)).toBeInTheDocument();
  },
};

/**
 * Tests switching to Shimmer pattern
 */
export const ShimmerPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Shimmer button
    const shimmerButton = canvas.getByRole('button', { name: 'Shimmer' });
    await userEvent.click(shimmerButton);

    // Verify Shimmer is now selected
    await waitFor(() => {
      expect(shimmerButton).toHaveClass('btn-primary');
    });

    // Verify info panel shows shimmer info
    expect(canvas.getByText('When to use Shimmer')).toBeInTheDocument();
    expect(canvas.getByText(/Lists and cards with known structure/)).toBeInTheDocument();
  },
};

/**
 * Tests the reload button in the loading card
 */
export const ReloadCard: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Component starts in loading state (isLoading = true by default)
    // The Reload button triggers simulateLoad which completes after 1.5s
    await waitFor(() => {
      expect(canvas.getByText('Loading...')).toBeInTheDocument();
    });

    // Click reload button to start the load process
    const reloadButton = canvas.getByRole('button', { name: /Reload/ });
    await userEvent.click(reloadButton);

    // Wait for loading to complete (shows "Jane Doe" when loaded)
    await waitFor(
      () => {
        expect(canvas.getByText('Jane Doe')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Click reload button again to reload
    await userEvent.click(reloadButton);

    // Should show loading state again
    await waitFor(() => {
      expect(canvas.getByText('Loading...')).toBeInTheDocument();
    });

    // Wait for loading to complete again
    await waitFor(
      () => {
        expect(canvas.getByText('Jane Doe')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests cycling through all patterns
 */
export const CyclePatterns: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start with Spinner (default)
    expect(canvas.getByText('When to use Spinner')).toBeInTheDocument();

    // Switch to Skeleton
    await userEvent.click(canvas.getByRole('button', { name: 'Skeleton' }));
    await waitFor(() => {
      expect(canvas.getByText('When to use Skeleton')).toBeInTheDocument();
    });

    // Switch to Progress
    await userEvent.click(canvas.getByRole('button', { name: 'Progress' }));
    await waitFor(() => {
      expect(canvas.getByText('When to use Progress')).toBeInTheDocument();
    });

    // Switch to Shimmer
    await userEvent.click(canvas.getByRole('button', { name: 'Shimmer' }));
    await waitFor(() => {
      expect(canvas.getByText('When to use Shimmer')).toBeInTheDocument();
    });

    // Back to Spinner
    await userEvent.click(canvas.getByRole('button', { name: 'Spinner' }));
    await waitFor(() => {
      expect(canvas.getByText('When to use Spinner')).toBeInTheDocument();
    });
  },
};
