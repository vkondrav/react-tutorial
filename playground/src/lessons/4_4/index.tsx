// ============================================
// Lesson 4.4: Building a Custom useFetch Hook
// ============================================

import {
  HiOutlineLightBulb,
  HiOutlineCode,
  HiOutlineTemplate,
  HiOutlineSparkles,
  HiOutlineSwitchHorizontal,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import UseFetchBasicsDemo from './UseFetchBasicsDemo';
import BuildingUseFetchDemo from './BuildingUseFetchDemo';
import GenericUseFetchDemo from './GenericUseFetchDemo';
import SuspenseApproachDemo from './SuspenseApproachDemo';
import UseFetchPlayground from './UseFetchPlayground';

export default function Lesson4_4(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="4" lesson="4" title="Building a Custom useFetch Hook" />

      {/* Section 1: Why useFetch? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightBulb className="text-primary" size={20} />
            Why Build a useFetch Hook?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Every fetch in React needs the same boilerplate:{' '}
          <strong className="text-primary">loading state</strong>,{' '}
          <strong className="text-secondary">error handling</strong>, and{' '}
          <strong className="text-accent">data storage</strong>. A custom hook extracts this
          repetitive logic into a reusable function.
        </p>
        <UseFetchBasicsDemo />
      </Section>

      {/* Section 2: Building useFetch Step by Step */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCode className="text-primary" size={20} />
            Building useFetch Step by Step
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Let's build <code className="text-primary">useFetch</code> incrementally, starting simple
          and adding features like <strong className="text-secondary">refetch</strong>,{' '}
          <strong className="text-accent">abort on unmount</strong>, and{' '}
          <strong className="text-success">dependency tracking</strong>.
        </p>
        <BuildingUseFetchDemo />
      </Section>

      {/* Section 3: Generic useFetch with TypeScript */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineTemplate className="text-primary" size={20} />
            Generic useFetch with TypeScript
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Using <strong className="text-primary">TypeScript generics</strong>, we can make our hook
          type-safe. The return type is inferred from what the API returns, giving you full
          autocomplete and error checking.
        </p>
        <GenericUseFetchDemo />
      </Section>

      {/* Section 4: React 19 Suspense Approach */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSparkles className="text-primary" size={20} />
            React 19: The Suspense Approach
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          React 19 introduces the <code className="text-primary">use()</code> hook for reading
          promises. Combined with <code className="text-secondary">{'<Suspense>'}</code>, it offers
          a declarative alternative to manual loading states.
        </p>
        <SuspenseApproachDemo />
      </Section>

      {/* Section 5: Comparing Approaches */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSwitchHorizontal className="text-primary" size={20} />
            useEffect vs Suspense: When to Use Which
          </span>
        }
      >
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-primary mb-3">useEffect Pattern</h4>
            <ul className="text-sm space-y-2 text-base-content/70">
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                Works in all React versions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                Full control over loading states
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                Easy to add refetch, polling
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                More boilerplate code
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                Imperative error handling
              </li>
            </ul>
          </div>
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-secondary mb-3">Suspense Pattern</h4>
            <ul className="text-sm space-y-2 text-base-content/70">
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                Declarative, less boilerplate
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                Automatic loading boundaries
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                Works with ErrorBoundary
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                Requires React 19+
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                Promise must be created outside render
              </li>
            </ul>
          </div>
        </div>
        <div className="card bg-primary/10 border border-primary/30 p-4">
          <p className="text-sm">
            <strong className="text-primary">Recommendation:</strong> Use the useEffect pattern for
            now — it's battle-tested and works everywhere. As React 19 matures and libraries adopt
            Suspense, gradually migrate where it makes sense.
          </p>
        </div>
      </Section>

      {/* Section 6: useFetch Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            useFetch Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          See our <code className="text-primary">useFetch</code> hook in action! Try different
          endpoints, simulate errors, and observe how the hook handles all states automatically.
        </p>
        <UseFetchPlayground />
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
            'useFetch extracts repetitive fetch logic (loading, error, data) into one hook',
            'Return { data, loading, error, refetch } for maximum flexibility',
            'Always clean up with AbortController to prevent memory leaks',
            'TypeScript generics (useFetch<T>) give you type-safe API responses',
            'React 19 use() + Suspense is declarative but requires new patterns',
            'The useEffect pattern works everywhere — use it as your default',
            'Consider libraries like TanStack Query for production apps with caching needs',
          ]}
        />
      </Section>
    </div>
  );
}

