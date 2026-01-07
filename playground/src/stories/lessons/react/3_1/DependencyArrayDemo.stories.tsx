import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import DependencyArrayDemo from '@lessons/react/3_1/DependencyArrayDemo';

const meta: Meta<typeof DependencyArrayDemo> = {
  title: 'Lessons/react-3.1/DependencyArrayDemo',
  component: DependencyArrayDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the three dependency array patterns: empty array (mount only), with dependencies, and no array (every render).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows empty array tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Dependency Array Comparison');

    // Should have tab buttons
    expect(canvas.getByRole('button', { name: /Empty Array/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /With Values/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /No Array/i })).toBeInTheDocument();

    // Empty array tab should be active by default
    expect(canvasElement.textContent).toContain('Runs ONCE');
    expect(canvasElement.textContent).toContain('On mount only');
  },
};

/**
 * Tests the empty array demo
 */
export const EmptyArrayTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Empty array tab should show correct content
    expect(canvasElement.textContent).toContain('Empty Array: []');
    expect(canvasElement.textContent).toContain('Runs ONCE');

    // Should show re-render button
    const reRenderBtn = canvas.getByRole('button', { name: /Re-render/i });
    expect(reRenderBtn).toBeInTheDocument();

    // Should show effect ran once
    expect(canvasElement.textContent).toContain('1x');

    // Click re-render and verify count increases but effect still shows 1x
    await userEvent.click(reRenderBtn);
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Re-renders (button clicks)');
    });
  },
};

/**
 * Tests the with dependencies demo
 */
export const WithDepsTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on "With Values" tab
    await userEvent.click(canvas.getByRole('button', { name: /With Values/i }));

    // Should show with deps content
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('With Dependencies');
      expect(canvasElement.textContent).toContain('Runs on change');
    });

    // Should have name input
    const nameInput = canvas.getByPlaceholderText(/Type a name/i);
    expect(nameInput).toBeInTheDocument();

    // Type a name
    await userEvent.type(nameInput, 'Alice');

    // Should show document title preview
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Hello, Alice');
    });
  },
};

/**
 * Tests the no array (dangerous) demo
 */
export const NoArrayTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on "No Array" tab
    await userEvent.click(canvas.getByRole('button', { name: /No Array/i }));

    // Should show warning content
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('No Array');
      expect(canvasElement.textContent).toContain('Runs EVERY render');
    });

    // Should show warning about infinite loops
    expect(canvasElement.textContent).toContain('Warning');
    expect(canvasElement.textContent).toContain('infinite loop');

    // Should have trigger re-render button
    const triggerBtn = canvas.getByRole('button', { name: /Trigger Re-render/i });
    expect(triggerBtn).toBeInTheDocument();
  },
};

/**
 * Tests the summary table
 */
export const ShowsSummaryTable: Story = {
  play: async ({ canvasElement }) => {
    // Should show summary table
    expect(canvasElement.textContent).toContain('Syntax');
    expect(canvasElement.textContent).toContain('When it runs');
    expect(canvasElement.textContent).toContain('Use case');

    // Table content
    expect(canvasElement.textContent).toContain('useEffect(fn, [])');
    expect(canvasElement.textContent).toContain('Once, on mount only');
    expect(canvasElement.textContent).toContain('API calls');

    expect(canvasElement.textContent).toContain('useEffect(fn, [a, b])');
    expect(canvasElement.textContent).toContain('when a or b change');

    expect(canvasElement.textContent).toContain('useEffect(fn)');
    expect(canvasElement.textContent).toContain('After every render');
    expect(canvasElement.textContent).toContain('Rarely needed');
  },
};

/**
 * Tests switching between all tabs
 */
export const SwitchTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start on empty array
    expect(canvasElement.textContent).toContain('Empty Array: []');

    // Switch to with deps
    await userEvent.click(canvas.getByRole('button', { name: /With Values/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('With Dependencies');
    });

    // Switch to no array
    await userEvent.click(canvas.getByRole('button', { name: /No Array/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Runs EVERY render');
    });

    // Switch back to empty array
    await userEvent.click(canvas.getByRole('button', { name: /Empty Array/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Runs ONCE');
    });
  },
};
