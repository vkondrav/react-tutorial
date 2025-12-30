import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import RSCPlayground from '@lessons/8_4/RSCPlayground';

const meta: Meta<typeof RSCPlayground> = {
  title: 'Lessons/8.4/RSCPlayground',
  component: RSCPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive playground with RSC patterns: data fetching, interactive islands, children passthrough, and decision guide.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view - shows the Live Demo tab (skipped in tests since it requires server)
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check all tabs are rendered
    expect(canvas.getByRole('button', { name: /Live Demo/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Data Fetching/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Interactive Island/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Children Passthrough/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Decision Guide/ })).toBeInTheDocument();
  },
};

/**
 * Tests the Data Fetching pattern tab
 */
export const DataFetchingPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Data Fetching tab
    await userEvent.click(canvas.getByRole('button', { name: /Data Fetching/ }));

    // Check content is shown
    await waitFor(() => {
      expect(canvas.getByText('Pattern: Server-Side Data Fetching')).toBeInTheDocument();
    });

    // Check advantages are listed
    expect(canvas.getByText('Advantages')).toBeInTheDocument();
    expect(canvas.getByText('When to Use')).toBeInTheDocument();
  },
};

/**
 * Tests the Interactive Island pattern tab
 */
export const InteractiveIslandPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Interactive Island tab
    await userEvent.click(canvas.getByRole('button', { name: /Interactive Island/ }));

    // Check content is shown
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Pattern: Interactive Islands');
    });

    // Check visual component tree
    expect(canvasElement.textContent).toContain('Visual: Component Tree');
    expect(canvasElement.textContent).toContain('ArticlePage');
    expect(canvasElement.textContent).toContain('LikeButton');
  },
};

/**
 * Tests the Children Passthrough pattern tab
 */
export const ChildrenPassthroughPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Children Passthrough tab
    await userEvent.click(canvas.getByRole('button', { name: /Children Passthrough/ }));

    // Check content is shown
    await waitFor(() => {
      expect(canvas.getByText('Pattern: Children Passthrough')).toBeInTheDocument();
    });

    // Check explanation sections
    expect(canvas.getByText('Why This Works')).toBeInTheDocument();
    expect(canvas.getByText('Common Use Cases')).toBeInTheDocument();
  },
};

/**
 * Tests the Decision Guide tab
 */
export const DecisionGuideTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Decision Guide tab
    await userEvent.click(canvas.getByRole('button', { name: /Decision Guide/ }));

    // Check content is shown
    await waitFor(() => {
      expect(canvas.getByText('Decision Guide: Server or Client?')).toBeInTheDocument();
    });

    // Check decision questions are shown
    expect(
      canvas.getByText(/Does the component need useState, useEffect, or event handlers?/)
    ).toBeInTheDocument();

    // Check golden rule
    expect(canvas.getByText('Golden Rule')).toBeInTheDocument();
    expect(canvas.getByText(/Default to Server Components./)).toBeInTheDocument();
  },
};

/**
 * Tests tab switching between patterns
 */
export const TabSwitching: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Data Fetching
    await userEvent.click(canvas.getByRole('button', { name: /Data Fetching/ }));
    await waitFor(() => {
      expect(canvas.getByText('Pattern: Server-Side Data Fetching')).toBeInTheDocument();
    });

    // Switch to Interactive Island
    await userEvent.click(canvas.getByRole('button', { name: /Interactive Island/ }));
    await waitFor(() => {
      expect(canvas.getByText('Pattern: Interactive Islands')).toBeInTheDocument();
    });

    // Switch to Children Passthrough
    await userEvent.click(canvas.getByRole('button', { name: /Children Passthrough/ }));
    await waitFor(() => {
      expect(canvas.getByText('Pattern: Children Passthrough')).toBeInTheDocument();
    });

    // Switch to Decision Guide
    await userEvent.click(canvas.getByRole('button', { name: /Decision Guide/ }));
    await waitFor(() => {
      expect(canvas.getByText('Decision Guide: Server or Client?')).toBeInTheDocument();
    });
  },
};

/**
 * Verifies the framework requirement note is shown
 */
export const FrameworkNote: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check framework requirement note
    expect(canvas.getByText('Framework Requirement')).toBeInTheDocument();
    expect(canvas.getByText(/Next.js 13\+ App Router/)).toBeInTheDocument();
  },
};
