import { useState } from 'react';
import { CodeSnippet } from '@components';
import {
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineVolumeUp,
  HiOutlineSearch,
  HiOutlineHome,
  HiOutlineMenu,
} from 'react-icons/hi';
import srOnlyCode from './examples/VisuallyHidden.css?raw';

type HidingMethod = 'sr-only' | 'display-none' | 'visibility-hidden' | 'aria-hidden';

interface MethodInfo {
  name: string;
  code: string;
  visible: boolean;
  screenReader: boolean;
  description: string;
  useCase: string;
}

const methods: Record<HidingMethod, MethodInfo> = {
  'sr-only': {
    name: 'Visually Hidden (sr-only)',
    code: '.sr-only { position: absolute; width: 1px; ... }',
    visible: false,
    screenReader: true,
    description: 'Hidden from sight but read by screen readers.',
    useCase: 'Skip links, icon button labels, additional context for screen readers.',
  },
  'display-none': {
    name: 'display: none',
    code: 'display: none;',
    visible: false,
    screenReader: false,
    description: 'Completely removed from the page. Hidden from everyone.',
    useCase: 'Content that should not exist for anyone (collapsed sections, unrendered content).',
  },
  'visibility-hidden': {
    name: 'visibility: hidden',
    code: 'visibility: hidden;',
    visible: false,
    screenReader: false,
    description: 'Invisible but still takes up space. Hidden from screen readers.',
    useCase: 'Placeholder space, transitions where you need to maintain layout.',
  },
  'aria-hidden': {
    name: 'aria-hidden="true"',
    code: '<span aria-hidden="true">👍</span>',
    visible: true,
    screenReader: false,
    description: 'Visible but hidden from screen readers.',
    useCase: 'Decorative icons, duplicate content, visual-only elements.',
  },
};

export default function VisuallyHiddenDemo(): React.ReactElement {
  const [activeMethod, setActiveMethod] = useState<HidingMethod>('sr-only');
  const [showCode, setShowCode] = useState(false);

  const current = methods[activeMethod];

  return (
    <div className="card bg-base-200 p-6 border border-base-300">
      {/* Method Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(methods) as HidingMethod[]).map((method) => (
          <button
            key={method}
            onClick={() => setActiveMethod(method)}
            className={`btn btn-sm ${activeMethod === method ? 'btn-primary' : 'btn-ghost'}`}
          >
            {methods[method].name}
          </button>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto mb-6">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Method</th>
              <th className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <HiOutlineEye size={16} />
                  Visible
                </div>
              </th>
              <th className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <HiOutlineVolumeUp size={16} />
                  Screen Reader
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {(Object.entries(methods) as [HidingMethod, MethodInfo][]).map(([key, method]) => (
              <tr
                key={key}
                className={`${activeMethod === key ? 'bg-primary/10' : ''} cursor-pointer`}
                onClick={() => setActiveMethod(key)}
              >
                <td className="font-mono text-sm">{method.name}</td>
                <td className="text-center">
                  {method.visible ? (
                    <HiOutlineCheck className="text-success inline" size={18} />
                  ) : (
                    <HiOutlineX className="text-error inline" size={18} />
                  )}
                </td>
                <td className="text-center">
                  {method.screenReader ? (
                    <HiOutlineCheck className="text-success inline" size={18} />
                  ) : (
                    <HiOutlineX className="text-error inline" size={18} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Active Method Details */}
      <div className="bg-base-300 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <code className="bg-base-200 px-2 py-1 rounded text-sm font-mono">{current.code}</code>
        </div>
        <p className="text-sm text-base-content/70 mb-2">{current.description}</p>
        <p className="text-sm">
          <strong className="text-primary">Use case:</strong>{' '}
          <span className="text-base-content/70">{current.useCase}</span>
        </p>
      </div>

      {/* Live Examples */}
      <div className="bg-base-300 rounded-lg p-6 mb-6">
        <h4 className="font-semibold text-base-content mb-4 text-sm">Common sr-only Patterns</h4>

        <div className="space-y-4">
          {/* Skip Link Example */}
          <div className="border border-base-content/10 rounded-lg p-4">
            <h5 className="text-sm font-medium mb-2">Skip Link</h5>
            <p className="text-xs text-base-content/50 mb-3">
              Hidden until focused via keyboard. Try pressing Tab!
            </p>
            <div className="relative">
              <a
                href="#main-content"
                className="absolute px-4 py-2 bg-primary text-primary-content rounded font-medium
                           -translate-y-full opacity-0 focus:translate-y-0 focus:opacity-100
                           transition-all duration-200"
                onClick={(e) => e.preventDefault()}
              >
                Skip to main content
              </a>
              <div className="h-10 flex items-center text-sm text-base-content/50">
                ↑ Skip link appears above when focused
              </div>
            </div>
          </div>

          {/* Icon Button Example */}
          <div className="border border-base-content/10 rounded-lg p-4">
            <h5 className="text-sm font-medium mb-2">Icon Buttons with Hidden Labels</h5>
            <p className="text-xs text-base-content/50 mb-3">
              Screen readers announce the hidden text. Visual users see only icons.
            </p>
            <div className="flex gap-2">
              <button className="btn btn-square btn-ghost">
                <HiOutlineHome size={20} />
                <span className="sr-only">Go to home page</span>
              </button>
              <button className="btn btn-square btn-ghost">
                <HiOutlineSearch size={20} />
                <span className="sr-only">Open search</span>
              </button>
              <button className="btn btn-square btn-ghost">
                <HiOutlineMenu size={20} />
                <span className="sr-only">Open menu</span>
              </button>
            </div>
            <p className="text-xs text-base-content/50 mt-2">
              Each button has{' '}
              <code className="bg-base-200 px-1 rounded">&lt;span className="sr-only"&gt;</code>{' '}
              inside for screen readers.
            </p>
          </div>

          {/* Decorative vs Meaningful */}
          <div className="border border-base-content/10 rounded-lg p-4">
            <h5 className="text-sm font-medium mb-2">Hiding Decorative Content</h5>
            <p className="text-xs text-base-content/50 mb-3">
              Use aria-hidden for purely decorative elements so screen readers skip them.
            </p>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="text-2xl">
                🎉
              </span>
              <span>Congratulations on completing the course!</span>
            </div>
            <p className="text-xs text-base-content/50 mt-2">
              The emoji has <code className="bg-base-200 px-1 rounded">aria-hidden="true"</code> —
              screen readers will only announce the text.
            </p>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="alert mb-6">
        <HiOutlineEyeOff size={20} />
        <div>
          <h4 className="font-semibold">When to use sr-only</h4>
          <p className="text-sm">
            Only hide content that would be{' '}
            <strong>redundant or confusing for sighted users</strong> but helpful for screen reader
            users. Don't hide important information from anyone.
          </p>
        </div>
      </div>

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-ghost mb-4">
        {showCode ? 'Hide' : 'Show'} CSS Code
      </button>

      {showCode && <CodeSnippet title="Visually Hidden Pattern" language="css" code={srOnlyCode} />}
    </div>
  );
}
