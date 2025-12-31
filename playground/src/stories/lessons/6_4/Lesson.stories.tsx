import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson6_4 from '@lessons/6_4';

const meta: Meta<typeof Lesson6_4> = {
  title: 'Lessons/6.4/Lesson',
  component: Lesson6_4,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 6.4: Compound Components - Complete lesson covering compound component pattern, context-based state sharing, flexible API design, and interactive playground.',
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
    expect(canvas.getByText('Compound Components')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText('What are Compound Components?')).toBeInTheDocument();
    expect(canvas.getByText('Sharing State with Context')).toBeInTheDocument();
    expect(canvas.getByText('Flexible API Design')).toBeInTheDocument();
    expect(canvas.getByText('Compound Components Playground')).toBeInTheDocument();
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
      canvas.getByText(/Compound components are multiple components that work together/)
    ).toBeInTheDocument();
    expect(canvas.getByText(/Use Context to share implicit state/)).toBeInTheDocument();
    expect(canvas.getByText(/Attach sub-components as static properties/)).toBeInTheDocument();
    expect(canvas.getByText(/Give users flexibility in layout/)).toBeInTheDocument();
    expect(canvas.getByText(/Great for: tabs, accordions, menus/)).toBeInTheDocument();
  },
};
