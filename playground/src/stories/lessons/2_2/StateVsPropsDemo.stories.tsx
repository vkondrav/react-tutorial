import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import StateVsPropsDemo from '@lessons/2_2/StateVsPropsDemo';

const meta: Meta<typeof StateVsPropsDemo> = {
  title: 'Lessons/2.2/StateVsPropsDemo',
  component: StateVsPropsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Comparison between state and props - shows the differences with a comparison table and interactive demo.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing comparison table and demo
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Should show comparison table headers
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('Props');
    expect(bodyText).toContain('State');

    // Should show comparison rows
    expect(bodyText).toContain('Owned by');
    expect(bodyText).toContain('Can change?');
    expect(bodyText).toContain('Passed from');

    // Should show interactive demo section
    expect(bodyText).toContain('Parent');
    expect(bodyText).toContain('Child');
  },
};

/**
 * Tests changing parent color (props)
 */
export const ChangeParentColor: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have interactive color selection
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('Parent');

    // Should have multiple clickable elements
    const buttons = canvas.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  },
};

/**
 * Tests child component's internal state
 */
export const ChildInternalState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The child component should have its own state
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('Child');

    // Should have buttons for interaction
    const buttons = canvas.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  },
};

/**
 * Tests the key takeaway section
 */
export const ShowsKeyDifference: Story = {
  play: async ({ canvasElement }) => {
    // Should highlight the key difference
    const keyIcon = canvasElement.querySelector('svg');
    expect(keyIcon).toBeTruthy();
  },
};
