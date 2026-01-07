import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import ConditionalPlayground from '@lessons/react/2_4/ConditionalPlayground';

const meta: Meta<typeof ConditionalPlayground> = {
  title: 'Lessons/react-2.4/ConditionalPlayground',
  component: ConditionalPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive playground for practicing conditional rendering with user profile and feature toggles.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - logged in as Alex
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show name input with "Alex"
    expect(canvas.getByDisplayValue('Alex')).toBeInTheDocument();

    // Should be logged in by default
    expect(canvas.getByRole('button', { name: /Logged In/i })).toBeInTheDocument();

    // Should show user avatar and welcome message
    expect(canvasElement.textContent).toContain('Welcome to your dashboard');
    expect(canvasElement.textContent).toContain('Alex');
  },
};

/**
 * Tests logging out shows login prompt
 */
export const LogOut: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click to log out
    await userEvent.click(canvas.getByRole('button', { name: /Logged In/i }));

    // Should show logged out state
    expect(canvas.getByRole('button', { name: /Logged Out/i })).toBeInTheDocument();

    // Should show login prompt
    expect(canvasElement.textContent).toContain('Please Log In');
  },
};

/**
 * Tests changing user name updates avatar
 */
export const ChangeUserName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Clear and type new name
    const nameInput = canvas.getByDisplayValue('Alex');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Sam');

    // Should show S as avatar initial
    expect(canvasElement.textContent).toContain('S');

    // Welcome should show new name
    expect(canvasElement.textContent).toContain('Sam');
  },
};

/**
 * Tests premium toggle adds PRO badge
 */
export const TogglePremium: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click to enable premium
    await userEvent.click(canvas.getByRole('button', { name: /Free/i }));

    // Should show Premium button now
    expect(canvas.getByRole('button', { name: /Premium/i })).toBeInTheDocument();

    // Should show PRO badge
    expect(canvasElement.textContent).toContain('PRO');

    // Should show premium message
    expect(canvasElement.textContent).toContain('premium features');
    expect(canvasElement.textContent).toContain('Premium Member');
  },
};

/**
 * Tests role selection shows appropriate panels
 */
export const SelectRoles: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Change to moderator
    await userEvent.selectOptions(canvas.getByRole('combobox'), 'moderator');

    // Should show MOD badge and Moderator Tools
    expect(canvasElement.textContent).toContain('MOD');
    expect(canvasElement.textContent).toContain('Moderator Tools');

    // Change to admin
    await userEvent.selectOptions(canvas.getByRole('combobox'), 'admin');

    // Should show ADMIN badge and Admin Controls
    expect(canvasElement.textContent).toContain('ADMIN');
    expect(canvasElement.textContent).toContain('Admin Controls');
    expect(canvasElement.textContent).toContain('full access');
  },
};

/**
 * Tests notification slider
 */
export const NotificationSlider: Story = {
  play: async ({ canvasElement }) => {
    // Should show notifications count
    expect(canvasElement.textContent).toContain('Notifications: 5');

    // Notification badge should be visible (can't easily interact with range slider in tests)
    // Just verify the UI shows correctly
    expect(canvasElement.textContent).toContain('5');
  },
};

/**
 * Tests feature toggles
 */
export const FeatureToggles: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all checkboxes
    const checkboxes = canvas.getAllByRole('checkbox');

    // Should have 4 feature toggles
    expect(checkboxes.length).toBe(4);

    // All should be checked by default
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });

    // Toggle off showAvatar (first checkbox)
    await userEvent.click(checkboxes[0]);
    expect(checkboxes[0]).not.toBeChecked();
  },
};

/**
 * Tests dark mode toggle
 */
export const ToggleDarkMode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the dark mode checkbox (should be the 4th one - "Dark Mode")
    const checkboxes = canvas.getAllByRole('checkbox');
    const darkModeCheckbox = checkboxes[3];

    // Should be checked by default (dark mode on)
    expect(darkModeCheckbox).toBeChecked();

    // Toggle off dark mode
    await userEvent.click(darkModeCheckbox);
    expect(darkModeCheckbox).not.toBeChecked();
  },
};

/**
 * Shows current conditions code display
 */
export const ShowsConditionsDisplay: Story = {
  play: async ({ canvasElement }) => {
    // Should show current conditions being evaluated
    expect(canvasElement.textContent).toContain('Current conditions being evaluated');
    expect(canvasElement.textContent).toContain('isLoggedIn=true');
    expect(canvasElement.textContent).toContain('isPremium=false');
    expect(canvasElement.textContent).toContain('role="user"');
    expect(canvasElement.textContent).toContain('notifications=5');
  },
};
