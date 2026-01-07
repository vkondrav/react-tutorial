import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import HOCBasicsDemo from '@lessons/react/6_3/HOCBasicsDemo';

const meta: Meta<typeof HOCBasicsDemo> = {
  title: 'Lessons/react-6.3/HOCBasicsDemo',
  component: HOCBasicsDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates what Higher-Order Components are and how they work with a simple withBorder HOC example.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows the HOC pattern explanation
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the HOC pattern section
    expect(canvas.getByText('The HOC Pattern')).toBeInTheDocument();
    expect(canvas.getByText('How It Works')).toBeInTheDocument();
    expect(canvas.getByText('Live Demo: withBorder HOC')).toBeInTheDocument();
  },
};

/**
 * Verify the formula code snippet is displayed
 */
export const HOCFormula: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the HOC formula code
    expect(canvas.getByText('HOC formula')).toBeInTheDocument();

    // Should show "Creating an HOC" section
    expect(canvas.getByText('Creating an HOC')).toBeInTheDocument();
  },
};

/**
 * Live demo shows different HOC applications
 */
export const LiveDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show original greeting without HOC
    expect(canvas.getByText('Original Greeting (no HOC)')).toBeInTheDocument();
    expect(canvas.getByText('Live Demo: withBorder HOC')).toBeInTheDocument();

    // Should show enhanced greetings with borders
    expect(
      canvas.getByText(/GreetingWithBorder = withBorder\(Greeting, 'primary'\)/)
    ).toBeInTheDocument();
    expect(
      canvas.getByText(/GreetingWithAccentBorder = withBorder\(Greeting, 'accent'\)/)
    ).toBeInTheDocument();

    // Should show Stats with border
    expect(
      canvas.getByText(/StatsWithBorder = withBorder\(Stats, 'success'\)/)
    ).toBeInTheDocument();
    expect(canvas.getByText('42')).toBeInTheDocument();
    expect(canvas.getByText('Components Enhanced')).toBeInTheDocument();
  },
};

/**
 * Verify the "What HOCs Do" and "Don't Do" sections
 */
export const WhatHOCsDo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show what HOCs do
    expect(canvas.getByText('What HOCs Do')).toBeInTheDocument();
    expect(canvas.getByText(/Add new behavior to existing components/)).toBeInTheDocument();
    expect(canvas.getByText(/Wrap components with additional markup/)).toBeInTheDocument();
    expect(canvas.getByText(/Inject props into wrapped components/)).toBeInTheDocument();
    expect(canvas.getByText(/Intercept and transform props/)).toBeInTheDocument();

    // Should show what HOCs don't do
    expect(canvas.getByText("What HOCs Don't Do")).toBeInTheDocument();
    expect(canvas.getByText(/Modify the original component/)).toBeInTheDocument();
    expect(canvas.getByText(/Copy static methods automatically/)).toBeInTheDocument();
    expect(canvas.getByText(/Forward refs by default/)).toBeInTheDocument();
    expect(canvas.getByText(/Work inside render methods/)).toBeInTheDocument();
  },
};

/**
 * Verify the key insight section
 */
export const KeyInsight: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the key insight
    expect(canvas.getByText('Think of HOCs as Decorators')).toBeInTheDocument();
    expect(canvas.getByText(/decorates/)).toBeInTheDocument();
  },
};
