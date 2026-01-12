// ============================================
// Lesson 3.4: useMemo & useCallback - Performance
// ============================================

import {
  HiOutlineLightningBolt,
  HiOutlineCalculator,
  HiOutlineRefresh,
  HiOutlineExclamationCircle,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList, CodeSnippet } from '@components';
import RenderCountDemo from './RenderCountDemo';
import UseMemoDemo from './UseMemoDemo';
import UseCallbackDemo from './UseCallbackDemo';
import WhenToUseDemo from './WhenToUseDemo';
import PerformancePlayground from './PerformancePlayground';
import useMemoExample from './examples/UseMemoExample.tsx?raw';
import useCallbackExample from './examples/UseCallbackExample.tsx?raw';

export default function Lesson3_4(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="3" lesson="4" title="useMemo & useCallback: Performance" />

      {/* Section 1: Why Performance Matters */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            Understanding Re-renders
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          React re-renders components when state or props change. Usually this is fine, but
          sometimes <strong className="text-primary">unnecessary re-renders</strong> can cause
          performance issues — especially with expensive calculations or large lists.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-error mb-2">Problems</h4>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• Recalculating expensive operations</li>
              <li>• Re-creating functions every render</li>
              <li>• Unnecessary child component updates</li>
            </ul>
          </div>
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-success mb-2">Solutions</h4>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>
                {/* eslint-disable-next-line local/no-raw-code-element */}•{' '}
                <code className="text-secondary">useMemo</code> — cache values
              </li>
              <li>
                {/* eslint-disable-next-line local/no-raw-code-element */}•{' '}
                <code className="text-secondary">useCallback</code> — cache functions
              </li>
              <li>
                {/* eslint-disable-next-line local/no-raw-code-element */}•{' '}
                <code className="text-secondary">React.memo</code> — skip re-renders
              </li>
            </ul>
          </div>
        </div>
        <RenderCountDemo />
      </Section>

      {/* Section 2: useMemo */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCalculator className="text-primary" size={20} />
            useMemo: Caching Expensive Calculations
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">useMemo</strong> memoizes a computed value. It only
          recalculates when its dependencies change — perfect for expensive operations like
          filtering, sorting, or complex math.
        </p>
        <div className="mb-4">
          <CodeSnippet code={useMemoExample} language="tsx" />
        </div>
        <UseMemoDemo />
      </Section>

      {/* Section 3: useCallback */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineRefresh className="text-primary" size={20} />
            useCallback: Caching Functions
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">useCallback</strong> memoizes a function itself. Without
          it, a new function is created on every render — which can cause child components using{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="text-secondary">React.memo</code> to re-render unnecessarily.
        </p>
        <div className="mb-4">
          <CodeSnippet code={useCallbackExample} language="tsx" />
        </div>
        <UseCallbackDemo />
      </Section>

      {/* Section 4: When to Use */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineExclamationCircle className="text-primary" size={20} />
            When to Use (And When NOT To)
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          These hooks have a cost! Memoization uses memory and adds complexity. Only use them when
          you have a <strong className="text-primary">measurable performance problem</strong>.
        </p>
        <WhenToUseDemo />
      </Section>

      {/* Section 5: Interactive Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Performance Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Experiment with real scenarios: expensive calculations, list filtering, and callback
          optimization. Toggle memoization on/off to see the difference!
        </p>
        <PerformancePlayground />
      </Section>

      {/* Takeaways */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineClipboardCheck className="text-primary" size={20} />
            Key Takeaways
          </span>
        }
      >
        <TakeawayList
          items={[
            'useMemo caches computed VALUES — use for expensive calculations',
            'useCallback caches FUNCTIONS — use when passing callbacks to memoized children',
            'React.memo wraps components to skip re-renders if props are unchanged',
            "Don't optimize prematurely — measure first, optimize second",
            'Memoization has memory cost — unnecessary memoization can hurt performance',
            'Dependencies array works like useEffect — list all values used inside',
            'Profile with React DevTools to identify actual bottlenecks',
          ]}
        />
      </Section>
    </div>
  );
}
