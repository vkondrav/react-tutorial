// ============================================
// HTML Template for SSR
// ============================================
// Loads template.html and replaces placeholders
// with dynamic content for SSR.
// ============================================

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load HTML template once at startup
const templatePath = join(__dirname, 'template.html');
const htmlTemplate = readFileSync(templatePath, 'utf-8');

export interface TemplateOptions {
  appHtml: string;
  initialData: unknown;
  title: string;
}

/**
 * Creates the HTML shell for SSR.
 *
 * Replaces placeholders in template.html:
 * - {{TITLE}} → Page title
 * - {{APP_HTML}} → Server-rendered React content
 * - {{INITIAL_DATA}} → Serialized data for hydration
 * - {{SSR_TIME}} → Server render timestamp
 */
export function createHtmlTemplate({ appHtml, initialData, title }: TemplateOptions): string {
  // Safely serialize data to prevent XSS
  const serializedData = JSON.stringify(initialData).replace(/</g, '\\u003c');

  return htmlTemplate
    .replace('{{TITLE}}', escapeHtml(title))
    .replace('{{APP_HTML}}', appHtml)
    .replace('"__INITIAL_DATA__"', serializedData)
    .replace('"__SSR_TIME__"', `"${new Date().toISOString()}"`);
}

/**
 * Escapes HTML special characters to prevent XSS.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
