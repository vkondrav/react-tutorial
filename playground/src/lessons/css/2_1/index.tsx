// ============================================
// CSS Module 2, Lesson 1: Positioning Contexts
// ============================================

import {
  HiOutlineLightBulb,
  HiOutlineViewGridAdd,
  HiOutlineSwitchHorizontal,
  HiOutlineCollection,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import DocumentFlowDemo from './DocumentFlowDemo';
import PositionTypesDemo from './PositionTypesDemo';
import StackingContextDemo from './StackingContextDemo';

export default function CSSLesson2_1(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="2" lesson="1" title="Positioning Contexts" />

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
          CSS positioning is about <strong className="text-primary">taking control</strong> of where
          elements appear on the page. By default, elements follow the{' '}
          <em className="text-accent">document flow</em>—stacking vertically like paragraphs in a
          book.
        </p>
        <p className="leading-relaxed text-base-content/70 mt-4">
          But sometimes you need an element to break free—floating above content, sticking to the
          viewport, or precisely placed within a container. That's where{' '}
          <strong className="text-primary">positioning</strong> comes in.
        </p>
      </Section>

      {/* Section 2: Document Flow */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineViewGridAdd className="text-primary" size={20} />
            Understanding Document Flow
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          The <strong className="text-primary">document flow</strong> is the default layout
          behavior. Block elements stack vertically; inline elements flow horizontally. When an
          element is <em className="text-warning">"taken out of flow"</em>, it no longer affects the
          position of other elements.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          Elements with{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">position: absolute</code>,{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">fixed</code>, or{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">float</code> are removed from
          the normal flow.
        </p>
        <DocumentFlowDemo />
      </Section>

      {/* Section 3: Position Types */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSwitchHorizontal className="text-primary" size={20} />
            The Five Position Values
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          CSS provides five position values, each with distinct behavior:
        </p>
        <ul className="list-disc list-inside text-base-content/70 mb-6 space-y-2">
          <li>
            <code className="text-base-content">static</code> — Default, follows normal flow
          </li>
          <li>
            <code className="text-success">relative</code> — Offset from normal position, stays in
            flow
          </li>
          <li>
            <code className="text-warning">absolute</code> — Removed from flow, positioned relative
            to nearest positioned ancestor
          </li>
          <li>
            <code className="text-error">fixed</code> — Removed from flow, positioned relative to
            viewport
          </li>
          <li>
            <code className="text-accent">sticky</code> — Hybrid: normal until scroll threshold,
            then fixed within container
          </li>
        </ul>
        <PositionTypesDemo />
      </Section>

      {/* Section 4: Stacking Contexts */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCollection className="text-primary" size={20} />
            Stacking Contexts & z-index
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">z-index</code> controls which
          elements appear on top of others. But here's the catch:{' '}
          <strong className="text-warning">z-index is not global</strong>.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          Each <em className="text-accent">stacking context</em> is like a separate layer. A child
          element can never appear above its parent's siblings, no matter how high you set its
          z-index. Understanding this prevents the "why won't my modal appear on top?" debugging
          nightmare.
        </p>
        <StackingContextDemo />
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
            'Document flow: block elements stack, inline elements wrap — the default layout',
            'position: relative keeps element in flow but enables offset + creates positioning context',
            'position: absolute removes from flow; positions relative to nearest positioned ancestor',
            'position: fixed is like absolute but relative to viewport — great for headers/modals',
            'position: sticky is relative until scroll threshold, then becomes fixed within container',
            'z-index only works on positioned elements (not static)',
            "Each stacking context is isolated — high z-index in a child can't escape its parent's context",
          ]}
        />
      </Section>
    </div>
  );
}
