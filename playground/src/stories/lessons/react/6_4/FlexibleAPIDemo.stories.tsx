import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import FlexibleAPIDemo from '@lessons/react/6_4/FlexibleAPIDemo';

const meta: Meta<typeof FlexibleAPIDemo> = {
  title: 'Lessons/react-6.4/FlexibleAPIDemo',
  component: FlexibleAPIDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates how compound components provide flexible API design through a Card component with multiple layout variations.',
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
 * Default view shows Image Card layout
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the inversion of control explanation
    expect(canvas.getByText('Inversion of Control')).toBeInTheDocument();

    // Should show layout selector buttons
    expect(canvas.getByRole('button', { name: /Image Card/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Profile Card/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Settings Card/i })).toBeInTheDocument();

    // Image Card is active by default - use getAllByText due to code snippets
    const mountainTexts = canvas.getAllByText('Mountain Vista');
    expect(mountainTexts.length).toBeGreaterThan(0);
  },
};

/**
 * Switch to Profile Card layout
 */
export const ProfileCardLayout: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Profile Card button
    await user.click(canvas.getByRole('button', { name: /Profile Card/i }));

    // Should show profile card content - use getAllByText due to code snippets
    await waitFor(() => {
      const janeTexts = canvas.getAllByText('Jane Doe');
      expect(janeTexts.length).toBeGreaterThan(0);
    });

    // Verify profile card is showing by checking for Follow/Message buttons
    expect(canvas.getByRole('button', { name: 'Follow' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Message' })).toBeInTheDocument();
  },
};

/**
 * Switch to Settings Card layout
 */
export const SettingsCardLayout: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Settings Card button
    await user.click(canvas.getByRole('button', { name: /Settings Card/i }));

    // Should show settings card content
    await waitFor(() => {
      expect(canvas.getByText('Notification Settings')).toBeInTheDocument();
    });

    // Should show toggles - use getAllByText due to code snippets
    const emailTexts = canvas.getAllByText('Email notifications');
    expect(emailTexts.length).toBeGreaterThan(0);

    // Should show save button
    expect(canvas.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
  },
};

/**
 * Code updates when switching layouts
 */
export const CodeUpdatesWithLayout: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Initially shows Layout 1 Code
    expect(canvas.getByText('Layout 1 Code')).toBeInTheDocument();

    // Switch to Profile Card
    await user.click(canvas.getByRole('button', { name: /Profile Card/i }));

    await waitFor(() => {
      expect(canvas.getByText('Layout 2 Code')).toBeInTheDocument();
    });

    // Switch to Settings Card
    await user.click(canvas.getByRole('button', { name: /Settings Card/i }));

    await waitFor(() => {
      expect(canvas.getByText('Layout 3 Code')).toBeInTheDocument();
    });
  },
};

/**
 * Props vs Compound comparison toggle
 */
export const ComparisonToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Should show toggle button
    expect(canvas.getByText('Show Props vs Compound Comparison')).toBeInTheDocument();

    // Click to show comparison
    await user.click(canvas.getByText('Show Props vs Compound Comparison'));

    // Should show comparison cards
    await waitFor(() => {
      expect(canvas.getByText('Props-Based API')).toBeInTheDocument();
      expect(canvas.getByText('Compound Components')).toBeInTheDocument();
    });

    // Should show pros/cons
    expect(canvas.getByText(/Fixed structure, limited layouts/)).toBeInTheDocument();
    expect(canvas.getByText(/Any structure, any order/)).toBeInTheDocument();
  },
};

/**
 * Full code example is displayed
 */
export const FullCodeExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the flexible layouts code
    expect(canvas.getByText('Same Card Component, Infinite Possibilities')).toBeInTheDocument();
  },
};

/**
 * Settings toggles are interactive
 */
export const SettingsTogglesWork: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to Settings Card
    await user.click(canvas.getByRole('button', { name: /Settings Card/i }));

    await waitFor(() => {
      expect(canvas.getByText('Notification Settings')).toBeInTheDocument();
    });

    // Find checkboxes
    const checkboxes = canvasElement.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBeGreaterThanOrEqual(3);

    // First checkbox (Email notifications) should be checked by default
    expect(checkboxes[0]).toBeChecked();

    // Second checkbox (Push notifications) should not be checked
    expect(checkboxes[1]).not.toBeChecked();

    // Click to toggle
    await user.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();
  },
};
