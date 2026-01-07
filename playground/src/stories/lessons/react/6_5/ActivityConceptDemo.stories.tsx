import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import ActivityConceptDemo from '@lessons/react/6_5/ActivityConceptDemo';

const meta: Meta<typeof ActivityConceptDemo> = {
  title: 'Lessons/react-6.5/ActivityConceptDemo',
  component: ActivityConceptDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Explains the React 19 Activity API concept with comparison table showing how it differs from conditional rendering and CSS hiding.',
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
 * Default view shows the experimental warning and concept explanation
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the experimental warning
    expect(canvas.getByText('Experimental API')).toBeInTheDocument();
    expect(canvas.getByText(/unstable_Activity/)).toBeInTheDocument();

    // Should show what is Activity
    expect(canvas.getByText('What is Activity?')).toBeInTheDocument();
  },
};

/**
 * Mode explanations are shown
 */
export const ModeExplanations: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show both modes
    expect(canvas.getByText('mode="visible"')).toBeInTheDocument();
    expect(canvas.getByText('mode="hidden"')).toBeInTheDocument();

    // Should explain visible mode
    expect(canvas.getByText(/renders normally, effects run/)).toBeInTheDocument();

    // Should explain hidden mode
    expect(canvas.getByText(/State preserved, but content hidden/)).toBeInTheDocument();
  },
};

/**
 * Toggle code display
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Code should be hidden initially
    expect(canvas.getByText('Show Activity Code')).toBeInTheDocument();

    // Click to show code
    await user.click(canvas.getByText('Show Activity Code'));

    // Should show code snippets
    await waitFor(() => {
      expect(canvas.getByText('Using Activity')).toBeInTheDocument();
      expect(canvas.getByText('Activity Modes Explained')).toBeInTheDocument();
    });

    // Click to hide
    await user.click(canvas.getByText('Hide Activity Code'));

    // Code should be hidden
    await waitFor(() => {
      expect(canvas.queryByText('Using Activity')).not.toBeInTheDocument();
    });
  },
};

/**
 * Comparison table is displayed
 */
export const ComparisonTable: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show comparison heading
    expect(canvas.getByText('Comparison')).toBeInTheDocument();

    // Should show table headers - use getAllByText for duplicates
    const conditionalTexts = canvas.getAllByText('Conditional');
    expect(conditionalTexts.length).toBeGreaterThan(0);
    expect(canvas.getByText('CSS Hide')).toBeInTheDocument();

    // Should show feature rows
    expect(canvas.getByText('State preserved')).toBeInTheDocument();
    expect(canvas.getByText('Removed from DOM')).toBeInTheDocument();
    expect(canvas.getByText('Effects paused')).toBeInTheDocument();
    expect(canvas.getByText('Memory efficient')).toBeInTheDocument();
    expect(canvas.getByText('Accessibility')).toBeInTheDocument();
  },
};

/**
 * Use cases are displayed
 */
export const UseCases: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show use cases heading
    expect(canvas.getByText('Ideal Use Cases for Activity')).toBeInTheDocument();

    // Should show various use cases
    expect(canvas.getByText(/Tab panels/)).toBeInTheDocument();
    expect(canvas.getByText(/Wizard steps/)).toBeInTheDocument();
    expect(canvas.getByText(/Modal dialogs/)).toBeInTheDocument();
    expect(canvas.getByText(/Cached routes/)).toBeInTheDocument();
    expect(canvas.getByText(/Offscreen prefetching/)).toBeInTheDocument();
    expect(canvas.getByText(/Heavy components/)).toBeInTheDocument();
  },
};
