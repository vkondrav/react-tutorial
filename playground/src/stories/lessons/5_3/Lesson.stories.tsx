import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson5_3 from '@lessons/5_3';

const meta: Meta<typeof Lesson5_3> = {
  title: 'Lessons/5.3 Handling Multiple Inputs/Lesson',
  component: Lesson5_3,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 5.3: Handling Multiple Inputs - Complete lesson covering single state object, name attribute pattern, dynamic fields, and form patterns.',
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
    expect(canvas.getByText('Handling Multiple Inputs')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText('Managing Multiple Inputs with One State')).toBeInTheDocument();
    expect(canvas.getByText('The Name Attribute Pattern')).toBeInTheDocument();
    expect(canvas.getByText('Dynamic Form Fields')).toBeInTheDocument();
    expect(canvas.getByText('Common Form Patterns')).toBeInTheDocument();
    expect(canvas.getByText('Multi-Input Playground')).toBeInTheDocument();
    expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();
  },
};

/**
 * Verify section introductions are present
 */
export const SectionIntros: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify section intro text - use getAllByText for text that appears multiple times
    const singleStateMatches = canvas.getAllByText(/single state object/);
    expect(singleStateMatches.length).toBeGreaterThan(0);
    expect(canvas.getByText(/computed property names/)).toBeInTheDocument();
    expect(canvas.getByText(/add or remove/)).toBeInTheDocument();
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
      canvas.getByText(/Use a single state object for forms with multiple related fields/)
    ).toBeInTheDocument();
    expect(canvas.getByText(/name attribute identifies which field changed/)).toBeInTheDocument();
    expect(canvas.getByText(/Never use array index as key!/)).toBeInTheDocument();
  },
};
