import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import DefaultPropsDemo from '@lessons/2_1/DefaultPropsDemo';

const meta: Meta<typeof DefaultPropsDemo> = {
  title: 'Lessons/2.1 Props/DefaultPropsDemo',
  component: DefaultPropsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Demonstrates default prop values - what happens when props are not provided.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with both size and variant props passed
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Both checkboxes should be checked by default
    const sizeCheckbox = canvas.getByRole('checkbox', { name: /Pass size prop/i });
    const variantCheckbox = canvas.getByRole('checkbox', { name: /Pass variant prop/i });

    expect(sizeCheckbox).toBeChecked();
    expect(variantCheckbox).toBeChecked();

    // Should show current values (not defaults) - check in live result area (last bg-base-300 section)
    const liveResultSection = Array.from(canvasElement.querySelectorAll('.bg-base-300')).pop();
    expect(liveResultSection?.textContent).toContain('size:');
    expect(liveResultSection?.textContent).toContain('variant:');
  },
};

/**
 * Tests toggling size prop off (shows default)
 */
export const UncheckedSizeUsesDefault: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Uncheck size prop
    const sizeCheckbox = canvas.getByRole('checkbox', { name: /Pass size prop/i });
    await userEvent.click(sizeCheckbox);

    // Should show "default" label for size in live result (last bg-base-300 section)
    const liveResultSection = Array.from(canvasElement.querySelectorAll('.bg-base-300')).pop();
    expect(liveResultSection?.textContent).toMatch(/\(default\)/);
  },
};

/**
 * Tests toggling variant prop off (shows default)
 */
export const UncheckedVariantUsesDefault: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Uncheck variant prop
    const variantCheckbox = canvas.getByRole('checkbox', { name: /Pass variant prop/i });
    await userEvent.click(variantCheckbox);

    // Should show "default" label for variant in live result (last bg-base-300 section)
    const liveResultSection = Array.from(canvasElement.querySelectorAll('.bg-base-300')).pop();
    expect(liveResultSection?.textContent).toMatch(/\(default\)/);
  },
};

/**
 * Tests changing size values
 */
export const ChangeSizeValues: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click small button (first one in the size section)
    const sizeButtons = canvas.getAllByRole('button', { name: 'small' });
    await userEvent.click(sizeButtons[0]);

    // Size should update in live result (last bg-base-300 section)
    const liveResultSection = Array.from(canvasElement.querySelectorAll('.bg-base-300')).pop();
    expect(liveResultSection?.textContent).toContain('small');

    // Click large button
    const largeButtons = canvas.getAllByRole('button', { name: 'large' });
    await userEvent.click(largeButtons[0]);

    // Size should update
    expect(liveResultSection?.textContent).toContain('large');
  },
};

/**
 * Tests changing variant values
 */
export const ChangeVariantValues: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click secondary button
    const secondaryButton = canvas.getAllByRole('button', { name: 'secondary' })[0];
    await userEvent.click(secondaryButton);

    // Should show secondary
    const variantElements = canvas.getAllByText('secondary');
    expect(variantElements.length).toBeGreaterThan(0);

    // Click danger button
    const dangerButton = canvas.getAllByRole('button', { name: 'danger' })[0];
    await userEvent.click(dangerButton);

    // Should show danger
    const dangerElements = canvas.getAllByText('danger');
    expect(dangerElements.length).toBeGreaterThan(0);
  },
};

/**
 * Tests that size buttons are disabled when checkbox unchecked
 */
export const DisabledWhenUnchecked: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Uncheck size prop
    const sizeCheckbox = canvas.getByRole('checkbox', { name: /Pass size prop/i });
    await userEvent.click(sizeCheckbox);

    // Size buttons should be disabled (get the first set in size section)
    const smallButtons = canvas.getAllByRole('button', { name: 'small' });
    const mediumButtons = canvas.getAllByRole('button', { name: 'medium' });
    const largeButtons = canvas.getAllByRole('button', { name: 'large' });

    expect(smallButtons[0]).toBeDisabled();
    expect(mediumButtons[0]).toBeDisabled();
    expect(largeButtons[0]).toBeDisabled();
  },
};

/**
 * Tests both props unchecked (both use defaults)
 */
export const BothUnchecked: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Uncheck both
    const sizeCheckbox = canvas.getByRole('checkbox', { name: /Pass size prop/i });
    const variantCheckbox = canvas.getByRole('checkbox', { name: /Pass variant prop/i });

    await userEvent.click(sizeCheckbox);
    await userEvent.click(variantCheckbox);

    // Both should show defaults in live result (last bg-base-300 section)
    const liveResultSection = Array.from(canvasElement.querySelectorAll('.bg-base-300')).pop();
    const resultText = liveResultSection?.textContent || '';

    // Count occurrences of "(default)" - should be 2 (one for size, one for variant)
    const defaultCount = (resultText.match(/\(default\)/g) || []).length;
    expect(defaultCount).toBe(2);
  },
};
