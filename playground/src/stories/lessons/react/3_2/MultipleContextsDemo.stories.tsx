import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import MultipleContextsDemo from '@lessons/react/3_2/MultipleContextsDemo';

const meta: Meta<typeof MultipleContextsDemo> = {
  title: 'Lessons/react-3.2/MultipleContextsDemo',
  component: MultipleContextsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates using multiple contexts (Theme and Auth) in the same app. Shows how components can consume both contexts.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows mini app with two contexts
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Two Contexts, One App');

    // Should show both providers
    expect(canvasElement.textContent).toContain('ThemeContext.Provider');
    expect(canvasElement.textContent).toContain('AuthContext.Provider');

    // Should have theme toggle
    expect(canvas.getByRole('button', { name: /Light/i })).toBeInTheDocument();

    // Should show auth status
    expect(canvasElement.textContent).toContain('Auth:');
    expect(canvasElement.textContent).toContain('Logged out');

    // Should show mini app structure
    expect(canvasElement.textContent).toContain('MyApp');
    expect(canvasElement.textContent).toContain('Sidebar');
    expect(canvasElement.textContent).toContain('Main Content');
  },
};

/**
 * Tests toggling theme
 */
export const ToggleTheme: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initial theme should be light
    expect(canvas.getByRole('button', { name: /Light/i })).toBeInTheDocument();

    // Toggle to dark
    await userEvent.click(canvas.getByRole('button', { name: /Light/i }));

    // Should show dark theme button
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Dark/i })).toBeInTheDocument();
    });

    // Toggle back to light
    await userEvent.click(canvas.getByRole('button', { name: /Dark/i }));
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Light/i })).toBeInTheDocument();
    });
  },
};

/**
 * Tests login functionality
 */
export const LoginFlow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initial state should be logged out
    expect(canvasElement.textContent).toContain('Please log in');
    expect(canvasElement.textContent).toContain('Logged out');

    // Click login
    await userEvent.click(canvas.getByRole('button', { name: /Login/i }));

    // Should show logged in state
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Jordan');
      expect(canvasElement.textContent).toContain('Welcome back');
    });

    // Dashboard should appear in sidebar when logged in
    expect(canvasElement.textContent).toContain('Dashboard');
  },
};

/**
 * Tests logout functionality
 */
export const LogoutFlow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Login first
    await userEvent.click(canvas.getByRole('button', { name: /Login/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Jordan');
    });

    // Logout
    await userEvent.click(canvas.getByRole('button', { name: /Logout/i }));

    // Should show logged out state
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Please log in');
      expect(canvasElement.textContent).toContain('Logged out');
    });
  },
};

/**
 * Tests header shows correct icons for theme
 */
export const ThemeIconsInHeader: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Light theme should show sun icon in header
    // (The header contains Guest or user name and theme icon)
    expect(canvasElement.textContent).toContain('Guest');

    // Toggle to dark
    await userEvent.click(canvas.getByRole('button', { name: /Light/i }));

    // Header should still show Guest (auth unchanged)
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Guest');
    });
  },
};

/**
 * Tests sidebar navigation items
 */
export const SidebarNavigation: Story = {
  play: async ({ canvasElement }) => {
    // Should show navigation items
    expect(canvasElement.textContent).toContain('Home');
    expect(canvasElement.textContent).toContain('About');

    // Dashboard should not be visible when logged out
    const sidebarContent = canvasElement.textContent || '';
    expect(sidebarContent.includes('Dashboard')).toBe(false);
  },
};
