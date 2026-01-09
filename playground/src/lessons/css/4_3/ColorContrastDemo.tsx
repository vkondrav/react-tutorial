import { useState } from 'react';
import { CodeSnippet } from '@components';
import { HiOutlineCheck, HiOutlineX, HiOutlineExclamation } from 'react-icons/hi';
import contrastCode from './examples/ColorContrast.css?raw';

// Calculate relative luminance (WCAG formula)
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio
function getContrastRatio(hex1: string, hex2: string): number {
  const parseHex = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const c1 = parseHex(hex1);
  const c2 = parseHex(hex2);

  const l1 = getLuminance(c1.r, c1.g, c1.b);
  const l2 = getLuminance(c2.r, c2.g, c2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

interface ContrastLevel {
  label: string;
  ratio: number;
  description: string;
}

const levels: ContrastLevel[] = [
  { label: 'AA Large', ratio: 3.0, description: 'Large text (18pt+ or 14pt bold)' },
  { label: 'AA Normal', ratio: 4.5, description: 'Normal text (body copy)' },
  { label: 'AAA Large', ratio: 4.5, description: 'Large text, enhanced' },
  { label: 'AAA Normal', ratio: 7.0, description: 'Normal text, enhanced' },
];

const presets = [
  { name: 'Good', fg: '#1a1a1a', bg: '#ffffff', note: 'Black on white (21:1)' },
  { name: 'AA Pass', fg: '#767676', bg: '#ffffff', note: 'Gray on white (4.54:1)' },
  { name: 'AA Fail', fg: '#999999', bg: '#ffffff', note: 'Light gray on white (2.85:1)' },
  { name: 'Brand', fg: '#1d4ed8', bg: '#ffffff', note: 'Blue on white (8.59:1)' },
  { name: 'Warning', fg: '#b45309', bg: '#fffbeb', note: 'Orange on cream (5.07:1)' },
  {
    name: 'Danger',
    fg: '#ef4444',
    bg: '#ffffff',
    note: 'Bright red on white (3.91:1) - Large text only',
  },
];

export default function ColorContrastDemo(): React.ReactElement {
  const [foreground, setForeground] = useState('#1a1a1a');
  const [background, setBackground] = useState('#ffffff');
  const [showCode, setShowCode] = useState(false);

  const ratio = getContrastRatio(foreground, background);
  const passesAALarge = ratio >= 3.0;
  const passesAANormal = ratio >= 4.5;
  const passesAAANormal = ratio >= 7.0;

  return (
    <div className="card bg-base-200 p-6 border border-base-300">
      {/* Preset Quick Picks */}
      <div className="mb-6">
        <h4 className="font-semibold text-base-content mb-3 text-sm">Quick Presets</h4>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setForeground(preset.fg);
                setBackground(preset.bg);
              }}
              className="btn btn-sm btn-ghost"
              title={preset.note}
            >
              <span
                className="w-4 h-4 rounded-full border border-base-content/20 mr-1"
                style={{ backgroundColor: preset.bg }}
              />
              <span
                className="w-4 h-4 rounded-full border border-base-content/20 mr-2"
                style={{ backgroundColor: preset.fg }}
              />
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Color Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Text Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="w-12 h-12 rounded cursor-pointer border-0"
            />
            <input
              type="text"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="input input-bordered input-sm font-mono w-28"
              pattern="^#[0-9A-Fa-f]{6}$"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Background Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-12 h-12 rounded cursor-pointer border-0"
            />
            <input
              type="text"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="input input-bordered input-sm font-mono w-28"
              pattern="^#[0-9A-Fa-f]{6}$"
            />
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div
        className="rounded-lg p-6 mb-6 transition-colors"
        style={{ backgroundColor: background }}
      >
        <p className="text-2xl font-bold mb-2" style={{ color: foreground }}>
          Sample Heading
        </p>
        <p className="text-base mb-4" style={{ color: foreground }}>
          This is body text. Can you read it comfortably? If not, the contrast ratio is too low.
        </p>
        <p className="text-sm" style={{ color: foreground }}>
          This is small text. It requires a higher contrast ratio (4.5:1 minimum) because it's
          harder to read.
        </p>
      </div>

      {/* Contrast Ratio Result */}
      <div className="bg-base-300 rounded-lg p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">{ratio.toFixed(2)}</div>
            <div className="text-sm text-base-content/50">:1 Ratio</div>
          </div>

          <div className="flex-1 min-w-[200px]">
            {/* WCAG Level Checks */}
            <div className="space-y-2">
              {levels.map((level) => {
                const passes = ratio >= level.ratio;
                return (
                  <div
                    key={level.label}
                    className={`flex items-center gap-2 text-sm ${
                      passes ? 'text-success' : 'text-error'
                    }`}
                  >
                    {passes ? <HiOutlineCheck size={16} /> : <HiOutlineX size={16} />}
                    <span className="font-medium">{level.label}</span>
                    <span className="text-base-content/50">({level.ratio}:1)</span>
                    <span className="text-xs text-base-content/40 hidden sm:inline">
                      — {level.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Overall Verdict */}
        <div
          className={`rounded-lg p-4 ${
            passesAAANormal
              ? 'bg-success/10'
              : passesAANormal
                ? 'bg-primary/10'
                : passesAALarge
                  ? 'bg-warning/10'
                  : 'bg-error/10'
          }`}
        >
          <div className="flex items-center gap-2">
            {passesAAANormal ? (
              <>
                <HiOutlineCheck className="text-success" size={20} />
                <span className="font-semibold text-success">Excellent Contrast</span>
              </>
            ) : passesAANormal ? (
              <>
                <HiOutlineCheck className="text-primary" size={20} />
                <span className="font-semibold text-primary">Passes WCAG AA</span>
              </>
            ) : passesAALarge ? (
              <>
                <HiOutlineExclamation className="text-warning" size={20} />
                <span className="font-semibold text-warning">Large Text Only</span>
              </>
            ) : (
              <>
                <HiOutlineX className="text-error" size={20} />
                <span className="font-semibold text-error">Fails WCAG Requirements</span>
              </>
            )}
          </div>
          <p className="text-sm text-base-content/70 mt-1">
            {passesAAANormal
              ? 'This combination works for all text sizes and meets enhanced (AAA) accessibility.'
              : passesAANormal
                ? 'This combination is accessible for all text sizes at AA level.'
                : passesAALarge
                  ? 'Only use this for large headings (18pt+ or 14pt bold). Body text needs more contrast.'
                  : 'This combination is not accessible. Increase the contrast by darkening the text or lightening the background.'}
          </p>
        </div>
      </div>

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-ghost mb-4">
        {showCode ? 'Hide' : 'Show'} CSS Examples
      </button>

      {showCode && (
        <CodeSnippet title="Color Contrast Best Practices" language="css" code={contrastCode} />
      )}
    </div>
  );
}
