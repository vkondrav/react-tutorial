import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import EmbeddingDemo from '@lessons/1_3/EmbeddingDemo';

const meta: Meta<typeof EmbeddingDemo> = {
  title: 'Lessons/1.3/EmbeddingDemo',
  component: EmbeddingDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive demo showing how to embed JavaScript expressions in JSX. Change the name and age inputs to see expressions update in real-time.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to get inputs by type
const getInputs = (canvasElement: HTMLElement) => {
  const inputs = canvasElement.querySelectorAll('input');
  return {
    nameInput: inputs[0] as HTMLInputElement,
    ageInput: inputs[1] as HTMLInputElement,
  };
};

/**
 * The default embedding demo.
 */
export const Default: Story = {};

/**
 * Tests typing in the name input updates expressions.
 */
export const TypeName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { nameInput } = getInputs(canvasElement);

    // Clear and type new name
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Alice');

    // Variable expression should show "Alice"
    expect(canvas.getByText('Alice')).toBeInTheDocument();

    // Method expression should show uppercase
    expect(canvas.getByText('ALICE')).toBeInTheDocument();

    // Template expression should show "Hello, Alice!"
    expect(canvas.getByText(/Hello, Alice!/)).toBeInTheDocument();
  },
};

/**
 * Tests changing the age updates math expressions.
 */
export const ChangeAge: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { ageInput } = getInputs(canvasElement);

    // Change age to 30
    await userEvent.clear(ageInput);
    await userEvent.type(ageInput, '30');

    // Math expression should show 31 (age + 1)
    expect(canvas.getByText('31')).toBeInTheDocument();

    // Ternary should show "Adult" (age >= 18)
    expect(canvas.getByText('Adult')).toBeInTheDocument();
  },
};

/**
 * Tests age ternary shows "Minor" for ages under 18.
 */
export const AgeMinor: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { ageInput } = getInputs(canvasElement);

    // Set age to 15
    await userEvent.clear(ageInput);
    await userEvent.type(ageInput, '15');

    // Ternary should show "Minor"
    expect(canvas.getByText('Minor')).toBeInTheDocument();
  },
};

/**
 * Tests both inputs work together.
 */
export const BothInputs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { nameInput, ageInput } = getInputs(canvasElement);

    // Set both values
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Bob');

    await userEvent.clear(ageInput);
    await userEvent.type(ageInput, '25');

    // Check multiple expressions updated
    expect(canvas.getByText('Bob')).toBeInTheDocument();
    expect(canvas.getByText('26')).toBeInTheDocument(); // age + 1
    expect(canvas.getByText('Adult')).toBeInTheDocument();
    expect(canvas.getByText(/Hello, Bob!/)).toBeInTheDocument();
  },
};
