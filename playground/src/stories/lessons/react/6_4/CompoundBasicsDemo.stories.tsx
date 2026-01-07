import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import CompoundBasicsDemo from '@lessons/react/6_4/CompoundBasicsDemo';

const meta: Meta<typeof CompoundBasicsDemo> = {
  title: 'Lessons/react-6.4/CompoundBasicsDemo',
  component: CompoundBasicsDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Compares traditional props-based tabs with compound components approach, demonstrating the benefits of natural JSX structure.',
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
 * Default view shows comparison of traditional vs compound approaches
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the HTML elements explanation
    expect(canvas.getByText(/Think of HTML's native elements/)).toBeInTheDocument();

    // Should show both approaches
    expect(canvas.getByText('Traditional: Config Object')).toBeInTheDocument();
    expect(canvas.getByText('Compound: Natural JSX')).toBeInTheDocument();

    // Should show why compound components section
    expect(canvas.getByText('Why Compound Components?')).toBeInTheDocument();
  },
};

/**
 * Traditional tabs approach works
 */
export const TraditionalTabsWork: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find the traditional tabs section
    expect(canvas.getByText('Traditional: Config Object')).toBeInTheDocument();

    // Should show initial content (Home tab) - use getAllByText since both tabs show same content
    const homeTexts = canvas.getAllByText('Welcome to the home tab!');
    expect(homeTexts.length).toBeGreaterThan(0);

    // Click on Profile tab in traditional section
    // Find buttons that contain the Profile emoji
    const profileBtns = canvas.getAllByRole('button', { name: /👤 Profile/i });
    await user.click(profileBtns[0]);

    // Should show profile content
    await waitFor(() => {
      const profileTexts = canvas.getAllByText('Your profile info here.');
      expect(profileTexts.length).toBeGreaterThan(0);
    });
  },
};

/**
 * Compound tabs approach works
 */
export const CompoundTabsWork: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find the compound tabs section
    expect(canvas.getByText('Compound: Natural JSX')).toBeInTheDocument();

    // Click on Profile tab in compound section (second Profile button)
    const profileBtns = canvas.getAllByRole('button', { name: /👤 Profile/i });
    // The second one is the compound approach
    if (profileBtns.length > 1) {
      await user.click(profileBtns[1]);
    }

    // Should show profile content
    await waitFor(() => {
      const profileTexts = canvas.getAllByText('Your profile info here.');
      expect(profileTexts.length).toBeGreaterThan(0);
    });
  },
};

/**
 * Code comparison toggle works
 */
export const CodeComparisonToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Initially code should be hidden
    expect(canvas.getByText('Show Code Comparison')).toBeInTheDocument();

    // Click to show code
    await user.click(canvas.getByText('Show Code Comparison'));

    // Should show code snippets
    await waitFor(() => {
      expect(canvas.getByText('Traditional Approach')).toBeInTheDocument();
      expect(canvas.getByText('Compound Components')).toBeInTheDocument();
    });

    // Click to hide
    await user.click(canvas.getByText('Hide Code Comparison'));

    // Code snippets should be hidden
    await waitFor(() => {
      expect(canvas.queryByText('Traditional Approach')).not.toBeInTheDocument();
    });
  },
};

/**
 * Disabled tabs work correctly
 */
export const DisabledTabsWork: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find disabled settings tabs (both traditional and compound should have disabled)
    const settingsBtns = canvas.getAllByRole('button', { name: /⚙️ Settings/i });

    // All settings buttons should be disabled
    settingsBtns.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  },
};

/**
 * Key benefits are displayed
 */
export const KeyBenefits: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show why compound components section
    expect(canvas.getByText('Why Compound Components?')).toBeInTheDocument();

    // Should list benefits
    expect(canvas.getByText(/Flexible:/)).toBeInTheDocument();
    expect(canvas.getByText(/Readable:/)).toBeInTheDocument();
    expect(canvas.getByText(/Encapsulated:/)).toBeInTheDocument();
  },
};
