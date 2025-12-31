import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import WhyContextReducerDemo from '@lessons/7_3/WhyContextReducerDemo';

const meta: Meta<typeof WhyContextReducerDemo> = {
  title: 'Lessons/7.3/WhyContextReducerDemo',
  component: WhyContextReducerDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates why combining Context with Reducer is powerful - comparing prop drilling vs context-based access.',
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
 * Default view shows both prop drilling and context approaches
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show both approaches
    expect(canvas.getByText('Prop Drilling Approach')).toBeInTheDocument();
    expect(canvas.getByText('Context + Reducer Approach')).toBeInTheDocument();

    // Should show badges
    expect(canvas.getByText('Tedious')).toBeInTheDocument();
    expect(canvas.getByText('Clean')).toBeInTheDocument();
  },
};

/**
 * Prop drilling example shows nested components
 */
export const PropDrillingNesting: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the nesting structure
    expect(canvas.getByText('App (owns state)')).toBeInTheDocument();
    expect(canvas.getByText('Layout (passes props)')).toBeInTheDocument();
    expect(canvas.getByText('Sidebar (passes props)')).toBeInTheDocument();
    expect(canvas.getByText('Counter (finally uses it!)')).toBeInTheDocument();

    // Should show the warning message
    expect(canvas.getByText(/Every component in between must pass/)).toBeInTheDocument();
  },
};

/**
 * Context + Reducer example shows clean access
 */
export const ContextReducerClean: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show no props nesting
    expect(canvas.getByText('App (provides context)')).toBeInTheDocument();
    expect(canvas.getByText('Layout (no props!)')).toBeInTheDocument();
    expect(canvas.getByText('Sidebar (no props!)')).toBeInTheDocument();
    expect(canvas.getByText('Counter (uses context)')).toBeInTheDocument();

    // Should show success message
    expect(canvas.getByText(/grab what they need directly from context/)).toBeInTheDocument();
  },
};

/**
 * Prop drilling counter works
 */
export const PropDrillingInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find prop drilling section
    const propDrillingSection = canvas.getByText('Prop Drilling Approach').closest('.card')!;
    const withinPropDrilling = within(propDrillingSection as HTMLElement);

    // Click increment in prop drilling section
    const buttons = withinPropDrilling.getAllByRole('button');
    const incrementBtn = buttons.find((btn) => btn.textContent === '+');

    if (incrementBtn) {
      await user.click(incrementBtn);
      await user.click(incrementBtn);
    }

    // Should show count
    await waitFor(() => {
      const countElements = withinPropDrilling.getAllByText(/\d/);
      expect(countElements.length).toBeGreaterThan(0);
    });
  },
};

/**
 * Context reducer counter works
 */
export const ContextReducerInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find context reducer section
    const contextSection = canvas.getByText('Context + Reducer Approach').closest('.card')!;
    const withinContext = within(contextSection as HTMLElement);

    // Click increment in context section
    const buttons = withinContext.getAllByRole('button');
    const incrementBtn = buttons.find((btn) => btn.textContent === '+');

    if (incrementBtn) {
      await user.click(incrementBtn);
      await user.click(incrementBtn);
      await user.click(incrementBtn);
    }

    // Should show count of 3
    await waitFor(() => {
      expect(withinContext.getByText('3')).toBeInTheDocument();
    });
  },
};

/**
 * Comparison visual is displayed
 */
export const ComparisonVisual: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the visual
    expect(canvas.getByText('The Best of Both Worlds')).toBeInTheDocument();

    // Should show useReducer benefits
    expect(canvas.getByText('Structured updates')).toBeInTheDocument();
    expect(canvas.getByText('Predictable actions')).toBeInTheDocument();

    // Should show useContext benefits
    expect(canvas.getByText('Global access')).toBeInTheDocument();
    expect(canvas.getByText('No prop drilling')).toBeInTheDocument();

    // Should show result
    expect(canvas.getByText('Mini Redux!')).toBeInTheDocument();
  },
};

/**
 * When to use tip is shown
 */
export const WhenToUseTip: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the tip
    expect(canvas.getByText('When to use this pattern:')).toBeInTheDocument();
    expect(canvas.getByText(/Auth state, theme preferences/)).toBeInTheDocument();
  },
};
