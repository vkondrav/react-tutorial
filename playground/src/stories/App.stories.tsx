import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import App from '../App';

const meta: Meta<typeof App> = {
  title: 'Root/App',
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
    expect(canvasElement.textContent).toContain('Web Dev Tutorial');
    expect(canvasElement.textContent).toContain('Learn by');
    expect(canvasElement.textContent).toContain('Reading the Source');
  },
};

/**
 * Homepage has course selection cards
 */
export const HomepageCourseCards: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have React and CSS course cards
    const reactCard = canvas.getByRole('button', { name: /React Fundamentals/i });
    const cssCard = canvas.getByRole('button', { name: /CSS Mastery/i });
    expect(reactCard).toBeInTheDocument();
    expect(cssCard).toBeInTheDocument();
  },
};

/**
 * Homepage has Settings button
 */
export const HomepageSettings: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have Settings button
    const settingsButton = canvas.getByRole('button', { name: /Settings/i });
    expect(settingsButton).toBeInTheDocument();
  },
};

/**
 * Clicking React course card navigates to first React lesson
 */
export const NavigateToFirstReactLesson: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click React Fundamentals card
    await userEvent.click(canvas.getByRole('button', { name: /React Fundamentals/i }));

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
 * Clicking CSS course card navigates to first CSS lesson
 */
export const NavigateToCSSLesson: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click CSS Mastery card
    await userEvent.click(canvas.getByRole('button', { name: /CSS Mastery/i }));

    // Should show CSS lesson content
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('CSS Mastery');
      expect(canvasElement.textContent).toContain('Syntax');
    });
  },
};

/**
 * Settings modal opens from homepage
 */
export const OpenSettingsFromHomepage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Settings
    await userEvent.click(canvas.getByRole('button', { name: /Settings/i }));

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
    await userEvent.click(canvas.getByRole('button', { name: /React Fundamentals/i }));

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
    await userEvent.click(canvas.getByRole('button', { name: /React Fundamentals/i }));

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
 * Sidebar shows all modules for React section
 */
export const SidebarShowsReactModules: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Go to a lesson to see sidebar
    await userEvent.click(canvas.getByRole('button', { name: /React Fundamentals/i }));

    await waitFor(() => {
      // Should show React modules
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
    await userEvent.click(canvas.getByRole('button', { name: /React Fundamentals/i }));

    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Lesson 1.1');
    });

    // Click the section title/home button in sidebar (now shows "React Fundamentals")
    const homeButton = canvas.getByRole('button', { name: /React Fundamentals/i });
    await userEvent.click(homeButton);

    // Should return to homepage
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Learn by');
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
    await userEvent.click(canvas.getByRole('button', { name: /React Fundamentals/i }));

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
    await userEvent.click(canvas.getByRole('button', { name: /React Fundamentals/i }));

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

/**
 * Section switcher allows switching between React and CSS
 */
export const SectionSwitcher: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Go to React lesson first
    await userEvent.click(canvas.getByRole('button', { name: /React Fundamentals/i }));

    await waitFor(() => {
      expect(canvasElement.textContent).toContain('React Fundamentals');
    });

    // Find and click CSS tab in sidebar
    const cssTab = canvas.getByRole('button', { name: /^CSS$/i });
    await userEvent.click(cssTab);

    // Should show CSS modules
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('CSS Mastery');
    });
  },
};
