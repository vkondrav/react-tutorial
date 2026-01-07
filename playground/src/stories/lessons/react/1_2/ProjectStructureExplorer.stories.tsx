import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import ProjectStructureExplorer from '@lessons/react/1_2/ProjectStructureExplorer';

const meta: Meta<typeof ProjectStructureExplorer> = {
  title: 'Lessons/react-1.2/ProjectStructureExplorer',
  component: ProjectStructureExplorer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive file structure explorer. Click on files to see their contents and descriptions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to find a file button by name
const getFileButton = (canvasElement: HTMLElement, fileName: string): HTMLElement => {
  const buttons = canvasElement.querySelectorAll('button');
  const button = Array.from(buttons).find((btn) => btn.textContent?.includes(fileName));
  if (!button) throw new Error(`Button for ${fileName} not found`);
  return button;
};

/**
 * The default interactive file structure explorer.
 */
export const Default: Story = {};

/**
 * Tests clicking on index.html shows its contents.
 */
export const SelectIndexHtml: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially shows "Click a file to see its contents"
    expect(canvas.getByText('Click a file to see its contents')).toBeInTheDocument();

    // Click on index.html
    const indexButton = getFileButton(canvasElement, 'index.html');
    await userEvent.click(indexButton);

    // Should show the description
    expect(canvas.getByText(/The single HTML file/)).toBeInTheDocument();
  },
};

/**
 * Tests clicking on main.jsx shows its contents.
 */
export const SelectMainJsx: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const mainButton = getFileButton(canvasElement, 'main.jsx');
    await userEvent.click(mainButton);

    expect(canvas.getByText(/Initializes React and mounts App/)).toBeInTheDocument();
  },
};

/**
 * Tests clicking on App.jsx shows its contents.
 */
export const SelectAppJsx: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const appButton = getFileButton(canvasElement, 'App.jsx');
    await userEvent.click(appButton);

    expect(canvas.getByText(/Your main React component/)).toBeInTheDocument();
  },
};

/**
 * Tests clicking on package.json shows its contents.
 */
export const SelectPackageJson: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const packageButton = getFileButton(canvasElement, 'package.json');
    await userEvent.click(packageButton);

    expect(canvas.getByText(/Project dependencies and scripts/)).toBeInTheDocument();
  },
};

/**
 * Tests toggling selection (click again to deselect).
 */
export const ToggleSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const indexButton = getFileButton(canvasElement, 'index.html');

    // Select
    await userEvent.click(indexButton);
    expect(canvas.getByText(/The single HTML file/)).toBeInTheDocument();

    // Deselect by clicking again
    await userEvent.click(indexButton);
    expect(canvas.getByText('Click a file to see its contents')).toBeInTheDocument();
  },
};

/**
 * Tests switching between different files.
 */
export const SwitchBetweenFiles: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const indexButton = getFileButton(canvasElement, 'index.html');
    const mainButton = getFileButton(canvasElement, 'main.jsx');
    const appButton = getFileButton(canvasElement, 'App.jsx');

    // Click index.html
    await userEvent.click(indexButton);
    expect(canvas.getByText(/The single HTML file/)).toBeInTheDocument();

    // Switch to main.jsx
    await userEvent.click(mainButton);
    expect(canvas.getByText(/Initializes React and mounts App/)).toBeInTheDocument();

    // Switch to App.jsx
    await userEvent.click(appButton);
    expect(canvas.getByText(/Your main React component/)).toBeInTheDocument();
  },
};
