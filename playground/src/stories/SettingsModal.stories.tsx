import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor, fn } from 'storybook/test';
import SettingsModal from '../SettingsModal';
import { EditorType, type AppSettings } from '../settings';

const defaultSettings: AppSettings = {
  projectPath: '/Users/test/react-tutorial/playground/src/lessons',
  editor: EditorType.CURSOR,
};

const meta: Meta<typeof SettingsModal> = {
  title: 'Root/SettingsModal',
  component: SettingsModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Settings modal for configuring the View Source behavior. Allows choosing between Cursor, VS Code, or GitHub, and setting the local project path.',
      },
    },
  },
  args: {
    settings: defaultSettings,
    onSave: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state - shows settings button
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have settings button
    const settingsButton = canvas.getByRole('button');
    expect(settingsButton).toBeInTheDocument();
  },
};

/**
 * Opens the modal when clicking settings button
 */
export const OpenModal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click settings button
    await userEvent.click(canvas.getByRole('button'));

    // Modal should be visible
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Settings');
      expect(canvasElement.textContent).toContain('View Source opens in');
    });

    // Should show all three editor options
    expect(canvas.getByRole('button', { name: /Cursor/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /VS Code/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /GitHub/i })).toBeInTheDocument();
  },
};

/**
 * Tests switching to VS Code
 */
export const SwitchToVSCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open modal
    await userEvent.click(canvas.getByRole('button'));

    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /VS Code/i })).toBeInTheDocument();
    });

    // Click VS Code button
    await userEvent.click(canvas.getByRole('button', { name: /VS Code/i }));

    // Preview should show vscode:// link
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('vscode://file');
    });
  },
};

/**
 * Tests switching to GitHub
 */
export const SwitchToGitHub: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open modal
    await userEvent.click(canvas.getByRole('button'));

    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /GitHub/i })).toBeInTheDocument();
    });

    // Click GitHub button
    await userEvent.click(canvas.getByRole('button', { name: /GitHub/i }));

    // GitHub mode hides the project path input (no local settings needed)
    // Preview should show GitHub link
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('https://github.com/');
    });
  },
};

/**
 * Tests that project path input is shown for local editors
 */
export const ShowsProjectPathForLocalEditors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open modal
    await userEvent.click(canvas.getByRole('button'));

    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Local Project Path');
    });

    // Should show project path input
    const pathInput = canvas.getByPlaceholderText('/path/to/playground/src/lessons');
    expect(pathInput).toBeInTheDocument();
  },
};

/**
 * Tests save functionality
 */
export const SaveSettings: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Open modal
    await userEvent.click(canvas.getByRole('button'));

    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Save Settings/i })).toBeInTheDocument();
    });

    // Switch to VS Code
    await userEvent.click(canvas.getByRole('button', { name: /VS Code/i }));

    // Click Save
    await userEvent.click(canvas.getByRole('button', { name: /Save Settings/i }));

    // Should have called onSave with updated settings
    await waitFor(() => {
      expect(args.onSave).toHaveBeenCalled();
    });
  },
};

/**
 * Tests cancel functionality - discards changes
 */
export const CancelSettings: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open modal - find the settings cog button specifically
    const settingsButtons = canvas.getAllByRole('button');
    const settingsCog = settingsButtons.find(
      (btn) => btn.querySelector('svg') !== null && !btn.textContent?.includes('Cursor')
    );
    await userEvent.click(settingsCog!);

    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    });

    // Switch to GitHub
    await userEvent.click(canvas.getByRole('button', { name: /GitHub/i }));

    // Verify GitHub is now selected
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('https://github.com/');
    });

    // Click Cancel - should discard the change
    await userEvent.click(canvas.getByRole('button', { name: /Cancel/i }));

    // Verify cancel worked (modal closes)
    await waitFor(() => {
      // The cancel button should not be visible anymore
      expect(canvas.queryByRole('button', { name: /Cancel/i })).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests preview updates when changing path
 */
export const PreviewUpdatesWithPath: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open modal
    await userEvent.click(canvas.getByRole('button'));

    await waitFor(() => {
      expect(canvas.getByPlaceholderText('/path/to/playground/src/lessons')).toBeInTheDocument();
    });

    // Clear and type new path
    const pathInput = canvas.getByPlaceholderText('/path/to/playground/src/lessons');
    await userEvent.clear(pathInput);
    await userEvent.type(pathInput, '/custom/path/lessons');

    // Preview should update
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('/custom/path/lessons');
    });
  },
};

/**
 * VS Code settings variant
 */
export const VSCodeSettings: Story = {
  args: {
    settings: {
      ...defaultSettings,
      editor: EditorType.VSCODE,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open modal
    await userEvent.click(canvas.getByRole('button'));

    await waitFor(() => {
      // VS Code should be selected
      expect(canvasElement.textContent).toContain('vscode://file');
    });
  },
};

/**
 * GitHub settings variant
 */
export const GitHubSettings: Story = {
  args: {
    settings: {
      ...defaultSettings,
      editor: EditorType.GITHUB,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open modal
    await userEvent.click(canvas.getByRole('button'));

    await waitFor(() => {
      // GitHub should be selected - preview shows github URL
      expect(canvasElement.textContent).toContain('https://github.com/');
    });
  },
};

/**
 * Custom button with label - used on homepage
 */
export const CustomButtonWithLabel: Story = {
  args: {
    buttonClassName: 'btn btn-secondary btn-lg gap-2',
    buttonLabel: 'Adjust Settings',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the custom label
    expect(canvasElement.textContent).toContain('Adjust Settings');

    // Button should have custom class (btn-lg makes it larger)
    const button = canvas.getByRole('button', { name: /Adjust Settings/i });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('btn-secondary');
    expect(button.className).toContain('btn-lg');
  },
};

/**
 * Custom button opens modal correctly
 */
export const CustomButtonOpensModal: Story = {
  args: {
    buttonClassName: 'btn btn-outline btn-lg gap-2',
    buttonLabel: 'Configure Editor',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the custom button
    await userEvent.click(canvas.getByRole('button', { name: /Configure Editor/i }));

    // Modal should open
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Settings');
      expect(canvasElement.textContent).toContain('View Source opens in');
    });
  },
};

/**
 * Default button has tooltip
 */
export const DefaultButtonHasTooltip: Story = {
  play: async ({ canvasElement }) => {
    // Default button should have tooltip
    const button = canvasElement.querySelector('button[data-tip="Settings"]');
    expect(button).toBeInTheDocument();
  },
};

/**
 * Custom labeled button has no tooltip
 */
export const LabeledButtonNoTooltip: Story = {
  args: {
    buttonLabel: 'Settings',
  },
  play: async ({ canvasElement }) => {
    // Button with label should NOT have tooltip (since label is visible)
    const button = canvasElement.querySelector('button[data-tip="Settings"]');
    expect(button).not.toBeInTheDocument();

    // But should have the label text
    expect(canvasElement.textContent).toContain('Settings');
  },
};
