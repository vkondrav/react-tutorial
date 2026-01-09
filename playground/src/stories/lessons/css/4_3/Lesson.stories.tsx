import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, waitFor } from 'storybook/test';
import CSSLesson4_3 from '@lessons/css/4_3';

const meta: Meta<typeof CSSLesson4_3> = {
  title: 'Lessons/css-4.3/Lesson',
  component: CSSLesson4_3,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof CSSLesson4_3>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check lesson header
    await waitFor(() => {
      expect(canvas.getByText('Accessibility')).toBeInTheDocument();
    });
    // Module 4 Lesson 3 is displayed separately
    const pageText = canvasElement.textContent || '';
    expect(pageText).toContain('Module 4');
    expect(pageText).toContain('Lesson 3');

    // Check all sections are present
    expect(canvas.getByText('The Big Idea')).toBeInTheDocument();
    expect(pageText).toContain('Focus Indicators');
    expect(pageText).toContain('Color Contrast');
    expect(pageText).toContain('Visually Hidden Content');
    expect(pageText).toContain('Reduced Motion');
    expect(pageText).toContain('Key Takeaways');
  },
};

export const KeyTakeaways: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check takeaways are present
    await waitFor(() => {
      expect(
        canvas.getByText('Never use outline: none without a visible focus alternative')
      ).toBeInTheDocument();
    });
    expect(
      canvas.getByText(':focus-visible shows focus only for keyboard users, not mouse clicks')
    ).toBeInTheDocument();
    expect(
      canvas.getByText('WCAG contrast: 4.5:1 for normal text, 3:1 for large text')
    ).toBeInTheDocument();
    expect(
      canvas.getByText('.sr-only hides content visually but keeps it accessible to screen readers')
    ).toBeInTheDocument();
    expect(
      canvas.getByText('prefers-reduced-motion lets users opt out of animations')
    ).toBeInTheDocument();
  },
};
