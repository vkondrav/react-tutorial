import type { Meta, StoryObj } from '@storybook/react-vite';
import TakeawayList from '../../lessons/components/TakeawayList';

const meta: Meta<typeof TakeawayList> = {
  title: 'Shared Components/TakeawayList',
  component: TakeawayList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array of takeaway items (can be strings or React nodes)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      'React is a library for building UIs with reusable components',
      'Declarative code describes WHAT you want, not HOW to do it',
      'Components are like LEGO blocks - small, reusable, composable',
    ],
  },
};

export const WithFormattedItems: Story = {
  args: {
    items: [
      <>
        <strong className="text-primary">Virtual DOM</strong> makes updates fast by only changing
        what's necessary
      </>,
      <>
        <strong className="text-success">One-way data flow</strong> keeps your app predictable
      </>,
      <>
        <strong className="text-accent">JSX</strong> lets you write HTML-like syntax in JavaScript
      </>,
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: ['This is a single takeaway point'],
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      'First takeaway point',
      'Second takeaway point',
      'Third takeaway point',
      'Fourth takeaway point',
      'Fifth takeaway point',
      'Sixth takeaway point',
    ],
  },
};
