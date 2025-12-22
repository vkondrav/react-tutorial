import { useState } from 'react';

export default function ComponentBuilder() {
  const [componentName, setComponentName] = useState('MyButton');
  const [buttonText, setButtonText] = useState('Click Me');
  const [buttonColor, setButtonColor] = useState('#3b82f6');

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
    <div className="mt-6 bg-slate-800 rounded-xl overflow-hidden">
      {/* Controls */}
      <div className="p-6 grid grid-cols-3 gap-4 border-b border-slate-700">
        {/* Component Name */}
        <div>
          <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wide">
            Component Name
          </label>
          <input
            type="text"
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
            className={`w-full px-3 py-2 bg-slate-900 border rounded-md text-slate-50 text-sm font-mono focus:outline-none transition-colors ${
              isValidName ? 'border-slate-700' : 'border-red-500'
            }`}
          />
          {!isValidName && (
            <div className="text-xs text-red-500 mt-1">Must start with capital letter!</div>
          )}
        </div>

        {/* Button Text */}
        <div>
          <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wide">
            Button Text
          </label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-slate-50 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wide">
            Button Color
          </label>
          <div className="flex gap-2">
            {['#3b82f6', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899'].map((color) => (
              <button
                key={color}
                onClick={() => setButtonColor(color)}
                className={`w-8 h-8 rounded-md cursor-pointer transition-all ${
                  buttonColor === color
                    ? 'border-2 border-white ring-2 ring-blue-500'
                    : 'border-2 border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Code Output */}
      <div className="p-6 border-b border-slate-700">
        <div className="text-xs text-slate-500 mb-3 uppercase tracking-wide">
          Generated Component Code
        </div>
        <pre className="m-0 p-4 bg-slate-900 rounded-lg overflow-auto text-xs leading-relaxed">
          <code className="text-slate-200">{generatedCode}</code>
        </pre>
      </div>

      {/* Live Preview */}
      <div className="p-6 bg-slate-900">
        <div className="text-xs text-slate-500 mb-3 uppercase tracking-wide">
          Live Preview: {'<'}
          {isValidName ? componentName : 'InvalidName'}
          {' />'}
        </div>
        <div className="p-8 bg-slate-800 rounded-lg flex justify-center border border-dashed border-slate-700">
          {/* The actual rendered component */}
          <button
            className={`px-6 py-3 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-opacity ${
              isValidName ? 'opacity-100' : 'opacity-50'
            }`}
            style={{ backgroundColor: buttonColor }}
          >
            {buttonText || 'Button'}
          </button>
        </div>
        {!isValidName && (
          <div className="mt-3 px-3 py-2 bg-red-500/20 rounded-md text-red-500 text-xs text-center">
            ⚠️ Component name must start with a capital letter!
          </div>
        )}
      </div>
    </div>
  );
}
