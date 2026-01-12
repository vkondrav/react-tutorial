import { useState } from 'react';
import { CodeSnippet } from '@components';
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineStar } from 'react-icons/hi';
import bemBasicsCode from './examples/BEMBasics.css?raw';

type BEMPart = 'block' | 'element' | 'modifier';

const bemParts: Record<
  BEMPart,
  { name: string; description: string; example: string; color: string }
> = {
  block: {
    name: 'Block',
    description: 'A standalone component that is meaningful on its own. The top-level abstraction.',
    example: '.card',
    color: '#3b82f6', // blue
  },
  element: {
    name: 'Element',
    description: 'A part of a block that has no meaning on its own. Always tied to its block.',
    example: '.card__title',
    color: '#8b5cf6', // purple
  },
  modifier: {
    name: 'Modifier',
    description: 'A variation or state of a block or element. Changes appearance or behavior.',
    example: '.card--featured',
    color: '#10b981', // green
  },
};

export default function BEMBasicsDemo(): React.ReactElement {
  const [activePart, setActivePart] = useState<BEMPart>('block');
  const [showCode, setShowCode] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  return (
    <div className="card bg-base-200 p-6 border border-base-300">
      {/* BEM Part Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(bemParts) as BEMPart[]).map((part) => (
          <button
            key={part}
            onClick={() => setActivePart(part)}
            className={`btn btn-sm ${activePart === part ? 'btn-primary' : 'btn-ghost'}`}
          >
            {bemParts[part].name}
          </button>
        ))}
      </div>

      {/* Explanation Card */}
      <div
        className="rounded-lg p-4 mb-6 border-2"
        style={{
          borderColor: bemParts[activePart].color,
          backgroundColor: `${bemParts[activePart].color}10`,
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code
            className="text-lg font-bold px-3 py-1 rounded"
            style={{ backgroundColor: bemParts[activePart].color, color: 'white' }}
          >
            {bemParts[activePart].example}
          </code>
          <span className="font-semibold" style={{ color: bemParts[activePart].color }}>
            {bemParts[activePart].name}
          </span>
        </div>
        <p className="text-sm text-base-content/70">{bemParts[activePart].description}</p>
      </div>

      {/* Interactive BEM Example */}
      <div className="bg-base-300 rounded-lg p-6 mb-6">
        <h4 className="font-semibold text-base-content mb-4 text-sm">Interactive Example</h4>

        {/* Modifier Toggles */}
        <div className="flex flex-wrap gap-4 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="checkbox checkbox-primary checkbox-sm"
            />
            <span className="text-sm">
              {/* eslint-disable-next-line local/no-raw-code-element */}
              <code className="bg-base-200 px-1 rounded">.card--featured</code>
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isCompact}
              onChange={(e) => setIsCompact(e.target.checked)}
              className="checkbox checkbox-primary checkbox-sm"
            />
            <span className="text-sm">
              {/* eslint-disable-next-line local/no-raw-code-element */}
              <code className="bg-base-200 px-1 rounded">.card--compact</code>
            </span>
          </label>
        </div>

        {/* The BEM Card Component */}
        <div
          className={`
            rounded-lg overflow-hidden transition-all duration-300
            ${isFeatured ? 'ring-2 ring-warning shadow-lg shadow-warning/20' : ''}
          `}
          style={{
            backgroundColor: isFeatured ? '#1e1b4b' : '#1f2937',
          }}
        >
          {/* card__header */}
          <div
            className={`${isCompact ? 'p-3' : 'p-4'} border-b border-white/10 flex items-center gap-3`}
          >
            <div
              className={`
                rounded-full bg-linear-to-br flex items-center justify-center
                ${isCompact ? 'w-8 h-8' : 'w-12 h-12'}
                ${isFeatured ? 'from-warning to-orange-400' : 'from-blue-500 to-purple-500'}
              `}
            >
              <HiOutlineUser className="text-white" size={isCompact ? 16 : 24} />
            </div>
            <div>
              {/* card__title */}
              <h5 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-base'}`}>
                User Profile
                {isFeatured && <HiOutlineStar className="inline ml-2 text-warning" size={16} />}
              </h5>
              {/* card__subtitle */}
              <p className={`text-white/60 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                Account Settings
              </p>
            </div>
          </div>

          {/* card__body */}
          <div className={`${isCompact ? 'p-3' : 'p-4'} space-y-3`}>
            {/* card__item */}
            <div className="flex items-center gap-3 text-white/80">
              <HiOutlineMail size={18} />
              <span className={isCompact ? 'text-sm' : ''}>user@example.com</span>
            </div>
            {/* card__item */}
            <div className="flex items-center gap-3 text-white/80">
              <HiOutlinePhone size={18} />
              <span className={isCompact ? 'text-sm' : ''}>+1 (555) 123-4567</span>
            </div>
          </div>

          {/* card__footer */}
          <div className={`${isCompact ? 'p-3' : 'p-4'} border-t border-white/10 flex gap-2`}>
            <button
              className={`
                flex-1 rounded font-medium transition-colors
                ${isCompact ? 'py-1.5 text-sm' : 'py-2'}
                ${
                  isFeatured
                    ? 'bg-warning text-warning-content hover:bg-warning/90'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }
              `}
            >
              Edit
            </button>
            <button
              className={`
                flex-1 rounded font-medium border border-white/20 text-white/70
                hover:bg-white/10 transition-colors
                ${isCompact ? 'py-1.5 text-sm' : 'py-2'}
              `}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Class Name Breakdown */}
      <div className="bg-base-300 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-base-content mb-3 text-sm">Class Names Used</h4>
        <div className="flex flex-wrap gap-2">
          <span
            className="px-2 py-1 rounded text-white text-xs font-mono"
            style={{ backgroundColor: bemParts.block.color }}
          >
            .card
          </span>
          <span
            className="px-2 py-1 rounded text-white text-xs font-mono"
            style={{ backgroundColor: bemParts.element.color }}
          >
            .card__header
          </span>
          <span
            className="px-2 py-1 rounded text-white text-xs font-mono"
            style={{ backgroundColor: bemParts.element.color }}
          >
            .card__title
          </span>
          <span
            className="px-2 py-1 rounded text-white text-xs font-mono"
            style={{ backgroundColor: bemParts.element.color }}
          >
            .card__body
          </span>
          <span
            className="px-2 py-1 rounded text-white text-xs font-mono"
            style={{ backgroundColor: bemParts.element.color }}
          >
            .card__item
          </span>
          <span
            className="px-2 py-1 rounded text-white text-xs font-mono"
            style={{ backgroundColor: bemParts.element.color }}
          >
            .card__footer
          </span>
          {isFeatured && (
            <span
              className="px-2 py-1 rounded text-white text-xs font-mono"
              style={{ backgroundColor: bemParts.modifier.color }}
            >
              .card--featured
            </span>
          )}
          {isCompact && (
            <span
              className="px-2 py-1 rounded text-white text-xs font-mono"
              style={{ backgroundColor: bemParts.modifier.color }}
            >
              .card--compact
            </span>
          )}
        </div>
      </div>

      {/* Toggle Code */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-ghost mb-4">
        {showCode ? 'Hide' : 'Show'} CSS Code
      </button>

      {showCode && (
        <CodeSnippet title="BEM Naming Convention" language="css" code={bemBasicsCode} />
      )}
    </div>
  );
}
