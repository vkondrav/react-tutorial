import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import WhyReducerDemo from '@lessons/react/7_2/WhyReducerDemo';

const meta: Meta<typeof WhyReducerDemo> = {
  title: 'Lessons/react-7.2/WhyReducerDemo',
  component: WhyReducerDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates why useReducer is better than multiple useState calls for complex interdependent state.',
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
 * Default view shows both useState and useReducer examples
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show both approaches
    expect(canvas.getByText('useState Approach')).toBeInTheDocument();
    expect(canvas.getByText('useReducer Approach')).toBeInTheDocument();

    // Should show badges
    expect(canvas.getByText('5 useState calls')).toBeInTheDocument();
    expect(canvas.getByText('1 useReducer')).toBeInTheDocument();
  },
};

/**
 * useState example with increment/decrement
 */
export const UseStateExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find useState section (left side)
    const useStateSection = canvas.getByText('useState Approach').closest('.card')!;
    const withinUseState = within(useStateSection as HTMLElement);

    // Click increment button
    const incrementBtns = canvas.getAllByRole('button');
    const useStateIncrementBtn = incrementBtns.find(
      (btn) =>
        btn.closest('.card')?.textContent?.includes('useState Approach') && btn.querySelector('svg')
    );

    if (useStateIncrementBtn) {
      await user.click(useStateIncrementBtn);
    }

    // Should show history update
    await waitFor(() => {
      expect(withinUseState.getByText(/History:.*1/)).toBeInTheDocument();
    });
  },
};

/**
 * useReducer example with increment/decrement and undo/redo
 */
export const UseReducerExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find useReducer section
    const useReducerSection = canvas.getByText('useReducer Approach').closest('.card')!;
    const withinUseReducer = within(useReducerSection as HTMLElement);

    // Click increment multiple times
    const incrementBtns = withinUseReducer.getAllByRole('button');
    // Find the + button
    for (let i = 0; i < 3; i++) {
      await user.click(incrementBtns[1]); // Second button is increment
    }

    // Should show count of 3
    await waitFor(() => {
      expect(withinUseReducer.getByText('3')).toBeInTheDocument();
    });

    // Click Undo
    await user.click(withinUseReducer.getByRole('button', { name: 'Undo' }));

    // Should show count of 2
    await waitFor(() => {
      expect(withinUseReducer.getByText('2')).toBeInTheDocument();
    });
  },
};

/**
 * Comparison table is displayed
 */
export const ComparisonTable: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show comparison table
    expect(canvas.getByText('useState vs useReducer')).toBeInTheDocument();

    // Should show table headers
    expect(canvas.getByRole('columnheader', { name: 'useState' })).toBeInTheDocument();
    expect(canvas.getByRole('columnheader', { name: 'useReducer' })).toBeInTheDocument();

    // Should show comparison points
    expect(canvas.getByText('Multiple useState calls')).toBeInTheDocument();
    expect(canvas.getByText('Single useReducer with all state')).toBeInTheDocument();
    expect(canvas.getByText('Logic scattered across handlers')).toBeInTheDocument();
    expect(canvas.getByText('Logic centralized in reducer')).toBeInTheDocument();
  },
};

/**
 * Tip about when to use useReducer
 */
export const WhenToUseTip: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the tip
    expect(canvas.getByText('When to use useReducer:')).toBeInTheDocument();
    expect(canvas.getByText(/Multiple related state values/)).toBeInTheDocument();
  },
};

/**
 * Code toggle works
 */
export const CodeToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Show Code
    await user.click(canvas.getByRole('button', { name: 'Show Code' }));

    // Should show code snippets
    await waitFor(() => {
      expect(canvas.getByText('useState Problem')).toBeInTheDocument();
      expect(canvas.getByText('useReducer Solution')).toBeInTheDocument();
    });
  },
};
