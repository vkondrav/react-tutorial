import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import EffectBasicsDemo from '@lessons/3_1/EffectBasicsDemo';

const meta: Meta<typeof EffectBasicsDemo> = {
  title: 'Lessons/3.1/EffectBasicsDemo',
  component: EffectBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Introduction to useEffect - shows a counter that syncs with document title as a side effect.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows counter and effect status
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Basic useEffect Example');

    // Should show initial count
    expect(canvasElement.textContent).toContain('Current count:');
    expect(canvasElement.textContent).toContain('0');

    // Should have buttons
    expect(canvas.getByRole('button', { name: /Increment/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Reset/i })).toBeInTheDocument();

    // Should show effect status
    expect(canvasElement.textContent).toContain('Effect Status');
    expect(canvasElement.textContent).toContain('Document title synced');

    // Should have code toggle
    expect(canvas.getByRole('button', { name: /Show Code/i })).toBeInTheDocument();
  },
};

/**
 * Tests incrementing the counter
 */
export const IncrementCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initial count should be 0
    expect(canvasElement.textContent).toContain('Count: 0');

    // Click increment
    await userEvent.click(canvas.getByRole('button', { name: /Increment/i }));

    // Count should increase
    expect(canvasElement.textContent).toContain('Count: 1');

    // Click again
    await userEvent.click(canvas.getByRole('button', { name: /Increment/i }));
    expect(canvasElement.textContent).toContain('Count: 2');
  },
};

/**
 * Tests resetting the counter
 */
export const ResetCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Increment a few times
    await userEvent.click(canvas.getByRole('button', { name: /Increment/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Increment/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Increment/i }));
    expect(canvasElement.textContent).toContain('Count: 3');

    // Reset
    await userEvent.click(canvas.getByRole('button', { name: /Reset/i }));
    expect(canvasElement.textContent).toContain('Count: 0');
  },
};

/**
 * Tests toggling code visibility
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Code should be hidden initially
    const showButton = canvas.getByRole('button', { name: /Show Code/i });
    expect(showButton).toBeInTheDocument();

    // Click to show code
    await userEvent.click(showButton);

    // Button should say "Hide Code" now
    expect(canvas.getByRole('button', { name: /Hide Code/i })).toBeInTheDocument();

    // Click to hide code again
    await userEvent.click(canvas.getByRole('button', { name: /Hide Code/i }));
    expect(canvas.getByRole('button', { name: /Show Code/i })).toBeInTheDocument();
  },
};

/**
 * Shows useEffect structure explanation
 */
export const ShowsStructure: Story = {
  play: async ({ canvasElement }) => {
    // Should show useEffect structure
    expect(canvasElement.textContent).toContain('useEffect Structure');
    expect(canvasElement.textContent).toContain('Effect function');
    expect(canvasElement.textContent).toContain('dependencies');
    expect(canvasElement.textContent).toContain('When to re-run');
  },
};

/**
 * Shows tip about browser tab
 */
export const ShowsTip: Story = {
  play: async ({ canvasElement }) => {
    // Should show tip
    expect(canvasElement.textContent).toContain('Check your browser tab title');
    expect(canvasElement.textContent).toContain('useEffect');
  },
};
