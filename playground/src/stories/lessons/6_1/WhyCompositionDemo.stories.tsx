import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import WhyCompositionDemo from '@lessons/6_1/WhyCompositionDemo';

const meta: Meta<typeof WhyCompositionDemo> = {
  title: 'Lessons/6.1/WhyCompositionDemo',
  component: WhyCompositionDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates why React favors composition over inheritance with code examples and live dialog demos.',
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
 * Default view shows the inheritance tab first
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show inheritance tab by default
    expect(canvas.getByRole('button', { name: /Inheritance/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Composition/i })).toBeInTheDocument();

    // Should show problems with inheritance
    expect(canvas.getByText('Problems with Inheritance')).toBeInTheDocument();
  },
};

/**
 * Switch to composition tab and see live demos
 */
export const CompositionTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click composition tab
    const compositionTab = canvas.getByRole('button', { name: /Composition/i });
    await user.click(compositionTab);

    // Should show live demo with dialog variants
    expect(canvas.getByText('Live Demo: Same Dialog, Different Content')).toBeInTheDocument();

    // Dialog titles (might have punctuation variations)
    expect(canvas.getByRole('heading', { name: /Welcome/i })).toBeInTheDocument();
    expect(canvas.getByRole('heading', { name: /Success/i })).toBeInTheDocument();
    expect(canvas.getByRole('heading', { name: /Warning/i })).toBeInTheDocument();
    expect(canvas.getByRole('heading', { name: /Error/i })).toBeInTheDocument();

    // Should show benefits
    expect(canvas.getByText('Benefits of Composition')).toBeInTheDocument();
  },
};

/**
 * Verify React's philosophy insight is shown
 */
export const PhilosophyInsight: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the React philosophy quote
    expect(canvas.getByText("React's Philosophy")).toBeInTheDocument();
    expect(
      canvas.getByText(/we haven't found any use cases where we would recommend/)
    ).toBeInTheDocument();
  },
};
