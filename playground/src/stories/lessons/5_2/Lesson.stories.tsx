import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson5_2 from '@lessons/5_2';

const meta: Meta<typeof Lesson5_2> = {
  title: 'Lessons/5.2/Lesson',
  component: Lesson5_2,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 5.2: Form Validation Patterns - Complete lesson covering validation timing, rules, error display, async validation, and a full playground.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full lesson page with all sections
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify lesson header is present
    expect(canvas.getByText('Form Validation Patterns')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText('When to Validate: Timing Matters')).toBeInTheDocument();
    expect(canvas.getByText('Common Validation Rules')).toBeInTheDocument();
    expect(canvas.getByText('Displaying Validation Errors')).toBeInTheDocument();
    expect(canvas.getByText('Async Validation')).toBeInTheDocument();
    expect(canvas.getByText('Validation Playground')).toBeInTheDocument();
    expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();
  },
};

/**
 * Verify section introductions are present
 */
export const SectionIntros: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify section intro text
    expect(canvas.getByText(/on submit/)).toBeInTheDocument();
    expect(canvas.getByText(/on blur/)).toBeInTheDocument();
    expect(canvas.getByText(/on change/)).toBeInTheDocument();
  },
};

/**
 * Verify key takeaways are displayed
 */
export const Takeaways: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify takeaways section
    expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();

    // Check for specific takeaways
    expect(canvas.getByText(/On-blur validation balances UX.*with feedback/)).toBeInTheDocument();
    expect(canvas.getByText(/Debounce async validation/)).toBeInTheDocument();
    expect(canvas.getByText(/Disable submit button while form is invalid/)).toBeInTheDocument();
  },
};
