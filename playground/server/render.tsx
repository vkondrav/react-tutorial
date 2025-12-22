// ============================================
// SSR Rendering Logic
// ============================================
// This file handles the actual React-to-HTML
// conversion using renderToString.
// ============================================

import React from 'react';
import { renderToString } from 'react-dom/server';
import { SSRDemoApp } from '../shared/SSRDemoApp.js';
import { createHtmlTemplate } from './template.js';

// Types for the data we'll fetch on the server
export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface PageData {
  title: string;
  user: User;
  posts: Post[];
  serverTime: string;
}

/**
 * Renders the React app to an HTML string.
 * This is the core of SSR!
 */
export async function renderApp(): Promise<string> {
  // Step 1: Fetch data on the server
  // In a real app, this would hit a database or API
  const data = await fetchDataOnServer();

  // Step 2: Render React to HTML string
  // This is synchronous - React converts JSX → HTML
  const appHtml = renderToString(<SSRDemoApp initialData={data} />);

  // Step 3: Create the full HTML document
  // We embed the data so the client can hydrate
  return createHtmlTemplate({
    appHtml,
    initialData: data,
    title: data.title,
  });
}

/**
 * Simulates fetching data on the server.
 * In production, this would query databases, call APIs, etc.
 */
async function fetchDataOnServer(): Promise<PageData> {
  // Simulate network latency (100-300ms)
  const delay = 100 + Math.random() * 200;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Return mock data (in production, fetch from real sources)
  return {
    title: 'SSR Demo - Server Rendered!',
    user: {
      id: 1,
      name: 'Alex Developer',
      email: 'alex@example.com',
    },
    posts: [
      {
        id: 1,
        title: 'Understanding Server-Side Rendering',
        body: 'SSR sends pre-rendered HTML to the browser...',
      },
      {
        id: 2,
        title: 'Hydration: Making HTML Interactive',
        body: 'After SSR, React attaches event handlers...',
      },
      {
        id: 3,
        title: 'When to Use SSR vs CSR',
        body: 'Choose SSR for SEO, faster initial paint...',
      },
    ],
    serverTime: new Date().toISOString(),
  };
}
