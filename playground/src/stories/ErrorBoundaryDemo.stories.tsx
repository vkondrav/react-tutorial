import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryDemo from './ErrorBoundaryDemo';
import ErrorFallback from '../ErrorFallback';

const meta: Meta<typeof ErrorBoundaryDemo> = {
  title: 'Core/ErrorBoundaryDemo',
  component: ErrorBoundaryDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A demo component that can trigger errors to test the ErrorBoundary. Click the button to see how errors are caught and displayed.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          window.location.reload();
        }}
      >
        <Story />
      </ErrorBoundary>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Click the "Trigger Error" button to see the ErrorBoundary in action.
 * The error will be caught and the ErrorFallback component will be displayed.
 */
export const Interactive: Story = {};
