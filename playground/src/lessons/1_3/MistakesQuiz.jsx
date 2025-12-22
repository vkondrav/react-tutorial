import { useState } from 'react';

export default function MistakesQuiz() {
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      code: '<div class="container">',
      error: 'Using "class" instead of "className"',
      fix: '<div className="container">',
    },
    {
      id: 2,
      code: '<p>Hello, name</p>',
      error: 'Forgot curly braces around variable',
      fix: '<p>Hello, {name}</p>',
    },
    {
      id: 3,
      code: '<img src="photo.jpg">',
      error: 'Tag not closed',
      fix: '<img src="photo.jpg" />',
    },
    {
      id: 4,
      code: '<button onclick={handleClick}>',
      error: 'Lowercase event handler (should be camelCase)',
      fix: '<button onClick={handleClick}>',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p style={{ color: '#94a3b8', marginTop: 0, marginBottom: '0.5rem' }}>
        Can you spot what's wrong? Click to reveal the answer:
      </p>
      {questions.map((q) => (
        <div
          key={q.id}
          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: true }))}
          style={{
            backgroundColor: '#0f172a',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #334155',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: answers[q.id] ? '0.75rem' : 0,
            }}
          >
            <code style={{ color: '#f87171' }}>{q.code}</code>
            {!answers[q.id] && (
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Click to reveal →</span>
            )}
          </div>
          {answers[q.id] && (
            <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #334155' }}>
              <div style={{ color: '#fbbf24', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                ⚠️ {q.error}
              </div>
              <code style={{ color: '#86efac' }}>✓ {q.fix}</code>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
