import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import MistakesQuiz from '@lessons/1_3/MistakesQuiz';

const meta: Meta<typeof MistakesQuiz> = {
  title: 'Lessons/1.3 Understanding JSX/MistakesQuiz',
  component: MistakesQuiz,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Interactive quiz showing common JSX mistakes. Click on each mistake card to reveal the error and fix.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default mistakes quiz.
 */
export const Default: Story = {};

/**
 * Tests clicking on the first mistake reveals the answer.
 */
export const RevealFirstMistake: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the first mistake card (class="container")
    const firstCard = canvas.getByText(/class="container"/).closest('.card');
    if (!firstCard) throw new Error('First card not found');

    // Initially should not show the answer
    expect(canvas.queryByText(/Using "class" instead of "className"/)).not.toBeInTheDocument();

    // Click to reveal
    await userEvent.click(firstCard as HTMLElement);

    // Should now show the error and fix
    expect(canvas.getByText(/Using "class" instead of "className"/)).toBeInTheDocument();
    expect(canvas.getByText(/className="container"/)).toBeInTheDocument();
  },
};

/**
 * Tests clicking on multiple mistakes reveals all answers.
 */
export const RevealMultipleMistakes: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all cards
    const cards = canvasElement.querySelectorAll('.card');

    // Click first card
    await userEvent.click(cards[0] as HTMLElement);
    expect(canvas.getByText(/Using "class" instead of "className"/)).toBeInTheDocument();

    // Click second card
    await userEvent.click(cards[1] as HTMLElement);
    expect(canvas.getByText(/Forgot curly braces around variable/)).toBeInTheDocument();

    // Click third card
    await userEvent.click(cards[2] as HTMLElement);
    expect(canvas.getByText(/Tag not closed/)).toBeInTheDocument();

    // Click fourth card
    await userEvent.click(cards[3] as HTMLElement);
    expect(canvas.getByText(/Lowercase event handler/)).toBeInTheDocument();
  },
};

/**
 * Tests that clicking a card again doesn't hide the answer (one-way reveal).
 */
export const OneWayReveal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstCard = canvas.getByText(/class="container"/).closest('.card');
    if (!firstCard) throw new Error('First card not found');

    // Click once
    await userEvent.click(firstCard as HTMLElement);
    expect(canvas.getByText(/Using "class" instead of "className"/)).toBeInTheDocument();

    // Click again - answer should still be visible
    await userEvent.click(firstCard as HTMLElement);
    expect(canvas.getByText(/Using "class" instead of "className"/)).toBeInTheDocument();
  },
};
