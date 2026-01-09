import { useState } from 'react';
import { CodeSnippet } from '@components';
import {
  HiOutlineTemplate,
  HiOutlineSparkles,
  HiOutlineBeaker,
  HiCheck,
  HiX,
  HiOutlineLightBulb,
} from 'react-icons/hi';
import hybridCode from './examples/Hybrid.css?raw';

type Approach = 'bem' | 'utility' | 'hybrid';

interface ApproachInfo {
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  bestFor: string[];
  avoid: string[];
}

const approaches: Record<Approach, ApproachInfo> = {
  bem: {
    name: 'BEM',
    icon: <HiOutlineTemplate size={24} />,
    color: '#3b82f6',
    description:
      'Semantic class names that describe component structure. Each component is self-contained with its own CSS file.',
    bestFor: [
      'Large teams with style guides',
      'Design systems and component libraries',
      'Projects requiring strict consistency',
      'When HTML must stay minimal',
    ],
    avoid: [
      'Rapid prototyping',
      'Small projects with frequent changes',
      'When naming is slowing you down',
    ],
  },
  utility: {
    name: 'Utility-First',
    icon: <HiOutlineSparkles size={24} />,
    color: '#10b981',
    description:
      'Atomic single-purpose classes composed directly in HTML. Frameworks like Tailwind provide a complete utility system.',
    bestFor: [
      'Rapid prototyping and MVPs',
      'Component-based frameworks (React, Vue)',
      'Solo developers or small teams',
      'When design is evolving frequently',
    ],
    avoid: [
      'Teams unfamiliar with utility frameworks',
      'When HTML readability is critical',
      'Legacy projects without build tools',
    ],
  },
  hybrid: {
    name: 'Hybrid',
    icon: <HiOutlineBeaker size={24} />,
    color: '#8b5cf6',
    description:
      'BEM for component structure, utilities for spacing and layout adjustments. Best of both worlds.',
    bestFor: [
      'Most real-world projects',
      'Teams transitioning from traditional CSS',
      'When some components need custom styling',
      'Balancing readability and speed',
    ],
    avoid: [
      'When team lacks experience with either approach',
      'Very simple projects where one approach suffices',
    ],
  },
};

export default function ApproachComparisonDemo(): React.ReactElement {
  const [selectedApproach, setSelectedApproach] = useState<Approach>('hybrid');
  const [showCode, setShowCode] = useState(false);

  const approach = approaches[selectedApproach];

  return (
    <div className="card bg-base-200 p-6 border border-base-300">
      {/* Approach Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(approaches) as Approach[]).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedApproach(key)}
            className={`btn ${selectedApproach === key ? '' : 'btn-ghost'}`}
            style={{
              backgroundColor: selectedApproach === key ? approaches[key].color : undefined,
              color: selectedApproach === key ? 'white' : undefined,
            }}
          >
            {approaches[key].icon}
            <span className="ml-2">{approaches[key].name}</span>
          </button>
        ))}
      </div>

      {/* Selected Approach Details */}
      <div
        className="rounded-lg p-6 mb-6 border-2"
        style={{
          borderColor: approach.color,
          backgroundColor: `${approach.color}10`,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: approach.color, color: 'white' }}
          >
            {approach.icon}
          </div>
          <div>
            <h4 className="font-bold text-lg" style={{ color: approach.color }}>
              {approach.name}
            </h4>
            <p className="text-sm text-base-content/60">CSS Methodology</p>
          </div>
        </div>
        <p className="text-base-content/80 leading-relaxed">{approach.description}</p>
      </div>

      {/* Best For / Avoid Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-success/10 border border-success/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <HiCheck className="text-success" size={20} />
            <h5 className="font-semibold text-success">Best For</h5>
          </div>
          <ul className="space-y-2">
            {approach.bestFor.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-base-content/70">
                <span className="text-success mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <HiX className="text-warning" size={20} />
            <h5 className="font-semibold text-warning">Consider Alternatives When</h5>
          </div>
          <ul className="space-y-2">
            {approach.avoid.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-base-content/70">
                <span className="text-warning mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-base-300 rounded-lg p-4 mb-6 overflow-x-auto">
        <h4 className="font-semibold text-base-content mb-4 text-sm">Quick Comparison</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="pb-3 text-base-content/60 font-medium">Aspect</th>
              <th className="pb-3 text-blue-400 font-medium">BEM</th>
              <th className="pb-3 text-green-400 font-medium">Utility</th>
              <th className="pb-3 text-purple-400 font-medium">Hybrid</th>
            </tr>
          </thead>
          <tbody className="text-base-content/70">
            <tr className="border-t border-base-content/10">
              <td className="py-2">Learning Curve</td>
              <td className="py-2">Low</td>
              <td className="py-2">Medium</td>
              <td className="py-2">Medium</td>
            </tr>
            <tr className="border-t border-base-content/10">
              <td className="py-2">HTML Readability</td>
              <td className="py-2">
                <span className="text-success">High</span>
              </td>
              <td className="py-2">
                <span className="text-warning">Lower</span>
              </td>
              <td className="py-2">Medium</td>
            </tr>
            <tr className="border-t border-base-content/10">
              <td className="py-2">Development Speed</td>
              <td className="py-2">Slower</td>
              <td className="py-2">
                <span className="text-success">Fastest</span>
              </td>
              <td className="py-2">Fast</td>
            </tr>
            <tr className="border-t border-base-content/10">
              <td className="py-2">CSS File Size</td>
              <td className="py-2">Grows with features</td>
              <td className="py-2">
                <span className="text-success">Fixed (purged)</span>
              </td>
              <td className="py-2">Moderate</td>
            </tr>
            <tr className="border-t border-base-content/10">
              <td className="py-2">Specificity Issues</td>
              <td className="py-2">
                <span className="text-success">None</span>
              </td>
              <td className="py-2">
                <span className="text-success">None</span>
              </td>
              <td className="py-2">
                <span className="text-success">None</span>
              </td>
            </tr>
            <tr className="border-t border-base-content/10">
              <td className="py-2">Naming Required</td>
              <td className="py-2">Yes (semantic)</td>
              <td className="py-2">
                <span className="text-success">No</span>
              </td>
              <td className="py-2">Some</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Recommendation */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <HiOutlineLightBulb className="text-primary shrink-0 mt-1" size={20} />
          <div>
            <h5 className="font-semibold text-primary mb-1">Recommendation</h5>
            <p className="text-sm text-base-content/70">
              Start with <strong>utility-first</strong> for speed, extract to{' '}
              <strong>BEM components</strong> when patterns repeat 3+ times. This natural evolution
              gives you the benefits of both approaches without upfront over-engineering.
            </p>
          </div>
        </div>
      </div>

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-ghost mb-4">
        {showCode ? 'Hide' : 'Show'} Hybrid Example
      </button>

      {showCode && <CodeSnippet title="Hybrid Approach" language="css" code={hybridCode} />}
    </div>
  );
}
