import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import ApproachComparisonDemo from '@lessons/css/4_2/ApproachComparisonDemo';

const meta: Meta<typeof ApproachComparisonDemo> = {
  title: 'Lessons/css-4.2/ApproachComparisonDemo',
  component: ApproachComparisonDemo,
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

type Story = StoryObj<typeof ApproachComparisonDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check initial state (Hybrid selected) - find all buttons with Hybrid text
    await waitFor(() => {
      const buttons = canvas.getAllByRole('button');
      const hybridButton = buttons.find((btn) => btn.textContent?.includes('Hybrid'));
      expect(hybridButton).toBeInTheDocument();
    });
    expect(canvas.getByText('CSS Methodology')).toBeInTheDocument();
    // Check for description text
    const pageText = canvasElement.textContent || '';
    expect(pageText).toContain('BEM for component structure');
  },
};

export const BEMApproach: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to BEM - find button containing BEM text
    await waitFor(() => {
      const buttons = canvas.getAllByRole('button');
      const bemButton = buttons.find((btn) => btn.textContent?.match(/^[^a-z]*BEM[^a-z]*$/i));
      expect(bemButton).toBeInTheDocument();
    });
    const buttons = canvas.getAllByRole('button');
    const bemButton = buttons.find((btn) => btn.textContent?.match(/^[^a-z]*BEM[^a-z]*$/i));
    await userEvent.click(bemButton!);

    await waitFor(() => {
      expect(
        canvas.getByText(
          'Semantic class names that describe component structure. Each component is self-contained with its own CSS file.'
        )
      ).toBeInTheDocument();
    });

    // Check best for items
    expect(canvas.getByText('Large teams with style guides')).toBeInTheDocument();
    expect(canvas.getByText('Design systems and component libraries')).toBeInTheDocument();
  },
};

export const UtilityApproach: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Utility-First
    await waitFor(() => {
      const buttons = canvas.getAllByRole('button');
      const utilityButton = buttons.find((btn) => btn.textContent?.includes('Utility-First'));
      expect(utilityButton).toBeInTheDocument();
    });
    const buttons = canvas.getAllByRole('button');
    const utilityButton = buttons.find((btn) => btn.textContent?.includes('Utility-First'));
    await userEvent.click(utilityButton!);

    await waitFor(() => {
      const pageText = canvasElement.textContent || '';
      expect(pageText).toContain('Atomic single-purpose classes');
    });

    // Check best for items
    expect(canvas.getByText('Rapid prototyping and MVPs')).toBeInTheDocument();
    expect(canvas.getByText('Component-based frameworks (React, Vue)')).toBeInTheDocument();
  },
};

export const ComparisonTable: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check comparison table
    await waitFor(() => {
      expect(canvas.getByText('Quick Comparison')).toBeInTheDocument();
    });
    expect(canvas.getByText('Learning Curve')).toBeInTheDocument();
    expect(canvas.getByText('HTML Readability')).toBeInTheDocument();
    expect(canvas.getByText('Development Speed')).toBeInTheDocument();
    expect(canvas.getByText('CSS File Size')).toBeInTheDocument();
    expect(canvas.getByText('Specificity Issues')).toBeInTheDocument();
    expect(canvas.getByText('Naming Required')).toBeInTheDocument();
  },
};

export const Recommendation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check recommendation section
    await waitFor(() => {
      expect(canvas.getByText('Recommendation')).toBeInTheDocument();
    });
    const pageText = canvasElement.textContent || '';
    expect(pageText).toContain('utility-first');
    expect(pageText).toContain('BEM components');
  },
};

export const ShowCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click show code button
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Show Hybrid Example' })).toBeInTheDocument();
    });
    const showCodeButton = canvas.getByRole('button', { name: 'Show Hybrid Example' });
    await userEvent.click(showCodeButton);

    // Check that code is displayed
    await waitFor(() => {
      const pageText = canvasElement.textContent || '';
      expect(pageText).toContain('Hybrid Approach');
    });

    // Check for CSS content
    const pageText = canvasElement.textContent || '';
    expect(pageText).toMatch(/\.product-card/);
    expect(pageText).toMatch(/Best of Both Worlds/);
  },
};
