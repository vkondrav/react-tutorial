import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import HowSSRWorksDemo from '@lessons/8_1/HowSSRWorksDemo';

const meta: Meta<typeof HowSSRWorksDemo> = {
  title: 'Lessons/8.1/HowSSRWorksDemo',
  component: HowSSRWorksDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Step-by-step walkthrough of how Server-Side Rendering works, from request to interactive.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows first step
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Should show Step 1
    expect(canvasElement.textContent).toContain('Step 1');
    expect(canvasElement.textContent).toContain('Request Arrives');

    // Should show code snippet
    expect(canvasElement.textContent).toContain('Express server');
  },
};

/**
 * Tests navigating to next step
 */
export const NavigateToNextStep: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Next button
    await userEvent.click(canvas.getByRole('button', { name: /Next/i }));

    // Should show Step 2
    expect(canvasElement.textContent).toContain('Step 2');
    expect(canvasElement.textContent).toContain('Fetch Data on Server');
  },
};

/**
 * Tests navigating through all steps
 */
export const NavigateAllSteps: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Navigate to step 3
    await userEvent.click(canvas.getByRole('button', { name: /Next/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Next/i }));
    expect(canvasElement.textContent).toContain('Step 3');
    expect(canvasElement.textContent).toContain('Render React to HTML');
    expect(canvasElement.textContent).toContain('renderToString');

    // Navigate to step 4
    await userEvent.click(canvas.getByRole('button', { name: /Next/i }));
    expect(canvasElement.textContent).toContain('Step 4');
    expect(canvasElement.textContent).toContain('Send HTML');

    // Navigate to step 5
    await userEvent.click(canvas.getByRole('button', { name: /Next/i }));
    expect(canvasElement.textContent).toContain('Step 5');
    expect(canvasElement.textContent).toContain('Hydration');
    expect(canvasElement.textContent).toContain('hydrateRoot');

    // Navigate to step 6
    await userEvent.click(canvas.getByRole('button', { name: /Next/i }));
    expect(canvasElement.textContent).toContain('Step 6');
    expect(canvasElement.textContent).toContain('Interactive');
  },
};

/**
 * Tests Previous button
 */
export const NavigateBack: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Go to step 3
    await userEvent.click(canvas.getByRole('button', { name: /Next/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Next/i }));
    expect(canvasElement.textContent).toContain('Step 3');

    // Go back to step 2
    await userEvent.click(canvas.getByRole('button', { name: /Previous/i }));
    expect(canvasElement.textContent).toContain('Step 2');
  },
};

/**
 * Tests clicking step circles directly
 */
export const ClickStepCircle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click on step 5 circle (Hydration)
    const buttons = canvas.getAllByRole('button');
    // Step circles are the first 6 buttons
    const step5Button = buttons[4]; // 0-indexed
    await userEvent.click(step5Button);

    // Should show Step 5
    expect(canvasElement.textContent).toContain('Step 5');
    expect(canvasElement.textContent).toContain('Hydration');
  },
};
