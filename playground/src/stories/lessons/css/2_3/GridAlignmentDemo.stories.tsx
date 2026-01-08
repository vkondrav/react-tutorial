import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import GridAlignmentDemo from '../../../../lessons/css/2_3/GridAlignmentDemo';

const meta: Meta<typeof GridAlignmentDemo> = {
  title: 'Lessons/CSS/2.3 CSS Grid/GridAlignmentDemo',
  component: GridAlignmentDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof GridAlignmentDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check level buttons are present
    await expect(canvas.getByRole('button', { name: 'Items (within cells)' })).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Content (grid position)' })
    ).toBeInTheDocument();
  },
};

export const ItemsAlignment: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Items level
    const itemsBtn = canvas.getByRole('button', { name: 'Items (within cells)' });
    await user.click(itemsBtn);

    await waitFor(() => {
      expect(itemsBtn).toHaveClass('btn-primary');
    });

    // Check correct labels are shown
    await expect(canvas.getByText('justify-items (horizontal)')).toBeInTheDocument();
    await expect(canvas.getByText('align-items (vertical)')).toBeInTheDocument();

    // Check explanation
    await expect(canvas.getByText('Items Alignment')).toBeInTheDocument();
  },
};

export const ContentAlignment: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Content level
    const contentBtn = canvas.getByRole('button', { name: 'Content (grid position)' });
    await user.click(contentBtn);

    await waitFor(() => {
      expect(contentBtn).toHaveClass('btn-warning');
    });

    // Check correct labels are shown
    await expect(canvas.getByText('justify-content (horizontal)')).toBeInTheDocument();
    await expect(canvas.getByText('align-content (vertical)')).toBeInTheDocument();

    // Check explanation
    await expect(canvas.getByText('Content Alignment')).toBeInTheDocument();
  },
};

export const AlignmentOptions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check all alignment options are present
    const startBtns = canvas.getAllByRole('button', { name: 'start' });
    const centerBtns = canvas.getAllByRole('button', { name: 'center' });
    const endBtns = canvas.getAllByRole('button', { name: 'end' });
    const stretchBtns = canvas.getAllByRole('button', { name: 'stretch' });

    await expect(startBtns.length).toBeGreaterThanOrEqual(2);
    await expect(centerBtns.length).toBeGreaterThanOrEqual(2);
    await expect(endBtns.length).toBeGreaterThanOrEqual(2);
    await expect(stretchBtns.length).toBeGreaterThanOrEqual(2);
  },
};

export const ChangeJustifyItems: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Ensure we're on items level
    const itemsBtn = canvas.getByRole('button', { name: 'Items (within cells)' });
    await user.click(itemsBtn);

    // Click center for justify
    const centerBtns = canvas.getAllByRole('button', { name: 'center' });
    await user.click(centerBtns[0]);

    await waitFor(() => {
      expect(centerBtns[0]).toHaveClass('btn-success');
    });
  },
};

export const ChangeAlignItems: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Ensure we're on items level
    const itemsBtn = canvas.getByRole('button', { name: 'Items (within cells)' });
    await user.click(itemsBtn);

    // Click end for align
    const endBtns = canvas.getAllByRole('button', { name: 'end' });
    await user.click(endBtns[1]);

    await waitFor(() => {
      expect(endBtns[1]).toHaveClass('btn-warning');
    });
  },
};

export const GeneratedCSSPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check generated CSS section
    await expect(canvas.getByText('Current CSS')).toBeInTheDocument();
  },
};

export const PatternReminder: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check pattern reminder
    await expect(canvas.getByText('Remember the Pattern')).toBeInTheDocument();

    // Check pattern content
    const listItems = canvasElement.querySelectorAll('li');
    const listContent = Array.from(listItems)
      .map((el) => el.textContent)
      .join(' ');
    expect(listContent).toContain('justify');
    expect(listContent).toContain('align');
    expect(listContent).toContain('horizontal');
    expect(listContent).toContain('vertical');
  },
};
