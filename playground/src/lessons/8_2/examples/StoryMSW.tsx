// @ts-nocheck
import { http, HttpResponse, delay } from 'msw';
import { handlers } from '@mocks/handlers';

// Story with default handlers
export const Default: Story = {
  parameters: {
    msw: {
      handlers, // Use the default handlers
    },
  },
};

// Story that overrides handlers to test loading state
export const LoadingState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.example.com/users', async () => {
          await delay('infinite'); // Never resolves - keeps loading
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};

// Story that simulates an error
export const ErrorState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.example.com/users', () => {
          return new HttpResponse(null, { status: 500 });
        }),
      ],
    },
  },
};
