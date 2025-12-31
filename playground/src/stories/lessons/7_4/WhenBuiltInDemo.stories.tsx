import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import WhenBuiltInDemo from '@lessons/7_4/WhenBuiltInDemo';

const meta: Meta<typeof WhenBuiltInDemo> = {
  title: 'Lessons/7.4/WhenBuiltInDemo',
  component: WhenBuiltInDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates when built-in state (useState, useReducer, Context) is sufficient with scenarios and code examples.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows golden rule and scenarios tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show golden rule
    expect(canvas.getByText('The Golden Rule')).toBeInTheDocument();
    expect(canvas.getByText(/Start with built-in state/)).toBeInTheDocument();

    // Should show tab buttons
    expect(canvas.getByRole('button', { name: 'Common Scenarios' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Code Examples/i })).toBeInTheDocument();
  },
};

/**
 * Scenarios are displayed with recommendations
 */
export const ScenariosDisplay: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show various scenarios
    expect(canvas.getByText('Form with multiple fields')).toBeInTheDocument();
    expect(canvas.getByText('Todo list with CRUD')).toBeInTheDocument();
    expect(canvas.getByText('App-wide theme toggle')).toBeInTheDocument();
    expect(canvas.getByText('Shopping cart (medium app)')).toBeInTheDocument();

    // Should show recommendation badges
    const useStateBadges = canvas.getAllByText('useState');
    expect(useStateBadges.length).toBeGreaterThan(0);

    const useReducerBadges = canvas.getAllByText('useReducer');
    expect(useReducerBadges.length).toBeGreaterThan(0);

    const contextBadges = canvas.getAllByText('Context + Reducer');
    expect(contextBadges.length).toBeGreaterThan(0);
  },
};

/**
 * Switch to Code Examples tab
 */
export const CodeExamplesTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Code Examples tab
    await user.click(canvas.getByRole('button', { name: /Code Examples/i }));

    // Should show code tab buttons
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'useState' })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: 'useReducer' })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: 'Context + Reducer' })).toBeInTheDocument();
    });

    // Should show useState code by default
    expect(canvas.getByText('useState - Simple & local')).toBeInTheDocument();
  },
};

/**
 * Switch between code examples
 */
export const SwitchCodeExamples: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Code Examples tab
    await user.click(canvas.getByRole('button', { name: /Code Examples/i }));

    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'useReducer' })).toBeInTheDocument();
    });

    // Click useReducer
    await user.click(canvas.getByRole('button', { name: 'useReducer' }));

    // Should show useReducer code
    await waitFor(() => {
      expect(canvas.getByText('useReducer - Complex transitions')).toBeInTheDocument();
    });

    // Click Context + Reducer
    await user.click(canvas.getByRole('button', { name: 'Context + Reducer' }));

    // Should show context code
    await waitFor(() => {
      expect(canvas.getByText('Context + Reducer - Global state')).toBeInTheDocument();
    });
  },
};

/**
 * Quick reference table is shown
 */
export const QuickReferenceTable: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show quick reference
    expect(canvas.getByText('Quick Reference')).toBeInTheDocument();

    // Should show table headers
    expect(canvas.getByText('Tool')).toBeInTheDocument();
    expect(canvas.getByText('Best For')).toBeInTheDocument();
    expect(canvas.getByText('Scope')).toBeInTheDocument();

    // Should show scope values
    expect(canvas.getAllByText('Component-local').length).toBe(2);
    expect(canvas.getByText('Global / subtree')).toBeInTheDocument();
  },
};
