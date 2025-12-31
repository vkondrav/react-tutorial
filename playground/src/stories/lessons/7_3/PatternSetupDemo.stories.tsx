import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import PatternSetupDemo from '@lessons/7_3/PatternSetupDemo';

const meta: Meta<typeof PatternSetupDemo> = {
  title: 'Lessons/7.3/PatternSetupDemo',
  component: PatternSetupDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Step-by-step guide for setting up the Context + Reducer pattern with separate contexts, custom hooks, and live example.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows 6-step guide
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the guide header
    expect(canvas.getByText('6-Step Setup Guide')).toBeInTheDocument();

    // Should show step buttons
    expect(canvas.getByRole('button', { name: 'Step 1' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Step 6' })).toBeInTheDocument();

    // Step 1 should be active by default
    expect(canvas.getByText('Define Types')).toBeInTheDocument();
  },
};

/**
 * Navigate through setup steps
 */
export const NavigateSteps: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Step 2
    await user.click(canvas.getByRole('button', { name: 'Step 2' }));

    await waitFor(() => {
      expect(canvas.getByText('Create Contexts')).toBeInTheDocument();
      expect(canvas.getByText(/SEPARATE contexts for state and dispatch/)).toBeInTheDocument();
    });

    // Click Step 4
    await user.click(canvas.getByRole('button', { name: 'Step 4' }));

    await waitFor(() => {
      expect(canvas.getByText('Create Provider')).toBeInTheDocument();
    });

    // Click Step 6
    await user.click(canvas.getByRole('button', { name: 'Step 6' }));

    await waitFor(() => {
      expect(canvas.getByText('Use in Components')).toBeInTheDocument();
      expect(canvas.getByText(/Components use the custom hooks/)).toBeInTheDocument();
    });
  },
};

/**
 * Separate contexts explanation can be expanded
 */
export const SeparateContextsExplanation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click to expand
    await user.click(canvas.getByText('Why Separate State and Dispatch Contexts?'));

    // Should show explanation
    await waitFor(() => {
      expect(canvas.getByText('Single Context (Bad)')).toBeInTheDocument();
      expect(canvas.getByText('Separate Contexts (Good)')).toBeInTheDocument();
    });

    // Should show benefits
    expect(canvas.getByText(/dispatch has stable reference/)).toBeInTheDocument();
    expect(canvas.getByText(/Components using only dispatch don't re-render/)).toBeInTheDocument();
  },
};

/**
 * Live example works
 */
export const LiveExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the live example
    expect(canvas.getByText('Live Example')).toBeInTheDocument();

    // Should show theme toggle
    const themeButtons = canvas.getAllByRole('button', { name: /Theme:/i });
    expect(themeButtons.length).toBeGreaterThan(0);
  },
};

/**
 * Live example counter interaction
 */
export const LiveExampleCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find the Live Example section
    const liveSection = canvas.getByText('Live Example').closest('.card')!;
    const withinLive = within(liveSection as HTMLElement);

    // Initial count should be 0
    expect(withinLive.getByText('0')).toBeInTheDocument();

    // Click increment
    const buttons = withinLive.getAllByRole('button');
    const incrementBtn = buttons.find((btn) => btn.textContent === '+');
    if (incrementBtn) {
      await user.click(incrementBtn);
      await user.click(incrementBtn);
    }

    // Count should be 2
    await waitFor(() => {
      expect(withinLive.getByText('2')).toBeInTheDocument();
    });
  },
};

/**
 * Live example theme toggle
 */
export const LiveExampleTheme: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find theme toggle button
    const themeBtn = canvas.getByRole('button', { name: /Theme: dark/i });
    expect(themeBtn).toBeInTheDocument();

    // Click to toggle
    await user.click(themeBtn);

    // Should show light theme now
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Theme: light/i })).toBeInTheDocument();
    });
  },
};

/**
 * Pro tip is shown
 */
export const ProTip: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the tip
    expect(canvas.getByText('Pro tip:')).toBeInTheDocument();
    expect(canvas.getByText(/AppContext\.tsx/)).toBeInTheDocument();
  },
};

/**
 * Full code toggle works
 */
export const CodeToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Show Full Code
    await user.click(canvas.getByRole('button', { name: 'Show Full Code' }));

    // Should show code snippet
    await waitFor(() => {
      expect(canvas.getByText('Complete Context + Reducer Setup')).toBeInTheDocument();
    });
  },
};
