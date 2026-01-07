import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import ActivityPlayground from '@lessons/react/6_5/ActivityPlayground';

const meta: Meta<typeof ActivityPlayground> = {
  title: 'Lessons/react-6.5/ActivityPlayground',
  component: ActivityPlayground,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Interactive playground comparing Conditional, CSS Hiding, and Activity approaches with Timer, Form, and Gallery components.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows Conditional approach
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show approach selection
    expect(canvas.getByText('Choose Approach')).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Conditional' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'CSS Hiding' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Activity/i })).toBeInTheDocument();

    // Should show conditional tabs by default
    expect(canvas.getByText('Conditional Rendering Tabs')).toBeInTheDocument();

    // Should show status indicators
    expect(canvas.getByText(/State lost/)).toBeInTheDocument();
  },
};

/**
 * Switch to CSS Hiding approach
 */
export const CSSHidingApproach: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click CSS Hiding button
    await user.click(canvas.getByRole('button', { name: 'CSS Hiding' }));

    // Should show CSS Hidden tabs
    await waitFor(() => {
      expect(canvas.getByText('CSS Hidden Tabs')).toBeInTheDocument();
    });

    // Should show status indicators - use getAllByText for duplicates
    const preservedTexts = canvas.getAllByText(/State preserved/);
    expect(preservedTexts.length).toBeGreaterThan(0);
  },
};

/**
 * Switch to Activity approach
 */
export const ActivityApproach: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Activity button
    await user.click(canvas.getByRole('button', { name: /Activity/i }));

    // Should show Activity tabs
    await waitFor(() => {
      expect(canvas.getByText('Activity (Simulated) Tabs')).toBeInTheDocument();
    });

    // Should show the description for Activity approach
    expect(canvas.getByText(/Best of both worlds/)).toBeInTheDocument();
  },
};

/**
 * Timer can be started and paused
 */
export const TimerInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Timer should show 00:00
    expect(canvas.getByText('00:00')).toBeInTheDocument();

    // Click play button
    const playBtns = canvasElement.querySelectorAll('button.btn-success');
    if (playBtns.length > 0) {
      await user.click(playBtns[0]);
    }

    // Wait a bit for timer to tick
    await new Promise((resolve) => setTimeout(resolve, 1100));

    // Timer should show 00:01
    await waitFor(() => {
      expect(canvas.getByText('00:01')).toBeInTheDocument();
    });
  },
};

/**
 * Tab navigation within playground
 */
export const TabNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Should show Timer tab initially
    expect(canvas.getByText('Timer (conditional)')).toBeInTheDocument();

    // Click Draft tab
    const draftBtn = canvas.getByRole('button', { name: /Draft/i });
    await user.click(draftBtn);

    // Should show form
    await waitFor(() => {
      expect(canvas.getByText('Form (conditional)')).toBeInTheDocument();
    });

    // Click Gallery tab
    const galleryBtn = canvas.getByRole('button', { name: /Gallery/i });
    await user.click(galleryBtn);

    // Should show gallery
    await waitFor(() => {
      expect(canvas.getByText('Gallery (conditional)')).toBeInTheDocument();
    });
  },
};

/**
 * Gallery image selection works
 */
export const GalleryInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Go to Gallery tab
    const galleryBtn = canvas.getByRole('button', { name: /Gallery/i });
    await user.click(galleryBtn);

    await waitFor(() => {
      expect(canvas.getByText('Gallery (conditional)')).toBeInTheDocument();
    });

    // Should show Image 1 selected initially
    expect(canvas.getByText('Image 1')).toBeInTheDocument();
    expect(canvas.getByText('Selected: 1, Zoom: 100%')).toBeInTheDocument();

    // Click second thumbnail (should be the second small colored button)
    const thumbnails = canvasElement.querySelectorAll('.w-12.h-12.rounded');
    if (thumbnails.length > 1) {
      await user.click(thumbnails[1]);
    }

    // Should show Image 2 selected
    await waitFor(() => {
      expect(canvas.getByText('Image 2')).toBeInTheDocument();
      expect(canvas.getByText('Selected: 2, Zoom: 100%')).toBeInTheDocument();
    });
  },
};

/**
 * Reset All button works
 */
export const ResetAll: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Make some changes to timer
    const playBtns = canvasElement.querySelectorAll('button.btn-success');
    if (playBtns.length > 0) {
      await user.click(playBtns[0]);
    }
    await new Promise((resolve) => setTimeout(resolve, 1100));

    // Click Reset All
    await user.click(canvas.getByRole('button', { name: 'Reset All' }));

    // Timer should be reset to 00:00
    await waitFor(() => {
      expect(canvas.getByText('00:00')).toBeInTheDocument();
    });
  },
};

/**
 * Instructions are shown
 */
export const Instructions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show Try This instructions
    expect(canvas.getByText('Try This:')).toBeInTheDocument();
    expect(canvas.getByText(/Start the timer/)).toBeInTheDocument();
    expect(canvas.getByText(/Key test:/)).toBeInTheDocument();
  },
};

/**
 * Comparison table is shown
 */
export const ComparisonTable: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show comparison
    expect(canvas.getByText('Quick Comparison')).toBeInTheDocument();

    // Should have table headers
    const conditionalHeaders = canvas.getAllByText('Conditional');
    expect(conditionalHeaders.length).toBeGreaterThan(0);
  },
};

/**
 * About simulation note is shown
 */
export const AboutSimulation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the simulation note
    expect(canvas.getByText('⚡ About This Simulation')).toBeInTheDocument();
    // The text is broken by code elements, just check it exists
    expect(canvas.getByText(/simulates/)).toBeInTheDocument();
  },
};
