// ============================================
// TestingApproachesDemo: Overview of Testing Strategies
// ============================================

import { useState } from 'react';
import {
  HiOutlineCube,
  HiOutlinePuzzle,
  HiOutlineGlobe,
  HiOutlineCheck,
  HiOutlineX,
} from 'react-icons/hi';

interface TestLevel {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  scope: string;
  speed: string;
  confidence: string;
  tools: string[];
  example: string;
  pros: string[];
  cons: string[];
}

const TEST_LEVELS: TestLevel[] = [
  {
    id: 'unit',
    name: 'Unit Tests',
    icon: <HiOutlineCube size={24} />,
    description: 'Test individual functions or components in isolation',
    scope: 'Single function/component',
    speed: 'Very Fast (~ms)',
    confidence: 'Low-Medium',
    tools: ['Vitest', 'Jest', 'React Testing Library'],
    example: 'Test that a formatDate() function returns correct output',
    pros: ['Fast execution', 'Easy to write', 'Pinpoint failures', 'Good for utilities'],
    cons: ['May miss integration issues', "Doesn't test real user flows"],
  },
  {
    id: 'integration',
    name: 'Integration Tests',
    icon: <HiOutlinePuzzle size={24} />,
    description: 'Test how multiple units work together',
    scope: 'Multiple components/modules',
    speed: 'Fast (~100ms)',
    confidence: 'Medium-High',
    tools: ['Storybook + Vitest', 'Testing Library', 'MSW'],
    example: 'Test a form component with validation and API submission',
    pros: ['Tests real interactions', 'Catches integration bugs', 'Good confidence/speed ratio'],
    cons: ['More setup required', 'Slower than unit tests'],
  },
  {
    id: 'e2e',
    name: 'End-to-End Tests',
    icon: <HiOutlineGlobe size={24} />,
    description: 'Test complete user flows in a real browser',
    scope: 'Entire application',
    speed: 'Slow (~seconds)',
    confidence: 'Very High',
    tools: ['Playwright', 'Cypress', 'Selenium'],
    example: 'Test complete checkout flow: login → add to cart → pay → confirmation',
    pros: ['Highest confidence', 'Tests real user experience', 'Catches edge cases'],
    cons: ['Slow to run', 'Flaky if not careful', 'Hard to debug'],
  },
];

export default function TestingApproachesDemo(): React.ReactElement {
  const [selectedLevel, setSelectedLevel] = useState<string>('integration');

  const selected = TEST_LEVELS.find((l) => l.id === selectedLevel)!;

  return (
    <div className="space-y-6">
      {/* Testing Pyramid */}
      <div className="card bg-base-300 p-6">
        <h4 className="font-semibold mb-4 text-center">The Testing Pyramid</h4>
        <div className="flex flex-col items-center gap-2">
          <div
            onClick={() => setSelectedLevel('e2e')}
            className={`w-32 h-12 flex items-center justify-center rounded-t-lg cursor-pointer transition-all ${
              selectedLevel === 'e2e'
                ? 'bg-primary text-primary-content'
                : 'bg-base-200 hover:bg-base-100'
            }`}
          >
            <span className="text-sm font-medium">E2E</span>
          </div>
          <div
            onClick={() => setSelectedLevel('integration')}
            className={`w-48 h-12 flex items-center justify-center cursor-pointer transition-all ${
              selectedLevel === 'integration'
                ? 'bg-primary text-primary-content'
                : 'bg-base-200 hover:bg-base-100'
            }`}
          >
            <span className="text-sm font-medium">Integration</span>
          </div>
          <div
            onClick={() => setSelectedLevel('unit')}
            className={`w-64 h-12 flex items-center justify-center rounded-b-lg cursor-pointer transition-all ${
              selectedLevel === 'unit'
                ? 'bg-primary text-primary-content'
                : 'bg-base-200 hover:bg-base-100'
            }`}
          >
            <span className="text-sm font-medium">Unit</span>
          </div>
        </div>
        <p className="text-center text-xs text-base-content/60 mt-4">Click a level to learn more</p>
      </div>

      {/* Selected Level Details */}
      <div className="card bg-base-300 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-primary">{selected.icon}</div>
          <h4 className="font-semibold text-lg">{selected.name}</h4>
        </div>

        <p className="text-base-content/80 mb-4">{selected.description}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-base-200 rounded-lg p-3">
            <div className="text-xs text-base-content/60 mb-1">Scope</div>
            <div className="text-sm font-medium">{selected.scope}</div>
          </div>
          <div className="bg-base-200 rounded-lg p-3">
            <div className="text-xs text-base-content/60 mb-1">Speed</div>
            <div className="text-sm font-medium">{selected.speed}</div>
          </div>
          <div className="bg-base-200 rounded-lg p-3">
            <div className="text-xs text-base-content/60 mb-1">Confidence</div>
            <div className="text-sm font-medium">{selected.confidence}</div>
          </div>
        </div>

        {/* Tools */}
        <div className="mb-4">
          <div className="text-xs text-base-content/60 mb-2">Common Tools</div>
          <div className="flex flex-wrap gap-2">
            {selected.tools.map((tool) => (
              <span key={tool} className="badge badge-outline badge-sm">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Example */}
        <div className="bg-base-200 rounded-lg p-3 mb-4">
          <div className="text-xs text-base-content/60 mb-1">Example</div>
          <p className="text-sm italic">{selected.example}</p>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-success mb-2 flex items-center gap-1">
              <HiOutlineCheck size={14} /> Pros
            </div>
            <ul className="text-sm space-y-1">
              {selected.pros.map((pro) => (
                <li key={pro} className="text-base-content/70">
                  • {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs text-error mb-2 flex items-center gap-1">
              <HiOutlineX size={14} /> Cons
            </div>
            <ul className="text-sm space-y-1">
              {selected.cons.map((con) => (
                <li key={con} className="text-base-content/70">
                  • {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Our Approach Highlight */}
      <div className="card bg-primary/10 border border-primary/30 p-6">
        <h4 className="font-semibold text-primary mb-3">Our Approach in This Course</h4>
        <p className="text-sm text-base-content/80 mb-3">
          We focus on <strong className="text-primary">integration testing with Storybook</strong>{' '}
          because it offers the best balance of confidence and speed. Each component is tested in
          isolation but with real interactions, API mocking, and visual verification.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-primary">Storybook</span>
          <span className="badge badge-secondary">Vitest</span>
          <span className="badge badge-accent">MSW</span>
          <span className="badge badge-info">Playwright</span>
        </div>
      </div>
    </div>
  );
}
