import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import RenderPropsBasicsDemo from '@lessons/react/6_2/RenderPropsBasicsDemo';

const meta: Meta<typeof RenderPropsBasicsDemo> = {
  title: 'Lessons/react-6.2/RenderPropsBasicsDemo',
  component: RenderPropsBasicsDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates what render props are by comparing hardcoded components vs flexible render prop components.',
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
 * Default view shows the hardcoded (rigid) approach
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show both tab buttons
    expect(canvas.getByRole('button', { name: /Hardcoded \(Rigid\)/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Render Prop \(Flexible\)/i })).toBeInTheDocument();

    // Hardcoded tab should be active by default
    const hardcodedTab = canvas.getByRole('button', { name: /Hardcoded \(Rigid\)/i });
    expect(hardcodedTab.className).toContain('btn-error');

    // Should show the hardcoded demo
    expect(canvas.getByText("Live Demo: You're Stuck with This")).toBeInTheDocument();
    expect(canvas.getByText('The Problem')).toBeInTheDocument();
  },
};

/**
 * Switch to render prop view and interact with counters
 */
export const RenderPropView: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click on the Render Prop tab
    const renderPropTab = canvas.getByRole('button', { name: /Render Prop \(Flexible\)/i });
    await user.click(renderPropTab);

    // Should now show the render prop demo
    await waitFor(() => {
      expect(canvas.getByText('Live Demo: Same Logic, Different UIs')).toBeInTheDocument();
    });

    // Should show The Solution section
    expect(canvas.getByText('The Solution')).toBeInTheDocument();

    // Should show all three styles
    expect(canvas.getByText('Simple')).toBeInTheDocument();
    expect(canvas.getByText('Badge Style')).toBeInTheDocument();
    expect(canvas.getByText('Inline')).toBeInTheDocument();
  },
};

/**
 * Test that all three counters work independently
 */
export const CountersWorkIndependently: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to render prop view
    const renderPropTab = canvas.getByRole('button', { name: /Render Prop \(Flexible\)/i });
    await user.click(renderPropTab);

    await waitFor(() => {
      expect(canvas.getByText('Live Demo: Same Logic, Different UIs')).toBeInTheDocument();
    });

    // Find and click the "+1" button (first counter)
    const plusOneBtn = canvas.getByRole('button', { name: '+1' });
    await user.click(plusOneBtn);
    await user.click(plusOneBtn);

    // First counter should show 2
    const counterValues = canvasElement.querySelectorAll('.text-2xl.font-bold.text-primary');
    expect(counterValues[0].textContent).toBe('2');

    // Click the Increment button (second counter)
    const incrementBtn = canvas.getByRole('button', { name: 'Increment' });
    await user.click(incrementBtn);

    // Check badge counter (second) shows 1
    const badgeCounter = canvasElement.querySelector('.badge.badge-lg.badge-secondary');
    expect(badgeCounter?.textContent).toBe('1');
  },
};

/**
 * Test the hardcoded counter increments
 */
export const HardcodedCounterWorks: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Should be on hardcoded view by default
    expect(canvas.getByText("Live Demo: You're Stuck with This")).toBeInTheDocument();

    // Find the Increment button and click it
    const incrementBtn = canvas.getByRole('button', { name: 'Increment' });
    await user.click(incrementBtn);
    await user.click(incrementBtn);
    await user.click(incrementBtn);

    // Counter should show 3
    const counter = canvasElement.querySelector('.text-2xl.font-bold');
    expect(counter?.textContent).toBe('3');
  },
};

/**
 * Verify the key insight section is displayed
 */
export const KeyInsight: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the core idea explanation
    expect(canvas.getByText('The Core Idea')).toBeInTheDocument();
    expect(canvas.getByText(/function that returns JSX/)).toBeInTheDocument();
  },
};
