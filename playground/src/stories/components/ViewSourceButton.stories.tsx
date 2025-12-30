import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import ViewSourceButton from '../../lessons/components/ViewSourceButton';
import { EditorType, type AppSettings } from '../../settings';

const cursorSettings: AppSettings = {
  projectPath: '/Users/test/react-tutorial',
  editor: EditorType.CURSOR,
};

const vscodeSettings: AppSettings = {
  projectPath: '/Users/test/react-tutorial',
  editor: EditorType.VSCODE,
};

const githubSettings: AppSettings = {
  projectPath: '/Users/test/react-tutorial',
  editor: EditorType.GITHUB,
};

const meta: Meta<typeof ViewSourceButton> = {
  title: 'Shared Components/ViewSourceButton',
  component: ViewSourceButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reusable button for opening source files in the configured editor. Supports Cursor, VS Code, and GitHub with appropriate link handling.',
      },
    },
  },
  argTypes: {
    href: {
      control: 'text',
      description: 'The URL to open when clicked',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
      description: 'Button size variant',
    },
    tooltipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state with Cursor editor
 */
export const Default: Story = {
  args: {
    href: 'cursor://file/Users/test/react-tutorial/src/App.tsx',
    settings: cursorSettings,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'cursor://file/Users/test/react-tutorial/src/App.tsx');
    expect(link).toHaveAttribute('data-tip', 'View Source (Cursor)');
    // Should NOT open in new tab for local editors
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  },
};

/**
 * VS Code editor configuration
 */
export const VSCode: Story = {
  args: {
    href: 'vscode://file/Users/test/react-tutorial/src/App.tsx',
    settings: vscodeSettings,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    expect(link).toHaveAttribute('data-tip', 'View Source (VS Code)');
    // Should NOT open in new tab for local editors
    expect(link).not.toHaveAttribute('target');
  },
};

/**
 * GitHub editor opens in new tab
 */
export const GitHub: Story = {
  args: {
    href: 'https://github.com/vkondrav/react-tutorial/blob/main/playground/src/App.tsx',
    settings: githubSettings,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    expect(link).toHaveAttribute('data-tip', 'View Source (GitHub)');
    // GitHub should open in new tab
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};

/**
 * Extra small size (xs) - used in Homepage inline
 */
export const SizeXS: Story = {
  args: {
    href: 'cursor://file/test.tsx',
    settings: cursorSettings,
    size: 'xs',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    expect(link.className).toContain('btn-xs');
  },
};

/**
 * Small size (sm) - default, used in App header
 */
export const SizeSM: Story = {
  args: {
    href: 'cursor://file/test.tsx',
    settings: cursorSettings,
    size: 'sm',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    expect(link.className).toContain('btn-sm');
  },
};

/**
 * Medium size (md)
 */
export const SizeMD: Story = {
  args: {
    href: 'cursor://file/test.tsx',
    settings: cursorSettings,
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    expect(link.className).toContain('btn-md');
  },
};

/**
 * Tooltip on top - used in Homepage
 */
export const TooltipTop: Story = {
  args: {
    href: 'cursor://file/test.tsx',
    settings: cursorSettings,
    tooltipPosition: 'top',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    expect(link.className).toContain('tooltip-top');
  },
};

/**
 * Tooltip on bottom - default, used in App header
 */
export const TooltipBottom: Story = {
  args: {
    href: 'cursor://file/test.tsx',
    settings: cursorSettings,
    tooltipPosition: 'bottom',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    expect(link.className).toContain('tooltip-bottom');
  },
};

/**
 * With custom className
 */
export const WithCustomClass: Story = {
  args: {
    href: 'cursor://file/test.tsx',
    settings: cursorSettings,
    className: 'inline-flex mx-1',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    expect(link.className).toContain('inline-flex');
    expect(link.className).toContain('mx-1');
  },
};

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <ViewSourceButton href="#" settings={cursorSettings} size="xs" />
        <span className="text-xs text-base-content/60">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ViewSourceButton href="#" settings={cursorSettings} size="sm" />
        <span className="text-xs text-base-content/60">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ViewSourceButton href="#" settings={cursorSettings} size="md" />
        <span className="text-xs text-base-content/60">md</span>
      </div>
    </div>
  ),
};

/**
 * All editors comparison
 */
export const AllEditors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <ViewSourceButton href="cursor://file/test.tsx" settings={cursorSettings} />
        <span className="text-xs text-base-content/60">Cursor</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ViewSourceButton href="vscode://file/test.tsx" settings={vscodeSettings} />
        <span className="text-xs text-base-content/60">VS Code</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ViewSourceButton href="https://github.com/test" settings={githubSettings} />
        <span className="text-xs text-base-content/60">GitHub</span>
      </div>
    </div>
  ),
};
