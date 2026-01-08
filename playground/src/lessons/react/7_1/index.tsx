// ============================================
// Lesson 7.1: Lifting State Up
// ============================================

import {
  HiOutlineArrowUp,
  HiOutlinePuzzle,
  HiOutlineMap,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import WhyLiftStateDemo from './WhyLiftStateDemo';
import LiftingPatternDemo from './LiftingPatternDemo';
import LiftingGuidelinesDemo from './LiftingGuidelinesDemo';
import LiftingPlayground from './LiftingPlayground';

export default function Lesson7_1(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="7" lesson="1" title="Lifting State Up" />

      {/* Section 1: Why Lift State? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlinePuzzle className="text-primary" size={20} />
            Why Lift State Up?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          When <strong className="text-primary">two sibling components</strong> need to share or
          synchronize state, they can't communicate directly. React's solution: move the shared
          state to their <strong className="text-secondary">closest common ancestor</strong>.
        </p>
        <WhyLiftStateDemo />
      </Section>

      {/* Section 2: The Lifting Pattern */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineArrowUp className="text-primary" size={20} />
            The Lifting Pattern
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Lifting state follows a clear pattern:{' '}
          <strong className="text-primary">identify shared state</strong>, move it to the parent,
          then pass it down via <strong className="text-secondary">props</strong>. Let's walk
          through it step by step.
        </p>
        <LiftingPatternDemo />
      </Section>

      {/* Section 3: When to Lift State */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineMap className="text-primary" size={20} />
            When to Lift (and When Not To)
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Not all state needs to be lifted! Learn to recognize when lifting is the right choice
          versus <strong className="text-primary">keeping state local</strong> or using{' '}
          <strong className="text-secondary">context</strong>.
        </p>
        <LiftingGuidelinesDemo />
      </Section>

      {/* Section 4: Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Lifting State Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Practice lifting state with interactive examples:{' '}
          <strong className="text-primary">temperature converter</strong>,{' '}
          <strong className="text-secondary">shopping cart</strong>, and{' '}
          <strong className="text-accent">form wizard</strong>.
        </p>
        <LiftingPlayground />
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
            'Sibling components cannot share state directly — lift it to their common parent',
            'The component owning the state passes it down as props to children',
            'Children update shared state by calling callback functions passed as props',
            'Controlled inputs are a form of lifted state (input value lives in parent)',
            'Only lift state when multiple components actually need to share it',
            'Keep state as local as possible — lifting too much creates prop drilling',
            'Consider Context or state management for deeply nested shared state',
          ]}
        />
      </Section>
    </div>
  );
}
