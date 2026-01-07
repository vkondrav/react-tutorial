import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import PropsPlayground from '@lessons/react/2_1/PropsPlayground';

const meta: Meta<typeof PropsPlayground> = {
  title: 'Lessons/react-2.1/PropsPlayground',
  component: PropsPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive playground for experimenting with all types of props: strings, enums, booleans, arrays.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with React Developer profile
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show default values
    expect(canvas.getByDisplayValue('React Developer')).toBeInTheDocument();
    expect(canvas.getByDisplayValue('Frontend Engineer')).toBeInTheDocument();

    // Should show in the profile card
    expect(canvas.getByRole('heading', { name: 'React Developer' })).toBeInTheDocument();
    expect(canvas.getByText('Frontend Engineer')).toBeInTheDocument();

    // Should show default skills (multiple instances due to badge and JSON)
    const reactElements = canvas.getAllByText('React');
    expect(reactElements.length).toBeGreaterThan(0);

    const typescriptElements = canvas.getAllByText('TypeScript');
    expect(typescriptElements.length).toBeGreaterThan(0);

    const nodeElements = canvas.getAllByText('Node.js');
    expect(nodeElements.length).toBeGreaterThan(0);

    // Should show Senior badge (multiple instances - button and badge)
    const seniorElements = canvas.getAllByText('Senior');
    expect(seniorElements.length).toBeGreaterThan(0);

    // Should be online by default
    const checkbox = canvas.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  },
};

/**
 * Tests changing the name
 */
export const ChangeName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find name input (first text input)
    const nameInput = canvas.getByDisplayValue('React Developer');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Jane Doe');

    // Should update in preview
    expect(canvas.getByRole('heading', { name: 'Jane Doe' })).toBeInTheDocument();
  },
};

/**
 * Tests changing the role
 */
export const ChangeRole: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find role input (second text input)
    const roleInput = canvas.getByDisplayValue('Frontend Engineer');
    await userEvent.clear(roleInput);
    await userEvent.type(roleInput, 'Backend Engineer');

    // Should update in preview
    expect(canvas.getByText('Backend Engineer')).toBeInTheDocument();
  },
};

/**
 * Tests changing the level
 */
export const ChangeLevel: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Junior button
    const juniorButton = canvas.getByRole('button', { name: 'Junior' });
    await userEvent.click(juniorButton);

    // Should show Junior badge
    const juniorBadges = canvas.getAllByText('Junior');
    expect(juniorBadges.length).toBeGreaterThan(1); // In button and in badge

    // Click Lead button
    const leadButton = canvas.getByRole('button', { name: 'Lead' });
    await userEvent.click(leadButton);

    // Should show Lead badge
    const leadBadges = canvas.getAllByText('Lead');
    expect(leadBadges.length).toBeGreaterThan(1);
  },
};

/**
 * Tests toggling isOnline checkbox
 */
export const ToggleOnline: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Toggle offline
    const checkbox = canvas.getByRole('checkbox');
    await userEvent.click(checkbox);

    // Should be unchecked
    expect(checkbox).not.toBeChecked();

    // Toggle back online
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  },
};

/**
 * Tests adding a new skill
 */
export const AddSkill: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the skill input (should be empty with placeholder)
    const skillInput = canvas.getByPlaceholderText('Add skill...');

    // Type a new skill
    await userEvent.type(skillInput, 'GraphQL');

    // Click Add button
    const addButton = canvas.getByRole('button', { name: 'Add' });
    await userEvent.click(addButton);

    // Should show the new skill
    await waitFor(() => {
      const graphQLSkills = canvas.getAllByText('GraphQL');
      expect(graphQLSkills.length).toBeGreaterThan(0);
    });

    // Input should be cleared
    expect(skillInput).toHaveValue('');
  },
};

/**
 * Tests adding skill with Enter key
 */
export const AddSkillWithEnter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const skillInput = canvas.getByPlaceholderText('Add skill...');
    await userEvent.type(skillInput, 'Docker{Enter}');

    // Should show the new skill
    await waitFor(() => {
      const dockerSkills = canvas.getAllByText('Docker');
      expect(dockerSkills.length).toBeGreaterThan(0);
    });
  },
};

/**
 * Tests removing a skill
 */
export const RemoveSkill: Story = {
  play: async ({ canvasElement }) => {
    // Count initial skills in the editor section
    const editorSection = canvasElement.querySelector('.p-6.border-r');
    const initialBadges = editorSection?.querySelectorAll('.badge');
    const initialCount = initialBadges?.length || 0;

    // Find and click first remove button
    const removeButtons = editorSection?.querySelectorAll('button');
    const firstRemoveButton = Array.from(removeButtons || []).find(
      (btn) => btn.querySelector('svg') // Find button with X icon
    );

    expect(firstRemoveButton).toBeTruthy();
    await userEvent.click(firstRemoveButton!);

    // Should have one fewer badge
    await waitFor(() => {
      const remainingBadges = editorSection?.querySelectorAll('.badge');
      expect(remainingBadges?.length).toBe(initialCount - 1);
    });
  },
};

/**
 * Tests the JSON props object display
 */
export const ShowsPropsObject: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show PROPS OBJECT section
    expect(canvas.getByText('PROPS OBJECT')).toBeInTheDocument();

    // Should contain JSON with props (text is split by syntax highlighting)
    const bodyText = canvasElement.textContent || '';
    expect(bodyText).toContain('"name"');
    expect(bodyText).toContain('"role"');
    expect(bodyText).toContain('"level"');
    expect(bodyText).toContain('"isOnline"');
    expect(bodyText).toContain('"skills"');
  },
};

/**
 * Tests adding multiple skills
 */
export const AddMultipleSkills: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const skillInput = canvas.getByPlaceholderText('Add skill...');
    const addButton = canvas.getByRole('button', { name: 'Add' });

    // Add first skill
    await userEvent.type(skillInput, 'Python');
    await userEvent.click(addButton);

    // Add second skill
    await userEvent.type(skillInput, 'Rust');
    await userEvent.click(addButton);

    // Add third skill
    await userEvent.type(skillInput, 'Go');
    await userEvent.click(addButton);

    // All should be visible
    await waitFor(() => {
      expect(canvas.getAllByText('Python').length).toBeGreaterThan(0);
      expect(canvas.getAllByText('Rust').length).toBeGreaterThan(0);
      expect(canvas.getAllByText('Go').length).toBeGreaterThan(0);
    });
  },
};

/**
 * Tests that duplicate skills are prevented
 */
export const PreventsDuplicates: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const skillInput = canvas.getByPlaceholderText('Add skill...');
    const addButton = canvas.getByRole('button', { name: 'Add' });

    // Try to add React (which already exists)
    await userEvent.type(skillInput, 'React');
    await userEvent.click(addButton);

    // Should still only have React appearing a few times (original + JSON)
    const reactElements = canvas.getAllByText('React');
    // Exact count may vary, but should not double
    expect(reactElements.length).toBeLessThan(5);
  },
};
