import { useState } from 'react';

export default function ComponentBasicsDemo() {
  const [syntax, setSyntax] = useState('function');

  const syntaxExamples = {
    function: {
      label: 'Function Declaration',
      code: `function Greeting() {
  return <h1>Hello, World!</h1>;
}`,
      description: 'The classic way - clear and readable',
    },
    arrow: {
      label: 'Arrow Function',
      code: `const Greeting = () => {
  return <h1>Hello, World!</h1>;
};`,
      description: 'Modern syntax - popular in the community',
    },
    arrowImplicit: {
      label: 'Arrow (Implicit Return)',
      code: `const Greeting = () => <h1>Hello, World!</h1>;`,
      description: 'Shortest syntax - great for simple components',
    },
  };

  const current = syntaxExamples[syntax];

  return (
    <div className="mt-6 bg-slate-800 rounded-xl overflow-hidden">
      {/* Syntax Tabs */}
      <div className="flex border-b border-slate-700">
        {Object.entries(syntaxExamples).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setSyntax(key)}
            className={`flex-1 px-4 py-3 bg-transparent border-none cursor-pointer text-sm transition-all ${
              syntax === key
                ? 'bg-slate-700 border-b-2 border-b-blue-500 text-slate-50 font-semibold'
                : 'border-b-2 border-b-transparent text-slate-400 font-normal'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <div className="p-6">
        <pre className="m-0 p-4 bg-slate-900 rounded-lg overflow-auto text-sm leading-relaxed">
          <code className="text-slate-200">{current.code}</code>
        </pre>

        <p className="mt-4 mb-0 text-slate-400 text-sm flex items-center gap-2">
          <span className="text-green-500">💡</span>
          {current.description}
        </p>
      </div>

      {/* Live Preview */}
      <div className="p-6 bg-slate-900 border-t border-slate-700">
        <div className="text-xs text-slate-500 mb-3 uppercase tracking-wide">Preview</div>
        <div className="p-4 bg-slate-800 rounded-lg border border-dashed border-slate-700">
          {/* This IS the Greeting component rendered! */}
          <h1 className="m-0 text-2xl text-slate-50">Hello, World!</h1>
        </div>
      </div>
    </div>
  );
}
