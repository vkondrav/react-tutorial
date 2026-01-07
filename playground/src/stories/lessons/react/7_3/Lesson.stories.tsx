import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson7_3 from '@lessons/react/7_3';

const meta: Meta<typeof Lesson7_3> = {
  title: 'Lessons/react-7.3/Lesson',
  component: Lesson7_3,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 7.3: Context + Reducer Pattern - Combines useContext and useReducer for powerful global state management.',
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
    expect(canvas.getByText('Context + Reducer Pattern')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText('Why Context + Reducer?')).toBeInTheDocument();
    expect(canvas.getByText('Setting Up the Pattern')).toBeInTheDocument();
    expect(canvas.getByText('Building Reusable Providers')).toBeInTheDocument();
    expect(canvas.getByText('Context + Reducer Playground')).toBeInTheDocument();
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
    expect(canvas.getByText(/Context \+ Reducer = global state/)).toBeInTheDocument();
    expect(canvas.getByText(/Create separate contexts for state and dispatch/)).toBeInTheDocument();
    expect(canvas.getByText(/Custom hooks.*provide clean API/)).toBeInTheDocument();
    expect(canvas.getByText(/Great for: auth, themes, shopping carts/)).toBeInTheDocument();
  },
};
