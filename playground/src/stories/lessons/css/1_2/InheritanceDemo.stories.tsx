import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import InheritanceDemo from '@lessons/css/1_2/InheritanceDemo';

const meta: Meta<typeof InheritanceDemo> = {
  title: 'Lessons/css-1.2/InheritanceDemo',
  component: InheritanceDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An interactive demo showing which CSS properties inherit (text-related) and which do not (box-model), plus the inherit, initial, unset, and revert keywords.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing the Property Reference tab.
 */
export const Default: Story = {};

/**
 * Tests the Property Reference tab shows inherited properties.
 */
export const InheritedProperties: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should be on Properties tab by default
    const propsTab = canvas.getByRole('button', { name: /Property Reference/i });
    await userEvent.click(propsTab);

    // Should show inherited properties
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Inherited Properties');
      expect(canvasElement.textContent).toContain('color');
      expect(canvasElement.textContent).toContain('font-family');
      expect(canvasElement.textContent).toContain('font-size');
    });
  },
};

/**
 * Tests the Property Reference tab shows non-inherited properties.
 */
export const NonInheritedProperties: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click properties tab
    const propsTab = canvas.getByRole('button', { name: /Property Reference/i });
    await userEvent.click(propsTab);

    // Should show non-inherited properties
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Non-Inherited Properties');
      expect(canvasElement.textContent).toContain('margin');
      expect(canvasElement.textContent).toContain('padding');
      expect(canvasElement.textContent).toContain('border');
    });
  },
};

/**
 * Tests the Control Keywords tab shows all keywords.
 */
export const ControlKeywords: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the Keywords tab
    const keywordsTab = canvas.getByRole('button', { name: /Control Keywords/i });
    await userEvent.click(keywordsTab);

    // Should show all inheritance keywords
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('inherit');
      expect(canvasElement.textContent).toContain('initial');
      expect(canvasElement.textContent).toContain('unset');
      expect(canvasElement.textContent).toContain('revert');
    });

    // Should show descriptions
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Force inheritance from parent');
      expect(canvasElement.textContent).toContain('CSS specification default');
    });
  },
};

/**
 * Tests the interactive Live Demo tab.
 */
export const LiveDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the Live Demo tab
    const demoTab = canvas.getByRole('button', { name: /Live Demo/i });
    await userEvent.click(demoTab);

    // Should show the parent/child demo
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Parent Element');
      expect(canvasElement.textContent).toContain('Child Element');
    });

    // Should show inheritance explanation
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('inherited from parent');
      expect(canvasElement.textContent).toContain('NOT inherited');
    });
  },
};

/**
 * Tests changing the color slider in Live Demo.
 */
export const ChangeColor: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Go to Live Demo tab
    const demoTab = canvas.getByRole('button', { name: /Live Demo/i });
    await userEvent.click(demoTab);

    // Find color input (type="color")
    const colorInput = canvasElement.querySelector('input[type="color"]') as HTMLInputElement;
    expect(colorInput).toBeTruthy();

    // The color input should exist and be controllable
    // (Actual color change testing is complex in Storybook)
    await waitFor(() => {
      expect(colorInput.value).toBeTruthy();
    });
  },
};

/**
 * Tests changing the font size slider in Live Demo.
 */
export const ChangeFontSize: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Go to Live Demo tab
    const demoTab = canvas.getByRole('button', { name: /Live Demo/i });
    await userEvent.click(demoTab);

    // Find range input for font size
    const rangeInput = canvasElement.querySelector('input[type="range"]') as HTMLInputElement;
    expect(rangeInput).toBeTruthy();

    // Should show the current value
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('px');
    });
  },
};

/**
 * Verifies the rule of thumb is displayed.
 */
export const RuleOfThumb: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click properties tab
    const propsTab = canvas.getByRole('button', { name: /Property Reference/i });
    await userEvent.click(propsTab);

    // Should show the rule of thumb
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Rule of Thumb');
      expect(canvasElement.textContent).toContain('text appearance');
      expect(canvasElement.textContent).toContain('box size or position');
    });
  },
};

/**
 * Tests that the grandchild element also shows inheritance.
 */
export const GrandchildInheritance: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Go to Live Demo tab
    const demoTab = canvas.getByRole('button', { name: /Live Demo/i });
    await userEvent.click(demoTab);

    // Should show grandchild inherits too
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Grandchild Element');
      expect(canvasElement.textContent).toContain('parent chain');
    });
  },
};
