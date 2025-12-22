import { useState } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';

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
    <div className="mt-6 card bg-base-200 overflow-hidden">
      {/* Syntax Tabs */}
      <div className="flex border-b border-base-300">
        {Object.entries(syntaxExamples).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setSyntax(key)}
            className={`flex-1 px-4 py-3 cursor-pointer text-sm transition-all ${
              syntax === key
                ? 'bg-base-300 border-b-2 border-b-primary text-base-content font-semibold'
                : 'bg-base-100 border-b-2 border-b-transparent text-base-content/70 font-normal hover:bg-base-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <div className="p-6">
        <pre className="m-0 p-4 bg-base-300 rounded-lg overflow-auto text-sm leading-relaxed">
          <code className="text-base-content">{current.code}</code>
        </pre>

        <p className="mt-4 mb-0 text-base-content/70 text-sm flex items-center gap-2">
          <HiOutlineLightBulb className="text-success" size={18} />
          {current.description}
        </p>
      </div>

      {/* Live Preview */}
      <div className="p-6 bg-base-300 border-t border-base-300">
        <div className="text-xs text-base-content/50 mb-3 uppercase tracking-wide">Preview</div>
        <div className="p-4 bg-base-200 rounded-lg border border-dashed border-base-300">
          {/* This IS the Greeting component rendered! */}
          <h1 className="m-0 text-2xl text-base-content">Hello, World!</h1>
        </div>
      </div>
    </div>
  );
}
