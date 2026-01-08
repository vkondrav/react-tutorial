import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import FlexLayoutDemo from '@lessons/css/2_2/FlexLayoutDemo';

const meta: Meta<typeof FlexLayoutDemo> = {
  title: 'Lessons/css-2.2/FlexLayoutDemo',
  component: FlexLayoutDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof FlexLayoutDemo>;

export const Default: Story = {};

/**
 * Tests switching to Header Layout pattern
 */
export const HeaderLayoutPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const headerBtn = canvas.getByRole('button', { name: /Header Layout/i });
    await userEvent.click(headerBtn);

    expect(canvasElement.textContent).toContain('Logo');
    expect(canvasElement.textContent).toContain('Navigation');
    expect(canvasElement.textContent).toContain('Actions');
  },
};

/**
 * Tests switching to Card Row pattern
 */
export const CardRowPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const cardRowBtn = canvas.getByRole('button', { name: /Card Row/i });
    await userEvent.click(cardRowBtn);

    expect(canvasElement.textContent).toContain('Card 1');
    expect(canvasElement.textContent).toContain('Card 2');
    expect(canvasElement.textContent).toContain('Card 3');
  },
};

/**
 * Tests switching to Sidebar Layout pattern
 */
export const SidebarLayoutPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const sidebarBtn = canvas.getByRole('button', { name: /Sidebar Layout/i });
    await userEvent.click(sidebarBtn);

    expect(canvasElement.textContent).toContain('Sidebar');
    expect(canvasElement.textContent).toContain('Main Content');
  },
};

/**
 * Tests switching to Gap Property pattern
 */
export const GapPropertyPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const gapBtn = canvas.getByRole('button', { name: /Gap Property/i });
    await userEvent.click(gapBtn);

    expect(canvasElement.textContent).toContain('Without gap');
    expect(canvasElement.textContent).toContain('With gap');
  },
};

/**
 * Tests Perfect Centering shows centered content
 */
export const PerfectCenteringPattern: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Perfectly Centered');
    expect(canvasElement.textContent).toContain('Both axes');
  },
};

/**
 * Tests CSS code is shown for current pattern
 */
export const CSSForPattern: Story = {
  play: async ({ canvasElement }) => {
    // CodeSnippet shows the pattern title
    expect(canvasElement.textContent).toContain('Perfect Centering');
    expect(canvasElement.textContent).toContain('display: flex');
  },
};

/**
 * Tests pro tips are shown
 */
export const ProTipsShown: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Pro Tips');
    expect(canvasElement.textContent).toContain('gap');
  },
};

/**
 * Tests code snippet is shown
 */
export const CodeSnippetShown: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Common Flex Patterns');
  },
};
