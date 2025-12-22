// ============================================
// Lesson 6.5: Activity - Preserving Hidden State
// ============================================

import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLightningBolt,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import StatePreservationProblemDemo from './StatePreservationProblemDemo';
import CSSApproachDemo from './CSSApproachDemo';
import ActivityConceptDemo from './ActivityConceptDemo';
import ActivityPlayground from './ActivityPlayground';

export default function Lesson6_5(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="6" lesson="5" title="Activity: Preserving Hidden State" />

      {/* Section 1: The Problem */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineEyeOff className="text-primary" size={20} />
            The State Preservation Problem
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          When you conditionally render components in React, their{' '}
          <strong className="text-error">state is destroyed</strong> when they unmount. This can be
          frustrating for users who lose their progress!
        </p>
        <StatePreservationProblemDemo />
      </Section>

      {/* Section 2: CSS Approach */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineEye className="text-primary" size={20} />
            Current Solution: CSS Hiding
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          One workaround is to <strong className="text-primary">keep components mounted</strong> but
          hide them with CSS. This preserves state but has trade-offs.
        </p>
        <CSSApproachDemo />
      </Section>

      {/* Section 3: React 19 Activity */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            React 19: The Activity API
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          React 19 introduces <strong className="text-primary">&lt;Activity&gt;</strong>{' '}
          (experimental), a built-in way to preserve component state while hiding content from the
          DOM.
        </p>
        <ActivityConceptDemo />
      </Section>

      {/* Section 4: Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            State Preservation Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Compare different approaches to preserving state when switching between views.
        </p>
        <ActivityPlayground />
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
            'Conditional rendering ({show && <Component />}) destroys state on unmount',
            'CSS hiding (display: none) preserves state but keeps components in the DOM',
            'Trade-off: Memory usage vs. user experience when preserving state',
            'React 19 Activity API: "visible" and "hidden" modes for smart state preservation',
            'Activity pauses effects and hides content while preserving component state',
            'Great for: tab panels, wizard steps, modal content, cached views',
            'Consider: lift state up or use context for simpler cases',
          ]}
        />
      </Section>
    </div>
  );
}
