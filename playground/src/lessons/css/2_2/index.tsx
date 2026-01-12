// ============================================
// CSS Module 2, Lesson 2: Flexbox
// ============================================

import {
  HiOutlineLightBulb,
  HiOutlineSwitchHorizontal,
  HiOutlineAdjustments,
  HiOutlineTemplate,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import FlexAxesDemo from './FlexAxesDemo';
import FlexShorthandDemo from './FlexShorthandDemo';
import FlexLayoutDemo from './FlexLayoutDemo';

export default function CSSLesson2_2(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="2" lesson="2" title="Flexbox" />

      {/* Section 1: The Big Idea */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightBulb className="text-primary" size={20} />
            The Big Idea
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70">
          Flexbox is a <strong className="text-primary">one-dimensional layout system</strong>. It
          excels at distributing space along a single axis—either horizontally or vertically. Think
          of it as a smarter alternative to floats and inline-block hacks.
        </p>
        <p className="leading-relaxed text-base-content/70 mt-4">
          The key insight: Flexbox has <strong className="text-accent">two axes</strong>—the{' '}
          <em>main axis</em> (direction of flex items) and the <em>cross axis</em> (perpendicular).
          All flex properties work relative to these axes.
        </p>
      </Section>

      {/* Section 2: Axes & Alignment */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSwitchHorizontal className="text-primary" size={20} />
            Understanding the Two Axes
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          The most common source of Flexbox confusion is mixing up the axes. Remember:
        </p>
        <ul className="list-disc list-inside text-base-content/70 mb-6 space-y-2">
          <li>
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="text-success">justify-content</code> — Distributes space along the{' '}
            <strong>main axis</strong>
          </li>
          <li>
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="text-warning">align-items</code> — Aligns items along the{' '}
            <strong>cross axis</strong>
          </li>
          <li>
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="text-accent">flex-direction</code> — Determines which axis is "main"
            (row = horizontal, column = vertical)
          </li>
        </ul>
        <FlexAxesDemo />
      </Section>

      {/* Section 3: The flex Shorthand */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineAdjustments className="text-primary" size={20} />
            The flex Shorthand: Grow, Shrink, Basis
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          {/* eslint-disable-next-line local/no-raw-code-element */}
          The <code className="bg-base-200 px-2 py-0.5 rounded text-sm">flex</code> property is
          {/* eslint-disable-next-line local/no-raw-code-element */}
          shorthand for three values: <code className="text-success">flex-grow</code>,{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="text-warning">flex-shrink</code>, and{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="text-accent">flex-basis</code>.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          Understanding these three values unlocks the full power of flexible layouts.
        </p>
        <FlexShorthandDemo />
      </Section>

      {/* Section 4: Common Patterns */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineTemplate className="text-primary" size={20} />
            Common Flexbox Patterns
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-6">
          Once you understand the axes and flex properties, these common layout patterns become
          trivial. No more centering hacks or float clearing!
        </p>
        <FlexLayoutDemo />
      </Section>

      {/* Section 5: Key Takeaways */}
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
            'Flexbox is one-dimensional: works along a single axis at a time',
            'flex-direction determines the main axis (row = horizontal, column = vertical)',
            'justify-content distributes space along the MAIN axis',
            'align-items aligns items along the CROSS axis',
            'flex: 1 means flex-grow: 1, flex-shrink: 1, flex-basis: 0%',
            'flex-grow distributes extra space; flex-shrink handles overflow',
            'flex-basis sets the initial size before grow/shrink kicks in',
            'gap property adds consistent spacing between flex items',
          ]}
        />
      </Section>
    </div>
  );
}
