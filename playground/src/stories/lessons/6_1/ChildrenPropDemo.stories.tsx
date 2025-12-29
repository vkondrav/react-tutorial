import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import ChildrenPropDemo from '@lessons/6_1/ChildrenPropDemo';

const meta: Meta<typeof ChildrenPropDemo> = {
  title: 'Lessons/6.1/ChildrenPropDemo',
  component: ChildrenPropDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shows how the children prop enables containment patterns with Card, FancyBorder, and Collapsible components.',
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
 * Default view shows live examples
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the main heading
    expect(canvas.getByText('How Children Works')).toBeInTheDocument();

    // Should show live examples
    expect(
      canvas.getByText('Live Examples: Same Container, Different Content')
    ).toBeInTheDocument();

    // Should show card examples
    expect(canvas.getByText('Card with Text')).toBeInTheDocument();
    expect(canvas.getByText('Card with List')).toBeInTheDocument();

    // Should show fancy border examples
    expect(canvas.getByText('Blue')).toBeInTheDocument();
    expect(canvas.getByText('Purple')).toBeInTheDocument();
    expect(canvas.getByText('Green')).toBeInTheDocument();
    expect(canvas.getByText('Orange')).toBeInTheDocument();
  },
};

/**
 * Toggle code visibility
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find and click the show code button
    const showCodeBtn = canvas.getByRole('button', { name: /Show Code/i });
    await user.click(showCodeBtn);

    // Should now show code snippet
    expect(canvas.getByText('The children prop')).toBeInTheDocument();

    // Click again to hide
    const hideCodeBtn = canvas.getByRole('button', { name: /Hide Code/i });
    await user.click(hideCodeBtn);
  },
};

/**
 * Interact with collapsible sections
 */
export const CollapsibleInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Should show collapsible sections
    expect(canvas.getByText('What can children be?')).toBeInTheDocument();
    expect(canvas.getByText('Why use the children pattern?')).toBeInTheDocument();
    expect(canvas.getByText('Nested composition example')).toBeInTheDocument();

    // Click to expand "Why use the children pattern?"
    const whyButton = canvas.getByRole('button', { name: /Why use the children pattern?/i });
    await user.click(whyButton);

    // Should show the content
    expect(
      canvas.getByText(/Components don't need to know what they'll contain/)
    ).toBeInTheDocument();

    // Click nested composition to see composed components
    const nestedButton = canvas.getByRole('button', { name: /Nested composition example/i });
    await user.click(nestedButton);

    // Should show nested content
    expect(canvas.getByText(/composition at work/i)).toBeInTheDocument();
  },
};

/**
 * Verify key insight about children as a "hole"
 */
export const KeyInsight: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Think of Children as a "Hole"')).toBeInTheDocument();
    expect(canvas.getByText(/like a picture frame/)).toBeInTheDocument();
  },
};
