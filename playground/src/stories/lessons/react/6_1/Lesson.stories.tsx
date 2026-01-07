import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson6_1 from '@lessons/react/6_1';

const meta: Meta<typeof Lesson6_1> = {
  title: 'Lessons/react-6.1/Lesson',
  component: Lesson6_1,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 6.1: Component Composition - Complete lesson covering composition over inheritance, children prop, slot pattern, and specialization.',
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
    expect(canvas.getByText('Component Composition')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText('Why Composition Over Inheritance?')).toBeInTheDocument();
    expect(canvas.getByText('The Children Prop')).toBeInTheDocument();
    expect(canvas.getByText('The Slot Pattern')).toBeInTheDocument();
    expect(canvas.getByText('Specialization Pattern')).toBeInTheDocument();
    expect(canvas.getByText('Composition Playground')).toBeInTheDocument();
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
    expect(canvas.getByText(/React favors composition over inheritance/)).toBeInTheDocument();
    expect(canvas.getByText(/The children prop enables containment/)).toBeInTheDocument();
    expect(canvas.getByText(/Think of components as LEGO blocks/)).toBeInTheDocument();
  },
};
