import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import SpecificityComparisonDemo from '@lessons/css/4_2/SpecificityComparisonDemo';

const meta: Meta<typeof SpecificityComparisonDemo> = {
  title: 'Lessons/css-4.2/SpecificityComparisonDemo',
  component: SpecificityComparisonDemo,
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

type Story = StoryObj<typeof SpecificityComparisonDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check initial state shows both approaches
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Compare Both' })).toBeInTheDocument();
    });
    // Multiple elements may have these texts, so check they exist
    expect(canvas.getAllByText('Traditional CSS').length).toBeGreaterThan(0);
    expect(canvas.getAllByText('BEM Approach').length).toBeGreaterThan(0);
  },
};

export const TraditionalCSSView: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Traditional CSS only
    const traditionalButton = canvas.getByRole('button', { name: 'Traditional CSS' });
    await userEvent.click(traditionalButton);

    // Check selectors are shown
    await waitFor(() => {
      expect(canvas.getByText('.nav a')).toBeInTheDocument();
    });
    expect(canvas.getByText('.nav ul li a')).toBeInTheDocument();
    expect(canvas.getByText('.nav ul li a.active')).toBeInTheDocument();
    expect(canvas.getByText('#header .nav ul li a.active')).toBeInTheDocument();
  },
};

export const BEMView: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to BEM only
    const bemButton = canvas.getByRole('button', { name: 'BEM Approach' });
    await userEvent.click(bemButton);

    // Check BEM selectors are shown
    await waitFor(() => {
      const pageText = canvasElement.textContent || '';
      expect(pageText).toContain('.nav__link');
    });
    const pageText = canvasElement.textContent || '';
    expect(pageText).toContain('.nav__link--active');
    expect(pageText).toContain('.nav__item');
    expect(pageText).toContain('.nav--dark');

    // In BEM-only view, check specificity stats section
    expect(pageText).toContain('BEM specificity (always)');
  },
};

export const SpecificityStats: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check stats section
    await waitFor(() => {
      expect(canvas.getByText('The Specificity War')).toBeInTheDocument();
    });
    expect(canvas.getByText('4→6')).toBeInTheDocument(); // Traditional range
    expect(canvas.getByText('1')).toBeInTheDocument(); // BEM always
  },
};

export const ShowCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click show code button
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Show CSS Comparison' })).toBeInTheDocument();
    });
    const showCodeButton = canvas.getByRole('button', { name: 'Show CSS Comparison' });
    await userEvent.click(showCodeButton);

    // Check that code is displayed
    await waitFor(() => {
      const pageText = canvasElement.textContent || '';
      expect(pageText).toMatch(/Specificity Comparison/);
    });

    // Check for CSS content
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/TRADITIONAL CSS/);
  },
};
