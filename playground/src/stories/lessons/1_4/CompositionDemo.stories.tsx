import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import CompositionDemo from '@lessons/1_4/CompositionDemo';

const meta: Meta<typeof CompositionDemo> = {
  title: 'Lessons/1.4/CompositionDemo',
  component: CompositionDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Visualizes component composition by showing a component tree alongside a live preview. Hover over components to see them highlighted.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default composition demo.
 */
export const Default: Story = {};

/**
 * Tests hovering over the Header component.
 */
export const HoverHeader: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and hover the Header component in the tree
    const headerNode = canvas.getByText('Header', { selector: 'span' });
    await userEvent.hover(headerNode);

    // Verify the description appears
    expect(canvas.getByText(/Contains Logo and Nav/i)).toBeInTheDocument();
  },
};

/**
 * Tests hovering over the Logo component.
 */
export const HoverLogo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and hover the Logo component
    const logoNode = canvas.getByText('Logo', { selector: 'span' });
    await userEvent.hover(logoNode);

    // Verify the description appears
    expect(canvas.getByText(/Simple leaf component/i)).toBeInTheDocument();
  },
};

/**
 * Tests hovering over the Nav component.
 */
export const HoverNav: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and hover the Nav component
    const navNode = canvas.getByText('Nav', { selector: 'span' });
    await userEvent.hover(navNode);

    // Verify the description appears
    expect(canvas.getByText(/Contains NavLink children/i)).toBeInTheDocument();
  },
};

/**
 * Tests hovering over the NavLink component.
 */
export const HoverNavLink: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and hover the NavLink component
    const navLinkNode = canvas.getByText('NavLink', { selector: 'span' });
    await userEvent.hover(navLinkNode);

    // Verify the description appears and shows it's reused 3 times
    expect(canvas.getByText(/Reused 3 times with different text/i)).toBeInTheDocument();
  },
};

/**
 * Tests hovering over multiple components in sequence.
 */
export const HoverMultipleComponents: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Hover Header
    await userEvent.hover(canvas.getByText('Header', { selector: 'span' }));
    expect(canvas.getByText(/Contains Logo and Nav/i)).toBeInTheDocument();

    // Hover Main
    await userEvent.hover(canvas.getByText('Main', { selector: 'span' }));
    expect(canvas.getByText(/Main content area/i)).toBeInTheDocument();

    // Hover Logo
    await userEvent.hover(canvas.getByText('Logo', { selector: 'span' }));
    expect(canvas.getByText(/Simple leaf component/i)).toBeInTheDocument();
  },
};
