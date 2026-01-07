import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import ContextBasicsDemo from '@lessons/react/3_2/ContextBasicsDemo';

const meta: Meta<typeof ContextBasicsDemo> = {
  title: 'Lessons/react-3.2/ContextBasicsDemo',
  component: ContextBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Shows the three steps to use Context: createContext, Provider, useContext. Demonstrates how DeepComponent gets data without prop drilling.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows context in action
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Context in Action');

    // Should show Provider wrapper
    expect(canvasElement.textContent).toContain('Provider');
    expect(canvasElement.textContent).toContain('UserContext.Provider');

    // Should show components that don't need props
    expect(canvasElement.textContent).toContain('OuterComponent');
    expect(canvasElement.textContent).toContain('MiddleComponent');
    expect(canvasElement.textContent).toContain('no props needed');

    // Should show DeepComponent using context
    expect(canvasElement.textContent).toContain('DeepComponent');
    expect(canvasElement.textContent).toContain('useContext');

    // Should have code toggle button
    expect(canvas.getByRole('button', { name: /Show Code/i })).toBeInTheDocument();
  },
};

/**
 * Tests that user data is displayed correctly
 */
export const ShowsUserData: Story = {
  play: async ({ canvasElement }) => {
    // Should show user info from context
    expect(canvasElement.textContent).toContain('Alex Rivera');
    expect(canvasElement.textContent).toContain('Admin');
  },
};

/**
 * Tests toggling code visibility
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Code should be hidden initially
    expect(canvas.getByRole('button', { name: /Show Code/i })).toBeInTheDocument();

    // Click to show code
    await userEvent.click(canvas.getByRole('button', { name: /Show Code/i }));

    // Should show all three steps
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Step 1');
      expect(canvasElement.textContent).toContain('Create the Context');
      expect(canvasElement.textContent).toContain('Step 2');
      expect(canvasElement.textContent).toContain('Wrap with Provider');
      expect(canvasElement.textContent).toContain('Step 3');
      expect(canvasElement.textContent).toContain('Consume with useContext');
    });

    // Button should say "Hide Code"
    expect(canvas.getByRole('button', { name: /Hide Code/i })).toBeInTheDocument();

    // Click to hide code
    await userEvent.click(canvas.getByRole('button', { name: /Hide Code/i }));
    expect(canvas.getByRole('button', { name: /Show Code/i })).toBeInTheDocument();
  },
};

/**
 * Tests success message
 */
export const ShowsSuccessMessage: Story = {
  play: async ({ canvasElement }) => {
    // Should show success message
    expect(canvasElement.textContent).toContain('No Prop Drilling');
    expect(canvasElement.textContent).toContain('DeepComponent gets the user directly');
    expect(canvasElement.textContent).toContain("Middle components don't need to know");
  },
};
