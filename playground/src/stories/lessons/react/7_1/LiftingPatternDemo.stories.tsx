import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import LiftingPatternDemo from '@lessons/react/7_1/LiftingPatternDemo';

const meta: Meta<typeof LiftingPatternDemo> = {
  title: 'Lessons/react-7.1/LiftingPatternDemo',
  component: LiftingPatternDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates the lifting state pattern with a temperature converter and step-by-step explanation.',
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
 * Default view shows temperature converter
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show temperature converter
    expect(canvas.getByText('Temperature Converter (Lifted State)')).toBeInTheDocument();

    // Should show both temperature inputs
    expect(canvas.getByText('Celsius')).toBeInTheDocument();
    expect(canvas.getByText('Fahrenheit')).toBeInTheDocument();

    // Should show data flow diagram
    expect(canvas.getByText('Data Flow After Lifting')).toBeInTheDocument();
  },
};

/**
 * Temperature inputs stay in sync
 */
export const TemperatureSync: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find Celsius input
    const celsiusInput = canvas.getAllByPlaceholderText('Enter temperature')[0];

    // Type a temperature
    await user.type(celsiusInput, '25');

    // Should show verdict
    await waitFor(() => {
      expect(canvas.getByText('Nice weather')).toBeInTheDocument();
    });

    // Fahrenheit should show converted value
    const fahrenheitInput = canvas.getAllByPlaceholderText('Enter temperature')[1];
    expect(fahrenheitInput).toHaveValue(77);
  },
};

/**
 * Hot temperature shows correct verdict
 */
export const HotTemperature: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find Celsius input
    const celsiusInput = canvas.getAllByPlaceholderText('Enter temperature')[0];

    // Type hot temperature
    await user.type(celsiusInput, '35');

    // Should show "Hot day!"
    await waitFor(() => {
      expect(canvas.getByText('Hot day!')).toBeInTheDocument();
    });
  },
};

/**
 * Boiling temperature shows correct verdict
 */
export const BoilingTemperature: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find Celsius input
    const celsiusInput = canvas.getAllByPlaceholderText('Enter temperature')[0];

    // Type boiling temperature
    await user.type(celsiusInput, '100');

    // Should show "Water would boil!"
    await waitFor(() => {
      expect(canvas.getByText('Water would boil!')).toBeInTheDocument();
    });
  },
};

/**
 * Steps section can be expanded
 */
export const StepsExpand: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click to expand steps
    await user.click(canvas.getByText('The 4 Steps to Lift State'));

    // Should show step buttons
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Step 1' })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: 'Step 2' })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: 'Step 3' })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: 'Step 4' })).toBeInTheDocument();
    });

    // Step 1 should be active by default
    expect(canvas.getByText('Step 1: Identify Shared State')).toBeInTheDocument();
  },
};

/**
 * Navigate through steps
 */
export const NavigateSteps: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Expand steps
    await user.click(canvas.getByText('The 4 Steps to Lift State'));

    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Step 2' })).toBeInTheDocument();
    });

    // Click Step 2
    await user.click(canvas.getByRole('button', { name: 'Step 2' }));

    await waitFor(() => {
      expect(canvas.getByText('Step 2: Find Common Ancestor')).toBeInTheDocument();
    });

    // Click Step 4
    await user.click(canvas.getByRole('button', { name: 'Step 4' }));

    await waitFor(() => {
      expect(canvas.getByText('Step 4: Pass Props Down')).toBeInTheDocument();
    });
  },
};

/**
 * Data flow diagram is shown
 */
export const DataFlowDiagram: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show diagram
    expect(canvas.getByText('Data Flow After Lifting')).toBeInTheDocument();
    expect(canvas.getByText('Parent Component')).toBeInTheDocument();
    expect(canvas.getByText('useState lives here')).toBeInTheDocument();

    // Should show children
    expect(canvas.getByText('Child A')).toBeInTheDocument();
    expect(canvas.getByText('Child B')).toBeInTheDocument();

    // Should show flow explanation
    expect(canvas.getByText(/Props flow down/)).toBeInTheDocument();
    expect(canvas.getByText(/Events flow up/)).toBeInTheDocument();
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

    // Should show code snippet
    await waitFor(() => {
      expect(canvas.getByText('Temperature Converter Implementation')).toBeInTheDocument();
    });
  },
};
