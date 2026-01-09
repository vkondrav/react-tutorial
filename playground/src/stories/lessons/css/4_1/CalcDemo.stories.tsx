import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, waitFor } from 'storybook/test';
import CalcDemo from '@lessons/css/4_1/CalcDemo';

const meta: Meta<typeof CalcDemo> = {
  title: 'Lessons/css-4.1/CalcDemo',
  component: CalcDemo,
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

type Story = StoryObj<typeof CalcDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check initial controls are present
    await waitFor(() => {
      expect(canvas.getByText('Adjust Variables')).toBeInTheDocument();
    });
    expect(canvas.getByText('Live Preview')).toBeInTheDocument();
  },
};

export const ControlLabels: Story = {
  play: async ({ canvasElement }) => {
    // Check all control labels are present in page text
    await waitFor(() => {
      const pageText = canvasElement.textContent || '';
      expect(pageText).toMatch(/--header-height/);
      expect(pageText).toMatch(/--sidebar-width/);
      expect(pageText).toMatch(/--spacing-unit/);
      expect(pageText).toMatch(/--columns/);
    });
  },
};

export const PreviewSections: Story = {
  play: async ({ canvasElement }) => {
    // Check preview sections are present in page text
    await waitFor(() => {
      const pageText = canvasElement.textContent || '';
      expect(pageText).toMatch(/Spacing Scale/);
      expect(pageText).toMatch(/Grid.*columns/);
    });
  },
};

export const GeneratedCSSDisplay: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check generated CSS section
    await waitFor(() => {
      expect(canvas.getByText('Generated CSS')).toBeInTheDocument();
    });

    // Check for calc() in generated code
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/calc\(100vh - var\(--header-height\)\)/);
    expect(pageText).toMatch(/calc\(100% - var\(--sidebar-width\)\)/);
  },
};

export const CodeSnippetPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that code snippet is displayed
    await waitFor(() => {
      expect(canvas.getByText('calc() with Variables')).toBeInTheDocument();
    });

    // Check for CSS content
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/--header-height/);
    expect(pageText).toMatch(/grid-template-columns/);
  },
};

export const RangeSliders: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that range sliders are present
    await waitFor(() => {
      const sliders = canvas.getAllByRole('slider');
      expect(sliders.length).toBe(4);
    });
  },
};
