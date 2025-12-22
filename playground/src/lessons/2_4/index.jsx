// ============================================
// Lesson 2.4: Conditional Rendering
// ============================================

import {
  HiOutlineBookOpen,
  HiOutlineSwitchHorizontal,
  HiOutlineSparkles,
  HiOutlineCursorClick,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import ConditionalBasicsDemo from './ConditionalBasicsDemo';
import TernaryDemo from './TernaryDemo';
import LogicalAndDemo from './LogicalAndDemo';
import PatternComparisonDemo from './PatternComparisonDemo';
import ConditionalPlayground from './ConditionalPlayground';

export default function Lesson2_4() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="2" lesson="4" title="Conditional Rendering" />

      {/* Section 1: Concept Introduction */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBookOpen className="text-primary" size={20} />
            What is Conditional Rendering?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          In React, you often need to <strong>show or hide</strong> parts of your UI based on
          conditions. This is called <em>conditional rendering</em> — deciding what to render based
          on state, props, or any expression.
        </p>
        <p className="mb-4 leading-relaxed">
          Just like JavaScript has <code>if</code>, <code>? :</code>, and <code>&&</code> for
          conditionals, React uses these same operators inside JSX. The difference? You're deciding
          what <em>UI</em> to show!
        </p>
        <ConditionalBasicsDemo />
      </Section>

      {/* Section 2: Ternary Operator */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSwitchHorizontal className="text-primary" size={20} />
            The Ternary Operator
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          The <strong>ternary operator</strong> (<code>condition ? ifTrue : ifFalse</code>) is the
          most common way to conditionally render in React. It's perfect for "either this OR that"
          situations.
        </p>
        <TernaryDemo />
      </Section>

      {/* Section 3: Logical && */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSparkles className="text-primary" size={20} />
            Short-Circuit with &&
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          When you only want to show something <em>if a condition is true</em> (and nothing
          otherwise), the <strong>logical AND</strong> (<code>&&</code>) operator is your friend!
        </p>
        <LogicalAndDemo />
      </Section>

      {/* Section 4: Pattern Comparison */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCursorClick className="text-primary" size={20} />
            Choosing the Right Pattern
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          There are several ways to conditionally render. Each has its place. Let's compare them
          side-by-side!
        </p>
        <PatternComparisonDemo />
      </Section>

      {/* Section 5: Interactive Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Conditional Rendering Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Practice building conditional UIs! Try different patterns and see the results.
        </p>
        <ConditionalPlayground />
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
            'Ternary (? :) is best for showing one thing OR another',
            '&& is best for showing something OR nothing',
            'Early returns clean up complex conditions in component functions',
            'Avoid deeply nested ternaries — extract to variables or components',
            "null, undefined, and false render nothing in JSX (but 0 renders '0'!)",
          ]}
        />
      </Section>
    </div>
  );
}
