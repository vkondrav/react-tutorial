import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { http, HttpResponse, delay } from 'msw';
import CreateDataDemo from '@lessons/4_3/CreateDataDemo';

const meta: Meta<typeof CreateDataDemo> = {
  title: 'Lessons/4.3 Creating Updating Data/CreateDataDemo',
  component: CreateDataDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates POST request patterns for creating new data, including form handling, loading states, and success feedback.',
      },
    },
    msw: {
      handlers: [
        http.post('https://jsonplaceholder.typicode.com/posts', async ({ request }) => {
          await delay(300);
          const body = (await request.json()) as Record<string, unknown>;
          return HttpResponse.json({
            id: 101,
            ...body,
          });
        }),
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with empty form
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify form elements are present
    expect(canvas.getByText('Create New Post')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('Enter post title...')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('Enter post content...')).toBeInTheDocument();

    // Create button should be disabled initially (no input)
    const createButton = canvas.getByRole('button', { name: /Create Post/ });
    expect(createButton).toBeDisabled();

    // Verify key points section
    expect(canvas.getByText('Key Points')).toBeInTheDocument();
  },
};

/**
 * Tests creating a new post
 */
export const CreatePost: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill in the form
    const titleInput = canvas.getByPlaceholderText('Enter post title...');
    const bodyInput = canvas.getByPlaceholderText('Enter post content...');

    await userEvent.type(titleInput, 'My Test Post');
    await userEvent.type(bodyInput, 'This is the content of my test post.');

    // Create button should now be enabled
    const createButton = canvas.getByRole('button', { name: /Create Post/ });
    expect(createButton).toBeEnabled();

    // Click create
    await userEvent.click(createButton);

    // Should show success message
    await waitFor(
      () => {
        expect(canvas.getByText('Post created successfully!')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // The created post should appear in the list
    expect(canvas.getByText('My Test Post')).toBeInTheDocument();
    expect(canvas.getByText(/Created Posts \(1\)/)).toBeInTheDocument();
  },
};

/**
 * Tests button disabled state when inputs are empty
 */
export const DisabledWhenEmpty: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const titleInput = canvas.getByPlaceholderText('Enter post title...');
    const createButton = canvas.getByRole('button', { name: /Create Post/ });

    // Button disabled with no input
    expect(createButton).toBeDisabled();

    // Type only title
    await userEvent.type(titleInput, 'Only Title');
    expect(createButton).toBeDisabled();

    // Clear and type only body
    await userEvent.clear(titleInput);
    const bodyInput = canvas.getByPlaceholderText('Enter post content...');
    await userEvent.type(bodyInput, 'Only body content');
    expect(createButton).toBeDisabled();
  },
};

/**
 * Tests the code toggle functionality
 */
export const ToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Code should be hidden initially
    expect(canvas.queryByText('POST Request Pattern')).not.toBeInTheDocument();

    // Click to show code
    const showCodeButton = canvas.getByRole('button', { name: /Show Code/ });
    await userEvent.click(showCodeButton);

    // Code snippet should be visible
    await waitFor(() => {
      expect(canvas.getByText('POST Request Pattern')).toBeInTheDocument();
    });

    // Click to hide code
    const hideCodeButton = canvas.getByRole('button', { name: /Hide Code/ });
    await userEvent.click(hideCodeButton);

    // Code should be hidden again
    await waitFor(() => {
      expect(canvas.queryByText('POST Request Pattern')).not.toBeInTheDocument();
    });
  },
};

/**
 * Tests creating multiple posts
 */
export const CreateMultiplePosts: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Create first post
    await userEvent.type(canvas.getByPlaceholderText('Enter post title...'), 'First Post');
    await userEvent.type(canvas.getByPlaceholderText('Enter post content...'), 'First content');
    await userEvent.click(canvas.getByRole('button', { name: /Create Post/ }));

    await waitFor(
      () => {
        expect(canvas.getByText('First Post')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Create second post
    await userEvent.type(canvas.getByPlaceholderText('Enter post title...'), 'Second Post');
    await userEvent.type(canvas.getByPlaceholderText('Enter post content...'), 'Second content');
    await userEvent.click(canvas.getByRole('button', { name: /Create Post/ }));

    await waitFor(
      () => {
        expect(canvas.getByText('Second Post')).toBeInTheDocument();
        expect(canvas.getByText(/Created Posts \(2\)/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};
