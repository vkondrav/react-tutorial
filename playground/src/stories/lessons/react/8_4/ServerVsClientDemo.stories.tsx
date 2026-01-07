import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import ServerVsClientDemo from '@lessons/react/8_4/ServerVsClientDemo';

const meta: Meta<typeof ServerVsClientDemo> = {
  title: 'Lessons/react-8.4/ServerVsClientDemo',
  component: ServerVsClientDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Compares Server Components vs Client Components with a feature table, composition patterns, and boundary rules.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows the comparison table
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check tabs are rendered
    expect(canvas.getByRole('button', { name: /Comparison Table/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Composition Pattern/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /The Boundary Rule/ })).toBeInTheDocument();

    // Check comparison table is shown by default
    expect(canvas.getByText('Feature')).toBeInTheDocument();
  },
};

/**
 * Tests the Comparison Table tab content
 */
export const ComparisonTableTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Comparison Table tab (should already be selected)
    await userEvent.click(canvas.getByRole('button', { name: /Comparison Table/ }));

    // Check some feature rows exist
    expect(canvasElement.textContent).toContain('Render to HTML');
    expect(canvasElement.textContent).toContain('async/await in component');
    expect(canvasElement.textContent).toContain('useState / useReducer');
  },
};

/**
 * Tests the Composition Pattern tab
 */
export const CompositionPatternTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Composition Pattern tab
    await userEvent.click(canvas.getByRole('button', { name: /Composition Pattern/ }));

    // Check composition content is shown
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Component Tree');
    });

    // Check the visual tree shows server and client components
    expect(canvasElement.textContent).toContain('ProductPage');
    expect(canvasElement.textContent).toContain('AddToCart');
  },
};

/**
 * Tests the Boundary Rule tab
 */
export const BoundaryRuleTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Boundary Rule tab
    await userEvent.click(canvas.getByRole('button', { name: /The Boundary Rule/ }));

    // Check boundary rule content is shown
    await waitFor(() => {
      expect(canvas.getByText('The Critical Rule: Boundary Direction')).toBeInTheDocument();
    });

    // Check allowed/not allowed sections
    expect(canvas.getByText('Allowed')).toBeInTheDocument();
    expect(canvas.getByText('Not Allowed')).toBeInTheDocument();
  },
};

/**
 * Tests tab switching
 */
export const TabSwitching: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start on Comparison Table (default)
    expect(canvasElement.textContent).toContain('Render to HTML');

    // Switch to Composition Pattern
    await userEvent.click(canvas.getByRole('button', { name: /Composition Pattern/ }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Component Tree');
    });

    // Switch to Boundary Rule
    await userEvent.click(canvas.getByRole('button', { name: /The Boundary Rule/ }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('The Critical Rule');
    });

    // Switch back to Comparison Table
    await userEvent.click(canvas.getByRole('button', { name: /Comparison Table/ }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Render to HTML');
    });
  },
};
