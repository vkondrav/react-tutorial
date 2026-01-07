import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import StorybookSetupDemo from '@lessons/react/8_2/StorybookSetupDemo';

const meta: Meta<typeof StorybookSetupDemo> = {
  title: 'Lessons/react-8.2/StorybookSetupDemo',
  component: StorybookSetupDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Walkthrough of Storybook configuration showing story file structure, global config, and running Storybook.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with the first step expanded
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // First step should be expanded by default
    await waitFor(() => {
      expect(canvas.getByText('1. Story File Structure')).toBeInTheDocument();
    });

    // Key concepts should be visible
    expect(canvas.getByText('Key Storybook Concepts')).toBeInTheDocument();
  },
};

/**
 * Tests expanding different setup steps
 */
export const ExpandGlobalConfig: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on step 2
    const step2 = canvas.getByText('2. Global Configuration');
    await userEvent.click(step2);

    // Should show preview.ts content
    await waitFor(() => {
      expect(canvas.getByText('.storybook/preview.ts')).toBeInTheDocument();
    });
  },
};

/**
 * Tests the running Storybook step
 */
export const ExpandRunningStep: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on step 3
    const step3 = canvas.getByText('3. Running Storybook');
    await userEvent.click(step3);

    // Should show terminal commands
    await waitFor(() => {
      expect(canvas.getByText('Terminal commands')).toBeInTheDocument();
    });
  },
};
