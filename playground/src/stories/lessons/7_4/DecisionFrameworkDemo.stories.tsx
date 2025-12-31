import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import DecisionFrameworkDemo from '@lessons/7_4/DecisionFrameworkDemo';

const meta: Meta<typeof DecisionFrameworkDemo> = {
  title: 'Lessons/7.4/DecisionFrameworkDemo',
  component: DecisionFrameworkDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Interactive decision flowchart to help choose the right state management approach for your project.',
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
 * Default view shows first question
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show progress
    expect(canvas.getByText('Progress')).toBeInTheDocument();
    expect(canvas.getByText('Question 1')).toBeInTheDocument();

    // Should show first question
    expect(
      canvas.getByText('Is the state shared between multiple components?')
    ).toBeInTheDocument();

    // Should show Yes and No buttons
    expect(canvas.getByRole('button', { name: /Yes/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'No' })).toBeInTheDocument();
  },
};

/**
 * Answer No to first question -> useState result
 */
export const AnswerNoUseState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Answer No to first question
    await user.click(canvas.getByRole('button', { name: 'No' }));

    // Should show useState recommendation
    await waitFor(() => {
      expect(canvas.getByText('Recommendation')).toBeInTheDocument();
    });

    // Should show the result description
    expect(canvas.getByText('Perfect for component-local state')).toBeInTheDocument();
    expect(canvas.getByText(/Keep it simple!/)).toBeInTheDocument();
  },
};

/**
 * Answer Yes, No -> Lift State result
 */
export const AnswerYesNoLiftState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Q1: Is state shared? -> Yes
    await user.click(canvas.getByRole('button', { name: /Yes/i }));

    // Q2: Sibling/distant components? -> No
    await waitFor(() => {
      expect(canvas.getByText(/sibling\/distant components/)).toBeInTheDocument();
    });
    await user.click(canvas.getByRole('button', { name: 'No' }));

    // Should show recommendation
    await waitFor(() => {
      expect(canvas.getByText('Recommendation')).toBeInTheDocument();
    });

    expect(canvas.getByText('Move state to the nearest common parent')).toBeInTheDocument();
  },
};

/**
 * Answer Yes, Yes, No, No -> Context + Reducer
 */
export const AnswerContextReducer: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Q1: Shared? -> Yes
    await user.click(canvas.getByRole('button', { name: /Yes/i }));

    // Q2: Sibling/distant? -> Yes
    await waitFor(() => {
      expect(canvas.getByText(/sibling\/distant/)).toBeInTheDocument();
    });
    await user.click(canvas.getByRole('button', { name: /Yes/i }));

    // Q3: Frequent updates? -> No
    await waitFor(() => {
      expect(canvas.getByText(/update very frequently/)).toBeInTheDocument();
    });
    await user.click(canvas.getByRole('button', { name: 'No' }));

    // Q4: More than 5-8 contexts? -> No
    await waitFor(() => {
      expect(canvas.getByText(/5-8 pieces of global state/)).toBeInTheDocument();
    });
    await user.click(canvas.getByRole('button', { name: 'No' }));

    // Should show recommendation
    await waitFor(() => {
      expect(canvas.getByText('Recommendation')).toBeInTheDocument();
    });

    expect(canvas.getByText(/You learned this in 7.3/)).toBeInTheDocument();
  },
};

/**
 * Path to Redux Toolkit
 */
export const AnswerReduxToolkit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Q1: Shared? -> Yes
    await user.click(canvas.getByRole('button', { name: /Yes/i }));

    // Q2: Sibling/distant? -> Yes
    await waitFor(() => {
      expect(canvas.getByText(/sibling\/distant/)).toBeInTheDocument();
    });
    await user.click(canvas.getByRole('button', { name: /Yes/i }));

    // Q3: Frequent updates? -> No
    await waitFor(() => {
      expect(canvas.getByText(/update very frequently/)).toBeInTheDocument();
    });
    await user.click(canvas.getByRole('button', { name: 'No' }));

    // Q4: More than 5-8 contexts? -> Yes
    await waitFor(() => {
      expect(canvas.getByText(/5-8 pieces of global state/)).toBeInTheDocument();
    });
    await user.click(canvas.getByRole('button', { name: /Yes/i }));

    // Q5: Large team? -> Yes
    await waitFor(() => {
      expect(canvas.getByText(/large team project/)).toBeInTheDocument();
    });
    await user.click(canvas.getByRole('button', { name: /Yes/i }));

    // Should show recommendation
    await waitFor(() => {
      expect(canvas.getByText('Recommendation')).toBeInTheDocument();
    });

    expect(canvas.getByText(/DevTools time-travel/)).toBeInTheDocument();
  },
};

/**
 * Start over functionality
 */
export const StartOver: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Get to a result first
    await user.click(canvas.getByRole('button', { name: 'No' }));

    await waitFor(() => {
      expect(canvas.getByText('Recommendation')).toBeInTheDocument();
    });

    // Click Start Over
    await user.click(canvas.getByRole('button', { name: /Start Over/i }));

    // Should be back to first question
    await waitFor(() => {
      expect(
        canvas.getByText('Is the state shared between multiple components?')
      ).toBeInTheDocument();
    });
  },
};

/**
 * Answer trail is shown
 */
export const AnswerTrail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Answer first question
    await user.click(canvas.getByRole('button', { name: /Yes/i }));

    // Should show "Your Path"
    await waitFor(() => {
      expect(canvas.getByText('Your Path:')).toBeInTheDocument();
    });
  },
};

/**
 * Quick reference chart is shown
 */
export const QuickReferenceChart: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show quick reference
    expect(canvas.getByText('Quick Reference')).toBeInTheDocument();

    // Should show recommendations
    expect(canvas.getByText('1-2 components need state')).toBeInTheDocument();
    expect(canvas.getByText('Parent-child sharing')).toBeInTheDocument();
    expect(canvas.getByText('2-5 global state items')).toBeInTheDocument();
    expect(canvas.getByText('API data, caching, sync')).toBeInTheDocument();
  },
};

/**
 * Pro tip is shown
 */
export const ProTip: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show pro tip
    expect(canvas.getByText('Pro Tip:')).toBeInTheDocument();
    expect(canvas.getByText(/start with built-in solutions/)).toBeInTheDocument();
  },
};
