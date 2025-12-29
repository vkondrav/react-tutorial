import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import SpecializationDemo from '@lessons/6_1/SpecializationDemo';

const meta: Meta<typeof SpecializationDemo> = {
  title: 'Lessons/6.1/SpecializationDemo',
  component: SpecializationDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shows the specialization pattern with generic Button/Alert components and their specialized variants.',
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
 * Default view with all buttons and alerts
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show explanation
    expect(canvas.getByText('What is Specialization?')).toBeInTheDocument();

    // Should show generic buttons
    expect(canvas.getByText('Generic Button (all options)')).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Primary' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Secondary' })).toBeInTheDocument();

    // Should show specialized buttons
    expect(canvas.getByText('Specialized Buttons (pre-configured)')).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Delete Item/i })).toBeInTheDocument();
  },
};

/**
 * Click on specialized buttons
 */
export const ClickButtons: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click a specialized button
    const saveButton = canvas.getByRole('button', { name: /Save Changes/i });
    await user.click(saveButton);

    // Should show click feedback
    await waitFor(() => {
      expect(canvas.getByText(/Clicked: Success Button/i)).toBeInTheDocument();
    });
  },
};

/**
 * Verify specialized alerts are displayed
 */
export const SpecializedAlerts: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show generic alert
    expect(canvas.getByText('Generic Alert')).toBeInTheDocument();

    // Should show specialized alerts
    expect(canvas.getByText('Specialized Alerts')).toBeInTheDocument();
    expect(canvas.getByText(/Your changes have been saved/)).toBeInTheDocument();
    expect(canvas.getByText(/Failed to connect to the server/)).toBeInTheDocument();
    expect(canvas.getByText(/Your session will expire/)).toBeInTheDocument();
  },
};

/**
 * Verify benefits and when to specialize
 */
export const BenefitsSection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show benefits
    expect(canvas.getByText('Benefits')).toBeInTheDocument();
    expect(canvas.getByText(/Cleaner, more readable code/)).toBeInTheDocument();

    // Should show when to specialize
    expect(canvas.getByText('When to Specialize?')).toBeInTheDocument();
    expect(canvas.getByText(/Same props used repeatedly/)).toBeInTheDocument();
  },
};

/**
 * Verify key insight
 */
export const KeyInsight: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Composition, Not Configuration')).toBeInTheDocument();
    expect(canvas.getByText(/Instead of one giant component with 20 props/)).toBeInTheDocument();
  },
};
