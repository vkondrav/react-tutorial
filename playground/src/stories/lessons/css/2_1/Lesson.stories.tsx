import type { Meta, StoryObj } from '@storybook/react-vite';
import CSSLesson2_1 from '@lessons/css/2_1';

const meta: Meta<typeof CSSLesson2_1> = {
  title: 'Lessons/css-2.1/Lesson',
  component: CSSLesson2_1,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof CSSLesson2_1>;

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
