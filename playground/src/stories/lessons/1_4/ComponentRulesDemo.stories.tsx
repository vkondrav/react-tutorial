import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import ComponentRulesDemo from '@lessons/1_4/ComponentRulesDemo';

const meta: Meta<typeof ComponentRulesDemo> = {
  title: 'Lessons/1.4 Components/ComponentRulesDemo',
  component: ComponentRulesDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive demonstration of the three component rules: capitalized names, must return JSX, and single root element.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default state showing all three rule buttons.
 */
export const Default: Story = {};

/**
 * Tests clicking Rule 1 (Name Must Be Capitalized).
 */
export const ShowRule1: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Rule 1
    const rule1Button = canvas.getByRole('button', { name: /1.*Name Must Be Capitalized/i });
    await userEvent.click(rule1Button);

    // Verify rule detail error message is shown
    expect(
      canvas.getByText(/React treats lowercase as HTML tags, not components!/i)
    ).toBeInTheDocument();
  },
};

/**
 * Tests clicking Rule 2 (Must Return JSX).
 */
export const ShowRule2: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Rule 2
    const rule2Button = canvas.getByRole('button', { name: /2.*Must Return JSX/i });
    await userEvent.click(rule2Button);

    // Verify rule detail error message is shown
    expect(canvas.getByText(/Forgetting return is the #1 beginner mistake!/i)).toBeInTheDocument();
  },
};

/**
 * Tests clicking Rule 3 (Single Root Element).
 */
export const ShowRule3: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Rule 3
    const rule3Button = canvas.getByRole('button', { name: /3.*Single Root Element/i });
    await userEvent.click(rule3Button);

    // Verify rule detail error message is shown
    expect(canvas.getByText(/Multiple adjacent elements must be wrapped!/i)).toBeInTheDocument();
  },
};

/**
 * Tests toggling between wrong and correct examples.
 */
export const ToggleWrongCorrect: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open Rule 1
    await userEvent.click(canvas.getByRole('button', { name: /1.*Name Must Be Capitalized/i }));

    // Initially shows "Wrong" (error message)
    expect(
      canvas.getByText(/React treats lowercase as HTML tags, not components!/i)
    ).toBeInTheDocument();

    // Click "Correct" button
    const correctButton = canvas.getByRole('button', { name: /Correct/i });
    await userEvent.click(correctButton);

    // Should now show correct note
    expect(canvas.getByText(/Use PascalCase for all component names/i)).toBeInTheDocument();

    // Click "Wrong" button
    const wrongButton = canvas.getByRole('button', { name: /Wrong/i });
    await userEvent.click(wrongButton);

    // Should show error again
    expect(
      canvas.getByText(/React treats lowercase as HTML tags, not components!/i)
    ).toBeInTheDocument();
  },
};

/**
 * Tests closing a rule detail.
 */
export const CloseRuleDetail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open Rule 2
    await userEvent.click(canvas.getByRole('button', { name: /2.*Must Return JSX/i }));

    // Verify rule is open
    expect(canvas.getByText(/Forgetting return is the #1 beginner mistake!/i)).toBeInTheDocument();

    // Click close button
    const closeButton = canvas
      .getAllByRole('button')
      .find((btn) => btn.classList.contains('btn-circle'));
    if (closeButton) {
      await userEvent.click(closeButton);
    }

    // Should show "Click a rule" message
    expect(canvas.getByText(/Click a rule to see examples/i)).toBeInTheDocument();
  },
};
