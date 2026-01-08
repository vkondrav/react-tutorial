// ============================================
// ComponentBuilder - Interactive Component Builder
// ============================================

import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { CodeSnippet } from '@components';

// ============================================
// Constants
// ============================================

const colorOptions: string[] = ['#3b82f6', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899'];

// ============================================
// Main Component
// ============================================

export default function ComponentBuilder(): React.ReactElement {
  const [componentName, setComponentName] = useState<string>('MyButton');
  const [buttonText, setButtonText] = useState<string>('Click Me');
  const [buttonColor, setButtonColor] = useState<string>('#3b82f6');

  const isValidName = /^[A-Z][a-zA-Z0-9]*$/.test(componentName);

  const generatedCode = `function ${componentName}() {
  return (
    <button style={{
      padding: '0.75rem 1.5rem',
      backgroundColor: '${buttonColor}',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer'
    }}>
      ${buttonText}
    </button>
  );
}`;

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      {/* Controls */}
      <div className="p-6 grid grid-cols-3 gap-4 border-b border-base-300">
        {/* Component Name */}
        <div>
          <label className="block text-xs text-base-content/50 mb-2 uppercase tracking-wide">
            Component Name
          </label>
          <input
            type="text"
            value={componentName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComponentName(e.target.value)}
            className={`input input-bordered w-full input-sm font-mono ${
              isValidName ? '' : 'input-error'
            }`}
          />
          {!isValidName && (
            <div className="text-xs text-error mt-1">Must start with capital letter!</div>
          )}
        </div>

        {/* Button Text */}
        <div>
          <label className="block text-xs text-base-content/50 mb-2 uppercase tracking-wide">
            Button Text
          </label>
          <input
            type="text"
            value={buttonText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setButtonText(e.target.value)}
            className="input input-bordered w-full input-sm"
          />
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-xs text-base-content/50 mb-2 uppercase tracking-wide">
            Button Color
          </label>
          <div className="flex gap-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() => setButtonColor(color)}
                className={`w-8 h-8 rounded-md cursor-pointer transition-all ${
                  buttonColor === color
                    ? 'border-2 border-base-content ring-2 ring-primary'
                    : 'border-2 border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Code Output */}
      <div className="p-6 border-b border-base-300">
        <CodeSnippet
          code={generatedCode}
          language="tsx"
          title="Generated Component Code"
          showCopy={false}
        />
      </div>

      {/* Live Preview */}
      <div className="p-6 bg-base-300">
        <div className="text-xs text-base-content/50 mb-3 uppercase tracking-wide">
          Live Preview: {'<'}
          {isValidName ? componentName : 'InvalidName'}
          {' />'}
        </div>
        <div className="p-8 bg-base-200 rounded-lg flex justify-center border border-dashed border-base-300">
          {/* The actual rendered component */}
          <button
            className={`btn px-6 py-3 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-opacity ${
              isValidName ? 'opacity-100' : 'opacity-50'
            }`}
            style={{ backgroundColor: buttonColor }}
          >
            {buttonText || 'Button'}
          </button>
        </div>
        {!isValidName && (
          <div className="mt-3 px-3 py-2 bg-error/20 rounded-md text-error text-xs text-center flex items-center justify-center gap-2">
            <HiOutlineExclamationCircle size={16} />
            Component name must start with a capital letter!
          </div>
        )}
      </div>
    </div>
  );
}
