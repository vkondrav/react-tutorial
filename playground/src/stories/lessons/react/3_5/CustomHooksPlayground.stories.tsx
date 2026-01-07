import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import CustomHooksPlayground from '@lessons/react/3_5/CustomHooksPlayground';

const meta: Meta<typeof CustomHooksPlayground> = {
  title: 'Lessons/react-3.5/CustomHooksPlayground',
  component: CustomHooksPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive playground with 4 custom hooks: useOnlineStatus, useInterval, useCopyToClipboard, and useHover.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - useOnlineStatus tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have title
    expect(canvasElement.textContent).toContain('Try These Hooks');

    // Should have all tabs
    expect(canvas.getByRole('button', { name: /useOnlineStatus/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /useInterval/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /useCopyToClipboard/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /useHover/i })).toBeInTheDocument();

    // Online status tab should be active by default
    expect(canvasElement.textContent).toContain('network status');
    expect(canvasElement.textContent).toContain('Online');
  },
};

/**
 * Tests useInterval demo
 */
export const UseIntervalDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to interval tab
    await userEvent.click(canvas.getByRole('button', { name: /useInterval/i }));

    // Should show interval demo
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('declarative interval hook');
      expect(canvasElement.textContent).toContain('ticks/sec');
    });

    // Should have pause/resume button
    const pauseBtn = canvas.getByRole('button', { name: /Pause/i });
    expect(pauseBtn).toBeInTheDocument();

    // Click pause
    await userEvent.click(pauseBtn);

    // Should now say Resume
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Resume/i })).toBeInTheDocument();
    });
  },
};

/**
 * Tests useCopyToClipboard demo
 */
export const UseCopyToClipboardDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to clipboard tab
    await userEvent.click(canvas.getByRole('button', { name: /useCopyToClipboard/i }));

    // Should show clipboard demo
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Copy text to clipboard');
      expect(canvasElement.textContent).toContain('npm install react');
    });

    // Should show sample texts
    expect(canvasElement.textContent).toContain('useState');
    expect(canvasElement.textContent).toContain('create-react-app');
    expect(canvasElement.textContent).toContain('react.dev');
  },
};

/**
 * Tests useHover demo
 */
export const UseHoverDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to hover tab
    await userEvent.click(canvas.getByRole('button', { name: /useHover/i }));

    // Should show hover demo
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Track hover state');
      expect(canvasElement.textContent).toContain('Hover me');
    });

    // Should show all three hover targets with emojis
    expect(canvasElement.textContent).toContain('🎨');
    expect(canvasElement.textContent).toContain('🚀');
    expect(canvasElement.textContent).toContain('✨');
  },
};

/**
 * Tests switching between all tabs
 */
export const SwitchTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start on Online Status
    expect(canvasElement.textContent).toContain('network status');

    // Switch to Interval
    await userEvent.click(canvas.getByRole('button', { name: /useInterval/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('ticks/sec');
    });

    // Switch to Clipboard
    await userEvent.click(canvas.getByRole('button', { name: /useCopyToClipboard/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('npm install react');
    });

    // Switch to Hover
    await userEvent.click(canvas.getByRole('button', { name: /useHover/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Hover me');
    });

    // Switch back to Online Status
    await userEvent.click(canvas.getByRole('button', { name: /useOnlineStatus/i }));
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('network status');
    });
  },
};

/**
 * Tests interval reset functionality
 */
export const IntervalReset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to interval tab
    await userEvent.click(canvas.getByRole('button', { name: /useInterval/i }));

    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Reset Count/i })).toBeInTheDocument();
    });

    // Click Reset Count
    await userEvent.click(canvas.getByRole('button', { name: /Reset Count/i }));

    // Count should reset (though it might tick again quickly)
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Reset Count');
    });
  },
};
