import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import AsyncValidationDemo from '@lessons/react/5_2/AsyncValidationDemo';

const meta: Meta<typeof AsyncValidationDemo> = {
  title: 'Lessons/react-5.2/AsyncValidationDemo',
  component: AsyncValidationDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates async validation with username availability check, debouncing, and loading states.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows username input
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify title
    expect(canvas.getByText('Username Availability')).toBeInTheDocument();

    // Verify input is present
    expect(canvas.getByPlaceholderText('Enter username...')).toBeInTheDocument();

    // Verify taken usernames are shown
    expect(canvas.getByText('Try these taken usernames:')).toBeInTheDocument();
    expect(canvas.getByText('admin')).toBeInTheDocument();
    expect(canvas.getByText('user')).toBeInTheDocument();
    expect(canvas.getByText('test')).toBeInTheDocument();
  },
};

/**
 * Tests sync validation (format errors)
 */
export const SyncValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const usernameInput = canvas.getByPlaceholderText('Enter username...');

    // Type too short - should show sync error
    await userEvent.type(usernameInput, 'ab');
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getByText('Minimum 3 characters')).toBeInTheDocument();
    });

    // Type invalid characters
    await userEvent.clear(usernameInput);
    await userEvent.type(usernameInput, 'invalid@name');
    await userEvent.tab();

    await waitFor(() => {
      expect(canvas.getByText('Only letters, numbers, and underscores')).toBeInTheDocument();
    });
  },
};

/**
 * Tests async validation with available username
 */
export const AvailableUsername: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const usernameInput = canvas.getByPlaceholderText('Enter username...');

    // Type a valid available username
    await userEvent.type(usernameInput, 'newuser123');
    await userEvent.tab();

    // Should show loading state first (debounce + API call)
    await waitFor(
      () => {
        expect(canvas.getByText('Checking availability...')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Then should show available
    await waitFor(
      () => {
        expect(canvas.getByText('Username available!')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests async validation with taken username
 */
export const TakenUsername: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const usernameInput = canvas.getByPlaceholderText('Enter username...');

    // Type a taken username
    await userEvent.type(usernameInput, 'admin');
    await userEvent.tab();

    // Should show loading state first
    await waitFor(
      () => {
        expect(canvas.getByText('Checking availability...')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Then should show taken error
    await waitFor(
      () => {
        expect(canvas.getByText('Username already taken')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Tests clicking on a taken username badge
 */
export const ClickTakenBadge: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on "john" badge
    await userEvent.click(canvas.getByText('john'));

    // Input should now have "john"
    const usernameInput = canvas.getByPlaceholderText('Enter username...');
    expect(usernameInput).toHaveValue('john');

    // Should show taken error after check
    await waitFor(
      () => {
        expect(canvas.getByText('Username already taken')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Verifies debouncing explanation is present
 */
export const DebouncingExplanation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify debouncing explanation
    expect(canvas.getByText('Debouncing')).toBeInTheDocument();
    expect(
      canvas.getByText(/waits until the user stops typing before making an API call/)
    ).toBeInTheDocument();
  },
};

/**
 * Verifies validation flow diagram is present
 */
export const ValidationFlowDiagram: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify flow diagram
    expect(canvas.getByText('Validation Flow')).toBeInTheDocument();
    expect(canvas.getByText('User Types')).toBeInTheDocument();
    expect(canvas.getByText('Sync Check')).toBeInTheDocument();
    expect(canvas.getByText('Debounce')).toBeInTheDocument();
    expect(canvas.getByText('API Call')).toBeInTheDocument();
    expect(canvas.getByText('Show Result')).toBeInTheDocument();
  },
};
