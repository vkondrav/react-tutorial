import { useState } from 'react';

export default function ComponentRulesDemo() {
  const [activeRule, setActiveRule] = useState(null);

  const rules = [
    {
      id: 'capital',
      emoji: '1️⃣',
      title: 'Name Must Be Capitalized',
      wrong: {
        code: `function greeting() {
  return <h1>Hello</h1>;
}

<greeting />  // ❌ React thinks it's HTML`,
        error: 'React treats lowercase as HTML tags, not components!',
      },
      correct: {
        code: `function Greeting() {
  return <h1>Hello</h1>;
}

<Greeting />  // ✅ React knows it's a component`,
        note: 'Use PascalCase for all component names',
      },
    },
    {
      id: 'return',
      emoji: '2️⃣',
      title: 'Must Return JSX',
      wrong: {
        code: `function BrokenComponent() {
  <div>I forgot return!</div>
}

// Returns undefined → Error!`,
        error: 'Forgetting return is the #1 beginner mistake!',
      },
      correct: {
        code: `function WorkingComponent() {
  return <div>Don't forget return!</div>;
}

// Or return null to render nothing`,
        note: 'Always use return (or implicit arrow return)',
      },
    },
    {
      id: 'single',
      emoji: '3️⃣',
      title: 'Single Root Element',
      wrong: {
        code: `function MultipleRoots() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  );  // ❌ Adjacent JSX elements!
}`,
        error: 'Multiple adjacent elements must be wrapped!',
      },
      correct: {
        code: `function SingleRoot() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>  // ✅ Fragment wrapper
  );
}`,
        note: 'Use <> fragments to avoid extra DOM nodes',
      },
    },
  ];

  return (
    <div className="mt-6">
      {/* Rule Buttons */}
      <div className="flex gap-3 flex-wrap mb-4">
        {rules.map((rule) => (
          <button
            key={rule.id}
            onClick={() => setActiveRule(activeRule === rule.id ? null : rule.id)}
            className={`px-4 py-3 rounded-lg cursor-pointer text-sm font-medium transition-all ${
              activeRule === rule.id
                ? 'bg-blue-500 border border-blue-500 text-white'
                : 'bg-slate-800 border border-slate-700 text-slate-50 hover:bg-slate-700'
            }`}
          >
            {rule.emoji} {rule.title}
          </button>
        ))}
      </div>

      {/* Rule Detail */}
      {activeRule && (
        <RuleDetail
          rule={rules.find((r) => r.id === activeRule)}
          onClose={() => setActiveRule(null)}
        />
      )}

      {!activeRule && (
        <div className="p-8 bg-slate-800 rounded-xl text-center text-slate-500">
          👆 Click a rule to see examples
        </div>
      )}
    </div>
  );
}

function RuleDetail({ rule, onClose }) {
  const [showCorrect, setShowCorrect] = useState(false);

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="px-6 py-4 bg-slate-900 flex justify-between items-center">
        <span className="text-slate-50 font-semibold">
          {rule.emoji} {rule.title}
        </span>
        <button
          onClick={onClose}
          className="bg-transparent border-none text-slate-500 cursor-pointer text-xl hover:text-slate-400"
        >
          ✕
        </button>
      </div>

      {/* Toggle */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setShowCorrect(false)}
          className={`flex-1 px-3 py-3 border-none cursor-pointer font-medium transition-colors ${
            !showCorrect
              ? 'bg-red-500/20 border-b-2 border-b-red-500 text-red-500'
              : 'bg-transparent border-b-2 border-b-transparent text-slate-500'
          }`}
        >
          ❌ Wrong
        </button>
        <button
          onClick={() => setShowCorrect(true)}
          className={`flex-1 px-3 py-3 border-none cursor-pointer font-medium transition-colors ${
            showCorrect
              ? 'bg-green-500/20 border-b-2 border-b-green-500 text-green-500'
              : 'bg-transparent border-b-2 border-b-transparent text-slate-500'
          }`}
        >
          ✅ Correct
        </button>
      </div>

      {/* Code */}
      <div className="p-6">
        <pre
          className={`m-0 p-4 bg-slate-900 rounded-lg overflow-auto text-sm leading-relaxed border ${
            showCorrect ? 'border-green-500/30' : 'border-red-500/30'
          }`}
        >
          <code className="text-slate-200">
            {showCorrect ? rule.correct.code : rule.wrong.code}
          </code>
        </pre>

        <div
          className={`mt-4 px-4 py-3 rounded-lg text-sm ${
            showCorrect ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
          }`}
        >
          {showCorrect ? `💡 ${rule.correct.note}` : `⚠️ ${rule.wrong.error}`}
        </div>
      </div>
    </div>
  );
}
