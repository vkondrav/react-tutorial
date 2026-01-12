import type { Meta, StoryObj } from '@storybook/react-vite';
import { HiOutlineLightBulb, HiOutlineCode } from 'react-icons/hi';
import Section from '../../lessons/components/Section';

const meta: Meta<typeof Section> = {
  title: 'Shared Components/Section',
  component: Section,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The section title (can include React nodes)',
    },
    children: {
      description: 'The section content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Section Title',
    children: (
      <p className="text-base-content/70">
        This is the section content. It can contain any React elements.
      </p>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    title: (
      <span className="flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        The Big Idea
      </span>
    ),
    children: (
      <p className="text-base-content/70">
        React lets you describe <strong className="text-primary">what</strong> your UI should look
        like, not <strong className="text-accent">how</strong> to build it step by step.
      </p>
    ),
  },
};

export const WithCodeContent: Story = {
  args: {
    title: (
      <span className="flex items-center gap-2">
        <HiOutlineCode className="text-primary" size={20} />
        Code Example
      </span>
    ),
    children: (
      <div>
        <p className="text-base-content/70 mb-4">Here's how you would write this in React:</p>
        <pre className="bg-base-300 p-4 rounded-lg text-sm">
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code>{`function App() {
  return <h1>Hello World</h1>;
}`}</code>
        </pre>
      </div>
    ),
  },
};
