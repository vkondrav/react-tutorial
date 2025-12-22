import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import DependencyFetchDemo from '@lessons/4_1/DependencyFetchDemo';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof DependencyFetchDemo> = {
  title: 'Lessons/4.1 Fetching Data/DependencyFetchDemo',
  component: DependencyFetchDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates how the dependency array controls when fetching happens, with a user selector and fetch log.',
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
 * Default view - fetches user 1 on mount
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for user data to load
    await waitFor(
      () => {
        expect(canvas.getByText('Leanne Graham')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify user details are shown
    expect(canvas.getByText('@Bret')).toBeInTheDocument();
    expect(canvas.getByText('hildegard.org')).toBeInTheDocument();
    expect(canvas.getByText('Gwenborough')).toBeInTheDocument();
  },
};

/**
 * Tests switching between users triggers new fetch
 */
export const SwitchUsers: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial user 1 to load
    await waitFor(
      () => {
        expect(canvas.getByText('Leanne Graham')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Click User 2 button
    const user2Button = canvas.getByRole('button', { name: 'User 2' });
    await userEvent.click(user2Button);

    // Wait for user 2 data
    await waitFor(
      () => {
        expect(canvas.getByText('Ervin Howell')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify user 2 details
    expect(canvas.getByText('@Antonette')).toBeInTheDocument();
    expect(canvas.getByText('Wisokyburgh')).toBeInTheDocument();

    // Click User 3 button
    const user3Button = canvas.getByRole('button', { name: 'User 3' });
    await userEvent.click(user3Button);

    // Wait for user 3 data
    await waitFor(
      () => {
        expect(canvas.getByText('Clementine Bauch')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests that the fetch log shows fetch activity
 */
export const FetchLog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial fetch to complete
    await waitFor(
      () => {
        expect(canvas.getByText('Leanne Graham')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Fetch log should show the fetch activity
    await waitFor(() => {
      expect(canvas.getByText(/Fetching user 1/)).toBeInTheDocument();
    });

    // Should show success message
    await waitFor(() => {
      expect(canvas.getByText(/Got user 1: Leanne Graham/)).toBeInTheDocument();
    });

    // Switch to user 2
    const user2Button = canvas.getByRole('button', { name: 'User 2' });
    await userEvent.click(user2Button);

    // Wait for user 2 and check log
    await waitFor(
      () => {
        expect(canvas.getByText(/Got user 2: Ervin Howell/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests the clear log functionality
 */
export const ClearLog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial fetch to complete
    await waitFor(
      () => {
        expect(canvas.getByText('Leanne Graham')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Log should have entries
    await waitFor(() => {
      expect(canvas.getByText(/Fetching user 1/)).toBeInTheDocument();
    });

    // Click Clear button
    const clearButton = canvas.getByRole('button', { name: 'Clear' });
    await userEvent.click(clearButton);

    // Log should be cleared
    await waitFor(() => {
      expect(canvas.getByText('No fetches yet...')).toBeInTheDocument();
    });
  },
};

/**
 * Tests the dependency array visualization
 */
export const DependencyVisualization: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial load
    await waitFor(
      () => {
        expect(canvas.getByText('Leanne Graham')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify the dependency array explanation is shown
    expect(canvas.getByText('Dependency Array:')).toBeInTheDocument();
    // Multiple elements contain 'selectedUserId', just check the section exists
    const selectedUserIdElements = canvas.getAllByText('selectedUserId');
    expect(selectedUserIdElements.length).toBeGreaterThan(0);

    // Current value should show 1
    const currentValueText = canvas.getByText(/Current value:/);
    expect(currentValueText).toBeInTheDocument();

    // Switch to user 3
    const user3Button = canvas.getByRole('button', { name: 'User 3' });
    await userEvent.click(user3Button);

    // Wait for user 3
    await waitFor(
      () => {
        expect(canvas.getByText('Clementine Bauch')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};
