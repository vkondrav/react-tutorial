import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import EventTypesDemo from '@lessons/react/2_3/EventTypesDemo';

const meta: Meta<typeof EventTypesDemo> = {
  title: 'Lessons/react-2.3/EventTypesDemo',
  component: EventTypesDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Demonstrates common event types: onChange, onSubmit, onMouseMove, etc.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing event type examples
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show input fields
    expect(canvas.getByPlaceholderText(/Type something/i)).toBeInTheDocument();

    // Should show select dropdown
    expect(canvas.getByRole('combobox')).toBeInTheDocument();

    // Should show checkbox
    expect(canvas.getByRole('checkbox')).toBeInTheDocument();

    // Should show common event types reference
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('onClick');
    expect(bodyText).toContain('onChange');
    expect(bodyText).toContain('onSubmit');
  },
};

/**
 * Tests text input onChange event
 */
export const TextInputChange: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText(/Type something/i);
    await userEvent.type(input, 'Hello React');

    // Should show the typed value
    expect(input).toHaveValue('Hello React');
    expect(canvasElement.textContent).toContain('"Hello React"');
  },
};

/**
 * Tests select dropdown onChange event
 */
export const SelectChange: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByRole('combobox');

    // Select Option 2
    await userEvent.selectOptions(select, 'option2');

    // Should show selected value
    expect(select).toHaveValue('option2');
    expect(canvasElement.textContent).toContain('option2');
  },
};

/**
 * Tests checkbox onChange event
 */
export const CheckboxChange: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const checkbox = canvas.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    // Check the checkbox
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(canvasElement.textContent).toContain('true');

    // Uncheck it
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(canvasElement.textContent).toContain('false');
  },
};

/**
 * Tests form submission with preventDefault
 */
export const FormSubmit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the form submit button
    const submitButton = canvas.getByRole('button', { name: /Submit/i });
    await userEvent.click(submitButton);

    // Should show success message
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Form submitted');
      expect(canvasElement.textContent).toContain('preventDefault');
    });
  },
};

/**
 * Tests mouse move event (hover area)
 */
export const MouseMoveArea: Story = {
  play: async ({ canvasElement }) => {
    // Should show mouse position display
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('onMouseMove');
    expect(bodyText).toContain('X:');
    expect(bodyText).toContain('Y:');
  },
};
