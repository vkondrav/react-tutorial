import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import RSCBenefitsDemo from '@lessons/8_4/RSCBenefitsDemo';

const meta: Meta<typeof RSCBenefitsDemo> = {
  title: 'Lessons/8.4/RSCBenefitsDemo',
  component: RSCBenefitsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Showcases the benefits of RSC (bundle size, data access, security, streaming) and trade-offs with mitigation strategies.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows the benefits grid
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check benefits are displayed
    expect(canvas.getByText('Reduced Bundle Size')).toBeInTheDocument();
    expect(canvas.getByText('Direct Data Access')).toBeInTheDocument();
    expect(canvas.getByText('Better Security')).toBeInTheDocument();
    expect(canvas.getByText('Streaming & Suspense')).toBeInTheDocument();
  },
};

/**
 * Tests clicking on a benefit card to expand details
 */
export const ExpandBenefitCard: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // First benefit should be expanded by default
    expect(
      canvas.getByText(/Markdown parsers, syntax highlighters, date libraries never ship/)
    ).toBeInTheDocument();

    // Click on "Direct Data Access" to expand it
    await userEvent.click(canvas.getByText('Direct Data Access'));

    // Should show Direct Data Access details
    await waitFor(() => {
      expect(canvas.getByText(/Query databases directly in components/)).toBeInTheDocument();
    });
  },
};

/**
 * Verifies the bundle size comparison is shown
 */
export const BundleSizeComparison: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check bundle size comparison section
    expect(canvas.getByText('Bundle Size Impact: Real Example')).toBeInTheDocument();

    // Check traditional vs RSC comparison
    expect(canvas.getByText('Traditional (CSR/SSR)')).toBeInTheDocument();
    expect(canvas.getByText('With RSC')).toBeInTheDocument();

    // Check savings banner
    expect(canvas.getByText(/93% smaller bundle/)).toBeInTheDocument();
  },
};

/**
 * Tests expanding the trade-offs section
 */
export const ExpandTradeOffs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Trade-offs should be collapsed initially
    expect(canvas.getByText('Trade-offs & Challenges')).toBeInTheDocument();

    // Click to expand trade-offs
    await userEvent.click(canvas.getByText('Trade-offs & Challenges'));

    // Trade-offs should be visible
    await waitFor(() => {
      expect(canvas.getByText('No hooks in Server Components')).toBeInTheDocument();
    });

    // Check mitigations are shown
    expect(
      canvas.getByText(/Split into Server \(data\) \+ Client \(interactivity\) components/)
    ).toBeInTheDocument();
  },
};

/**
 * Tests collapsing the trade-offs section
 */
export const CollapseTradeOffs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Expand trade-offs
    await userEvent.click(canvas.getByText('Trade-offs & Challenges'));

    await waitFor(() => {
      expect(canvas.getByText('No hooks in Server Components')).toBeInTheDocument();
    });

    // Collapse trade-offs
    await userEvent.click(canvas.getByText('Trade-offs & Challenges'));

    // Trade-offs should be hidden
    await waitFor(() => {
      expect(canvas.queryByText('No hooks in Server Components')).not.toBeInTheDocument();
    });
  },
};
