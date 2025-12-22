// ============================================
// MSW Handlers for JSONPlaceholder API
// Mocks all API endpoints used in Lesson 4.1
// ============================================

import { http, HttpResponse, delay } from 'msw';

// Type definitions matching JSONPlaceholder API
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// ============================================
// Mock Data
// ============================================

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: { name: 'Romaguera-Crona' },
    address: { city: 'Gwenborough' },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: { name: 'Deckow-Crist' },
    address: { city: 'Wisokyburgh' },
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    company: { name: 'Romaguera-Jacobson' },
    address: { city: 'McKenziehaven' },
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    phone: '493-170-9623 x156',
    website: 'kale.biz',
    company: { name: 'Robel-Corkery' },
    address: { city: 'South Elvis' },
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    phone: '(254)954-1289',
    website: 'demarco.info',
    company: { name: 'Keebler LLC' },
    address: { city: 'Roscoeview' },
  },
];

const mockTodos: Todo[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Todo item ${i + 1} - ${['Buy groceries', 'Walk the dog', 'Finish homework', 'Call mom', 'Clean room'][i % 5]}`,
  completed: i % 3 === 0,
  userId: (i % 5) + 1,
}));

const mockPhotos: Photo[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  albumId: Math.floor(i / 10) + 1,
  title: `Photo ${i + 1} - Beautiful landscape`,
  url: `https://picsum.photos/seed/${i + 1}/600`,
  thumbnailUrl: `https://picsum.photos/seed/${i + 1}/150`,
}));

const mockComments: Comment[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  postId: Math.floor(i / 5) + 1,
  name: `Comment ${i + 1} - Great insights!`,
  email: `user${i + 1}@example.com`,
  body: `This is a thoughtful comment number ${i + 1}. It provides valuable feedback and constructive criticism.`,
}));

const mockPosts: Post[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  userId: (i % 5) + 1,
  title: `Post ${i + 1}: An interesting article about React`,
  body: `This is the body of post ${i + 1}. It contains valuable information about React development and best practices.`,
}));

// ============================================
// Request Handlers
// ============================================

export const handlers = [
  // GET /users - List all users
  http.get('https://jsonplaceholder.typicode.com/users', async () => {
    await delay(100); // Small delay for realistic feel
    return HttpResponse.json(mockUsers);
  }),

  // GET /users/:id - Single user
  http.get('https://jsonplaceholder.typicode.com/users/:id', async ({ params }) => {
    await delay(100);
    const id = Number(params.id);
    const user = mockUsers.find((u) => u.id === id);
    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(user);
  }),

  // GET /todos - List all todos
  http.get('https://jsonplaceholder.typicode.com/todos', async () => {
    await delay(100);
    return HttpResponse.json(mockTodos);
  }),

  // GET /todos/:id - Single todo
  http.get('https://jsonplaceholder.typicode.com/todos/:id', async ({ params }) => {
    await delay(100);
    const id = Number(params.id);
    const todo = mockTodos.find((t) => t.id === id) || {
      id,
      title: `Random todo ${id}`,
      completed: id % 2 === 0,
      userId: (id % 5) + 1,
    };
    return HttpResponse.json(todo);
  }),

  // GET /photos - List photos with optional albumId filter
  http.get('https://jsonplaceholder.typicode.com/photos', async ({ request }) => {
    await delay(100);
    const url = new URL(request.url);
    const albumId = url.searchParams.get('albumId');
    const limit = url.searchParams.get('_limit');

    let photos = mockPhotos;

    if (albumId) {
      photos = photos.filter((p) => p.albumId === Number(albumId));
    }

    if (limit) {
      photos = photos.slice(0, Number(limit));
    }

    return HttpResponse.json(photos);
  }),

  // GET /posts/:id/comments - Comments for a post
  http.get('https://jsonplaceholder.typicode.com/posts/:postId/comments', async ({ params }) => {
    await delay(100);
    const postId = Number(params.postId);
    const comments = mockComments.filter((c) => c.postId === postId);
    return HttpResponse.json(comments);
  }),

  // GET /posts/:id - Single post
  http.get('https://jsonplaceholder.typicode.com/posts/:id', async ({ params }) => {
    await delay(100);
    const id = Number(params.id);
    const post = mockPosts.find((p) => p.id === id) || {
      id,
      userId: (id % 5) + 1,
      title: `Post ${id}: An interesting article`,
      body: `This is the body of post ${id}.`,
    };
    return HttpResponse.json(post);
  }),
];

// ============================================
// Handlers with configurable delays (for testing loading states)
// ============================================

export const createDelayedHandlers = (delayMs: number) => [
  http.get('https://jsonplaceholder.typicode.com/users', async () => {
    await delay(delayMs);
    return HttpResponse.json(mockUsers);
  }),
  http.get('https://jsonplaceholder.typicode.com/users/:id', async ({ params }) => {
    await delay(delayMs);
    const id = Number(params.id);
    const user = mockUsers.find((u) => u.id === id);
    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(user);
  }),
];

// ============================================
// Error handlers (for testing error states)
// ============================================

export const errorHandlers = [
  http.get('https://jsonplaceholder.typicode.com/users', async () => {
    await delay(100);
    return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
  }),
];

// Export mock data for assertions
export { mockUsers, mockTodos, mockPhotos, mockComments, mockPosts };
