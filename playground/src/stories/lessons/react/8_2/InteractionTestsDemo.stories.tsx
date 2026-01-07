import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import InteractionTestsDemo from '@lessons/react/8_2/InteractionTestsDemo';

const meta: Meta<typeof InteractionTestsDemo> = {
  title: 'Lessons/react-8.2/InteractionTestsDemo',
  component: InteractionTestsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates play functions, query methods, async testing, and assertions for Storybook interaction tests.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing play functions basics
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show play function code
    expect(canvas.getByText('Counter.stories.tsx')).toBeInTheDocument();

    // Should show key imports
    expect(canvas.getByText('Key Imports')).toBeInTheDocument();
  },
};

/**
 * Tests the Finding Elements tab
 */
export const QueriesTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Finding Elements tab
    const queriesTab = canvas.getByRole('button', { name: /Finding Elements/ });
    await userEvent.click(queriesTab);

    // Should show query methods code
    await waitFor(() => {
      expect(canvas.getByText('Query Priority (Best → Last Resort)')).toBeInTheDocument();
    });
  },
};

/**
 * Tests the Async Testing tab
 */
export const AsyncTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Async Testing tab
    const asyncTab = canvas.getByRole('button', { name: /Async Testing/ });
    await userEvent.click(asyncTab);

    // Should show async testing code
    await waitFor(() => {
      expect(canvas.getByText('Async test example')).toBeInTheDocument();
    });
  },
};

/**
 * Tests the Assertions tab
 */
export const AssertionsTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Assertions tab
    const assertionsTab = canvas.getByRole('button', { name: /Assertions/ });
    await userEvent.click(assertionsTab);

    // Should show assertion categories
    await waitFor(() => {
      expect(canvas.getByText('Presence')).toBeInTheDocument();
      expect(canvas.getByText('Content')).toBeInTheDocument();
      expect(canvas.getByText('State')).toBeInTheDocument();
      expect(canvas.getByText('Collections')).toBeInTheDocument();
    });
  },
};
