import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import ChildrenAsFunctionDemo from '@lessons/react/6_2/ChildrenAsFunctionDemo';

const meta: Meta<typeof ChildrenAsFunctionDemo> = {
  title: 'Lessons/react-6.2/ChildrenAsFunctionDemo',
  component: ChildrenAsFunctionDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Shows the children-as-a-function pattern, the most common render prop syntax, with Toggle, Hover, and WindowSize components.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows syntax comparison and live demos
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show syntax comparison section
    expect(canvas.getByText('Named Prop vs Children')).toBeInTheDocument();
    expect(canvas.getByText('Named render prop')).toBeInTheDocument();

    // Should show live demos heading
    expect(canvas.getByText('Live Demos: Same Component, Different Renders')).toBeInTheDocument();

    // Should show various toggle UIs
    expect(canvas.getByText('As a Switch')).toBeInTheDocument();
    expect(canvas.getByText('As a Button')).toBeInTheDocument();
    expect(canvas.getByText('As Heart Icon')).toBeInTheDocument();
    expect(canvas.getByText('As Accordion')).toBeInTheDocument();
  },
};

/**
 * Toggle code visibility for the Toggle component
 */
export const ShowToggleCode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find and click the Show Code button
    const showCodeBtn = canvas.getByRole('button', { name: /Show/i });
    await user.click(showCodeBtn);

    // Should show the code snippet
    await waitFor(() => {
      expect(canvas.getByText('Toggle component')).toBeInTheDocument();
    });

    // Click again to hide
    const hideCodeBtn = canvas.getByRole('button', { name: /Hide/i });
    await user.click(hideCodeBtn);
  },
};

/**
 * Interact with the switch toggle
 */
export const SwitchToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find the switch button (inside "As a Switch" card)
    const switchCard = canvasElement.querySelector('.card.bg-base-300');
    expect(switchCard).toBeInTheDocument();

    // Find the toggle switch button
    const switchButton = switchCard?.querySelector('button.rounded-full');
    expect(switchButton).toBeInTheDocument();

    // Should show Disabled initially
    expect(canvas.getByText('Disabled')).toBeInTheDocument();

    // Click the switch
    await user.click(switchButton!);

    // Should now show Enabled
    await waitFor(() => {
      expect(canvas.getByText('Enabled')).toBeInTheDocument();
    });
  },
};

/**
 * Interact with the favorites button toggle
 */
export const FavoriteButtonToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find the Add to Favorites button
    const favButton = canvas.getByRole('button', { name: /Add to Favorites/i });
    expect(favButton).toBeInTheDocument();

    // Click to favorite
    await user.click(favButton);

    // Should now show Favorited
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /Favorited/i })).toBeInTheDocument();
    });
  },
};

/**
 * Interact with the heart icon toggle
 */
export const HeartIconToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find the white heart button by its content
    const heartButton = canvas.getByRole('button', { name: '🤍' });
    expect(heartButton).toBeInTheDocument();

    // Click the heart
    await user.click(heartButton);

    // Should now show red heart
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: '❤️' })).toBeInTheDocument();
    });
  },
};

/**
 * Interact with the accordion toggle
 */
export const AccordionToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Find the accordion button
    const accordionBtn = canvas.getByRole('button', { name: /Click to expand/i });
    expect(accordionBtn).toBeInTheDocument();

    // Click to expand
    await user.click(accordionBtn);

    // Should show the hidden content
    await waitFor(() => {
      expect(canvas.getByText(/This content was hidden until you clicked!/i)).toBeInTheDocument();
    });

    // Button text should now say collapse
    expect(canvas.getByRole('button', { name: /Click to collapse/i })).toBeInTheDocument();
  },
};

/**
 * Test hover component interaction
 */
export const HoverInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Should show "Hover over me" initially
    expect(canvas.getByText('Hover over me')).toBeInTheDocument();

    // Find the hover card
    const hoverCard = canvas.getByText('Hover over me').closest('.cursor-pointer');
    expect(hoverCard).toBeInTheDocument();

    // Hover over the card
    await user.hover(hoverCard!);

    // Should show "Hovering!" text
    await waitFor(() => {
      expect(canvas.getByText('🎉 Hovering!')).toBeInTheDocument();
    });

    // Unhover
    await user.unhover(hoverCard!);

    // Should go back to "Hover over me"
    await waitFor(() => {
      expect(canvas.getByText('Hover over me')).toBeInTheDocument();
    });
  },
};

/**
 * Verify WindowSize component shows dimensions
 */
export const WindowSizeDisplay: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show window dimensions
    expect(canvas.getByText('WindowSize Component')).toBeInTheDocument();
    expect(canvas.getByText('Resize the window to update')).toBeInTheDocument();

    // Should display dimensions in the format "width × height"
    const dimensions = canvasElement.querySelector('.font-mono');
    expect(dimensions).toBeInTheDocument();
    expect(dimensions?.textContent).toMatch(/\d+ × \d+/);
  },
};

/**
 * Verify key insight about children as function
 */
export const KeyInsight: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the insight section
    expect(canvas.getByText('Why Children as Function?')).toBeInTheDocument();
    expect(canvas.getByText(/purely ergonomic/)).toBeInTheDocument();
  },
};
