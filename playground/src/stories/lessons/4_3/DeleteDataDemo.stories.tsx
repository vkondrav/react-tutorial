import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { http, HttpResponse, delay } from 'msw';
import DeleteDataDemo from '@lessons/4_3/DeleteDataDemo';

const meta: Meta<typeof DeleteDataDemo> = {
  title: 'Lessons/4.3/DeleteDataDemo',
  component: DeleteDataDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates DELETE request patterns with confirmation dialogs and best practices.',
      },
    },
    msw: {
      handlers: [
        http.delete('https://jsonplaceholder.typicode.com/posts/:id', async () => {
          await delay(300);
          return HttpResponse.json({});
        }),
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with 4 items
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify items are present
    expect(canvas.getByText('Items (4)')).toBeInTheDocument();
    expect(canvas.getByText('First item')).toBeInTheDocument();
    expect(canvas.getByText('Second item')).toBeInTheDocument();
    expect(canvas.getByText('Third item')).toBeInTheDocument();
    expect(canvas.getByText('Fourth item')).toBeInTheDocument();

    // Verify best practices section
    expect(canvas.getByText('Delete Best Practices')).toBeInTheDocument();
    expect(canvas.getByText('Always confirm before deleting')).toBeInTheDocument();
  },
};

/**
 * Tests delete confirmation flow
 */
export const DeleteConfirmation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click delete button on first item
    const deleteButtons = canvasElement.querySelectorAll('button.text-error\\/70');
    await userEvent.click(deleteButtons[0]);

    // Should show confirmation dialog
    await waitFor(() => {
      expect(canvas.getByText('Delete?')).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: 'No' })).toBeInTheDocument();
    });
  },
};

/**
 * Tests canceling a delete
 */
export const CancelDelete: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click delete button on first item
    const deleteButtons = canvasElement.querySelectorAll('button.text-error\\/70');
    await userEvent.click(deleteButtons[0]);

    // Wait for confirmation
    await waitFor(() => {
      expect(canvas.getByText('Delete?')).toBeInTheDocument();
    });

    // Click No to cancel
    await userEvent.click(canvas.getByRole('button', { name: 'No' }));

    // Confirmation should be hidden
    await waitFor(() => {
      expect(canvas.queryByText('Delete?')).not.toBeInTheDocument();
    });

    // Item should still be there
    expect(canvas.getByText('First item')).toBeInTheDocument();
  },
};

/**
 * Tests confirming a delete
 */
export const ConfirmDelete: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click delete button on first item
    const deleteButtons = canvasElement.querySelectorAll('button.text-error\\/70');
    await userEvent.click(deleteButtons[0]);

    // Wait for confirmation
    await waitFor(() => {
      expect(canvas.getByText('Delete?')).toBeInTheDocument();
    });

    // Click Yes to confirm
    await userEvent.click(canvas.getByRole('button', { name: 'Yes' }));

    // Item should be removed
    await waitFor(
      () => {
        expect(canvas.queryByText('First item')).not.toBeInTheDocument();
        expect(canvas.getByText('Items (3)')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests deleting all items
 */
export const DeleteAllItems: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Delete all 4 items one by one
    for (let i = 0; i < 4; i++) {
      const deleteButtons = canvasElement.querySelectorAll('button.text-error\\/70');
      if (deleteButtons.length > 0) {
        await userEvent.click(deleteButtons[0]);

        await waitFor(() => {
          expect(canvas.getByText('Delete?')).toBeInTheDocument();
        });

        await userEvent.click(canvas.getByRole('button', { name: 'Yes' }));

        await waitFor(
          () => {
            expect(canvas.queryByText('Delete?')).not.toBeInTheDocument();
          },
          { timeout: 3000 }
        );
      }
    }

    // Should show empty state
    await waitFor(() => {
      expect(canvas.getByText('All items deleted')).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: 'Reset Demo' })).toBeInTheDocument();
    });
  },
};

/**
 * Tests the reset functionality after deleting items
 */
export const ResetAfterDelete: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Delete an item first
    const deleteButtons = canvasElement.querySelectorAll('button.text-error\\/70');
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(canvas.getByText('Delete?')).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByRole('button', { name: 'Yes' }));

    await waitFor(
      () => {
        expect(canvas.getByText('Items (3)')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Reset button should appear
    const resetButton = canvas.getByRole('button', { name: /Reset/ });
    await userEvent.click(resetButton);

    // All items should be back
    await waitFor(() => {
      expect(canvas.getByText('Items (4)')).toBeInTheDocument();
      expect(canvas.getByText('First item')).toBeInTheDocument();
    });
  },
};

/**
 * Tests the code toggle functionality
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Code should be hidden initially
    expect(canvas.queryByText('DELETE Request Pattern')).not.toBeInTheDocument();

    // Click to show code
    const showCodeButton = canvas.getByRole('button', { name: /Show Code/ });
    await userEvent.click(showCodeButton);

    // Code snippet should be visible
    await waitFor(() => {
      expect(canvas.getByText('DELETE Request Pattern')).toBeInTheDocument();
    });
  },
};
