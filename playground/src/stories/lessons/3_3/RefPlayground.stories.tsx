import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import RefPlayground from '@lessons/3_3/RefPlayground';

const meta: Meta<typeof RefPlayground> = {
  title: 'Lessons/3.3 useRef/RefPlayground',
  component: RefPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive playground with 4 demos: Auto-Focus keyboard shortcut, Click Outside detection, Video Player controls, and Render Counter.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - Auto-Focus tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Interactive Examples');

    // Should have all tabs
    expect(canvas.getByRole('button', { name: /Auto-Focus/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Click Outside/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Video Player/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Render Counter/i })).toBeInTheDocument();

    // Auto-Focus tab should be active
    expect(canvasElement.textContent).toContain('⌘K');
    expect(canvasElement.textContent).toContain('Ctrl+K');
  },
};

/**
 * Tests Auto-Focus demo search input
 */
export const AutoFocusDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have search input
    const searchInput = canvas.getByPlaceholderText(/Search.../i);
    expect(searchInput).toBeInTheDocument();

    // Type something
    await userEvent.type(searchInput, 'test query');
    expect(searchInput).toHaveValue('test query');

    // Clear button should appear and work
    await userEvent.click(canvas.getByRole('button', { name: '' })); // X button
    await waitFor(() => {
      expect(searchInput).toHaveValue('');
    });
  },
};

/**
 * Tests Click Outside demo
 */
export const ClickOutsideDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Click Outside tab
    await userEvent.click(canvas.getByRole('button', { name: /Click Outside/i }));

    // Should show dropdown button
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Open Dropdown/i })).toBeInTheDocument();
    });

    // Dropdown status should be closed
    expect(canvasElement.textContent).toContain('CLOSED');

    // Open dropdown
    await userEvent.click(canvas.getByRole('button', { name: /Open Dropdown/i }));

    // Should show dropdown items
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Profile');
      expect(canvasElement.textContent).toContain('Settings');
      expect(canvasElement.textContent).toContain('Notifications');
      expect(canvasElement.textContent).toContain('Logout');
      expect(canvasElement.textContent).toContain('OPEN');
    });

    // Click outside (on the canvas itself) to close
    // Close by clicking a menu item
    await userEvent.click(canvas.getByRole('button', { name: /Profile/i }));

    // Should be closed now
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('CLOSED');
    });
  },
};

/**
 * Tests Video Player demo
 */
export const VideoPlayerDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Video Player tab
    await userEvent.click(canvas.getByRole('button', { name: /Video Player/i }));

    // Should show video controls content
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Control video playback');
    });

    // Should have play button (initially shows play icon)
    const playButtons = canvas.getAllByRole('button');
    expect(playButtons.length).toBeGreaterThan(0);
  },
};

/**
 * Tests Render Counter demo
 */
export const RenderCounterDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Render Counter tab
    await userEvent.click(canvas.getByRole('button', { name: /Render Counter/i }));

    // Should show render counter content
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('state changes trigger re-renders');
    });

    // Should show State Changes and Input Length displays
    expect(canvasElement.textContent).toContain('State Changes');
    expect(canvasElement.textContent).toContain('Input Length');

    // Type something
    const input = canvas.getByPlaceholderText(/Type to see state changes/i);
    await userEvent.type(input, 'hello');

    // State changes and input length should update
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('5'); // 5 characters typed, 5 state changes
    });
  },
};

/**
 * Tests switching between all tabs
 */
export const SwitchTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start on Auto-Focus
    expect(canvasElement.textContent).toContain('⌘K');

    // Switch to Click Outside
    await userEvent.click(canvas.getByRole('button', { name: /Click Outside/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Click outside the dropdown');
    });

    // Switch to Video Player
    await userEvent.click(canvas.getByRole('button', { name: /Video Player/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Control video playback');
    });

    // Switch to Render Counter
    await userEvent.click(canvas.getByRole('button', { name: /Render Counter/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('state changes trigger re-renders');
    });

    // Switch back to Auto-Focus
    await userEvent.click(canvas.getByRole('button', { name: /Auto-Focus/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('⌘K');
    });
  },
};
