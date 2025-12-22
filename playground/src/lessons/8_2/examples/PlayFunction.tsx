// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

export const CounterTest: Story = {
  play: async ({ canvasElement }) => {
    // 1. Get the testing canvas (component container)
    const canvas = within(canvasElement);

    // 2. Find elements using Testing Library queries
    const button = canvas.getByRole('button', { name: '+' });
    const counter = canvas.getByTestId('count');

    // 3. Assert initial state
    expect(counter).toHaveTextContent('0');

    // 4. Simulate user interactions
    await userEvent.click(button);
    await userEvent.click(button);

    // 5. Assert final state
    expect(counter).toHaveTextContent('2');
  },
};
