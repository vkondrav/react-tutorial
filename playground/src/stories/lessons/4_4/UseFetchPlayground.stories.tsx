import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import UseFetchPlayground from '@lessons/4_4/UseFetchPlayground';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof UseFetchPlayground> = {
  title: 'Lessons/4.4 Building useFetch Hook/UseFetchPlayground',
  component: UseFetchPlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive playground with 4 demos: User Search, Photo Gallery, Comments, and Error Handling.',
      },
    },
    msw: {
      handlers,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows User Search tab
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify tab buttons are present
    expect(canvas.getByRole('button', { name: /User Search/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Photo Gallery/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Comments/ })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /Error Handling/ })).toBeInTheDocument();

    // User Search should be selected by default
    const userSearchButton = canvas.getByRole('button', { name: /User Search/ });
    expect(userSearchButton).toHaveClass('btn-primary');

    // Search input should be present
    expect(canvas.getByPlaceholderText(/Search users/)).toBeInTheDocument();
  },
};

/**
 * Tests user search functionality
 */
export const UserSearch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for users to load
    await waitFor(
      () => {
        const userNames = canvas.queryAllByText(/Leanne Graham|Ervin Howell/);
        expect(userNames.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );

    // Type in search field
    const searchInput = canvas.getByPlaceholderText(/Search users/);
    await userEvent.type(searchInput, 'Leanne');

    // Should filter to show only matching user
    await waitFor(() => {
      expect(canvas.getByText('Leanne Graham')).toBeInTheDocument();
    });

    // Clear search
    await userEvent.clear(searchInput);

    // All users should be visible again
    await waitFor(() => {
      const userNames = canvas.queryAllByText(/Leanne Graham|Ervin Howell/);
      expect(userNames.length).toBeGreaterThan(0);
    });
  },
};

/**
 * Tests Photo Gallery tab
 */
export const PhotoGallery: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Photo Gallery tab
    const galleryButton = canvas.getByRole('button', { name: /Photo Gallery/ });
    await userEvent.click(galleryButton);

    // Gallery should be selected
    await waitFor(() => {
      expect(galleryButton).toHaveClass('btn-primary');
    });

    // Album selector should be present
    expect(canvas.getByText('Album:')).toBeInTheDocument();

    // Wait for photos to load
    await waitFor(
      () => {
        const images = canvasElement.querySelectorAll('img');
        expect(images.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests switching albums in Photo Gallery
 */
export const SwitchAlbums: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Photo Gallery tab
    await userEvent.click(canvas.getByRole('button', { name: /Photo Gallery/ }));

    // Wait for initial load
    await waitFor(
      () => {
        const images = canvasElement.querySelectorAll('img');
        expect(images.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );

    // Click album 2
    const album2Button = canvas.getByRole('button', { name: '2' });
    await userEvent.click(album2Button);

    // Album 2 should be selected
    await waitFor(() => {
      expect(album2Button).toHaveClass('btn-primary');
    });

    // Wait for new photos
    await waitFor(
      () => {
        const images = canvasElement.querySelectorAll('img');
        expect(images.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests Comments tab
 */
export const Comments: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Comments tab
    const commentsButton = canvas.getByRole('button', { name: /Comments/ });
    await userEvent.click(commentsButton);

    // Comments should be selected
    await waitFor(() => {
      expect(commentsButton).toHaveClass('btn-primary');
    });

    // Should show prompt to select a post
    expect(canvas.getByText('Select a post to load comments')).toBeInTheDocument();

    // Select Post 1
    const post1Button = canvas.getByRole('button', { name: 'Post 1' });
    await userEvent.click(post1Button);

    // Wait for comments to load
    await waitFor(
      () => {
        const commentElements = canvasElement.querySelectorAll('.text-accent');
        expect(commentElements.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests Error Handling tab
 */
export const ErrorHandling: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Error Handling tab
    const errorButton = canvas.getByRole('button', { name: /Error Handling/ });
    await userEvent.click(errorButton);

    // Error Handling should be selected
    await waitFor(() => {
      expect(errorButton).toHaveClass('btn-primary');
    });

    // Should show error toggle
    expect(canvas.getByText('Simulate error:')).toBeInTheDocument();

    // Wait for users to load (no error initially)
    await waitFor(
      () => {
        const successDots = canvasElement.querySelectorAll('.bg-success');
        expect(successDots.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );
  },
};

/**
 * Tests simulating an error
 */
export const SimulateError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Switch to Error Handling tab
    await userEvent.click(canvas.getByRole('button', { name: /Error Handling/ }));

    // Wait for initial load
    await waitFor(
      () => {
        const successDots = canvasElement.querySelectorAll('.bg-success');
        expect(successDots.length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );

    // Toggle error simulation
    const errorToggle = canvasElement.querySelector('.toggle');
    if (errorToggle) {
      await userEvent.click(errorToggle);

      // Should show error state
      await waitFor(
        () => {
          expect(canvas.getByText('Error caught!')).toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Retry button should be present
      expect(canvas.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    }
  },
};

/**
 * Verifies hook signature section
 */
export const HookSignature: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify hook signature section
    expect(canvas.getByText('Hook Signature')).toBeInTheDocument();
  },
};
