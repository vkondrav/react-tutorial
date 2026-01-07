import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson6_5 from '@lessons/react/6_5';

const meta: Meta<typeof Lesson6_5> = {
  title: 'Lessons/react-6.5/Lesson',
  component: Lesson6_5,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 6.5: Activity - Preserving Hidden State - Covers the state preservation problem, CSS approach, React 19 Activity API, and interactive playground.',
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
    expect(canvas.getByText('Activity: Preserving Hidden State')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText('The State Preservation Problem')).toBeInTheDocument();
    expect(canvas.getByText('Current Solution: CSS Hiding')).toBeInTheDocument();
    expect(canvas.getByText('React 19: The Activity API')).toBeInTheDocument();
    expect(canvas.getByText('State Preservation Playground')).toBeInTheDocument();
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
      canvas.getByText(/Conditional rendering.*destroys state on unmount/)
    ).toBeInTheDocument();
    expect(
      canvas.getByText(/CSS hiding.*preserves state but keeps components in the DOM/)
    ).toBeInTheDocument();
    expect(canvas.getByText(/Trade-off: Memory usage vs\. user experience/)).toBeInTheDocument();
    expect(
      canvas.getByText(/React 19 Activity API.*"visible" and "hidden" modes/)
    ).toBeInTheDocument();
    expect(canvas.getByText(/Great for: tab panels, wizard steps/)).toBeInTheDocument();
  },
};
