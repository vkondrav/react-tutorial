import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import ErrorFallback from '../ErrorFallback';

const meta: Meta<typeof ErrorFallback> = {
  title: 'Core/ErrorFallback',
  component: ErrorFallback,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A user-friendly error fallback page displayed when the app encounters an unexpected error. Shows error details in development mode and provides options to retry or return home.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock error object
const mockError = new Error('Failed to load lesson component');
mockError.stack = `Error: Failed to load lesson component
    at LazyComponent (App.tsx:245:15)
    at Suspense
    at App (App.tsx:342:10)
    at ErrorBoundary
    at StrictMode`;

// Mock reset function
const mockReset = () => {
  console.log('Error boundary reset triggered');
};

/**
 * Default error fallback display with a typical error message.
 */
export const Default: Story = {
  args: {
    error: mockError,
    resetErrorBoundary: mockReset,
  },
};

/**
 * Error with a very long message to test text wrapping.
 */
export const LongErrorMessage: Story = {
  args: {
    error: new Error(
      'ChunkLoadError: Loading chunk 12345 failed. (timeout: http://localhost:5173/assets/index-BCoYZCI-.js) This is a very long error message that should wrap properly within the error details section.'
    ),
    resetErrorBoundary: mockReset,
  },
};

/**
 * Error with minimal information (no stack trace).
 */
export const MinimalError: Story = {
  args: {
    error: Object.assign(new Error('Something went wrong'), { stack: undefined }),
    resetErrorBoundary: mockReset,
  },
};

/**
 * Tests the Try Again button interaction.
 */
export const TryAgainButton: Story = {
  args: {
    error: mockError,
    resetErrorBoundary: mockReset,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and verify the Try Again button
    const tryAgainButton = canvas.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();

    // Click should be possible (we can't actually test the reset in Storybook easily)
    await userEvent.click(tryAgainButton);
  },
};

/**
 * Tests the error details expansion in development mode.
 */
export const StackTraceExpansion: Story = {
  args: {
    error: mockError,
    resetErrorBoundary: mockReset,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the error message
    expect(canvas.getByText('Failed to load lesson component')).toBeInTheDocument();

    // Find and expand the stack trace
    const detailsToggle = canvas.getByText(/view stack trace/i);
    expect(detailsToggle).toBeInTheDocument();

    await userEvent.click(detailsToggle);

    // Verify stack trace is visible
    expect(canvas.getByText(/at LazyComponent/i)).toBeInTheDocument();
  },
};

/**
 * Tests that all UI elements are present and accessible.
 */
export const AccessibilityCheck: Story = {
  args: {
    error: mockError,
    resetErrorBoundary: mockReset,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check main heading
    expect(
      canvas.getByRole('heading', { name: /oops! something went wrong/i })
    ).toBeInTheDocument();

    // Check action buttons
    expect(canvas.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /go to homepage/i })).toBeInTheDocument();

    // Check help link
    const reportLink = canvas.getByRole('link', { name: /report this issue/i });
    expect(reportLink).toBeInTheDocument();
    expect(reportLink).toHaveAttribute('href', 'https://github.com/vkondrav/react-tutorial/issues');
  },
};
