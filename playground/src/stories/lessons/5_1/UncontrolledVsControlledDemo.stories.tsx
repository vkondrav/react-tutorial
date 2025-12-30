import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import UncontrolledVsControlledDemo from '@lessons/5_1/UncontrolledVsControlledDemo';

const meta: Meta<typeof UncontrolledVsControlledDemo> = {
  title: 'Lessons/5.1/UncontrolledVsControlledDemo',
  component: UncontrolledVsControlledDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Side-by-side comparison of uncontrolled (ref-based) vs controlled (state-based) inputs.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing both approaches
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify both section badges are present
    const badges = canvas.getAllByText(/Uncontrolled|Controlled/);
    expect(badges.length).toBeGreaterThanOrEqual(2);

    // Verify the "using ref" and "using state" labels
    expect(canvas.getByText('using ref')).toBeInTheDocument();
    expect(canvas.getByText('using state')).toBeInTheDocument();

    // Verify recommendation badge
    expect(canvas.getByText('Recommended')).toBeInTheDocument();
  },
};

/**
 * Tests the uncontrolled input behavior
 */
export const UncontrolledBehavior: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The uncontrolled input has a defaultValue
    const uncontrolledInput = canvas.getByDisplayValue('Edit me!');
    expect(uncontrolledInput).toBeInTheDocument();

    // Initial state shows prompt
    expect(canvas.getByText('(click button to read)')).toBeInTheDocument();

    // Click the read button
    const readButton = canvas.getByRole('button', { name: /Read Value/ });
    await userEvent.click(readButton);

    // Should now show the value
    await waitFor(() => {
      expect(canvas.getByText('"Edit me!"')).toBeInTheDocument();
    });
  },
};

/**
 * Tests the controlled input behavior
 */
export const ControlledBehavior: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The controlled input starts empty
    const controlledInput = canvas.getByPlaceholderText('Type here...');

    // Type something
    await userEvent.type(controlledInput, 'Hello');

    // State should update immediately (no button needed)
    await waitFor(() => {
      expect(canvas.getByText('"Hello"')).toBeInTheDocument();
    });
  },
};

/**
 * Verifies the comparison table
 */
export const ComparisonTable: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify table header
    expect(canvas.getByText('When to Use Each?')).toBeInTheDocument();
    expect(canvas.getByText('Feature')).toBeInTheDocument();

    // Verify some feature rows
    expect(canvas.getByText('Real-time validation')).toBeInTheDocument();
    expect(canvas.getByText('Instant format (e.g., phone)')).toBeInTheDocument();
    expect(canvas.getByText('Dynamic form fields')).toBeInTheDocument();
    expect(canvas.getByText('File inputs')).toBeInTheDocument();
    expect(canvas.getByText('Setup complexity')).toBeInTheDocument();
  },
};

/**
 * Verifies the recommendation note
 */
export const RecommendationNote: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify recommendation text
    expect(canvas.getByText(/React recommends controlled components/)).toBeInTheDocument();
  },
};
