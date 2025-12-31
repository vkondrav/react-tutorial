import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson7_1 from '@lessons/7_1';

const meta: Meta<typeof Lesson7_1> = {
  title: 'Lessons/7.1/Lesson',
  component: Lesson7_1,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 7.1: Lifting State Up - Covers why and how to lift state to share between sibling components, the lifting pattern, guidelines, and interactive playground.',
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
    expect(canvas.getByText('Lifting State Up')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText('Why Lift State Up?')).toBeInTheDocument();
    expect(canvas.getByText('The Lifting Pattern')).toBeInTheDocument();
    expect(canvas.getByText('When to Lift (and When Not To)')).toBeInTheDocument();
    expect(canvas.getByText('Lifting State Playground')).toBeInTheDocument();
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
    expect(canvas.getByText(/Sibling components cannot share state directly/)).toBeInTheDocument();
    expect(
      canvas.getByText(/component owning the state passes it down as props/)
    ).toBeInTheDocument();
    expect(
      canvas.getByText(/Children update shared state by calling callback functions/)
    ).toBeInTheDocument();
    expect(canvas.getByText(/Controlled inputs are a form of lifted state/)).toBeInTheDocument();
    expect(canvas.getByText(/Keep state as local as possible/)).toBeInTheDocument();
  },
};
