import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import CSSShapesDemo from '@lessons/css/3_1/CSSShapesDemo';

const meta: Meta<typeof CSSShapesDemo> = {
  title: 'Lessons/CSS/3.1 Backgrounds & Borders/CSSShapesDemo',
  component: CSSShapesDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof CSSShapesDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check shape type buttons
    await expect(canvas.getByRole('button', { name: 'circle()' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'ellipse()' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'polygon()' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'inset()' })).toBeInTheDocument();

    // Circle is selected by default
    const circleBtn = canvas.getByRole('button', { name: 'circle()' });
    expect(circleBtn).toHaveClass('btn-primary');
  },
};

export const SwitchToEllipse: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const ellipseBtn = canvas.getByRole('button', { name: 'ellipse()' });
    await user.click(ellipseBtn);

    await waitFor(() => {
      expect(ellipseBtn).toHaveClass('btn-primary');
    });

    // Check ellipse-specific controls
    await expect(canvas.getByText('Horizontal Radius')).toBeInTheDocument();
    await expect(canvas.getByText('Vertical Radius')).toBeInTheDocument();
  },
};

export const SwitchToPolygon: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const polygonBtn = canvas.getByRole('button', { name: 'polygon()' });
    await user.click(polygonBtn);

    await waitFor(() => {
      expect(polygonBtn).toHaveClass('btn-primary');
    });

    // Check polygon preset buttons
    await expect(canvas.getByRole('button', { name: 'triangle' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'hexagon' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'star' })).toBeInTheDocument();
  },
};

export const PolygonPresets: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to polygon
    await user.click(canvas.getByRole('button', { name: 'polygon()' }));

    // Click star preset
    await user.click(canvas.getByRole('button', { name: 'star' }));

    await waitFor(() => {
      const starBtn = canvas.getByRole('button', { name: 'star' });
      expect(starBtn).toHaveClass('btn-primary');
    });
  },
};

export const SwitchToInset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const insetBtn = canvas.getByRole('button', { name: 'inset()' });
    await user.click(insetBtn);

    await waitFor(() => {
      expect(insetBtn).toHaveClass('btn-primary');
    });

    // Check inset-specific controls
    await expect(canvas.getByText('Border Radius')).toBeInTheDocument();
  },
};

export const ShapeOutsideToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Check shape-outside section exists
    await expect(canvas.getByText('shape-outside: Text Wrapping')).toBeInTheDocument();

    // Toggle shape-outside
    const checkbox = canvas.getByRole('checkbox', { name: 'Enable shape-outside' });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });

    // Check status text updates
    await expect(canvas.getByText(/Text wraps around the circular shape/)).toBeInTheDocument();
  },
};

export const ShapesGallery: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check gallery section
    await expect(canvas.getByText('Common Shapes Gallery')).toBeInTheDocument();

    // Check some shape labels
    await expect(canvas.getByText('Circle')).toBeInTheDocument();
    await expect(canvas.getByText('Triangle')).toBeInTheDocument();
    await expect(canvas.getByText('Hexagon')).toBeInTheDocument();
    await expect(canvas.getByText('Star')).toBeInTheDocument();
  },
};

export const ClipPathOutput: Story = {
  play: async ({ canvasElement }) => {
    // Check clip-path output is displayed
    const codeBlocks = canvasElement.querySelectorAll('.font-mono');
    const hasClipPath = Array.from(codeBlocks).some((block) =>
      block.textContent?.includes('clip-path')
    );
    expect(hasClipPath).toBe(true);
  },
};

export const ProTipSection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check pro tip about Clippy tool
    await expect(canvas.getByText('Pro Tip')).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: 'Clippy' })).toBeInTheDocument();
  },
};
