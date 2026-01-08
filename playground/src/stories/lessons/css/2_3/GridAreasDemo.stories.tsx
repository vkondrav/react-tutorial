import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import GridAreasDemo from '@lessons/css/2_3/GridAreasDemo';

const meta: Meta<typeof GridAreasDemo> = {
  title: 'Lessons/CSS/2.3 CSS Grid/GridAreasDemo',
  component: GridAreasDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof GridAreasDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check layout buttons are present
    await expect(canvas.getByRole('button', { name: 'Holy Grail' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Magazine' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Custom' })).toBeInTheDocument();
  },
};

export const HolyGrailLayout: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Holy Grail
    const holyGrailBtn = canvas.getByRole('button', { name: 'Holy Grail' });
    await user.click(holyGrailBtn);

    await waitFor(() => {
      expect(holyGrailBtn).toHaveClass('btn-primary');
    });

    // Check description is in alert
    const alert = canvasElement.querySelector('.alert');
    expect(alert?.textContent).toContain('Holy Grail');

    // Check areas are rendered in the grid
    const gridAreas = canvasElement.querySelectorAll('[style*="grid-area"]');
    expect(gridAreas.length).toBe(4); // header, sidebar, main, footer
  },
};

export const DashboardLayout: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Dashboard
    const dashboardBtn = canvas.getByRole('button', { name: 'Dashboard' });
    await user.click(dashboardBtn);

    await waitFor(() => {
      expect(dashboardBtn).toHaveClass('btn-primary');
    });

    // Check description is in alert
    const alert = canvasElement.querySelector('.alert');
    expect(alert?.textContent).toContain('Dashboard');

    // Check areas are rendered in the grid
    const gridAreas = canvasElement.querySelectorAll('[style*="grid-area"]');
    expect(gridAreas.length).toBeGreaterThanOrEqual(4); // nav, side, main, stats
  },
};

export const MagazineLayout: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Magazine
    const magazineBtn = canvas.getByRole('button', { name: 'Magazine' });
    await user.click(magazineBtn);

    await waitFor(() => {
      expect(magazineBtn).toHaveClass('btn-primary');
    });

    // Check description is in alert
    const alert = canvasElement.querySelector('.alert');
    expect(alert?.textContent).toContain('Magazine');

    // Check areas are rendered in the grid
    const gridAreas = canvasElement.querySelectorAll('[style*="grid-area"]');
    expect(gridAreas.length).toBeGreaterThanOrEqual(4); // featured, article1, article2, article3, sidebar
  },
};

export const CustomLayout: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click Custom
    const customBtn = canvas.getByRole('button', { name: 'Custom' });
    await user.click(customBtn);

    await waitFor(() => {
      expect(customBtn).toHaveClass('btn-primary');
    });

    // Check description
    await expect(canvas.getByText(/asymmetric/)).toBeInTheDocument();
  },
};

export const AsciiPreviewPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check ASCII preview is present
    await expect(canvas.getByText('grid-template-areas:')).toBeInTheDocument();
  },
};

export const GeneratedCSSPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check generated CSS section
    await expect(canvas.getByText('Generated CSS')).toBeInTheDocument();

    // Check code content is present
    const codeBlocks = canvasElement.querySelectorAll('pre, code');
    const codeContent = Array.from(codeBlocks)
      .map((el) => el.textContent)
      .join(' ');
    expect(codeContent).toContain('display: grid');
  },
};

export const ProTipsPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check pro tips
    await expect(canvas.getByText('Pro Tips')).toBeInTheDocument();
    await expect(canvas.getByText(/rectangles/)).toBeInTheDocument();
  },
};
