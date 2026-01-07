import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import SelectorMatchingDemo from '@lessons/css/1_1/SelectorMatchingDemo';

const meta: Meta<typeof SelectorMatchingDemo> = {
  title: 'Lessons/css-1.1/SelectorMatchingDemo',
  component: SelectorMatchingDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An interactive demo showing how different CSS selectors match elements in the DOM tree. Click selector buttons to see which elements get matched.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing the selector buttons and DOM tree visualization.
 */
export const Default: Story = {};

/**
 * Tests clicking the element selector (p) highlights all paragraphs.
 */
export const ElementSelector: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the 'p' selector button
    const pButton = canvas.getByRole('button', { name: /^p$/i });
    await userEvent.click(pButton);

    // Should show description
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Matches all <p> elements');
    });

    // Should show 3 elements matched (wait for animation delay)
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('3 elements matched');
    });
  },
};

/**
 * Tests clicking the class selector (.highlight) highlights matching elements.
 */
export const ClassSelector: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the '.highlight' selector button
    const highlightButton = canvas.getByRole('button', { name: /\.highlight/i });
    await userEvent.click(highlightButton);

    // Should show description
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('class="highlight"');
    });

    // Should show 2 elements matched (wait for animation delay)
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('2 elements matched');
    });
  },
};

/**
 * Tests clicking the ID selector (#main) highlights one element.
 */
export const IdSelector: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the '#main' selector button
    const mainButton = canvas.getByRole('button', { name: /#main/i });
    await userEvent.click(mainButton);

    // Should show description
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('id="main"');
    });

    // Should show 1 element matched (wait for animation delay)
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('1 element matched');
    });
  },
};

/**
 * Tests the descendant selector (.card p) matches paragraphs inside .card.
 */
export const DescendantSelector: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the '.card p' selector button
    const cardPButton = canvas.getByRole('button', { name: /\.card p$/i });
    await userEvent.click(cardPButton);

    // Should show description about any depth
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('any depth');
    });

    // Should show 2 elements matched (wait for animation delay)
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('2 elements matched');
    });
  },
};

/**
 * Tests the child selector (.card > p) only matches direct children.
 */
export const ChildSelector: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the '.card > p' selector button
    const directChildButton = canvas.getByRole('button', { name: /\.card > p/i });
    await userEvent.click(directChildButton);

    // Should show description about direct child
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('direct child');
    });

    // Should show 1 element matched (wait for animation delay)
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('1 element matched');
    });
  },
};

/**
 * Tests the attribute selector ([data-tooltip]) matches elements with that attribute.
 */
export const AttributeSelector: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the '[data-tooltip]' selector button
    const attrButton = canvas.getByRole('button', { name: /\[data-tooltip\]/i });
    await userEvent.click(attrButton);

    // Should show description about data-tooltip attribute
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('data-tooltip attribute');
    });

    // Should show 1 element matched (wait for animation delay)
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('1 element matched');
    });
  },
};

/**
 * Tests the Reset button clears the selection.
 */
export const ResetSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // First, select something
    const pButton = canvas.getByRole('button', { name: /^p$/i });
    await userEvent.click(pButton);

    // Verify selection is shown
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('3 elements matched');
    });

    // Click Reset
    const resetButton = canvas.getByRole('button', { name: /Reset/i });
    await userEvent.click(resetButton);

    // Match count should be gone
    await waitFor(() => {
      expect(canvasElement.textContent).not.toContain('elements matched');
    });
  },
};
