// ============================================
// PseudoDemo - Pseudo-classes vs Pseudo-elements
// ============================================

import { useState } from 'react';
import { CodeSnippet } from '../../components';
import pseudoClassesCode from './examples/PseudoClassesCode.css?raw';
import pseudoElementsCode from './examples/PseudoElementsCode.css?raw';
import tooltipCode from './examples/TooltipCode.css?raw';

export default function PseudoDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<'classes' | 'elements' | 'exercise'>('classes');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="tabs tabs-boxed bg-base-200 p-1">
        <button
          className={`tab flex-1 ${activeTab === 'classes' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('classes')}
        >
          :pseudo-classes
        </button>
        <button
          className={`tab flex-1 ${activeTab === 'elements' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('elements')}
        >
          ::pseudo-elements
        </button>
        <button
          className={`tab flex-1 ${activeTab === 'exercise' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('exercise')}
        >
          🎯 Tooltip Exercise
        </button>
      </div>

      {/* Pseudo-classes Tab */}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <p className="text-sm">
              <strong className="text-primary">Pseudo-classes</strong> use a{' '}
              <strong>single colon</strong> and select elements based on their{' '}
              <strong>state</strong> or <strong>position</strong> in the DOM.
            </p>
          </div>

          <CodeSnippet code={pseudoClassesCode} language="css" title="Common Pseudo-classes" />

          {/* Interactive Examples */}
          <div className="bg-base-200 rounded-xl p-6">
            <h4 className="font-semibold mb-4 text-sm text-base-content/70">Try them:</h4>
            <div className="space-y-4">
              {/* Hover Example */}
              <div>
                <p className="text-sm text-base-content/60 mb-2">:hover</p>
                <button className="btn btn-outline hover:btn-primary transition-all">
                  Hover me!
                </button>
              </div>

              {/* Focus Example */}
              <div>
                <p className="text-sm text-base-content/60 mb-2">:focus</p>
                <input
                  type="text"
                  placeholder="Click or tab here..."
                  className="input input-bordered w-full max-w-xs focus:input-primary focus:outline-none"
                />
              </div>

              {/* nth-child Example */}
              <div>
                <p className="text-sm text-base-content/60 mb-2">:nth-child(odd)</p>
                <ul className="space-y-1">
                  {['First item', 'Second item', 'Third item', 'Fourth item'].map((item, i) => (
                    <li
                      key={i}
                      className={`px-4 py-2 rounded ${i % 2 === 0 ? 'bg-base-300' : 'bg-base-100'}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pseudo-elements Tab */}
      {activeTab === 'elements' && (
        <div className="space-y-6">
          <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
            <p className="text-sm">
              <strong className="text-secondary">Pseudo-elements</strong> use a{' '}
              <strong>double colon</strong> and create <strong>virtual elements</strong> that don't
              exist in your HTML.
            </p>
          </div>

          <CodeSnippet code={pseudoElementsCode} language="css" title="Common Pseudo-elements" />

          {/* Interactive Examples */}
          <div className="bg-base-200 rounded-xl p-6">
            <h4 className="font-semibold mb-4 text-sm text-base-content/70">See them in action:</h4>
            <div className="space-y-6">
              {/* ::before / ::after */}
              <div>
                <p className="text-sm text-base-content/60 mb-2">::before and ::after</p>
                <blockquote
                  className="text-lg italic text-base-content/80"
                  style={{
                    position: 'relative',
                    paddingLeft: '2rem',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '-0.5rem',
                      fontSize: '3rem',
                      color: 'oklch(var(--p))',
                      opacity: 0.3,
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    "
                  </span>
                  CSS is awesome!
                  <span
                    style={{
                      fontSize: '3rem',
                      color: 'oklch(var(--p))',
                      opacity: 0.3,
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    "
                  </span>
                </blockquote>
              </div>

              {/* ::first-letter */}
              <div>
                <p className="text-sm text-base-content/60 mb-2">::first-letter</p>
                <p className="text-base-content/80">
                  <span
                    className="float-left text-4xl font-bold mr-2 text-primary"
                    style={{ lineHeight: '1' }}
                  >
                    O
                  </span>
                  nce upon a time, CSS was just for colors and fonts. Now it can create entire
                  layouts, animations, and interactive experiences.
                </p>
              </div>

              {/* ::selection */}
              <div>
                <p className="text-sm text-base-content/60 mb-2">
                  ::selection (try selecting this text)
                </p>
                <p
                  className="text-base-content/80"
                  style={
                    {
                      // Custom selection color via inline styles for demo
                    }
                  }
                >
                  <span className="[&::selection]:bg-primary [&::selection]:text-primary-content">
                    Select this text to see the custom selection color! The ::selection
                    pseudo-element lets you style highlighted text.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tooltip Exercise Tab */}
      {activeTab === 'exercise' && (
        <div className="space-y-6">
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <p className="text-sm">
              <strong className="text-accent">Challenge:</strong> Build a CSS-only tooltip using{' '}
              <code className="bg-base-200 px-1 rounded">data-*</code> attributes and{' '}
              <code className="bg-base-200 px-1 rounded">::after</code>.
            </p>
          </div>

          <CodeSnippet code={tooltipCode} language="css" title="Tooltip CSS Pattern" />

          {/* Live Example */}
          <div className="bg-base-200 rounded-xl p-6">
            <h4 className="font-semibold mb-4 text-sm text-base-content/70">Live Result:</h4>
            <p className="text-base-content/80">
              Hover over the{' '}
              <span
                className="relative cursor-help border-b border-dotted border-primary text-primary
                  after:content-[attr(data-tooltip)]
                  after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2
                  after:px-3 after:py-2 after:bg-neutral after:text-neutral-content
                  after:rounded-lg after:text-sm after:whitespace-nowrap
                  after:opacity-0 after:pointer-events-none after:transition-opacity
                  hover:after:opacity-100 after:mb-2"
                data-tooltip="I'm a CSS-only tooltip! 🎉"
              >
                underlined text
              </span>{' '}
              to see the tooltip.
            </p>
          </div>

          {/* How it Works */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base-content">How it works:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-base-200 rounded-lg p-4">
                <h5 className="font-medium text-primary mb-2">1. HTML Setup</h5>
                <code className="text-sm bg-base-300 px-2 py-1 rounded block">
                  {'<span data-tooltip="Hello!">Text</span>'}
                </code>
              </div>
              <div className="bg-base-200 rounded-lg p-4">
                <h5 className="font-medium text-primary mb-2">2. Read with attr()</h5>
                <code className="text-sm bg-base-300 px-2 py-1 rounded block">
                  content: attr(data-tooltip);
                </code>
              </div>
              <div className="bg-base-200 rounded-lg p-4">
                <h5 className="font-medium text-primary mb-2">3. Position absolutely</h5>
                <code className="text-sm bg-base-300 px-2 py-1 rounded block">
                  position: absolute; bottom: 100%;
                </code>
              </div>
              <div className="bg-base-200 rounded-lg p-4">
                <h5 className="font-medium text-primary mb-2">4. Show on hover</h5>
                <code className="text-sm bg-base-300 px-2 py-1 rounded block">
                  .tooltip:hover::after {'{ opacity: 1; }'}
                </code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Reference */}
      <div className="overflow-x-auto">
        <table className="table table-sm bg-base-200 rounded-xl">
          <thead>
            <tr>
              <th>Type</th>
              <th>Syntax</th>
              <th>Purpose</th>
              <th>Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-primary">Pseudo-class</td>
              <td>
                <code>:name</code>
              </td>
              <td>Select by state/position</td>
              <td>
                <code>:hover, :focus, :first-child</code>
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-secondary">Pseudo-element</td>
              <td>
                <code>::name</code>
              </td>
              <td>Create virtual elements</td>
              <td>
                <code>::before, ::after, ::first-letter</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
