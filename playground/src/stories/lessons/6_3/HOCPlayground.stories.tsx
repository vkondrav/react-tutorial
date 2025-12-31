import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import HOCPlayground from '@lessons/6_3/HOCPlayground';

const meta: Meta<typeof HOCPlayground> = {
  title: 'Lessons/6.3/HOCPlayground',
  component: HOCPlayground,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Interactive playground for experimenting with HOCs. Demonstrates single HOCs and composed HOCs with various states.',
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
 * Default view shows both demo sections
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show Demo 1: Single HOC
    expect(canvas.getByText('Demo 1: Single HOC')).toBeInTheDocument();
    expect(canvas.getByText(/withLoading\(ProductCard\)/)).toBeInTheDocument();
    expect(canvas.getByText(/withBorder\(UserProfile\)/)).toBeInTheDocument();

    // Should show Demo 2: Composed HOCs
    expect(canvas.getByText('Demo 2: Composed HOCs')).toBeInTheDocument();
    expect(
      canvas.getByText(/withTimestamp\(withBorder\(withLoading\(withError\(ProductCard\)\)\)\)/)
    ).toBeInTheDocument();

    // Should show HOC wrapper stack visualization
    expect(canvas.getByText('HOC Wrapper Stack (DevTools View)')).toBeInTheDocument();
  },
};

/**
 * Test single HOC - withLoading
 */
export const SingleHOCLoading: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find the product card with loading
    expect(canvas.getByText(/withLoading\(ProductCard\)/)).toBeInTheDocument();

    // Initially should show the product
    expect(canvas.getByText('React Course')).toBeInTheDocument();
    expect(canvas.getByText('$99')).toBeInTheDocument();
    expect(canvas.getByText('Learn React from scratch')).toBeInTheDocument();

    // Click "Simulate Loading" button
    const loadBtn = canvas.getByRole('button', { name: /Simulate Loading/i });
    await user.click(loadBtn);

    // Should show loading spinner
    await waitFor(() => {
      const spinner = canvasElement.querySelector('.loading.loading-spinner');
      expect(spinner).toBeInTheDocument();
    });

    // Wait for loading to complete (1.5s)
    await waitFor(
      () => {
        expect(canvas.getByText('React Course')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Test single HOC - withBorder color changes
 */
export const SingleHOCBorderColors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find the user profile section
    expect(canvas.getByText(/withBorder\(UserProfile\)/)).toBeInTheDocument();
    expect(canvas.getByText('Jane Doe')).toBeInTheDocument();
    expect(canvas.getByText('jane@example.com')).toBeInTheDocument();

    // Test different border colors
    const colors = ['secondary', 'accent', 'success', 'error', 'primary'];
    for (const color of colors) {
      const colorBtn = canvas.getAllByRole('button', { name: color })[0];
      await user.click(colorBtn);

      await waitFor(() => {
        // The first border should have the selected color class
        const borderedDiv = canvasElement.querySelector(`div.border-${color}`);
        expect(borderedDiv).toBeInTheDocument();
      });
    }
  },
};

/**
 * Test composed HOCs - loading state
 */
export const ComposedHOCsLoading: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Should show composed HOC section
    expect(canvas.getByText('Demo 2: Composed HOCs')).toBeInTheDocument();

    // Should show the enhanced product initially
    expect(canvas.getByText('Pro React Bundle')).toBeInTheDocument();
    expect(canvas.getByText('$249')).toBeInTheDocument();

    // Click Load button
    const loadBtn = canvas.getByRole('button', { name: /^Load$/i });
    await user.click(loadBtn);

    // Should show loading spinner
    await waitFor(() => {
      const spinner = canvasElement.querySelector('.loading.loading-spinner');
      expect(spinner).toBeInTheDocument();
    });

    // Wait for loading to complete
    await waitFor(
      () => {
        expect(canvas.getByText('Pro React Bundle')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Test composed HOCs - error state
 */
export const ComposedHOCsError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click "Trigger Error" button
    const errorBtn = canvas.getByRole('button', { name: /Trigger Error/i });
    await user.click(errorBtn);

    // Should show error message
    await waitFor(() => {
      expect(canvas.getByText('⚠️ Error')).toBeInTheDocument();
      expect(canvas.getByText('Failed to load product data')).toBeInTheDocument();
    });

    // Click "Clear Error" button
    const clearBtn = canvas.getByRole('button', { name: /Clear Error/i });
    await user.click(clearBtn);

    // Should show product again
    await waitFor(() => {
      expect(canvas.getByText('Pro React Bundle')).toBeInTheDocument();
    });
  },
};

/**
 * Test composed HOCs - timestamp toggle
 */
export const ComposedHOCsTimestamp: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Timestamp should be visible by default
    expect(canvas.getByText(/Last rendered:/)).toBeInTheDocument();

    // Find and uncheck timestamp checkbox
    const timestampCheckbox = canvas.getByRole('checkbox');
    expect(timestampCheckbox).toBeChecked();

    await user.click(timestampCheckbox);

    // Timestamp should be hidden
    await waitFor(() => {
      expect(canvas.queryByText(/Last rendered:/)).not.toBeInTheDocument();
    });

    // Re-enable timestamp
    await user.click(timestampCheckbox);

    // Timestamp should be visible again
    await waitFor(() => {
      expect(canvas.getByText(/Last rendered:/)).toBeInTheDocument();
    });
  },
};

/**
 * Test composed HOCs - border color selector
 */
export const ComposedHOCsBorderColor: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find border color selector in Demo 2
    expect(canvas.getByText('Border:')).toBeInTheDocument();

    // Get all button sets for Demo 2 (second set of color buttons)
    const allBorderBtns = canvasElement.querySelectorAll('.flex.gap-2.mb-4 button');

    // Click on "accent" color button in Demo 2
    const accentBtn = Array.from(allBorderBtns).find((btn) => btn.textContent === 'accent');
    if (accentBtn) {
      await user.click(accentBtn);
    }

    // The composed component should have accent border
    await waitFor(() => {
      const accentBorder = canvasElement.querySelector('.border-accent');
      expect(accentBorder).toBeInTheDocument();
    });
  },
};

/**
 * Verify HOC wrapper stack visualization
 */
export const HOCStackVisualization: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the HOC stack
    expect(canvas.getByText('HOC Wrapper Stack (DevTools View)')).toBeInTheDocument();

    // The innermost wrapper appears in multiple parent strings, so just verify the section exists
    // by checking for the primary (outermost) wrapper specifically
    const stackSection = canvasElement.querySelector('.font-mono.text-sm.bg-base-200');
    expect(stackSection).toBeInTheDocument();

    // Check for the innermost one which only appears once
    expect(canvas.getByText(/▸ <ProductCard>/)).toBeInTheDocument();

    // Should explain the wrapping
    expect(canvas.getByText(/Each HOC wraps the previous one/)).toBeInTheDocument();
  },
};

/**
 * Verify Hooks vs HOCs note
 */
export const HooksVsHOCsNote: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the when to use section
    expect(canvas.getByText('When to Use HOCs vs Hooks')).toBeInTheDocument();
    expect(canvas.getByText(/Use HOCs when:/)).toBeInTheDocument();
    expect(canvas.getByText(/Use Hooks when:/)).toBeInTheDocument();
  },
};
