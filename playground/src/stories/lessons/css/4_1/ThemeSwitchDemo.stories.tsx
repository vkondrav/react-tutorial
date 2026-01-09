import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import ThemeSwitchDemo from '@lessons/css/4_1/ThemeSwitchDemo';

const meta: Meta<typeof ThemeSwitchDemo> = {
  title: 'Lessons/css-4.1/ThemeSwitchDemo',
  component: ThemeSwitchDemo,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ThemeSwitchDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check initial light theme state
    await waitFor(() => {
      expect(canvas.getByText('Live Theme Preview')).toBeInTheDocument();
    });
    expect(canvas.getByRole('button', { name: /Switch to Dark/i })).toBeInTheDocument();
  },
};

export const ThemeToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initial state is light theme
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Switch to Dark/i })).toBeInTheDocument();
    });

    // Check light theme CSS is displayed
    let pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/Current Theme: light/);
    expect(pageText).toMatch(/--bg-primary: #ffffff/);

    // Click to switch to dark
    const toggleButton = canvas.getByRole('button', { name: /Switch to Dark/i });
    await userEvent.click(toggleButton);

    // Should now show dark theme
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Switch to Light/i })).toBeInTheDocument();
    });

    // Check dark theme CSS is displayed
    pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/Current Theme: dark/);
    expect(pageText).toMatch(/--bg-primary: #0f172a/);
  },
};

export const PreviewContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check preview UI elements are present
    await waitFor(() => {
      expect(canvas.getByText('My App')).toBeInTheDocument();
    });
    expect(canvas.getByText('Welcome to the Dashboard')).toBeInTheDocument();
    expect(canvas.getByText('Analytics')).toBeInTheDocument();
    expect(canvas.getByText('Reports')).toBeInTheDocument();
    expect(canvas.getByText('Get Started')).toBeInTheDocument();
  },
};

export const VariableDisplay: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check variable names are displayed
    await waitFor(() => {
      expect(canvas.getByText('Current Variable Values')).toBeInTheDocument();
    });

    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/--bg-primary/);
    expect(pageText).toMatch(/--text-primary/);
    expect(pageText).toMatch(/--accent/);
  },
};

export const CodeSnippetPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that code snippet is displayed
    await waitFor(() => {
      expect(canvas.getByText('Theme Switching Pattern')).toBeInTheDocument();
    });

    // Check for theming CSS content
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/\[data-theme='dark'\]/);
  },
};
