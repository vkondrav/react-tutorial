// ============================================
// Lesson 3.1: useEffect - Side Effects & Lifecycle
// ============================================

import {
  HiOutlineLightningBolt,
  HiOutlineCog,
  HiOutlineTrash,
  HiOutlineClock,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import EffectBasicsDemo from './EffectBasicsDemo';
import DependencyArrayDemo from './DependencyArrayDemo';
import CleanupDemo from './CleanupDemo';
import EffectTimingDemo from './EffectTimingDemo';
import EffectPlayground from './EffectPlayground';

export default function Lesson3_1(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="3" lesson="1" title="useEffect: Side Effects & Lifecycle" />

      {/* Section 1: What Are Side Effects? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            What Are Side Effects?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          A <strong className="text-primary">side effect</strong> is any operation that interacts
          with the world outside of your component. React components should be <strong>pure</strong>{' '}
          during rendering — they just calculate JSX. Side effects run <em>after</em> the render.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-success mb-2">Examples of Side Effects:</h4>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• Fetching data from an API</li>
              <li>• Setting up subscriptions</li>
              <li>• Manually changing the DOM</li>
              <li>• Setting timers (setTimeout, setInterval)</li>
              <li>• Logging to the console</li>
              <li>• Storing data in localStorage</li>
            </ul>
          </div>
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-error mb-2">NOT Side Effects:</h4>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• Calculating derived values</li>
              <li>• Rendering JSX</li>
              <li>• Event handlers (use onClick, etc.)</li>
              <li>• Transforming data for display</li>
            </ul>
          </div>
        </div>
        <EffectBasicsDemo />
      </Section>

      {/* Section 2: The Dependency Array */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCog className="text-primary" size={20} />
            The Dependency Array
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          The <strong className="text-primary">dependency array</strong> controls <em>when</em> your
          effect runs. It's the second argument to useEffect and tells React which values your
          effect depends on.
        </p>
        <DependencyArrayDemo />
      </Section>

      {/* Section 3: Effect Timing */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineClock className="text-primary" size={20} />
            When Do Effects Run?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Understanding <strong>when</strong> effects fire is crucial. Effects run{' '}
          <strong className="text-primary">after</strong> the browser paints the screen, not during
          rendering. This lets you perform side effects without blocking the UI.
        </p>
        <EffectTimingDemo />
      </Section>

      {/* Section 4: Cleanup Functions */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineTrash className="text-primary" size={20} />
            Cleanup Functions
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          When effects set up subscriptions, timers, or event listeners, you need to{' '}
          <strong className="text-primary">clean them up</strong> to prevent memory leaks. Return a
          function from your effect to handle cleanup.
        </p>
        <CleanupDemo />
      </Section>

      {/* Section 5: Interactive Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            useEffect Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Practice with common useEffect patterns: document title updates, timers, keyboard
          shortcuts, and localStorage sync. See the effects in action!
        </p>
        <EffectPlayground />
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
            "useEffect runs after render, not during — it's for side effects",
            'Empty dependency array [] = run once on mount only',
            'Dependencies in array = re-run when those values change',
            'No array = run after every render (usually not what you want)',
            'Return a cleanup function to prevent memory leaks',
            'Cleanup runs before the effect re-runs AND on unmount',
            "Don't lie about dependencies — include all values used in the effect",
          ]}
        />
      </Section>
    </div>
  );
}
