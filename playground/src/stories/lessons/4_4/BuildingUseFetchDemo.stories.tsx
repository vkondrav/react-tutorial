import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import BuildingUseFetchDemo from '@lessons/4_4/BuildingUseFetchDemo';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof BuildingUseFetchDemo> = {
  title: 'Lessons/4.4 Building useFetch Hook/BuildingUseFetchDemo',
  component: BuildingUseFetchDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Step-by-step guide to building the useFetch hook incrementally, from basic state to AbortController and refetch.',
      },
    },
    msw: {
      handlers,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows Step 1
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify title is present
    expect(canvas.getByText('Build useFetch Incrementally')).toBeInTheDocument();

    // Verify step buttons are present
    expect(canvas.getByRole('button', { name: /1\. State setup/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /2\. Fetch logic/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /3\. Cleanup/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /4\. Refetch/ })).toBeInTheDocument();

    // Step 1 should be selected by default
    const step1Button = canvas.getByRole('button', { name: /1\. State setup/ });
    expect(step1Button).toHaveClass('btn-primary');

    // Verify step 1 content is present (use heading role to avoid duplicate matches)
    const heading = canvas.getByRole('heading', { name: 'Step 1: Basic Structure' });
    expect(heading).toBeInTheDocument();
    expect(canvas.getByText(/Start with the three state variables/)).toBeInTheDocument();
  },
};

/**
 * Tests navigating through all steps
 */
export const NavigateSteps: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Step 2
    await userEvent.click(canvas.getByRole('button', { name: /2\. Fetch logic/ }));
    await waitFor(() => {
      expect(
        canvas.getByRole('heading', { name: 'Step 2: Add the useEffect' })
      ).toBeInTheDocument();
    });

    // Step 3
    await userEvent.click(canvas.getByRole('button', { name: /3\. Cleanup/ }));
    await waitFor(() => {
      expect(
        canvas.getByRole('heading', { name: 'Step 3: Add AbortController' })
      ).toBeInTheDocument();
    });

    // Step 4
    await userEvent.click(canvas.getByRole('button', { name: /4\. Refetch/ }));
    await waitFor(() => {
      expect(
        canvas.getByRole('heading', { name: 'Step 4: Add Refetch Function' })
      ).toBeInTheDocument();
    });

    // Back to Step 1
    await userEvent.click(canvas.getByRole('button', { name: /1\. State setup/ }));
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: 'Step 1: Basic Structure' })).toBeInTheDocument();
    });
  },
};

/**
 * Tests the live demo toggle and functionality
 */
export const LiveDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Live demo should be hidden initially
    expect(canvas.queryByText('Using the Final Hook')).not.toBeInTheDocument();

    // Click to show live demo
    const showDemoButton = canvas.getByText(/Show Live Demo/);
    await userEvent.click(showDemoButton);

    // Hide button should now be visible (meaning toggle worked)
    await waitFor(() => {
      expect(canvas.getByText(/Hide Live Demo/)).toBeInTheDocument();
    });

    // Live demo should now be visible
    expect(canvas.getByText('Using the Final Hook')).toBeInTheDocument();
  },
};

/**
 * Tests toggling the live demo and verifying the usage code snippet
 */
export const RefetchInDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Show live demo first
    await userEvent.click(canvas.getByText(/Show Live Demo/));

    // Wait for live demo section to be visible
    await waitFor(() => {
      expect(canvas.getByText(/Hide Live Demo/)).toBeInTheDocument();
    });

    // Verify the live demo shows "Using the Final Hook" label
    expect(canvas.getByText('Using the Final Hook')).toBeInTheDocument();

    // Toggle it off
    await userEvent.click(canvas.getByText(/Hide Live Demo/));

    // Should be hidden now
    await waitFor(() => {
      expect(canvas.getByText(/Show Live Demo/)).toBeInTheDocument();
    });
  },
};

/**
 * Verifies progress indicator
 */
export const ProgressIndicator: Story = {
  play: async ({ canvasElement }) => {
    // The progress indicator should show 4 segments
    const progressBars = canvasElement.querySelectorAll('.h-2.flex-1.rounded-full');
    expect(progressBars.length).toBe(4);

    // First one should be filled (primary color)
    expect(progressBars[0]).toHaveClass('bg-primary');
  },
};
