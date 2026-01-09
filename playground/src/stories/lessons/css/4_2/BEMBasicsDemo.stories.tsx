import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import BEMBasicsDemo from '@lessons/css/4_2/BEMBasicsDemo';

const meta: Meta<typeof BEMBasicsDemo> = {
  title: 'Lessons/css-4.2/BEMBasicsDemo',
  component: BEMBasicsDemo,
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

type Story = StoryObj<typeof BEMBasicsDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check initial state (Block selected)
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Block' })).toBeInTheDocument();
    });
    expect(canvas.getAllByText('.card').length).toBeGreaterThan(0);
    expect(
      canvas.getByText(
        'A standalone component that is meaningful on its own. The top-level abstraction.'
      )
    ).toBeInTheDocument();
  },
};

export const BEMPartSwitch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on Element
    const elementButton = canvas.getByRole('button', { name: 'Element' });
    await userEvent.click(elementButton);

    await waitFor(() => {
      expect(canvas.getAllByText('.card__title').length).toBeGreaterThan(0);
    });
    expect(
      canvas.getByText(
        'A part of a block that has no meaning on its own. Always tied to its block.'
      )
    ).toBeInTheDocument();

    // Click on Modifier
    const modifierButton = canvas.getByRole('button', { name: 'Modifier' });
    await userEvent.click(modifierButton);

    await waitFor(() => {
      expect(canvas.getAllByText('.card--featured').length).toBeGreaterThan(0);
    });
    expect(
      canvas.getByText(
        'A variation or state of a block or element. Changes appearance or behavior.'
      )
    ).toBeInTheDocument();
  },
};

export const ModifierToggles: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find modifier checkboxes
    await waitFor(() => {
      expect(canvas.getByText('.card--featured')).toBeInTheDocument();
    });

    const checkboxes = canvas.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(2);

    // Toggle featured
    await userEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();

    // Toggle compact
    await userEvent.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();

    // Both modifier classes should appear
    const classNamesSection = canvas.getByText('Class Names Used').closest('div');
    expect(classNamesSection?.textContent).toContain('.card--featured');
    expect(classNamesSection?.textContent).toContain('.card--compact');
  },
};

export const ShowCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click show code button
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Show CSS Code' })).toBeInTheDocument();
    });
    const showCodeButton = canvas.getByRole('button', { name: 'Show CSS Code' });
    await userEvent.click(showCodeButton);

    // Check that code is displayed - look for the title in the CodeSnippet
    await waitFor(() => {
      const pageText = canvasElement.textContent || '';
      expect(pageText).toMatch(/BEM Naming Convention/);
    });

    // Check for CSS content
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/\.card__header/);

    // Hide code
    const hideCodeButton = canvas.getByRole('button', { name: 'Hide CSS Code' });
    await userEvent.click(hideCodeButton);
  },
};
