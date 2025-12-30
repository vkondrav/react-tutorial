import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import ComponentBasicsDemo from '@lessons/1_4/ComponentBasicsDemo';

const meta: Meta<typeof ComponentBasicsDemo> = {
  title: 'Lessons/1.4/ComponentBasicsDemo',
  component: ComponentBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates three different component syntax styles: Function Declaration, Arrow Function, and Arrow Function with Implicit Return.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default component basics demo showing function declaration syntax.
 */
export const Default: Story = {};

/**
 * Tests switching to Arrow Function syntax.
 */
export const SwitchToArrowFunction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Arrow Function tab
    const arrowTab = canvas.getByRole('button', { name: /Arrow Function/i });
    await userEvent.click(arrowTab);

    // Verify the description updated
    expect(canvas.getByText(/Modern syntax - popular in the community/i)).toBeInTheDocument();
  },
};

/**
 * Tests switching to Arrow Function with Implicit Return syntax.
 */
export const SwitchToArrowImplicit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Arrow (Implicit Return) tab
    const implicitTab = canvas.getByRole('button', { name: /Arrow \(Implicit Return\)/i });
    await userEvent.click(implicitTab);

    // Verify the description updated
    expect(canvas.getByText(/Shortest syntax - great for simple components/i)).toBeInTheDocument();
  },
};

/**
 * Tests switching between all three syntax styles.
 */
export const SwitchAllTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start with Function Declaration (default)
    expect(canvas.getByText(/The classic way - clear and readable/i)).toBeInTheDocument();

    // Switch to Arrow Function
    await userEvent.click(canvas.getByRole('button', { name: /^Arrow Function$/i }));
    expect(canvas.getByText(/Modern syntax - popular in the community/i)).toBeInTheDocument();

    // Switch to Arrow Implicit
    await userEvent.click(canvas.getByRole('button', { name: /Arrow \(Implicit Return\)/i }));
    expect(canvas.getByText(/Shortest syntax - great for simple components/i)).toBeInTheDocument();

    // Switch back to Function Declaration
    await userEvent.click(canvas.getByRole('button', { name: /Function Declaration/i }));
    expect(canvas.getByText(/The classic way - clear and readable/i)).toBeInTheDocument();
  },
};
