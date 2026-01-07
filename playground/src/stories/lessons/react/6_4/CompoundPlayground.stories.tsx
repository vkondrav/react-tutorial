import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import CompoundPlayground from '@lessons/react/6_4/CompoundPlayground';

const meta: Meta<typeof CompoundPlayground> = {
  title: 'Lessons/react-6.4/CompoundPlayground',
  component: CompoundPlayground,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Interactive playground featuring Tabs, Menu, and Select compound components with event logging.',
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
 * Default view shows Tabs demo
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show demo selector buttons
    expect(canvas.getByRole('button', { name: /^Tabs$/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /^Menu$/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /^Select$/i })).toBeInTheDocument();

    // Tabs demo should be shown by default
    expect(canvas.getByText('Dashboard Tabs')).toBeInTheDocument();
    expect(canvas.getByText('Welcome back!')).toBeInTheDocument();
  },
};

/**
 * Tabs navigation works
 */
export const TabsNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Profile tab
    const profileTab = canvas.getByRole('button', { name: /Profile/i });
    await user.click(profileTab);

    // Should show profile content
    await waitFor(() => {
      expect(canvas.getByText('jane.doe@example.com')).toBeInTheDocument();
      expect(canvas.getByText('Premium Member')).toBeInTheDocument();
    });

    // Click Notifications tab
    const notificationsTab = canvas.getByRole('button', { name: /Notifications/i });
    await user.click(notificationsTab);

    // Should show notifications
    await waitFor(() => {
      expect(canvas.getByText('New comment on your post')).toBeInTheDocument();
      expect(canvas.getByText('Project deadline reminder')).toBeInTheDocument();
    });

    // Check event log shows tab changes
    expect(canvas.getByText('Event Log')).toBeInTheDocument();
  },
};

/**
 * Menu demo works
 */
export const MenuDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Menu demo
    await user.click(canvas.getByRole('button', { name: /^Menu$/i }));

    await waitFor(() => {
      expect(canvas.getByText('User Actions Menu')).toBeInTheDocument();
    });

    // Click Account menu button
    const accountBtn = canvas.getByRole('button', { name: /Account/i });
    await user.click(accountBtn);

    // Menu should open
    await waitFor(() => {
      expect(canvas.getByText('View Profile')).toBeInTheDocument();
      expect(canvas.getByText('Settings')).toBeInTheDocument();
      expect(canvas.getByText('Logout')).toBeInTheDocument();
    });
  },
};

/**
 * Menu item click logs event and closes menu
 */
export const MenuItemClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Menu demo
    await user.click(canvas.getByRole('button', { name: /^Menu$/i }));

    await waitFor(() => {
      expect(canvas.getByText('User Actions Menu')).toBeInTheDocument();
    });

    // Click Account menu button
    const accountBtn = canvas.getByRole('button', { name: /Account/i });
    await user.click(accountBtn);

    // Click View Profile
    await waitFor(() => {
      expect(canvas.getByText('View Profile')).toBeInTheDocument();
    });
    await user.click(canvas.getByText('View Profile'));

    // Menu should close and event should be logged
    await waitFor(() => {
      expect(canvas.getByText('→ View Profile clicked')).toBeInTheDocument();
    });
  },
};

/**
 * Select demo works
 */
export const SelectDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Select demo
    await user.click(canvas.getByRole('button', { name: /^Select$/i }));

    await waitFor(() => {
      expect(canvas.getByText('Custom Select')).toBeInTheDocument();
    });

    // Should show two selects
    expect(canvas.getByText('Choose a framework')).toBeInTheDocument();
    expect(canvas.getByText('Country')).toBeInTheDocument();
  },
};

/**
 * Framework select works
 */
export const FrameworkSelect: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Select demo
    await user.click(canvas.getByRole('button', { name: /^Select$/i }));

    await waitFor(() => {
      expect(canvas.getByText('Custom Select')).toBeInTheDocument();
    });

    // Click framework select trigger
    await user.click(canvas.getByText('Select a framework...'));

    // Options should show
    await waitFor(() => {
      expect(canvas.getByText('Popular')).toBeInTheDocument();
      expect(canvas.getByText('Rising')).toBeInTheDocument();
    });

    // Select React
    await user.click(canvas.getByText('React'));

    // Should show selection confirmation
    await waitFor(() => {
      expect(canvas.getByText(/You selected:/)).toBeInTheDocument();
      expect(canvas.getByText('react')).toBeInTheDocument();
    });
  },
};

/**
 * Country select has default value
 */
export const CountrySelectDefault: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Select demo
    await user.click(canvas.getByRole('button', { name: /^Select$/i }));

    await waitFor(() => {
      expect(canvas.getByText('Custom Select')).toBeInTheDocument();
    });

    // Country select should not have visible default (us value but no label set initially)
    // Click to open
    const countryTriggers = canvasElement.querySelectorAll('button[class*="w-full"]');
    // Second trigger is the country select
    if (countryTriggers[1]) {
      await user.click(countryTriggers[1]);
    }

    // Options should show
    await waitFor(() => {
      expect(canvas.getByText('🇺🇸 United States')).toBeInTheDocument();
      expect(canvas.getByText('🇬🇧 United Kingdom')).toBeInTheDocument();
    });
  },
};

/**
 * Pattern summary is displayed
 */
export const PatternSummary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show pattern summary
    expect(canvas.getByText('Compound Components Pattern Summary')).toBeInTheDocument();

    // Should show key aspects
    expect(canvas.getByText('Structure:')).toBeInTheDocument();
    expect(canvas.getByText('State Sharing:')).toBeInTheDocument();
    expect(canvas.getByText('Best For:')).toBeInTheDocument();
    expect(canvas.getByText('Key Benefit:')).toBeInTheDocument();
  },
};

/**
 * Event log can be cleared
 */
export const EventLogClear: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Navigate to trigger some events
    const profileTab = canvas.getByRole('button', { name: /Profile/i });
    await user.click(profileTab);

    // Event log should appear
    await waitFor(() => {
      expect(canvas.getByText('Event Log')).toBeInTheDocument();
    });

    // Clear the log
    await user.click(canvas.getByRole('button', { name: 'Clear' }));

    // Log should be empty (no Event Log heading visible when empty)
    await waitFor(() => {
      expect(canvas.queryByText('Event Log')).not.toBeInTheDocument();
    });
  },
};

/**
 * Disabled tabs cannot be clicked
 */
export const DisabledTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Settings tab should be disabled
    const settingsTab = canvas.getByRole('button', { name: /Settings/i });
    expect(settingsTab).toBeDisabled();
  },
};
