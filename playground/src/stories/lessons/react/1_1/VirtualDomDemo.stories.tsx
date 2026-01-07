import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import VirtualDomDemo from '@lessons/react/1_1/VirtualDomDemo';

const meta: Meta<typeof VirtualDomDemo> = {
  title: 'Lessons/react-1.1/VirtualDomDemo',
  component: VirtualDomDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "An interactive demo illustrating React's Virtual DOM concept. As you type, React efficiently updates only the parts of the DOM that changed, shown by the update counter.",
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to get the DOM updates counter value
const getUpdatesCount = (canvasElement: HTMLElement): string => {
  const updatesContainer = canvasElement.querySelector('.text-success');
  return updatesContainer?.textContent || '0';
};

// Helper to get the greeting name (the colored span in the greeting)
const getGreetingName = (canvasElement: HTMLElement): string => {
  const nameSpan = canvasElement.querySelector('.text-primary.font-semibold');
  return nameSpan?.textContent || '';
};

/**
 * The default Virtual DOM demo. Type in the input field
 * to see the efficient DOM updates in action.
 */
export const Default: Story = {};

/**
 * Tests typing in the input updates the greeting.
 */
export const TypeName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initial greeting shows "World"
    expect(getGreetingName(canvasElement)).toBe('World');

    // Find the input
    const input = canvas.getByPlaceholderText('Type your name');
    expect(input).toHaveValue('World');

    // Clear and type a new name
    await userEvent.clear(input);
    await userEvent.type(input, 'React');

    // Greeting should update
    expect(getGreetingName(canvasElement)).toBe('React');
  },
};

/**
 * Tests that DOM updates counter increases with each keystroke.
 */
export const CountsDomUpdates: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initial update count is 0
    expect(getUpdatesCount(canvasElement)).toBe('0');

    const input = canvas.getByPlaceholderText('Type your name');

    // Type a single character
    await userEvent.type(input, 'X');

    // Updates should have increased by 1
    expect(getUpdatesCount(canvasElement)).toBe('1');
  },
};

/**
 * Tests empty input shows ellipsis placeholder.
 */
export const EmptyInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText('Type your name');

    // Clear the input
    await userEvent.clear(input);

    // Should show "..." when empty
    expect(getGreetingName(canvasElement)).toBe('...');
  },
};

/**
 * The demo with a custom initial placeholder.
 */
export const WithContext: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <div className="mb-4 p-4 bg-info/20 rounded-lg border border-info/50">
          <p className="text-sm text-info-content">
            💡 <strong>Try it:</strong> Type in the input below and watch the DOM update counter.
            React only updates the text that changed!
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};
