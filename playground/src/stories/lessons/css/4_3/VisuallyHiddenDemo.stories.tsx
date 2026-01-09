import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import VisuallyHiddenDemo from '@lessons/css/4_3/VisuallyHiddenDemo';

const meta: Meta<typeof VisuallyHiddenDemo> = {
  title: 'Lessons/css-4.3/VisuallyHiddenDemo',
  component: VisuallyHiddenDemo,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof VisuallyHiddenDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check initial state (sr-only selected)
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Visually Hidden (sr-only)' })).toBeInTheDocument();
    });
    expect(canvas.getByText('Hidden from sight but read by screen readers.')).toBeInTheDocument();
  },
};

export const MethodComparison: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check comparison table headers
    await waitFor(() => {
      expect(canvas.getByText('Visible')).toBeInTheDocument();
    });
    expect(canvas.getByText('Screen Reader')).toBeInTheDocument();

    // Check table has Method column header
    expect(canvas.getByText('Method')).toBeInTheDocument();

    // Check all methods are in the table (using getAllByText since text appears in both button and table)
    expect(canvas.getAllByText('Visually Hidden (sr-only)').length).toBeGreaterThanOrEqual(1);
    expect(canvas.getAllByText('display: none').length).toBeGreaterThanOrEqual(1);
    expect(canvas.getAllByText('visibility: hidden').length).toBeGreaterThanOrEqual(1);
    expect(canvas.getAllByText('aria-hidden="true"').length).toBeGreaterThanOrEqual(1);
  },
};

export const MethodSwitch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on display: none
    const displayNoneButton = canvas.getByRole('button', { name: 'display: none' });
    await userEvent.click(displayNoneButton);

    await waitFor(() => {
      expect(
        canvas.getByText('Completely removed from the page. Hidden from everyone.')
      ).toBeInTheDocument();
    });

    // Click on aria-hidden
    const ariaHiddenButton = canvas.getByRole('button', { name: 'aria-hidden="true"' });
    await userEvent.click(ariaHiddenButton);

    await waitFor(() => {
      expect(canvas.getByText('Visible but hidden from screen readers.')).toBeInTheDocument();
    });
  },
};

export const CommonPatterns: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check pattern examples are present
    await waitFor(() => {
      expect(canvas.getByText('Skip Link')).toBeInTheDocument();
    });
    expect(canvas.getByText('Icon Buttons with Hidden Labels')).toBeInTheDocument();
    expect(canvas.getByText('Hiding Decorative Content')).toBeInTheDocument();

    // Check skip link text
    expect(canvas.getByText('Skip to main content')).toBeInTheDocument();
  },
};

export const ShowCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click show code button
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Show CSS Code' })).toBeInTheDocument();
    });
    const showCodeButton = canvas.getByRole('button', { name: 'Show CSS Code' });
    await userEvent.click(showCodeButton);

    // Check that code is displayed
    await waitFor(() => {
      const pageText = canvasElement.textContent || '';
      expect(pageText).toMatch(/Visually Hidden Pattern/);
    });

    // Check for CSS content
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/\.sr-only/);

    // Hide code
    const hideCodeButton = canvas.getByRole('button', { name: 'Hide CSS Code' });
    await userEvent.click(hideCodeButton);
  },
};
