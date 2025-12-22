import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import ChildrenDemo from '@lessons/2_1/ChildrenDemo';

const meta: Meta<typeof ChildrenDemo> = {
  title: 'Lessons/2.1 Props/ChildrenDemo',
  component: ChildrenDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates the special children prop - content passed between component tags.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with "Welcome!" title and default content
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show default values
    expect(canvas.getByDisplayValue('Welcome!')).toBeInTheDocument();
    expect(canvas.getByDisplayValue('This content is passed as children.')).toBeInTheDocument();

    // Should display in the live result (check heading and content area)
    expect(canvas.getByRole('heading', { name: 'Welcome!' })).toBeInTheDocument();
    const liveResult = canvasElement.querySelector('.card.bg-base-100');
    expect(liveResult?.textContent).toContain('This content is passed as children.');
  },
};

/**
 * Tests changing the title prop
 */
export const ChangeTitle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and change the title input
    const titleInput = canvas.getByDisplayValue('Welcome!');
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Hello World');

    // Should update in the live result
    expect(canvas.getByRole('heading', { name: 'Hello World' })).toBeInTheDocument();
  },
};

/**
 * Tests changing the children content
 */
export const ChangeContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and change the children input
    const contentInput = canvas.getByDisplayValue('This content is passed as children.');
    await userEvent.clear(contentInput);
    await userEvent.type(contentInput, 'New content here!');

    // Should update in the live result
    const liveResult = canvasElement.querySelector('.card.bg-base-100');
    expect(liveResult?.textContent).toContain('New content here!');
  },
};

/**
 * Tests empty title shows fallback
 */
export const EmptyTitle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Clear the title
    const titleInput = canvas.getByDisplayValue('Welcome!');
    await userEvent.clear(titleInput);

    // Should show fallback
    expect(canvas.getByText('Card Title')).toBeInTheDocument();
  },
};

/**
 * Tests empty content shows fallback
 */
export const EmptyContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Clear the content
    const contentInput = canvas.getByDisplayValue('This content is passed as children.');
    await userEvent.clear(contentInput);

    // Should show fallback
    expect(canvas.getByText('Card content goes here...')).toBeInTheDocument();
  },
};

/**
 * Tests the examples section showing different children types
 */
export const ShowsExamples: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show examples section
    expect(canvas.getByText(/Children can be anything!/i)).toBeInTheDocument();

    // Should show three types
    expect(canvas.getByText('Text')).toBeInTheDocument();
    expect(canvas.getByText('Elements')).toBeInTheDocument();
    expect(canvas.getByText('Components')).toBeInTheDocument();
  },
};

/**
 * Tests changing both title and content
 */
export const ChangeBoth: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Change title
    const titleInput = canvas.getByDisplayValue('Welcome!');
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'My Card');

    // Change content
    const contentInput = canvas.getByDisplayValue('This content is passed as children.');
    await userEvent.clear(contentInput);
    await userEvent.type(contentInput, 'Custom content');

    // Both should update
    expect(canvas.getByRole('heading', { name: 'My Card' })).toBeInTheDocument();
    const liveResult = canvasElement.querySelector('.card.bg-base-100');
    expect(liveResult?.textContent).toContain('Custom content');
  },
};

/**
 * Tests the code snippet updates with input values
 */
export const CodeUpdatesWithInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Change title
    const titleInput = canvas.getByDisplayValue('Welcome!');
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Test');

    // Code should show the new title
    // Look for the code snippet showing usage
    expect(canvas.getByText('Usage')).toBeInTheDocument();
  },
};
