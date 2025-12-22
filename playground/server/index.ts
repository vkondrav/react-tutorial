// ============================================
// SSR Demo Server
// ============================================
// A minimal Express server that demonstrates
// server-side rendering with React.
// ============================================

import express, { Request, Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderApp } from './render.js';
import { renderRSCDemo } from './rsc-render.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

// Serve static assets from the SSR client build
app.use('/ssr-assets', express.static(path.join(__dirname, '../dist-ssr')));

// SSR Demo route - this is where the magic happens!
app.get('/ssr-demo', async (_req: Request, res: Response) => {
  try {
    const html = await renderApp();
    res.status(200).set('Content-Type', 'text/html').send(html);
  } catch (error) {
    console.error('SSR Error:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head><title>SSR Error</title></head>
        <body>
          <h1>Server Rendering Error</h1>
          <pre>${error instanceof Error ? error.message : 'Unknown error'}</pre>
        </body>
      </html>
    `);
  }
});

// RSC Demo route - simulates React Server Components
app.get('/rsc-demo', async (_req: Request, res: Response) => {
  try {
    const html = await renderRSCDemo();
    res.status(200).set('Content-Type', 'text/html').send(html);
  } catch (error) {
    console.error('RSC Demo Error:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head><title>RSC Error</title></head>
        <body style="background: #1f2937; color: #f3f4f6; font-family: system-ui; padding: 2rem;">
          <h1 style="color: #ef4444;">RSC Demo Error</h1>
          <pre style="background: #111827; padding: 1rem; border-radius: 0.5rem;">${error instanceof Error ? error.message : 'Unknown error'}</pre>
        </body>
      </html>
    `);
  }
});

// Health check endpoint
app.get('/ssr-demo/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// RSC health check
app.get('/rsc-demo/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', type: 'rsc-demo', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n🚀 SSR Demo Server running at http://localhost:${PORT}/ssr-demo`);
  console.log(`🔮 RSC Demo Server running at http://localhost:${PORT}/rsc-demo`);
  console.log(`   Health check: http://localhost:${PORT}/ssr-demo/health\n`);
});
