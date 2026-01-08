import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import BackgroundLayeringDemo from '@lessons/css/3_1/BackgroundLayeringDemo';

const meta: Meta<typeof BackgroundLayeringDemo> = {
  title: 'Lessons/CSS/3.1 Backgrounds & Borders/BackgroundLayeringDemo',
  component: BackgroundLayeringDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof BackgroundLayeringDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check preset buttons are present
    await expect(canvas.getByRole('button', { name: 'Gradient Overlay' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Color Tint' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Multiply Effect' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Pattern + Gradient' })).toBeInTheDocument();
  },
};

export const PresetSwitching: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Color Tint preset
    await user.click(canvas.getByRole('button', { name: 'Color Tint' }));

    // Click Multiply Effect preset
    await user.click(canvas.getByRole('button', { name: 'Multiply Effect' }));

    // Check blend mode select is visible
    const select = canvas.getByRole('combobox');
    expect(select).toBeInTheDocument();
  },
};

export const BlendModeSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find the blend mode select
    const select = canvas.getByRole('combobox');
    expect(select).toBeInTheDocument();

    // Change blend mode
    await user.selectOptions(select, 'multiply');

    await waitFor(() => {
      expect(select).toHaveValue('multiply');
    });
  },
};

export const LayerToggles: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find layer checkboxes
    const checkboxes = canvas.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);

    // Toggle first layer off
    const firstCheckbox = checkboxes[0];
    expect(firstCheckbox).toBeChecked();
    await user.click(firstCheckbox);

    await waitFor(() => {
      expect(firstCheckbox).not.toBeChecked();
    });
  },
};

export const ShowLayerOrder: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click show order button
    const showOrderBtn = canvas.getByRole('button', { name: 'Show order' });
    await user.click(showOrderBtn);

    // Button text should change to "Hide order"
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Hide order' })).toBeInTheDocument();
    });
  },
};

export const LayerOrderConcept: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check layer order explanation
    await expect(canvas.getByText('Layer Order Matters')).toBeInTheDocument();

    // Check explanation mentions "first" and "on top"
    const alertText = canvasElement.querySelector('.alert')?.textContent || '';
    expect(alertText).toMatch(/first/i);
    expect(alertText).toMatch(/top/i);
  },
};

export const GeneratedCSSDisplayed: Story = {
  play: async ({ canvasElement }) => {
    // Check that generated CSS is displayed
    const codeBlocks = canvasElement.querySelectorAll('.font-mono');
    expect(codeBlocks.length).toBeGreaterThan(0);

    // Should contain background property
    const hasBackgroundCode = Array.from(codeBlocks).some(
      (block) =>
        block.textContent?.includes('background') || block.textContent?.includes('linear-gradient')
    );
    expect(hasBackgroundCode).toBe(true);
  },
};
