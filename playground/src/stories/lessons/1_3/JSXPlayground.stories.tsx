import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import JSXPlayground from '@lessons/1_3/JSXPlayground';

const meta: Meta<typeof JSXPlayground> = {
  title: 'Lessons/1.3 Understanding JSX/JSXPlayground',
  component: JSXPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive JSX playground. Experiment with firstName, lastName, score, and isOnline to see the output update in real-time.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to get inputs
const getInputs = (canvasElement: HTMLElement) => {
  const textInputs = canvasElement.querySelectorAll('input.input');
  const rangeInput = canvasElement.querySelector('input[type="range"]') as HTMLInputElement;
  const checkboxInput = canvasElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
  return {
    firstNameInput: textInputs[0] as HTMLInputElement,
    lastNameInput: textInputs[1] as HTMLInputElement,
    scoreSlider: rangeInput,
    onlineCheckbox: checkboxInput,
  };
};

/**
 * The default JSX playground.
 */
export const Default: Story = {};

/**
 * Tests typing in firstName updates the output.
 */
export const ChangeFirstName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { firstNameInput } = getInputs(canvasElement);

    // Change firstName
    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, 'John');

    // Output should show "John"
    expect(canvas.getByText(/John/)).toBeInTheDocument();
  },
};

/**
 * Tests typing in lastName updates the output.
 */
export const ChangeLastName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { lastNameInput } = getInputs(canvasElement);

    // Change lastName
    await userEvent.clear(lastNameInput);
    await userEvent.type(lastNameInput, 'Doe');

    // Output should show "Doe"
    expect(canvas.getByText(/Doe/)).toBeInTheDocument();
  },
};

/**
 * Tests that score display shows the default value with correct grade.
 */
export const DefaultScoreGrade: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Default score is 85, which should show grade B
    expect(canvas.getByText('B')).toBeInTheDocument();
    // Live Output section should exist
    expect(canvas.getByText(/Live Output/)).toBeInTheDocument();
  },
};

/**
 * Tests toggling isOnline checkbox updates status.
 */
export const ToggleOnlineStatus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { onlineCheckbox } = getInputs(canvasElement);

    // Initially should be checked (online)
    expect(onlineCheckbox.checked).toBe(true);
    expect(canvas.getByText(/Currently online/)).toBeInTheDocument();

    // Uncheck to go offline
    await userEvent.click(onlineCheckbox);
    expect(onlineCheckbox.checked).toBe(false);
    expect(canvas.getByText(/Offline/)).toBeInTheDocument();

    // Check again to go online
    await userEvent.click(onlineCheckbox);
    expect(onlineCheckbox.checked).toBe(true);
    expect(canvas.getByText(/Currently online/)).toBeInTheDocument();
  },
};

/**
 * Tests all text inputs work together.
 */
export const AllTextInputsTogether: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { firstNameInput, lastNameInput, onlineCheckbox } = getInputs(canvasElement);

    // Set text values
    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, 'Jane');

    await userEvent.clear(lastNameInput);
    await userEvent.type(lastNameInput, 'Smith');

    await userEvent.click(onlineCheckbox); // Toggle offline

    // Verify outputs updated
    expect(canvas.getByText(/Jane/)).toBeInTheDocument();
    expect(canvas.getByText(/Smith/)).toBeInTheDocument();
    expect(canvas.getByText(/Offline/)).toBeInTheDocument();
  },
};
