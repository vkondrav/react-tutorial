import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import TestingApproachesDemo from '@lessons/react/8_2/TestingApproachesDemo';

const meta: Meta<typeof TestingApproachesDemo> = {
  title: 'Lessons/react-8.2/TestingApproachesDemo',
  component: TestingApproachesDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive demo showing the testing pyramid with unit, integration, and E2E test levels.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing the integration level selected (recommended approach)
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for component to render - integration should be selected by default
    await waitFor(() => {
      expect(canvas.getByText('Integration Tests')).toBeInTheDocument();
    });

    // Check that key elements are visible for integration tests
    expect(canvas.getByText('Multiple components/modules')).toBeInTheDocument();
    expect(canvas.getByText('Medium-High')).toBeInTheDocument();
  },
};

/**
 * Tests clicking on the pyramid to select different test levels
 */
export const SelectUnitTests: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Unit level in pyramid
    const unitPyramidLevel = canvas.getByText('Unit');
    await userEvent.click(unitPyramidLevel);

    // Should show unit test details - wait for state update
    await waitFor(() => {
      expect(canvas.getByText('Unit Tests')).toBeInTheDocument();
    });
    expect(canvas.getByText('Single function/component')).toBeInTheDocument();
    expect(canvas.getByText('Very Fast (~ms)')).toBeInTheDocument();
  },
};

/**
 * Tests clicking on E2E level
 */
export const SelectE2ETests: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on E2E level in pyramid
    const e2ePyramidLevel = canvas.getByText('E2E');
    await userEvent.click(e2ePyramidLevel);

    // Should show E2E test details - wait for state update
    await waitFor(() => {
      expect(canvas.getByText('End-to-End Tests')).toBeInTheDocument();
    });
    expect(canvas.getByText('Entire application')).toBeInTheDocument();
    expect(canvas.getByText('Slow (~seconds)')).toBeInTheDocument();
  },
};
