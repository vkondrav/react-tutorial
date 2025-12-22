import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import PatternComparisonDemo from '@lessons/2_4/PatternComparisonDemo';

const meta: Meta<typeof PatternComparisonDemo> = {
  title: 'Lessons/2.4 Conditional Rendering/PatternComparisonDemo',
  component: PatternComparisonDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Side-by-side comparison of different conditional rendering patterns: ternary, &&, early return, and variable.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with ternary pattern selected
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Ternary should be selected by default
    expect(canvas.getByRole('button', { name: /Ternary/i })).toBeInTheDocument();

    // Should show "Data Loaded!" in preview
    expect(canvasElement.textContent).toContain('Data Loaded!');

    // Should show pattern tips
    expect(canvasElement.textContent).toContain('Best for simple either/or');
  },
};

/**
 * Tests switching between all patterns
 */
export const SwitchPatterns: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Logical &&
    await userEvent.click(canvas.getByRole('button', { name: /Logical &&/i }));
    expect(canvasElement.textContent).toContain('show/hide one thing');

    // Switch to Early Return
    await userEvent.click(canvas.getByRole('button', { name: /Early Return/i }));
    expect(canvasElement.textContent).toContain('happy path');

    // Switch to Variable
    await userEvent.click(canvas.getByRole('button', { name: /Variable/i }));
    expect(canvasElement.textContent).toContain('logic is complex');
  },
};

/**
 * Tests the simulate load functionality
 */
export const SimulateLoad: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Simulate Load
    await userEvent.click(canvas.getByRole('button', { name: /Simulate Load/i }));

    // Should show loading spinner
    expect(canvasElement.textContent).toContain('Loading...');

    // Wait for loading to complete (1.5 seconds)
    await waitFor(
      () => {
        expect(canvasElement.textContent).toContain('Data Loaded!');
      },
      { timeout: 2000 }
    );
  },
};

/**
 * Tests toggling data state
 */
export const ToggleDataState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Toggle to "No Data"
    await userEvent.click(canvas.getByRole('button', { name: /Has Data/i }));

    // Should show empty state
    expect(canvasElement.textContent).toContain('No data available');

    // Toggle back
    await userEvent.click(canvas.getByRole('button', { name: /No Data/i }));
    expect(canvasElement.textContent).toContain('Data Loaded!');
  },
};

/**
 * Tests error state toggle
 */
export const ToggleErrorState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Toggle error on
    await userEvent.click(canvas.getByRole('button', { name: /No Error/i }));

    // Should show error state
    expect(canvasElement.textContent).toContain('Error Loading Data');
    expect(canvasElement.textContent).toContain('Please try again');

    // Toggle error off
    await userEvent.click(canvas.getByRole('button', { name: /^Error$/i }));
    expect(canvasElement.textContent).toContain('Data Loaded!');
  },
};

/**
 * Shows all pattern tip cards
 */
export const ShowsPatternTips: Story = {
  play: async ({ canvasElement }) => {
    // Should show all 4 pattern tips
    expect(canvasElement.textContent).toContain('Ternary ?:');
    expect(canvasElement.textContent).toContain('Logical &&');
    expect(canvasElement.textContent).toContain('Early Return');
    expect(canvasElement.textContent).toContain('Variable');

    // Each should have description
    expect(canvasElement.textContent).toContain('Avoid nesting more than 2 deep');
    expect(canvasElement.textContent).toContain('Watch out for 0 gotcha');
    expect(canvasElement.textContent).toContain('Keeps "happy path" clean');
    expect(canvasElement.textContent).toContain('Extract logic from JSX');
  },
};
