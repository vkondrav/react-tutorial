import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import CommonHooksDemo from '@lessons/react/3_5/CommonHooksDemo';

const meta: Meta<typeof CommonHooksDemo> = {
  title: 'Lessons/react-3.5/CommonHooksDemo',
  component: CommonHooksDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates common custom hook patterns: useToggle, useLocalStorage, and useDebounce.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - useToggle tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Common Hook Patterns');

    // Should have all tabs
    expect(canvas.getByRole('button', { name: /useToggle/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /useLocalStorage/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /useDebounce/i })).toBeInTheDocument();

    // Toggle tab should be active by default
    expect(canvasElement.textContent).toContain('Simple Toggle');
    expect(canvasElement.textContent).toContain('Dark Mode Toggle');
  },
};

/**
 * Tests useToggle demo
 */
export const UseToggleDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initial state should be OFF
    expect(canvasElement.textContent).toContain('OFF');

    // Click Toggle button
    await userEvent.click(canvas.getByRole('button', { name: /^Toggle$/i }));

    // Should be ON now
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('ON');
    });

    // Click Off button
    await userEvent.click(canvas.getByRole('button', { name: /^Off$/i }));

    // Should be OFF again
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('OFF');
    });
  },
};

/**
 * Tests useLocalStorage demo
 */
export const UseLocalStorageDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to localStorage tab
    await userEvent.click(canvas.getByRole('button', { name: /useLocalStorage/i }));

    // Should show localStorage demo
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Stored Name');
      expect(canvasElement.textContent).toContain('Stored Count');
      expect(canvasElement.textContent).toContain('persist across page reloads');
    });

    // Should have name input
    expect(canvas.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();

    // Should have count controls
    expect(canvas.getByRole('button', { name: '−' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: '+' })).toBeInTheDocument();
  },
};

/**
 * Tests useDebounce demo
 */
export const UseDebounceDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to debounce tab
    await userEvent.click(canvas.getByRole('button', { name: /useDebounce/i }));

    // Should show debounce demo
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Debouncing delays');
      expect(canvasElement.textContent).toContain('Instant value');
      expect(canvasElement.textContent).toContain('Debounced');
    });

    // Should have search input
    expect(canvas.getByPlaceholderText(/Type to search/i)).toBeInTheDocument();

    // Type in the search
    const input = canvas.getByPlaceholderText(/Type to search/i);
    await userEvent.type(input, 'React');

    // Instant value should update immediately
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('React');
    });
  },
};

/**
 * Tests switching between all tabs
 */
export const SwitchTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start on Toggle
    expect(canvasElement.textContent).toContain('Simple Toggle');

    // Switch to localStorage
    await userEvent.click(canvas.getByRole('button', { name: /useLocalStorage/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Stored Name');
    });

    // Switch to debounce
    await userEvent.click(canvas.getByRole('button', { name: /useDebounce/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Debouncing delays');
    });

    // Switch back to Toggle
    await userEvent.click(canvas.getByRole('button', { name: /useToggle/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Simple Toggle');
    });
  },
};
