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
    expect(canvasElement.textContent).toContain('React Tutorial');
    expect(canvasElement.textContent).toContain('Learn React by');
    expect(canvasElement.textContent).toContain('Reading the Source');

    // Should have CTA buttons
    expect(canvas.getByRole('button', { name: /Start Learning/i })).toBeInTheDocument();
    expect(canvas.getByRole('link', { name: /View on GitHub/i })).toBeInTheDocument();

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

    // Should mention lesson count
    expect(canvasElement.textContent).toContain('30+');
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
 * Verifies the course outline section displays all modules
 */
export const CourseOutlineModules: Story = {
  play: async ({ canvasElement }) => {
    // Should have section header
    expect(canvasElement.textContent).toContain('Course Outline');
    expect(canvasElement.textContent).toContain('Lessons Across 8 Modules');

    // Should have all 8 modules
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
    expect(lessonLinks.length).toBeGreaterThanOrEqual(30); // 34 lessons in the course

    // Check specific lesson links exist
    const link11 = canvasElement.querySelector('a[href="#1.1"]');
    const link25 = canvasElement.querySelector('a[href="#2.5"]');
    const link35 = canvasElement.querySelector('a[href="#3.5"]');
    const link84 = canvasElement.querySelector('a[href="#8.4"]');

    expect(link11).toBeInTheDocument();
    expect(link25).toBeInTheDocument();
    expect(link35).toBeInTheDocument();
    expect(link84).toBeInTheDocument();
  },
};

/**
 * Tests the Start Learning button calls the callback
 */
export const StartLearningButton: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Find and click the Start Learning button
    const startButton = canvas.getByRole('button', { name: /Start Learning/i });
    expect(startButton).toBeInTheDocument();

    await userEvent.click(startButton);

    // Should have called onStartLearning
    expect(args.onStartLearning).toHaveBeenCalledTimes(1);
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
 * Tests the Adjust Settings button in hero section
 */
export const SettingsButtonInHero: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have the Adjust Settings button
    const settingsButton = canvas.getByRole('button', { name: /Adjust Settings/i });
    expect(settingsButton).toBeInTheDocument();

    // Button should be styled correctly (btn-secondary, btn-lg)
    expect(settingsButton.className).toContain('btn-secondary');
    expect(settingsButton.className).toContain('btn-lg');
  },
};

/**
 * Tests that clicking Adjust Settings opens the modal
 */
export const SettingsButtonOpensModal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the Adjust Settings button
    const settingsButton = canvas.getByRole('button', { name: /Adjust Settings/i });
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
    await userEvent.click(canvas.getByRole('button', { name: /Adjust Settings/i }));

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
 * Tests all three CTA buttons are present in hero
 */
export const HeroCtaButtons: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have Start Learning button
    expect(canvas.getByRole('button', { name: /Start Learning/i })).toBeInTheDocument();

    // Should have Adjust Settings button
    expect(canvas.getByRole('button', { name: /Adjust Settings/i })).toBeInTheDocument();

    // Should have View on GitHub link
    expect(canvas.getByRole('link', { name: /View on GitHub/i })).toBeInTheDocument();
  },
};
