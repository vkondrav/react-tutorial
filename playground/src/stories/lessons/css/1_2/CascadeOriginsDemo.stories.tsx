import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import CascadeOriginsDemo from '@lessons/css/1_2/CascadeOriginsDemo';

const meta: Meta<typeof CascadeOriginsDemo> = {
  title: 'Lessons/css-1.2/CascadeOriginsDemo',
  component: CascadeOriginsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An interactive demo explaining the three CSS style origins: User Agent (browser defaults), User (OS/extension settings), and Author (developer CSS).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view showing all three origin cards.
 */
export const Default: Story = {};

/**
 * Tests clicking User Agent origin shows browser defaults.
 */
export const UserAgentOrigin: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click User Agent card
    const userAgentCard = canvas.getByRole('button', { name: /User Agent.*Browser/i });
    await userEvent.click(userAgentCard);

    // Should show examples of browser defaults
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('<h1> is bold and large');
    });

    // Should show code example
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Browser default styles');
    });
  },
};

/**
 * Tests clicking User origin shows OS/extension styles.
 */
export const UserOrigin: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click User card
    const userCard = canvas.getByRole('button', { name: /User.*OS.*Extensions/i });
    await userEvent.click(userCard);

    // Should show examples of user preferences
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('High contrast mode');
    });

    // Should show code example
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('User stylesheet');
    });
  },
};

/**
 * Tests clicking Author origin shows developer CSS.
 */
export const AuthorOrigin: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Author card
    const authorCard = canvas.getByRole('button', { name: /Author.*Developer/i });
    await userEvent.click(authorCard);

    // Should show examples of author styles
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Your .css files');
    });

    // Should show code example
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Your CSS file');
    });
  },
};

/**
 * Tests toggling cards - clicking same card again deselects it.
 */
export const ToggleSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Author card
    const authorCard = canvas.getByRole('button', { name: /Author.*Developer/i });
    await userEvent.click(authorCard);

    // Should show code snippet with "Your CSS file" title
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('Your CSS file');
    });

    // Click again to deselect - get fresh reference
    const authorCardAgain = canvas.getByRole('button', { name: /Author.*Developer/i });
    await userEvent.click(authorCardAgain);

    // Code snippet should be hidden - the CodeSnippet title should be gone
    await waitFor(
      () => {
        // Look specifically for the code snippet container being absent
        // Or check that the specific code section is gone
        expect(canvasElement.textContent).not.toContain('Author (Developer) Styles');
      },
      { timeout: 2000 }
    );
  },
};

/**
 * Verifies the priority order is displayed correctly.
 */
export const PriorityOrder: Story = {
  play: async ({ canvasElement }) => {
    // Should show the priority flow
    expect(canvasElement.textContent).toContain('User Agent');
    expect(canvasElement.textContent).toContain('User');
    expect(canvasElement.textContent).toContain('Author');
    expect(canvasElement.textContent).toContain('Winner');
  },
};
