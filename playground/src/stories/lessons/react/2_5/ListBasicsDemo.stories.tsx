import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import ListBasicsDemo from '@lessons/react/2_5/ListBasicsDemo';

const meta: Meta<typeof ListBasicsDemo> = {
  title: 'Lessons/react-2.5/ListBasicsDemo',
  component: ListBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Introduction to rendering lists with .map() - shows simple array and object array examples.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows simple array and object array examples
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show section titles
    expect(canvasElement.textContent).toContain('Simple Array → List');
    expect(canvasElement.textContent).toContain('Object Array → Cards');

    // Should show fruits list
    expect(canvasElement.textContent).toContain('Apple');
    expect(canvasElement.textContent).toContain('Banana');
    expect(canvasElement.textContent).toContain('Cherry');
    expect(canvasElement.textContent).toContain('Date');
    expect(canvasElement.textContent).toContain('Elderberry');

    // Should show users
    expect(canvasElement.textContent).toContain('Alice');
    expect(canvasElement.textContent).toContain('Developer');
    expect(canvasElement.textContent).toContain('Bob');
    expect(canvasElement.textContent).toContain('Designer');
    expect(canvasElement.textContent).toContain('Charlie');
    expect(canvasElement.textContent).toContain('Manager');

    // Should have code toggle button
    expect(canvas.getByRole('button', { name: /Hide Code/i })).toBeInTheDocument();
  },
};

/**
 * Tests toggling code visibility
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Code should be visible by default
    const hideButton = canvas.getByRole('button', { name: /Hide Code/i });
    expect(hideButton).toBeInTheDocument();

    // Should show code content
    expect(canvasElement.textContent).toContain('.map()');

    // Click to hide code
    await userEvent.click(hideButton);

    // Button should say "Show Code" now
    expect(canvas.getByRole('button', { name: /Show Code/i })).toBeInTheDocument();

    // Click to show code again
    await userEvent.click(canvas.getByRole('button', { name: /Show Code/i }));
    expect(canvas.getByRole('button', { name: /Hide Code/i })).toBeInTheDocument();
  },
};

/**
 * Shows tip about .map()
 */
export const ShowsTip: Story = {
  play: async ({ canvasElement }) => {
    // Should show tip
    expect(canvasElement.textContent).toContain('Remember');
    expect(canvasElement.textContent).toContain('.map()');
    expect(canvasElement.textContent).toContain('returns a new array');
    expect(canvasElement.textContent).toContain('key');
  },
};
