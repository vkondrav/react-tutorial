import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import CSSLesson2_3 from '../../../../lessons/css/2_3';

const meta: Meta<typeof CSSLesson2_3> = {
  title: 'Lessons/CSS/2.3 CSS Grid/Lesson',
  component: CSSLesson2_3,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof CSSLesson2_3>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check lesson header - format is "Module 2 · Lesson 3"
    await expect(canvas.getByText('CSS Grid')).toBeInTheDocument();
    await expect(canvas.getByText(/Module 2 · Lesson 3/)).toBeInTheDocument();

    // Check all sections are present
    await expect(canvas.getByText('The Big Idea')).toBeInTheDocument();
    await expect(canvas.getByText('Explicit vs. Implicit Grid')).toBeInTheDocument();
    await expect(canvas.getByText('The fr Unit: Fractional Free Space')).toBeInTheDocument();
    await expect(canvas.getByText('Grid Template Areas: Visual Layout')).toBeInTheDocument();
    await expect(canvas.getByText('Alignment: Items vs. Content')).toBeInTheDocument();
    await expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();
  },
};

export const KeyConceptsPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check key concepts are mentioned in the lesson content
    await expect(canvas.getByText(/two-dimensional layout system/i)).toBeInTheDocument();

    // Check code elements are present
    const codeElements = canvasElement.querySelectorAll('code');
    const codeTexts = Array.from(codeElements).map((el) => el.textContent);
    expect(codeTexts.some((t) => t?.includes('grid-template-columns'))).toBe(true);
    expect(codeTexts.some((t) => t?.includes('grid-template-rows'))).toBe(true);
  },
};

export const TakeawaysPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check takeaways are rendered
    const takeaways = canvas.getAllByRole('listitem');
    await expect(takeaways.length).toBeGreaterThanOrEqual(6);
  },
};
