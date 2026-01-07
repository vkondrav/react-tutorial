// ============================================
// CascadeOriginsDemo - The 3 style sources
// ============================================

import { useState } from 'react';
import { HiOutlineGlobe, HiOutlineUser, HiOutlineCode } from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import userAgentStylesCode from './examples/UserAgentStyles.css?raw';
import userStylesCode from './examples/UserStyles.css?raw';
import authorStylesCode from './examples/AuthorStyles.css?raw';

interface Origin {
  id: string;
  name: string;
  icon: typeof HiOutlineGlobe;
  color: string;
  bgColor: string;
  borderColor: string;
  priority: number;
  description: string;
  examples: string[];
  code: string;
}

const ORIGINS: Origin[] = [
  {
    id: 'user-agent',
    name: 'User Agent (Browser)',
    icon: HiOutlineGlobe,
    color: 'text-info',
    bgColor: 'bg-info/10',
    borderColor: 'border-info/30',
    priority: 1,
    description: 'Default styles built into every browser',
    examples: [
      '<h1> is bold and large',
      '<a> is blue and underlined',
      '<ul> has bullet points',
      '<strong> is bold',
    ],
    code: userAgentStylesCode,
  },
  {
    id: 'user',
    name: 'User (OS/Extensions)',
    icon: HiOutlineUser,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30',
    priority: 2,
    description: 'Styles from user preferences or browser extensions',
    examples: [
      'High contrast mode',
      'Custom fonts for dyslexia',
      'Dark mode extensions',
      'Minimum font sizes',
    ],
    code: userStylesCode,
  },
  {
    id: 'author',
    name: 'Author (Developer)',
    icon: HiOutlineCode,
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/30',
    priority: 3,
    description: 'Your CSS files, inline styles, and frameworks',
    examples: [
      'Your .css files',
      'Inline style attributes',
      'CSS frameworks (Tailwind, Bootstrap)',
      '<style> tags in HTML',
    ],
    code: authorStylesCode,
  },
];

export default function CascadeOriginsDemo(): React.ReactElement {
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);

  const selected = ORIGINS.find((o) => o.id === selectedOrigin);

  return (
    <div className="space-y-6">
      {/* Origin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ORIGINS.map((origin) => {
          const Icon = origin.icon;
          const isSelected = selectedOrigin === origin.id;
          return (
            <button
              key={origin.id}
              onClick={() => setSelectedOrigin(isSelected ? null : origin.id)}
              className={`card ${origin.bgColor} border ${origin.borderColor} p-4 text-left transition-all hover:scale-[1.02] ${
                isSelected ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-base-100/50`}>
                  <Icon className={origin.color} size={24} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge badge-sm ${origin.color.replace('text-', 'badge-')}`}>
                    #{origin.priority}
                  </span>
                </div>
              </div>
              <h4 className={`font-semibold ${origin.color} mb-2`}>{origin.name}</h4>
              <p className="text-sm text-base-content/60">{origin.description}</p>
            </button>
          );
        })}
      </div>

      {/* Priority Explanation */}
      <div className="bg-base-200 rounded-lg p-4">
        <h4 className="font-semibold text-sm text-base-content/70 mb-3">Cascade Priority Order:</h4>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="badge badge-info">User Agent</span>
          <span className="text-base-content/50">→</span>
          <span className="badge badge-warning">User</span>
          <span className="text-base-content/50">→</span>
          <span className="badge badge-success">Author</span>
          <span className="text-base-content/50">=</span>
          <span className="badge badge-primary">Winner!</span>
        </div>
        <p className="text-xs text-base-content/50 mt-3 text-center">
          Author styles override User styles, which override User Agent (browser) styles
        </p>
      </div>

      {/* Selected Origin Details */}
      {selected && (
        <div className="space-y-4">
          <div className={`${selected.bgColor} border ${selected.borderColor} rounded-lg p-4`}>
            <h4 className={`font-semibold ${selected.color} mb-3`}>Examples of {selected.name}:</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selected.examples.map((example, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${selected.color.replace('text-', 'bg-')}`}
                  />
                  {example}
                </li>
              ))}
            </ul>
          </div>

          <CodeSnippet code={selected.code} language="css" title={`${selected.name} Styles`} />
        </div>
      )}

      {/* Important Note */}
      <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
        <p className="text-sm">
          <strong className="text-warning">Note:</strong> The{' '}
          <code className="bg-base-200 px-1 rounded">!important</code> flag can flip this order!
          User <code className="text-xs">!important</code> beats Author{' '}
          <code className="text-xs">!important</code>, ensuring accessibility needs are respected.
        </p>
      </div>
    </div>
  );
}
