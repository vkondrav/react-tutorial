import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import HOCPatternsDemo from '@lessons/6_3/HOCPatternsDemo';

const meta: Meta<typeof HOCPatternsDemo> = {
  title: 'Lessons/6.3/HOCPatternsDemo',
  component: HOCPatternsDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates HOC conventions and best practices: naming, displayName, props forwarding, composition, and avoiding mutation.',
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
 * Default view shows the Naming Convention tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show all five pattern tabs
    expect(canvas.getByRole('button', { name: 'Naming Convention' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Display Name' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Pass Props' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: "Don't Mutate" })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Composition' })).toBeInTheDocument();

    // Naming Convention should be active
    const namingTab = canvas.getByRole('button', { name: 'Naming Convention' });
    expect(namingTab.className).toContain('btn-primary');

    // Should show naming content
    expect(canvas.getByText('1. Use "with" Prefix')).toBeInTheDocument();
  },
};

/**
 * Naming Convention tab content
 */
export const NamingConvention: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show naming convention explanation
    expect(canvas.getByText('1. Use "with" Prefix')).toBeInTheDocument();

    // Should show good names section
    expect(canvas.getByText('Good Names')).toBeInTheDocument();

    // Use getAllByText since code snippets duplicate names
    const withAuthElements = canvas.getAllByText('withAuth');
    expect(withAuthElements.length).toBeGreaterThan(0);

    // Should show names to avoid
    expect(canvas.getByText('Avoid')).toBeInTheDocument();

    // Check for "too vague" explanation which is unique
    expect(canvas.getByText(/too vague/)).toBeInTheDocument();
  },
};

/**
 * Display Name tab content
 */
export const DisplayName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Display Name tab
    const displayNameTab = canvas.getByRole('button', { name: 'Display Name' });
    await user.click(displayNameTab);

    await waitFor(() => {
      expect(canvas.getByText('2. Set displayName for Debugging')).toBeInTheDocument();
    });

    // Should show DevTools preview
    expect(canvas.getByText('React DevTools Preview')).toBeInTheDocument();
    expect(canvas.getByText('❌ Without displayName')).toBeInTheDocument();
    expect(canvas.getByText('✅ With displayName')).toBeInTheDocument();

    // Use getAllByText since code snippets duplicate the pattern
    const displayNameElements = canvas.getAllByText(/WithAuth\(Dashboard\)/);
    expect(displayNameElements.length).toBeGreaterThan(0);
  },
};

/**
 * Pass Props tab content
 */
export const PassProps: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Pass Props tab
    const passPropsTab = canvas.getByRole('button', { name: 'Pass Props' });
    await user.click(passPropsTab);

    await waitFor(() => {
      expect(canvas.getByText('3. Pass Through Unrelated Props')).toBeInTheDocument();
    });

    // Should show the warning/tip
    expect(canvas.getByText('Use Spread Operator')).toBeInTheDocument();
    expect(canvas.getByText(/{\.\.\.props}/)).toBeInTheDocument();
  },
};

/**
 * Don't Mutate tab content
 */
export const DontMutate: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Don't Mutate tab
    const dontMutateTab = canvas.getByRole('button', { name: "Don't Mutate" });
    await user.click(dontMutateTab);

    await waitFor(() => {
      expect(canvas.getByText("4. Don't Mutate the Original Component")).toBeInTheDocument();
    });

    // Should show composition vs mutation
    expect(canvas.getByText('Composition (Good)')).toBeInTheDocument();
    expect(canvas.getByText('Mutation (Bad)')).toBeInTheDocument();
  },
};

/**
 * Composition tab content
 */
export const Composition: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Composition tab
    const compositionTab = canvas.getByRole('button', { name: 'Composition' });
    await user.click(compositionTab);

    await waitFor(() => {
      expect(canvas.getByText('5. Composing Multiple HOCs')).toBeInTheDocument();
    });

    // Should show execution order
    expect(canvas.getByText('Execution Order')).toBeInTheDocument();
    expect(canvas.getByText(/right to left/)).toBeInTheDocument();

    // Should show the compose example
    expect(
      canvas.getByText(/withAuth\(withTheme\(withLogging\(MyComponent\)\)\)/)
    ).toBeInTheDocument();
  },
};

/**
 * Test all tabs can be cycled through
 */
export const CycleThroughAllTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const tabs = ['Naming Convention', 'Display Name', 'Pass Props', "Don't Mutate", 'Composition'];

    for (const tabName of tabs) {
      const tab = canvas.getByRole('button', { name: tabName });
      await user.click(tab);

      await waitFor(() => {
        expect(tab.className).toContain('btn-primary');
      });
    }
  },
};
