import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import ViewportMetaDemo from '@lessons/css/2_4/ViewportMetaDemo';

const meta: Meta<typeof ViewportMetaDemo> = {
  title: 'Lessons/CSS/2.4 Responsive Strategy/ViewportMetaDemo',
  component: ViewportMetaDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof ViewportMetaDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check toggle buttons are present
    await expect(canvas.getByRole('button', { name: 'No Viewport Tag' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'With Viewport Tag' })).toBeInTheDocument();

    // Check "With Viewport Tag" is selected by default
    const withViewportBtn = canvas.getByRole('button', { name: 'With Viewport Tag' });
    await expect(withViewportBtn).toHaveClass('btn-success');
  },
};

export const NoViewportTag: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click "No Viewport Tag"
    const noViewportBtn = canvas.getByRole('button', { name: 'No Viewport Tag' });
    await user.click(noViewportBtn);

    await waitFor(() => {
      expect(noViewportBtn).toHaveClass('btn-error');
    });

    // Check error alert appears
    await expect(canvas.getByText('Without Viewport Tag')).toBeInTheDocument();
    await expect(canvas.getByText(/980px width/i)).toBeInTheDocument();
  },
};

export const WithViewportTag: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Ensure we're on the "With Viewport Tag" setting
    const withViewportBtn = canvas.getByRole('button', { name: 'With Viewport Tag' });
    await user.click(withViewportBtn);

    await waitFor(() => {
      expect(withViewportBtn).toHaveClass('btn-success');
    });

    // Check success alert appears
    await expect(canvas.getByRole('heading', { name: 'With Viewport Tag' })).toBeInTheDocument();
    await expect(canvas.getByText(/actual device width/i)).toBeInTheDocument();
  },
};

export const PhoneSimulationPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check phone simulation elements
    await expect(canvas.getByText('Simulated Mobile View (375px device)')).toBeInTheDocument();
  },
};

export const CodeExamplePresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check code example is present
    await expect(canvas.getByText('The Essential Viewport Tag')).toBeInTheDocument();
  },
};

export const WarningPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check warning alert is present
    await expect(canvas.getByText('Important')).toBeInTheDocument();
    await expect(canvas.getByText(/goes in your HTML/i)).toBeInTheDocument();
  },
};
