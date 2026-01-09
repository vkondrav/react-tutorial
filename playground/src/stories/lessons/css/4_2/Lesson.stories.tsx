import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, waitFor } from 'storybook/test';
import CSSLesson4_2 from '@lessons/css/4_2';

const meta: Meta<typeof CSSLesson4_2> = {
  title: 'Lessons/css-4.2/Lesson',
  component: CSSLesson4_2,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof CSSLesson4_2>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check lesson header
    await waitFor(() => {
      expect(canvas.getByText('Methodologies (BEM & Utility)')).toBeInTheDocument();
    });
    // Module 4 Lesson 2 is displayed separately
    const pageText = canvasElement.textContent || '';
    expect(pageText).toContain('Module 4');
    expect(pageText).toContain('Lesson 2');

    // Check all sections are present
    expect(canvas.getByText('The Big Idea')).toBeInTheDocument();
    expect(pageText).toContain('BEM: Block__Element--Modifier');
    expect(pageText).toContain('Flat Specificity');
    expect(pageText).toContain('Utility-First CSS');
    expect(pageText).toContain('Choosing Your Approach');
    expect(pageText).toContain('Key Takeaways');
  },
};

export const KeyTakeaways: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check takeaways are present
    await waitFor(() => {
      expect(
        canvas.getByText('BEM uses .block__element--modifier naming for clear structure')
      ).toBeInTheDocument();
    });
    expect(
      canvas.getByText('Block = standalone component, Element = child of block, Modifier = variant')
    ).toBeInTheDocument();
    expect(
      canvas.getByText('BEM keeps specificity flat: all selectors are single class (0,1,0)')
    ).toBeInTheDocument();
    expect(
      canvas.getByText('Utility-first uses atomic classes: each class does one thing')
    ).toBeInTheDocument();
    expect(
      canvas.getByText('Hybrid approach: BEM for structure, utilities for spacing/layout')
    ).toBeInTheDocument();
  },
};
