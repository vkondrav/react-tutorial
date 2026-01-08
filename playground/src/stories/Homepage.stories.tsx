import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor, fn } from 'storybook/test';
import Homepage from '../Homepage';
import { EditorType, type AppSettings } from '../settings';

const defaultSettings: AppSettings = {
  projectPath: '/Users/test/react-tutorial/',
  editor: EditorType.CURSOR,
};

const meta: Meta<typeof Homepage> = {
  title: 'Root/Homepage',
  component: Homepage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The landing page for the React Tutorial app. Explains what the course is, emphasizes running locally, and provides a course outline with lesson links.',
      },
    },
  },
  args: {
    onStartLearning: fn(),
    settings: defaultSettings,
    onSaveSettings: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows the complete homepage
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have hero section
    expect(canvasElement.textContent).toContain('Web Dev Tutorial');
    expect(canvasElement.textContent).toContain('Learn by');
    expect(canvasElement.textContent).toContain('Reading the Source');

    // Should have course selection cards
    expect(canvas.getByRole('button', { name: /React Fundamentals/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /CSS Mastery/i })).toBeInTheDocument();

    // Should have "The Point" section
    expect(canvasElement.textContent).toContain('THE POINT');
    expect(canvasElement.textContent).toContain("This isn't a read-only tutorial");
  },
};

/**
 * Verifies the hero section content
 */
export const HeroSection: Story = {
  play: async ({ canvasElement }) => {
    // Should emphasize local development
    expect(canvasElement.textContent).toContain('locally on your machine');
    expect(canvasElement.textContent).toContain('.tsx file');
    expect(canvasElement.textContent).toContain('src/lessons/');

    // Should have View Source button with link
    const viewSourceButtons = canvasElement.querySelectorAll('a[href*="cursor://"]');
    expect(viewSourceButtons.length).toBeGreaterThan(0);
  },
};

/**
 * Tests the "How it works" section
 */
export const HowItWorksSection: Story = {
  play: async ({ canvasElement }) => {
    // Should have 3 steps
    expect(canvasElement.textContent).toContain('Clone & Run');
    expect(canvasElement.textContent).toContain('Learn Interactively');
    expect(canvasElement.textContent).toContain('Modify & Experiment');

    // Should show terminal commands
    expect(canvasElement.textContent).toContain('git clone');
    expect(canvasElement.textContent).toContain('npm i');
    expect(canvasElement.textContent).toContain('npm run dev');

    // Should mention lesson count (40+ now with CSS)
    expect(canvasElement.textContent).toContain('40+');
  },
};

/**
 * Tests the "Why run locally" section
 */
export const WhyLocalSection: Story = {
  play: async ({ canvasElement }) => {
    // Should have heading
    expect(canvasElement.textContent).toContain("You can't learn to code by");
    expect(canvasElement.textContent).toContain('just reading');

    // Should list benefits
    expect(canvasElement.textContent).toContain('Full IDE experience');
    expect(canvasElement.textContent).toContain('Hot Module Replacement');
    expect(canvasElement.textContent).toContain('Real project structure');
    expect(canvasElement.textContent).toContain('Break things safely');

    // Should have code mockup
    expect(canvasElement.textContent).toContain('CounterDemo.tsx');
    expect(canvasElement.textContent).toContain('useState');
    expect(canvasElement.textContent).toContain('setCount');
  },
};

/**
 * Verifies the React course outline section displays all modules
 */
export const ReactCourseOutline: Story = {
  play: async ({ canvasElement }) => {
    // Should have React course section
    expect(canvasElement.textContent).toContain('React Course');
    expect(canvasElement.textContent).toContain('34 Lessons Across 8 Modules');

    // Should have all 8 React modules
    expect(canvasElement.textContent).toContain('Foundation');
    expect(canvasElement.textContent).toContain('Core Concepts');
    expect(canvasElement.textContent).toContain('Hooks Deep Dive');
    expect(canvasElement.textContent).toContain('Data Fetching');
    expect(canvasElement.textContent).toContain('Forms & User Input');
    expect(canvasElement.textContent).toContain('Component Patterns');
    expect(canvasElement.textContent).toContain('State Management');
    expect(canvasElement.textContent).toContain('Advanced Topics');
  },
};

/**
 * Verifies the CSS course outline section displays all modules
 */
export const CSSCourseOutline: Story = {
  play: async ({ canvasElement }) => {
    // Should have CSS course section
    expect(canvasElement.textContent).toContain('CSS Course');
    expect(canvasElement.textContent).toContain('12 Lessons Across 4 Modules');

    // Should have CSS modules
    expect(canvasElement.textContent).toContain('Core Foundations');
    expect(canvasElement.textContent).toContain('Layout Mastery');
    expect(canvasElement.textContent).toContain('Visuals & Interactivity');
    expect(canvasElement.textContent).toContain('Architecture at Scale');

    // Should have CSS lessons
    expect(canvasElement.textContent).toContain('Flexbox');
    expect(canvasElement.textContent).toContain('CSS Grid');
    expect(canvasElement.textContent).toContain('Accessibility');
  },
};

