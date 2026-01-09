import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import ColorContrastDemo from '@lessons/css/4_3/ColorContrastDemo';

const meta: Meta<typeof ColorContrastDemo> = {
  title: 'Lessons/css-4.3/ColorContrastDemo',
  component: ColorContrastDemo,
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

type Story = StoryObj<typeof ColorContrastDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check initial state (black on white)
    await waitFor(() => {
      expect(canvas.getByText('Sample Heading')).toBeInTheDocument();
    });

    // Should show excellent contrast
    expect(canvas.getByText('Excellent Contrast')).toBeInTheDocument();
  },
};

export const PresetSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on AA Fail preset
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /AA Fail/ })).toBeInTheDocument();
    });
    const failButton = canvas.getByRole('button', { name: /AA Fail/ });
    await userEvent.click(failButton);

    // Should show failing state - ratio is 2.85:1 which fails all levels
    await waitFor(() => {
      expect(canvas.getByText('Fails WCAG Requirements')).toBeInTheDocument();
    });

    // Click on Danger preset
    const dangerButton = canvas.getByRole('button', { name: /Danger/ });
    await userEvent.click(dangerButton);

    // Red on white (4.0:1) fails AA for normal text but passes large text
    await waitFor(() => {
      expect(canvas.getByText('Large Text Only')).toBeInTheDocument();
    });

    // Click on Good preset
    const goodButton = canvas.getByRole('button', { name: /Good/ });
    await userEvent.click(goodButton);

    // Should show excellent contrast
    await waitFor(() => {
      expect(canvas.getByText('Excellent Contrast')).toBeInTheDocument();
    });
  },
};

export const WCAGLevels: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check WCAG level labels are present
    await waitFor(() => {
      expect(canvas.getByText('AA Large')).toBeInTheDocument();
    });
    expect(canvas.getByText('AA Normal')).toBeInTheDocument();
    expect(canvas.getByText('AAA Large')).toBeInTheDocument();
    expect(canvas.getByText('AAA Normal')).toBeInTheDocument();

    // Check ratio requirements are shown
    const pageText = canvasElement.textContent || '';
    expect(pageText).toContain('3:1');
    expect(pageText).toContain('4.5:1');
    expect(pageText).toContain('7:1');
  },
};

export const ShowCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click show code button
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Show CSS Examples' })).toBeInTheDocument();
    });
    const showCodeButton = canvas.getByRole('button', { name: 'Show CSS Examples' });
    await userEvent.click(showCodeButton);

    // Check that code is displayed
    await waitFor(() => {
      const pageText = canvasElement.textContent || '';
      expect(pageText).toMatch(/Color Contrast Best Practices/);
    });

    // Check for CSS content
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/WCAG Contrast Requirements/);

    // Hide code
    const hideCodeButton = canvas.getByRole('button', { name: 'Hide CSS Examples' });
    await userEvent.click(hideCodeButton);
  },
};
