// ============================================
// Lesson 7.4: When to Use External State Libraries
// ============================================

import {
  HiOutlineScale,
  HiOutlineExclamation,
  HiOutlineViewGrid,
  HiOutlineMap,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../../components';
import WhenBuiltInDemo from './WhenBuiltInDemo';
import SignsYouNeedLibraryDemo from './SignsYouNeedLibraryDemo';
import LibraryOverviewDemo from './LibraryOverviewDemo';
import DecisionFrameworkDemo from './DecisionFrameworkDemo';

export default function Lesson7_4(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="7" lesson="4" title="When to Use External State Libraries" />

      {/* Section 1: When Built-in State is Enough */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineScale className="text-primary" size={20} />
            When Built-in State is Enough
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          React's built-in tools (<strong className="text-primary">useState</strong>,{' '}
          <strong className="text-secondary">useReducer</strong>,{' '}
          <strong className="text-accent">useContext</strong>) are powerful. Most apps don't need
          external libraries. Let's understand when they're sufficient.
        </p>
        <WhenBuiltInDemo />
      </Section>

      {/* Section 2: Signs You Might Need a Library */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineExclamation className="text-primary" size={20} />
            Signs You Might Need a Library
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          There are specific <strong className="text-warning">pain points</strong> that indicate
          when built-in state management becomes limiting. Recognize these patterns to know when
          it's time to consider alternatives.
        </p>
        <SignsYouNeedLibraryDemo />
      </Section>

      {/* Section 3: Popular State Libraries */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineViewGrid className="text-primary" size={20} />
            Popular State Libraries
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          The React ecosystem offers several excellent state management solutions. Each has
          different trade-offs for <strong className="text-primary">complexity</strong>,{' '}
          <strong className="text-secondary">features</strong>, and{' '}
          <strong className="text-accent">learning curve</strong>.
        </p>
        <LibraryOverviewDemo />
      </Section>

      {/* Section 4: Decision Framework */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineMap className="text-primary" size={20} />
            Decision Framework
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Use this <strong className="text-primary">decision flowchart</strong> to choose the right
          state management approach for your project.
        </p>
        <DecisionFrameworkDemo />
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
            'useState + useReducer + useContext handle most React apps perfectly',
            'Consider external libraries when: 10+ contexts, complex caching, time-travel debugging needed',
            'Zustand: Minimal, easy to learn, great for most cases needing external state',
            'Redux Toolkit: Powerful, great DevTools, best for large teams & complex apps',
            'TanStack Query: Not state management, but solves server state/caching brilliantly',
            'Jotai/Recoil: Atomic state, great for fine-grained reactivity needs',
            'Start simple (built-in) → Add complexity only when you feel real pain',
            "Don't use a library because it's popular — use it because you need its features",
          ]}
        />
      </Section>
    </div>
  );
}
