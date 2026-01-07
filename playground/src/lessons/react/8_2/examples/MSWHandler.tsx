// @ts-nocheck
// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw';

// Define your API mock handlers
export const handlers = [
  // GET request handler
  http.get('https://api.example.com/users', async () => {
    await delay(100); // Simulate network latency
    return HttpResponse.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  }),

  // POST request handler
  http.post('https://api.example.com/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: 3, ...body }, { status: 201 });
  }),

  // Error simulation
  http.get('https://api.example.com/error', () => {
    return new HttpResponse(null, { status: 500 });
  }),
];
