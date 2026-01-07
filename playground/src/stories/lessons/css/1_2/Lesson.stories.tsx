import type { Meta, StoryObj } from '@storybook/react-vite';
import CSSLesson1_2 from '@lessons/css/1_2';

const meta: Meta<typeof CSSLesson1_2> = {
  title: 'Lessons/css-1.2/Lesson',
  component: CSSLesson1_2,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'CSS Lesson 1.2: "Cascade, Specificity & Inheritance". Covers the cascade algorithm, specificity scoring (ID, Class, Element), the !important flag, and which CSS properties inherit.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The complete lesson page as it appears in the course.
 */
export const Default: Story = {};

/**
 * The lesson with a dark background for better contrast.
 */
export const WithBackground: Story = {
  decorators: [
    (Story) => (
      <div className="bg-base-300 min-h-screen py-8">
        <Story />
      </div>
    ),
  ],
};
