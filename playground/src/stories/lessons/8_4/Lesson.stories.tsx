import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Lesson8_4 from '@lessons/8_4';

const meta: Meta<typeof Lesson8_4> = {
  title: 'Lessons/8.4/Lesson',
  component: Lesson8_4,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 8.4: RSC - Intro to React Server Components. Covers Server vs Client Components, the "use client" directive, benefits, trade-offs, and common patterns.',
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

    // Check header is rendered
    expect(canvas.getByText('RSC: Intro to React Server Components')).toBeInTheDocument();

    // Check all section titles are present
    expect(canvas.getByText('What are React Server Components?')).toBeInTheDocument();
    expect(canvas.getByText('Server vs Client Components')).toBeInTheDocument();
    expect(canvas.getByText(/The "use client" Directive/)).toBeInTheDocument();
    expect(canvas.getByText('Benefits & Trade-offs')).toBeInTheDocument();
    expect(canvas.getByText('RSC Patterns')).toBeInTheDocument();
    expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();
  },
};

/**
 * Lesson displayed in a container with max-width
 */
export const Contained: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * Verifies takeaways are rendered correctly
 */
export const Takeaways: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check key takeaways section
    expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();

    // Check some specific takeaways
    expect(
      canvas.getByText(/React Server Components run exclusively on the server/)
    ).toBeInTheDocument();
    expect(
      canvas.getByText(/"use client" marks a component as a Client Component/)
    ).toBeInTheDocument();
    expect(
      canvas.getByText(/Server Components can directly access databases, file systems, and APIs/)
    ).toBeInTheDocument();
  },
};
