// ============================================
// Lesson 3.3: useRef - DOM Access & Persistence
// ============================================

import {
  HiOutlineCursorClick,
  HiOutlineEye,
  HiOutlineDatabase,
  HiOutlineRewind,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import RefBasicsDemo from './RefBasicsDemo';
import DomAccessDemo from './DomAccessDemo';
import PersistentValueDemo from './PersistentValueDemo';
import PreviousValueDemo from './PreviousValueDemo';
import RefPlayground from './RefPlayground';

export default function Lesson3_3() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="3" lesson="3" title="useRef: DOM Access & Persistence" />

      {/* Section 1: What is useRef? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCursorClick className="text-primary" size={20} />
            What is useRef?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">useRef</strong> creates a mutable reference that persists
          across renders. Unlike state, changing a ref does <em>not</em> trigger a re-render. It's
          like having a "box" that holds a value you can read and write anytime.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-primary mb-2">useState</h4>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• Triggers re-render on change</li>
              <li>• Value updates asynchronously</li>
              <li>• For data that affects UI</li>
            </ul>
          </div>
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-secondary mb-2">useRef</h4>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• Does NOT trigger re-render</li>
              <li>• Value updates immediately</li>
              <li>• For DOM access & mutable values</li>
            </ul>
          </div>
        </div>
        <RefBasicsDemo />
      </Section>

      {/* Section 2: DOM Access */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineEye className="text-primary" size={20} />
            Accessing DOM Elements
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          The most common use of refs is to access{' '}
          <strong className="text-primary">DOM elements</strong> directly. Attach a ref to an
          element with the <code className="text-secondary">ref</code> attribute, then access the
          element via <code className="text-secondary">ref.current</code>.
        </p>
        <DomAccessDemo />
      </Section>

      {/* Section 3: Persistent Values */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineDatabase className="text-primary" size={20} />
            Storing Values Without Re-renders
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Refs are perfect for storing values that need to{' '}
          <strong className="text-primary">persist across renders</strong> but shouldn't cause
          re-renders when changed — like timer IDs, previous values, or external library instances.
        </p>
        <PersistentValueDemo />
      </Section>

      {/* Section 4: Previous Values */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineRewind className="text-primary" size={20} />
            Tracking Previous Values
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          A common pattern is using refs to store the{' '}
          <strong className="text-primary">previous value</strong> of props or state. This is useful
          for comparisons, animations, or undo functionality.
        </p>
        <PreviousValueDemo />
      </Section>

      {/* Section 5: Interactive Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            useRef Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Practice with real-world ref patterns: auto-focus forms, scroll control, click-outside
          detection, and video players. See how refs enable imperative DOM operations!
        </p>
        <RefPlayground />
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
            'useRef returns { current: value } that persists across renders',
            'Changing ref.current does NOT trigger a re-render',
            'Use refs for DOM access: focus, scroll, measurements, animations',
            'Use refs for mutable values: timers, previous values, counters',
            "Don't use refs for data that should trigger UI updates",
            'Access DOM after mount (in useEffect or event handlers)',
            'Refs are the escape hatch from React declarative model',
          ]}
        />
      </Section>
    </div>
  );
}
