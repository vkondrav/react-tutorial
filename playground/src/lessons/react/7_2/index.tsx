// ============================================
// Lesson 7.2: useReducer for Complex State
// ============================================

import {
  HiOutlineCog,
  HiOutlineTemplate,
  HiOutlineCode,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import WhyReducerDemo from './WhyReducerDemo';
import ReducerBasicsDemo from './ReducerBasicsDemo';
import ActionPatternsDemo from './ActionPatternsDemo';
import ReducerPlayground from './ReducerPlayground';

export default function Lesson7_2(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="7" lesson="2" title="useReducer for Complex State" />

      {/* Section 1: Why useReducer? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCog className="text-primary" size={20} />
            When useState Isn't Enough
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          As state logic grows complex, <code className="text-error">useState</code> can become
          unwieldy. <strong className="text-primary">useReducer</strong> provides a more structured
          way to handle state updates with{' '}
          <strong className="text-secondary">predictable actions</strong>.
        </p>
        <WhyReducerDemo />
      </Section>

      {/* Section 2: useReducer Basics */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineTemplate className="text-primary" size={20} />
            useReducer Fundamentals
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          A <strong className="text-primary">reducer</strong> is a pure function that takes the
          current state and an action, then returns the new state. The{' '}
          <strong className="text-secondary">dispatch</strong> function sends actions to trigger
          updates.
        </p>
        <ReducerBasicsDemo />
      </Section>

      {/* Section 3: Action Patterns */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCode className="text-primary" size={20} />
            Actions and TypeScript
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Well-designed <strong className="text-primary">actions</strong> make your state changes
          explicit and traceable. TypeScript helps ensure you handle all action types correctly.
        </p>
        <ActionPatternsDemo />
      </Section>

      {/* Section 4: Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            useReducer Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Practice with real-world examples: <strong className="text-primary">todo list</strong>,{' '}
          <strong className="text-secondary">shopping cart</strong>, and{' '}
          <strong className="text-accent">form wizard</strong>.
        </p>
        <ReducerPlayground />
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
            'useReducer is ideal when state updates depend on previous state or are complex',
            'A reducer is a pure function: (state, action) => newState',
            'dispatch(action) triggers state updates — never mutate state directly',
            'Actions should be descriptive objects with a type and optional payload',
            'TypeScript discriminated unions provide excellent type safety for actions',
            'Extract reducer logic outside components for testing and reusability',
            'useState is still fine for simple, independent state values',
          ]}
        />
      </Section>
    </div>
  );
}
