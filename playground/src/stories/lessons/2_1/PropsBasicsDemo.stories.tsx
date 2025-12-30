import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import PropsBasicsDemo from '@lessons/2_1/PropsBasicsDemo';

const meta: Meta<typeof PropsBasicsDemo> = {
  title: 'Lessons/2.1/PropsBasicsDemo',
  component: PropsBasicsDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Introduction to props - shows how data flows from parent to child components with interactive name and age inputs.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view with Alice, age 28
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show default values
    expect(canvas.getByDisplayValue('Alice')).toBeInTheDocument();
    expect(canvas.getByDisplayValue('28')).toBeInTheDocument();

    // Should display in the live result
    expect(canvas.getByText('Hello, Alice!')).toBeInTheDocument();
    expect(canvas.getByText('Age: 28')).toBeInTheDocument();
  },
};

/**
 * Tests changing the name prop
 */
export const ChangeName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the name input
    const nameInput = canvas.getByDisplayValue('Alice');

    // Change the name
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Bob');

    // Should update the live result
    expect(canvas.getByText('Hello, Bob!')).toBeInTheDocument();
  },
};

/**
 * Tests changing the age prop
 */
export const ChangeAge: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the age input
    const ageInput = canvas.getByDisplayValue('28');

    // Change the age
    await userEvent.clear(ageInput);
    await userEvent.type(ageInput, '35');

    // Should update the live result
    expect(canvas.getByText('Age: 35')).toBeInTheDocument();
  },
};

/**
 * Tests empty name shows fallback
 */
export const EmptyName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and clear the name input
    const nameInput = canvas.getByDisplayValue('Alice');
    await userEvent.clear(nameInput);

    // Should show fallback text
    expect(canvas.getByText('Hello, friend!')).toBeInTheDocument();
  },
};

/**
 * Tests changing both name and age
 */
export const ChangeBoth: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Change name
    const nameInput = canvas.getByDisplayValue('Alice');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Charlie');

    // Change age
    const ageInput = canvas.getByDisplayValue('28');
    await userEvent.clear(ageInput);
    await userEvent.type(ageInput, '42');

    // Both should update
    expect(canvas.getByText('Hello, Charlie!')).toBeInTheDocument();
    expect(canvas.getByText('Age: 42')).toBeInTheDocument();
  },
};

/**
 * Tests the one-way data flow explanation is visible
 */
export const ShowsOneWayFlow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the explanation
    expect(canvas.getByText(/one way/i)).toBeInTheDocument();
    expect(canvas.getByText(/from parent to child/i)).toBeInTheDocument();
  },
};
