import { useState } from 'react';

export default function ChildrenDemo() {
  const [cardTitle, setCardTitle] = useState('Welcome!');
  const [cardContent, setCardContent] = useState('This content is passed as children.');

  return (
    <div className="mt-6 bg-slate-800 rounded-xl overflow-hidden">
      {/* Controls */}
      <div className="p-6 grid grid-cols-2 gap-4 border-b border-slate-700">
        <div>
          <label className="block text-xs text-slate-500 mb-2 uppercase">
            title prop
          </label>
          <input
            type="text"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-slate-50 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-2 uppercase">
            children content
          </label>
          <input
            type="text"
            value={cardContent}
            onChange={(e) => setCardContent(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-slate-50 text-sm"
          />
        </div>
      </div>

      {/* Code */}
      <div className="p-6 border-b border-slate-700">
        <div className="text-xs text-slate-500 mb-3 uppercase">
          Card Component (receives children)
        </div>
        <pre className="m-0 p-4 bg-slate-900 rounded-lg overflow-auto text-sm leading-relaxed">
          <code className="text-slate-200">
            {`function Card({ title, `}
            <span className="text-pink-500">children</span>
            {` }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">
        {`}
            <span className="text-pink-500">children</span>
            {`}  {/* ← Renders whatever is between <Card>...</Card> */}
      </div>
    </div>
  );
}`}
          </code>
        </pre>

        <div className="text-xs text-slate-500 mb-3 mt-6 uppercase">
          Usage
        </div>
        <pre className="m-0 p-4 bg-slate-900 rounded-lg overflow-auto text-sm leading-relaxed">
          <code className="text-slate-200">
            {`<Card title="`}
            <span className="text-green-500">{cardTitle}</span>
            {`">
  `}
            <span className="text-pink-500">{cardContent}</span>
            {`
</Card>`}
          </code>
        </pre>
      </div>

      {/* Live Preview */}
      <div className="p-6 bg-slate-900">
        <div className="text-xs text-slate-500 mb-3 uppercase">
          Live Result
        </div>
        <div className="p-6 bg-slate-50 rounded-lg shadow-sm">
          <h3 className="m-0 mb-3 text-slate-800 text-lg">
            {cardTitle || 'Card Title'}
          </h3>
          <div className="text-slate-500">{cardContent || 'Card content goes here...'}</div>
        </div>
      </div>

      {/* Examples */}
      <div className="p-6 bg-slate-800 border-t border-slate-700">
        <div className="text-xs text-slate-500 mb-3 uppercase">
          Children can be anything!
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-900 p-3 rounded-md">
            <div className="text-green-500 mb-2">Text</div>
            <code className="text-slate-400">{`<Card>Hello</Card>`}</code>
          </div>
          <div className="bg-slate-900 p-3 rounded-md">
            <div className="text-blue-500 mb-2">Elements</div>
            <code className="text-slate-400">{`<Card><p>Hi</p></Card>`}</code>
          </div>
          <div className="bg-slate-900 p-3 rounded-md">
            <div className="text-purple-500 mb-2">Components</div>
            <code className="text-slate-400">{`<Card><List /></Card>`}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