/**
 * Verifies lesson titles and descriptions are shown
 */
export const CourseOutlineLessons: Story = {
  play: async ({ canvasElement }) => {
    // Module 1 lessons
    expect(canvasElement.textContent).toContain('What is React?');
    expect(canvasElement.textContent).toContain('Setting Up Your First React App');
    expect(canvasElement.textContent).toContain('Understanding JSX');
    expect(canvasElement.textContent).toContain('Components');

    // Sample lesson descriptions
    expect(canvasElement.textContent).toContain('Discover why React powers modern web apps');
    expect(canvasElement.textContent).toContain('Scaffold a React project with Vite');

    // Module 3 lessons (hooks)
    expect(canvasElement.textContent).toContain('useEffect');
    expect(canvasElement.textContent).toContain('useContext');
    expect(canvasElement.textContent).toContain('Custom Hooks');

    // Module 8 lessons (advanced)
    expect(canvasElement.textContent).toContain('Server-Side Rendering');
    expect(canvasElement.textContent).toContain('Testing Strategies');
    expect(canvasElement.textContent).toContain('TanStack Query');
  },
};

/**
 * Verifies lesson links navigate correctly
 */
export const LessonLinksExist: Story = {
  play: async ({ canvasElement }) => {
    // Should have lesson links with hash navigation
    const lessonLinks = canvasElement.querySelectorAll('a[href^="#"]');
    expect(lessonLinks.length).toBeGreaterThanOrEqual(40); // 34 React + 12 CSS lessons

    // Check specific React lesson links exist (now with react- prefix)
    const link11 = canvasElement.querySelector('a[href="#react-1.1"]');
    const link25 = canvasElement.querySelector('a[href="#react-2.5"]');
    const link35 = canvasElement.querySelector('a[href="#react-3.5"]');
    const link84 = canvasElement.querySelector('a[href="#react-8.4"]');

    expect(link11).toBeInTheDocument();
    expect(link25).toBeInTheDocument();
    expect(link35).toBeInTheDocument();
    expect(link84).toBeInTheDocument();

    // Check CSS lesson links exist
    const cssLink11 = canvasElement.querySelector('a[href="#css-1.1"]');
    const cssLink22 = canvasElement.querySelector('a[href="#css-2.2"]');
    expect(cssLink11).toBeInTheDocument();
    expect(cssLink22).toBeInTheDocument();
  },
};

/**
 * Tests clicking a course card calls the callback
 */
export const CourseCardNavigation: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Find and click the React Fundamentals card
    const reactCard = canvas.getByRole('button', { name: /React Fundamentals/i });
    expect(reactCard).toBeInTheDocument();

    await userEvent.click(reactCard);

    // Should have called onStartLearning with 'react'
    expect(args.onStartLearning).toHaveBeenCalledWith('react');
  },
};

/**
 * Tests clicking CSS course card calls callback with 'css'
 */
export const CSSCourseCardNavigation: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Find and click the CSS Mastery card
    const cssCard = canvas.getByRole('button', { name: /CSS Mastery/i });
    expect(cssCard).toBeInTheDocument();

    await userEvent.click(cssCard);

    // Should have called onStartLearning with 'css'
    expect(args.onStartLearning).toHaveBeenCalledWith('css');
  },
};

/**
 * Verifies GitHub links are correct
 */
export const GitHubLinks: Story = {
  play: async ({ canvasElement }) => {
    // Should have GitHub links
    const githubLinks = canvasElement.querySelectorAll(
      'a[href="https://github.com/vkondrav/react-tutorial"]'
    );
    expect(githubLinks.length).toBeGreaterThanOrEqual(2);

    // All should open in new tab
    githubLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  },
};

/**
 * Verifies the "Viewing Online" banner
 */
export const ViewingOnlineBanner: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain('Viewing this online?');
    expect(canvasElement.textContent).toContain("You're missing the best part!");
    expect(canvasElement.textContent).toContain('Clone the repo and run locally');
  },
};

/**
 * Verifies the footer content
 */
export const Footer: Story = {
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toContain(
      'Built with React, TypeScript, Tailwind CSS, and daisyUI'
    );
    expect(canvasElement.textContent).toContain('GitHub');
    expect(canvasElement.textContent).toContain('Add Your Own Lessons');
  },
};

/**
 * Tests accessibility - all interactive elements are reachable
 */
export const AccessibilityCheck: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have accessible buttons
    const buttons = canvas.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);

    // Should have accessible links
    const links = canvas.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);

    // View Source should have tooltip (shows editor name)
    const viewSourceLink = canvasElement.querySelector('a[data-tip^="View Source"]');
    expect(viewSourceLink).toBeInTheDocument();
  },
};

/**
 * Tests the Settings button in hero section
 */
