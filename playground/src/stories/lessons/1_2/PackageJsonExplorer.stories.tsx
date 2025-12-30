import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import PackageJsonExplorer from '@lessons/1_2/PackageJsonExplorer';

const meta: Meta<typeof PackageJsonExplorer> = {
  title: 'Lessons/1.2/PackageJsonExplorer',
  component: PackageJsonExplorer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive package.json explorer. Switch between Scripts and Dependencies tabs to see different sections.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default package.json explorer (starts on Scripts tab).
 */
export const Default: Story = {};

/**
 * Tests the Scripts tab is active by default.
 */
export const ScriptsTabDefault: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Scripts button should be active (not outline)
    const scriptsButton = canvas.getByRole('button', { name: /Scripts/i });
    expect(scriptsButton).toHaveClass('btn-primary');

    // Should show scripts description
    expect(canvas.getByText(/npm run dev starts the dev server/)).toBeInTheDocument();
  },
};

/**
 * Tests switching to Dependencies tab.
 */
export const SwitchToDependencies: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const depsButton = canvas.getByRole('button', { name: /Dependencies/i });

    // Click Dependencies tab
    await userEvent.click(depsButton);

    // Dependencies button should be active
    expect(depsButton).toHaveClass('btn-primary');

    // Should show dependencies description
    expect(canvas.getByText(/Packages bundled into production/)).toBeInTheDocument();
  },
};

/**
 * Tests switching back to Scripts tab.
 */
export const SwitchBackToScripts: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const scriptsButton = canvas.getByRole('button', { name: /Scripts/i });
    const depsButton = canvas.getByRole('button', { name: /Dependencies/i });

    // Switch to Dependencies
    await userEvent.click(depsButton);
    expect(canvas.getByText(/Packages bundled into production/)).toBeInTheDocument();

    // Switch back to Scripts
    await userEvent.click(scriptsButton);
    expect(canvas.getByText(/npm run dev starts the dev server/)).toBeInTheDocument();
  },
};

/**
 * Tests tab switching multiple times.
 */
export const ToggleTabs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const scriptsButton = canvas.getByRole('button', { name: /Scripts/i });
    const depsButton = canvas.getByRole('button', { name: /Dependencies/i });

    // Start on Scripts
    expect(canvas.getByText(/npm run dev starts the dev server/)).toBeInTheDocument();

    // Switch to Dependencies
    await userEvent.click(depsButton);
    expect(canvas.getByText(/Packages bundled into production/)).toBeInTheDocument();

    // Switch back to Scripts
    await userEvent.click(scriptsButton);
    expect(canvas.getByText(/npm run dev starts the dev server/)).toBeInTheDocument();

    // Switch to Dependencies again
    await userEvent.click(depsButton);
    expect(canvas.getByText(/Packages bundled into production/)).toBeInTheDocument();
  },
};
