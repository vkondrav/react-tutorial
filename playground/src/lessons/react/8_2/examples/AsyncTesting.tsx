// @ts-nocheck
import { expect, waitFor, within } from 'storybook/test';

export const AsyncDataTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for loading to complete and data to appear
    await waitFor(
      () => {
        expect(canvas.getByText('Alice')).toBeInTheDocument();
      },
      { timeout: 3000 } // Max wait time
    );

    // Now we can safely interact with the loaded data
    const userList = canvas.getAllByRole('listitem');
    expect(userList).toHaveLength(2);
  },
};
