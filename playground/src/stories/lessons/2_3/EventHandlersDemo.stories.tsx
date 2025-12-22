import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import EventHandlersDemo from '@lessons/2_3/EventHandlersDemo';

const meta: Meta<typeof EventHandlersDemo> = {
  title: 'Lessons/2.3 Events/EventHandlersDemo',
  component: EventHandlersDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates different ways to write event handlers: inline arrow, function reference, passing arguments.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with Inline Arrow tab selected
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show tabs
    expect(canvas.getByRole('button', { name: /Inline Arrow/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Function Reference/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Passing Arguments/i })).toBeInTheDocument();

    // Should show inline arrow content by default
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('arrow function');
    expect(bodyText).toContain('Good for');
  },
};

/**
 * Tests the Inline Arrow tab
 */
export const InlineArrowTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the button in inline arrow tab
    const clickMeButton = canvas.getByRole('button', { name: /Click me \(0\)/ });
    await userEvent.click(clickMeButton);
    await userEvent.click(clickMeButton);

    // Should update count
    expect(canvas.getByRole('button', { name: /Click me \(2\)/ })).toBeInTheDocument();
  },
};

/**
 * Tests the Function Reference tab
 */
export const FunctionReferenceTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Function Reference tab
    const functionTab = canvas.getByRole('button', { name: /Function Reference/i });
    await userEvent.click(functionTab);

    // Should show function reference content
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('separately');
    expect(bodyText).toContain('Reusable handlers');

    // Click the button
    const clickMeButton = canvas.getByRole('button', { name: /Click me \(0\)/ });
    await userEvent.click(clickMeButton);

    expect(canvas.getByRole('button', { name: /Click me \(1\)/ })).toBeInTheDocument();
  },
};

/**
 * Tests the Passing Arguments tab
 */
export const PassingArgumentsTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Passing Arguments tab
    const argsTab = canvas.getByRole('button', { name: /Passing Arguments/i });
    await userEvent.click(argsTab);

    // Should show arguments content
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('pass arguments');
    expect(bodyText).toContain('wrap it in an arrow function');

    // Should show delete buttons for items
    expect(canvas.getByRole('button', { name: /Delete Item 1/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Delete Item 2/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Delete Item 3/i })).toBeInTheDocument();
  },
};

/**
 * Tests clicking buttons in Passing Arguments tab
 */
export const PassingArgumentsInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Passing Arguments tab
    const argsTab = canvas.getByRole('button', { name: /Passing Arguments/i });
    await userEvent.click(argsTab);

    // Click item buttons - they add their IDs to total
    await userEvent.click(canvas.getByRole('button', { name: /Delete Item 1/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Delete Item 2/i }));

    // Total should be 1 + 2 = 3
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('Total:');
    expect(bodyText).toContain('3');
  },
};

/**
 * Shows common mistakes section
 */
export const ShowsCommonMistakes: Story = {
  play: async ({ canvasElement }) => {
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('Common Mistakes');
    expect(bodyText).toContain('Calls function immediately');
  },
};
