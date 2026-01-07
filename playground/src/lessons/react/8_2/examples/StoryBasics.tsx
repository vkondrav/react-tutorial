// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';

// Meta describes the component and its default configuration
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'], // Enable auto-generated docs
};

export default meta;
type Story = StoryObj<typeof meta>;

// Each export is a "story" - a different state of your component
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};
