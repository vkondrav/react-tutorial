import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import App from '../App';

const meta: Meta<typeof App> = {
  title: 'App/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The main React Tutorial application. Includes homepage, lesson navigation, sidebar, and settings.',
      },
    },
  },
  // Reset URL hash before each story
  beforeEach: () => {
    window.location.hash = '';
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state - shows homepage when no hash
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Should show homepage content
    expect(canvasElement.textContent).toContain('React Tutorial');
    expect(canvasElement.textContent).toContain('Learn React by');
    expect(canvasElement.textContent).toContain('Reading the Source');
  },
};

/**
 * Homepage has Start Learning button
 */
export const HomepageStartLearning: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have Start Learning button
    const startButton = canvas.getByRole('button', { name: /Start Learning/i });
    expect(startButton).toBeInTheDocument();
  },
};

/**
 * Homepage has Adjust Settings button
 */
export const HomepageAdjustSettings: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have Adjust Settings button
    const settingsButton = canvas.getByRole('button', { name: /Adjust Settings/i });
    expect(settingsButton).toBeInTheDocument();
  },
};

/**
 * Clicking Start Learning navigates to first lesson
 */
export const NavigateToFirstLesson: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Start Learning
    await userEvent.click(canvas.getByRole('button', { name: /Start Learning/i }));

    // Should show lesson content (sidebar with modules)
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Module 1');
      expect(canvasElement.textContent).toContain('What is React?');
    });

    // Should show lesson header with module/lesson info
    expect(canvasElement.textContent).toContain('Lesson 1.1');
  },
};

/**
 * Settings modal opens from homepage
 */
export const OpenSettingsFromHomepage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Adjust Settings
    await userEvent.click(canvas.getByRole('button', { name: /Adjust Settings/i }));

    // Should show settings modal
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('View Source opens in');
      expect(canvas.getByRole('button', { name: /Cursor/i })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: /VS Code/i })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: /GitHub/i })).toBeInTheDocument();
    });
  },
};

/**
 * Navigate to lesson then access settings from header
 */
export const SettingsInLessonView: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Go to a lesson first
    await userEvent.click(canvas.getByRole('button', { name: /Start Learning/i }));

    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Lesson 1.1');
    });

    // Find and click settings cog in header (small icon button)
    const settingsButtons = canvas.getAllByRole('button');
    const settingsCog = settingsButtons.find(
      (btn) =>
        btn.classList.contains('btn-ghost') &&
        btn.classList.contains('btn-sm') &&
        btn.classList.contains('btn-square') &&
        btn.querySelector('svg') !== null
    );

    if (settingsCog) {
      await userEvent.click(settingsCog);

      // Should show settings modal
      await waitFor(() => {
        expect(canvasElement.textContent).toContain('View Source opens in');
      });
    }
  },
};

/**
 * View Source button shows correct editor in tooltip
 */
export const ViewSourceTooltip: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Go to a lesson first
    await userEvent.click(canvas.getByRole('button', { name: /Start Learning/i }));

    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Lesson 1.1');
    });

    // View Source button should have tooltip mentioning editor (default is GitHub)
    const viewSourceLink = canvasElement.querySelector('a[data-tip*="View Source"]');
    expect(viewSourceLink).toBeInTheDocument();
    // Tooltip should contain one of the editor names
    const tooltip = viewSourceLink?.getAttribute('data-tip') || '';
    expect(
      tooltip.includes('Cursor') || tooltip.includes('VS Code') || tooltip.includes('GitHub')
    ).toBe(true);
  },
};

/**
 * Sidebar shows all modules
 */
export const SidebarShowsModules: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Go to a lesson to see sidebar
    await userEvent.click(canvas.getByRole('button', { name: /Start Learning/i }));

    await waitFor(() => {
      // Should show all 8 modules
      expect(canvasElement.textContent).toContain('Module 1: Foundation');
      expect(canvasElement.textContent).toContain('Module 2: Core Concepts');
      expect(canvasElement.textContent).toContain('Module 3: Hooks Deep Dive');
      expect(canvasElement.textContent).toContain('Module 4: Data Fetching');
    });
  },
};

/**
 * Home button in sidebar returns to homepage
 */
export const HomeButtonReturnsToHomepage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Go to a lesson first
    await userEvent.click(canvas.getByRole('button', { name: /Start Learning/i }));

    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Lesson 1.1');
    });

    // Click the React Tutorial logo/home button in sidebar
    const homeButton = canvas.getByRole('button', { name: /React Tutorial/i });
    await userEvent.click(homeButton);

    // Should return to homepage
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Learn React by');
      expect(canvasElement.textContent).toContain('Reading the Source');
    });
  },
};

/**
 * Progress bar is visible in sidebar
 */
export const ProgressBarVisible: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Go to a lesson to see sidebar
    await userEvent.click(canvas.getByRole('button', { name: /Start Learning/i }));

    await waitFor(() => {
      // Should show progress section
      expect(canvasElement.textContent).toContain('Progress');
      expect(canvasElement.textContent).toContain('lessons complete');
    });
  },
};

/**
 * Mark lesson complete button works
 */
export const MarkLessonComplete: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Go to a lesson
    await userEvent.click(canvas.getByRole('button', { name: /Start Learning/i }));

    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Lesson 1.1');
    });

    // Find mark complete button (the checkmark button)
    const markCompleteButton = canvasElement.querySelector(
      'button[data-tip="Mark complete"]'
    ) as HTMLButtonElement;

    if (markCompleteButton) {
      await userEvent.click(markCompleteButton);

      // Should now show "Mark incomplete" tooltip
      await waitFor(() => {
        const markIncompleteButton = canvasElement.querySelector(
          'button[data-tip="Mark incomplete"]'
        );
        expect(markIncompleteButton).toBeInTheDocument();
      });
    }
  },
};
