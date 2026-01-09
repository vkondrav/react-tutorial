import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, waitFor } from 'storybook/test';
import Lesson from '@lessons/css/4_1';

const meta: Meta<typeof Lesson> = {
  title: 'Lessons/css-4.1/Lesson',
  component: Lesson,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof Lesson>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check lesson header
    await waitFor(() => {
      expect(canvas.getByText('CSS Variables')).toBeInTheDocument();
    });

    // Check all sections are present
    expect(canvas.getByText('The Big Idea')).toBeInTheDocument();
    expect(canvas.getByText(/Scope: Global vs Local/)).toBeInTheDocument();
    expect(canvas.getByText(/Theming with CSS Variables/)).toBeInTheDocument();
    expect(canvas.getByText(/Calculations with calc/)).toBeInTheDocument();
    expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();
  },
};

export const AllDemosRendered: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check VariableScopeDemo elements - use button role for unique match
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Global Scope (:root)' })).toBeInTheDocument();
    });

    // Check ThemeSwitchDemo elements
    expect(canvas.getByText('Live Theme Preview')).toBeInTheDocument();

    // Check CalcDemo elements
    expect(canvas.getByText('Adjust Variables')).toBeInTheDocument();
  },
};

export const TakeawaysList: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check key takeaways are present
    await waitFor(() => {
      expect(canvas.getByText(/Declare with --name: value/)).toBeInTheDocument();
    });
    expect(canvas.getByText(/:root variables are global/)).toBeInTheDocument();
    expect(canvas.getByText(/Variables cascade/)).toBeInTheDocument();
    expect(canvas.getByText(/calc\(\) works with variables/)).toBeInTheDocument();
  },
};
