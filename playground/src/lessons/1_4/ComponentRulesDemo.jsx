import { useState } from 'react';
import {
  HiX,
  HiCheck,
  HiOutlineLightBulb,
  HiOutlineExclamationCircle,
  HiOutlineCursorClick,
} from 'react-icons/hi';

export default function ComponentRulesDemo() {
  const [activeRule, setActiveRule] = useState(null);

  const rules = [
    {
      id: 'capital',
      number: '1',
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
      number: '2',
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
      number: '3',
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
            className={`btn ${activeRule === rule.id ? 'btn-primary' : 'btn-outline'}`}
          >
            <span className="badge badge-sm mr-2">{rule.number}</span>
            {rule.title}
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
        <div className="p-8 card bg-base-200 text-center text-base-content/50 flex items-center justify-center gap-2">
          <HiOutlineCursorClick size={18} />
          <span>Click a rule to see examples</span>
        </div>
      )}
    </div>
  );
}

function RuleDetail({ rule, onClose }) {
  const [showCorrect, setShowCorrect] = useState(false);

  return (
    <div className="card bg-base-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-base-300 flex justify-between items-center">
        <span className="text-base-content font-semibold flex items-center gap-2">
          <span className="badge badge-sm">{rule.number}</span>
          {rule.title}
        </span>
        <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
          <HiX size={20} />
        </button>
      </div>

      {/* Toggle */}
      <div className="flex border-b border-base-300">
        <button
          onClick={() => setShowCorrect(false)}
          className={`flex-1 px-3 py-3 border-none cursor-pointer font-medium transition-colors flex items-center justify-center gap-2 ${
            !showCorrect
              ? 'bg-error/20 border-b-2 border-b-error text-error'
              : 'bg-transparent border-b-2 border-b-transparent text-base-content/50'
          }`}
        >
          <HiX size={16} />
          Wrong
        </button>
        <button
          onClick={() => setShowCorrect(true)}
          className={`flex-1 px-3 py-3 border-none cursor-pointer font-medium transition-colors flex items-center justify-center gap-2 ${
            showCorrect
              ? 'bg-success/20 border-b-2 border-b-success text-success'
              : 'bg-transparent border-b-2 border-b-transparent text-base-content/50'
          }`}
        >
          <HiCheck size={16} />
          Correct
        </button>
      </div>

      {/* Code */}
      <div className="p-6">
        <pre
          className={`m-0 p-4 bg-base-300 rounded-lg overflow-auto text-sm leading-relaxed border-2 ${
            showCorrect ? 'border-success/30' : 'border-error/30'
          }`}
        >
          <code className="text-base-content">
            {showCorrect ? rule.correct.code : rule.wrong.code}
          </code>
        </pre>

        <div
          className={`mt-4 px-4 py-3 rounded-lg text-sm flex items-center gap-2 ${
            showCorrect ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
          }`}
        >
          {showCorrect ? (
            <>
              <HiOutlineLightBulb size={18} />
              {rule.correct.note}
            </>
          ) : (
            <>
              <HiOutlineExclamationCircle size={18} />
              {rule.wrong.error}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
