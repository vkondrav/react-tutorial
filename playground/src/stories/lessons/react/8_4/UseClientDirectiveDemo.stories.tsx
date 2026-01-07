import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import UseClientDirectiveDemo from '@lessons/react/8_4/UseClientDirectiveDemo';

const meta: Meta<typeof UseClientDirectiveDemo> = {
  title: 'Lessons/react-8.4/UseClientDirectiveDemo',
  component: UseClientDirectiveDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Explains the "use client" directive syntax, how client boundaries work, and common gotchas to avoid.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows the syntax tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check tabs are rendered
    expect(canvas.getByRole('button', { name: /Syntax/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Boundary Behavior/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Common Gotchas/ })).toBeInTheDocument();
  },
};

/**
 * Tests the Syntax tab content
 */
export const SyntaxTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Syntax tab (should already be selected)
    await userEvent.click(canvas.getByRole('button', { name: /Syntax/ }));

    // Check syntax content is shown
    expect(canvasElement.textContent).toContain('The Directive Syntax');
    expect(canvasElement.textContent).toContain('use client');

    // Check correct/wrong examples
    expect(canvasElement.textContent).toContain('Correct');
    expect(canvasElement.textContent).toContain('Wrong');
  },
};

/**
 * Tests the Boundary Behavior tab
 */
export const BoundaryBehaviorTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Boundary Behavior tab
    await userEvent.click(canvas.getByRole('button', { name: /Boundary Behavior/ }));

    // Check boundary content is shown
    await waitFor(() => {
      expect(canvas.getByText('How the Boundary Works')).toBeInTheDocument();
    });

    // Check key insight is displayed
    expect(canvas.getByText(/Key insight:/)).toBeInTheDocument();
  },
};

/**
 * Tests the Common Gotchas tab
 */
export const CommonGotchasTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Common Gotchas tab
    await userEvent.click(canvas.getByRole('button', { name: /Common Gotchas/ }));

    // Check gotchas content is shown
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Common Gotchas');
    });

    // Check do/don't sections
    expect(canvasElement.textContent).toContain("Don't");
    expect(canvasElement.textContent).toContain('Do');
  },
};

/**
 * Tests tab switching
 */
export const TabSwitching: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start on Syntax (default)
    expect(canvasElement.textContent).toContain('The Directive Syntax');

    // Switch to Boundary Behavior
    await userEvent.click(canvas.getByRole('button', { name: /Boundary Behavior/ }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('How the Boundary Works');
    });

    // Switch to Common Gotchas
    await userEvent.click(canvas.getByRole('button', { name: /Common Gotchas/ }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain("Don't");
    });
  },
};
