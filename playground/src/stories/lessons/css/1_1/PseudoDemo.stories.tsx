import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import PseudoDemo from '@lessons/css/1_1/PseudoDemo';

const meta: Meta<typeof PseudoDemo> = {
  title: 'Lessons/css-1.1/PseudoDemo',
  component: PseudoDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive comparison of CSS pseudo-classes (state-based) and pseudo-elements (content generation), with a hands-on tooltip exercise.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing pseudo-classes tab.
 */
export const Default: Story = {};

/**
 * Tests switching to pseudo-elements tab.
 */
export const PseudoElementsTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click pseudo-elements tab
    const elementsTab = canvas.getByRole('button', { name: /::pseudo-elements/i });
    await userEvent.click(elementsTab);

    // Should show pseudo-elements content
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('double colon');
      expect(canvasElement.textContent).toContain('virtual elements');
      expect(canvasElement.textContent).toContain('::before');
      expect(canvasElement.textContent).toContain('::after');
    });
  },
};

/**
 * Tests switching to tooltip exercise tab.
 */
export const TooltipExerciseTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click exercise tab
    const exerciseTab = canvas.getByRole('button', { name: /Tooltip Exercise/i });
    await userEvent.click(exerciseTab);

    // Should show exercise content
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Challenge');
      expect(canvasElement.textContent).toContain('data-*');
      expect(canvasElement.textContent).toContain('attr(data-tooltip)');
    });
  },
};

/**
 * Tests that pseudo-classes tab shows interactive examples.
 */
export const PseudoClassesInteractive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should be on pseudo-classes tab by default
    expect(canvasElement.textContent).toContain('single colon');
    expect(canvasElement.textContent).toContain('state');

    // Should have hover button
    const hoverButton = canvas.getByRole('button', { name: /Hover me/i });
    expect(hoverButton).toBeInTheDocument();

    // Should have focus input
    const focusInput = canvas.getByPlaceholderText(/Click or tab/i);
    expect(focusInput).toBeInTheDocument();
  },
};

/**
 * Tests the comparison table is present.
 */
export const ComparisonTable: Story = {
  play: async ({ canvasElement }) => {
    // Should have the comparison table
    expect(canvasElement.textContent).toContain('Pseudo-class');
    expect(canvasElement.textContent).toContain('Pseudo-element');
    expect(canvasElement.textContent).toContain(':name');
    expect(canvasElement.textContent).toContain('::name');
    expect(canvasElement.textContent).toContain('Select by state');
    expect(canvasElement.textContent).toContain('Create virtual elements');
  },
};

/**
 * Tests focus interaction on the input.
 */
export const FocusInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the focus input
    const focusInput = canvas.getByPlaceholderText(/Click or tab/i);

    // Focus the input
    await userEvent.click(focusInput);

    // Input should be focused (has focus-input-primary class when focused)
    expect(document.activeElement).toBe(focusInput);
  },
};

/**
 * Tests showing the tooltip exercise with live example.
 */
export const TooltipLiveExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to exercise tab
    const exerciseTab = canvas.getByRole('button', { name: /Tooltip Exercise/i });
    await userEvent.click(exerciseTab);

    // Should show live result section
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Live Result');
      expect(canvasElement.textContent).toContain('underlined text');
    });

    // Should show how it works steps
    expect(canvasElement.textContent).toContain('HTML Setup');
    expect(canvasElement.textContent).toContain('Read with attr()');
    expect(canvasElement.textContent).toContain('Position absolutely');
    expect(canvasElement.textContent).toContain('Show on hover');
  },
};

/**
 * Tests the tab switching preserves state.
 */
export const TabSwitching: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start on pseudo-classes
    expect(canvasElement.textContent).toContain('single colon');

    // Switch to pseudo-elements
    await userEvent.click(canvas.getByRole('button', { name: /::pseudo-elements/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('double colon');
    });

    // Switch to exercise
    await userEvent.click(canvas.getByRole('button', { name: /Tooltip Exercise/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Challenge');
    });

    // Switch back to pseudo-classes
    await userEvent.click(canvas.getByRole('button', { name: /:pseudo-classes/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('single colon');
    });
  },
};
