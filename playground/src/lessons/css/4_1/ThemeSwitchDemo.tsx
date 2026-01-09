import { useState } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import themingCode from './examples/Theming.css?raw';

type Theme = 'light' | 'dark';

export default function ThemeSwitchDemo(): React.ReactElement {
  const [theme, setTheme] = useState<Theme>('light');

  const themeVars =
    theme === 'light'
      ? {
          '--bg-primary': '#ffffff',
          '--bg-secondary': '#f1f5f9',
          '--text-primary': '#0f172a',
          '--text-secondary': '#64748b',
          '--accent': '#3b82f6',
          '--border': '#e2e8f0',
        }
      : {
          '--bg-primary': '#0f172a',
          '--bg-secondary': '#1e293b',
          '--text-primary': '#f1f5f9',
          '--text-secondary': '#94a3b8',
          '--accent': '#60a5fa',
          '--border': '#334155',
        };

  const generatedCSS = `/* Current Theme: ${theme} */
:root {
  --bg-primary: ${themeVars['--bg-primary']};
  --bg-secondary: ${themeVars['--bg-secondary']};
  --text-primary: ${themeVars['--text-primary']};
  --text-secondary: ${themeVars['--text-secondary']};
  --accent: ${themeVars['--accent']};
  --border: ${themeVars['--border']};
}`;

  return (
    <div className="card bg-base-200 p-6 border border-base-300">
      {/* Theme Toggle */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-semibold">Live Theme Preview</h4>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="btn btn-primary gap-2"
        >
          {theme === 'light' ? <HiOutlineMoon size={18} /> : <HiOutlineSun size={18} />}
          Switch to {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>

      {/* Preview Container */}
      <div
        className="rounded-xl overflow-hidden border-2 transition-colors duration-300"
        style={
          {
            ...themeVars,
            background: 'var(--bg-primary)',
            borderColor: 'var(--border)',
          } as React.CSSProperties
        }
      >
        {/* Mock Header */}
        <div
          className="px-4 py-3 flex items-center justify-between border-b transition-colors duration-300"
          style={
            {
              background: 'var(--bg-secondary)',
              borderColor: 'var(--border)',
            } as React.CSSProperties
          }
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: 'var(--accent)' }} />
            <span
              className="font-semibold text-sm transition-colors duration-300"
              style={{ color: 'var(--text-primary)' }}
            >
              My App
            </span>
          </div>
          <div className="flex gap-2">
            <span
              className="text-xs transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              Home
            </span>
            <span
              className="text-xs transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              About
            </span>
            <span
              className="text-xs transition-colors duration-300"
              style={{ color: 'var(--accent)' }}
            >
              Contact
            </span>
          </div>
        </div>

        {/* Mock Content */}
        <div className="p-6 space-y-4">
          <h3
            className="text-lg font-bold transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            Welcome to the Dashboard
          </h3>
          <p
            className="text-sm transition-colors duration-300"
            style={{ color: 'var(--text-secondary)' }}
          >
            This entire UI uses CSS variables. Switching themes just changes 6 variable values—no
            individual style changes needed.
          </p>

          {/* Mock Cards */}
          <div className="grid grid-cols-2 gap-3">
            {['Analytics', 'Reports'].map((title) => (
              <div
                key={title}
                className="p-4 rounded-lg border transition-colors duration-300"
                style={
                  {
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                  } as React.CSSProperties
                }
              >
                <h4
                  className="font-medium text-sm mb-1 transition-colors duration-300"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {title}
                </h4>
                <p
                  className="text-xs transition-colors duration-300"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  View all {title.toLowerCase()}
                </p>
              </div>
            ))}
          </div>

          {/* Mock Button */}
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
            style={
              {
                background: 'var(--accent)',
                color: 'var(--bg-primary)',
              } as React.CSSProperties
            }
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Variable Display */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <h5 className="text-sm font-medium mb-3">Current Variable Values</h5>
          <div className="space-y-2">
            {Object.entries(themeVars).map(([name, value]) => (
              <div key={name} className="flex items-center gap-2 text-xs">
                <div
                  className="w-4 h-4 rounded border border-base-300"
                  style={{ background: value }}
                />
                <code className="text-base-content/70">{name}</code>
                <code className="text-base-content/50">{value}</code>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h5 className="text-sm font-medium mb-3">Generated CSS</h5>
          <CodeSnippet language="css" code={generatedCSS} showCopy={false} />
        </div>
      </div>

      {/* Full Code Example */}
      <div className="mt-6">
        <CodeSnippet title="Theme Switching Pattern" language="css" code={themingCode} />
      </div>
    </div>
  );
}
