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
    <div className="flex flex-col gap-3">
      <p className="text-slate-400 mt-0 mb-2">
        Can you spot what's wrong? Click to reveal the answer:
      </p>
      {questions.map((q) => (
        <div
          key={q.id}
          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: true }))}
          className="bg-slate-900 p-4 rounded-lg border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors"
        >
          <div className={`flex items-center justify-between ${answers[q.id] ? 'mb-3' : ''}`}>
            <code className="text-red-400">{q.code}</code>
            {!answers[q.id] && <span className="text-slate-500 text-xs">Click to reveal →</span>}
          </div>
          {answers[q.id] && (
            <div className="pt-3 border-t border-slate-700">
              <div className="text-amber-400 text-sm mb-2">⚠️ {q.error}</div>
              <code className="text-emerald-400">✓ {q.fix}</code>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
