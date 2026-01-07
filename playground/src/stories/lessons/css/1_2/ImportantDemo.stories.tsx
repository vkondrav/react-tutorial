import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import ImportantDemo from '@lessons/css/1_2/ImportantDemo';

const meta: Meta<typeof ImportantDemo> = {
  title: 'Lessons/css-1.2/ImportantDemo',
  component: ImportantDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An interactive demo showing how !important affects the cascade, including scenarios where !important declarations compete.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing the Basic Override scenario.
 */
export const Default: Story = {};

/**
 * Tests the Basic Override scenario.
 */
export const BasicOverride: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the Basic Override tab (should be default, but click to be sure)
    const basicTab = canvas.getByRole('button', { name: /Basic Override/i });
    await userEvent.click(basicTab);

    // Should show the explanation
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('!important always wins');
    });

    // Should show WINS badge
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('WINS');
    });
  },
};

/**
 * Tests the Specificity vs !important scenario.
 */
export const SpecificityScenario: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the Specificity scenario tab
    const specTab = canvas.getByRole('button', { name: /!important vs High Specificity/i });
    await userEvent.click(specTab);

    // Should show the explanation about specificity losing
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('highest specificity');
      expect(canvasElement.textContent).toContain('loses');
    });
  },
};

/**
 * Tests the !important vs !important scenario.
 */
export const ImportantWar: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the Important War tab
    const warTab = canvas.getByRole('button', { name: /!important vs !important/i });
    await userEvent.click(warTab);

    // Should explain that specificity applies again
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('normal specificity rules apply');
    });
  },
};

/**
 * Tests the User !important scenario (accessibility).
 */
export const UserImportantWins: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the User Wins tab
    const userTab = canvas.getByRole('button', { name: /User !important/i });
    await userEvent.click(userTab);

    // Should explain user !important beats author !important
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('User !important beats Author !important');
    });

    // Should show the User comment in the winning rule
    await waitFor(() => {
      const winsSection = canvasElement.querySelector('.ring-success');
      expect(winsSection?.textContent).toContain('User');
    });
  },
};

/**
 * Verifies the priority order visualization is correct.
 */
export const PriorityVisualization: Story = {
  play: async ({ canvasElement }) => {
    // Should show the complete priority order
    expect(canvasElement.textContent).toContain('User !important');
    expect(canvasElement.textContent).toContain('Author !important');
    expect(canvasElement.textContent).toContain('Author normal');
    expect(canvasElement.textContent).toContain('User normal');
    expect(canvasElement.textContent).toContain('User Agent');
  },
};

/**
 * Verifies the acceptable uses list is shown.
 */
export const AcceptableUses: Story = {
  play: async ({ canvasElement }) => {
    // Should show acceptable uses
    expect(canvasElement.textContent).toContain('Acceptable Uses');
    expect(canvasElement.textContent).toContain('Utility classes');
    expect(canvasElement.textContent).toContain('third-party library');
  },
};

/**
 * Verifies the code smells list is shown.
 */
export const CodeSmells: Story = {
  play: async ({ canvasElement }) => {
    // Should show code smells / bad uses
    expect(canvasElement.textContent).toContain('Code Smells');
    expect(canvasElement.textContent).toContain('Fixing specificity issues');
    expect(canvasElement.textContent).toContain('refactor');
  },
};

/**
 * Verifies the warning about specificity wars is shown.
 */
export const SpecificityWarsWarning: Story = {
  play: async ({ canvasElement }) => {
    // Should show the warning
    expect(canvasElement.textContent).toContain('Specificity Wars Problem');
    expect(canvasElement.textContent).toContain('unmaintainable');
  },
};
