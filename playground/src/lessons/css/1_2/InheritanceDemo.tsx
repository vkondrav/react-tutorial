// ============================================
// InheritanceDemo - Inherited vs non-inherited properties
// ============================================

import { useState } from 'react';
import { HiOutlineArrowDown, HiOutlineX } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import inheritanceControlCode from './examples/InheritanceControl.css?raw';

interface PropertyInfo {
  name: string;
  inherits: boolean;
  category: 'text' | 'box' | 'visual' | 'other';
  example: string;
}

const PROPERTIES: PropertyInfo[] = [
  // Text properties (inherit)
  { name: 'color', inherits: true, category: 'text', example: 'color: blue;' },
  { name: 'font-family', inherits: true, category: 'text', example: 'font-family: Arial;' },
  { name: 'font-size', inherits: true, category: 'text', example: 'font-size: 16px;' },
  { name: 'font-weight', inherits: true, category: 'text', example: 'font-weight: bold;' },
  { name: 'line-height', inherits: true, category: 'text', example: 'line-height: 1.5;' },
  { name: 'text-align', inherits: true, category: 'text', example: 'text-align: center;' },
  { name: 'letter-spacing', inherits: true, category: 'text', example: 'letter-spacing: 1px;' },
  { name: 'cursor', inherits: true, category: 'other', example: 'cursor: pointer;' },
  { name: 'visibility', inherits: true, category: 'visual', example: 'visibility: hidden;' },

  // Box properties (don't inherit)
  { name: 'margin', inherits: false, category: 'box', example: 'margin: 10px;' },
  { name: 'padding', inherits: false, category: 'box', example: 'padding: 10px;' },
  { name: 'border', inherits: false, category: 'box', example: 'border: 1px solid;' },
  { name: 'width', inherits: false, category: 'box', example: 'width: 100px;' },
  { name: 'height', inherits: false, category: 'box', example: 'height: 100px;' },
  { name: 'background', inherits: false, category: 'visual', example: 'background: red;' },
  { name: 'display', inherits: false, category: 'box', example: 'display: flex;' },
  { name: 'position', inherits: false, category: 'box', example: 'position: absolute;' },
  { name: 'opacity', inherits: false, category: 'visual', example: 'opacity: 0.5;' },
];

const INHERIT_KEYWORDS = [
  {
    keyword: 'inherit',
    description: 'Force inheritance from parent',
    example: "border: inherit; /* Get parent's border */",
    useCase: 'When you want a non-inherited property to inherit',
  },
  {
    keyword: 'initial',
    description: 'Reset to CSS specification default',
    example: 'color: initial; /* Usually black */',
    useCase: "Reset to the property's default value",
  },
  {
    keyword: 'unset',
    description: 'inherit if inherited, initial otherwise',
    example: 'all: unset; /* Reset everything */',
    useCase: 'Smart reset that respects inheritance',
  },
  {
    keyword: 'revert',
    description: 'Roll back to previous origin',
    example: 'display: revert; /* Back to browser default */',
    useCase: 'Undo your CSS, keep browser styles',
  },
];

