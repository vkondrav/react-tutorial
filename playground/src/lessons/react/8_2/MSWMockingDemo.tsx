// ============================================
// MSWMockingDemo: Mock Service Worker for API Mocking
// ============================================

import { useState } from 'react';
import { HiOutlineServer, HiOutlineShieldCheck, HiOutlineLightningBolt } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import mswHandlerCode from './examples/MSWHandler.tsx?raw';
import storyMswCode from './examples/StoryMSW.tsx?raw';

type TabId = 'what' | 'handlers' | 'stories';

interface Tab {
  id: TabId;
  label: string;
}

const TABS: Tab[] = [
  { id: 'what', label: 'What is MSW?' },
  { id: 'handlers', label: 'Handlers' },
  { id: 'stories', label: 'In Stories' },
];

export default function MSWMockingDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<TabId>('what');

  return (
    <div className="space-y-4">
      {/* Tab Buttons */}
      <div className="flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="card bg-base-300 p-4">
        {activeTab === 'what' && (
          <div className="space-y-4">
            <p className="text-base-content/80">
              <strong className="text-primary">Mock Service Worker (MSW)</strong> intercepts network
              requests at the service worker level, allowing you to mock API responses without
              changing your application code.
            </p>

            {/* How it works diagram */}
            <div className="bg-base-200 rounded-lg p-4">
              <h5 className="font-medium mb-3 text-center">How MSW Works</h5>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center mb-2">
                    <span className="text-2xl">⚛️</span>
                  </div>
                  <span className="text-xs">Your App</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs text-base-content/60">fetch()</span>
                  <span className="text-primary">→</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-secondary/20 flex items-center justify-center mb-2">
                    <HiOutlineShieldCheck size={32} className="text-secondary" />
                  </div>
                  <span className="text-xs">MSW</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs text-base-content/60">mocked</span>
                  <span className="text-secondary">→</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-success/20 flex items-center justify-center mb-2">
                    <span className="text-2xl">📦</span>
                  </div>
                  <span className="text-xs">Mock Data</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-base-200 rounded-lg p-3 text-center">
                <HiOutlineServer size={24} className="mx-auto text-primary mb-2" />
                <h6 className="text-sm font-medium mb-1">No Server Needed</h6>
                <p className="text-xs text-base-content/60">Tests run offline</p>
              </div>
              <div className="bg-base-200 rounded-lg p-3 text-center">
                <HiOutlineShieldCheck size={24} className="mx-auto text-secondary mb-2" />
                <h6 className="text-sm font-medium mb-1">Real fetch()</h6>
                <p className="text-xs text-base-content/60">Same code as production</p>
              </div>
              <div className="bg-base-200 rounded-lg p-3 text-center">
                <HiOutlineLightningBolt size={24} className="mx-auto text-accent mb-2" />
                <h6 className="text-sm font-medium mb-1">Control Responses</h6>
                <p className="text-xs text-base-content/60">Test any scenario</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'handlers' && (
          <div className="space-y-4">
            <p className="text-base-content/80">
              Handlers define how MSW should respond to specific requests. Create handlers for each
              API endpoint your app uses.
            </p>
            <CodeSnippet
              code={mswHandlerCode}
              language="typescript"
              title="src/mocks/handlers.ts"
            />
            <div className="bg-info/10 border border-info/30 rounded-lg p-3">
              <p className="text-sm text-info">
                {/* eslint-disable-next-line local/no-raw-code-element */}
                <strong>Tip:</strong> Use <code className="bg-base-300 px-1 rounded">delay()</code>{' '}
                to simulate realistic network latency. This helps test loading states.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="space-y-4">
            <p className="text-base-content/80">
              Each story can use the default handlers or override them to test specific scenarios
              like loading states, errors, or empty data.
            </p>
            <CodeSnippet code={storyMswCode} language="typescript" title="Component.stories.tsx" />
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-3">
              <p className="text-sm text-warning">
                <strong>Key Pattern:</strong> Use{' '}
                {/* eslint-disable-next-line local/no-raw-code-element */}
                <code className="bg-base-300 px-1 rounded">delay('infinite')</code> to freeze the
                loading state for testing. The request never resolves, keeping your loading spinner
                visible.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Reference */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-3">MSW Handler Types</h4>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="bg-base-200 px-2 py-1 rounded text-success">http.get()</code>
            <span className="text-base-content/70">Mock GET requests (fetching data)</span>
          </div>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="bg-base-200 px-2 py-1 rounded text-primary">http.post()</code>
            <span className="text-base-content/70">Mock POST requests (creating data)</span>
          </div>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="bg-base-200 px-2 py-1 rounded text-warning">http.put()</code>
            <span className="text-base-content/70">Mock PUT requests (updating data)</span>
          </div>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="bg-base-200 px-2 py-1 rounded text-error">http.delete()</code>
            <span className="text-base-content/70">Mock DELETE requests (removing data)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
