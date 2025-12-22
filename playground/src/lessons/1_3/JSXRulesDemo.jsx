import { useState } from 'react';

export default function JSXRulesDemo() {
  const [activeRule, setActiveRule] = useState(1);

  const rules = [
    {
      id: 1,
      title: 'Single Root Element',
      icon: '1️⃣',
      bad: `// ❌ Error!\nreturn (\n  <h1>Title</h1>\n  <p>Text</p>\n)`,
      good: `// ✅ Wrap in a parent\nreturn (\n  <div>\n    <h1>Title</h1>\n    <p>Text</p>\n  </div>\n)\n\n// ✅ Or use Fragment\nreturn (\n  <>\n    <h1>Title</h1>\n    <p>Text</p>\n  </>\n)`,
    },
    {
      id: 2,
      title: 'Close All Tags',
      icon: '2️⃣',
      bad: `// ❌ Error!\n<img src="photo.jpg">\n<br>\n<input type="text">`,
      good: `// ✅ Self-close!\n<img src="photo.jpg" />\n<br />\n<input type="text" />`,
    },
    {
      id: 3,
      title: 'camelCase Attributes',
      icon: '3️⃣',
      bad: `// ❌ Won't work\n<div class="box">\n<label for="name">\n<button onclick={fn}>\n<div tabindex="1">`,
      good: `// ✅ Use camelCase\n<div className="box">\n<label htmlFor="name">\n<button onClick={fn}>\n<div tabIndex="1">`,
    },
  ];

  const currentRule = rules.find((r) => r.id === activeRule);

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {rules.map((rule) => (
          <button
            key={rule.id}
            onClick={() => setActiveRule(rule.id)}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: activeRule === rule.id ? '#3b82f6' : '#0f172a',
              border: '1px solid #334155',
              borderRadius: '0.5rem',
              color: activeRule === rule.id ? 'white' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: activeRule === rule.id ? '600' : '400',
            }}
          >
            {rule.icon} {rule.title}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            border: '1px solid #ef444444',
          }}
        >
          <div
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ef444422',
              borderBottom: '1px solid #ef444444',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#ef4444',
            }}
          >
            ✗ Wrong
          </div>
          <pre
            style={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.8125rem',
              lineHeight: 1.6,
              color: '#94a3b8',
              overflow: 'auto',
            }}
          >
            {currentRule.bad}
          </pre>
        </div>
        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            border: '1px solid #22c55e44',
          }}
        >
          <div
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#22c55e22',
              borderBottom: '1px solid #22c55e44',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#22c55e',
            }}
          >
            ✓ Correct
          </div>
          <pre
            style={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.8125rem',
              lineHeight: 1.6,
              color: '#94a3b8',
              overflow: 'auto',
            }}
          >
            {currentRule.good}
          </pre>
        </div>
      </div>
    </div>
  );
}
