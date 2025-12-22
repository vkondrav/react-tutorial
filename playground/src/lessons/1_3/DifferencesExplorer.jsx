import { useState } from 'react';
import { HiOutlineArrowRight, HiOutlineCursorClick } from 'react-icons/hi';

export default function DifferencesExplorer() {
  const [selected, setSelected] = useState(null);

  const differences = [
    {
      id: 'class',
      html: 'class',
      jsx: 'className',
      reason: '"class" is a reserved keyword in JavaScript',
      example: '<div className="container">',
      color: 'error',
    },
    {
      id: 'for',
      html: 'for',
      jsx: 'htmlFor',
      reason: '"for" is a reserved keyword in JavaScript (for loops)',
      example: '<label htmlFor="email">',
      color: 'warning',
    },
    {
      id: 'events',
      html: 'onclick',
      jsx: 'onClick',
      reason: 'JSX uses camelCase for all event handlers',
      example: '<button onClick={handleClick}>',
      color: 'warning',
    },
    {
      id: 'style',
      html: 'style="color: red"',
      jsx: 'style={{ color: "red" }}',
      reason: 'Style is an object, not a string. CSS properties are camelCase.',
      example: '<div style={{ backgroundColor: "blue", fontSize: 16 }}>',
      color: 'success',
    },
    {
      id: 'closing',
      html: '<img> <br> <input>',
      jsx: '<img /> <br /> <input />',
      reason: 'All tags must be explicitly closed in JSX',
      example: '<img src="photo.jpg" alt="Photo" />',
      color: 'primary',
    },
  ];

  const colorClasses = {
    error: {
      btnActive: 'btn-error',
      btnOutline: 'btn-outline btn-error',
      border: 'border-error/30',
    },
    warning: {
      btnActive: 'btn-warning',
      btnOutline: 'btn-outline btn-warning',
      border: 'border-warning/30',
    },
    success: {
      btnActive: 'btn-success',
      btnOutline: 'btn-outline btn-success',
      border: 'border-success/30',
    },
    primary: {
      btnActive: 'btn-primary',
      btnOutline: 'btn-outline btn-primary',
      border: 'border-primary/30',
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
              className={`btn btn-sm font-mono ${isSelected ? colors.btnActive : colors.btnOutline}`}
            >
              {diff.html} <HiOutlineArrowRight size={14} className="mx-1" /> {diff.jsx}
            </button>
          );
        })}
      </div>

      <div
        className={`card bg-base-200 p-5 min-h-[140px] transition-colors ${
          selectedDiff
            ? `${colorClasses[selectedDiff.color].border} border-2`
            : 'border-base-300 border'
        }`}
      >
        {selectedDiff ? (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <code className="bg-error/20 text-error px-2 py-1 rounded line-through">
                {selectedDiff.html}
              </code>
              <HiOutlineArrowRight className="text-base-content/50" size={16} />
              <code className="bg-success/20 text-success px-2 py-1 rounded">
                {selectedDiff.jsx}
              </code>
            </div>
            <p className="text-base-content mb-4 leading-relaxed">
              <strong>Why?</strong> {selectedDiff.reason}
            </p>
            <div className="bg-base-300 p-3 rounded-lg font-mono text-sm text-base-content/70">
              {selectedDiff.example}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-base-content/50 gap-2">
            <HiOutlineCursorClick size={18} />
            <span>Click a difference above to learn more</span>
          </div>
        )}
      </div>
    </div>
  );
}