export const SettingsButtonInHero: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have the Settings button
    const settingsButton = canvas.getByRole('button', { name: /Settings/i });
    expect(settingsButton).toBeInTheDocument();

    // Button should be styled correctly (btn-primary, btn-lg)
    expect(settingsButton.className).toContain('btn-primary');
    expect(settingsButton.className).toContain('btn-lg');
  },
};

/**
 * Tests that clicking Settings opens the modal
 */
export const SettingsButtonOpensModal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the Settings button
    const settingsButton = canvas.getByRole('button', { name: /Settings/i });
    await userEvent.click(settingsButton);

    // Modal should open
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('View Source opens in');
      expect(canvas.getByRole('button', { name: /Cursor/i })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: /VS Code/i })).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: /GitHub/i })).toBeInTheDocument();
    });
  },
};

/**
 * Tests saving settings from homepage
 */
export const SaveSettingsFromHomepage: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Open settings modal
    await userEvent.click(canvas.getByRole('button', { name: /Settings/i }));

    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /VS Code/i })).toBeInTheDocument();
    });

    // Switch to VS Code
    await userEvent.click(canvas.getByRole('button', { name: /VS Code/i }));

    // Save
    await userEvent.click(canvas.getByRole('button', { name: /Save Settings/i }));

    // Should have called onSaveSettings
    await waitFor(() => {
      expect(args.onSaveSettings).toHaveBeenCalled();
    });
  },
};

/**
 * Tests the hero CTA buttons are present
 */
export const HeroCtaButtons: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have course selection cards
    expect(canvas.getByRole('button', { name: /React Fundamentals/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /CSS Mastery/i })).toBeInTheDocument();

    // Should have Settings button
    expect(canvas.getByRole('button', { name: /Settings/i })).toBeInTheDocument();

    // Should have Storybook link (check by href since accessible name includes icon)
    const storybookLink = canvasElement.querySelector('a[href*="6006"]');
    expect(storybookLink).toBeInTheDocument();
    expect(storybookLink?.textContent).toContain('Storybook');

    // Should have GitHub link
    const githubLink = canvasElement.querySelector('a[href*="github.com"]');
    expect(githubLink).toBeInTheDocument();
  },
};

/**
 * Tests incomplete CSS lessons show "Coming Soon" badge
 */
export const CSSLessonsComingSoon: Story = {
  play: async ({ canvasElement }) => {
    // CSS lessons should have "Coming Soon" badges (7 incomplete)
    // Plus 1 "Under Development" badge on the course card = 8 total warning badges
    const comingSoonBadges = canvasElement.querySelectorAll('.badge-warning');
    expect(comingSoonBadges.length).toBeGreaterThanOrEqual(7);
  },
};

/**
 * Tests course cards display correct lesson and module counts
 */
export const CourseCardCounts: Story = {
  play: async ({ canvasElement }) => {
    // React card should show 34 lessons, 8 modules
    expect(canvasElement.textContent).toContain('34 lessons');
    expect(canvasElement.textContent).toContain('8 modules');

    // CSS card should show 12 lessons, 4 modules
    expect(canvasElement.textContent).toContain('12 lessons');
    expect(canvasElement.textContent).toContain('4 modules');
  },
};

/**
 * Tests both course sections have their icons
 */
export const CourseIcons: Story = {
  play: async ({ canvasElement }) => {
    // Should have React icon (DiReact)
    const reactIcons = canvasElement.querySelectorAll('svg');
    expect(reactIcons.length).toBeGreaterThan(0);

    // Course cards should have their themed colors
    const reactCard = canvasElement.querySelector('button[style*="rgb(97, 218, 251)"]');
    const cssCard = canvasElement.querySelector('button[style*="rgb(38, 77, 228)"]');
    expect(reactCard).toBeInTheDocument();
    expect(cssCard).toBeInTheDocument();
  },
};

/**
 * Tests CSS lesson descriptions are present
 */
export const CSSLessonDescriptions: Story = {
  play: async ({ canvasElement }) => {
    // CSS lesson descriptions should be shown
    expect(canvasElement.textContent).toContain('CSS matches nodes in the DOM');
    expect(canvasElement.textContent).toContain('specificity calculation');
    expect(canvasElement.textContent).toContain('flex properties');
    expect(canvasElement.textContent).toContain('grid areas');
    expect(canvasElement.textContent).toContain('focus management');
  },
};

/**
 * Tests section headers have correct styling
 */
export const SectionHeaders: Story = {
  play: async ({ canvasElement }) => {
    // React section should have React icon badge
    expect(canvasElement.textContent).toContain('React Course');

    // CSS section should have CSS icon badge
    expect(canvasElement.textContent).toContain('CSS Course');

    // Both sections should have lesson counts in headers
    expect(canvasElement.textContent).toContain('34 Lessons Across 8 Modules');
    expect(canvasElement.textContent).toContain('12 Lessons Across 4 Modules');
  },
};
