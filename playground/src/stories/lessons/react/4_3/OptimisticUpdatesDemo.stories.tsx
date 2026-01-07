import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import OptimisticUpdatesDemo from '@lessons/react/4_3/OptimisticUpdatesDemo';

const meta: Meta<typeof OptimisticUpdatesDemo> = {
  title: 'Lessons/react-4.3/OptimisticUpdatesDemo',
  component: OptimisticUpdatesDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the difference between optimistic and pessimistic updates with side-by-side comparison.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with both update types
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify controls are present
    expect(canvas.getByText('Simulate Error')).toBeInTheDocument();
    expect(canvas.getByText('Delay:')).toBeInTheDocument();

    // Verify both panels are present
    expect(canvas.getByText('Pessimistic Update')).toBeInTheDocument();
    expect(canvas.getByText('Optimistic Update')).toBeInTheDocument();

    // Verify both have Like buttons
    const likeButtons = canvas.getAllByRole('button', { name: /Like/ });
    expect(likeButtons.length).toBe(2);

    // Verify "When to Use Each" section
    expect(canvas.getByText('When to Use Each')).toBeInTheDocument();
    expect(canvas.getByText('Use Pessimistic When:')).toBeInTheDocument();
    expect(canvas.getByText('Use Optimistic When:')).toBeInTheDocument();
  },
};

/**
 * Tests pessimistic update (waits for server)
 */
export const PessimisticLike: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Set delay to minimum for faster test
    const delaySelect = canvas.getByRole('combobox');
    await userEvent.selectOptions(delaySelect, '500');

    // Find the pessimistic Like button (first one)
    const likeButtons = canvas.getAllByRole('button', { name: /Like/ });
    const pessimisticButton = likeButtons[0];

    // Click like
    await userEvent.click(pessimisticButton);

    // Should show "Saving..." text
    await waitFor(() => {
      expect(canvas.getByText('Saving...')).toBeInTheDocument();
    });

    // Wait for it to complete - should show "Liked"
    await waitFor(
      () => {
        expect(canvas.getByText('Liked')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests optimistic update (instant UI update)
 */
export const OptimisticLike: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Set delay to slower so we can see the async nature
    const delaySelect = canvas.getByRole('combobox');
    await userEvent.selectOptions(delaySelect, '500');

    // Find the optimistic Like button (second one)
    const likeButtons = canvas.getAllByRole('button', { name: /Like/ });
    const optimisticButton = likeButtons[1];

    // Click like
    await userEvent.click(optimisticButton);

    // Should immediately show "Liked" (optimistic update)
    // The button text changes instantly
    await waitFor(() => {
      const likedButtons = canvas.getAllByRole('button', { name: /Liked/ });
      expect(likedButtons.length).toBeGreaterThan(0);
    });
  },
};

/**
 * Tests optimistic update rollback on error
 */
export const OptimisticRollback: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Enable error simulation
    const simulateErrorCheckbox = canvas.getByLabelText('Simulate Error');
    await userEvent.click(simulateErrorCheckbox);

    // Set delay to minimum
    const delaySelect = canvas.getByRole('combobox');
    await userEvent.selectOptions(delaySelect, '500');

    // Find the optimistic Like button
    const likeButtons = canvas.getAllByRole('button', { name: /Like/ });
    const optimisticButton = likeButtons[1];

    // Click like
    await userEvent.click(optimisticButton);

    // Should show "Liked" immediately
    await waitFor(() => {
      const likedButtons = canvas.getAllByRole('button', { name: /Liked/ });
      expect(likedButtons.length).toBeGreaterThan(0);
    });

    // After error, should rollback and show error message
    await waitFor(
      () => {
        expect(canvas.getByText('Failed! Rolled back.')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Button should be back to "Like"
    await waitFor(
      () => {
        const likeButtonsAfter = canvas.getAllByRole('button', { name: /Like/ });
        expect(likeButtonsAfter.length).toBe(2);
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests changing the network delay
 */
export const ChangeDelay: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const delaySelect = canvas.getByRole('combobox');

    // Change to 500ms
    await userEvent.selectOptions(delaySelect, '500');
    expect(delaySelect).toHaveValue('500');

    // Change to 3s
    await userEvent.selectOptions(delaySelect, '3000');
    expect(delaySelect).toHaveValue('3000');

    // Change back to 1.5s
    await userEvent.selectOptions(delaySelect, '1500');
    expect(delaySelect).toHaveValue('1500');
  },
};

/**
 * Tests the reset button
 */
export const Reset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Set delay to minimum
    const delaySelect = canvas.getByRole('combobox');
    await userEvent.selectOptions(delaySelect, '500');

    // Like both posts
    const likeButtons = canvas.getAllByRole('button', { name: /Like/ });
    await userEvent.click(likeButtons[0]);
    await userEvent.click(likeButtons[1]);

    // Wait for pessimistic to complete
    await waitFor(
      () => {
        const likedButtons = canvas.getAllByRole('button', { name: /Liked/ });
        expect(likedButtons.length).toBe(2);
      },
      { timeout: 3000 }
    );

    // Click reset
    const resetButton = canvas.getByRole('button', { name: /Reset/ });
    await userEvent.click(resetButton);

    // Both should be back to "Like"
    await waitFor(() => {
      const likeButtonsAfter = canvas.getAllByRole('button', { name: /Like/ });
      expect(likeButtonsAfter.length).toBe(2);
    });
  },
};

/**
 * Verifies code comparison section
 */
export const CodeComparison: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify code sections are present
    expect(canvas.getByText('Pessimistic Code')).toBeInTheDocument();
    expect(canvas.getByText('Optimistic Code')).toBeInTheDocument();
  },
};
