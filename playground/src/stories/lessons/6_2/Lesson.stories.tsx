import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson6_2 from '@lessons/6_2';

const meta: Meta<typeof Lesson6_2> = {
  title: 'Lessons/6.2/Lesson',
  component: Lesson6_2,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 6.2: Render Props Pattern - Complete lesson covering render props basics, children as function, common use cases, and a playground.',
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
    expect(canvas.getByText('Render Props Pattern')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText('What are Render Props?')).toBeInTheDocument();
    expect(canvas.getByText('Children as a Function')).toBeInTheDocument();
    expect(canvas.getByText('Common Use Cases')).toBeInTheDocument();
    expect(canvas.getByText('Render Props Playground')).toBeInTheDocument();
    expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();
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
    expect(
      canvas.getByText(/Render props let a component share its state via a function prop/)
    ).toBeInTheDocument();
    expect(
      canvas.getByText(/children-as-a-function is the most ergonomic render prop syntax/)
    ).toBeInTheDocument();
    expect(
      canvas.getByText(/Modern alternative: custom hooks often replace render props/)
    ).toBeInTheDocument();
  },
};
