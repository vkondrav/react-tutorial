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

// Health check endpoint
app.get('/ssr-demo/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n🚀 SSR Demo Server running at http://localhost:${PORT}/ssr-demo`);
  console.log(`   Health check: http://localhost:${PORT}/ssr-demo/health\n`);
});
