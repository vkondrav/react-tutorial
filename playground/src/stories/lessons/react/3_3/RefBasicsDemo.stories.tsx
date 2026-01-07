import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import RefBasicsDemo from '@lessons/react/3_3/RefBasicsDemo';

const meta: Meta<typeof RefBasicsDemo> = {
  title: 'Lessons/react-3.3/RefBasicsDemo',
  component: RefBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Compares useState vs useRef - shows how state triggers re-renders but refs do not.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows both columns
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('useState vs useRef');

    // Should show both columns
    expect(canvasElement.textContent).toContain('useState');
    expect(canvasElement.textContent).toContain('useRef');

    // Should have increment buttons
    expect(canvas.getByRole('button', { name: /Increment State/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Increment Ref/i })).toBeInTheDocument();

    // Should have force re-render button
    expect(canvas.getByRole('button', { name: /Force Re-render/i })).toBeInTheDocument();

    // Initial values should be 0
    expect(canvasElement.textContent).toMatch(/useState[\s\S]*0/);
    expect(canvasElement.textContent).toMatch(/useRef[\s\S]*0/);
  },
};

/**
 * Tests incrementing state (updates UI immediately)
 */
export const IncrementState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click increment state
    await userEvent.click(canvas.getByRole('button', { name: /Increment State/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Increment State/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Increment State/i }));

    // State value should update immediately in UI
    await waitFor(() => {
      const stateColumn = canvasElement.querySelector('.bg-primary\\/10');
      expect(stateColumn?.textContent).toContain('3');
    });
  },
};

/**
 * Tests incrementing ref (UI doesn't update until re-render)
 */
export const IncrementRefNoUIUpdate: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click increment ref multiple times
    await userEvent.click(canvas.getByRole('button', { name: /Increment Ref/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Increment Ref/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Increment Ref/i }));

    // Ref display should still show 0 (no re-render triggered)
    const refColumn = canvasElement.querySelector('.bg-secondary\\/10');
    expect(refColumn?.textContent).toContain('0');
  },
};

/**
 * Tests force re-render to see ref value
 */
export const ForceRerender: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Increment ref multiple times
    await userEvent.click(canvas.getByRole('button', { name: /Increment Ref/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Increment Ref/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Increment Ref/i }));

    // Force re-render
    await userEvent.click(canvas.getByRole('button', { name: /Force Re-render/i }));

    // Now ref display should show the actual value
    await waitFor(() => {
      const refColumn = canvasElement.querySelector('.bg-secondary\\/10');
      expect(refColumn?.textContent).toContain('3');
    });
  },
};

/**
 * Tests tip is displayed
 */
export const ShowsTip: Story = {
  play: async ({ canvasElement }) => {
    // Should show tip
    expect(canvasElement.textContent).toContain('Key insight');
    expect(canvasElement.textContent).toContain('ref value IS updating');
    expect(canvasElement.textContent).toContain("React doesn't know to re-render");
  },
};

/**
 * Tests explanation for both columns
 */
export const ShowsExplanations: Story = {
  play: async ({ canvasElement }) => {
    // State explanation
    expect(canvasElement.textContent).toContain('Click updates UI immediately');
    expect(canvasElement.textContent).toContain('state change triggers re-render');

    // Ref explanation
    expect(canvasElement.textContent).toContain("UI doesn't change");
    expect(canvasElement.textContent).toContain('Check console');
  },
};
