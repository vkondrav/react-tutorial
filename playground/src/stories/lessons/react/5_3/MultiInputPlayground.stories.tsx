import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import MultiInputPlayground from '@lessons/react/5_3/MultiInputPlayground';

const meta: Meta<typeof MultiInputPlayground> = {
  title: 'Lessons/react-5.3/MultiInputPlayground',
  component: MultiInputPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Complete contact form playground with multiple inputs, dynamic phone fields, nested preferences, and validation.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows empty form
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify form fields are present
    expect(canvas.getByPlaceholderText('John')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('Doe')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('john@example.com')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('Acme Inc.')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('How can we help?')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('Tell us more...')).toBeInTheDocument();

    // Verify buttons
    expect(canvas.getByRole('button', { name: 'Fill Required Fields' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  },
};

/**
 * Tests filling name fields
 */
export const FillNames: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByPlaceholderText('John'), 'Alice');
    await userEvent.type(canvas.getByPlaceholderText('Doe'), 'Johnson');

    expect(canvas.getByPlaceholderText('John')).toHaveValue('Alice');
    expect(canvas.getByPlaceholderText('Doe')).toHaveValue('Johnson');
  },
};

/**
 * Tests adding phone numbers
 */
export const AddPhoneNumbers: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have one phone field initially
    let phoneInputs = canvas.getAllByPlaceholderText('555-1234');
    expect(phoneInputs.length).toBe(1);

    // Click Add button
    await userEvent.click(canvas.getByRole('button', { name: 'Add' }));

    // Should now have two phone fields
    await waitFor(() => {
      phoneInputs = canvas.getAllByPlaceholderText('555-1234');
      expect(phoneInputs.length).toBe(2);
    });

    // Type in first phone
    await userEvent.type(phoneInputs[0], '123-456-7890');
    expect(phoneInputs[0]).toHaveValue('123-456-7890');
  },
};

/**
 * Tests removing phone numbers
 */
export const RemovePhoneNumbers: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Add a second phone
    await userEvent.click(canvas.getByRole('button', { name: 'Add' }));

    await waitFor(() => {
      const phoneInputs = canvas.getAllByPlaceholderText('555-1234');
      expect(phoneInputs.length).toBe(2);
    });

    // Find remove buttons (X icon buttons in phone section) - there should be 2 now
    const removeButtons = canvasElement.querySelectorAll('button.text-error');
    expect(removeButtons.length).toBe(2);

    await userEvent.click(removeButtons[0]);

    // Should be back to one phone
    await waitFor(() => {
      const phoneInputs = canvas.getAllByPlaceholderText('555-1234');
      expect(phoneInputs.length).toBe(1);
    });
  },
};

/**
 * Tests priority dropdown
 */
export const ChangePriority: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the priority select (it's the second combobox, after phone type)
    const selects = canvas.getAllByRole('combobox');
    const prioritySelect = selects[1]; // Phone type is first

    expect(prioritySelect).toHaveValue('normal');

    await userEvent.selectOptions(prioritySelect, 'urgent');
    expect(prioritySelect).toHaveValue('urgent');
  },
};

/**
 * Tests communication preferences checkboxes
 */
export const TogglePreferences: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find preference checkboxes
    const newsletterCheckbox = canvas.getByRole('checkbox', { name: 'Newsletter' });
    const updatesCheckbox = canvas.getByRole('checkbox', { name: 'Product Updates' });
    const marketingCheckbox = canvas.getByRole('checkbox', { name: 'Marketing' });

    // Newsletter is checked by default
    expect(newsletterCheckbox).toBeChecked();
    expect(updatesCheckbox).not.toBeChecked();
    expect(marketingCheckbox).not.toBeChecked();

    // Toggle preferences
    await userEvent.click(newsletterCheckbox); // Uncheck
    await userEvent.click(updatesCheckbox); // Check
    await userEvent.click(marketingCheckbox); // Check

    expect(newsletterCheckbox).not.toBeChecked();
    expect(updatesCheckbox).toBeChecked();
    expect(marketingCheckbox).toBeChecked();
  },
};

/**
 * Tests message character counter
 */
export const MessageCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Type a message
    const messageInput = canvas.getByPlaceholderText('Tell us more...');
    await userEvent.type(messageInput, 'Hello, I need help.');

    // Verify the message was typed
    expect(messageInput).toHaveValue('Hello, I need help.');
    expect(messageInput.value.length).toBe(19);
  },
};

/**
 * Tests submit button state
 */
export const SubmitButtonState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Button should show "Fill Required Fields" when invalid
    expect(canvas.getByRole('button', { name: 'Fill Required Fields' })).toBeDisabled();

    // Fill all required fields
    await userEvent.type(canvas.getByPlaceholderText('John'), 'Alice');
    await userEvent.type(canvas.getByPlaceholderText('Doe'), 'Johnson');
    await userEvent.type(canvas.getByPlaceholderText('john@example.com'), 'alice@test.com');
    await userEvent.type(canvas.getByPlaceholderText('How can we help?'), 'Question');
    await userEvent.type(canvas.getByPlaceholderText('Tell us more...'), 'I need help.');

    // Button should now show "Send Message"
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Send Message' })).toBeEnabled();
    });
  },
};

/**
 * Tests form submission
 */
export const SubmitForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill required fields
    await userEvent.type(canvas.getByPlaceholderText('John'), 'Bob');
    await userEvent.type(canvas.getByPlaceholderText('Doe'), 'Smith');
    await userEvent.type(canvas.getByPlaceholderText('john@example.com'), 'bob@test.com');
    await userEvent.type(canvas.getByPlaceholderText('How can we help?'), 'Hello');
    await userEvent.type(canvas.getByPlaceholderText('Tell us more...'), 'Test message');

    // Submit
    await userEvent.click(canvas.getByRole('button', { name: 'Send Message' }));

    // Should show success
    await waitFor(() => {
      expect(canvas.getByText('Message Sent!')).toBeInTheDocument();
      expect(canvas.getByText(/Thanks Bob!/)).toBeInTheDocument();
    });

    // Send Another button should be present
    expect(canvas.getByRole('button', { name: 'Send Another' })).toBeInTheDocument();
  },
};

/**
 * Tests reset form
 */
export const ResetForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill some fields
    const firstNameInput = canvas.getByPlaceholderText('John');
    const emailInput = canvas.getByPlaceholderText('john@example.com');

    await userEvent.type(firstNameInput, 'Test');
    await userEvent.type(emailInput, 'test@email.com');

    expect(firstNameInput).toHaveValue('Test');
    expect(emailInput).toHaveValue('test@email.com');

    // Click Reset
    await userEvent.click(canvas.getByRole('button', { name: 'Reset' }));

    // Fields should be cleared
    await waitFor(() => {
      expect(firstNameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
    });
  },
};

/**
 * Tests form state debug panel
 */
export const DebugPanel: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Expand the debug panel
    const details = canvas.getByText('View Form State (Debug)');
    await userEvent.click(details);

    // The panel should now be open - verify the collapse content is visible
    await waitFor(() => {
      // Look for structure that indicates JSON is displayed
      const codeBlock = canvasElement.querySelector('.collapse-content pre');
      expect(codeBlock).toBeInTheDocument();
    });
  },
};
