import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import PropDrillingDemo from '@lessons/3_2/PropDrillingDemo';

const meta: Meta<typeof PropDrillingDemo> = {
  title: 'Lessons/3.2 useContext/PropDrillingDemo',
  component: PropDrillingDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the prop drilling problem - shows how props have to be passed through 4 levels of components.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows component tree with props drilling
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Watch the Props Drill Down');

    // Should show all component levels
    expect(canvasElement.textContent).toContain('App');
    expect(canvasElement.textContent).toContain('Layout');
    expect(canvasElement.textContent).toContain('Sidebar');
    expect(canvasElement.textContent).toContain('UserProfile');

    // Should show user info
    expect(canvasElement.textContent).toContain('Sarah Chen');
    expect(canvasElement.textContent).toContain('sarah@example.com');

    // Should have logout button
    expect(canvas.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
  },
};

/**
 * Tests that component levels show they don't need props
 */
export const ShowsMiddleComponentsDontNeedProps: Story = {
  play: async ({ canvasElement }) => {
    // Layout and Sidebar should indicate they don't need user
    expect(canvasElement.textContent).toContain("doesn't need user");
    expect(canvasElement.textContent).toContain('Just passes props through');
    expect(canvasElement.textContent).toContain('Still just passing');
    expect(canvasElement.textContent).toContain('finally uses it');
  },
};

/**
 * Tests logout functionality
 */
export const LogoutAndRelogin: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initial state should show user
    expect(canvasElement.textContent).toContain('Sarah Chen');

    // Click logout
    await userEvent.click(canvas.getByRole('button', { name: /Logout/i }));

    // Should show logging in message
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Logging back in');
    });

    // Should return to logged in state after delay
    await waitFor(
      () => {
        expect(canvasElement.textContent).toContain('Sarah Chen');
      },
      { timeout: 2000 }
    );
  },
};

/**
 * Tests problem explanation
 */
export const ShowsProblemExplanation: Story = {
  play: async ({ canvasElement }) => {
    // Should show problem explanation
    expect(canvasElement.textContent).toContain('The Problem');
    expect(canvasElement.textContent).toContain("don't even use");
    expect(canvasElement.textContent).toContain('pass them through');
    expect(canvasElement.textContent).toContain('harder to maintain');
  },
};

/**
 * Tests badge numbering for each level
 */
export const ShowsLevelBadges: Story = {
  play: async ({ canvasElement }) => {
    // Should show numbered badges
    expect(canvasElement.textContent).toMatch(/1.*App/);
    expect(canvasElement.textContent).toMatch(/2.*Layout/);
    expect(canvasElement.textContent).toMatch(/3.*Sidebar/);
    expect(canvasElement.textContent).toMatch(/4.*UserProfile/);
  },
};
