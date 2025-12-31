import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson6_3 from '@lessons/6_3';

const meta: Meta<typeof Lesson6_3> = {
  title: 'Lessons/6.3/Lesson',
  component: Lesson6_3,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 6.3: Higher-Order Components (HOCs) - Complete lesson covering HOC basics, common patterns, conventions, and an interactive playground.',
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
    expect(canvas.getByText('Higher-Order Components')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText('What is a Higher-Order Component?')).toBeInTheDocument();
    expect(canvas.getByText('Common HOC Patterns')).toBeInTheDocument();
    expect(canvas.getByText('HOC Patterns & Conventions')).toBeInTheDocument();
    expect(canvas.getByText('HOC Playground')).toBeInTheDocument();
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
      canvas.getByText(/HOCs are functions: \(Component\) => EnhancedComponent/)
    ).toBeInTheDocument();
    expect(
      canvas.getByText(/They add behavior without modifying the original/)
    ).toBeInTheDocument();
    expect(canvas.getByText(/Use the "with" prefix naming convention/)).toBeInTheDocument();
    expect(canvas.getByText(/Always pass through unrelated props/)).toBeInTheDocument();
    expect(canvas.getByText(/Set displayName for better debugging/)).toBeInTheDocument();
    expect(canvas.getByText(/Modern alternative: custom hooks often replace/)).toBeInTheDocument();
  },
};
