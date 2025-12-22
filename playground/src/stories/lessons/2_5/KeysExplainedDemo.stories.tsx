import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import KeysExplainedDemo from '@lessons/2_5/KeysExplainedDemo';

const meta: Meta<typeof KeysExplainedDemo> = {
  title: 'Lessons/2.5 Lists & Keys/KeysExplainedDemo',
  component: KeysExplainedDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates why keys matter in React - shows how keys help React track list items during add, remove, and reorder operations.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows initial items with keys
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show title
    expect(canvasElement.textContent).toContain('How Keys Help React');

    // Should show initial items
    expect(canvasElement.textContent).toContain('First Item');
    expect(canvasElement.textContent).toContain('Second Item');
    expect(canvasElement.textContent).toContain('Third Item');

    // Should show key values
    expect(canvasElement.textContent).toContain('key="a1"');
    expect(canvasElement.textContent).toContain('key="b2"');
    expect(canvasElement.textContent).toContain('key="c3"');

    // Should have control buttons
    expect(canvas.getByRole('button', { name: /Add to Start/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Add to End/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Remove First/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Move First to End/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
  },
};

/**
 * Tests adding item to start of list
 */
export const AddToStart: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Add to Start
    await userEvent.click(canvas.getByRole('button', { name: /Add to Start/i }));

    // Should now have 4 items
    expect(canvasElement.textContent).toContain('New Item');

    // New item should have a new key
    expect(canvasElement.textContent).toContain('key="new-');
  },
};

/**
 * Tests adding item to end of list
 */
export const AddToEnd: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Add to End
    await userEvent.click(canvas.getByRole('button', { name: /Add to End/i }));

    // Should now have 4 items with New Item at end
    expect(canvasElement.textContent).toContain('New Item');
  },
};

/**
 * Tests removing first item from list
 */
export const RemoveFirst: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Remove First
    await userEvent.click(canvas.getByRole('button', { name: /Remove First/i }));

    // First Item should be gone
    expect(canvasElement.textContent).not.toContain('First Item');
    expect(canvasElement.textContent).not.toContain('key="a1"');

    // Second and Third should still be there
    expect(canvasElement.textContent).toContain('Second Item');
    expect(canvasElement.textContent).toContain('Third Item');
  },
};

/**
 * Tests moving first item to end
 */
export const MoveFirstToEnd: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Move First to End
    await userEvent.click(canvas.getByRole('button', { name: /Move First to End/i }));

    // All items should still exist
    expect(canvasElement.textContent).toContain('First Item');
    expect(canvasElement.textContent).toContain('Second Item');
    expect(canvasElement.textContent).toContain('Third Item');
  },
};

/**
 * Tests reset functionality
 */
export const ResetList: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Make some changes
    await userEvent.click(canvas.getByRole('button', { name: /Add to Start/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Remove First/i }));

    // Reset
    await userEvent.click(canvas.getByRole('button', { name: /Reset/i }));

    // Should be back to original state
    expect(canvasElement.textContent).toContain('First Item');
    expect(canvasElement.textContent).toContain('key="a1"');
    expect(canvasElement.textContent).toContain('Second Item');
    expect(canvasElement.textContent).toContain('key="b2"');
    expect(canvasElement.textContent).toContain('Third Item');
    expect(canvasElement.textContent).toContain('key="c3"');
  },
};

/**
 * Shows good and bad keys sections
 */
export const ShowsKeyGuidance: Story = {
  play: async ({ canvasElement }) => {
    // Should show Good Keys section
    expect(canvasElement.textContent).toContain('Good Keys');
    expect(canvasElement.textContent).toContain('Database IDs');
    expect(canvasElement.textContent).toContain('Unique identifiers');
    expect(canvasElement.textContent).toContain('Natural unique values');

    // Should show Bad Keys section
    expect(canvasElement.textContent).toContain('Bad Keys');
    expect(canvasElement.textContent).toContain('Array index');
    expect(canvasElement.textContent).toContain('Random values');
    expect(canvasElement.textContent).toContain('Non-unique');

    // Should show explanation
    expect(canvasElement.textContent).toContain('Why does this matter?');
  },
};

/**
 * Tests removing all items shows empty state
 */
export const EmptyList: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Remove all items
    await userEvent.click(canvas.getByRole('button', { name: /Remove First/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Remove First/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Remove First/i }));

    // Should show empty message
    expect(canvasElement.textContent).toContain('No items');
    expect(canvasElement.textContent).toContain('Add');
  },
};
