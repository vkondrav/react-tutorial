import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import EffectPlayground from '@lessons/3_1/EffectPlayground';

const meta: Meta<typeof EffectPlayground> = {
  title: 'Lessons/3.1/EffectPlayground',
  component: EffectPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive playground with 4 useEffect demos: Document Title, Stopwatch, Window Size, and localStorage sync.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - Document Title demo
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Try These Common Patterns');

    // Should have all demo tabs
    expect(canvas.getByRole('button', { name: /Document Title/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Stopwatch/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Window Size/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /localStorage/i })).toBeInTheDocument();

    // Document Title tab should be active by default
    expect(canvasElement.textContent).toContain('Sync your app');
    expect(canvasElement.textContent).toContain('browser tab title');
  },
};

/**
 * Tests Document Title demo
 */
export const DocumentTitleDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have page title input
    const titleInput = canvas.getByPlaceholderText(/Enter page title/i);
    expect(titleInput).toBeInTheDocument();

    // Clear and type new title
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'My App');

    // Should show preview
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Browser Tab Preview');
      expect(canvasElement.textContent).toContain('My App');
    });

    // Test notifications
    const plusBtn = canvas.getByRole('button', { name: '+' });
    await userEvent.click(plusBtn);
    await userEvent.click(plusBtn);

    // Should show notification count in preview
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('(2)');
    });
  },
};

/**
 * Tests Stopwatch demo
 */
export const StopwatchDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Stopwatch tab
    await userEvent.click(canvas.getByRole('button', { name: /Stopwatch/i }));

    // Should show stopwatch content
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('setInterval with proper cleanup');
    });

    // Should have Start button
    const startBtn = canvas.getByRole('button', { name: /Start/i });
    expect(startBtn).toBeInTheDocument();

    // Should have Reset button (disabled initially)
    const resetBtn = canvas.getByRole('button', { name: /Reset/i });
    expect(resetBtn).toBeDisabled();

    // Start the stopwatch
    await userEvent.click(startBtn);

    // Button should change to Pause
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Pause/i })).toBeInTheDocument();
    });

    // Wait a bit
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Pause the stopwatch
    await userEvent.click(canvas.getByRole('button', { name: /Pause/i }));

    // Button should show Resume
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Resume/i })).toBeInTheDocument();
    });

    // Reset should now be enabled
    expect(canvas.getByRole('button', { name: /Reset/i })).not.toBeDisabled();
  },
};

/**
 * Tests Window Size demo
 */
export const WindowSizeDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Window Size tab
    await userEvent.click(canvas.getByRole('button', { name: /Window Size/i }));

    // Should show window size content
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Track window dimensions');
      expect(canvasElement.textContent).toContain('resizing your browser');
    });

    // Should show width, height, and resize count
    expect(canvasElement.textContent).toContain('Width');
    expect(canvasElement.textContent).toContain('Height');
    expect(canvasElement.textContent).toContain('Resize Events');
    expect(canvasElement.textContent).toContain('pixels');

    // Should show aspect ratio
    expect(canvasElement.textContent).toContain('Aspect Ratio');
  },
};

/**
 * Tests localStorage demo
 */
export const LocalStorageDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to localStorage tab
    await userEvent.click(canvas.getByRole('button', { name: /localStorage/i }));

    // Should show localStorage content
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Persist user preferences');
      expect(canvasElement.textContent).toContain('Refresh the page');
    });

    // Should have name input
    const nameInput = canvas.getByPlaceholderText(/Enter your name/i);
    expect(nameInput).toBeInTheDocument();

    // Should have theme select
    expect(canvas.getByRole('combobox')).toBeInTheDocument();

    // Type a name
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'John');

    // Should show localStorage contents
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('localStorage Contents');
      expect(canvasElement.textContent).toContain('"John"');
    });

    // Should show welcome message
    expect(canvasElement.textContent).toContain('Welcome back, John');
  },
};

/**
 * Tests clearing localStorage
 */
export const ClearLocalStorage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to localStorage tab
    await userEvent.click(canvas.getByRole('button', { name: /localStorage/i }));

    await waitFor(() => {
      expect(canvasElement.textContent).toContain('localStorage Contents');
    });

    // Type a name
    const nameInput = canvas.getByPlaceholderText(/Enter your name/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'TestUser');

    // Clear storage
    await userEvent.click(canvas.getByRole('button', { name: /Clear Storage/i }));

    // Name should be cleared
    await waitFor(() => {
      expect(nameInput).toHaveValue('');
    });

    // Welcome message should be gone
    expect(canvasElement.textContent).not.toContain('Welcome back');
  },
};

/**
 * Tests switching between all tabs
 */
export const SwitchTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start on Document Title
    expect(canvasElement.textContent).toContain('browser tab title');

    // Switch to Stopwatch
    await userEvent.click(canvas.getByRole('button', { name: /Stopwatch/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('setInterval');
    });

    // Switch to Window Size
    await userEvent.click(canvas.getByRole('button', { name: /Window Size/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Track window dimensions');
    });

    // Switch to localStorage
    await userEvent.click(canvas.getByRole('button', { name: /localStorage/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Persist user preferences');
    });

    // Switch back to Document Title
    await userEvent.click(canvas.getByRole('button', { name: /Document Title/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('browser tab title');
    });
  },
};
