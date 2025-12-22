// ============================================
// DefaultPropsDemo - Default Prop Values
// ============================================

import { useState } from 'react';
import { CodeSnippet } from '../components';

// ============================================
// Types
// ============================================

type Size = 'small' | 'medium' | 'large';
type Variant = 'primary' | 'secondary' | 'danger';

interface SizeStyle {
  padding: string;
  fontSize: string;
}

interface VariantStyle {
  backgroundColor: string;
  color: string;
}

// ============================================
// Constants
// ============================================

const sizeOptions: Size[] = ['small', 'medium', 'large'];
const variantOptions: Variant[] = ['primary', 'secondary', 'danger'];

const sizeStyles: Record<Size, SizeStyle> = {
  small: { padding: '0.25rem 0.5rem', fontSize: '0.75rem' },
  medium: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
  large: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
};

const variantStyles: Record<Variant, VariantStyle> = {
  primary: { backgroundColor: '#3b82f6', color: 'white' },
  secondary: { backgroundColor: '#475569', color: 'white' },
  danger: { backgroundColor: '#ef4444', color: 'white' },
};

// ============================================
// Main Component
// ============================================

export default function DefaultPropsDemo(): React.ReactElement {
  const [showSize, setShowSize] = useState<boolean>(true);
  const [showVariant, setShowVariant] = useState<boolean>(true);
  const [size, setSize] = useState<Size>('medium');
  const [variant, setVariant] = useState<Variant>('primary');

  const activeSize: Size = showSize ? size : 'medium';
  const activeVariant: Variant = showVariant ? variant : 'primary';

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      {/* Controls */}
      <div className="p-6 border-b border-base-300">
        <div className="grid grid-cols-2 gap-6">
          {/* Size prop */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="showSize"
                checked={showSize}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShowSize(e.target.checked)}
                className="checkbox checkbox-sm"
              />
              <label htmlFor="showSize" className="text-base-content/70 text-sm cursor-pointer">
                Pass <code className="text-primary">size</code> prop
              </label>
            </div>
            <div className="flex gap-2">
              {sizeOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  disabled={!showSize}
                  className={`btn btn-sm ${size === s && showSize ? 'btn-primary' : 'btn-outline'} ${!showSize ? 'btn-disabled' : ''}`}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setShowVariant(e.target.checked)
                }
                className="checkbox checkbox-sm"
              />
              <label htmlFor="showVariant" className="text-base-content/70 text-sm cursor-pointer">
                Pass <code className="text-secondary">variant</code> prop
              </label>
            </div>
            <div className="flex gap-2">
              {variantOptions.map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  disabled={!showVariant}
                  className={`btn btn-sm ${variant === v && showVariant ? 'btn-secondary' : 'btn-outline'} ${!showVariant ? 'btn-disabled' : ''}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Code */}
      <div className="p-6 border-b border-base-300">
        <CodeSnippet
          code={`function Button({ 
  label,
  size = "medium",    // ← default value
  variant = "primary" // ← default value
}) {
  return <button className={\`btn-\${size} btn-\${variant}\`}>{label}</button>;
}`}
          language="tsx"
          title="Component with Default Props"
          showCopy={false}
        />

        <div className="mt-4">
          <CodeSnippet
            code={`<Button label="Click me"${showSize ? ` size="${size}"` : ''}${showVariant ? ` variant="${variant}"` : ''} />`}
            language="tsx"
            title="Usage"
            showCopy={false}
          />
        </div>
      </div>

      {/* Live Preview */}
      <div className="p-6 bg-base-300">
        <div className="text-xs text-base-content/50 mb-3 uppercase">Live Result</div>
        <div className="p-8 bg-base-200 rounded-lg border border-dashed border-base-300 flex justify-center items-center gap-4">
          <button
            className="btn border-none rounded-md font-medium cursor-pointer"
            style={{
              ...sizeStyles[activeSize],
              ...variantStyles[activeVariant],
            }}
          >
            Click me
          </button>
          <div className="text-base-content/50 text-xs">
            size: <span className={showSize ? 'text-success' : 'text-warning'}>{activeSize}</span>
            {!showSize && <span className="text-warning"> (default)</span>}
            <br />
            variant:{' '}
            <span className={showVariant ? 'text-success' : 'text-warning'}>{activeVariant}</span>
            {!showVariant && <span className="text-warning"> (default)</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
