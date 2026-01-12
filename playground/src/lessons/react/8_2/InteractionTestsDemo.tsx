// ============================================
// InteractionTestsDemo: Play Functions and Assertions
// ============================================

import { useState } from 'react';
import {
  HiOutlineCursorClick,
  HiOutlineSearch,
  HiOutlineClock,
  HiOutlineCheck,
} from 'react-icons/hi';
import { CodeSnippet } from '@components';
import playFunctionCode from './examples/PlayFunction.tsx?raw';
import queryMethodsCode from './examples/QueryMethods.tsx?raw';
import asyncTestingCode from './examples/AsyncTesting.tsx?raw';

type TabId = 'basics' | 'queries' | 'async' | 'assertions';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { id: 'basics', label: 'Play Functions', icon: <HiOutlineCursorClick size={16} /> },
  { id: 'queries', label: 'Finding Elements', icon: <HiOutlineSearch size={16} /> },
  { id: 'async', label: 'Async Testing', icon: <HiOutlineClock size={16} /> },
  { id: 'assertions', label: 'Assertions', icon: <HiOutlineCheck size={16} /> },
];

export default function InteractionTestsDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<TabId>('basics');

  return (
    <div className="space-y-4">
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn btn-sm gap-2 ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="card bg-base-300 p-4">
        {activeTab === 'basics' && (
          <div className="space-y-4">
            <p className="text-base-content/80">
              {/* eslint-disable-next-line local/no-raw-code-element */}
              The <code className="bg-base-200 px-1 rounded">play</code> function runs after your
              story renders. It simulates user interactions and verifies the component behaves
              correctly.
            </p>
            <CodeSnippet
              code={playFunctionCode}
              language="typescript"
              title="Counter.stories.tsx"
            />
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-base-200 rounded-lg p-3">
                <h6 className="text-sm font-medium mb-2 text-primary">Key Imports</h6>
                <ul className="text-xs space-y-1 text-base-content/70">
                  <li>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code>within</code> - scopes queries to story
                  </li>
                  <li>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code>userEvent</code> - simulates user actions
                  </li>
                  <li>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code>expect</code> - makes assertions
                  </li>
                </ul>
              </div>
              <div className="bg-base-200 rounded-lg p-3">
                <h6 className="text-sm font-medium mb-2 text-secondary">User Actions</h6>
                <ul className="text-xs space-y-1 text-base-content/70">
                  <li>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code>userEvent.click()</code>
                  </li>
                  <li>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code>userEvent.type()</code>
                  </li>
                  <li>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code>userEvent.hover()</code>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'queries' && (
          <div className="space-y-4">
            <p className="text-base-content/80">
              Use Testing Library queries to find elements the way users would - by role, label, or
              text content rather than CSS selectors.
            </p>
            <CodeSnippet
              code={queryMethodsCode}
              language="typescript"
              title="Query Priority (Best → Last Resort)"
            />
            <div className="bg-success/10 border border-success/30 rounded-lg p-3">
              <p className="text-sm text-success">
                {/* eslint-disable-next-line local/no-raw-code-element */}
                <strong>Best Practice:</strong> Prefer <code>getByRole</code> with accessible names.
                This ensures your components are accessible AND testable.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'async' && (
          <div className="space-y-4">
            <p className="text-base-content/80">
              {/* eslint-disable-next-line local/no-raw-code-element */}
              For components that fetch data or have delayed updates, use <code>waitFor</code> to
              wait for elements to appear or conditions to be true.
            </p>
            <CodeSnippet code={asyncTestingCode} language="typescript" title="Async test example" />
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-3">
              <p className="text-sm text-warning">
                <strong>Important:</strong> Always set a reasonable timeout. Tests should fail fast
                if something is wrong, not hang indefinitely.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'assertions' && (
          <div className="space-y-4">
            <p className="text-base-content/80">
              Assertions verify that your component is in the expected state. Use Jest-DOM matchers
              for readable, semantic assertions.
            </p>
            <div className="grid gap-3">
              <div className="bg-base-200 rounded-lg p-3">
                <h6 className="text-sm font-medium mb-2">Presence</h6>
                <div className="text-xs space-y-1 font-mono">
                  <div>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code className="text-success">expect(el).toBeInTheDocument()</code>
                  </div>
                  <div>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code className="text-error">expect(el).not.toBeInTheDocument()</code>
                  </div>
                </div>
              </div>
              <div className="bg-base-200 rounded-lg p-3">
                <h6 className="text-sm font-medium mb-2">Content</h6>
                <div className="text-xs space-y-1 font-mono">
                  <div>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code className="text-success">expect(el).toHaveTextContent('Hello')</code>
                  </div>
                  <div>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code className="text-success">expect(input).toHaveValue('test')</code>
                  </div>
                </div>
              </div>
              <div className="bg-base-200 rounded-lg p-3">
                <h6 className="text-sm font-medium mb-2">State</h6>
                <div className="text-xs space-y-1 font-mono">
                  <div>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code className="text-success">expect(button).toBeDisabled()</code>
                  </div>
                  <div>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code className="text-error">expect(checkbox).not.toBeChecked()</code>
                  </div>
                  <div>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code className="text-success">expect(el).toHaveClass('active')</code>
                  </div>
                </div>
              </div>
              <div className="bg-base-200 rounded-lg p-3">
                <h6 className="text-sm font-medium mb-2">Collections</h6>
                <div className="text-xs space-y-1 font-mono">
                  <div>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code className="text-success">expect(items).toHaveLength(3)</code>
                  </div>
                  <div>
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code className="text-success">
                      expect(items[0]).toHaveTextContent('First')
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Running Tests */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-3">Running Tests</h4>
        <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-2">
          <div>
            <span className="text-base-content/60"># Run all Storybook tests</span>
          </div>
          <div className="text-success">npm test</div>
          <div className="mt-3">
            <span className="text-base-content/60"># Run tests for a specific lesson</span>
          </div>
          <div className="text-success">npm run test:lesson -- 4_1</div>
          <div className="mt-3">
            <span className="text-base-content/60"># Watch mode (re-runs on changes)</span>
          </div>
          <div className="text-success">npm run test:watch</div>
        </div>
      </div>
    </div>
  );
}
