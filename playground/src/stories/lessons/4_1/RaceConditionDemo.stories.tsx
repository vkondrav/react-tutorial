import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import RaceConditionDemo from '@lessons/4_1/RaceConditionDemo';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof RaceConditionDemo> = {
  title: 'Lessons/4.1/RaceConditionDemo',
  component: RaceConditionDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates race conditions in data fetching and how to fix them with AbortController.',
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
 * Default view showing the Problem tab first
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the Problem tab by default
    expect(canvas.getByText('Race Condition Bug')).toBeInTheDocument();

    // Wait for post 1 to load
    await waitFor(
      () => {
        expect(canvas.getByText(/Post #1/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify post content is displayed
    expect(canvas.getByText(/interesting article/i)).toBeInTheDocument();
  },
};

/**
 * Tests switching between Problem and Solution tabs
 */
export const SwitchTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial load in Problem tab
    await waitFor(
      () => {
        expect(canvas.getByText(/Post #1/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Should show Problem tab content
    expect(canvas.getByText('Race Condition Bug')).toBeInTheDocument();

    // Click Solution tab
    const solutionTab = canvas.getByRole('button', { name: /The Solution/ });
    await userEvent.click(solutionTab);

    // Should show Solution tab content
    await waitFor(() => {
      expect(canvas.getByText('Fixed with AbortController')).toBeInTheDocument();
    });

    // Wait for post to load in solution tab
    await waitFor(
      () => {
        expect(canvas.getByText(/Post #1/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Click back to Problem tab
    const problemTab = canvas.getByRole('button', { name: /The Problem/ });
    await userEvent.click(problemTab);

    // Should show Problem tab content again
    await waitFor(() => {
      expect(canvas.getByText('Race Condition Bug')).toBeInTheDocument();
    });
  },
};

/**
 * Tests clicking different posts in the Problem tab
 */
export const ProblemTabPostSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial post to load
    await waitFor(
      () => {
        expect(canvas.getByText(/Post #1/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Click Post 2
    const post2Button = canvas.getByRole('button', { name: 'Post 2' });
    await userEvent.click(post2Button);

    // Wait for post 2 to load
    await waitFor(
      () => {
        expect(canvas.getByText(/Post #2/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Click Post 3
    const post3Button = canvas.getByRole('button', { name: 'Post 3' });
    await userEvent.click(post3Button);

    // Wait for post 3 to load
    await waitFor(
      () => {
        expect(canvas.getByText(/Post #3/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests the Solution tab with AbortController
 */
export const SolutionTabPostSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Solution tab first
    const solutionTab = canvas.getByRole('button', { name: /The Solution/ });
    await userEvent.click(solutionTab);

    // Wait for initial post to load
    await waitFor(
      () => {
        expect(canvas.getByText(/Post #1/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Should show success indicator
    await waitFor(() => {
      expect(canvas.getByText('✓ Data matches selection!')).toBeInTheDocument();
    });

    // Click Post 4
    const post4Button = canvas.getByRole('button', { name: 'Post 4' });
    await userEvent.click(post4Button);

    // Wait for post 4 to load
    await waitFor(
      () => {
        expect(canvas.getByText(/Post #4/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Should still show success indicator
    await waitFor(() => {
      expect(canvas.getByText('✓ Data matches selection!')).toBeInTheDocument();
    });
  },
};

/**
 * Tests the event log in Solution tab
 */
export const SolutionEventLog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Solution tab
    const solutionTab = canvas.getByRole('button', { name: /The Solution/ });
    await userEvent.click(solutionTab);

    // Wait for initial fetch
    await waitFor(
      () => {
        expect(canvas.getByText(/Post #1/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Event log should show fetch activity
    await waitFor(() => {
      expect(canvas.getByText(/Fetching post 1/)).toBeInTheDocument();
    });

    // Click Post 2
    const post2Button = canvas.getByRole('button', { name: 'Post 2' });
    await userEvent.click(post2Button);

    // Wait and check log shows abort of old request and new fetch
    await waitFor(
      () => {
        expect(canvas.getByText(/Set post 2/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests clear log button in Solution tab
 */
export const SolutionClearLog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Solution tab
    const solutionTab = canvas.getByRole('button', { name: /The Solution/ });
    await userEvent.click(solutionTab);

    // Wait for fetch activity
    await waitFor(
      () => {
        expect(canvas.getByText(/Post #1/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Log should have entries
    await waitFor(() => {
      expect(canvas.getByText(/Fetching post 1/)).toBeInTheDocument();
    });

    // Click Clear button
    const clearButton = canvas.getByRole('button', { name: 'Clear' });
    await userEvent.click(clearButton);

    // Log should be cleared
    await waitFor(() => {
      expect(canvas.getByText('Click to see events...')).toBeInTheDocument();
    });
  },
};

/**
 * Tests the rapid click button functionality
 */
export const RapidClickProblem: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for initial load
    await waitFor(
      () => {
        expect(canvas.getByText(/Post #1/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Click the rapid click button
    const rapidClickButton = canvas.getByRole('button', { name: /Rapid Click/ });
    await userEvent.click(rapidClickButton);

    // Wait a bit and check that responses are being logged
    await waitFor(
      () => {
        // Response order should show some entries
        const logEntries = canvas.queryAllByText(/Post \d arrived/);
        expect(logEntries.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  },
};
