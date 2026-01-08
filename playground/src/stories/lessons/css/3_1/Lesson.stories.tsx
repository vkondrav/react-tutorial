import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, waitFor } from 'storybook/test';
import CSSLesson3_1 from '@lessons/css/3_1';

const meta: Meta<typeof CSSLesson3_1> = {
  title: 'Lessons/CSS/3.1 Backgrounds & Borders/Lesson',
  component: CSSLesson3_1,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof CSSLesson3_1>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check lesson header
    await waitFor(() => {
      const headings = canvasElement.querySelectorAll('h1');
      const titleFound = Array.from(headings).some((h) =>
        h.textContent?.includes('Backgrounds & Borders')
      );
      expect(titleFound).toBe(true);
    });

    // Check module/lesson info
    await expect(canvas.getByText(/Module 3 · Lesson 1/)).toBeInTheDocument();

    // Check all sections are present - use getAllByText for duplicates
    await expect(canvas.getByText('The Big Idea')).toBeInTheDocument();
    await expect(canvas.getByText('Gradient Syntax')).toBeInTheDocument();

    // These may appear multiple times, use queryAllByText
    const layeringTexts = canvas.queryAllByText('Background Layering');
    expect(layeringTexts.length).toBeGreaterThan(0);

    await expect(canvas.getByText(/CSS Shapes with clip-path/)).toBeInTheDocument();
    await expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();
  },
};

export const AllDemosRendered: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      // Check GradientDemo buttons
      expect(canvas.getByRole('button', { name: 'linear-gradient' })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: 'radial-gradient' })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: 'conic-gradient' })).toBeInTheDocument();

      // Check BackgroundLayeringDemo presets
      expect(canvas.getByRole('button', { name: 'Gradient Overlay' })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: 'Color Tint' })).toBeInTheDocument();

      // Check CSSShapesDemo buttons
      expect(canvas.getByRole('button', { name: 'circle()' })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: 'polygon()' })).toBeInTheDocument();
    });
  },
};

export const KeyConceptsPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      // Check key concepts are mentioned
      expect(canvas.getByText(/gradients/i)).toBeInTheDocument();
    });

    // Check code examples exist
    const codeElements = canvasElement.querySelectorAll('code');
    const codeTexts = Array.from(codeElements).map((el) => el.textContent);
    expect(codeTexts.some((t) => t?.includes('clip-path'))).toBe(true);
    expect(codeTexts.some((t) => t?.includes('background-blend-mode'))).toBe(true);
  },
};
