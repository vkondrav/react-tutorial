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
    <div style={{ marginTop: '1.5rem' }}>
      {/* Rule Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {rules.map((rule) => (
          <button
            key={rule.id}
            onClick={() => setActiveRule(activeRule === rule.id ? null : rule.id)}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: activeRule === rule.id ? '#3b82f6' : '#1e293b',
              border: `1px solid ${activeRule === rule.id ? '#3b82f6' : '#334155'}`,
              borderRadius: '0.5rem',
              color: '#f8fafc',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
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
        <div
          style={{
            padding: '2rem',
            backgroundColor: '#1e293b',
            borderRadius: '0.75rem',
            textAlign: 'center',
            color: '#64748b',
          }}
        >
          👆 Click a rule to see examples
        </div>
      )}
    </div>
  );
}

function RuleDetail({ rule, onClose }) {
  const [showCorrect, setShowCorrect] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1rem 1.5rem',
          backgroundColor: '#0f172a',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ color: '#f8fafc', fontWeight: '600' }}>
          {rule.emoji} {rule.title}
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            fontSize: '1.25rem',
          }}
        >
          ✕
        </button>
      </div>

      {/* Toggle */}
      <div style={{ display: 'flex', borderBottom: '1px solid #334155' }}>
        <button
          onClick={() => setShowCorrect(false)}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: !showCorrect ? '#ef444422' : 'transparent',
            border: 'none',
            borderBottom: !showCorrect ? '2px solid #ef4444' : '2px solid transparent',
            color: !showCorrect ? '#ef4444' : '#64748b',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          ❌ Wrong
        </button>
        <button
          onClick={() => setShowCorrect(true)}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: showCorrect ? '#22c55e22' : 'transparent',
            border: 'none',
            borderBottom: showCorrect ? '2px solid #22c55e' : '2px solid transparent',
            color: showCorrect ? '#22c55e' : '#64748b',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          ✅ Correct
        </button>
      </div>

      {/* Code */}
      <div style={{ padding: '1.5rem' }}>
        <pre
          style={{
            margin: 0,
            padding: '1rem',
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            overflow: 'auto',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            border: `1px solid ${showCorrect ? '#22c55e44' : '#ef444444'}`,
          }}
        >
          <code style={{ color: '#e2e8f0' }}>
            {showCorrect ? rule.correct.code : rule.wrong.code}
          </code>
        </pre>

        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            backgroundColor: showCorrect ? '#22c55e22' : '#ef444422',
            borderRadius: '0.5rem',
            color: showCorrect ? '#22c55e' : '#ef4444',
            fontSize: '0.875rem',
          }}
        >
          {showCorrect ? `💡 ${rule.correct.note}` : `⚠️ ${rule.wrong.error}`}
        </div>
      </div>
    </div>
  );
}
