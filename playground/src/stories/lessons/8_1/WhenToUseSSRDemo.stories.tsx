import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import WhenToUseSSRDemo from '@lessons/8_1/WhenToUseSSRDemo';

const meta: Meta<typeof WhenToUseSSRDemo> = {
  title: 'Lessons/8.1 Server-Side Rendering/WhenToUseSSRDemo',
  component: WhenToUseSSRDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive decision tree to help choose between SSR, CSR, and SSG based on project requirements.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows first question
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show first question
    expect(canvasElement.textContent).toContain('Is SEO critical');

    // Should show Yes and No buttons
    expect(canvas.getByRole('button', { name: /Yes/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /No/i })).toBeInTheDocument();

    // Should show quick reference
    expect(canvasElement.textContent).toContain('Quick Reference');
    expect(canvasElement.textContent).toContain('Server-Side Rendering');
    expect(canvasElement.textContent).toContain('Client-Side Rendering');
    expect(canvasElement.textContent).toContain('Static Site Generation');
  },
};

/**
 * Tests answering Yes to SEO question
 */
export const AnswerYesToSEO: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Yes
    await userEvent.click(canvas.getByRole('button', { name: /Yes/i }));

    // Should show next question about dynamic content
    expect(canvasElement.textContent).toContain('Does content change frequently');
  },
};

/**
 * Tests path to SSR recommendation
 */
export const PathToSSR: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // SEO critical? Yes
    await userEvent.click(canvas.getByRole('button', { name: /Yes/i }));

    // Dynamic content? Yes
    await userEvent.click(canvas.getByRole('button', { name: /Yes/i }));

    // Should show SSR recommendation
    expect(canvasElement.textContent).toContain('Server-Side Rendering');
    expect(canvasElement.textContent).toContain('Start Over');
  },
};

/**
 * Tests path to SSG recommendation
 */
export const PathToSSG: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // SEO critical? Yes
    await userEvent.click(canvas.getByRole('button', { name: /Yes/i }));

    // Dynamic content? No
    await userEvent.click(canvas.getByRole('button', { name: /No/i }));

    // Should show SSG recommendation
    expect(canvasElement.textContent).toContain('Static Site Generation');
    expect(canvasElement.textContent).toContain('Start Over');
  },
};

/**
 * Tests path to CSR recommendation
 */
export const PathToCSR: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // SEO critical? No
    await userEvent.click(canvas.getByRole('button', { name: /No/i }));

    // Public marketing page? No
    await userEvent.click(canvas.getByRole('button', { name: /No/i }));

    // Behind auth? Yes
    await userEvent.click(canvas.getByRole('button', { name: /Yes/i }));

    // FCP critical? No
    await userEvent.click(canvas.getByRole('button', { name: /No/i }));

    // Should show CSR recommendation
    expect(canvasElement.textContent).toContain('Client-Side Rendering');
    expect(canvasElement.textContent).toContain('Start Over');
  },
};

/**
 * Tests Start Over button
 */
export const StartOver: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Go to SSR result
    await userEvent.click(canvas.getByRole('button', { name: /Yes/i }));
    await userEvent.click(canvas.getByRole('button', { name: /Yes/i }));

    // Click Start Over
    await userEvent.click(canvas.getByRole('button', { name: /Start Over/i }));

    // Should be back to first question
    expect(canvasElement.textContent).toContain('Is SEO critical');
  },
};

/**
 * Tests Go Back button
 */
export const GoBack: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Answer first question
    await userEvent.click(canvas.getByRole('button', { name: /Yes/i }));
    expect(canvasElement.textContent).toContain('Does content change');

    // Go back
    await userEvent.click(canvas.getByRole('button', { name: /Go Back/i }));

    // Should be back to first question
    expect(canvasElement.textContent).toContain('Is SEO critical');
  },
};
