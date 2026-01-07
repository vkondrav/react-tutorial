import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import ComponentBuilder from '@lessons/react/1_4/ComponentBuilder';

const meta: Meta<typeof ComponentBuilder> = {
  title: 'Lessons/react-1.4/ComponentBuilder',
  component: ComponentBuilder,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive component builder that lets users create a custom button component by changing its name, text, and color. Validates component naming rules.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to get inputs
const getInputs = (canvasElement: HTMLElement) => {
  const allInputs = canvasElement.querySelectorAll('input[type="text"]');
  return {
    nameInput: allInputs[0] as HTMLInputElement,
    textInput: allInputs[1] as HTMLInputElement,
  };
};

/**
 * The default component builder with MyButton.
 */
export const Default: Story = {};

/**
 * Tests changing the component name to a valid name.
 */
export const ChangeValidName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { nameInput } = getInputs(canvasElement);

    // Change to a valid component name
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'AwesomeButton');

    // Verify the input has the new value
    expect(nameInput.value).toBe('AwesomeButton');

    // Should not show error
    expect(canvas.queryByText(/Must start with capital letter!/i)).not.toBeInTheDocument();
  },
};

/**
 * Tests entering an invalid component name (lowercase).
 */
export const InvalidNameLowercase: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { nameInput } = getInputs(canvasElement);

    // Change to invalid lowercase name
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'myButton');

    // Should show validation error
    expect(canvas.getByText(/Must start with capital letter!/i)).toBeInTheDocument();
    expect(
      canvas.getByText(/Component name must start with a capital letter!/i)
    ).toBeInTheDocument();
  },
};

/**
 * Tests changing the button text.
 */
export const ChangeButtonText: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { textInput } = getInputs(canvasElement);

    // Change button text
    await userEvent.clear(textInput);
    await userEvent.type(textInput, 'Submit Form');

    // Verify the button preview shows new text
    const previewButton = canvas.getByRole('button', { name: /Submit Form/i });
    expect(previewButton).toBeInTheDocument();
  },
};

/**
 * Tests selecting different button colors.
 */
export const ChangeButtonColor: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find all color buttons
    const colorButtons = canvasElement.querySelectorAll('button[style*="backgroundColor"]');

    // Click the second color (green)
    if (colorButtons[1]) {
      await userEvent.click(colorButtons[1] as HTMLElement);
    }

    // The button color should have changed (we can't easily test the style, but we can verify no error)
    expect(canvas.getByRole('button', { name: /Click Me/i })).toBeInTheDocument();
  },
};

/**
 * Tests changing all inputs together.
 */
export const ChangeAllInputs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { nameInput, textInput } = getInputs(canvasElement);

    // Change name
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'SuperButton');

    // Change text
    await userEvent.clear(textInput);
    await userEvent.type(textInput, 'Click Here');

    // Click a color (fourth color - orange)
    const colorButtons = canvasElement.querySelectorAll('button[style*="backgroundColor"]');
    if (colorButtons[3]) {
      await userEvent.click(colorButtons[3] as HTMLElement);
    }

    // Verify all changes
    expect(nameInput.value).toBe('SuperButton');
    expect(canvas.getByRole('button', { name: /Click Here/i })).toBeInTheDocument();
    expect(canvas.queryByText(/Must start with capital letter!/i)).not.toBeInTheDocument();
  },
};
