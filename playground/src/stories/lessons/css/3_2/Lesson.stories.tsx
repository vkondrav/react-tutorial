import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, waitFor } from 'storybook/test';
import CSSLesson3_2 from '@lessons/css/3_2';

const meta: Meta<typeof CSSLesson3_2> = {
  title: 'Lessons/CSS/3.2 Transitions & Animations/Lesson',
  component: CSSLesson3_2,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof CSSLesson3_2>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check lesson header
    await waitFor(() => {
      const headings = canvasElement.querySelectorAll('h1');
      const titleFound = Array.from(headings).some((h) =>
        h.textContent?.includes('Transitions & Animations')
      );
      expect(titleFound).toBe(true);
    });

    // Check module/lesson info
    await expect(canvas.getByText(/Module 3 · Lesson 2/)).toBeInTheDocument();

    // Check all sections are present using textContent match
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/The Big Idea/);
    expect(pageText).toMatch(/The Performance Layer/);
    expect(pageText).toMatch(/Timing Functions/);
    expect(pageText).toMatch(/Keyframe Animations/);
    expect(pageText).toMatch(/Key Takeaways/);
  },
};

export const AllDemosRendered: Story = {
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      // Check PerformanceLayerDemo buttons exist (use getAllByRole since there may be multiple)
      const buttons = canvasElement.querySelectorAll('button');
      const buttonTexts = Array.from(buttons).map((b) => b.textContent?.toLowerCase() || '');
      expect(buttonTexts.some((t) => t.includes('transform'))).toBe(true);
      expect(buttonTexts.some((t) => t.includes('left'))).toBe(true);

      // Check BezierCurvesDemo presets
      expect(buttonTexts.some((t) => t === 'ease')).toBe(true);
      expect(buttonTexts.some((t) => t === 'ease-out')).toBe(true);

      // Check KeyframesDemo presets
      expect(buttonTexts.some((t) => t === 'bounce')).toBe(true);
      expect(buttonTexts.some((t) => t === 'pulse')).toBe(true);
    });
  },
};

export const KeyConceptsPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      // Check key concepts are mentioned
      expect(canvas.getByText(/browser rendering pipeline/i)).toBeInTheDocument();
    });

    // Check code examples exist
    const codeElements = canvasElement.querySelectorAll('code');
    const codeTexts = Array.from(codeElements).map((el) => el.textContent);
    expect(codeTexts.some((t) => t?.includes('transform'))).toBe(true);
    expect(codeTexts.some((t) => t?.includes('opacity'))).toBe(true);
  },
};
