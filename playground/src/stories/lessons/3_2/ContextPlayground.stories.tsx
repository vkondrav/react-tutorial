import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import ContextPlayground from '@lessons/3_2/ContextPlayground';

const meta: Meta<typeof ContextPlayground> = {
  title: 'Lessons/3.2 useContext/ContextPlayground',
  component: ContextPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Full interactive dashboard demo with three contexts: Theme, User, and Notifications. Shows how deeply nested components react to context changes.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows dashboard demo
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Interactive Dashboard Demo');

    // Should show context badges
    expect(canvasElement.textContent).toContain('ThemeContext');
    expect(canvasElement.textContent).toContain('UserContext');
    expect(canvasElement.textContent).toContain('NotificationContext');

    // Should show current state displays
    expect(canvasElement.textContent).toContain('Theme');
    expect(canvasElement.textContent).toContain('User');
    expect(canvasElement.textContent).toContain('Notifications');

    // Should have login button initially
    expect(canvas.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  },
};

/**
 * Tests theme toggle
 */
export const ToggleTheme: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initial theme is dark
    expect(canvasElement.textContent).toContain('dark');

    // Find and click theme toggle (the moon/sun button)
    const themeToggle = canvas.getByTitle('Toggle theme');
    await userEvent.click(themeToggle);

    // Theme should change to light
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('light');
    });

    // Toggle back to dark
    await userEvent.click(themeToggle);
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('dark');
    });
  },
};

/**
 * Tests login functionality
 */
export const LoginFlow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initial state should show guest
    expect(canvasElement.textContent).toContain('Welcome Guest');
    expect(canvasElement.textContent).toContain('Please log in');

    // Login
    await userEvent.click(canvas.getByRole('button', { name: /Login/i }));

    // Should show logged in state
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Alex');
      expect(canvasElement.textContent).toContain('Your Dashboard');
    });

    // Should show stats cards
    expect(canvasElement.textContent).toContain('Revenue');
    expect(canvasElement.textContent).toContain('$12,450');
    expect(canvasElement.textContent).toContain('Users');
    expect(canvasElement.textContent).toContain('1,234');
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
      expect(canvasElement.textContent).toContain('Alex');
    });

    // Logout
    const logoutBtn = canvas.getByTitle('Logout');
    await userEvent.click(logoutBtn);

    // Should show logged out state
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('null');
      expect(canvasElement.textContent).toContain('Please log in');
    });
  },
};

/**
 * Tests notification functionality
 */
export const AddNotification: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Login first to access notification button
    await userEvent.click(canvas.getByRole('button', { name: /Login/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Your Dashboard');
    });

    // Initial notification count should be 0
    expect(canvasElement.textContent).toMatch(/Notifications.*0/s);

    // Click simulate notification button
    await userEvent.click(canvas.getByRole('button', { name: /Simulate Notification/i }));

    // Notification count should increase
    await waitFor(() => {
      expect(canvasElement.textContent).toMatch(/Notifications.*1/s);
    });

    // Add more notifications
    await userEvent.click(canvas.getByRole('button', { name: /Simulate Notification/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Simulate Notification/i }));

    await waitFor(() => {
      expect(canvasElement.textContent).toMatch(/Notifications.*3/s);
    });
  },
};

/**
 * Tests clearing notifications
 */
export const ClearNotifications: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Login first
    await userEvent.click(canvas.getByRole('button', { name: /Login/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Your Dashboard');
    });

    // Add some notifications
    await userEvent.click(canvas.getByRole('button', { name: /Simulate Notification/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Simulate Notification/i }));

    await waitFor(() => {
      expect(canvasElement.textContent).toMatch(/Notifications.*2/s);
    });

    // Clear notifications by clicking the bell
    const clearBtn = canvas.getByTitle('Clear notifications');
    await userEvent.click(clearBtn);

    // Notifications should be cleared
    await waitFor(() => {
      expect(canvasElement.textContent).toMatch(/Notifications.*0/s);
    });
  },
};

/**
 * Tests sidebar navigation items
 */
export const SidebarNavigation: Story = {
  play: async ({ canvasElement }) => {
    // Should show navigation items
    expect(canvasElement.textContent).toContain('Dashboard');
    expect(canvasElement.textContent).toContain('Home');
    expect(canvasElement.textContent).toContain('Analytics');
    expect(canvasElement.textContent).toContain('Projects');
    expect(canvasElement.textContent).toContain('Settings');
  },
};

/**
 * Tests messages nav item appears after login
 */
export const MessagesAfterLogin: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Messages should not be visible initially
    expect(canvasElement.textContent).not.toContain('Messages');

    // Login
    await userEvent.click(canvas.getByRole('button', { name: /Login/i }));

    // Messages should now be visible
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Messages');
    });
  },
};

/**
 * Tests instructions panel
 */
export const ShowsInstructions: Story = {
  play: async ({ canvasElement }) => {
    // Should show instructions
    expect(canvasElement.textContent).toContain('Try it out');
    expect(canvasElement.textContent).toContain('Toggle the theme');
    expect(canvasElement.textContent).toContain('log in/out');
    expect(canvasElement.textContent).toContain('trigger notifications');
    expect(canvasElement.textContent).toContain('without any prop drilling');
  },
};
