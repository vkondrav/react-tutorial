import type { Meta, StoryObj } from '@storybook/react-vite';
import CSSLesson2_2 from '@lessons/css/2_2';

const meta: Meta<typeof CSSLesson2_2> = {
  title: 'Lessons/css-2.2/Lesson',
  component: CSSLesson2_2,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof CSSLesson2_2>;

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
