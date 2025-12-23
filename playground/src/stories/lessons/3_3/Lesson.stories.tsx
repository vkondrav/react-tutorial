import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson3_3 from '@lessons/3_3';

const meta: Meta<typeof Lesson3_3> = {
  title: 'Lessons/3.3 useRef/Lesson',
  component: Lesson3_3,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full lesson page for useRef: DOM Access & Persistence - covers ref basics, DOM access, persistent values, and previous value tracking.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The complete lesson page
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have lesson header
    expect(canvasElement.textContent).toContain('useRef: DOM Access & Persistence');
    expect(canvasElement.textContent).toContain('Module 3');
    expect(canvasElement.textContent).toContain('Lesson 3');

    // Should have all section titles
    expect(canvasElement.textContent).toContain('What is useRef?');
    expect(canvasElement.textContent).toContain('Accessing DOM Elements');
    expect(canvasElement.textContent).toContain('Storing Values Without Re-renders');
    expect(canvasElement.textContent).toContain('Tracking Previous Values');
    expect(canvasElement.textContent).toContain('useRef Playground');
    expect(canvasElement.textContent).toContain('Key Takeaways');

    // Should have interactive demos
    expect(canvas.getAllByRole('button').length).toBeGreaterThan(0);
  },
};

/**
 * Verifies useState vs useRef comparison
 */
export const ShowsComparison: Story = {
  play: async ({ canvasElement }) => {
    // Should show useState characteristics
    expect(canvasElement.textContent).toContain('useState');
    expect(canvasElement.textContent).toContain('Triggers re-render on change');
    expect(canvasElement.textContent).toContain('Value updates asynchronously');
    expect(canvasElement.textContent).toContain('For data that affects UI');

    // Should show useRef characteristics
    expect(canvasElement.textContent).toContain('useRef');
    expect(canvasElement.textContent).toContain('Does NOT trigger re-render');
    expect(canvasElement.textContent).toContain('Value updates immediately');
    expect(canvasElement.textContent).toContain('For DOM access');
  },
};

/**
 * Verifies takeaways are present
 */
export const ShowsTakeaways: Story = {
  play: async ({ canvasElement }) => {
    // Should show all takeaways
    expect(canvasElement.textContent).toContain('useRef returns { current: value }');
    expect(canvasElement.textContent).toContain(
      'Changing ref.current does NOT trigger a re-render'
    );
    expect(canvasElement.textContent).toContain('Use refs for DOM access');
    expect(canvasElement.textContent).toContain('Use refs for mutable values');
    expect(canvasElement.textContent).toContain(
      "Don't use refs for data that should trigger UI updates"
    );
    expect(canvasElement.textContent).toContain('Access DOM after mount');
    expect(canvasElement.textContent).toContain('escape hatch');
  },
};
