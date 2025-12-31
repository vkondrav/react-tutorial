import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import SignsYouNeedLibraryDemo from '@lessons/7_4/SignsYouNeedLibraryDemo';

const meta: Meta<typeof SignsYouNeedLibraryDemo> = {
  title: 'Lessons/7.4/SignsYouNeedLibraryDemo',
  component: SignsYouNeedLibraryDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Identifies pain points that indicate when you might need an external state library, with severity ratings.',
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
 * Default view shows pain points list
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show pain points
    expect(canvas.getByText('Extreme Prop Drilling')).toBeInTheDocument();
    expect(canvas.getByText('Context Provider Hell')).toBeInTheDocument();
    expect(canvas.getByText('Performance Issues from Context')).toBeInTheDocument();
    expect(canvas.getByText('Server State Complexity')).toBeInTheDocument();
    expect(canvas.getByText('Need for Time-Travel Debugging')).toBeInTheDocument();
    expect(canvas.getByText('Large Team Coordination')).toBeInTheDocument();
  },
};

/**
 * Severity badges are shown correctly
 */
export const SeverityBadges: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show different severity levels
    expect(canvas.getAllByText('Try built-in first').length).toBeGreaterThan(0);
    expect(canvas.getAllByText('Consider library').length).toBeGreaterThan(0);
    expect(canvas.getAllByText('Library recommended').length).toBeGreaterThan(0);
  },
};

/**
 * Expand a pain point to see details
 */
export const ExpandPainPoint: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click on "Extreme Prop Drilling"
    await user.click(canvas.getByText('Extreme Prop Drilling'));

    // Should show warning signs
    await waitFor(() => {
      expect(canvas.getByText('Warning Signs:')).toBeInTheDocument();
    });

    // Should show symptoms
    expect(canvas.getByText(/Every component in the tree receives props/)).toBeInTheDocument();

    // Should show built-in solution
    expect(canvas.getByText('Built-in Solution')).toBeInTheDocument();
    expect(canvas.getByText(/useContext solves this/)).toBeInTheDocument();

    // Should show library benefit
    expect(canvas.getByText('Library Benefit')).toBeInTheDocument();
  },
};

/**
 * Expand pain point with no built-in solution
 */
export const ExpandNoBuiltInSolution: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click on "Context Provider Hell"
    await user.click(canvas.getByText('Context Provider Hell'));

    // Should show warning signs
    await waitFor(() => {
      expect(canvas.getByText('Warning Signs:')).toBeInTheDocument();
    });

    // Should show no built-in solution message
    expect(canvas.getByText(/No built-in solution covers this well/)).toBeInTheDocument();

    // Should show library benefit
    expect(canvas.getByText(/Single store replaces multiple contexts/)).toBeInTheDocument();
  },
};

/**
 * Expand server state complexity
 */
export const ExpandServerState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click on "Server State Complexity"
    await user.click(canvas.getByText('Server State Complexity'));

    // Should show TanStack Query benefit
    await waitFor(() => {
      expect(canvas.getByText(/TanStack Query handles all of this/)).toBeInTheDocument();
    });

    // Should show symptoms
    expect(
      canvas.getByText(/Writing useEffect \+ useState for every API call/)
    ).toBeInTheDocument();
  },
};

/**
 * Toggle pain point closed
 */
export const TogglePainPointClose: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Open Extreme Prop Drilling
    await user.click(canvas.getByText('Extreme Prop Drilling'));

    await waitFor(() => {
      expect(canvas.getByText('Warning Signs:')).toBeInTheDocument();
    });

    // Click again to close
    await user.click(canvas.getByText('Extreme Prop Drilling'));

    // Warning Signs should be hidden
    await waitFor(() => {
      expect(canvas.queryByText('Warning Signs:')).not.toBeInTheDocument();
    });
  },
};

/**
 * Bottom line summary is shown
 */
export const BottomLineSummary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the bottom line section
    expect(canvas.getByText('The Bottom Line')).toBeInTheDocument();

    // Should show severity explanations
    expect(canvas.getByText('Green: Built-in works')).toBeInTheDocument();
    expect(canvas.getByText('Yellow: Evaluate')).toBeInTheDocument();
    expect(canvas.getByText('Red: Library helps')).toBeInTheDocument();
  },
};