export default function InheritanceDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<'properties' | 'keywords' | 'interactive'>(
    'properties'
  );
  const [parentColor, setParentColor] = useState('#3b82f6');
  const [parentFontSize, setParentFontSize] = useState(20);

  const inheritedProps = PROPERTIES.filter((p) => p.inherits);
  const nonInheritedProps = PROPERTIES.filter((p) => !p.inherits);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="tabs tabs-boxed bg-base-200 p-1">
        <button
          className={`tab flex-1 ${activeTab === 'properties' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('properties')}
        >
          Property Reference
        </button>
        <button
          className={`tab flex-1 ${activeTab === 'keywords' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('keywords')}
        >
          Control Keywords
        </button>
        <button
          className={`tab flex-1 ${activeTab === 'interactive' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('interactive')}
        >
          🎯 Live Demo
        </button>
      </div>

      {/* Properties Tab */}
      {activeTab === 'properties' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Inherited */}
            <div className="bg-success/10 border border-success/30 rounded-lg p-4">
              <h4 className="font-semibold text-success flex items-center gap-2 mb-4">
                <HiOutlineArrowDown size={20} />
                Inherited Properties
              </h4>
              <p className="text-sm text-base-content/60 mb-4">
                These flow down to children automatically
              </p>
              <div className="space-y-2">
                {inheritedProps.map((prop) => (
                  <div key={prop.name} className="flex items-center justify-between">
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code className="text-sm font-mono">{prop.name}</code>
                    <span className="badge badge-sm badge-ghost">{prop.category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Non-inherited */}
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
              <h4 className="font-semibold text-warning flex items-center gap-2 mb-4">
                <HiOutlineX size={20} />
                Non-Inherited Properties
              </h4>
              <p className="text-sm text-base-content/60 mb-4">
                Each element must set these explicitly
              </p>
              <div className="space-y-2">
                {nonInheritedProps.map((prop) => (
                  <div key={prop.name} className="flex items-center justify-between">
                    {/* eslint-disable-next-line local/no-raw-code-element */}
                    <code className="text-sm font-mono">{prop.name}</code>
                    <span className="badge badge-sm badge-ghost">{prop.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rule of Thumb */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <p className="text-sm">
              <strong className="text-primary">Rule of Thumb:</strong> If it affects{' '}
              <em className="text-success">text appearance</em>, it probably inherits. If it affects{' '}
              <em className="text-warning">box size or position</em>, it doesn't.
            </p>
          </div>
        </div>
      )}

      {/* Keywords Tab */}
      {activeTab === 'keywords' && (
        <div className="space-y-4">
          {INHERIT_KEYWORDS.map((kw) => (
            <div key={kw.keyword} className="bg-base-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                {/* eslint-disable-next-line local/no-raw-code-element */}
                <code className="text-primary font-bold text-lg">{kw.keyword}</code>
              </div>
              <p className="text-sm text-base-content/70 mb-3">{kw.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-base-300 rounded p-3">
                  <p className="text-xs text-base-content/50 mb-1">Example:</p>
                  {/* eslint-disable-next-line local/no-raw-code-element */}
                  <code className="text-sm">{kw.example}</code>
                </div>
                <div className="bg-base-300 rounded p-3">
                  <p className="text-xs text-base-content/50 mb-1">Use when:</p>
                  <p className="text-sm">{kw.useCase}</p>
                </div>
              </div>
            </div>
          ))}

          <CodeSnippet
            code={inheritanceControlCode}
            language="css"
            title="Inheritance Control Examples"
          />
        </div>
      )}

      {/* Interactive Tab */}
      {activeTab === 'interactive' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-base-200 rounded-lg p-4">
            <h4 className="font-semibold text-sm text-base-content/70 mb-4">
              Adjust parent styles and watch inheritance:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-base-content/60 mb-1 block">
                  Parent Color (inherits)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={parentColor}
                    onChange={(e) => setParentColor(e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  {/* eslint-disable-next-line local/no-raw-code-element */}
                  <code className="text-sm bg-base-300 px-2 py-1 rounded">{parentColor}</code>
                </div>
              </div>
              <div>
                <label className="text-sm text-base-content/60 mb-1 block">
                  Parent Font Size (inherits)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="12"
                    max="32"
                    value={parentFontSize}
                    onChange={(e) => setParentFontSize(Number(e.target.value))}
                    className="range range-sm range-primary flex-1"
                  />
                  {/* eslint-disable-next-line local/no-raw-code-element */}
                  <code className="text-sm bg-base-300 px-2 py-1 rounded w-16 text-center">
                    {parentFontSize}px
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Live Demo */}
          <div
            className="bg-base-200 rounded-xl p-6"
            style={{ color: parentColor, fontSize: `${parentFontSize}px` }}
          >
            <div className="mb-4 pb-4 border-b border-base-300">
              <p className="font-semibold">Parent Element</p>
              <p className="text-sm opacity-70">
                color: {parentColor}; font-size: {parentFontSize}px; padding: 24px;
              </p>
            </div>

            <div className="ml-4 p-4 bg-base-300 rounded-lg">
              <p className="font-medium">Child Element (no styles set)</p>
              <p className="text-sm opacity-70 mt-2">
                ✓ <strong>color</strong> inherited from parent
                <br />✓ <strong>font-size</strong> inherited from parent
                <br />✗ <strong>padding</strong> NOT inherited (using default: 16px)
                <br />✗ <strong>background</strong> NOT inherited (explicitly set)
              </p>

              <div className="ml-4 mt-4 p-3 rounded border border-base-content/20">
                <p className="text-sm">Grandchild Element</p>
                <p className="text-xs opacity-70 mt-1">
                  Still inherits color and font-size from the parent chain!
                </p>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <CodeSnippet
            code={`.parent {
  color: ${parentColor};      /* ← INHERITED by children */
  font-size: ${parentFontSize}px;   /* ← INHERITED by children */
  padding: 24px;        /* ← NOT inherited */
  background: #1d232a;  /* ← NOT inherited */
}

.child {
  /* No color or font-size set */
  /* Automatically gets parent's values! */
  
  padding: 16px;        /* Must set explicitly */
  background: #2a323c;  /* Must set explicitly */
}`}
            language="css"
            title="Current Styles"
          />
        </div>
      )}
    </div>
  );
}
