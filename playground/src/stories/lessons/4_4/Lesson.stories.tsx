import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, waitFor } from 'storybook/test';
import Lesson4_4 from '@lessons/4_4';
import { handlers } from '@mocks/handlers';

const meta: Meta<typeof Lesson4_4> = {
  title: 'Lessons/4.4/Lesson',
  component: Lesson4_4,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Lesson 4.4: Building a Custom useFetch Hook - Complete lesson covering why to build useFetch, step-by-step implementation, TypeScript generics, and React 19 Suspense approach.',
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
 * Full lesson page with all sections
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify lesson header is present
    expect(canvas.getByText('Building a Custom useFetch Hook')).toBeInTheDocument();

    // Verify all main sections are present
    expect(canvas.getByText('Why Build a useFetch Hook?')).toBeInTheDocument();
    expect(canvas.getByText('Building useFetch Step by Step')).toBeInTheDocument();
    expect(canvas.getByText('Generic useFetch with TypeScript')).toBeInTheDocument();
    expect(canvas.getByText('React 19: The Suspense Approach')).toBeInTheDocument();
    expect(canvas.getByText('useEffect vs Suspense: When to Use Which')).toBeInTheDocument();
    expect(canvas.getByText('useFetch Playground')).toBeInTheDocument();
    expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();
  },
};

/**
 * Verify all takeaways are displayed
 */
export const Takeaways: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for content to load and verify key takeaways section
    await waitFor(() => {
      expect(canvas.getByText('Key Takeaways')).toBeInTheDocument();
    });

    // Verify some takeaway items are present
    expect(canvas.getByText(/useFetch extracts repetitive fetch logic/)).toBeInTheDocument();
    expect(canvas.getByText(/Always clean up with AbortController/)).toBeInTheDocument();
  },
};

/**
 * Verify useEffect vs Suspense comparison section
 */
export const Comparison: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify comparison section
    expect(canvas.getByText('useEffect Pattern')).toBeInTheDocument();
    expect(canvas.getByText('Suspense Pattern')).toBeInTheDocument();

    // Verify pros are listed
    expect(canvas.getByText('Works in all React versions')).toBeInTheDocument();
    expect(canvas.getByText(/Declarative, less boilerplate/)).toBeInTheDocument();

    // Verify recommendation
    expect(canvas.getByText(/Recommendation:/)).toBeInTheDocument();
  },
};
