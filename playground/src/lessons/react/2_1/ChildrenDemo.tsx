// ============================================
// ChildrenDemo - The Children Prop
// ============================================

import { useState } from 'react';
import { CodeSnippet } from '@components';

// ============================================
// Main Component
// ============================================

export default function ChildrenDemo(): React.ReactElement {
  const [cardTitle, setCardTitle] = useState<string>('Welcome!');
  const [cardContent, setCardContent] = useState<string>('This content is passed as children.');

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      {/* Controls */}
      <div className="p-6 grid grid-cols-2 gap-4 border-b border-base-300">
        <div>
          <label className="block text-xs text-base-content/50 mb-2 uppercase">title prop</label>
          <input
            type="text"
            value={cardTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardTitle(e.target.value)}
            className="input input-bordered w-full input-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-base-content/50 mb-2 uppercase">
            children content
          </label>
          <input
            type="text"
            value={cardContent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardContent(e.target.value)}
            className="input input-bordered w-full input-sm"
          />
        </div>
      </div>

      {/* Code */}
      <div className="p-6 border-b border-base-300">
        <CodeSnippet
          code={`function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">
        {children}  {/* ← Renders whatever is between <Card>...</Card> */}
      </div>
    </div>
  );
}`}
          language="tsx"
          title="Card Component (receives children)"
          showCopy={false}
        />

        <div className="mt-4">
          <CodeSnippet
            code={`<Card title="${cardTitle}">
  ${cardContent}
</Card>`}
            language="tsx"
            title="Usage"
            showCopy={false}
          />
        </div>
      </div>

      {/* Live Preview */}
      <div className="p-6 bg-base-300">
        <div className="text-xs text-base-content/50 mb-3 uppercase">Live Result</div>
        <div className="card bg-base-100 p-6 shadow-sm">
          <h3 className="m-0 mb-3 text-base-content text-lg">{cardTitle || 'Card Title'}</h3>
          <div className="text-base-content/70">{cardContent || 'Card content goes here...'}</div>
        </div>
      </div>

      {/* Examples */}
      <div className="p-6 bg-base-200 border-t border-base-300">
        <div className="text-xs text-base-content/50 mb-3 uppercase">Children can be anything!</div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="card bg-base-300 p-3">
            <div className="text-success mb-2">Text</div>
            <code className="text-base-content/70">{`<Card>Hello</Card>`}</code>
          </div>
          <div className="card bg-base-300 p-3">
            <div className="text-primary mb-2">Elements</div>
            <code className="text-base-content/70">{`<Card><p>Hi</p></Card>`}</code>
          </div>
          <div className="card bg-base-300 p-3">
            <div className="text-secondary mb-2">Components</div>
            <code className="text-base-content/70">{`<Card><List /></Card>`}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
