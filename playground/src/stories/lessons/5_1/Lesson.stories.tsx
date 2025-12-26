import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson5_1 from '@lessons/5_1';

const meta: Meta<typeof Lesson5_1> = {
  title: 'Lessons/5.1 Controlled Components/Lesson',
  component: Lesson5_1,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 5.1: Controlled Components - Complete lesson covering controlled vs uncontrolled inputs, different input types, and benefits of controlled components.',
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
    expect(canvas.getByText('Controlled Components')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText('What Are Controlled Components?')).toBeInTheDocument();
    expect(canvas.getByText('Uncontrolled vs Controlled')).toBeInTheDocument();
    expect(canvas.getByText('Controlling Different Input Types')).toBeInTheDocument();
    expect(canvas.getByText('Why Use Controlled Components?')).toBeInTheDocument();
    expect(canvas.getByText('Form Building Playground')).toBeInTheDocument();
    expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();
  },
};

/**
 * Verify comparison between HTML and React approaches
 */
export const ComparisonSection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify comparison cards
    expect(canvas.getByText('HTML Form (Traditional)')).toBeInTheDocument();
    expect(canvas.getByText('React Controlled')).toBeInTheDocument();

    // Verify bullet points
    expect(canvas.getByText(/DOM stores the input value/)).toBeInTheDocument();
    expect(canvas.getByText(/State stores the input value/)).toBeInTheDocument();
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

    // Check for a specific takeaway
    expect(canvas.getByText(/For checkboxes, use checked/)).toBeInTheDocument();
  },
};
