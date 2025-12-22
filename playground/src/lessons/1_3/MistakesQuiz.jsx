import { useState } from 'react';
import { HiOutlineExclamationCircle, HiCheck, HiOutlineArrowRight } from 'react-icons/hi';

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
      <p className="text-base-content/70 mt-0 mb-2">
        Can you spot what's wrong? Click to reveal the answer:
      </p>
      {questions.map((q) => (
        <div
          key={q.id}
          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: true }))}
          className="card bg-base-200 p-4 border border-base-300 cursor-pointer hover:bg-base-300 transition-colors"
        >
          <div className={`flex items-center justify-between ${answers[q.id] ? 'mb-3' : ''}`}>
            <code className="text-error">{q.code}</code>
            {!answers[q.id] && (
              <span className="text-base-content/50 text-xs flex items-center gap-1">
                Click to reveal <HiOutlineArrowRight size={12} />
              </span>
            )}
          </div>
          {answers[q.id] && (
            <div className="pt-3 border-t border-base-300">
              <div className="text-warning text-sm mb-2 flex items-center gap-2">
                <HiOutlineExclamationCircle size={16} />
                {q.error}
              </div>
              <code className="text-success flex items-center gap-2">
                <HiCheck size={16} />
                {q.fix}
              </code>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
