import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import UseFetchBasicsDemo from '@lessons/4_4/UseFetchBasicsDemo';

const meta: Meta<typeof UseFetchBasicsDemo> = {
  title: 'Lessons/4.4 Building useFetch Hook/UseFetchBasicsDemo',
  component: UseFetchBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates why to build a useFetch hook by comparing repetitive code (before) with clean hook usage (after).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows "Before" (repetitive code)
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify title is present
    expect(canvas.getByText('The Problem: Repetitive Fetch Code')).toBeInTheDocument();

    // Verify toggle buttons are present
    expect(canvas.getByRole('button', { name: /Before \(Repetitive\)/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /After \(useFetch\)/ })).toBeInTheDocument();

    // Before should be selected by default
    const beforeButton = canvas.getByRole('button', { name: /Before \(Repetitive\)/ });
    expect(beforeButton).toHaveClass('btn-error');

    // Verify the "before" indicator
    expect(canvas.getByText(/Same code repeated in every component/)).toBeInTheDocument();
    expect(canvas.getByText(/~50 lines per component/)).toBeInTheDocument();
  },
};

/**
 * Tests switching to "After" view
 */
export const AfterView: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on "After" button
    const afterButton = canvas.getByRole('button', { name: /After \(useFetch\)/ });
    await userEvent.click(afterButton);

    // After should now be selected
    await waitFor(() => {
      expect(afterButton).toHaveClass('btn-success');
    });

    // Verify the "after" indicator
    expect(canvas.getByText(/Logic extracted into reusable hook/)).toBeInTheDocument();
    expect(canvas.getByText(/~5 lines per component/)).toBeInTheDocument();
  },
};

/**
 * Tests toggling between views
 */
export const ToggleBetweenViews: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Start with Before (default)
    expect(canvas.getByText(/Same code repeated/)).toBeInTheDocument();

    // Switch to After
    await userEvent.click(canvas.getByRole('button', { name: /After \(useFetch\)/ }));
    await waitFor(() => {
      expect(canvas.getByText(/Logic extracted/)).toBeInTheDocument();
    });

    // Switch back to Before
    await userEvent.click(canvas.getByRole('button', { name: /Before \(Repetitive\)/ }));
    await waitFor(() => {
      expect(canvas.getByText(/Same code repeated/)).toBeInTheDocument();
    });
  },
};

/**
 * Verifies benefits section is present
 */
export const BenefitsSummary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the three benefits are present
    expect(canvas.getByText('Reusable')).toBeInTheDocument();
    expect(canvas.getByText('Write once, use everywhere')).toBeInTheDocument();

    expect(canvas.getByText('Testable')).toBeInTheDocument();
    expect(canvas.getByText('Test the hook in isolation')).toBeInTheDocument();

    expect(canvas.getByText('Consistent')).toBeInTheDocument();
    expect(canvas.getByText('Same behavior everywhere')).toBeInTheDocument();
  },
};
