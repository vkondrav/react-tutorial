import type { Meta, StoryObj } from '@storybook/react-vite';
import CSSLesson1_3 from '@lessons/css/1_3';

const meta: Meta<typeof CSSLesson1_3> = {
  title: 'Lessons/css-1.3/Lesson',
  component: CSSLesson1_3,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof CSSLesson1_3>;

export const Default: Story = {};

export const WithBackground: Story = {
  decorators: [
    (Story) => (
      <div className="bg-base-100 min-h-screen">
        <Story />
      </div>
    ),
  ],
};
