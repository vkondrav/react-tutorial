import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import UtilityFirstDemo from '@lessons/css/4_2/UtilityFirstDemo';

const meta: Meta<typeof UtilityFirstDemo> = {
  title: 'Lessons/css-4.2/UtilityFirstDemo',
  component: UtilityFirstDemo,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '900px', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof UtilityFirstDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check initial state (Utility-First selected)
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Utility-First' })).toBeInTheDocument();
    });
    expect(canvas.getByText('Utility-First Philosophy')).toBeInTheDocument();
    expect(canvas.getByText('No custom CSS needed!')).toBeInTheDocument();
  },
};

export const TraditionalMode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Traditional CSS
    const traditionalButton = canvas.getByRole('button', { name: 'Traditional CSS' });
    await userEvent.click(traditionalButton);

    // Check that CSS code is now shown
    await waitFor(() => {
      expect(canvas.getByText('Traditional CSS Philosophy')).toBeInTheDocument();
    });

    // BEM-style class names should appear in the CSS panel
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/\.product-card/);
    expect(pageText).toMatch(/\.product-card__image/);
  },
};

export const LivePreview: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check live preview section
    await waitFor(() => {
      expect(canvas.getByText('Live Preview')).toBeInTheDocument();
    });
    expect(canvas.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(canvas.getByText('$79.99')).toBeInTheDocument();
    expect(canvas.getByText('(128 reviews)')).toBeInTheDocument();
  },
};

export const UtilityClassReference: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check utility class reference section
    await waitFor(() => {
      expect(canvas.getByText('Common Utility Classes')).toBeInTheDocument();
    });
    // Check for utility classes in page content
    const pageText = canvasElement.textContent || '';
    expect(pageText).toContain('.flex');
    expect(pageText).toContain('.p-4');
    expect(pageText).toContain('.text-lg');
    expect(pageText).toContain('.rounded-lg');
  },
};

export const ProsAndCons: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check pros section
    await waitFor(() => {
      expect(canvas.getByText('Advantages')).toBeInTheDocument();
    });
    expect(canvas.getByText('No context-switching to CSS files')).toBeInTheDocument();
    expect(canvas.getByText('Dead code elimination via PurgeCSS')).toBeInTheDocument();

    // Check cons section
    expect(canvas.getByText('Trade-offs')).toBeInTheDocument();
    expect(canvas.getByText('Long class lists in HTML')).toBeInTheDocument();
  },
};

export const ShowCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click show code button
    const showCodeButton = canvas.getByRole('button', { name: 'Show Example Framework CSS' });
    await userEvent.click(showCodeButton);

    // Check that code is displayed
    await waitFor(() => {
      expect(canvas.getByText('Utility Classes Example')).toBeInTheDocument();
    });

    // Check for CSS content
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/\.flex/);
    expect(pageText).toMatch(/display: flex/);
  },
};
