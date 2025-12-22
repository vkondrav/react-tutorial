import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import JSXRulesDemo from '@lessons/1_3/JSXRulesDemo';

const meta: Meta<typeof JSXRulesDemo> = {
  title: 'Lessons/1.3 Understanding JSX/JSXRulesDemo',
  component: JSXRulesDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive demo showing the 3 JSX rules. Switch between tabs to see wrong vs correct examples for each rule.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default JSX rules demo (starts on Rule 1).
 */
export const Default: Story = {};

/**
 * Tests Rule 1 is active by default.
 */
export const Rule1Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show Rule 1 content (Single Root Element)
    expect(canvas.getByText(/Single Root Element/i)).toBeInTheDocument();
    expect(canvas.getByText(/Error!/)).toBeInTheDocument();
  },
};

/**
 * Tests switching to Rule 2.
 */
export const SwitchToRule2: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const rule2Button = canvas.getByRole('button', { name: /Close All Tags/i });
    await userEvent.click(rule2Button);

    // Should show Rule 2 content
    expect(canvas.getByText(/Close All Tags/i)).toBeInTheDocument();
    expect(canvas.getByText(/Self-close!/)).toBeInTheDocument();
  },
};

/**
 * Tests switching to Rule 3.
 */
export const SwitchToRule3: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const rule3Button = canvas.getByRole('button', { name: /camelCase Attributes/i });
    await userEvent.click(rule3Button);

    // Should show Rule 3 content
    expect(canvas.getByText(/camelCase Attributes/i)).toBeInTheDocument();
    expect(canvas.getByText(/Use camelCase/i)).toBeInTheDocument();
  },
};

/**
 * Tests navigating through all rules.
 */
export const NavigateAllRules: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Rule 1
    expect(canvas.getByText(/Single Root Element/i)).toBeInTheDocument();

    // Switch to Rule 2
    await userEvent.click(canvas.getByRole('button', { name: /Close All Tags/i }));
    expect(canvas.getByText(/Self-close!/)).toBeInTheDocument();

    // Switch to Rule 3
    await userEvent.click(canvas.getByRole('button', { name: /camelCase Attributes/i }));
    expect(canvas.getByText(/Use camelCase/i)).toBeInTheDocument();

    // Switch back to Rule 1
    await userEvent.click(canvas.getByRole('button', { name: /Single Root Element/i }));
    expect(canvas.getByText(/Single Root Element/i)).toBeInTheDocument();
  },
};
