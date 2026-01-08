import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import CSSLesson2_4 from '@lessons/css/2_4';

const meta: Meta<typeof CSSLesson2_4> = {
  title: 'Lessons/CSS/2.4 Responsive Strategy/Lesson',
  component: CSSLesson2_4,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof CSSLesson2_4>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check lesson header - format is "Module 2 · Lesson 4"
    await expect(canvas.getByRole('heading', { name: 'Responsive Strategy' })).toBeInTheDocument();
    await expect(canvas.getByText(/Module 2 · Lesson 4/)).toBeInTheDocument();

    // Check all sections are present
    await expect(canvas.getByText('The Big Idea')).toBeInTheDocument();
    await expect(canvas.getByText('The Viewport Meta Tag')).toBeInTheDocument();
    await expect(canvas.getByText('Media Queries: Mobile-First Strategy')).toBeInTheDocument();
    await expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();
  },
};

export const KeyConceptsPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check key concepts are mentioned in the lesson content
    await expect(canvas.getByText(/single codebase/i)).toBeInTheDocument();

    // Check code elements are present
    const codeElements = canvasElement.querySelectorAll('code');
    const codeTexts = Array.from(codeElements).map((el) => el.textContent);
    expect(codeTexts.some((t) => t?.includes('viewport'))).toBe(true);
    expect(codeTexts.some((t) => t?.includes('clamp'))).toBe(true);
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
