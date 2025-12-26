import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import StateCompositionDemo from '@lessons/4_2/StateCompositionDemo';

const meta: Meta<typeof StateCompositionDemo> = {
  title: 'Lessons/4.2 Loading Error Empty States/StateCompositionDemo',
  component: StateCompositionDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates how to compose loading, error, and empty states in the correct order: loading → error → empty → data.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows data state after loading
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify state selector buttons are present
    expect(canvas.getByRole('button', { name: 'Loading' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Error' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Empty' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Data' })).toBeInTheDocument();

    // Data button should be selected by default
    const dataButton = canvas.getByRole('button', { name: 'Data' });
    expect(dataButton).toHaveClass('btn-primary');

    // Wait for loading to finish and users to appear
    await waitFor(
      () => {
        expect(canvas.getByText('Alice Johnson')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Verify all users are displayed
    expect(canvas.getByText('Bob Smith')).toBeInTheDocument();
    expect(canvas.getByText('Carol Williams')).toBeInTheDocument();
  },
};

/**
 * Tests the Loading state simulation
 */
export const LoadingState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Loading button to simulate loading state
    const loadingButton = canvas.getByRole('button', { name: 'Loading' });
    await userEvent.click(loadingButton);

    // Verify Loading button is selected
    await waitFor(() => {
      expect(loadingButton).toHaveClass('btn-primary');
    });

    // Wait for initial transition, then loading skeletons should remain visible
    // The loading state is simulated so skeletons persist
    await waitFor(
      () => {
        // Check for skeleton placeholders (animated elements)
        const skeletons = canvasElement.querySelectorAll('.animate-pulse');
        expect(skeletons.length).toBeGreaterThan(0);
      },
      { timeout: 2000 }
    );
  },
};

/**
 * Tests the Error state simulation
 */
export const ErrorState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Error button to simulate error state
    const errorButton = canvas.getByRole('button', { name: 'Error' });
    await userEvent.click(errorButton);

    // Verify Error button is selected
    await waitFor(() => {
      expect(errorButton).toHaveClass('btn-primary');
    });

    // Wait for error state to appear
    await waitFor(
      () => {
        expect(canvas.getByText('Failed to load users')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Retry button should be present
    expect(canvas.getByRole('button', { name: /Retry/ })).toBeInTheDocument();
  },
};

/**
 * Tests the Empty state simulation
 */
export const EmptyState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Empty button to simulate empty state
    const emptyButton = canvas.getByRole('button', { name: 'Empty' });
    await userEvent.click(emptyButton);

    // Verify Empty button is selected
    await waitFor(() => {
      expect(emptyButton).toHaveClass('btn-primary');
    });

    // Wait for empty state to appear
    await waitFor(
      () => {
        expect(canvas.getByText('No users found')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    expect(canvas.getByText('There are no users to display yet.')).toBeInTheDocument();
  },
};

/**
 * Tests the Data state
 */
export const DataState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Data button
    const dataButton = canvas.getByRole('button', { name: 'Data' });
    await userEvent.click(dataButton);

    // Verify Data button is selected
    await waitFor(() => {
      expect(dataButton).toHaveClass('btn-primary');
    });

    // Wait for users to appear
    await waitFor(
      () => {
        expect(canvas.getByText('Alice Johnson')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Verify user emails are displayed
    expect(canvas.getByText('alice@example.com')).toBeInTheDocument();
    expect(canvas.getByText('bob@example.com')).toBeInTheDocument();
  },
};

/**
 * Tests error recovery with Retry button
 */
export const ErrorRecovery: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // First trigger error state
    const errorButton = canvas.getByRole('button', { name: 'Error' });
    await userEvent.click(errorButton);

    // Wait for error to appear
    await waitFor(
      () => {
        expect(canvas.getByText('Failed to load users')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Click Retry button
    const retryButton = canvas.getByRole('button', { name: /Retry/ });
    await userEvent.click(retryButton);

    // Should recover to data state and show users
    await waitFor(
      () => {
        expect(canvas.getByText('Alice Johnson')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  },
};

/**
 * Verifies the state flow diagram is present
 */
export const StateFlowDiagram: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify state flow section
    expect(canvas.getByText('State Flow')).toBeInTheDocument();

    // Verify badges in state flow (use getAllByText since "Loading" appears multiple times)
    const loadingElements = canvas.getAllByText('Loading');
    expect(loadingElements.length).toBeGreaterThan(0);
    expect(canvas.getByText('Error?')).toBeInTheDocument();
    expect(canvas.getByText('Empty?')).toBeInTheDocument();
    // "Data" also appears in the button, so use getAllByText
    const dataElements = canvas.getAllByText('Data');
    expect(dataElements.length).toBeGreaterThan(0);

    // Verify explanation text
    expect(
      canvas.getByText(/Each state check is a "gate" — only one state renders at a time/)
    ).toBeInTheDocument();
  },
};

/**
 * Verifies the composition pattern explanation
 */
export const CompositionPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify composition pattern section
    expect(canvas.getByText('The Composition Pattern')).toBeInTheDocument();

    // Verify the order explanation
    expect(canvas.getByText('Why this order?')).toBeInTheDocument();
    expect(canvas.getByText(/Loading first/)).toBeInTheDocument();
    expect(canvas.getByText(/Error second/)).toBeInTheDocument();
    expect(canvas.getByText(/Empty third/)).toBeInTheDocument();
    expect(canvas.getByText(/Data last/)).toBeInTheDocument();
  },
};

/**
 * Verifies the advanced custom hook pattern section
 */
export const CustomHookPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify custom hook section
    expect(canvas.getByText('Advanced: Custom Hook Pattern')).toBeInTheDocument();
  },
};
