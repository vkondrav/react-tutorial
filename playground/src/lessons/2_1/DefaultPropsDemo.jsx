import { useState } from 'react';

export default function DefaultPropsDemo() {
  const [showSize, setShowSize] = useState(true);
  const [showVariant, setShowVariant] = useState(true);
  const [size, setSize] = useState('medium');
  const [variant, setVariant] = useState('primary');

  const sizeOptions = ['small', 'medium', 'large'];
  const variantOptions = ['primary', 'secondary', 'danger'];

  const sizeStyles = {
    small: { padding: '0.25rem 0.5rem', fontSize: '0.75rem' },
    medium: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    large: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
  };

  const variantStyles = {
    primary: { backgroundColor: '#3b82f6', color: 'white' },
    secondary: { backgroundColor: '#475569', color: 'white' },
    danger: { backgroundColor: '#ef4444', color: 'white' },
  };

  const activeSize = showSize ? size : 'medium';
  const activeVariant = showVariant ? variant : 'primary';

  return (
    <div className="mt-6 bg-slate-800 rounded-xl overflow-hidden">
      {/* Controls */}
      <div className="p-6 border-b border-slate-700">
        <div className="grid grid-cols-2 gap-6">
          {/* Size prop */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="showSize"
                checked={showSize}
                onChange={(e) => setShowSize(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="showSize" className="text-slate-400 text-sm">
                Pass <code className="text-blue-500">size</code> prop
              </label>
            </div>
            <div className="flex gap-2">
              {sizeOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  disabled={!showSize}
                  className={`px-3 py-1.5 border rounded-md text-xs transition-opacity ${
                    showSize ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                  }`}
                  style={{
                    backgroundColor: size === s && showSize ? '#3b82f6' : '#0f172a',
                    borderColor: '#334155',
                    color: size === s && showSize ? 'white' : '#64748b',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Variant prop */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="showVariant"
                checked={showVariant}
                onChange={(e) => setShowVariant(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="showVariant" className="text-slate-400 text-sm">
                Pass <code className="text-purple-500">variant</code> prop
              </label>
            </div>
            <div className="flex gap-2">
              {variantOptions.map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  disabled={!showVariant}
                  className={`px-3 py-1.5 border rounded-md text-xs transition-opacity ${
                    showVariant ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                  }`}
                  style={{
                    backgroundColor: variant === v && showVariant ? '#8b5cf6' : '#0f172a',
                    borderColor: '#334155',
                    color: variant === v && showVariant ? 'white' : '#64748b',
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Code */}
      <div className="p-6 border-b border-slate-700">
        <div className="text-xs text-slate-500 mb-3 uppercase">
          Component with Default Props
        </div>
        <pre className="m-0 p-4 bg-slate-900 rounded-lg overflow-auto text-sm leading-relaxed">
          <code className="text-slate-200">
            {`function Button({ 
  label,
  `}
            <span className="text-blue-500">size</span>
            {` = `}
            <span className="text-green-500">"medium"</span>
            {`,    `}
            <span className="text-slate-500">// ← default value</span>
            {`
  `}
            <span className="text-purple-500">variant</span>
            {` = `}
            <span className="text-green-500">"primary"</span>
            {` `}
            <span className="text-slate-500">// ← default value</span>
            {`
}) {
  return <button className={\`btn-\${size} btn-\${variant}\`}>{label}</button>;
}`}
          </code>
        </pre>

        <div className="text-xs text-slate-500 mb-3 mt-6 uppercase">
          Usage
        </div>
        <pre className="m-0 p-4 bg-slate-900 rounded-lg overflow-auto text-sm leading-relaxed">
          <code className="text-slate-200">
            {`<Button label="Click me"`}
            {showSize && (
              <>
                {` `}
                <span className="text-blue-500">size</span>
                {`="`}
                <span className="text-green-500">{size}</span>
                {`"`}
              </>
            )}
            {showVariant && (
              <>
                {` `}
                <span className="text-purple-500">variant</span>
                {`="`}
                <span className="text-green-500">{variant}</span>
                {`"`}
              </>
            )}
            {` />`}
          </code>
        </pre>
      </div>

      {/* Live Preview */}
      <div className="p-6 bg-slate-900">
        <div className="text-xs text-slate-500 mb-3 uppercase">
          Live Result
        </div>
        <div className="p-8 bg-slate-800 rounded-lg border border-dashed border-slate-700 flex justify-center items-center gap-4">
          <button
            className="border-none rounded-md font-medium cursor-pointer"
            style={{
              ...sizeStyles[activeSize],
              ...variantStyles[activeVariant],
            }}
          >
            Click me
          </button>
          <div className="text-slate-500 text-xs">
            size: <span className={showSize ? 'text-green-500' : 'text-amber-500'}>{activeSize}</span>
            {!showSize && <span className="text-amber-500"> (default)</span>}
            <br />
            variant:{' '}
            <span className={showVariant ? 'text-green-500' : 'text-amber-500'}>{activeVariant}</span>
            {!showVariant && <span className="text-amber-500"> (default)</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
