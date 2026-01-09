import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import VariableScopeDemo from '@lessons/css/4_1/VariableScopeDemo';

const meta: Meta<typeof VariableScopeDemo> = {
  title: 'Lessons/css-4.1/VariableScopeDemo',
  component: VariableScopeDemo,
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

type Story = StoryObj<typeof VariableScopeDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check initial state (Global Scope) - use button role for unique match
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Global Scope (:root)' })).toBeInTheDocument();
    });
    expect(
      canvas.getByText('Variables on :root are available to ALL elements in the document.')
    ).toBeInTheDocument();
  },
};

export const ScopeTypeSwitch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Local Scope
    const localButton = canvas.getByRole('button', { name: 'Local Scope' });
    await userEvent.click(localButton);

    await waitFor(() => {
      expect(
        canvas.getByText(
          'Variables on a selector are only available to that element and its children.'
        )
      ).toBeInTheDocument();
    });

    // Click on Override
    const overrideButton = canvas.getByRole('button', { name: 'Override in Child' });
    await userEvent.click(overrideButton);

    await waitFor(() => {
      expect(
        canvas.getByText(
          'Child elements can redefine variables without affecting parents or siblings.'
        )
      ).toBeInTheDocument();
    });

    // Click on Fallback
    const fallbackButton = canvas.getByRole('button', { name: 'Fallback Values' });
    await userEvent.click(fallbackButton);

    await waitFor(() => {
      expect(
        canvas.getByText('var(--name, fallback) uses the fallback if the variable is undefined.')
      ).toBeInTheDocument();
    });
  },
};

export const OverrideToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Navigate to Override scope
    const overrideButton = canvas.getByRole('button', { name: 'Override in Child' });
    await userEvent.click(overrideButton);

    // Find and click the checkbox
    await waitFor(() => {
      expect(canvas.getByText('Override --demo-primary in card')).toBeInTheDocument();
    });

    const checkbox = canvas.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Text should update
    await waitFor(() => {
      expect(canvas.getByText('Overrides --demo-primary to green')).toBeInTheDocument();
    });
  },
};

export const CodeSnippetPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that code snippet is displayed
    await waitFor(() => {
      expect(canvas.getByText('Variable Scope')).toBeInTheDocument();
    });

    // Check for CSS content
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/--color-primary/);
    expect(pageText).toMatch(/:root/);
  },
};
