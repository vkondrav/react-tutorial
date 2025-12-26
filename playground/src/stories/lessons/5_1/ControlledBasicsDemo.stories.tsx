import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import ControlledBasicsDemo from '@lessons/5_1/ControlledBasicsDemo';

const meta: Meta<typeof ControlledBasicsDemo> = {
  title: 'Lessons/5.1 Controlled Components/ControlledBasicsDemo',
  component: ControlledBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the basic controlled input concept with real-time state display and live preview.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default empty state
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify title is present
    expect(canvas.getByText('Try It: Controlled Input')).toBeInTheDocument();

    // Verify input is present with placeholder
    expect(canvas.getByPlaceholderText('Type here...')).toBeInTheDocument();

    // Verify state display shows empty string
    expect(canvas.getByText('""')).toBeInTheDocument();

    // Verify character count is 0
    expect(canvas.getByText('0')).toBeInTheDocument();

    // Verify empty preview message
    expect(canvas.getByText('Enter your name above...')).toBeInTheDocument();
  },
};

/**
 * Tests typing in the input and seeing real-time updates
 */
export const TypingUpdatesState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the input
    const input = canvas.getByPlaceholderText('Type here...');

    // Type a name
    await userEvent.type(input, 'Alice');

    // Verify state value updates
    await waitFor(() => {
      expect(canvas.getByText('"Alice"')).toBeInTheDocument();
    });

    // Verify character count updates
    expect(canvas.getByText('5')).toBeInTheDocument();

    // Verify preview no longer shows the empty state message
    expect(canvas.queryByText('Enter your name above...')).not.toBeInTheDocument();
  },
};

/**
 * Tests the code toggle functionality
 */
export const CodeToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Code should be hidden initially
    expect(canvas.queryByText('Controlled Input Pattern')).not.toBeInTheDocument();

    // Click to show code
    const showCodeButton = canvas.getByRole('button', { name: /Show Code/ });
    await userEvent.click(showCodeButton);

    // Code should now be visible
    await waitFor(() => {
      expect(canvas.getByText('Controlled Input Pattern')).toBeInTheDocument();
    });

    // Click to hide code
    const hideCodeButton = canvas.getByRole('button', { name: /Hide Code/ });
    await userEvent.click(hideCodeButton);

    // Code should be hidden again
    await waitFor(() => {
      expect(canvas.queryByText('Controlled Input Pattern')).not.toBeInTheDocument();
    });
  },
};

/**
 * Verifies the flow diagram is present
 */
export const FlowDiagram: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify flow diagram title
    expect(canvas.getByText('The Controlled Component Flow')).toBeInTheDocument();

    // Verify flow components
    expect(canvas.getByText('React State')).toBeInTheDocument();
    expect(canvas.getByText('Input Element')).toBeInTheDocument();
    expect(canvas.getByText('name')).toBeInTheDocument();
  },
};

/**
 * Tests clearing the input
 */
export const ClearInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the input and type something
    const input = canvas.getByPlaceholderText('Type here...');
    await userEvent.type(input, 'Test');

    // Verify it's there
    await waitFor(() => {
      expect(canvas.getByText('"Test"')).toBeInTheDocument();
    });

    // Clear the input
    await userEvent.clear(input);

    // Verify it's empty again
    await waitFor(() => {
      expect(canvas.getByText('""')).toBeInTheDocument();
    });
    expect(canvas.getByText('0')).toBeInTheDocument();
    expect(canvas.getByText('Enter your name above...')).toBeInTheDocument();
  },
};
