import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import InputTypesDemo from '@lessons/5_1/InputTypesDemo';

const meta: Meta<typeof InputTypesDemo> = {
  title: 'Lessons/5.1 Controlled Components/InputTypesDemo',
  component: InputTypesDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates how to control different input types: text, textarea, select, checkbox, and radio buttons.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows Text input tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify tab buttons are present
    expect(canvas.getByRole('button', { name: 'Text' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Textarea' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Select' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Checkbox' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Radio' })).toBeInTheDocument();

    // Text tab should be selected by default
    const textButton = canvas.getByRole('button', { name: 'Text' });
    expect(textButton).toHaveClass('btn-primary');

    // Verify text input is shown
    expect(canvas.getByText('Text Input')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('Enter text...')).toBeInTheDocument();
  },
};

/**
 * Tests the text input interaction
 */
export const TextInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Type in the text input
    const input = canvas.getByPlaceholderText('Enter text...');
    await userEvent.type(input, 'Hello World');

    // Verify state updates
    await waitFor(() => {
      expect(canvas.getByText('"Hello World"')).toBeInTheDocument();
    });
  },
};

/**
 * Tests the textarea input
 */
export const TextareaInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Textarea tab
    await userEvent.click(canvas.getByRole('button', { name: 'Textarea' }));

    // Verify textarea element is shown
    await waitFor(() => {
      expect(canvas.getByPlaceholderText('Enter multiple lines...')).toBeInTheDocument();
    });

    // Type in the textarea
    const textarea = canvas.getByPlaceholderText('Enter multiple lines...');
    await userEvent.type(textarea, 'Line 1');

    // Verify state updates
    await waitFor(() => {
      expect(canvas.getByText(/"Line 1"/)).toBeInTheDocument();
    });
  },
};

/**
 * Tests the select dropdown
 */
export const SelectDropdown: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Select tab
    await userEvent.click(canvas.getByRole('button', { name: 'Select' }));

    // Verify select is shown
    await waitFor(() => {
      expect(canvas.getByText('Select Dropdown')).toBeInTheDocument();
    });

    // Select an option
    const select = canvas.getByRole('combobox');
    await userEvent.selectOptions(select, 'react');

    // Verify state updates
    await waitFor(() => {
      expect(canvas.getByText('"react"')).toBeInTheDocument();
    });
  },
};

/**
 * Tests the checkbox input
 */
export const CheckboxInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Checkbox tab
    await userEvent.click(canvas.getByRole('button', { name: 'Checkbox' }));

    // Verify checkbox is shown
    await waitFor(() => {
      expect(canvas.getByText('I agree to the terms')).toBeInTheDocument();
    });

    // Click the checkbox to toggle
    const checkbox = canvas.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);

    // Verify checkbox is now checked
    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  },
};

/**
 * Tests the radio buttons
 */
export const RadioButtons: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Radio tab
    await userEvent.click(canvas.getByRole('button', { name: 'Radio' }));

    // Verify radio buttons are shown
    await waitFor(() => {
      expect(canvas.getByText('Choose your plan:')).toBeInTheDocument();
    });

    // Initial state should be empty
    expect(canvas.getByText('""')).toBeInTheDocument();

    // Click the Pro radio
    const proRadio = canvas.getByRole('radio', { name: 'pro' });
    await userEvent.click(proRadio);

    // Verify state updates
    await waitFor(() => {
      expect(canvas.getByText('"pro"')).toBeInTheDocument();
    });
  },
};

/**
 * Tests switching between all tabs
 */
export const SwitchTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start at Text (default)
    expect(canvas.getByRole('button', { name: 'Text' })).toHaveClass('btn-primary');

    // Switch to each tab
    await userEvent.click(canvas.getByRole('button', { name: 'Textarea' }));
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Textarea' })).toHaveClass('btn-secondary');
    });

    await userEvent.click(canvas.getByRole('button', { name: 'Select' }));
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Select' })).toHaveClass('btn-accent');
    });

    await userEvent.click(canvas.getByRole('button', { name: 'Checkbox' }));
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Checkbox' })).toHaveClass('btn-success');
    });

    await userEvent.click(canvas.getByRole('button', { name: 'Radio' }));
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Radio' })).toHaveClass('btn-warning');
    });
  },
};
