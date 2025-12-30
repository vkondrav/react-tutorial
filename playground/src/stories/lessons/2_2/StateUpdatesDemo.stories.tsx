import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import StateUpdatesDemo from '@lessons/2_2/StateUpdatesDemo';

const meta: Meta<typeof StateUpdatesDemo> = {
  title: 'Lessons/2.2/StateUpdatesDemo',
  component: StateUpdatesDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the difference between direct state updates and functional updates.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing batching and functional updates explanations
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Should show explanatory sections about state updates
    const bodyText = canvasElement.textContent || '';
    expect(bodyText.length).toBeGreaterThan(0);
  },
};

/**
 * Tests interactive demos are present
 */
export const ShowsDemos: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have interactive examples with buttons
    const buttons = canvas.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  },
};
