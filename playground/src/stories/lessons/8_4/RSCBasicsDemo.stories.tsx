import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import RSCBasicsDemo from '@lessons/8_4/RSCBasicsDemo';

const meta: Meta<typeof RSCBasicsDemo> = {
  title: 'Lessons/8.4/RSCBasicsDemo',
  component: RSCBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the evolution of React rendering from CSR to SSR to RSC, and explains the "two worlds" mental model.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows the evolution of rendering and mental model
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check evolution section is rendered
    expect(canvas.getByText('The Evolution of React Rendering')).toBeInTheDocument();

    // Check all three approaches are shown
    expect(canvas.getByText('CSR')).toBeInTheDocument();
    expect(canvas.getByText('SSR')).toBeInTheDocument();
    expect(canvas.getByText('RSC')).toBeInTheDocument();

    // Check mental model section
    expect(canvas.getByText('Mental Model: Two Worlds')).toBeInTheDocument();
    expect(canvas.getByText('Server World')).toBeInTheDocument();
    expect(canvas.getByText('Client World')).toBeInTheDocument();
  },
};

/**
 * Tests the code toggle functionality
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Code should be hidden initially
    expect(canvas.queryByText('Server Component')).not.toBeInTheDocument();

    // Click to show code
    const showButton = canvas.getByRole('button', { name: /Show Example Code/ });
    await userEvent.click(showButton);

    // Code snippets should be visible
    await waitFor(() => {
      expect(canvas.getByText('Server Component')).toBeInTheDocument();
      expect(canvas.getByText('Client Component')).toBeInTheDocument();
    });

    // Click to hide code
    const hideButton = canvas.getByRole('button', { name: /Hide Example Code/ });
    await userEvent.click(hideButton);

    // Code should be hidden again
    await waitFor(() => {
      expect(canvas.queryByText('Server Component')).not.toBeInTheDocument();
    });
  },
};

/**
 * Verifies the key insight is displayed
 */
export const KeyInsight: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check the key insight is displayed
    expect(canvas.getByText(/The key insight:/)).toBeInTheDocument();
    expect(canvas.getByText(/Not all components need interactivity/)).toBeInTheDocument();
  },
};

/**
 * Verifies Server World capabilities are listed
 */
export const ServerWorldCapabilities: Story = {
  play: async ({ canvasElement }) => {
    // Check server capabilities
    expect(canvasElement.textContent).toContain('Direct database access');
    expect(canvasElement.textContent).toContain('File system access');
    expect(canvasElement.textContent).toContain('API keys / secrets');
    expect(canvasElement.textContent).toContain('async/await in components');

    // Check server limitations
    expect(canvasElement.textContent).toContain('No useState, useEffect');
    expect(canvasElement.textContent).toContain('No onClick, onChange');
  },
};

/**
 * Verifies Client World capabilities are listed
 */
export const ClientWorldCapabilities: Story = {
  play: async ({ canvasElement }) => {
    // Check client capabilities
    expect(canvasElement.textContent).toContain('useState, useEffect');
    expect(canvasElement.textContent).toContain('Event handlers');
    expect(canvasElement.textContent).toContain('Browser APIs');

    // Check client limitations
    expect(canvasElement.textContent).toContain('No direct DB access');
    expect(canvasElement.textContent).toContain('No server secrets');
  },
};
