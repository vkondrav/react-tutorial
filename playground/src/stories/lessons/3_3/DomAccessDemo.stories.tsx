import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import DomAccessDemo from '@lessons/3_3/DomAccessDemo';

const meta: Meta<typeof DomAccessDemo> = {
  title: 'Lessons/3.3/DomAccessDemo',
  component: DomAccessDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Shows three DOM access patterns: Focus input, Scroll to element, and Measure dimensions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - Focus tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('DOM Access Examples');

    // Should have all tabs
    expect(canvas.getByRole('button', { name: /^Focus$/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /^Scroll$/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /^Measure$/i })).toBeInTheDocument();

    // Focus tab should be active by default
    expect(canvasElement.textContent).toContain('programmatically focus inputs');
  },
};

/**
 * Tests Focus tab functionality
 */
export const FocusTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have input and buttons
    expect(canvas.getByPlaceholderText(/Click a button to interact/i)).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Focus Input/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Select All/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Clear/i })).toBeInTheDocument();

    // Type something
    const input = canvas.getByPlaceholderText(/Click a button to interact/i);
    await userEvent.type(input, 'Hello World');

    // Clear should work
    await userEvent.click(canvas.getByRole('button', { name: /Clear/i }));
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  },
};

/**
 * Tests Scroll tab functionality
 */
export const ScrollTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Scroll tab
    await userEvent.click(canvas.getByRole('button', { name: /^Scroll$/i }));

    // Should show scroll content
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('scroll to specific elements');
    });

    // Should have scroll buttons
    expect(canvas.getByRole('button', { name: /Scroll to Top/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Scroll to Bottom/i })).toBeInTheDocument();

    // Should show list items
    expect(canvasElement.textContent).toContain('Top of the list');
    expect(canvasElement.textContent).toContain('Bottom of the list');
  },
};

/**
 * Tests Measure tab functionality
 */
export const MeasureTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Measure tab
    await userEvent.click(canvas.getByRole('button', { name: /^Measure$/i }));

    // Should show measure content
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('measure DOM elements');
    });

    // Should show dimensions
    expect(canvasElement.textContent).toContain('Width:');
    expect(canvasElement.textContent).toContain('Height:');
    expect(canvasElement.textContent).toContain('px');

    // Should have resize slider
    expect(canvas.getByRole('slider')).toBeInTheDocument();
  },
};

/**
 * Tests switching between all tabs
 */
export const SwitchTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start on Focus
    expect(canvasElement.textContent).toContain('programmatically focus');

    // Switch to Scroll
    await userEvent.click(canvas.getByRole('button', { name: /^Scroll$/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('scroll to specific elements');
    });

    // Switch to Measure
    await userEvent.click(canvas.getByRole('button', { name: /^Measure$/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('measure DOM elements');
    });

    // Switch back to Focus
    await userEvent.click(canvas.getByRole('button', { name: /^Focus$/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('programmatically focus');
    });
  },
};
