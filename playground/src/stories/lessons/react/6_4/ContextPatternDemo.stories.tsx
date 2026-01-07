import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import ContextPatternDemo from '@lessons/react/6_4/ContextPatternDemo';

const meta: Meta<typeof ContextPatternDemo> = {
  title: 'Lessons/react-6.4/ContextPatternDemo',
  component: ContextPatternDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates how compound components use React Context to share state between parent and children without props drilling.',
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
 * Default view shows the context pattern explanation
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the pattern explanation
    expect(canvas.getByText('The Context Pattern')).toBeInTheDocument();

    // Should show the three steps
    expect(canvas.getByText('Create Context')).toBeInTheDocument();
    expect(canvas.getByText('Parent Provides')).toBeInTheDocument();
    expect(canvas.getByText('Children Consume')).toBeInTheDocument();

    // Should show the live demo
    expect(canvas.getByText('Live Demo: Accordion')).toBeInTheDocument();
  },
};

/**
 * Click step buttons to show code
 */
export const StepCodeDisplay: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click "Create Context" step
    await user.click(canvas.getByText('Create Context'));

    // Should show code snippet
    await waitFor(() => {
      expect(canvas.getByText('Step 1: Create Context')).toBeInTheDocument();
    });

    // Click "Parent Provides" step
    await user.click(canvas.getByText('Parent Provides'));

    await waitFor(() => {
      expect(canvas.getByText('Step 2: Parent Component')).toBeInTheDocument();
    });

    // Click "Children Consume" step
    await user.click(canvas.getByText('Children Consume'));

    await waitFor(() => {
      expect(canvas.getByText('Step 3: Child Components')).toBeInTheDocument();
    });
  },
};

/**
 * Accordion demo works - single open mode
 */
export const AccordionSingleMode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // First item should be open by default
    expect(canvas.getByText(/Compound components are a pattern/)).toBeInTheDocument();

    // Click second accordion item
    await user.click(canvas.getByText('Why use Context for this?'));

    // Second item content should show
    await waitFor(() => {
      expect(canvas.getByText(/Context allows the parent to share state/)).toBeInTheDocument();
    });

    // First item should now be closed (single mode)
    expect(canvas.queryByText(/Compound components are a pattern/)).not.toBeInTheDocument();
  },
};

/**
 * Accordion demo works - multiple open mode
 */
export const AccordionMultipleMode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Enable multiple mode
    const checkbox = canvas.getByRole('checkbox');
    await user.click(checkbox);

    // First item should still be open
    expect(canvas.getByText(/Compound components are a pattern/)).toBeInTheDocument();

    // Click second accordion item
    await user.click(canvas.getByText('Why use Context for this?'));

    // Both items should now be open
    await waitFor(() => {
      expect(canvas.getByText(/Compound components are a pattern/)).toBeInTheDocument();
      expect(canvas.getByText(/Context allows the parent to share state/)).toBeInTheDocument();
    });

    // Click third item
    await user.click(canvas.getByText('When should I use this pattern?'));

    // All three should be open
    await waitFor(() => {
      expect(canvas.getByText(/Use compound components when you have/)).toBeInTheDocument();
    });
  },
};

/**
 * Key insight is displayed
 */
export const KeyInsight: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show key insight
    expect(canvas.getByText(/Key Insight:/)).toBeInTheDocument();
    expect(canvas.getByText(/don't receive any props from their parent/)).toBeInTheDocument();
  },
};

/**
 * Accordion items can be collapsed
 */
export const AccordionCollapse: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // First item is open by default
    expect(canvas.getByText(/Compound components are a pattern/)).toBeInTheDocument();

    // Click the first trigger to collapse it
    await user.click(canvas.getByText('What are compound components?'));

    // Content should now be hidden
    await waitFor(() => {
      expect(canvas.queryByText(/Compound components are a pattern/)).not.toBeInTheDocument();
    });
  },
};
