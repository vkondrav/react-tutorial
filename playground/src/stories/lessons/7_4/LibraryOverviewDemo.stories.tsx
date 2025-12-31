import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import LibraryOverviewDemo from '@lessons/7_4/LibraryOverviewDemo';

const meta: Meta<typeof LibraryOverviewDemo> = {
  title: 'Lessons/7.4/LibraryOverviewDemo',
  component: LibraryOverviewDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Provides an overview of popular state management libraries: Zustand, Redux Toolkit, TanStack Query, and Jotai.',
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
 * Default view shows Zustand selected
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show library tabs
    expect(canvas.getByRole('button', { name: /Zustand/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Redux Toolkit/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /TanStack Query/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Jotai/i })).toBeInTheDocument();

    // Zustand should be shown by default
    expect(canvas.getByText('Bear necessities for state management')).toBeInTheDocument();
  },
};

/**
 * Zustand details are displayed
 */
export const ZustandDetails: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show Zustand details
    expect(canvas.getByText('~1.1 kB')).toBeInTheDocument();
    expect(canvas.getByText('47k+')).toBeInTheDocument();

    // Learning curve should be Easy
    const easyTexts = canvas.getAllByText('Easy');
    expect(easyTexts.length).toBeGreaterThan(0);

    // Should show best for badges
    expect(canvas.getByText('Small-medium apps')).toBeInTheDocument();
    expect(canvas.getByText('Quick setup')).toBeInTheDocument();

    // Should show pros
    expect(canvas.getByText('Tiny bundle size')).toBeInTheDocument();
    expect(canvas.getByText('No providers needed')).toBeInTheDocument();
  },
};

/**
 * Switch to Redux Toolkit
 */
export const ReduxToolkitSelected: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Redux Toolkit
    await user.click(canvas.getByRole('button', { name: /Redux Toolkit/i }));

    // Should show Redux Toolkit details
    await waitFor(() => {
      expect(canvas.getByText('The official, opinionated Redux')).toBeInTheDocument();
    });

    // Should show best for badges
    expect(canvas.getByText('Large apps')).toBeInTheDocument();
    expect(canvas.getByText('Team projects')).toBeInTheDocument();

    // Should show pros
    expect(canvas.getByText('Excellent DevTools')).toBeInTheDocument();
    expect(canvas.getByText('Predictable patterns')).toBeInTheDocument();
  },
};

/**
 * Switch to TanStack Query
 */
export const TanStackQuerySelected: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click TanStack Query
    await user.click(canvas.getByRole('button', { name: /TanStack Query/i }));

    // Should show TanStack Query details
    await waitFor(() => {
      expect(canvas.getByText('Powerful async state management')).toBeInTheDocument();
    });

    // Should show best for badges
    expect(canvas.getByText('Server state')).toBeInTheDocument();
    expect(canvas.getByText('API data caching')).toBeInTheDocument();

    // Should show pros
    expect(canvas.getByText('Auto caching')).toBeInTheDocument();
    expect(canvas.getByText('Background refetch')).toBeInTheDocument();
  },
};

/**
 * Switch to Jotai
 */
export const JotaiSelected: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Jotai
    await user.click(canvas.getByRole('button', { name: /Jotai/i }));

    // Should show Jotai details
    await waitFor(() => {
      expect(canvas.getByText('Primitive and flexible state for React')).toBeInTheDocument();
    });

    expect(canvas.getByText('~2.4 kB')).toBeInTheDocument();
    expect(canvas.getByText('Atomic state')).toBeInTheDocument();
    expect(canvas.getByText('Fine-grained updates')).toBeInTheDocument();
  },
};

/**
 * Code example toggle
 */
export const CodeExampleToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Show Code Example
    await user.click(canvas.getByRole('button', { name: 'Show Code Example' }));

    // Should show Zustand code example
    await waitFor(() => {
      expect(canvas.getByText('Zustand Example')).toBeInTheDocument();
    });

    // Click Hide Code Example
    await user.click(canvas.getByRole('button', { name: 'Hide Code Example' }));

    // Code should be hidden
    await waitFor(() => {
      expect(canvas.queryByText('Zustand Example')).not.toBeInTheDocument();
    });
  },
};

/**
 * Comparison table is shown
 */
export const ComparisonTable: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show comparison table
    expect(canvas.getByText('Quick Comparison')).toBeInTheDocument();

    // Should show table headers
    expect(canvas.getByRole('columnheader', { name: 'Library' })).toBeInTheDocument();
    expect(canvas.getByRole('columnheader', { name: 'Size' })).toBeInTheDocument();
    expect(canvas.getByRole('columnheader', { name: 'Learning' })).toBeInTheDocument();

    // Should show library rows in table
    const tableRows = canvasElement.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(4);
  },
};

/**
 * TanStack Query note is shown
 */
export const TanStackQueryNote: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the note about TanStack Query
    expect(canvas.getByText('Note:')).toBeInTheDocument();
    expect(
      canvas.getByText(/TanStack Query is not a replacement for client state/)
    ).toBeInTheDocument();
  },
};
