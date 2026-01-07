import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import LiftingGuidelinesDemo from '@lessons/react/7_1/LiftingGuidelinesDemo';

const meta: Meta<typeof LiftingGuidelinesDemo> = {
  title: 'Lessons/react-7.1/LiftingGuidelinesDemo',
  component: LiftingGuidelinesDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Provides guidelines on when to lift state, with a decision tree, comparison table, and common anti-patterns.',
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
 * Default view shows the decision tree and guidelines
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show decision tree
    expect(canvas.getByText('Should I Lift This State?')).toBeInTheDocument();
    expect(
      canvas.getByText('Do multiple components need to share this state?')
    ).toBeInTheDocument();

    // Should show comparison table
    expect(canvas.getByText('Common Scenarios')).toBeInTheDocument();

    // Should show anti-patterns section
    expect(canvas.getByText('Common Mistakes to Avoid')).toBeInTheDocument();
  },
};

/**
 * Decision tree - answer No
 */
export const DecisionTreeNo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click No
    await user.click(canvas.getByRole('button', { name: /No/i }));

    // Should show recommendation
    await waitFor(() => {
      expect(canvas.getByText('Recommendation')).toBeInTheDocument();
      expect(canvas.getByText(/Keep state local/)).toBeInTheDocument();
    });

    // Should be able to start over
    await user.click(canvas.getByRole('button', { name: /Start Over/i }));

    // Should be back to first question
    await waitFor(() => {
      expect(
        canvas.getByText('Do multiple components need to share this state?')
      ).toBeInTheDocument();
    });
  },
};

/**
 * Decision tree - answer Yes, Yes
 */
export const DecisionTreeYesYes: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Yes
    await user.click(canvas.getByRole('button', { name: /^Yes$/i }));

    // Should show next question
    await waitFor(() => {
      expect(canvas.getByText('Are these components siblings (same parent)?')).toBeInTheDocument();
    });

    // Click Yes again
    await user.click(canvas.getByRole('button', { name: /^Yes$/i }));

    // Should show recommendation
    await waitFor(() => {
      expect(canvas.getByText('Recommendation')).toBeInTheDocument();
      expect(canvas.getByText(/Lift state to the parent component/)).toBeInTheDocument();
    });
  },
};

/**
 * Decision tree - Yes, No, Yes leads to Context
 */
export const DecisionTreeDeepNesting: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Yes - multiple components share
    await user.click(canvas.getByRole('button', { name: /^Yes$/i }));

    await waitFor(() => {
      expect(canvas.getByText('Are these components siblings (same parent)?')).toBeInTheDocument();
    });

    // No - not siblings
    await user.click(canvas.getByRole('button', { name: /^No$/i }));

    await waitFor(() => {
      expect(canvas.getByText('Are they deeply nested (3+ levels)?')).toBeInTheDocument();
    });

    // Yes - deeply nested
    await user.click(canvas.getByRole('button', { name: /^Yes$/i }));

    // Should recommend Context
    await waitFor(() => {
      expect(canvas.getByText(/Consider Context or state management library/)).toBeInTheDocument();
    });
  },
};

/**
 * Comparison table displays scenarios
 */
export const ComparisonTable: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show table headers
    expect(canvas.getByText('Scenario')).toBeInTheDocument();
    // "Solution" appears multiple times, use getByRole for table header
    expect(canvas.getByRole('columnheader', { name: 'Solution' })).toBeInTheDocument();
    expect(canvas.getByText('Why?')).toBeInTheDocument();

    // Should show various scenarios
    expect(canvas.getByText(/Form input validation/)).toBeInTheDocument();
    expect(canvas.getByText(/Modal open\/close state/)).toBeInTheDocument();
    expect(canvas.getByText(/Search filters affecting a list/)).toBeInTheDocument();
    expect(canvas.getByText(/User authentication status/)).toBeInTheDocument();

    // Should show badges
    const localBadges = canvas.getAllByText('Keep Local');
    expect(localBadges.length).toBeGreaterThan(0);
    const liftBadges = canvas.getAllByText('Lift Up');
    expect(liftBadges.length).toBeGreaterThan(0);
    const contextBadges = canvas.getAllByText('Use Context');
    expect(contextBadges.length).toBeGreaterThan(0);
  },
};

/**
 * Anti-patterns section with tabs
 */
export const AntiPatterns: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Should show anti-patterns section
    expect(canvas.getByText('Common Mistakes to Avoid')).toBeInTheDocument();

    // Should show pattern buttons
    expect(canvas.getByRole('button', { name: 'Lifting Everything' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Lifting Too Early' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Duplicating State' })).toBeInTheDocument();

    // Default shows Lifting Everything
    expect(canvas.getByText(/Putting all state in the root component/)).toBeInTheDocument();

    // Click Lifting Too Early
    await user.click(canvas.getByRole('button', { name: 'Lifting Too Early' }));

    await waitFor(() => {
      expect(canvas.getByText(/Premature optimization/)).toBeInTheDocument();
    });

    // Click Duplicating State
    await user.click(canvas.getByRole('button', { name: 'Duplicating State' }));

    await waitFor(() => {
      expect(canvas.getByText(/Copying lifted state back into children/)).toBeInTheDocument();
    });
  },
};

/**
 * Quick reference cards are shown
 */
export const QuickReference: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show three quick reference cards
    const keepLocalHeaders = canvas.getAllByText('Keep Local');
    expect(keepLocalHeaders.length).toBeGreaterThan(0);

    expect(canvas.getByText('Lift State')).toBeInTheDocument();

    const useContextHeaders = canvas.getAllByText('Use Context');
    expect(useContextHeaders.length).toBeGreaterThan(0);

    // Should show examples for each
    expect(canvas.getByText(/UI state/)).toBeInTheDocument();
    expect(canvas.getByText(/Sibling sync needed/)).toBeInTheDocument();
    expect(canvas.getByText(/Deep prop drilling/)).toBeInTheDocument();
  },
};
