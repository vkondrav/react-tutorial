import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import KeyMistakesDemo from '@lessons/2_5/KeyMistakesDemo';

const meta: Meta<typeof KeyMistakesDemo> = {
  title: 'Lessons/2.5/KeyMistakesDemo',
  component: KeyMistakesDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive comparison of using index vs ID as key - demonstrates why index keys cause bugs with stateful list items.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows both lists side by side
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show experiment instructions
    expect(canvasElement.textContent).toContain('Try this experiment');
    expect(canvasElement.textContent).toContain('Type something in the input fields');
    expect(canvasElement.textContent).toContain('Add to Start');

    // Should show both comparison sections
    expect(canvasElement.textContent).toContain('Using Index as Key');
    expect(canvasElement.textContent).toContain('Using ID as Key');

    // Should show items
    expect(canvasElement.textContent).toContain('Item A');
    expect(canvasElement.textContent).toContain('Item B');
    expect(canvasElement.textContent).toContain('Item C');

    // Should have Add to Start buttons for both lists
    const addButtons = canvas.getAllByRole('button', { name: /Add to Start/i });
    expect(addButtons.length).toBe(2);

    // Should have input fields
    const inputs = canvas.getAllByPlaceholderText('Type here...');
    expect(inputs.length).toBe(6); // 3 items per list
  },
};

/**
 * Tests adding to bad key list (demonstrates the bug)
 */
export const AddToBadKeyList: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Type in the first input of the bad key list
    const inputs = canvas.getAllByPlaceholderText('Type here...');
    await userEvent.type(inputs[0], 'test value');

    // Add item to start of bad key list
    const addButtons = canvas.getAllByRole('button', { name: /Add to Start/i });
    await userEvent.click(addButtons[0]);

    // The input value will now appear to be on the wrong item (this is the bug!)
    // The new Item D should appear
    expect(canvasElement.textContent).toContain('Item D');
  },
};

/**
 * Tests adding to good key list (shows correct behavior)
 */
export const AddToGoodKeyList: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Type in the first input of the good key list (4th input, index 3)
    const inputs = canvas.getAllByPlaceholderText('Type here...');
    await userEvent.type(inputs[3], 'test value');

    // Add item to start of good key list
    const addButtons = canvas.getAllByRole('button', { name: /Add to Start/i });
    await userEvent.click(addButtons[1]);

    // The new Item D should appear
    expect(canvasElement.textContent).toContain('Item D');

    // Input values stay with their items (correct behavior)
    const updatedInputs = canvas.getAllByPlaceholderText('Type here...');
    expect(updatedInputs.length).toBe(7); // Now 4 items in good list, 3 in bad list
  },
};

/**
 * Tests removing items from lists
 */
export const RemoveItems: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all delete buttons (should be 6 - 3 per list)
    const deleteButtons = canvas.getAllByRole('button', { name: '' });
    // Filter to just the X buttons in the list items
    const xButtons = deleteButtons.filter(
      (btn) => btn.querySelector('svg') && btn.className.includes('error')
    );

    // Remove first item from bad key list
    if (xButtons.length > 0) {
      await userEvent.click(xButtons[0]);
    }

    // Should now have fewer items in bad key list
    const inputs = canvas.getAllByPlaceholderText('Type here...');
    expect(inputs.length).toBe(5); // 2 in bad list, 3 in good list
  },
};

/**
 * Tests reset functionality
 */
export const ResetBothLists: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Add items to both lists
    const addButtons = canvas.getAllByRole('button', { name: /Add to Start/i });
    await userEvent.click(addButtons[0]);
    await userEvent.click(addButtons[1]);

    // Reset
    await userEvent.click(canvas.getByRole('button', { name: /Reset Both Lists/i }));

    // Should be back to 3 items per list
    const inputs = canvas.getAllByPlaceholderText('Type here...');
    expect(inputs.length).toBe(6);
  },
};

/**
 * Shows when index is acceptable guidance
 */
export const ShowsIndexAcceptableGuidance: Story = {
  play: async ({ canvasElement }) => {
    // Should show when index is acceptable
    expect(canvasElement.textContent).toContain('When is index as key acceptable?');
    expect(canvasElement.textContent).toContain('static');
    expect(canvasElement.textContent).toContain('no unique ID');
    expect(canvasElement.textContent).toContain('no state');
    expect(canvasElement.textContent).toContain('When in doubt, use a unique ID');
  },
};

/**
 * Shows warning messages for each list type
 */
export const ShowsWarnings: Story = {
  play: async ({ canvasElement }) => {
    // Should show warning for bad keys
    expect(canvasElement.textContent).toContain('Input values get "stuck" to wrong items');

    // Should show success message for good keys
    expect(canvasElement.textContent).toContain('Input values stay with their items');
  },
};
