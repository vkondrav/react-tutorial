import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import RenderPropsPlayground from '@lessons/react/6_2/RenderPropsPlayground';

const meta: Meta<typeof RenderPropsPlayground> = {
  title: 'Lessons/react-6.2/RenderPropsPlayground',
  component: RenderPropsPlayground,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Interactive playground combining multiple render props: nested theme + counter, mouse-reactive card, live search, and stopwatch timer.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows all four demos
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show all demo sections
    expect(canvas.getByText('Demo 1: Nested Render Props')).toBeInTheDocument();
    expect(canvas.getByText('Demo 2: Mouse-Reactive Card')).toBeInTheDocument();
    expect(canvas.getByText('Demo 3: Live Search Filter')).toBeInTheDocument();
    expect(canvas.getByText('Demo 4: Stopwatch Timer')).toBeInTheDocument();

    // Should show the hooks vs render props note
    expect(canvas.getByText('Render Props vs Custom Hooks')).toBeInTheDocument();
  },
};

/**
 * Test the nested render props demo - theme toggle + counter
 */
export const NestedRenderPropsDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Should show the theme-aware counter
    expect(canvas.getByText('Theme-Aware Counter')).toBeInTheDocument();

    // Should show initial count of 0
    expect(canvas.getByText('0')).toBeInTheDocument();

    // Click the + button to increment
    const plusButton = canvasElement.querySelector(
      '.rounded-full.bg-blue-600, .rounded-full.bg-blue-500'
    );
    expect(plusButton).toBeInTheDocument();
    await user.click(plusButton!);
    await user.click(plusButton!);

    // Counter should show 2
    await waitFor(() => {
      expect(canvas.getByText('2')).toBeInTheDocument();
    });

    // Toggle theme
    const themeButton = canvas.getByRole('button', { name: /Light|Dark/i });
    const wasLight = themeButton.textContent?.includes('Light');
    await user.click(themeButton);

    // Theme should have toggled
    await waitFor(() => {
      if (wasLight) {
        expect(canvas.getByRole('button', { name: /Dark/i })).toBeInTheDocument();
      } else {
        expect(canvas.getByRole('button', { name: /Light/i })).toBeInTheDocument();
      }
    });
  },
};

/**
 * Test the mouse-reactive card shows spotlight effect description
 */
export const MouseReactiveCard: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the mouse-reactive card
    expect(canvas.getByText('Move your mouse')).toBeInTheDocument();
    expect(canvas.getByText('Spotlight follows cursor')).toBeInTheDocument();
  },
};

/**
 * Test the live search filter
 */
export const LiveSearchFilter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Should show the search input
    const searchInput = canvas.getByPlaceholderText('Search frameworks...');
    expect(searchInput).toBeInTheDocument();

    // Should show all frameworks initially
    expect(canvas.getByText('React')).toBeInTheDocument();
    expect(canvas.getByText('Vue')).toBeInTheDocument();
    expect(canvas.getByText('Angular')).toBeInTheDocument();
    expect(canvas.getByText('8 of 8 shown')).toBeInTheDocument();

    // Type in search
    await user.type(searchInput, 'react');

    // Should filter to only React and Preact
    await waitFor(() => {
      expect(canvas.getByText('React')).toBeInTheDocument();
      expect(canvas.getByText('Preact')).toBeInTheDocument();
      expect(canvas.getByText('2 of 8 shown')).toBeInTheDocument();
    });

    // Clear and search for something with no results
    await user.clear(searchInput);
    await user.type(searchInput, 'xyz');

    // Should show no matches
    await waitFor(() => {
      expect(canvas.getByText('No matches found')).toBeInTheDocument();
      expect(canvas.getByText('0 of 8 shown')).toBeInTheDocument();
    });
  },
};

/**
 * Test the stopwatch timer
 */
export const StopwatchTimer: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Should show initial state
    expect(canvas.getByText('00:00')).toBeInTheDocument();
    expect(canvas.getByText('⏸️ Paused')).toBeInTheDocument();

    // Start button should be visible
    const startButton = canvas.getByRole('button', { name: 'Start' });
    expect(startButton).toBeInTheDocument();

    // Click start
    await user.click(startButton);

    // Should show running state
    await waitFor(() => {
      expect(canvas.getByText('⏱️ Running')).toBeInTheDocument();
    });

    // Pause button should now be visible
    const pauseButton = canvas.getByRole('button', { name: 'Pause' });
    expect(pauseButton).toBeInTheDocument();

    // Click pause
    await user.click(pauseButton);

    // Should show paused state
    await waitFor(() => {
      expect(canvas.getByText('⏸️ Paused')).toBeInTheDocument();
    });

    // After pausing a running timer, Start button shows "Resume" or "Start" depending on whether timer > 0
    // The button should exist and be clickable
    const resumeOrStart = canvas.getByRole('button', { name: /Resume|Start/i });
    expect(resumeOrStart).toBeInTheDocument();
  },
};

/**
 * Test stopwatch reset functionality
 */
export const StopwatchReset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find the stopwatch section
    const stopwatchSection = canvasElement.querySelector('.bg-base-300.rounded-xl.p-6');
    expect(stopwatchSection).toBeInTheDocument();

    // Start the timer
    const startButton = canvas.getByRole('button', { name: 'Start' });
    await user.click(startButton);

    // Wait a moment for timer to tick
    await new Promise((resolve) => setTimeout(resolve, 1100));

    // Pause
    const pauseButton = canvas.getByRole('button', { name: 'Pause' });
    await user.click(pauseButton);

    // Timer should be > 0
    await waitFor(() => {
      const timerText = canvasElement.querySelector('.text-5xl.font-mono');
      expect(timerText?.textContent).not.toBe('00:00');
    });

    // Click the Reset button inside the stopwatch section (second Reset button on page)
    const resetButtons = canvas.getAllByRole('button', { name: 'Reset' });
    // The stopwatch reset is the second one (index 1) - it's inside .btn.btn-ghost
    const stopwatchReset = resetButtons.find((btn) => btn.className.includes('btn-ghost'));
    expect(stopwatchReset).toBeInTheDocument();
    await user.click(stopwatchReset!);

    // Timer should be back to 00:00
    await waitFor(() => {
      expect(canvas.getByText('00:00')).toBeInTheDocument();
    });
  },
};

/**
 * Verify the hooks vs render props comparison note
 */
export const HooksVsRenderPropsNote: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the comparison note
    expect(canvas.getByText('Render Props vs Custom Hooks')).toBeInTheDocument();
    expect(canvas.getByText(/custom hooks/)).toBeInTheDocument();

    // Should list when render props are still useful
    expect(canvas.getByText(/control exactly where\/when rendering happens/)).toBeInTheDocument();
    expect(canvas.getByText(/building library components/)).toBeInTheDocument();
    expect(canvas.getByText(/logic to be opt-in per-render/)).toBeInTheDocument();
  },
};
