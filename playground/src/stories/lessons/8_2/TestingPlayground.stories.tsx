import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import TestingPlayground from '@lessons/8_2/TestingPlayground';

const meta: Meta<typeof TestingPlayground> = {
  title: 'Lessons/8.2/TestingPlayground',
  component: TestingPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive playground with counter, async data, and form validation demos to practice testing concepts.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing the counter demo
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show counter demo
    expect(canvas.getByText('Counter Component')).toBeInTheDocument();
    expect(canvas.getByTestId('count')).toHaveTextContent('0');
  },
};

/**
 * Tests the counter increment functionality
 */
export const CounterIncrement: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click increment button
    const incrementButton = canvas.getByRole('button', { name: 'Increment' });
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);

    // Should show count of 2
    expect(canvas.getByTestId('count')).toHaveTextContent('2');
  },
};

/**
 * Tests running the automated test visualization
 */
export const RunTestVisualization: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Run Test button
    const runTestButton = canvas.getByRole('button', { name: /Run Test/ });
    await userEvent.click(runTestButton);

    // Wait for test results to appear
    await waitFor(
      () => {
        expect(canvas.getByText(/All.*steps passed/)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests switching to async data demo
 */
export const AsyncDataDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to async demo
    const asyncTab = canvas.getByRole('button', { name: 'Async Data' });
    await userEvent.click(asyncTab);

    // Should show async demo
    await waitFor(() => {
      expect(canvas.getByText('Async Data Fetching')).toBeInTheDocument();
    });

    // Click load success
    const loadButton = canvas.getByRole('button', { name: 'Load Success' });
    await userEvent.click(loadButton);

    // Wait for users to load
    await waitFor(
      () => {
        expect(canvas.getByText('Alice')).toBeInTheDocument();
        expect(canvas.getByText('Bob')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests the form validation demo
 */
export const FormValidationDemo: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to form demo
    const formTab = canvas.getByRole('button', { name: 'Form Validation' });
    await userEvent.click(formTab);

    // Should show form input
    await waitFor(() => {
      expect(canvas.getByLabelText('Email')).toBeInTheDocument();
    });

    // Submit empty form - should show errors
    const submitButton = canvas.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    // Should show validation errors
    await waitFor(() => {
      expect(canvas.getByText('Email is required')).toBeInTheDocument();
      expect(canvas.getByText('Password is required')).toBeInTheDocument();
    });
  },
};

/**
 * Tests successful form submission
 */
export const FormSubmitSuccess: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to form demo
    const formTab = canvas.getByRole('button', { name: 'Form Validation' });
    await userEvent.click(formTab);

    await waitFor(() => {
      expect(canvas.getByLabelText('Email')).toBeInTheDocument();
    });

    // Fill in valid data
    const emailInput = canvas.getByLabelText('Email');
    const passwordInput = canvas.getByLabelText('Password');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    // Submit form
    const submitButton = canvas.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    // Should show success
    await waitFor(() => {
      expect(canvas.getByText('Form Submitted Successfully!')).toBeInTheDocument();
    });
  },
};
