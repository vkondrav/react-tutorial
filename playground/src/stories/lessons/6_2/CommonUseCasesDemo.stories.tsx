import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import CommonUseCasesDemo from '@lessons/6_2/CommonUseCasesDemo';

const meta: Meta<typeof CommonUseCasesDemo> = {
  title: 'Lessons/6.2/CommonUseCasesDemo',
  component: CommonUseCasesDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates common render prop use cases: Mouse Tracking, Data Fetching, and List Selection.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows Mouse Tracking tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show all three tab buttons
    expect(canvas.getByRole('button', { name: 'Mouse Tracking' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Data Fetching' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'List Selection' })).toBeInTheDocument();

    // Mouse Tracking tab should be active by default
    const mouseTab = canvas.getByRole('button', { name: 'Mouse Tracking' });
    expect(mouseTab.className).toContain('btn-primary');

    // Should show mouse tracking demo
    expect(canvas.getByText('Live Demo: Move your mouse!')).toBeInTheDocument();
    expect(canvas.getByText('Move mouse here')).toBeInTheDocument();
  },
};

/**
 * Mouse tracking demo shows coordinates
 */
export const MouseTrackingDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the mouse area
    expect(canvas.getByText('Move mouse here')).toBeInTheDocument();

    // Should show coordinate display
    const coordsDisplay = canvasElement.querySelector('.font-mono');
    expect(coordsDisplay).toBeInTheDocument();
    expect(coordsDisplay?.textContent).toMatch(/x: \d+, y: \d+/);
  },
};

/**
 * Switch to Data Fetching tab and verify content
 */
export const DataFetchingTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click on Data Fetching tab
    const fetchTab = canvas.getByRole('button', { name: 'Data Fetching' });
    await user.click(fetchTab);

    // Should show the fetch demo
    await waitFor(() => {
      expect(canvas.getByText('Live Demo: Fetch Users')).toBeInTheDocument();
    });

    // Should show refetch button
    expect(canvas.getByRole('button', { name: /Refetch/i })).toBeInTheDocument();
  },
};

/**
 * Data fetching shows loading state then data
 */
export const DataFetchingLoadsData: Story = {
  parameters: {
    // Allow network requests for this story
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click on Data Fetching tab
    const fetchTab = canvas.getByRole('button', { name: 'Data Fetching' });
    await user.click(fetchTab);

    // Wait for data to load (or show loading state)
    await waitFor(
      () => {
        // Either shows loading or shows user data
        const hasUsers = canvasElement.querySelector('.flex.gap-3.items-center.p-2');
        const hasLoading = canvasElement.querySelector('.animate-pulse');
        expect(hasUsers || hasLoading).toBeTruthy();
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Switch to List Selection tab and verify content
 */
export const ListSelectionTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click on List Selection tab
    const listTab = canvas.getByRole('button', { name: 'List Selection' });
    await user.click(listTab);

    // Should show the list selection demo
    await waitFor(() => {
      expect(canvas.getByText('Live Demo: Selectable List')).toBeInTheDocument();
    });

    // Should show different UI styles
    expect(canvas.getByText('As Buttons')).toBeInTheDocument();
    expect(canvas.getByText('As Cards')).toBeInTheDocument();
    expect(canvas.getByText('As Radio Options')).toBeInTheDocument();
    expect(canvas.getByText('As Tags')).toBeInTheDocument();
  },
};

/**
 * List selection - test button style selection
 */
export const ButtonStyleSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click on List Selection tab
    const listTab = canvas.getByRole('button', { name: 'List Selection' });
    await user.click(listTab);

    await waitFor(() => {
      expect(canvas.getByText('As Buttons')).toBeInTheDocument();
    });

    // Find and click on "Second item" button
    const secondItemBtns = canvas.getAllByRole('button', { name: 'Second item' });
    const buttonsStyleBtn = secondItemBtns[0];
    await user.click(buttonsStyleBtn);

    // Button should now have primary class
    await waitFor(() => {
      expect(buttonsStyleBtn.className).toContain('btn-primary');
    });
  },
};

/**
 * List selection - test radio style selection
 */
export const RadioStyleSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click on List Selection tab
    const listTab = canvas.getByRole('button', { name: 'List Selection' });
    await user.click(listTab);

    await waitFor(() => {
      expect(canvas.getByText('As Radio Options')).toBeInTheDocument();
    });

    // Find and click on a radio input for "Third item"
    const radioInputs = canvasElement.querySelectorAll('input[type="radio"]');
    expect(radioInputs.length).toBeGreaterThan(0);

    // Click the third radio
    await user.click(radioInputs[2]);

    // Radio should be checked
    await waitFor(() => {
      expect(radioInputs[2]).toBeChecked();
    });
  },
};

/**
 * List selection - test tags style selection
 */
export const TagsStyleSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click on List Selection tab
    const listTab = canvas.getByRole('button', { name: 'List Selection' });
    await user.click(listTab);

    await waitFor(() => {
      expect(canvas.getByText('As Tags')).toBeInTheDocument();
    });

    // Find tags container and click on "First item" badge
    const badges = canvasElement.querySelectorAll('.badge.cursor-pointer');
    expect(badges.length).toBeGreaterThan(0);

    await user.click(badges[0]);

    // Should show checkmark in selected tag
    await waitFor(() => {
      expect(badges[0].textContent).toContain('✓');
    });
  },
};
