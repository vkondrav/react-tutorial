import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import CommonHOCsDemo from '@lessons/react/6_3/CommonHOCsDemo';

const meta: Meta<typeof CommonHOCsDemo> = {
  title: 'Lessons/react-6.3/CommonHOCsDemo',
  component: CommonHOCsDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates common HOC patterns: withAuth, withLoading, and withTheme with interactive demos.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows withAuth tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show all three tab buttons
    expect(canvas.getByRole('button', { name: /withAuth/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /withLoading/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /withTheme/i })).toBeInTheDocument();

    // withAuth tab should be active by default
    const authTab = canvas.getByRole('button', { name: /withAuth/i });
    expect(authTab.className).toContain('btn-primary');

    // Should show the withAuth demo
    expect(canvas.getByText('withAuth HOC')).toBeInTheDocument();
    expect(canvas.getByText('Live Demo')).toBeInTheDocument();
  },
};

/**
 * Test withAuth authentication toggle
 */
export const WithAuthDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Initially should show "Access Denied" (not authenticated)
    expect(canvas.getByText('Access Denied')).toBeInTheDocument();
    expect(canvas.getByText('Please log in to view this content.')).toBeInTheDocument();

    // Find and check the authentication checkbox
    const authCheckbox = canvas.getByRole('checkbox');
    expect(authCheckbox).not.toBeChecked();

    await user.click(authCheckbox);

    // Should now show the dashboard
    await waitFor(() => {
      expect(canvas.getByText('🎉 Dashboard')).toBeInTheDocument();
    });
    expect(
      canvas.getByText('Welcome! You have access to this protected content.')
    ).toBeInTheDocument();

    // Should show stats
    expect(canvas.getByText('128')).toBeInTheDocument();
    expect(canvas.getByText('Users')).toBeInTheDocument();
    expect(canvas.getByText('$4.2k')).toBeInTheDocument();
    expect(canvas.getByText('Revenue')).toBeInTheDocument();
  },
};

/**
 * Switch to withLoading tab and test functionality
 */
export const WithLoadingDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click on withLoading tab
    const loadingTab = canvas.getByRole('button', { name: /withLoading/i });
    await user.click(loadingTab);

    // Should show the withLoading demo
    await waitFor(() => {
      expect(canvas.getByText('withLoading HOC')).toBeInTheDocument();
    });

    // Loading checkbox should be checked by default
    const loadingCheckbox = canvas.getByRole('checkbox');
    expect(loadingCheckbox).toBeChecked();

    // Should show loading state
    expect(canvas.getByText('Loading...')).toBeInTheDocument();

    // Uncheck to show content
    await user.click(loadingCheckbox);

    // Should now show the user list
    await waitFor(() => {
      expect(canvas.getByText('User List')).toBeInTheDocument();
    });
    expect(canvas.getByText('Alice Johnson')).toBeInTheDocument();
    expect(canvas.getByText('Bob Smith')).toBeInTheDocument();
    expect(canvas.getByText('Carol White')).toBeInTheDocument();
  },
};

/**
 * Switch to withTheme tab and test theme toggle
 */
export const WithThemeDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click on withTheme tab
    const themeTab = canvas.getByRole('button', { name: /withTheme/i });
    await user.click(themeTab);

    // Should show the withTheme demo
    await waitFor(() => {
      expect(canvas.getByText('withTheme HOC')).toBeInTheDocument();
    });

    // Should show the themeable card
    expect(canvas.getByText('Themeable Card')).toBeInTheDocument();
    expect(
      canvas.getByText('This component receives theme props from the HOC!')
    ).toBeInTheDocument();

    // Initial theme should be light
    expect(canvas.getByText(/Current theme:/)).toBeInTheDocument();
    expect(canvas.getByText('light')).toBeInTheDocument();

    // Find and click the theme toggle button (sun/moon icon)
    const themeBtns = canvasElement.querySelectorAll('button[class*="rounded-full"]');
    const themeToggle = Array.from(themeBtns).find((btn) => btn.querySelector('svg'));
    expect(themeToggle).toBeTruthy();

    await user.click(themeToggle as HTMLElement);

    // Should now show dark theme
    await waitFor(() => {
      expect(canvas.getByText('dark')).toBeInTheDocument();
    });
  },
};

/**
 * Verify code snippets are shown for each tab
 */
export const CodeSnippetsPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Check withAuth code snippet
    expect(canvas.getByText('withAuth HOC')).toBeInTheDocument();

    // Switch to withLoading
    await user.click(canvas.getByRole('button', { name: /withLoading/i }));
    await waitFor(() => {
      expect(canvas.getByText('withLoading HOC')).toBeInTheDocument();
    });

    // Switch to withTheme
    await user.click(canvas.getByRole('button', { name: /withTheme/i }));
    await waitFor(() => {
      expect(canvas.getByText('withTheme HOC')).toBeInTheDocument();
    });
  },
};
