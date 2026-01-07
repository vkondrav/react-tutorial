import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import SpecificityCalculatorDemo from '@lessons/css/1_2/SpecificityCalculatorDemo';

const meta: Meta<typeof SpecificityCalculatorDemo> = {
  title: 'Lessons/css-1.2/SpecificityCalculatorDemo',
  component: SpecificityCalculatorDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An interactive specificity calculator that lets users compare CSS selectors and see their (Inline, ID, Class, Element) scores.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing the specificity reference and preset buttons.
 */
export const Default: Story = {};

/**
 * Tests adding a simple element selector.
 */
export const ElementSelector: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the 'p' preset button - find by exact text content
    // Alternative approach - look for button with just "p" code
    const pBtn = canvas.getAllByRole('button').find((b) => {
      const code = b.querySelector('code');
      return code?.textContent === 'p';
    });
    expect(pBtn).toBeTruthy();
    await userEvent.click(pBtn!);

    // Should show the selector with score (0, 0, 0, 1)
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('(0, 0, 0, 1)');
    });

    // Should show explanation
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('1 element selector');
    });
  },
};

/**
 * Tests adding a class selector.
 */
export const ClassSelector: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the '.btn' preset button
    const btnButton = canvas.getAllByRole('button').find((b) => {
      const code = b.querySelector('code');
      return code?.textContent === '.btn';
    });
    expect(btnButton).toBeTruthy();
    await userEvent.click(btnButton!);

    // Should show the selector with score (0, 0, 1, 0)
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('(0, 0, 1, 0)');
    });
  },
};

/**
 * Tests adding an ID selector.
 */
export const IdSelector: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the '#header' preset button
    const headerButton = canvas.getAllByRole('button').find((b) => {
      const code = b.querySelector('code');
      return code?.textContent === '#header';
    });
    expect(headerButton).toBeTruthy();
    await userEvent.click(headerButton!);

    // Should show the selector with score (0, 1, 0, 0)
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('(0, 1, 0, 0)');
    });
  },
};

/**
 * Tests comparing multiple selectors and showing the winner.
 */
export const CompareSelectors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Add element selector
    const pButton = canvas.getAllByRole('button').find((b) => {
      const code = b.querySelector('code');
      return code?.textContent === 'p';
    });
    expect(pButton).toBeTruthy();
    await userEvent.click(pButton!);

    // Add class selector
    const btnButton = canvas.getAllByRole('button').find((b) => {
      const code = b.querySelector('code');
      return code?.textContent === '.btn';
    });
    expect(btnButton).toBeTruthy();
    await userEvent.click(btnButton!);

    // Should show WINS badge on the higher specificity selector
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('WINS');
    });

    // The class selector should win over the element selector
    // Score (0,0,1,0) > (0,0,0,1)
    await waitFor(() => {
      const winsSection = canvasElement.querySelector('.ring-success');
      expect(winsSection?.textContent).toContain('.btn');
    });
  },
};

/**
 * Tests entering a custom selector.
 */
export const CustomSelector: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Enter a custom selector
    const input = canvas.getByPlaceholderText(/Enter a CSS selector/i);
    await userEvent.type(input, '#nav .menu li');

    // Click Calculate
    const calculateButton = canvas.getByRole('button', { name: /Calculate/i });
    await userEvent.click(calculateButton);

    // Should show the selector in results
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('#nav .menu li');
    });

    // Should calculate score: 1 ID + 1 class + 1 element = (0, 1, 1, 1)
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('(0, 1, 1, 1)');
    });
  },
};

/**
 * Tests the reset functionality.
 */
export const ResetSelectors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Add a selector
    const pButton = canvas.getAllByRole('button').find((b) => {
      const code = b.querySelector('code');
      return code?.textContent === 'p';
    });
    expect(pButton).toBeTruthy();
    await userEvent.click(pButton!);

    // Verify it's added
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('1 element selector');
    });

    // Find the reset button - it's the one with just an SVG icon (no text content in code element)
    const buttons = canvas.getAllByRole('button');
    const resetBtn = buttons.find((btn) => {
      const hasCode = btn.querySelector('code');
      const hasSvg = btn.querySelector('svg');
      return hasSvg && !hasCode && !btn.textContent?.includes('Calculate');
    });
    expect(resetBtn).toBeTruthy();
    await userEvent.click(resetBtn!);

    // Comparison results should be cleared
    await waitFor(() => {
      expect(canvasElement.textContent).not.toContain('1 element selector');
    });
  },
};

/**
 * Tests inline style selector has highest specificity.
 */
export const InlineStyleWins: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Add inline style preset - find by the style="" text
    const buttons = canvas.getAllByRole('button');
    const styleButton = buttons.find((btn) => btn.textContent?.includes('style='));
    expect(styleButton).toBeTruthy();
    await userEvent.click(styleButton!);

    // Add ID selector
    const headerButton = canvas.getAllByRole('button').find((b) => {
      const code = b.querySelector('code');
      return code?.textContent === '#header';
    });
    expect(headerButton).toBeTruthy();
    await userEvent.click(headerButton!);

    // Inline should win
    await waitFor(() => {
      const winsSection = canvasElement.querySelector('.ring-success');
      expect(winsSection?.textContent).toContain('style=');
    });
  },
};

/**
 * Verifies the reference table is displayed.
 */
export const ReferenceTable: Story = {
  play: async ({ canvasElement }) => {
    // Should show the reference table with all selector types
    expect(canvasElement.textContent).toContain('Inline styles');
    expect(canvasElement.textContent).toContain('ID selectors');
    expect(canvasElement.textContent).toContain('Classes, attributes, pseudo-classes');
    expect(canvasElement.textContent).toContain('Elements, pseudo-elements');
    expect(canvasElement.textContent).toContain('Universal, combinators');
  },
};
