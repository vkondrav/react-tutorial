// ============================================
// CSS Module 1, Lesson 3: The Box Model & Flow
// ============================================

import {
  HiOutlineLightBulb,
  HiOutlineCube,
  HiOutlineSwitchVertical,
  HiOutlineViewBoards,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import BoxSizingDemo from './BoxSizingDemo';
import MarginCollapseDemo from './MarginCollapseDemo';
import DisplayPropertyDemo from './DisplayPropertyDemo';

export default function CSSLesson1_3(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="1" lesson="3" title="The Box Model & Flow" />

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
          Every element in CSS is a <strong className="text-primary">rectangular box</strong>. The{' '}
          <em className="text-accent">box model</em> defines how an element's content, padding,
          border, and margin combine to determine its total size and spacing.
        </p>
        <p className="leading-relaxed text-base-content/70 mt-4">
          Understanding the box model is essential for building predictable layouts—without it,
          you'll constantly fight with unexpected widths and spacing.
        </p>
      </Section>

      {/* Section 2: Box Sizing */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCube className="text-primary" size={20} />
            Box Sizing: The Math Problem
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          The <code className="bg-base-200 px-2 py-0.5 rounded text-sm">box-sizing</code> property
          determines <strong className="text-primary">what "width" actually means</strong>. The
          default (<code className="text-warning">content-box</code>) is counterintuitive—padding
          and borders are <em>added</em> to your width.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          Modern CSS resets always include{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm text-success">
            box-sizing: border-box
          </code>{' '}
          to make width <em>include</em> padding and borders.
        </p>
        <BoxSizingDemo />
      </Section>

      {/* Section 3: Margin Collapse */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSwitchVertical className="text-primary" size={20} />
            Margin Collapse: The Quirky Behavior
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          When two <strong className="text-warning">vertical margins</strong> touch, they{' '}
          <em className="text-accent">collapse</em> into a single margin equal to the{' '}
          <strong>larger</strong> of the two. This only happens vertically, never horizontally.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          This behavior is intentional—it makes spacing between paragraphs consistent. But it can be
          confusing when you don't expect it!
        </p>
        <MarginCollapseDemo />
      </Section>

      {/* Section 4: Display Property */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineViewBoards className="text-primary" size={20} />
            The Display Property: Block, Inline & Inline-Block
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          The <code className="bg-base-200 px-2 py-0.5 rounded text-sm">display</code> property
          controls how an element participates in the{' '}
          <strong className="text-primary">document flow</strong>. The three fundamental values are:
        </p>
        <ul className="list-disc list-inside text-base-content/70 mb-6 space-y-2">
          <li>
            <code className="text-success">block</code> — Takes full width, stacks vertically
          </li>
          <li>
            <code className="text-warning">inline</code> — Flows with text, ignores vertical
            margin/padding
          </li>
          <li>
            <code className="text-accent">inline-block</code> — Best of both: flows inline but
            respects all dimensions
          </li>
        </ul>
        <DisplayPropertyDemo />
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
            'Every element is a box: content + padding + border + margin',
            'Always use box-sizing: border-box — it makes width calculations intuitive',
            'Vertical margins collapse (merge); horizontal margins never do',
            'Prevent margin collapse with overflow: hidden, padding, or borders',
            'Block elements stack vertically; inline elements flow with text',
            'Inline-block combines inline flow with block-level dimension control',
          ]}
        />
      </Section>
    </div>
  );
}
