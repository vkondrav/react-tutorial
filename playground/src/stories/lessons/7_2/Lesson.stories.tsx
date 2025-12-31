import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson7_2 from '@lessons/7_2';

const meta: Meta<typeof Lesson7_2> = {
  title: 'Lessons/7.2/Lesson',
  component: Lesson7_2,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 7.2: useReducer for Complex State - Covers when to use useReducer, reducer basics, action patterns, and interactive playground.',
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
    expect(canvas.getByText('useReducer for Complex State')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText("When useState Isn't Enough")).toBeInTheDocument();
    expect(canvas.getByText('useReducer Fundamentals')).toBeInTheDocument();
    expect(canvas.getByText('Actions and TypeScript')).toBeInTheDocument();
    expect(canvas.getByText('useReducer Playground')).toBeInTheDocument();
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
      canvas.getByText(/useReducer is ideal when state updates depend on previous state/)
    ).toBeInTheDocument();
    expect(canvas.getByText(/reducer is a pure function/)).toBeInTheDocument();
    expect(canvas.getByText(/dispatch\(action\) triggers state updates/)).toBeInTheDocument();
    expect(canvas.getByText(/Actions should be descriptive objects/)).toBeInTheDocument();
    expect(canvas.getByText(/TypeScript discriminated unions/)).toBeInTheDocument();
  },
};
