import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import SlotPatternDemo from '@lessons/react/6_1/SlotPatternDemo';

const meta: Meta<typeof SlotPatternDemo> = {
  title: 'Lessons/react-6.1/SlotPatternDemo',
  component: SlotPatternDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates the slot pattern with PageLayout, CardWithSlots, and Modal examples.',
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
 * Default view shows page layout example
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show explanation
    expect(canvas.getByText('Why Use Named Slots?')).toBeInTheDocument();

    // Should show tabs
    expect(canvas.getByRole('button', { name: /Page Layout/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /^Card$/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Modal/i })).toBeInTheDocument();

    // Should show page layout by default
    expect(canvas.getByText('3 slots: header, sidebar, children')).toBeInTheDocument();
    expect(canvas.getByText('Welcome Back!')).toBeInTheDocument();
  },
};

/**
 * Switch to card tab
 */
export const CardTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click card tab
    const cardTab = canvas.getByRole('button', { name: /^Card$/i });
    await user.click(cardTab);

    // Should show card examples
    expect(
      canvas.getByText('Optional slots: header, children (required), footer')
    ).toBeInTheDocument();
    expect(canvas.getByText('With Header')).toBeInTheDocument();
    expect(canvas.getByText('Full Card')).toBeInTheDocument();
  },
};

/**
 * Switch to modal tab
 */
export const ModalTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click modal tab
    const modalTab = canvas.getByRole('button', { name: /Modal/i });
    await user.click(modalTab);

    // Should show modal example
    expect(canvas.getByText('3 slots: title, children, actions')).toBeInTheDocument();
    expect(canvas.getByText('Confirm Delete')).toBeInTheDocument();
    expect(canvas.getByText(/This action cannot be undone/)).toBeInTheDocument();
  },
};

/**
 * Verify key insight about named slots
 */
export const KeyInsight: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Named Slots = Multiple Holes')).toBeInTheDocument();
    expect(canvas.getByText(/labeled hole in your component/)).toBeInTheDocument();
  },
};
