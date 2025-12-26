import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { http, HttpResponse, delay } from 'msw';
import UpdateDataDemo from '@lessons/4_3/UpdateDataDemo';

const meta: Meta<typeof UpdateDataDemo> = {
  title: 'Lessons/4.3 Creating Updating Data/UpdateDataDemo',
  component: UpdateDataDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates PUT and PATCH request patterns for updating data with inline editing.',
      },
    },
    msw: {
      handlers: [
        http.put('https://jsonplaceholder.typicode.com/posts/:id', async ({ request }) => {
          await delay(300);
          const body = await request.json();
          return HttpResponse.json(body);
        }),
        http.patch('https://jsonplaceholder.typicode.com/posts/:id', async ({ request }) => {
          await delay(300);
          const body = await request.json();
          return HttpResponse.json({ id: 1, ...(body as Record<string, unknown>) });
        }),
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with PATCH selected
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify method selector is present
    expect(canvas.getByText('HTTP Method:')).toBeInTheDocument();

    // PATCH should be selected by default
    const patchButton = canvas.getByRole('button', { name: 'PATCH' });
    expect(patchButton).toHaveClass('btn-primary');

    // Verify post card is present
    expect(canvas.getByText('Post #1')).toBeInTheDocument();
    expect(canvas.getByText('Original Title')).toBeInTheDocument();
    expect(canvas.getByText('This is the original post body content.')).toBeInTheDocument();

    // Verify PUT vs PATCH comparison section
    expect(canvas.getByText(/Replaces the entire resource/)).toBeInTheDocument();
    expect(canvas.getByText(/Partial update only/)).toBeInTheDocument();
  },
};

/**
 * Tests switching between PATCH and PUT methods
 */
export const SwitchMethod: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // PATCH should be selected initially
    const patchButton = canvas.getByRole('button', { name: 'PATCH' });
    const putButton = canvas.getByRole('button', { name: 'PUT' });

    expect(patchButton).toHaveClass('btn-primary');
    expect(putButton).not.toHaveClass('btn-primary');

    // Click PUT
    await userEvent.click(putButton);

    // PUT should now be selected
    await waitFor(() => {
      expect(putButton).toHaveClass('btn-primary');
      expect(patchButton).not.toHaveClass('btn-primary');
    });

    // Switch back to PATCH
    await userEvent.click(patchButton);

    await waitFor(() => {
      expect(patchButton).toHaveClass('btn-primary');
    });
  },
};

/**
 * Tests editing the title field
 */
export const EditTitle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on the title to start editing
    const titleField = canvas.getByText('Original Title');
    await userEvent.click(titleField);

    // Should show input field
    await waitFor(() => {
      const input = canvas.getByDisplayValue('Original Title');
      expect(input).toBeInTheDocument();
    });

    // Clear and type new title
    const input = canvas.getByDisplayValue('Original Title');
    await userEvent.clear(input);
    await userEvent.type(input, 'Updated Title');

    // Click save button (checkmark)
    const saveButtons = canvasElement.querySelectorAll('button.btn-primary.btn-square');
    await userEvent.click(saveButtons[0]);

    // Should show server response and updated title
    await waitFor(
      () => {
        expect(canvas.getByText('Updated Title')).toBeInTheDocument();
        expect(canvas.getByText(/Server Response/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests canceling an edit
 */
export const CancelEdit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on the title to start editing
    const titleField = canvas.getByText('Original Title');
    await userEvent.click(titleField);

    // Should show input field
    await waitFor(() => {
      expect(canvas.getByDisplayValue('Original Title')).toBeInTheDocument();
    });

    // Type something different
    const input = canvas.getByDisplayValue('Original Title');
    await userEvent.clear(input);
    await userEvent.type(input, 'Changed Title');

    // Click cancel button (X)
    const cancelButtons = canvasElement.querySelectorAll('button.btn-ghost.btn-square');
    await userEvent.click(cancelButtons[0]);

    // Should revert to original title
    await waitFor(() => {
      expect(canvas.getByText('Original Title')).toBeInTheDocument();
      expect(canvas.queryByDisplayValue('Changed Title')).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests the reset button
 */
export const ResetDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // First edit the title
    await userEvent.click(canvas.getByText('Original Title'));

    await waitFor(() => {
      expect(canvas.getByDisplayValue('Original Title')).toBeInTheDocument();
    });

    const input = canvas.getByDisplayValue('Original Title');
    await userEvent.clear(input);
    await userEvent.type(input, 'Modified Title');

    // Save the edit
    const saveButtons = canvasElement.querySelectorAll('button.btn-primary.btn-square');
    await userEvent.click(saveButtons[0]);

    await waitFor(
      () => {
        expect(canvas.getByText('Modified Title')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Click reset
    const resetButton = canvas.getByRole('button', { name: 'Reset' });
    await userEvent.click(resetButton);

    // Should show original content again
    await waitFor(() => {
      expect(canvas.getByText('Original Title')).toBeInTheDocument();
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
    expect(canvas.queryByText('PATCH Request Pattern')).not.toBeInTheDocument();

    // Click to show code
    const showCodeButton = canvas.getByRole('button', { name: /Show Code/ });
    await userEvent.click(showCodeButton);

    // Code snippet should be visible (PATCH is default)
    await waitFor(() => {
      expect(canvas.getByText('PATCH Request Pattern')).toBeInTheDocument();
    });

    // Switch to PUT and check code changes
    await userEvent.click(canvas.getByRole('button', { name: 'PUT' }));

    await waitFor(() => {
      expect(canvas.getByText('PUT Request Pattern')).toBeInTheDocument();
    });
  },
};
