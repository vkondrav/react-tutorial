import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import FileFlowDemo from '@lessons/1_2/FileFlowDemo';

const meta: Meta<typeof FileFlowDemo> = {
  title: 'Lessons/1.2 Setting Up React App/FileFlowDemo',
  component: FileFlowDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive demo showing how React files connect. Click on steps to see the flow from HTML → JavaScript → Components.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default file flow demo.
 */
export const Default: Story = {};

/**
 * Tests clicking on index.html step shows its content.
 */
export const SelectIndexHtmlStep: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially shows "Click a step"
    expect(canvas.getByText('Click a step')).toBeInTheDocument();

    // Click on index.html button
    const indexButton = canvas.getByRole('button', { name: 'index.html' });
    await userEvent.click(indexButton);

    // Should show the step content
    expect(canvas.getByText(/Browser loads index.html/)).toBeInTheDocument();
  },
};

/**
 * Tests clicking on main.jsx step shows its content.
 */
export const SelectMainJsxStep: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const mainButton = canvas.getByRole('button', { name: 'main.jsx' });
    await userEvent.click(mainButton);

    expect(canvas.getByText(/React initializes and renders/)).toBeInTheDocument();
  },
};

/**
 * Tests clicking on App.jsx step shows its content.
 */
export const SelectAppJsxStep: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const appButton = canvas.getByRole('button', { name: 'App.jsx' });
    await userEvent.click(appButton);

    expect(canvas.getByText(/Your components execute and return JSX/)).toBeInTheDocument();
  },
};

/**
 * Tests clicking on Done step shows completion message.
 */
export const SelectDoneStep: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const doneButton = canvas.getByRole('button', { name: 'Done!' });
    await userEvent.click(doneButton);

    expect(canvas.getByText(/UI is rendered/)).toBeInTheDocument();
  },
};

/**
 * Tests toggling selection (click again to deselect).
 */
export const ToggleStep: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const indexButton = canvas.getByRole('button', { name: 'index.html' });

    // Select
    await userEvent.click(indexButton);
    expect(canvas.getByText(/Browser loads index.html/)).toBeInTheDocument();

    // Deselect by clicking again
    await userEvent.click(indexButton);
    expect(canvas.getByText('Click a step')).toBeInTheDocument();
  },
};

/**
 * Tests navigating through all steps in sequence.
 */
export const NavigateThroughSteps: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Step 1: index.html
    await userEvent.click(canvas.getByRole('button', { name: 'index.html' }));
    expect(canvas.getByText(/Browser loads index.html/)).toBeInTheDocument();

    // Step 2: main.jsx
    await userEvent.click(canvas.getByRole('button', { name: 'main.jsx' }));
    expect(canvas.getByText(/React initializes and renders/)).toBeInTheDocument();

    // Step 3: App.jsx
    await userEvent.click(canvas.getByRole('button', { name: 'App.jsx' }));
    expect(canvas.getByText(/Your components execute and return JSX/)).toBeInTheDocument();

    // Step 4: Done!
    await userEvent.click(canvas.getByRole('button', { name: 'Done!' }));
    expect(canvas.getByText(/UI is rendered/)).toBeInTheDocument();
  },
};
