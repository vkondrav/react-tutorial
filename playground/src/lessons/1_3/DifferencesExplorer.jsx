import { useState } from 'react';

export default function DifferencesExplorer() {
  const [selected, setSelected] = useState(null);

  const differences = [
    {
      id: 'class',
      html: 'class',
      jsx: 'className',
      reason: '"class" is a reserved keyword in JavaScript',
      example: '<div className="container">',
      color: 'red',
      colorHex: '#ef4444',
    },
    {
      id: 'for',
      html: 'for',
      jsx: 'htmlFor',
      reason: '"for" is a reserved keyword in JavaScript (for loops)',
      example: '<label htmlFor="email">',
      color: 'orange',
      colorHex: '#f97316',
    },
    {
      id: 'events',
      html: 'onclick',
      jsx: 'onClick',
      reason: 'JSX uses camelCase for all event handlers',
      example: '<button onClick={handleClick}>',
      color: 'yellow',
      colorHex: '#eab308',
    },
    {
      id: 'style',
      html: 'style="color: red"',
      jsx: 'style={{ color: "red" }}',
      reason: 'Style is an object, not a string. CSS properties are camelCase.',
      example: '<div style={{ backgroundColor: "blue", fontSize: 16 }}>',
      color: 'emerald',
      colorHex: '#22c55e',
    },
    {
      id: 'closing',
      html: '<img> <br> <input>',
      jsx: '<img /> <br /> <input />',
      reason: 'All tags must be explicitly closed in JSX',
      example: '<img src="photo.jpg" alt="Photo" />',
      color: 'blue',
      colorHex: '#3b82f6',
    },
  ];

  const colorClasses = {
    red: {
      bg: 'bg-red-500',
      border: 'border-red-500',
      text: 'text-red-500',
      bgLight: 'bg-red-500/20',
      borderLight: 'border-red-500/30',
    },
    orange: {
      bg: 'bg-orange-500',
      border: 'border-orange-500',
      text: 'text-orange-500',
      bgLight: 'bg-orange-500/20',
      borderLight: 'border-orange-500/30',
    },
    yellow: {
      bg: 'bg-yellow-500',
      border: 'border-yellow-500',
      text: 'text-yellow-500',
      bgLight: 'bg-yellow-500/20',
      borderLight: 'border-yellow-500/30',
    },
    emerald: {
      bg: 'bg-emerald-500',
      border: 'border-emerald-500',
      text: 'text-emerald-500',
      bgLight: 'bg-emerald-500/20',
      borderLight: 'border-emerald-500/30',
    },
    blue: {
      bg: 'bg-blue-500',
      border: 'border-blue-500',
      text: 'text-blue-500',
      bgLight: 'bg-blue-500/20',
      borderLight: 'border-blue-500/30',
    },
  };

  const selectedDiff = differences.find((d) => d.id === selected);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {differences.map((diff) => {
          const colors = colorClasses[diff.color];
          const isSelected = selected === diff.id;
          return (
            <button
              key={diff.id}
              onClick={() => setSelected(isSelected ? null : diff.id)}
              className={`px-4 py-2 rounded-lg cursor-pointer font-mono text-sm border-2 transition-colors ${
                isSelected
                  ? `${colors.bg} ${colors.border} text-white`
                  : `bg-slate-900 ${colors.border} ${colors.text} hover:bg-slate-800`
              }`}
            >
              {diff.html} → {diff.jsx}
            </button>
          );
        })}
      </div>

      <div
        className={`bg-slate-900 rounded-xl p-5 min-h-[140px] transition-colors ${
          selectedDiff
            ? `${colorClasses[selectedDiff.color].borderLight} border`
            : 'border-slate-700 border'
        }`}
      >
        {selectedDiff ? (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <code className="bg-red-500/20 text-red-300 px-2 py-1 rounded line-through">
                {selectedDiff.html}
              </code>
              <span className="text-slate-500">→</span>
              <code className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">
                {selectedDiff.jsx}
              </code>
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">
              <strong>Why?</strong> {selectedDiff.reason}
            </p>
            <div className="bg-slate-800 p-3 rounded-lg font-mono text-sm text-slate-400">
              {selectedDiff.example}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            👆 Click a difference above to learn more
          </div>
        )}
      </div>
    </div>
  );
}
