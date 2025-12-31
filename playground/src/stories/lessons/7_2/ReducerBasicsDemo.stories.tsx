import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import ReducerBasicsDemo from '@lessons/7_2/ReducerBasicsDemo';

const meta: Meta<typeof ReducerBasicsDemo> = {
  title: 'Lessons/7.2/ReducerBasicsDemo',
  component: ReducerBasicsDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Teaches the fundamentals of useReducer with an interactive counter that logs actions and step-by-step anatomy.',
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
 * Default view shows counter and action log
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show counter component
    expect(canvas.getByText('Counter Component')).toBeInTheDocument();

    // Should show action log
    expect(canvas.getByText('Action Log')).toBeInTheDocument();

    // Should show initial count of 0
    expect(canvas.getByText('0')).toBeInTheDocument();
  },
};

/**
 * Increment action logs correctly
 */
export const IncrementAction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click increment button
    await user.click(canvas.getByRole('button', { name: /Increment/i }));

    // Should show count of 1
    await waitFor(() => {
      expect(canvas.getByText('1')).toBeInTheDocument();
    });

    // Should show action in log
    expect(canvas.getByText('INCREMENT')).toBeInTheDocument();
    expect(canvas.getByText(/count: 0/)).toBeInTheDocument();
    expect(canvas.getByText(/count: 1/)).toBeInTheDocument();
  },
};

/**
 * Decrement action logs correctly
 */
export const DecrementAction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click decrement button
    await user.click(canvas.getByRole('button', { name: /Decrement/i }));

    // Should show count of -1
    await waitFor(() => {
      expect(canvas.getByText('-1')).toBeInTheDocument();
    });

    // Should show action in log
    expect(canvas.getByText('DECREMENT')).toBeInTheDocument();
  },
};

/**
 * Reset action works
 */
export const ResetAction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Increment first
    await user.click(canvas.getByRole('button', { name: /Increment/i }));
    await user.click(canvas.getByRole('button', { name: /Increment/i }));

    await waitFor(() => {
      expect(canvas.getByText('2')).toBeInTheDocument();
    });

    // Click reset
    await user.click(canvas.getByRole('button', { name: 'Reset' }));

    // Should show count of 0
    await waitFor(() => {
      expect(canvas.getByText('0')).toBeInTheDocument();
    });

    // Should show RESET in log
    expect(canvas.getByText('RESET')).toBeInTheDocument();
  },
};

/**
 * Set value action works
 */
export const SetValueAction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Type a custom value and set it
    const input = canvas.getByRole('spinbutton');
    await user.clear(input);
    await user.type(input, '42');

    await user.click(canvas.getByRole('button', { name: 'Set Value' }));

    // Should show count of 42
    await waitFor(() => {
      // The counter should display 42 in the large text
      const largeNumbers = canvasElement.querySelectorAll('.text-6xl');
      const has42 = Array.from(largeNumbers).some((el) => el.textContent === '42');
      expect(has42).toBe(true);
    });

    // Should show SET action with payload
    expect(canvas.getByText('SET')).toBeInTheDocument();
    expect(canvas.getByText(/payload: 42/)).toBeInTheDocument();
  },
};

/**
 * How useReducer works can be expanded
 */
export const HowItWorksExpand: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click to expand
    await user.click(canvas.getByText('How useReducer Works'));

    // Should show visual flow
    await waitFor(() => {
      expect(canvas.getByText('Current')).toBeInTheDocument();
      expect(canvas.getByText('Dispatched')).toBeInTheDocument();
      expect(canvas.getByText('Pure Function')).toBeInTheDocument();
      expect(canvas.getByText('New')).toBeInTheDocument();
    });

    // Should show key concepts
    expect(
      canvas.getByText('An object containing all the data your component needs')
    ).toBeInTheDocument();
  },
};

/**
 * Anatomy breakdown with steps
 */
export const AnatomyBreakdown: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Should show anatomy section
    expect(canvas.getByText('useReducer Anatomy')).toBeInTheDocument();

    // Should show step buttons
    expect(canvas.getByRole('button', { name: 'Step 1' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Step 4' })).toBeInTheDocument();

    // Step 1 is active by default
    expect(canvas.getByText('Define State Type')).toBeInTheDocument();

    // Click Step 3
    await user.click(canvas.getByRole('button', { name: 'Step 3' }));

    await waitFor(() => {
      expect(canvas.getByText('Create the Reducer')).toBeInTheDocument();
    });
  },
};

/**
 * Pure function reminder is shown
 */
export const PureFunctionReminder: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the reminder
    expect(canvas.getByText('Remember:')).toBeInTheDocument();
    expect(canvas.getByText(/pure function/)).toBeInTheDocument();
  },
};

/**
 * Code toggle works
 */
export const CodeToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Show Full Code
    await user.click(canvas.getByRole('button', { name: 'Show Full Code' }));

    // Should show code snippet
    await waitFor(() => {
      expect(canvas.getByText('Complete Example')).toBeInTheDocument();
    });
  },
};
