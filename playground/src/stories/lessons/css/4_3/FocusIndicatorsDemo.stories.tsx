import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import FocusIndicatorsDemo from '@lessons/css/4_3/FocusIndicatorsDemo';

const meta: Meta<typeof FocusIndicatorsDemo> = {
  title: 'Lessons/css-4.3/FocusIndicatorsDemo',
  component: FocusIndicatorsDemo,
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

type Story = StoryObj<typeof FocusIndicatorsDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check initial state (:focus-visible selected)
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: ':focus-visible' })).toBeInTheDocument();
    });
    expect(
      canvas.getByText('Shows focus only for keyboard navigation, not mouse clicks. Best UX.')
    ).toBeInTheDocument();
    expect(canvas.getByText('Best Practice')).toBeInTheDocument();
  },
};

export const ApproachSwitch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on outline: none
    const noneButton = canvas.getByRole('button', { name: 'outline: none' });
    await userEvent.click(noneButton);

    await waitFor(() => {
      expect(
        canvas.getByText(
          'Removes focus indicator completely. Keyboard users cannot see where they are.'
        )
      ).toBeInTheDocument();
    });
    expect(canvas.getByText('Inaccessible')).toBeInTheDocument();

    // Should show warning
    expect(canvas.getByText('Never do this!')).toBeInTheDocument();

    // Click on Browser Default
    const defaultButton = canvas.getByRole('button', { name: 'Browser Default' });
    await userEvent.click(defaultButton);

    await waitFor(() => {
      expect(canvas.getByText('Acceptable')).toBeInTheDocument();
    });

    // Click on Custom :focus
    const customButton = canvas.getByRole('button', { name: 'Custom :focus' });
    await userEvent.click(customButton);

    await waitFor(() => {
      expect(canvas.getByText('Good')).toBeInTheDocument();
    });
  },
};

export const InteractiveDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the focus me button
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Focus Me' })).toBeInTheDocument();
    });

    // Check initial focus state
    expect(canvas.getByText('Not Focused')).toBeInTheDocument();

    // Tab to the button (keyboard focus)
    const focusMeButton = canvas.getByRole('button', { name: 'Focus Me' });
    await userEvent.tab(); // First tab from nowhere
    await focusMeButton.focus(); // Focus the button directly

    await waitFor(() => {
      // Button should be focused
      expect(document.activeElement).toBe(focusMeButton);
    });
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
      expect(pageText).toMatch(/Focus Indicator Patterns/);
    });

    // Check for CSS content
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/:focus-visible/);

    // Hide code
    const hideCodeButton = canvas.getByRole('button', { name: 'Hide CSS Code' });
    await userEvent.click(hideCodeButton);
  },
};
