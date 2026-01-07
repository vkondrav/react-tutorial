import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson7_4 from '@lessons/react/7_4';

const meta: Meta<typeof Lesson7_4> = {
  title: 'Lessons/react-7.4/Lesson',
  component: Lesson7_4,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 7.4: When to Use External State Libraries - Covers when built-in state is enough, signs you need a library, and popular options.',
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
    expect(canvas.getByText('When to Use External State Libraries')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText('When Built-in State is Enough')).toBeInTheDocument();
    expect(canvas.getByText('Signs You Might Need a Library')).toBeInTheDocument();
    expect(canvas.getByText('Popular State Libraries')).toBeInTheDocument();
    expect(canvas.getByText('Decision Framework')).toBeInTheDocument();
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
      canvas.getByText(/useState \+ useReducer \+ useContext handle most React apps/)
    ).toBeInTheDocument();
    expect(canvas.getByText(/Zustand: Minimal, easy to learn/)).toBeInTheDocument();
    expect(canvas.getByText(/Redux Toolkit: Powerful, great DevTools/)).toBeInTheDocument();
    expect(canvas.getByText(/TanStack Query: Not state management/)).toBeInTheDocument();
    expect(
      canvas.getByText(/Start simple.*Add complexity only when you feel real pain/)
    ).toBeInTheDocument();
  },
};
