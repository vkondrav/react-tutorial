// ============================================
// SSR Client Entry Point - Hydration
// ============================================
// This file runs in the browser and "hydrates"
// the server-rendered HTML, making it interactive.
// ============================================

import { hydrateRoot } from 'react-dom/client';
import { SSRDemoApp } from '../shared/SSRDemoApp';
import './ssr-client.css';

// Extend Window to include our SSR data
declare global {
  interface Window {
    __INITIAL_DATA__: {
      title: string;
      user: { id: number; name: string; email: string };
      posts: Array<{ id: number; title: string; body: string }>;
      serverTime: string;
    };
    __SSR_TIME__: string;
  }
}

// Grab the data that was serialized by the server
const initialData = window.__INITIAL_DATA__;

console.log('🚀 Hydrating React app...');
console.log('📦 Server data:', initialData);
console.log('⏰ Server rendered at:', window.__SSR_TIME__);

// Get the root element that contains server-rendered HTML
const rootElement = document.getElementById('ssr-root');

if (!rootElement) {
  throw new Error('Could not find #ssr-root element');
}

// Hydrate - attach React to existing HTML
// Unlike createRoot, this preserves the existing DOM
hydrateRoot(rootElement, <SSRDemoApp initialData={initialData} />);

console.log('✅ Hydration complete! The app is now interactive.');
