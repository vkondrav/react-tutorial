import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import HydrationDemo from '@lessons/react/8_1/HydrationDemo';

const meta: Meta<typeof HydrationDemo> = {
  title: 'Lessons/react-8.1/HydrationDemo',
  component: HydrationDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive simulation of React hydration process showing how buttons become interactive.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - ready to simulate
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show Simulate button
    expect(canvas.getByRole('button', { name: /Simulate Hydration/i })).toBeInTheDocument();

    // Should show Reset button
    expect(canvas.getByRole('button', { name: /Reset/i })).toBeInTheDocument();

    // Should show explanation sections
    expect(canvasElement.textContent).toContain('Before Hydration');
    expect(canvasElement.textContent).toContain('After Hydration');
  },
};

/**
 * Tests starting the simulation
 */
export const StartSimulation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Simulate button
    await userEvent.click(canvas.getByRole('button', { name: /Simulate Hydration/i }));

    // Button should change to "Simulating..."
    expect(canvas.getByRole('button', { name: /Simulating/i })).toBeInTheDocument();
  },
};

/**
 * Tests Reset button
 */
export const ResetSimulation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start simulation
    await userEvent.click(canvas.getByRole('button', { name: /Simulate Hydration/i }));

    // Reset
    await userEvent.click(canvas.getByRole('button', { name: /Reset/i }));

    // Should be back to initial state
    expect(canvas.getByRole('button', { name: /Simulate Hydration/i })).toBeInTheDocument();
  },
};

/**
 * Verifies browser simulation UI elements
 */
export const ShowsBrowserSimulation: Story = {
  play: async ({ canvasElement }) => {
    // Should show browser chrome
    expect(canvasElement.textContent).toContain('myapp.com/dashboard');

    // Should show dashboard title
    expect(canvasElement.textContent).toContain('Welcome to the Dashboard');

    // Should show three buttons
    expect(canvasElement.textContent).toContain('Button 1');
    expect(canvasElement.textContent).toContain('Button 2');
    expect(canvasElement.textContent).toContain('Button 3');
  },
};

/**
 * Tests clicking buttons before hydration (should be ignored)
 */
export const ClickBeforeHydration: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click one of the disabled buttons
    const buttons = canvas.getAllByRole('button');
    // Button 1, 2, 3 should be after Simulate and Reset
    const button1 = buttons.find((b) => b.textContent?.includes('Button 1'));
    if (button1) {
      await userEvent.click(button1);
    }

    // No click count should show (button is inactive)
    // The button text should still be "Button 1" not "Clicked: X"
    expect(canvasElement.textContent).toContain('Button 1');
  },
};
